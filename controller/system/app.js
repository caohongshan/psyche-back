const {	Controller } = require('../common/uni-cloud-router')

module.exports = class AppController extends Controller {
	async init() {

	}

	/**
	 * 定时器，1：确定收货订单，佣金到账
	 */
	async timer() {
		console.log("定时器处理订单开始")
		await this.service.mall.order.timer();
		console.log("订单处理结束")
		//退款订单返回资金
		await this.refund()
		//自动付款，微信自动到账改用商家转账到零钱接口
		// await this.autoCashout()
		//扫码支付定时抽佣
		await this.service.order.shopqr.timer();
	}


	/**
	 * 退款定时器
	 */
	async refund() {
		let models = ["mall"]
		console.log("开始退款任务")
		//所有模块都有可能退款
		for (let model of models) {
			let orderList = await this.service.order[model].getRefundOrders();
			if (orderList && orderList.length > 0) {
				for (let order of orderList) {
					if (order.payInfo) {
						let res = await this.service.payment[order.payInfo.type].refund({
							payInfo: order.payInfo,
							platform: order.platform,
							dcloud_appid: order.dcloud_appid,
							uid: order.uid,
							outTradeNo: order.payInfo.outTradeNo,
							outRefundNo: order.id,
							totalFee: order.payInfo.totalFee, //支付总金额
							refundFee: order.refund_fee, //退款金额
							refundDesc: order.description, //退款原因
						}, order);
						console.log("支付端口退款成功", order._id, res);
						//退款处理成功
						if (res !== false) {
							order.message = res;
							res = await this.service.order[model].refundSuccess(order);
							console.log("订单端口处理结果", res);
						}
					} else {
						console.log("无支付信息")
					}
				}
			} else {
				console.log("refund无需处理", model)
			}
		}
		console.log("结束退款任务")
	}

	/**
	 * 自动转账到微信定时器
	 */
	async autoCashout() {
		console.log("开始查询提现信息")
		let data = await this.service.user.user.getUnpayCashout();
		if (data && data.length > 0) {
			console.log("查询到待提现信息")
			for (let i = 0; i < data.length; i++) {
				let info = data[i]
				let res = await this.service.payment[info.mode].transfers(info, info.platform, "账户提现");
				if (res.code < 0 || res.code == "TOKEN_INVALID") {
					//转账失败
					console.log("本次转账失败", info._id, res)
					uniCloud.logger.error("本次转账失败")
					uniCloud.logger.error(JSON.stringify(res))
					continue;
				}
				await this.service.user.user.cashoutSave(info._id, {
					status: 1,
					payment: res
				});
			}
		}
	}
}
