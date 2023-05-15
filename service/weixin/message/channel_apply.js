const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 渠道申请
 */
module.exports = class ChannelApplyService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "channel_apply";
		this.collection = this.db.collection("uni-id-channel");
		//必须配置公众号+小程序，才能接收到模板消息，接受者必须关注公众号
		//默认调用时机：用户付款后
		//调用方式：await this.service.weixin.message.channel_apply.send({order_id:"619f43e4a9e51d000113d9a5"})
		/* 编号
		OPENTM411367650
		标题
		申请加入通知
		行业
		IT科技 - 互联网|电子商务
		使用人数
		1104
		最后修改时间
		2017-07-13 17:14:31
		详细内容
		{{first.DATA}}
		真实姓名：{{keyword1.DATA}}
		申请时间：{{keyword2.DATA}}
		{{remark.DATA}} */
	}

	/**
	 * 子类继承此方法，用于构造发送的data
	 * @param {Object} content
	 */
	async getMessageContent(content) {
		let {
			title,
			mobile,
			address,
			id
		} = content;
		console.log("开始通知")
		let data = ["有新渠道申请"];
		//真实姓名
		data.push(title)
		//申请时间
		data.push(this.getDateTime());
		//地址
		data.push(address.name + " " + address.address)
		return {
			data,
			miniprogram: {
				appid: this.configs.appid,
				pagepath: "pages/admin/channel/channel?id=" + id
			}
		}
	}
}
