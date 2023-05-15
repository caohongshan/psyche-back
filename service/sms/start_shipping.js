const { Service } = require('../../common/uni-cloud-router');

const BasicService = require('./basic.js')
/**
 * 订单发货后，通知用户，用户点开链接，微信打开待收货页面
 * 每单只发一次就好了
 */
module.exports = class StartShippingService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "start_shipping";
		//短信模板：您购买的${body}已发货,详情请查看${url}
		//发送效果：【柔然科技】您购买的电动工具已发货,详情请查看https://wx.url
		//调用方式：await this.service.sms.start_shipping.send({order_id:"619f43e4a9e51d000113d9a5"})
	}

	/**
	 * 子类继承此方法，用于构造发送的data
	 * @param {Object} content
	 */
	async getMessageContent(content) {
		let {
			order_id,
			order
		} = content;
		if (!order) {
			order = await this.service.mall.order.getOrderById(order_id);
		}
		if (order.send_sms && order.send_sms[this.type]) {
			console.log("已发送")
			return false;
		}
		//优先发送给收货地址里面的电话
		content.phones = order.address.mobile ? order.address.mobile : order.userInfo.mobile;
		//获取微信配置
		await this.service.weixin.basic.getUniIdWeixinConfig(this.configs.appid);
		//生成短信发送码，点击后，打开订单详情页
		let url = await this.service.weixin.basic.generateUrlLink({
			path: "/pages/index/index",
			query: `secondpage=/pages/order/order&type=unreceived`
		})
		console.log(url)
		////为避免与签名混淆，短信内容不可包含“【】”符号
		return {
			body: order.body.replace(/[【】]/g, "").substr(0, 20),
			url: url ? url + "" : ""
		}
	}

	/**
	 * 短信发送成功回调
	 * @param {Object} content
	 * @param {Object} data
	 * @param {Object} sendResult
	 */
	async afterSend(content, data, sendResult) {
		//保存发送短信记录
		return this.service.mall.order.saveSendSmsResult(content.order_id, this.type)
	}
}
