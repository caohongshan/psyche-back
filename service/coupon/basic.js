const { Service } = require('../../common/uni-cloud-router')
const { getTodayTime } = require('../util');
/**
 * 优惠券父类
 */
module.exports = class BasicService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection("tian-mall-coupons")
		this.userCollection = db.collection("tian-mall-coupon-users")
	}
	async checkGoodsCoupon(goodsList, shop_id, user_id, coupon_id) {
		//不使用优惠券
		if (coupon_id == "none") {
			return;
		}
		//一件商品只能用一张
		let t = Date.now();
		//所有商品的统计，总价，数量，分类下的总价和数量
		let data = this.getGoodsStatics(goodsList)
		//查询这个店铺可用的优惠券(店铺券，分类券，商品券)
		let mineCondition = {
			shop_id,
			user_id,
			state: 1, //1有效，2已使用
			begin_time: {$lt: t},
			end_time: {$gt: t}
		};
		//查询指定的优惠券id，后面在判断的时候，优惠券也只存在一条
		if (coupon_id) {
			mineCondition._id = coupon_id;
		}
		const coupons = await this.getMine(mineCondition)
		if (coupons.length == 0) {
			//没有优惠券
			return {
				coupons: [],
				couponsDisabled: [],
				coupon_id: "",
				couponsChecked: {},
			};
		}
		//可用优惠券
		data.coupons = [];
		//不可用优惠券
		data.couponsDisabled = [];
		//判断可用和不可用
		let isChecked = false;
		for (let cou of coupons) {
			//获得指定类型的优惠券
			cou.checked = false;
			//处理符合优惠券的商品信息
			this.service.coupon[cou.style].statistical(cou, data);
		}
		//抽取可用优惠券
		for (let cou of coupons) {
			//判断条件，所有优惠券只能用一张
			if (this.service.coupon[cou.style].check(cou)) {
				data.coupons.push(cou);
			} else {
				//不可用
				data.couponsDisabled.push(cou);
			}
		}
		//根据优惠金额倒序排序
		data.coupons.sort((a, b) => b.discount - a.discount);
		//默认选中第一个
		if (data.coupons.length > 0) {
			data.couponsChecked = data.coupons[0];
			data.coupon_id = data.couponsChecked._id;
		}

		console.log("data", data)
		return data;
	}
	/**
	 * 使用优惠券
	 * @param {Object} data
	 */
	async useCoupon(data, uid, coupon_id) {
		if (!data.couponsChecked || !data.couponsChecked._id || data.couponsChecked._id != coupon_id) {
			return;
		}
		let t = Date.now()
		const cmd = this.db.command;
		//总优惠
		data.discount += data.couponsChecked.discount;
		//支付金额
		data.total_fee -= data.couponsChecked.discount;
		let per = data.couponsChecked.discount / data.couponsChecked.totalMoney;
		let extGoods = data.goodsList.filter(g => data.couponsChecked.innerGoodsIds && data.couponsChecked
			.innerGoodsIds.indexOf(g.goods_id) != -1)
		//分摊优惠到各个商品
		let index = 0;
		data.goodsList.forEach(g => {
			if (data.couponsChecked.innerGoodsIds && data.couponsChecked.innerGoodsIds.indexOf(g
					.goods_id) != -1) {
				let discount = 0
				if (index < extGoods.length - 1) {
					discount = Number((per * g.total).toFixed(2));
					data.couponsChecked.discount -= discount
				} else {
					discount = data.couponsChecked.discount;
				}
				g.discount += discount
			}
		});
		//console.log(JSON.stringify(data.goods))
		//更新优惠券为已使用，使用时间
		await this.userCollection.findOneAndUpdate({
				_id: data.coupon_id,
				state: 1, user_id: uid, begin_time: { $lt: t }, end_time: { $gt: t } 
			},
			{ state: 2, use_time: Date.now() }
		);
		//更新优惠券已使用数量
		await this.collection.doc(data.couponsChecked.id).update({
			used_count: cmd.inc(1)
		})
		console.log("使用优惠券成功", data.coupon_id, data.couponsChecked.id);
	}
	/**
	 * 用户领取优惠券
	 * @param {Object} coupon
	 * @param {Object} uid
	 */
	async takeit(coupon, uid) {
		coupon.id = coupon._id;
		delete coupon._id;
		//判断是否当天有效
		if (coupon.today) {
			//今天23:59:59
			coupon.end_time = getTodayTime(1, true) - 1
		}
		console.log("uid", uid)
		await this.userCollection.add({
			...coupon,
			created: Date.now(),
			user_id: uid
		})
		//更新优惠券领取数量
		await this.collection.doc(coupon.id).update({
			get_count: this.db.command.inc(1),
			stock: this.db.command.inc(-1),
		})
		return {
			code: 0,
			message: '领取成功'
		}
	}
	async getById(id, shop_id) {
		let t = Date.now();
		let res = await this.collection.where({
			shop_id,
			_id: id,
			state: 1,
			begin_time: this.db.command.lt(t),
			end_time: this.db.command.gt(t)
		}).limit(1).get();
		if (res.data.length == 0) {
			return false;
		}
		return res.data[0];
	}
	async getMineById(id, uid) {
		let t = Date.now();
		let res = await this.userCollection.where({
			id,
			user_id: uid,
			state: 1, //1有效，2已使用
			begin_time: this.db.command.lt(t),
			end_time: this.db.command.gt(t), //有可能是领取当天的结束时间戳
		}).get();
		return res.data;
	}
	async getMine(where) {
		let res = await this.userCollection.findOne(where,{
			"limit": 1,
			"condition": 1,
			"price": 1,
			"id": 1,
			"title": 1,
			"category_id": 1,
			"goods_ids": 1, 
			"end_time": 1, 
			"begin_time": 1, 
			"style": 1, 
			"type": 1
		});
		return res?.data || [];
	}
	async getMyCount(user_id) {
		let t = Date.now();
		let {
			total
		} = await this.userCollection.where({
			user_id,
			state: 1, //1有效，2已使用
			begin_time: this.db.command.lt(t),
			end_time: this.db.command.gt(t)
		}).field({
			"limit": 1,
			"condition": 1,
			"price": 1,
			"id": 1,
			"title": 1,
			"category_id": 1,
			"goods_ids": 1,
			"end_time": 1,
			"begin_time": 1,
			"style": 1,
			"type": 1,
		}).count();
		return total;
	}
	async getGoodsCouponsList(data) {

	}
	/**
	 * @param {Object} data
	 */
	getGoodsStatics(goodsList) {
		let data = {}
		let goodsIds = [];
		//所有商品总价统计
		data.goodsTotalMoney = 0;
		data.goodsTotalMoneyMap = {};
		//所有商品数量统计
		data.goodsTotalAmount = 0;
		data.goodsTotalAmountMap = {};
		//分类累加统计
		data.goodsTotalCategoryMap = {};
		goodsList.map(g => {
			//秒杀商品不能使用优惠券会员商品也不能使用优惠券
			if (!g.miaosha && !g.is_vip) {
				//多规格，合并为一条
				if (goodsIds.indexOf(g.goods_id) == -1) {
					goodsIds.push(g.goods_id);
					data.goodsTotalMoneyMap[g.goods_id] = g.total;
					data.goodsTotalAmountMap[g.goods_id] = g.amount;
				} else {
					data.goodsTotalMoneyMap[g.goods_id] += g.total;
					data.goodsTotalAmountMap[g.goods_id] += g.amount;
				}
				if (g.category_id) {
					g.category_id.map(cid => {
						if (!data.goodsTotalCategoryMap[cid]) {
							data.goodsTotalCategoryMap[cid] = {
								total: 0,
								totalAmount: 0,
								gids: []
							}
						}
						data.goodsTotalCategoryMap[cid].totalAmount += g.amount;
						data.goodsTotalCategoryMap[cid].total += g.total;
						data.goodsTotalCategoryMap[cid].gids.push(g.goods_id);
					});
				}

				data.goodsTotalAmount += g.amount;
				data.goodsTotalMoney += g.total;
			}
		});
		data.goodsTotalIds = goodsIds;
		return data;
	}
}
