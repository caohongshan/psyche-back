const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 新订单提醒店主
 */
module.exports = class NewOrderService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type="new_order";
		//必须配置公众号+小程序，才能接收到模板消息，接受者必须关注公众号
		//默认调用时机：用户付款后
		//调用方式：await this.service.weixin.message.new_order.send({order_id:"619f43e4a9e51d000113d9a5"})
		//编号：OPENTM416739152
		//标题：新订单提醒
		//详细内容
		/* {{first.DATA}}
		订单编号：{{keyword1.DATA}}
		下单时间：{{keyword2.DATA}}
		商品名称：{{keyword3.DATA}}
		配送地址：{{keyword4.DATA}}
		{{remark.DATA}} */

		//示例：
		/* 你有一个新的订单
		订单编号：987456321
		下单时间：2018-08-01 19：00
		商品名称：TMB 001奶茶
		配送地址：广州市珠江新城猎德新村
		详细订单信息请点击进入个人中心.. */
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
		//查询工单信息
		if (!order) {
			order = await this.service.mall.order.getOrderById(order_id);
		}
		console.log("开始发送新订单通知")
		let data = ["有新用户下单啦"];
		if (order.userInfo.nickname) {
			let name = order.userInfo.nickname;
			if (order.userInfo.mobile) {
				name += `（${order.userInfo.mobile}）`
			}
			data.push(name)
		} else if (order.userInfo.mobile) {
			data.push(order.userInfo.mobile)
		} else {
			data.push("匿名客户")
		}
		//订单编号
		data.push(order.id);
		//下单时间
		data.push(this.getDateTime(order.create_time));
		//商品名称
		data.push(order.body);
		//配送地址
		if (order.address) {
			data.push(order.address.formatted_address + order.address.address)
		} else {
			data.push("无地址")
		}
		//备注
		data.push("备注：" + order.remarks)
		return {
			data,
			miniprogram: {
				appid: this.configs.appid,
				pagepath: "pages/admin/order/order?id=" + order._id
			}
		}
	}
}
