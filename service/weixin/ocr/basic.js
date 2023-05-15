const {
	Service
} = require('../../common/uni-cloud-router')
const WeixinBasicService = require('../basic.js');
const md5 = require('md5-node');
/**
 * 微信模板消息父类
 */
module.exports = class BasicService extends WeixinBasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "";
		this.url = ""
		//公众号id
		this.publicApp = this.ctx.getConfigs.config("mp-h5");
	}

	async send(content) {
		//小程序的accessToken
		let token = await this.getAccessToken({
			...this.publicApp
		});
		console.log("获取token完成", token)
		let result = await this._sendMessage(content, token)
		console.log("ocr调用完成")

		return this.getMessageResult(result)
	}
	/**
	 * 返回值处理
	 * @param {Object} content
	 */
	async getMessageResult(content) {

	}

	/**
	 * 调用发送微信模板消息
	 * @param {Object} openid
	 * @param {Object} template_id
	 * @param {Object} miniprogram
	 * @param {Object} pushData
	 */
	async _sendMessage(data, token) {
		if (!data.img_url || data.img_url.indexOf("http") == -1) {
			console.log("图片地址格式不对", data.img_url)
			return false;
		}
		//缓存一年
		return this.ctx.dbcache("ocr_" + this.type + md5(JSON.stringify(data)), null, 3600 * 24 * 365,
			async () => {
				/* console.log(
					`https://api.weixin.qq.com${this.url}?img_url=${data.img_url}&access_token=${token}`
				) */
				let result = await this.curl(
					`https://api.weixin.qq.com${this.url}?img_url=${data.img_url}&access_token=${token}`, {
						method: "POST",
						contentType: "json",
						dataType: "json",
						data: {}
					});
				console.log("错误", result.data)
				if (result.data && result.data.errcode) {
					throw new Error(result.data.errmsg)
				}
				console.log("result", result)
				return this.getMessageResult(result.data)
			})

	}

	/**
	 * 根据主键id，查询信息，需要子类定义this.collection
	 * @param {Object} id
	 */
	async getInfoById(id) {
		if (!this.collection) {
			return false;
		}
		let {
			data
		} = this.collection.doc(id).get();
		if (data.length > 0) {
			return data[0]
		}
		return false;
	}
}
