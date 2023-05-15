const crypto = require('crypto');
const {	Service } = require('../../common/uni-cloud-router')

module.exports = class CategoryService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('opendb-mall-categories');
	}

	async all() {
		//都按单规格来处理
		const data = await this.collection.find({}).project({
			name: 1,
			parent_id: 1,
			sort: 1,
			status: 1
		}).toArray();

		let parentData = {};
		//获取父级列表
		data.filter(e => !e.parent_id).map(e => {
			delete e.parent_id;
			delete e.sort;
			parentData[e._id] = {
				...e,
				children: []
			}
		})
		//放到父级
		data.map(e => {
			let parent_id = e.parent_id;
			if (parent_id && parentData[parent_id]) {
				delete e.parent_id;
				delete e.sort;
				parentData[parent_id].children.push(e)
			}
		})
		let out = [];
		for (let pid in parentData) {
			out.push(parentData[pid])
		}
		return out;
	}

	async allInit({
		shop_id,
		division = "|-"
	}) {
		//都按单规格来处理
		let {
			data
		} = await this.collection.where({
			status: true,
			shop_id
		}).field({
			name: 1,
			parent_id: 1,
			sort: 1,
		}).orderBy("sort", "asc").limit(500).get();

		let parentData = {};
		//获取父级列表
		data.filter(e => !e.parent_id).map(e => {
			delete e.parent_id;
			delete e.sort;
			parentData[e._id] = {
				...e,
				children: []
			}
		})
		//放到父级
		data.map(e => {
			let parent_id = e.parent_id;
			if (parent_id && parentData[parent_id]) {
				if (division) {
					e.name = division + e.name;
				}
				delete e.parent_id;
				delete e.sort;
				parentData[parent_id].children.push(e)
			}
		})
		let out = [];
		for (let pid in parentData) {
			out.push(parentData[pid])
		}
		return out;
	}

	async update(id, value) {
		const res = await db.collection("tian-mall-categories").findOneAndUpdate(
			{ _id: id },
			{ $set: value },
		  );
		return res;
	}

	async add(data) {
		return await db.collection("tian-mall-categories").insertOne({
			_id: crypto.randomBytes(8).toString('hex'),
			...data
		});
	}

	async search(id) {
		const data = await db.collection("tian-mall-categories").findOne({ _id: id })
		return data;
	}

	async remove(ids) {
		return await db.collection("tian-mall-categories").deleteMany({
			_id: { $in: ids.split(",") }
			// user_id: uid
		});
	}
}
