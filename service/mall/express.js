const { Service } = require('../../common/uni-cloud-router')

module.exports = class ExpressService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = this.db.collection('opendb-mall-express')
	}
	async getExpressByGoods(goods, address) {
		let expressList = {};
		let ids = [];
		let freight = 0;
		//1统计存在配送模板的商品goods address
		goods.map(g => {
			if (g.express_id && ids.indexOf(g.express_id) == -1) {
				ids.push(g.express_id)
			}
		})
		if (ids.length == 0) {
			return 0;
		}
		//查询运费模板
		expressList = await this.getExpressByIds(ids)
		if (!expressList) {
			//运费模板不存在
			return 0;
		}
		//计算运费模板倍数
		goods.map(g => {
			if (g.express_id) {
				if (expressList[g.express_id].type == "amount") {
					//按数量计算
					expressList[g.express_id].amount += g.amount;
				} else if (g.weight) {
					//按重量计算
					expressList[g.express_id].amount += g.weight;
				}
			}
		})
		console.log("找到运费模板")
		//2配送模板和金额，数量的关系
		for (let exKey in expressList) {
			freight += this.getExpressTotal(expressList[exKey], address.area_code);
		}
		return freight;
	}

	async getExpressByIds(ids) {
		return this.ctx.memorycache("express_" + ids.join("_"), null, 3600, async () => {
			let {
				data
			} = await this.collection.where({
				_id: this.db.command.in(ids)
			}).get();
			if (data.length == 0) {
				return false;
			}
			return data.reduce((pre, item) => {
				item.amount = 0;
				pre[item._id] = item;
				return pre;
			}, {})
		});
	}

	/**
	 * 根据运费模板配置，计算运费
	 * @param {Object} express
	 * @param {Object} code
	 */
	getExpressTotal(express, code) {
		let config = this.getExpressConfigByAdcode(express, code);
		let money = config.first_money; //首费
		express.out_amount = express.amount - config.first_amount; //首件
		if (express.out_amount > 0) {
			//超出了几倍
			let times = Math.ceil(express.out_amount / config.per_amount);
			money += times * config.per_money;
		}
		console.log("计算结果", express, money)
		return money;
	}
	/**
	 * 根据地址code，获得运费模板，返回最佳配对
	 * @param {Object} express
	 * @param {Object} code
	 */
	getExpressConfigByAdcode(express, code) {
		let province = code.substr(0, 3) + "000";
		let city = code.substr(0, 4) + "00";
		//按城市或者省份匹配,必定只存了一个
		let cityConfig = express.configs.filter(e => e.region && (e.region.indexOf(city) != -1 || e.region
			.indexOf(
				province) != -1));
		console.log("匹配城市的运费配置", cityConfig)
		if (cityConfig.length > 0) {
			//按首件倒序排序//满足最多的一项
			return cityConfig.sort((a, b) => {
				return b.first_amount - a.first_amount;
			}).filter(e => e.first_amount <= express.amount)[0];
		}
		//必定有一个默认的，保底用
		return express.configs.filter(e => e.is_default)[0];
	}
}
