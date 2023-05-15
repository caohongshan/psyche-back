const { Controller } = require('../../common/uni-cloud-router')

module.exports = class CartController extends Controller {
	async categories() {
		const data = await db.collection("tian-mall-categories").find({status: true}).project({
			parent_id: 1,
			name: 1,
			icon: 1,
			sort: 1,
			ad_banner: 1,
			ad_open_url: 1
		  }).sort({sort : 1}).toArray();
		// 将数组转换为对象映射表
		const map = {};
		data.forEach(item => {
			item.children = [];
			map[item._id] = item;
		});
		// 构建树形结构
		const tree = [];
		Object.values(map).forEach(item => {
			if (item.parent_id) {
				map[item.parent_id].children.push(item);
			} else {
				tree.push(item);
			}
		});
		return tree;
	}

	async all() {
		return await this.service.mall.category.all();
	}

	async search() {
		let { id } = this.ctx.event.data;
		return await this.service.mall.category.search(id);
	}

	async update() {
		const { id, value } = this.ctx.event.data;	//获取条件数据类型和条件值(条件值可以是数字或字
		return this.service.mall.category.update(id, value);
	}

	async add() {
		const { value } = this.ctx.event.data;	//获取条件数据类型和条件值(条件值可以是数字或字
		return this.service.mall.category.add(value);
	}

	/**
	 * 删除分类
	 */
	async remove() {
		let { ids } = this.ctx.event.data;
		return await this.service.mall.category.remove(ids)
	}
}
