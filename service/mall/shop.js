const {	getTodayTime } = require('../util');
const {	Service } = require('../../common/uni-cloud-router')

module.exports = class ShopService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('tian-mall-shops')
	}
	async getShopIdByAppId(app_id) {
		let {
			data
		} = await this.collection.where({
			app_id
		}).field({
			name: 1
		}).limit(1).get();
		if (data.length > 0) {
			return data[0]._id;
		}
		return false;
	}
	async getShopById(id) {
		let {
			data
		} = await this.collection.doc(id).get();
		if (data.length == 0) {
			return false;
		}
		return data[0];
	}
	async getShopCacheById(id, isDebug) {
		return this.ctx.memorycache("shop_id_" + id, null, isDebug ? 10 : 3600, async () => {
			console.log("查询店铺信息")
			return this.getShopById(id)
		})
	}

	async save(id, data) {
		return this.collection.doc(id).update(data);
	}

	/**
	 * 查询多个店铺map 内存缓存1小时
	 * @param {Object} shopIds
	 */
	async getInfoByIds(shopIds) {
		return this.ctx.memorycache("shop_ids_" + shopIds.join("_"), null, 3600, async () => {
			const { data } = await this.collection.findOne({ data: { $elemMatch: { _id: { $in: shopIds }, state: true, online: true } } });
			console.log("res===", data)
			
			// let data = await this.collection.find({
			// 	"data._id": { $in: shopIds },
			// 	"data.state": true,
			// 	"data.online": true,
			// }).project({
			// 	"data.id": 1,
			// 	"data.name": 1,
			// 	"data.src": 1,
			// 	"data.payments": 1, //支付方式
			// 	"data.uid": 1, //店主id
			// 	"data.mall_payment": 1, //商城支付配置
			// 	"data.online": 1,
			// }).toArray();

			// console.log("data==lll", data)

			if (data.length == 0) {
				return false;
			}
			return data.reduce((pre, item) => {
				item.goodsList = [];
				item.freight = 0;
				if (item.payments) {
					item.payments = JSON.parse(item.payments)
				} else {
					item.payments = {}
				}
				//合并到店铺信息里面
				if (item.mall_payment) {
					Object.assign(item, JSON.parse(item.mall_payment))
					delete item.mall_payment;
				}
				pre[item._id] = item;
				return pre;
			}, {})
		});
	}

	async updateShopSaleCount(shop_id, amount) {
		const cmd = this.db.command;
		console.log("updateShopSaleCount", shop_id, amount)
		let today = getTodayTime(0, 1);
		await this.collection.doc(shop_id).update({
			//2022-07-12增加每日统计，last_update_sell:xxx，最后更新销量日期
			day_sales: {
				[today]: cmd.inc(amount),
			},
			month_sell: cmd.inc(amount),
			total_sell_count: cmd.inc(amount),
		})
	}
	
	/**
	 * 定时器,1：确定收货订单，佣金到账
	 */
	async timer() {}
}
