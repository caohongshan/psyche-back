const crypto = require('crypto');
const { getTodayTime } = require('../util');
const { Service } = require('../../common/uni-cloud-router')

module.exports = class GoodsService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('opendb-mall-goods');
		this.favCollection = db.collection('opendb-mall-goods-favorite');
		this.skuCollection = db.collection('opendb-mall-sku');
		this.goodsDayscollection = db.collection('opendb-mall-goods-days')
		this.goodsMiaoshaDayscollection = db.collection('tian-mall-hour-miaosha-goods')
	}
	async getGoodsSkuByCart(goodsData, member, useScoreRate, usedScore, score2moneyRate, exchange_points_for_cash,
		uid) {
		let divider = "&gt;";
		let discount = 0;
		let total = 0;
		let use_score_total = 0;
		let needScore = 0;
		let shopIds = [];
		let gids = goodsData.map(car => car.goods_id);
		let skuids = goodsData.map(car => car.sku_id);
		let goodsDataMap = await this.getGoodsByIds(gids, true);
		let skuDataMap = await this.getGoodsSkuByIds(skuids, true);
		let disable = false;
		let needAddress = false;
		let group_buying_id = "",
			group_buying = false;
		let time = Date.now();
		for (let i = 0; i < goodsData.length; i++) {
			let goods = goodsData[i]
			goods.discount = 0;
			//商品数量必须是整数
			goods.amount = goods.amount > 1 ? parseInt(goods.amount) : 1;
			if (goods.group_buying) {
				group_buying = goods.group_buying;
				group_buying_id = goods.group_buying_id;
			}
			goods = Object.assign(goods, {
				...goodsDataMap[goods.goods_id],
				...skuDataMap[goods.sku_id],
			})
			//判断秒杀，单规格或者匹配多规格
			const miaosha = goods.miaosha;
			if (miaosha && miaosha.begin_time < time && miaosha.end_time > time && (!goods.sku_id ||
					goods.sku_id == miaosha.sku_id)) {
				//修改商品价格为秒杀价
				if (!goods.market_price) {
					goods.market_price = goods.price
				}
				//如果存在规格，则修改规格的价格
				//现价，四色五人
				if (miaosha.price) {
					goods.price = miaosha.price;
				} else {
					goods.price = parseInt(goods.price * miaosha.discount / 100);
				}
				//判断秒杀限制
				if (miaosha.is_limit) {
					//限制每个用户只能购买的数量，需要查询往期订单购买数量
					if (miaosha.limit_user_count > 0) {
						//实时查询，保证数据真实性
						let beforeTotal = await this.service.mall.order.getGoodsCountById(uid, goods
							.goods_id, goods.sku_id)
						if (miaosha.limit_user_count - beforeTotal <= 0) {
							return {
								code: -2,
								message: `${goods.name}秒杀限购${miaosha.limit_user_count}件`
							}
						}
						if (miaosha.limit_user_count < goods.amount) {
							goods.amount = miaosha.limit_user_count;
						}
					}
					//限制每单购买数量,0表示不限制
					if (miaosha.limit_order_count > 0 && miaosha.limit_order_count < goods.amount) {
						goods.amount = miaosha.limit_order_count
					}
				}
			} else {
				//删除秒杀属性
				delete goods.miaosha;
			}
			if (group_buying && goods.group_buying) {
				//拼单优惠
				if (goods.group_buying_discount > 0) {
					goods.discount += goods.group_buying_discount * goods.amount;
					// discount += goods.group_buying_discount * goods.amount;
				}
			} else {
				//删除拼单信息
				delete goods.group_buying;
			}
			//库存不足
			goods.disable = goods.stock - goods.amount < 0;
			if (goods.disable) {
				disable = true;
			}
			if (goods.is_real) {
				needAddress = true;
			}
			//处理多规格名称为+
			goods.sku_name = goods.sku_name ? goods.sku_name.split(divider).join("+") : "";
			total += goods.total = goods.price * goods.amount;
			//会员商品，显示会员价格
			if (goods.is_vip && member && member.enable) {
				//完全是整数乘除，避免double类型错误
				goods.discount += (goods.price * goods.amount * (100 - parseInt(member.rate * 100))) / 100;
				goods.member = member;
			}
			//使用积分总数/商品总数=使用比例，这里只用作初次预结算
			if (goods.use_score_rate && goods.use_score_rate > 0 && score2moneyRate > 0) {
				//需要多少积分金钱，单位是分，必须是整数
				goods.scoreMoney = parseInt(goods.use_score_rate * goods.price);
				//转换为积分个数
				let scoreCount = parseInt(goods.scoreMoney / score2moneyRate / 100);
				goods.use_score = scoreCount;
				use_score_total += scoreCount * goods.amount;
				//商品原总价
				goods.origin_price = goods.price;
				//积分+现金模式
				if (!usedScore) {
					// if (exchange_points_for_cash) {
					// 	goods.price = goods.price - goods.scoreMoney;
					// }
					needScore += goods.use_score * goods.amount;
				}
			} else if (goods.use_score) {
				//直接使用积分
				goods.scoreMoney = goods.use_score * score2moneyRate * 100;
				goods.origin_price = goods.price;
				use_score_total += goods.use_score * goods.amount;
				if (!usedScore) {
					// if (exchange_points_for_cash) {
					// 	goods.price = parseInt((goods.price - goods.scoreMoney).toFixed(2));
					// }
					needScore += goods.use_score * goods.amount;
				}
			}
			if (goods.shop_id && shopIds.indexOf(goods.shop_id) == -1) {
				shopIds.push(goods.shop_id);
			}

			discount += goods.discount;
		}
		if (disable) {
			return {
				code: -1,
				message: '商品库存不足'
			}
		}
		if (usedScore) {
			//分摊商品积分，分摊比例
			let rate = usedScore / use_score_total;
			let preUseScore = 0;
			console.log("分摊比例", usedScore, use_score_total, rate);
			//filter后，修改数组元素，会修改原来的数据
			goodsData.filter(e => e.use_score).forEach((goods, index, arr) => {
				if (index != arr.length - 1) {
					//实际使用积分数量
					goods.use_score = parseInt(goods.use_score * rate);
					//积分转成金额，计算商品单价，单位为分
					goods.scoreMoney = goods.use_score * score2moneyRate * 100;
					// if (exchange_points_for_cash) {
					// 	goods.price = goods.origin_price - goods.scoreMoney;
					// }
					goods.total_use_score = goods.use_score * goods.amount;
					needScore += goods.total_use_score;
					preUseScore = needScore;
				} else {
					//如果是最后一个，则兜底所有积分
					goods.use_score = usedScore - needScore
					//积分转成金额，计算商品单价，单位为分
					goods.scoreMoney = goods.use_score * score2moneyRate * 100;
					// if (exchange_points_for_cash) {
					// 	goods.price = goods.origin_price - goods.scoreMoney;
					// }
					goods.total_use_score = goods.use_score * goods.amount;
					needScore = usedScore;
				}

			});
		}
		let shopList = await this.service.mall.shop.getInfoByIds(shopIds);
		
		if (shopList) {
			let offlineGoods = []
			//把商品放到店铺里面
			goodsData.map(goods => {
				if (shopList[goods.shop_id]) {
					shopList[goods.shop_id].goodsList.push(goods)
				} else {
					offlineGoods.push(goods.goods_id)
				}
				shopList = [shopList[goods.shop_id]]
			})
			//只返回店铺存在的数据
			// shopList = Object.values(shopList)
			

			if (offlineGoods.length > 0) {
				//这种情况，需要下架商品
				// await this.collection.where({
				// 	_id: cmd.in(offlineGoods)
				// }).update({
				// 	is_on_sale: false,
				// 	message: "店铺不存在，系统自动下架"
				// })
			}
		}

		return {
			discount,
			total,
			needScore,
			group_buying,
			group_buying_id,
			use_score_total,
			shopIds,
			shopList,
			needAddress
		};
	}
	async addGoodsByApi(data) {
		//判断goods_sn是否重复
		if (data.goods_sn) {
			const {
				updated
			} = await this.collection.where({
				goods_sn: data.goods_sn
			}).update({
				...data,
				"last_modify_date": Date.now()
			})
			if (updated > 0) {
				console.log("更新完成")
				return {
					updated
				}
			}
		}
		console.log("开始新增")
		//都按单规格来处理
		return this.collection.add({
			"seller_note": "",
			"market_price": 0,
			"price": 100,
			"goods_sn": Date.now() + '' + (Math.random() + '').substr(2, 5),
			...data,
			dcloud_appid: this.ctx.context.APPID,
			"add_date": Date.now(),
			"last_modify_date": Date.now(),
			"remain_count": parseInt(Math.random() * 500),
			"month_sell_count": parseInt(Math.random() * 100),
			"total_sell_count": parseInt(Math.random() * 5100),
			"comment_count": 0,
			"is_real": true,
			"is_on_sale": true,
			"is_alone_sale": true,
			"is_best": false,
			"is_new": true,
			"is_hot": false,
		})
	}

	async getGoodsByIds(ids, isMap = false) {
		let res = await this.collection.find({
			_id:  { $in : ids },
			is_on_sale: true
		}).project({
			_id: 1,
			goods_sn: 1,
			name: 1,
			is_vip: 1,
			category_id: 1,
			commission_rate: 1,
			express_id: 1,
			goods_thumb: 1,
			remain_count: 1,
			use_score: 1,
			shop_id: 1,
			is_real: 1, //是否实物
			offline_time: 1, //下架时间
			use_score_rate: 1,
			rebate_score_rate: 1,
			rebate_money_rate: 1,
			rebate_self_money: 1,
			rebate_service: 1,
			rebate_pension_dividends: 1,
			rebate_score_dividends: 1,
			get_service_month: 1,
			vip_level_id: 1,
			group_buying: 1,
			group_buying_discount: 1,
			miaosha: 1,
			price: 1,
			market_price: 1,
		}).toArray();
		if (isMap) {
			//单规格库存
			res.forEach(item => {
				item.stock = item.remain_count;
			})
			return this.buildMap(res);
		}
		return res;
	}

	async search(id) {
		const res = await this.collection.findOne({ _id: id })
		return res;
	}

	async update(id, data) {
		return await this.collection.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
		);
	}

	async add(data) {
		const res = await this.collection.insertOne({
			_id: crypto.randomBytes(8).toString('hex'),
			...data
		});

		const insertedData = await this.collection.findOne(
			{_id: res.insertedId},
		);
		return insertedData;
	}

	async remove(id) {
		return await this.collection.deleteOne({ _id: id });
	}

	async getGoodsSkuByIds(ids, isMap = false) {
		if (ids && ids.length > 0) {
			let res = await this.skuCollection.find({
				_id: { $in: ids },
			}).project({
				_id: 1,
				sku_name: 1,
				goods_thumb: 1,
				stock: 1,
				price: 1,
				market_price: 1,
			}).toArray();
			if (isMap) {
				res.forEach(item => {
					//删除缩略图字段
					if (!item.goods_thumb) {
						delete item.goods_thumb;
					}
				})
				return this.buildMap(res);
			}
			return res;
		}
		return {}
	}

	async setFavorite(uid, goods_id, isFav) {
		let res = await this.favCollection.where({
			goods_id: goods_id,
			user_id: uid
		}).field({
			goods_id: 1
		}).limit(1).get();
		if (isFav) {
			//已收藏
			if (res.data.length > 0) {
				return true;
			}
			await this.favCollection.add({
				goods_id: goods_id,
				user_id: uid,
				create_date: Date.now(),
				update_date: Date.now(),
			})
			return true;
		} else {
			if (res.data.length == 0) {
				return false;
			}
			await this.favCollection.doc(res.data[0]._id).remove();
			return false;
		}
	}


	buildMap(res) {
		let data = {}
		res.map(item => {
			data[item._id] = {
				...item,
				_id: undefined
			}
		})
		return data;
	}
	/**
	 * 更新商品每日销量，按店铺分组
	 * @param {Object} goodsList
	 */
	async updateGoodsDaySales(goodsList, shop_id) {
		// console.log("goodsList", goodsList)
		console.log("商品每日销售记录，放到每件商品的day_sales，每日首次访问更新month_sell_count，在goods_visite action中处理")
		return false;
		const cmd = db.command;
		let today = getTodayTime(0, 1);
		let goods = {};
		goodsList.map(g => {
			if (!goods[g.goods_id]) {
				goods[g.goods_id] = g.amount * 1
			} else {
				goods[g.goods_id] += g.amount * 1
			}
		})
		//转换成
		let goods_save = {}
		let goods_new_save = {}
		for (let id in goods) {
			goods_save[id] = cmd.inc(goods[id])
			goods_new_save[id] = goods[id]
		}
		console.log("goods", goods)
		//更新商品的销量统计,不可撤销，后面定时器更新商品月售
		let {
			updated
		} = await this.goodsDayscollection.where({
			day: today,
			shop_id
		}).update({
			goods: goods_save
		})
		//需要新增
		if (updated == 0) {
			return await this.goodsDayscollection.add({
				day: today,
				shop_id,
				goods: goods_new_save
			})
		}
		return {
			updated
		}
	}
	/**
	 * 更新商品销量
	 * @param {Object} goodsList
	 */
	async updateGoodsSkuSales(goodsList, shop_id) {
		const cmd = db.command;
		let today = getTodayTime(0, 1);
		//按数量统计商品，然后分批递增
		let goodsAmount = {};
		let skuAmount = {};
		let miaoshaList = []
		goodsList.map(g => {
			if (!goodsAmount[g.amount]) {
				goodsAmount[g.amount] = [];
			}
			goodsAmount[g.amount].push(g.goods_id);
			if (g.sku_id) {
				if (!skuAmount[g.amount]) {
					skuAmount[g.amount] = [];
				}
				skuAmount[g.amount].push(g.sku_id);
			}
			if (g.miaosha) {
				miaoshaList.push({
					...g.miaosha,
					goods_id: g.goods_id,
					sku_id: g.sku_id,
					amount: g.amount
				})
			}
		})
		console.log(goodsAmount, skuAmount)
		//对象转换成数组
		let goodsList2 = [];
		for (let amount in goodsAmount) {
			goodsList2.push({
				amount: parseInt(amount),
				ids: goodsAmount[amount]
			})
		}
		for (let i = 0; i < goodsList2.length; i++) {
			let g = goodsList2[i]
			await this.collection.where({
				_id: cmd.in(g.ids)
			}).update({
				//2022-07-12增加每日统计，last_update_sell:xxx，最后更新销量日期
				day_sales: {
					[today]: cmd.inc(g.amount),
				},
				month_sell_count: cmd.inc(g.amount),
				total_sell_count: cmd.inc(g.amount),
				remain_count: cmd.inc(g.amount * -1),
			})
		}

		let skuList2 = [];
		for (let amount in skuAmount) {
			skuList2.push({
				amount: parseInt(amount),
				ids: skuAmount[amount]
			})
		}
		for (let i = 0; i < skuList2.length; i++) {
			let g = skuList2[i]
			await this.skuCollection.where({
				_id: cmd.in(g.ids)
			}).update({
				stock: cmd.inc(g.amount * -1),
			})
		}
		//更新商品的秒杀统计
		for (let i = 0; i < miaoshaList.length; i++) {
			let miaosha = miaoshaList[i]
			//更新秒杀库存和销量
			if (miaosha.miaosha_goods_id) {
				let miaoshaUpdateData = {
					sale_count: cmd.inc(miaosha.amount)
				}
				//存在秒杀限购，更新总库存，将来需要使用redis来控制产量
				if (miaosha.is_limit) {
					miaoshaUpdateData.limit_stock = cmd.inc(miaosha.amount * -1)
				}
				await this.goodsMiaoshaDayscollection.doc(miaosha.miaosha_goods_id).update(miaoshaUpdateData)
				//同时更新商品的秒杀数据
				await this.collection.doc(miaosha.goods_id).update({
					miaosha: miaoshaUpdateData
				})
				console.log("更新秒杀库存完成")
			}
		}
	}

	async getGoodsList({ where, orderby, page_no, page_size }) {
		const res = await this.collection.find(where)
					.project({
						goods_sn: 1,
						name: 1,
						keywords: 1,
						miaosha: 1,
						shop_id: 1,
						goods_summary: 1,
						goods_thumb: 1,
						goods_banner: 1,
						price: 1,
						market_price: 1,
						sku_name: 1,
						is_vip: 1,
						remain_count: 1,
						month_sell_count: 1, 
						total_sell_count: 1, 
						comment_count: 1, 
						is_real: 1, 
						is_on_sale: 1, 
						is_alone_sale: 1,
						is_best: 1,
						is_new: 1,
						is_hot: 1,
						add_date: 1,
						last_modify_date: 1,
						use_score: 1,
						use_score_rat: 1,
					})
					.sort(orderby)
					.skip((page_no - 1) * page_size)
					.limit(page_size)
					.toArray()
		return res;
	}
}
