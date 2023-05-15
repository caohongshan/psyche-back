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
	/**
	 * 删除购物车
	 */
	async remove() {
		let { ids } = this.ctx.event.data;
		const { uid } = this.ctx.auth;
		if (!uid || !ids || ids.length == 0) {
			return false;
		}
		return await this.service.mall.cart.remove(uid, ids)
	}
	async getsku() {
		let { where } = this.ctx.event.data;
		const data = await db.collection("opendb-mall-sku").find(where).toArray()
		return { result: data };
	}
}
