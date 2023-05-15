const { Controller } = require('../../common/uni-cloud-router')

/**
 * 后台订单管理，发货（录入单号），退货等
 */
module.exports = class OrderController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 *  发货，如果存在商品id，即为单个发货，并修改状态为已发货
	 */
	async deliver() {
		const { uid: adminUser } = this.ctx.auth;
		return await this.service.mall.order.setDeliver(this.ctx.data, adminUser);
	}
	async refund() {
		const {
			uid: adminUser
		} = this.ctx.auth;
		let {
			id, //申请id
			type,
		} = this.ctx.data;
		//查询申请信息
		let info = await this.service.mall.order.getRefundInfoById(id);
		if (!info) {
			return {
				code: -1,
				message: "信息不存在"
			};
		}
		if (type == "pass") {
			//通过
			return this.service.mall.order.passRefund(info, adminUser);
		} else {
			//拒绝
			return this.service.mall.order.rejectRefund(info, adminUser);
		}
	}
	/**
	 * 查询分账剩余金额
	 */
	async profitsharingorderamountquery() {
		let {
			id, //订单id
			uid,
			module //订单类型
		} = this.ctx.data;
		let order = await this.service.order[module].getInfoById(id);
		let payment = order.payInfo;
		return this.service.payment[payment.type].profitsharingorderamountquery(payment);
	}
	/**
	 * 测试分账
	 */
	async orderprofitsharing() {
		let {
			id, //订单id
			uid,
			module //订单类型
		} = this.ctx.data;
		let order = await this.service.order[module].getInfoById(id);
		let payment = order.payInfo;
		return this.service.payment[payment.type].profitsharing(payment, [{
			type: "MERCHANT_ID",
			account: payment.mchId,
			amount: 1,
			description: "平台费用"
		}]);
	}
	/**
	 * 强制取消订单，全额退款
	 */
	async cancel() {
		const {
			uid: adminUser
		} = this.ctx.auth;
		let {
			id, //订单id
			uid,
			module //订单类型
		} = this.ctx.data;
		return await this.service.order[module].cancel(id, uid, async (order) => {
			if (order && order.payInfo) {
				//已付款订单，取消订单
				await this.service.payment[order.payInfo.type].refund({
					payInfo: order.payInfo,
					platform: order.platform,
					dcloud_appid: order.dcloud_appid,
					uid: order.user_id,
					outTradeNo: order.payInfo.outTradeNo,
					outRefundNo: order._id,
					totalFee: order.total_fee, //支付总金额
					refundFee: order.total_fee, //退款金额，这里是全额退款
					refundDesc: "取消订单", //退款原因
				})
			}
		}, true, adminUser);
	}
}
