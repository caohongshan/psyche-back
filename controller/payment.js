const { Controller } = require('../common/uni-cloud-router')

module.exports = class PaymentController extends Controller {
	async info() {
		return {
			balance: 0,
			order: this.ctx.event.data,
			paymentList: [
				{
					icon: '',
					icon: '',
					name: '余额',
					notice: '',
					key: 'balance',
					confirm: true
				},
				// {
				// 	icon: '',
				// 	icon: '',
				// 	name: '支付宝',
				// 	notice: '',
				// 	key: 'alipay',
				// 	confirm: true
				// }
			]
        }
	}

	/**
	 * 从tian-mall-orders表中获取订单号
	 */
	async pay() {
		const params = this.ctx.event.data;
		this.service.order.shopqr.afterPayment(params);
		
		return {
			transaction_id: '111', // 支付宝交易号 或 vbank 交易号。必须填写。
			mweb_url: 'https://codegeex.cn', // 支付成功后的跳转地址.. 不要包括参数...
			redirect_url: 'https://codegeex.cn', // 支付成功后的回调地址.. 要包括参数... 不
			order_id: '11111', // 支付宝交易号，可以根据自己的业务而定, 一般
        }
	}

	async cancel() {
		return {
            data: '取消交易了'
        }
	}
}
