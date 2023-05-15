const { Controller } = require('../../common/uni-cloud-router')

module.exports = class CouponController extends Controller {
	/**
	 * 用户领取优惠券
	 */
	async takeit() {
		let {
			id,
			shop_id
		} = this.ctx.data;
		const {
			uid,
		} = this.ctx.auth;
		//判断是否是VIP优惠券
		const coupon = await this.service.coupon.basic.getById(id, shop_id)
		if (!coupon) {
			return {
				code: -1,
				message: "优惠券不存在"
			}
		}
		let userInfo = await this.service.user.user.getCurrentUserInfo([
			"avatar", "nickname", "member",
		]);
		//判断我是否有资格领取
		if (coupon.is_vip && (!userInfo.member || !userInfo.member.enable)) {
			return {
				code: -2,
				message: "非会员无法领取"
			}
		}
		//查询我是否已经领取
		const myCoupons = await this.service.coupon.basic.getMineById(id, uid)
		//判断是否领取超过限制
		if (coupon.limit <= myCoupons.length) {
			return {
				code: -3,
				message: "领取超过限制"
			}
		}
		return this.service.coupon.basic.takeit(coupon, uid)
	}
}
