const { Service } = require('../../common/uni-cloud-router')

module.exports = class AddressService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('uni-id-address')
	}
	/**
	 * 查询用户默认收货地址
	 * @param {Object} user_id
	 */
	async getDefaultInfo(user_id) {
		//按默认排序
		const res = await this.collection.find({
			user_id
		}).sort({ is_default : -1 }).project({
			_id: 1,
			name: 1,
			alias: 1,
			mobile: 1,
			area_code: 1,
			address: 1,
			formatted_address: 1,
		}).limit(1).toArray();

		if (res.length == 0) {
			return false;
		}
		return res[0];
	}
	/**
	 * 根据地址id查询用户默认收货地址
	 * @param {Object} user_id
	 * @param {Object} address_id
	 */
	async getInfoById(user_id, address_id) {
		//按默认排序
		const res = await this.collection.where({
			user_id,
			_id: address_id
		}).limit(1).get();
		if (res.data.length == 0) {
			return false;
		}
		return res.data[0];
	}
}
