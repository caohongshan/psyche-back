const {
	Service
} = require('../../common/uni-cloud-router')
const BasicService = require('./manjine.js');
/**
 * 满金额打折优惠券
 */
module.exports = class ManjineDazheService extends BasicService {
	constructor(ctx) {
		super(ctx)
	}

	check(cou) {
		if (!cou.rate) {
			cou.rate = 90
		}
		cou.discount = parseInt((100 - cou.rate) * cou.totalMoney) / 100;
		return parseInt(cou.totalMoney) >= parseInt(cou.condition);
	}
}
