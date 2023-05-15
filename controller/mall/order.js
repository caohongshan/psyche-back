const { Controller } = require('../../common/uni-cloud-router')

module.exports = class OrderController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	
	async performance() {
		const {	where } = this.ctx.event.data;
		let data = await this.service.mall.order.performance(where);
		return data
	}

	// 获取所有订单列表
	async orderList() {
		let data = await this.service.mall.order.getOrderLists(this.ctx.event.data);
		return data	
	}

	async checkOrder() {
		const {	id } = this.ctx.event.data;
		const { uid } = this.ctx.auth;
		let order = await this.service.mall.order.getOrderById(id);
		if (!order || order.user_id != uid) {
			throw new Error("订单不存在")
		}
		return order;
	}
	/**
	 * 订单评价
	 */
	async comment() {
		//如果所有商品都已经评价，则订单状态改为已评价
		let order = await this.checkOrder()
		//判断订单是否已经评价
		if (order.state > 3) {
			return {
				code: -1,
				message: "订单已评价"
			}
		}
		return this.service.mall.order.comment(order, this.ctx.data, this.ctx.auth.uid);
	}
	/**
	 * 确定收货
	 */
	async finish() {
		let order = await this.checkOrder()
		//确定收货，打款到商家账户
		return await this.service.mall.order.finish(order);
	}
	/**
	 * 结算
	 */
	async settlement() {
		let config = this.ctx.getConfigs.config("mall.order");
		let {
			cart_ids,
			goods,
			submit,
			type, //订单来源，购物车/商品
			usedScore, //使用积分数量
			delivery_type, //配送方式
			remarks, //备注
			invoice, //发票
			invoice_code, //公司纳税识别号
			invoice_type, //发票类型
			coupon_id, //已选择优惠券ID
			address_id,
			uid
		} = this.ctx.event.data;
		// const { uid } = this.ctx.auth;
		let userInfo = await this.service.user.user.getCurrentUserInfo()
		//最大使用积分比例
		let useScoreRate = config.max_use_score_rate;
		//积分兑成现金比例
		let score2moneyRate = config.score_to_money_rate;
		let score = userInfo.score ? userInfo.score : 0;
		//是否支持多商户联合支付（需要电商资质）
		const union_pay = !!config.union_pay;

		let outData = {
			uid,
			freight: 0,
			cart_ids,
			score,
			score2moneyRate,
			check: true
		};
		//获取用户地址信息
		if (address_id) {
			//根据id，查询地址，前端提交过来的其他信息，实际上是不可靠的
			outData.address = await this.service.user.address.getInfoById(uid, address_id)
		} else {
			//获取用户默认地址
			outData.address = await this.service.user.address.getDefaultInfo(uid)
		}
		//获取商品详细信息，查询运费信息
		if (type == "cart") {
			//从购物车查询商品信息
			let cartData = await this.service.mall.cart.getGoodsByIds(cart_ids, uid);
			if (cartData.length == 0) {
				//购物车商品不存在
				outData.check = false;
				return outData;
			}
			goods = cartData;
		}
		let {
			code,
			message,
			discount,
			total,
			shopList,
			group_buying,
			group_buying_id,
			use_score_total: maxDuihuan,
			needScore,
			needAddress
		} = await this.service.mall.goods.getGoodsSkuByCart(goods, userInfo.member, useScoreRate, usedScore,
			score2moneyRate, config.exchange_points_for_cash, uid, coupon_id);

		if (code) {
			return { code, message };
		}
		outData.goodsList = goods;
		outData.discount = discount;
		outData.total = total;
		// outData.shopList = shopList; //临时调试
		outData.needAddress = needAddress;
		//不需要用户地址，后台也不用保存
		if (!needAddress) {
			delete outData.address
		}
		//计算运费
		if (outData.address && shopList) {
			// outData.freight = await this.service.mall.express.getExpressByGoods(goods, outData.address)
			//2022-01-07 按店铺统计运费
			for (let i = 0; i < shopList.length; i++) {
				//店铺运费
				outData.freight += shopList[i].freight = await this.service.mall.express.getExpressByGoods(
					shopList[i].goodsList,
					outData.address)
			}
		}
		//可用积分按商品总金额计算-会员优惠
		outData.canUseScore = maxDuihuan < score ? maxDuihuan : score;
		//必须使用积分数量
		outData.mustUseScore = config.must_use_score;
		//是否使用积分兑换现金
		outData.exchangePointsForCash = config.exchange_points_for_cash;
		//必须使用积分兑换
		if (config.must_use_score) {
			console.log("score < needScore", score, needScore, outData.canUseScore, maxDuihuan, useScoreRate,
				score2moneyRate)
			if (score < needScore) {
				return {
					code: -2,
					message: '积分不足'
				}
			}
			//默认已使用
			usedScore = outData.usedScore = needScore;
		}
		//店铺信息不存在
		if (!shopList || shopList.length == 0) {
			return {
				code: -3,
				message: "店铺已关闭"
			};
		}
		outData.coupon_id = false
		outData.couponsChecked = {}
		outData.coupons = []
		outData.couponsDisabled = []
		//检查店铺优惠券
		for (let i = 0; i < shopList.length; i++) {
			let shop = shopList[i];
			let {
				coupons,
				couponsDisabled,
				coupon_id: couponId,
				couponsChecked
			} = await this.service.coupon.basic.checkGoodsCoupon(shop.goodsList, shop._id, uid, coupon_id);
			outData.coupons = outData.coupons.concat(coupons)
			outData.couponsDisabled = outData.couponsDisabled.concat(couponsDisabled)
			//选择最优
			if (!outData.coupon_id || outData.couponsChecked.discount < couponsChecked.discount) {
				outData.coupon_id = couponId
				outData.couponsChecked = couponsChecked
			}

			//每个店铺默认优惠券，但是最后只能选择一张
			shop.coupon_id = couponId
			shop.couponsChecked = couponsChecked
			shop.coupons = coupons
			shop.couponsDisabled = couponsChecked
		}

		console.log("快结算拉")
		if (submit) {
			if (usedScore > 0) {
				//库存不足情况，不允许提交订单
				if (outData.canUseScore < usedScore) {
					//积分不够扣除
					return {
						code: -2,
						message: "积分不足"
					};
				}
				//增加积分兑换金额，单位是分
				discount += parseFloat(usedScore * score2moneyRate * 100);
				console.log("商城使用积分", usedScore, discount)
			}
			//校验收货地址
			// if (needAddress && !outData.address) {
			// 	return {
			// 		code: -3,
			// 		message: "收货地址不能为空"
			// 	};
			// }
			//填充到店铺商品列表里面
			// let cart_count = 0;
			let body = goods.map(g => {
				// cart_count += parseInt(g.amount);
				return g.name + (g.sku_name ? "+" + g.sku_name : "");
			}).join(",").substr(0, 50);
			//支付倒计时分钟
			let last_pay_time = Date.now() + config.last_pay_minutes * 1000 * 60;
			//总支付金额
			let total_fee = total - discount + outData.freight;
			let otherData = {};
			if (group_buying) {
				//拼单，只能单个商品购买
				otherData.group_buying = {
					state: 0, //状态0未处理，1已分配数据，拼单中，2拼单成功
					amount: 1,
					goods_id: goods[0].goods_id, //商品ids
					group_buying: goods[0].group_buying, //拼团人数
					group_buying_discount: goods[0].group_buying_discount, //拼团折扣
					group_buying_id,
				}
			}
			//提交商城订单
			/* let order_id = await this.service.order.mall.save({
				cart_count,
				score2moneyRate,
				freight: outData.freight,
				goods: goods,
				juli: 0,
				address: outData.address,
				platform: this.ctx.context.PLATFORM,
				last_pay_time, //最后支付时间，根据店铺设置
				remarks: remarks,
				state: 0,
				discount,
				goods_total_fee: total, //商品总计
				total_fee, //需要支付的总金额
				invoice,
				coupon,
				body,
				delivery_type,
				score: usedScore,
				user_id: uid,
				...otherData
			}); */
			//不开发票
			if (!invoice_type && invoice_type == "none") {
				invoice_code = ""
				invoice = ""
			} else if (invoice_type == "personal") {
				invoice_code = ""
			}
			let order_ids = []
			//按店铺提交订单
			for (let i = 0; i < shopList.length; i++) {
				//店铺运费
				let shop = shopList[i];
				//按店铺分别计算折扣
				await this.service.coupon.basic.useCoupon(shop, uid,coupon_id)
				let total_use_score = 0;
				let total = 0;
				let cart_count = 0;
				let body = []
				//按店铺分别计算折扣
				let discount = 0;
				let goodsList = shop.goodsList.map((item) => {
					cart_count += parseInt(item.amount);
					if (item.total_use_score) {
						total_use_score += parseInt(item.total_use_score);
					}
					total += item.total;
					body.push(item.name + (item.sku_name ? "+" + item.sku_name : ""))
					discount += item.discount;
					return item;
				});
				//删除店铺内商品
				delete shop.goodsList;
				//积分兑换现金，按比例计算积分
				if (total_use_score > 0) {
					discount += parseFloat((total / outData.total) * total_use_score * score2moneyRate * 100);
				}
				// let discount = parseFloat(total_use_score * score2moneyRate * 100);
				let total_fee = total - discount + shop.freight;
				let orderInfo = {
					dcloud_appid: this.ctx.context.APPID, //保存支付时候的应用id，方便将来退款时候，读取配置
					shop,
					shop_id: shop._id,
					cart_count,
					score2moneyRate,
					freight: shop.freight,
					goods: goodsList,
					juli: 0,
					address: outData.address,
					platform: this.ctx.context.PLATFORM,
					last_pay_time, //最后支付时间，根据店铺设置
					remarks: remarks,
					state: 0,
					discount,
					goods_total_fee: total, //商品总计
					total_fee, //需要支付的总金额
					invoice,
					invoice_type,
					invoice_code,
					coupon_id,
					body: body.join(",").substr(0, 50),
					delivery_type,
					score: total_use_score,
					user_id: uid,
					userInfo,
					...otherData
				}
				let order_id = await this.service.order.shopqr.save(orderInfo);
				order_ids.push(order_id)
				orderInfo._id = order_id

				// if (order_id) {
				// 	await this.service.message.create_order.send(orderInfo)
				// }
			}
			//提交公共订单
			/* await this.service.user.order.save(uid, {
				...outData,
				usedScore, //使用积分数量
				remarks, //备注
				invoice, //发票
				coupon, //已选择优惠券ID
				body,
				address_id
			}, "mall", this.ctx.contact); */
			if (type == "cart") {
				//移除购物车
				await this.service.mall.cart.remove(uid, cart_ids)
			}
			//使用积分
			if (usedScore > 0) {
				await this.service.user.user.editScore(uid, usedScore * -1, `商城购物使用积分`);
			}
			let page;
			//只保留第一个ID
			if (order_ids.length > 1 && !union_pay) {
				order_ids = [order_ids[0]]
				page = `/pages/order/order?type=unpay&id=${order_ids[0]}`;
			}
			return {
				_id: order_ids.join(","),
				page,
				total_fee,
				discount,
				module: "mall",
				body
			}
		}

		return outData;
	}
	/**
	 * 售后说明
	 */
	async prerefund() {
		let {
			after_services,
			after_service_reason
		} = this.ctx.getConfigs.config("mall.order");
		return {
			afterServices: after_services,
			afterServiceReason: after_service_reason,
		}
	}
	/**
	 * 售后，退款、维修
	 */
	async refund() {
		let {
			id,
			goods_id,
			sku_id,
			money
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		//查询订单
		let order = await this.service.mall.order.getOrderById(id, uid);
		if (!order) {
			return {
				code: -1,
				message: "订单不存在"
			}
		}
		//判断商品是否已经在退款中
		let goodsList = order.goods.filter(e => e.goods_id == goods_id && (!sku_id || e.sku_id == sku_id));
		if (goodsList.length == 0) {
			return {
				code: -1,
				message: "商品不存在"
			}
		}
		let goods = goodsList[0];
		if (goods.is_refunding) {
			//正在退款
			return {
				code: -1,
				message: "退款已申请"
			}
		}
		if (!goods.refund_money) {
			goods.refund_money = 0;
		}
		if (!goods.discount) {
			goods.discount = 0;
		}
		//可退金额
		goods.canRefundMoney = goods.total - goods.discount - goods.refund_money;
		if (goods.canRefundMoney < money) {
			return {
				code: -1,
				message: "可退金额错误"
			}
		}

		return this.service.mall.order.addRefund(goods, order, this.ctx.data, uid);
	}
}
