const { Service } = require('../../common/uni-cloud-router');
const BasicService = require('./start_shipping.js')

/**
 * 订单发货后，通知用户，用户点开链接，微信打开待收货页面
 * 每单只发一次就好了
 */
module.exports = class TuangouCodeService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "tuangou_code";
		//短信模板：您购买的${name},提货码${body},详情请查看${url}
		//发送效果：【柔然科技】您购买的电动工具已发货,详情请查看https://wx.url
		//调用方式：await this.service.sms.tuangou_code.send({order_id:"619f43e4a9e51d000113d9a5"})
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
		content.phones = order.userInfo.mobile;
		//只需要账号和密码
		let pickUpCode = order.pickUpCode.map(e => {
			return e.account + "," + e.password;
		});
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
			name: order.body.replace(/[【】]/g, "").substr(0, 20),
			body: pickUpCode.join(";"),
			url: url + " "
		}
	}
}
