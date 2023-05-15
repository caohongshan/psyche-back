const { ObjectId } = require('mongodb');
const { Service } = require('../../common/uni-cloud-router')

/**
 * 商城订单处理，
 */
module.exports = class MallService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection("tian-mall-orders")
		this.shopCollection = db.collection("tian-mall-shops")
	}
	/**
	 * 保存订单
	 * @param {Object} order 
	 */
	async save(order) {
		await this.collection.insertOne(order);
		const order_id = await this.collection.find({}).toArray();
		return order_id[0]._id;
	}
	/**
	 * 付款前查询支付金额
	 * @param {Object} order 
	 */
	async info(id, userInfo, data) {
		let {
			money,
			shop_id,
			type
		} = data;
		if (shop_id) {

		} else {
			shop_id = id;
			id = await this.service.user.user.genIdentityId("tian-mall-orders", 1, 1000000)
		}
		//查询店铺信息
		let shop = await this.getShopInfo(shop_id, data);
		if (!shop) {
			return false;
		}
		//构造订单字段
		return {
			total_fee: parseInt(money * 100),
			user_id: userInfo._id,
			user: userInfo,
			shop_id: shop_id,
			shop,
			src: shop.src,
			payment: type ? shop.payments[type] : {},
			profit_sharing: shop.settlement_mode == "profit_sharing", //订单是否支持分账
			state: 0,
			id: id,
			create_time: Date.now(),
			update_time: Date.now(),
			title: "扫码支付",
			body: shop.name + "扫码支付"
		};
	}

	async getShopInfo(shop_id, params) {
		let {
			data
		} = await this.shopCollection.doc(shop_id).field({
			name: 1,
			src: 1,
			state: 1,
			payments: 1,
			uid: 1,
			payment_types: 1,
			qr_code_payment: 1
		}).get();
		if (data.length > 0) {
			let shop = data[0];
			if (typeof(shop.payments) == "string") {
				shop.payments = JSON.parse(shop.payments);
			}
			if (!params.type) {
				return {
					...shop,
					payments: undefined,
					qr_code_payment: undefined
				}
			}
			if (typeof(shop.qr_code_payment) == "string") {
				shop.qr_code_payment = JSON.parse(shop.qr_code_payment);
			}
			console.log("shop.qr_code_payment", shop.qr_code_payment)
			return Object.assign({}, {
				...shop,
				...shop.qr_code_payment,
				qr_code_payment: undefined
			})
		}
		return false;
	}
	/**
	 * 取消订单，只能取消自己的订单
	 * @param {Object} id
	 */
	async cancel(id, uid, next, isAdmin = false, adminUser = 0) {

	}

	/**
	 * 更新支付单号，避免重复，支付成功之后，根据此id查询订单
	 */
	async updateOutTradeNo(order) {
		//计算返利金额
		if (order.shop.rebate_rate) {
			order.rebate = Math.floor(order.shop.rebate_rate * order.total_fee / 100);
		}
		return this.collection.add(order);
	}
	async getInfoById(id) {
		let {
			data
		} = await this.collection.doc(id).get();
		if (data.length > 0) {
			return data[0]
		}
		return false;
	}
	/**
	 * 付款后更新订单状态
	 * @param {Object} payinfo
	 */
	async afterPayment(payinfo, order) {
		let saveOrder = {
			state: 3,
			payInfo: {
				time: Date.now(),
				...payinfo
			},
		}
		//更新订单状态
		try {
			const payinfoId = new ObjectId(payinfo.id);
			let data = await this.collection.updateMany({
				// outTradeNo: payinfo.outTradeNo,
				_id:payinfoId,
				state: 0
			}, {$set: saveOrder}); 
			if (data.modifiedCount == 0) {
				return false;
			}
			console.log("订单状态更新成功");
			
			await this.collection.find({
				// outTradeNo: payinfo.outTradeNo,
				_id:payinfoId,
			}).sort({_id:-1}).limit(1).toArray();

			//保证查询最新一条订单
			let resultData = await this.collection.find({
				// outTradeNo: payinfo.outTradeNo,
				_id:payinfoId,
			}).sort({_id:-1}).limit(1).toArray();

			order = resultData[0];
			//增加用户余额（红包），不允许提现，否则就亏大了
			let {
				money_rate, //扣款比例
				// fee_rate, //微信平台费率
				settlement_mode, //结算方式：自动分账profit_sharing，余额提现balance
				rebate_rate, //用户返利比例
				uid: shopUid
			} = order.shop;
			//店主扣点分账，包含0.6%，商家自己承担
			// if (!fee_rate) {
			// 	fee_rate = 0.6
			// }
			let platformMoney = Math.floor(money_rate * order.total_fee / 100)
			//如果用户的支付类型是余额，则商家收款只能是余额
			if (payinfo.type == "balance") {
				settlement_mode = "balance";
			}

			let period = order.userInfo.period ? order.userInfo.period  : new Date().getTime();
			if(order.goods_sn === "238711") {
				period = period + order.cart_count * 24 * 60 * 60 * 1000;
			}

			console.log("platformMoney", platformMoney)
			if (settlement_mode == "profit_sharing") {
				if (platformMoney > 0) {
					order.receivers = [{
						type: "MERCHANT_ID",
						account: payinfo.mchId,
						amount: platformMoney,
						description: "平台费用"
					}]

					await this.collection.doc(order._id).update({
						profitsharingTime: Date.now() + 60 * 1000, //一分钟后自动分账
						isProfitsharing: false,
						receivers: order.receivers
					});
				}
			} else if (settlement_mode == "balance" && shopUid) {
				// let money = order.total_fee - platformMoney;
				let money = order.total_fee;
				//店主余额充值
				// await this.service.user.user.editBalance(shopUid, money, "扫码收款", 99, {
				// 	_id: order._id,
				// 	total_fee: order.total_fee,
				// 	type: "shopqr"
				// })
				await this.service.user.user.editBalance(shopUid, money, "扫码收款", 99, {
					...order,
					period,
					type: "shopqr"
				})
			}



			//返利金额
			let userMoney = order.rebate;
			if (userMoney > 0) {
				await this.service.user.user.editBalance(order.user_id, userMoney, "扫码付款返利", 99, {
					_id: order._id,
					total_fee: order.total_fee,
					period,
					type: "shopqr"
				})
			}
		} catch (e) {
			console.log(e.message)
			//TODO handle the exception
		}
		return order;
	}

	/**
	 * 定时器,1：确定收货订单，佣金到账
	 */
	async timer() {
		//定时处理分账订单
		await this.profitsharing()
	}
	async profitsharing() {
		console.log("开始处理扫码订单分账")
		const cmd = this.db.command;
		let {
			data
		} = await this.collection.where({
			profitsharingTime: cmd.lt(Date.now()),
			isProfitsharing: false
		}).orderBy("profitsharingTime", "asc").limit(10).get();
		if (data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				let order = data[i];
				await this.service.payment[order.payInfo.type].profitsharing(order.payInfo, order.receivers,
					async (res) => {
						res.isProfitsharing = true;
						return this.collection.doc(order._id).update(res);
					});
			}
		}
	}
	/**
	 * 订单退款
	 * @param {Object} order
	 */
	async refund(order) {

	}
	/**
	 * 查询所有退款订单
	 */
	async getRefundOrders() {
		console.log("查询退款订单")
		return []
	}
	/**
	 * 单个订单退款成功
	 * @param {Object} order
	 */
	async refundSuccess(order) {

	}

	/**
	 * 订单支付完成后，处理会员权益商品，并增加返佣
	 * @param {Object} goods
	 * @param {Object} saveOrder
	 */
	async updateOrderRebate(goods, saveOrder) {

	}

}
