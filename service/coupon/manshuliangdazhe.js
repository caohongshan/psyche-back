const {
	Service
} = require('../../common/uni-cloud-router')
const BasicService = require('./manshuliang.js');
/**
 * 满数量打折优惠券
 */
module.exports = class ManshuliangDazheService extends BasicService {
	constructor(ctx) {
		super(ctx)
	}

	check(cou) {
		//实际优惠金额，为将来的满数量打折做准备
		if (!cou.rate) {
			cou.rate = 90
		}
		cou.discount = parseInt((100 - cou.rate) * cou.totalMoney) / 100;
		return cou.totalAmount >= parseInt(cou.condition);
	}
}
