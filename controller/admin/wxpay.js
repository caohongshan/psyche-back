const {	Controller } = require('../../common/uni-cloud-router')

module.exports = class WxpayController extends Controller {
	/**
	 *  商户进件（服务商专用），结合店铺信息+表单提交
	 * https://pay.weixin.qq.com/wiki/doc/apiv3_partner/apis/chapter11_1_1.shtml
	 */
	async applyment() {
		let {
			id,
			data
		} = this.ctx.data;
		//查询店铺信息只是验证店铺是否存在
		let shop = await this.service.mall.shop.getShopById(id)
		if (!shop) {
			return false;
		}
		// return JSON.stringify(data);
		console.log("data", JSON.stringify(data))
		let keys = Object.keys(data);
		let postData = {
			subject_info: {
				identity_info: {
					owner: true
				}
			}
		};
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let item = data[key];
			if (item.upload) {
				//上传营业执照、食品经营许可、法人身份证
				item.value = await this.service.payment.wxpay_partner_v3.upload(item.value);
				console.log("item.value", item.value)
			}
			//判断是否需要加密
			if (item.encrypt) {
				console.log("加密", item)
				item.value = await this.service.payment.wxpay_partner_v3.encrypt(item.value);
				console.log("加密之后", item.value)
			}

			//字符串转化为多级对象
			let obj = item.group.split(".").reverse().reduce((total, item) => {
				return {
					[item]: total
				};
			}, {
				[key]: item.value
			});
			// console.log(obj)
			//填写递归值到postData里面
			this.deepMerge(postData, obj)
		}
		postData.business_code = "applyment_" + await this.service.user.user.genIdentityId(
			"shop_wxpay_applyment");
		//保存号码，方便后面查询进度
		await this.service.mall.shop.save(id, {
			business_code: postData.business_code
		})
		console.log("postData", JSON.stringify(postData))
		// return JSON.stringify(postData);
		return this.service.payment.wxpay_partner_v3.applyment(postData);
	}
	deepMerge(obj1, obj2) {
		let key;
		for (key in obj2) {
			// 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
			// 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
			obj1[key] =
				obj1[key] &&
				obj1[key].toString() === "[object Object]" && (obj2[key] && obj2[key].toString() ===
					"[object Object]") ?
				this.deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
		}
		return obj1;
	}
	async applymentinfo() {
		let {
			id,
		} = this.ctx.data;
		return this.service.payment.wxpay_partner_v3.applymentinfo(id);
	}

	/**
	 * 证件识别
	 */
	async ocr() {
		let {
			type
		} = this.ctx.data;
		return this.service.weixin.ocr[type].send(this.ctx.data)
	}
}
