const { Service } = require('../../common/uni-cloud-router')

module.exports = class CartService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('opendb-mall-cart')
	}

	/**
	 * @param {Object} ids
	 * @param {Object} uid
	 */
	async getGoodsByIds(ids, uid) {
		let res = await this.collection.where({
			_id: await db.command.in(ids),
			user_id: uid
		}).field({
			goods_id: 1,
			sku_id: 1,
			amount: 1,
		}).get();
		return res.data;
	}
	/**
	 * 从购物车移除
	 * @param {Object} uid 用户id
	 * @param {Object} ids 购物车id
	 */
	async remove(uid, ids) {
		return await this.collection.where({
			_id: this.db.command.in(ids),
			user_id: uid
		}).remove();
	}
}
