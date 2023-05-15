const {	Controller } = require('../../common/uni-cloud-router')

module.exports = class GoodsController extends Controller {
	/**
	 * 收藏/取消
	 */
	async favorite() {
		let {
			goods_id,
			isFav
		} = this.ctx.data;
		const {
			uid,
		} = this.ctx.auth;
		return await this.service.mall.goods.setFavorite(uid, goods_id, isFav)
	}
	async categories() {
		return this.service.mall.category.all(this.ctx.query)
	}
	async imports() {
		console.log("开始导入商品")
		let data = {};
		if (!this.ctx.data["name"]) {
			//标题不能为空
			console.log("数据为空")
			return false;
		}
		if (this.ctx.query.download) {
			console.log("下载文件")
			this.ctx.data["goods_banner_imgs"] = await this.service.system.util.uploadFileByUrl(this.ctx.data[
				"goods_banner_imgs"])
			//详情图太多
			/* this.ctx.data["goods_desc"] = await this.service.system.util.uploadFileByUrl(this.ctx.data[
				"goods_desc"]) */
		}
		for (let key in this.ctx.data) {
			//去除多余的空格，换行
			let item = this.ctx.data[key];
			//多图提取第一张为封面图
			if (key == "goods_banner_imgs") {
				//没有单独上传封面图的情况,把多图拿一张来做封面
				if (item.length > 0) {
					data["goods_thumb"] = item[0]
				}
			} else if (key == "price" || key == "market_price") {
				item = parseInt(item * 100)
			}
			data[key] = item;
		}
		//轮播图第一张固定是封面图
		if (!data.goods_banner_imgs && data.goods_thumb) {
			data.goods_banner_imgs = [data.goods_thumb]
		}
		//下载商品图片，并保存到cloud
		return this.service.mall.goods.addGoodsByApi(data);
	}
	
	async goodsList() {
		const { data } = this.ctx.event;
		return this.service.mall.goods.getGoodsList(data);
	}

	async search() {
		const { id } = this.ctx.event.data;	//获取条件数据类型和条件值(条件值可以是数字或字
		return this.service.mall.goods.search(id);
	}

	async update() {
		const { id, data } = this.ctx.event.data;	//获取条件数据类型和条件值(条件值可以是数字或字
		return this.service.mall.goods.update(id, data);
	}

	async add() {
		const { value } = this.ctx.event.data;	//获取条件数据类型和条件值(条件值可以是数字或字
		return this.service.mall.goods.add(value);
	}

	async remove() {
		let { id } = this.ctx.event.data;
		return await this.service.mall.goods.remove(id)
	}
}
