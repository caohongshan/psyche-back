const {
	Service
} = require('../../common/uni-cloud-router')
const BasicService = require('./basic.js');
/**
 * 满数量减指定金额优惠券
 */
module.exports = class ManshuliangService extends BasicService {
	constructor(ctx) {
		super(ctx)
	}

	check(cou) {
		//实际优惠金额，为将来的满数量打折做准备
		cou.discount = cou.price;
		return cou.totalAmount >= parseInt(cou.condition);
	}

	/**
	 * 统计符合此优惠券的商品信息
	 * @param {Object} cou
	 * @param {Object} data
	 */
	statistical(cou, data) {
		cou.totalAmount = 0;
		cou.totalMoney = 0;
		cou.innerGoodsIds = [];
		if (cou.type == 3) {
			//所有商品id
			cou.innerGoodsIds = data.goodsTotalIds;
			//所有数量
			cou.totalAmount = data.goodsTotalAmount;
			//所有金额
			cou.totalMoney = data.goodsTotalMoney;
		} else if (cou.type == 2) {
			//分类券，统计分类id
			if (data.goodsTotalCategoryMap[cou.category_id]) {
				cou.totalAmount += data.goodsTotalCategoryMap[cou.category_id].totalAmount;
				cou.totalMoney += data.goodsTotalCategoryMap[cou.category_id].total;
				cou.innerGoodsIds = cou.innerGoodsIds.concat(data.goodsTotalCategoryMap[cou.category_id].gids);
			}
		} else if (cou.type == 1) {
			//商品券，满金额减，此张优惠券统计到的总金额，可能是多个商品累加的
			cou.goods_ids.map(gid => {
				if (data.goodsTotalAmountMap[gid]) {
					cou.totalAmount += data.goodsTotalAmountMap[gid];
					cou.totalMoney += data.goodsTotalMoneyMap[gid];
					cou.innerGoodsIds.push(gid);
				}
			})
		}
		//去除重复商品id
		let gids = []
		if (cou.innerGoodsIds.length > 0) {
			cou.innerGoodsIds.map(g => {
				if (gids.indexOf(g) == -1) {
					gids.push(g);
				}
			});
		}
		//删除临时数据，节省内存
		delete cou.category_id
		delete cou.goods_ids
		cou.innerGoodsIds = gids;
	}
}
