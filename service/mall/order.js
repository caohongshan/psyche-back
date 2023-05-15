const { ObjectId } = require('mongodb');
const { Service } = require('../../common/uni-cloud-router')

module.exports = class OrderService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('tian-mall-orders')
		this.refundCollection = db.collection('tian-mall-order-refunds')
		this.commentCollection = db.collection('opendb-mall-comments')
		this.goodsCollection = db.collection('opendb-mall-goods')
	}

	async performance(where) {
		return await this.collection.find(where).toArray();
	}

	async getGoodsCountById(uid, goods_id, sku_id) {
		const cmd = db.command;
		let {
			total
		} = await this.collection.where({
			user_id: uid,
			"goods.goods_id": goods_id,
			"goods.sku_id": sku_id,
			state: cmd.gt(0)
		}).count()
		return total;
	}
	/**
	 * 保存评价
	 * @param {Object} order
	 * @param {Object} info
	 */
	async comment(order, info, uid) {
		const cmd = db.command;
		const userInfo = await this.service.user.user.getInfoById(uid, ["nickname", "avatar"])
		//判断是否已经全部评价完成
		let saveData = {
			"goods.$.comment": info.comment,
			"goods.$.comment_rate": info.rate,
		}
		let unComments = order.goods.filter(g => !g.comment).filter(g => g.goods_id != info.goods_id && g
			.sku_id != info.sku_id)
		if (unComments.length == 0) {
			//已评价
			saveData.state = 4
		}
		//给指定商品增加评价
		await this.collection.where({
			_id: order._id,
			"goods.goods_id": info.goods_id,
			"goods.sku_id": info.sku_id,
		}).update(saveData)

		//一段时间后，保存到商品记录
		await this.commentCollection.add({
			goods_id: info.goods_id,
			user_id: uid,
			rate: info.rate,
			user: userInfo,
			content: info.comment,
			create_date: Date.now()
		})

		let { doc } = await this.goodsCollection.where({
			_id: info.goods_id
		}).updateAndReturn({
			comment_count: cmd.inc(1),
			comment_total_rate: cmd.inc(info.rate), //将来计算好评度
			comments: cmd.unshift({
				user_id: uid,
				rate: info.rate,
				user: userInfo,
				content: info.comment,
				create_date: Date.now()
			})
		})
		console.log("评论商品信息", doc)
		//数据库保存10条评论，前端只显示5条
		if (doc && doc.comments && doc.comments.length > 10) {
			//删除最后一条评论
			await this.goodsCollection.doc(info.goods_id).update({
				comments: cmd.pop()
			})
		}
	}
	/**
	 * 申请售后
	 */
	async addRefund(goods, order, data, uid) {
		//查询订单
		//生成退单号
		let id = await this.service.user.user.genIdentityId("tian-mall-order-refunds");
		console.log("开始创建退款订单", id)
		await this.refundCollection.add({
			...data,
			goods,
			platform: order.platform,
			dcloud_appid: order.dcloud_appid,
			payInfo: order.payInfo,
			total_fee: order.total_fee,
			shop_id: goods.shop_id,
			order_id: data.id,
			shop: order.shop,
			id,
			update_time: Date.now(),
			create_time: Date.now(),
			state: 0,
			user_id: uid
		})
		console.log("创建退款订单完成")
		//更新订单商品状态
		await this.collection.where({
			_id: data.id,
			"goods.goods_id": goods.goods_id,
			"goods.sku_id": goods.sku_id,
		}).update({
			"goods.$.is_refunding": 1,
		})
		console.log("更新订单商品状态完成")
		return true
	}
	async getRefundInfoById(id) {
		const {
			data
		} = await this.refundCollection.doc(id).get();
		if (data.length > 0) {
			return data[0];
		}
		return false;
	}
	async passRefund(info, adminUser) {
		let {
			_id,
			order_id,
			goods_id,
			sku_id,
			money
		} = info;
		const cmd = db.command;
		await this.refundCollection.doc(_id).update({
			state: 1, //通过
			update_time: Date.now(),
			operater_log: cmd.push({
				adminUser,
				message: "通过申请"
			})
		})
		if (order_id) {
			//2022-06-16直接调用退款接口，减轻定时器任务
			//更新订单
			await this.collection.where({
				_id: order_id,
				"goods.goods_id": goods_id,
				"goods.sku_id": sku_id,
			}).update({
				"goods.$.is_refunding": 0,
				"goods.$.refund_money": cmd.inc(money),
			})
		}
	}
	async rejectRefund(info, adminUser) {
		let {
			_id,
			order_id,
			goods_id,
			sku_id
		} = info;
		const cmd = db.command;
		await this.refundCollection.doc(_id).update({
			state: 2, //拒绝
			update_time: Date.now(),
			operater_log: cmd.push({
				adminUser,
				message: "拒绝申请"
			})
		})
		if (order_id) {
			//更新订单
			await this.collection.where({
				_id: order_id,
				"goods.goods_id": goods_id,
				"goods.sku_id": sku_id,
			}).update({
				"goods.$.is_refunding": 0,
			})
		}
	}

	async setDeliver({
		id,
		goods_id,
		sku_id,
		number,
		type,
		amount,
		company,
		code
	}, adminUser) {
		//查询订单
		let order = await this.getOrderById(id);
		if (!order) {
			return {
				code: -1,
				message: "订单不存在"
			}
		}
		if (order.state < 1) {
			return {
				code: -1,
				message: "订单已取消"
			}
		}
		/* let goods = order.goods;
		if (goods_id || sku_id) {
			//单品发货
			goods = goods.filter(g => {
				return g.goods_id == goods_id && (!sku_id || sku_id == g.sku_id);
			})
		} */
		const cmd = db.command;
		let delivers = order.delivers;
		console.log("order.delivers", order.delivers)
		if (!delivers) {
			delivers = [];
		}
		if (type != "add") {
			//优先找到相同单号的信息
			let oldIndex = delivers.findIndex(e => e.number == number && e.code == code);
			if (oldIndex != -1) {
				delivers.splice(oldIndex, 1)
				console.log("删除旧快递")
			} else {
				//push或者更新，编辑和删除都需要这一段
				oldIndex = delivers.findIndex(e => e.goods_id == goods_id && (!sku_id || e.sku_id == sku_id));
				console.log("oldIndex", oldIndex)
				if (oldIndex != -1) {
					delivers.splice(oldIndex, 1)
					console.log("删除旧数据")
				}
			}
		}
		if (type != "delete") {
			delivers.push({
				goods_id,
				sku_id,
				type,
				number,
				amount,
				company,
				code
			})
		}
		//判断是否全部都发货
		if (!goods_id || order.goods.length <= delivers.length) {
			order.state = 2;
		}

		//自动完成收货时间，默认7天自动完成收货
		let auto_finish_day = this.ctx.getConfigs.config("mall.order.auto_finish_day");
		if (!auto_finish_day) {
			auto_finish_day = 7
		}
		console.log("order.delivers", delivers)
		//所有商品都已经录入，才修改状态
		await this.collection.doc(id).update({
			state: order.state,
			delivers: delivers,
			finish_last_time: Date.now() + auto_finish_day * 3600 * 24 * 1000,
			logs: cmd.push({
				adminUser,
				time: Date.now(),
				title: "订单发货"
			})
		})
		if (type == "add") {
			//只有新增才发送短信通知
			try {
				//商品发货通知
				await this.service.sms.start_shipping.send({
					order_id: id,
					order
				})
			} catch (e) {
				console.log(e)
			}
		}
	}
	/**
	 * 买家确定收货，付款金额，全部到达商家账户goods_total_fee
	 * @param {Object} order
	 */
	async finish(order) {
		//更新订单为已收货3		//定时器更新返利
		let rebate_last_time = this.ctx.getConfigs.config("user.rebate_last_time");
		//判断是否为分账订单
		// if(order.)
		/* profitsharingTime: cmd.lt(Date.now()),
		isProfitsharing: false */
		let res = await this.collection.updateOne({ _id: order._id }, { 
			$set: {
				state: 3,
				finish_time: Date.now(),
				finish_state: 1,
				rebate_state: 1,
				rebate_last_time: Date.now() + rebate_last_time * 1000,
				logs: {
					time: Date.now(),
					title: "确定收货"
				}
			}
		});
		return res;
	}

	async getOrderLists(param) {
		return await this.collection.find(param).toArray();
	}

	async getOrderById(id, uid) {
		const newId = new ObjectId(id);

		let orderData = await this.collection.findOne({ _id: newId });
		
		if(!orderData) {
			orderData = []
		}

		if (orderData.length == 0) {
			return false;
		}
		//需要判断订单归属
		if (uid && orderData.user_id != uid) {
			return false;
		}
		let order = orderData;
		//如果订单已经发货，则把发货信息同步到商品上面
		if (order.delivers) {
			//统一发货
			let allDelivery = order.delivers.filter(e => !e.goods_id);
			//单品对象
			let goodsMap = order.delivers.filter(e => !!e.goods_id).reduce((pre, goods) => {
				pre[goods.goods_id + goods.sku_id] = goods;
				return pre;
			}, {});
			order.goods.forEach(goods => {
				//这种最多只有一条
				if (allDelivery && allDelivery.length > 0) {
					goods.delivery = allDelivery[0]
				}
				if (goodsMap[goods.goods_id + goods.sku_id]) {
					goods.delivery = goodsMap[goods.goods_id + goods.sku_id];
				}
			})
		}
		return order;
	}

	/**
	 * @param {Object} ids
	 * @param {Object} uid
	 */
	async getStatitics(uid) {}

	/**
	 * 定时器,1：确定收货订单，佣金到账
	 */
	async timer() {
		await this.rebateTimer();
		await this.groupBuyingTimer();
		await this.profitsharing();
		//自动取消未支付的订单
		await this.autoCancelUnPaiedOrder()
		await this.autoFinishOrder()
	}
	async autoFinishOrder() {
		const cmd = db.command;
		let {
			data
		} = await this.collection.where({
			state: 2,
			finish_last_time: cmd.lt(Date.now()), //自动收货最后时间
			finish_time: cmd.exists(false),
		}).orderBy("finish_last_time", "asc").limit(5).get();
		if (data.length == 0) {
			console.log("没有自动确定收货的订单")
			return;
		}
		for (let i = 0; i < data.length; i++) {
			let order1 = data[i]
			await this.finish(order1);
			console.log(`====【${i+1}】====处理完成`)
		}
	}
	async autoCancelUnPaiedOrder() {
		const cmd = db.command;
		let {
			data
		} = await this.collection.where({
			state: 0,
			last_pay_time: cmd.lt(Date.now()),
		}).field({
			user_id: 1,
			total_fee: 1,
		}).orderBy("last_pay_time", "asc").limit(5).get();
		if (data.length == 0) {
			console.log("没有未付款的订单")
			return;
		}
		for (let i = 0; i < data.length; i++) {
			let order1 = data[i]
			await this.service.order.mall.cancel(order1._id, order1.user_id, async (order) => {}, true,
				"system");
			console.log(`====【${i+1}】====处理完成`)
		}
	}

	/**
	 * 拼团订单，1小时之前(随机1-8小时)，自动处理
	 */
	async groupBuyingTimer() {
		let limit = 100;
		const cmd = db.command;
		let collection = db.collection('opendb-mall-goods-group-buying');
		let hour = parseInt(Math.random() * 8);
		let {
			data
		} = await collection.where({
			state: 1,
			end_time: cmd.lte(Date.now() + 3600 * hour * 1000)
		}).limit(limit).get();
		if (data.length == 0) {
			console.log("没有待处理的拼单")
			return;
		}
		let ids = data.map(e => e._id);
		//自动完成拼单
		await collection.where({
			_id: cmd.in(ids)
		}).update({
			state: 2
		})
		//更新订单状态
		let groupid = data.map(e => e.group_id);
		await this.collection.where({
			"group_buying.group_buying_id": cmd.in(groupid),
			state: 1
		}).update({
			group_buying: {
				state: 2,
				finish_time: Date.now()
			}
		})
		if (data.length == limit) {
			console.log("处理第二批拼单")
			//递归处理
			await this.groupBuyingTimer();
		}
	}

	async profitsharing() {
		console.log("开始处理商城订单分账")
		const cmd = db.command;
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
	async saveSendSmsResult(id, field) {
		const cmd = db.command;
		return this.collection.doc(id).update({
			send_sms: {
				[field]: cmd.inc(1)
			}
		});
	}
	/**
	 * 查询未完成的订单
	 * @param {Object} uid
	 */
	async getUnfinishCount(uid) {
		const cmd = db.command;
		let {
			total
		} = await this.collection.where({
			user_id: uid,
			state: cmd.in([1, 2]),
		}).count();
		return total;
	}
	/**
	 * 订单返利
	 */
	async rebateTimer() {
		const cmd = db.command;
		let { data } = await this.collection.where({
			rebates: cmd.exists(true),
			rebate_state: 1,
			rebate_last_time: cmd.lte(Date.now())
		}).field({
			id: 1,
			body: 1,
			shop: 1,
			total_fee: 1,
			payInfo: 1,
			rebates: 1
		}).limit(10).get();
		console.log("查询到待返利订单", data.length)
		if (data.length > 0) {
			let uids = [];
			for (let i = 0; i < data.length; i++) {
				let order = data[i];
				// for await (let order of data) {
				//更新订单状态，防止再次触发
				await this.collection.doc(order._id).update({
					rebate_state: 2,
					rebate_process_time: Date.now()
				})
				let {
					money_rate, //扣款比例
					settlement_mode, //结算方式：自动分账profit_sharing，余额提现balance
					uid: shopUid
				} = order.shop;
				let platformMoney = Math.floor(money_rate * order.total_fee / 100)
				//如果用户的支付类型是余额，则商家收款只能是余额
				if (order.payInfo.type == "balance") {
					settlement_mode = "balance";
				}
				console.log("platformMoney", platformMoney)
				if (settlement_mode == "profit_sharing") {
					if (platformMoney > 0) {
						order.receivers = [{
							type: "MERCHANT_ID",
							account: order.payInfo.mchId,
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
					let money = order.total_fee - platformMoney;
					//店主余额充值
					await this.service.user.user.editBalance(shopUid, money, "商城销售", 99, {
						_id: order._id,
						total_fee: order.total_fee,
						type: "mall"
					})
				}

				console.log("更新订单状态完成", order._id)
				for (let j = 0; j < order.rebates.length; j++) {
					let rebate = order.rebates[j]
					// for await (let rebate of order.rebates) {
					//推荐人，自己等人员
					if (rebate.type == "user") {
						if (rebate.money) {
							console.log("订单返现金")
							//uid, amount, comment
							await this.service.user.user.editBalance(rebate.id, rebate.money, "购买商品返利", 0, {
								_id: order._id,
								id: order.id,
								type: "mall",
								body: order.body,
							})
						}
						if (rebate.score) {
							console.log("订单返积分")
							// uid, amount, comment, level = 0, log
							await this.service.user.user.editScore(rebate.id, rebate.money, "购买商品积分", 0, {
								_id: order._id,
								id: order.id,
								type: "mall",
								body: order.body,
							})
						}
						if (uids.indexOf(rebate.id) == -1) {
							uids.push(rebate.id)
						}
					} else {
						//其他类型的统计
						await this.service.system.app.setScoreDayStatistics(rebate.amount,
							rebate.type, order.today);
					}
				}
			}
		}
	}
}
