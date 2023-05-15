const {
	Service
} = require('../../common/uni-cloud-router')
module.exports = class CollectionService extends Service {
	async getAll(collection, condition, withoutId = false) {
		this.collection = this.db.collection(collection);
		this.condition = condition;
		return this.getDataByPage(1, 500, withoutId);
	}

	async getDataByPage(page, limit = 500, withoutId = false) {
		let {
			data
		} = await this.collection.where(this.condition).skip((page - 1) * limit).limit(limit).get();
		if (withoutId) {
			//删除_id
			data.forEach(e => {
				delete e._id;
			})
		}
		if (data.length == limit) {
			//查询下一页
			let nextPage = await this.getDataByPage(page + 1, limit, withoutId);
			data = data.concat(nextPage)
		}
		return data;
	}
}
