const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 渠道申请结果
 */
module.exports = class ChannelApplyResultService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "channel_apply_result";
		this.collection = this.db.collection("uni-id-channel");
		//必须配置公众号+小程序，才能接收到模板消息，接受者必须关注公众号
		//默认调用时机：用户付款后
		//调用方式：await this.service.weixin.message.channel_apply_result.send({order_id:"619f43e4a9e51d000113d9a5"})
		/* 编号
		OPENTM412195410
		标题
		审核结果通知
		行业
		IT科技 - 互联网|电子商务
		使用人数
		5
		最后修改时间
		2017-09-05 16:08:43
		详细内容
		{{first.DATA}}
		姓名：{{keyword1.DATA}}
		手机：{{keyword2.DATA}}
		审核结果：{{keyword3.DATA}}
		审核站点：{{keyword4.DATA}}
		审核时间：{{keyword5.DATA}}
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
			remark,
			status,
			id
		} = content;
		console.log("开始通知")
		let data = ["渠道申请结果如下："];
		//姓名
		data.push(title)
		//手机
		data.push(mobile)
		//审核结果
		if (status == 2) {
			data.push("审核通过")
		} else {
			data.push("审核失败")
		}
		//审核站点
		data.push(address.name)
		//审核时间
		data.push(this.getDateTime());
		//地址
		data.push(remark)
		return {
			data,
			miniprogram: {
				appid: this.configs.appid,
				pagepath: "pages/index/index?secondpage=pages/user/channel&type=1"
			}
		}
	}
}
