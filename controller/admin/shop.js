const {
	Controller
} = require('../../common/uni-cloud-router')
/**
 * 后台订单管理，店铺管理
 */
module.exports = class ShopController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 *  绑定分账方
	 */
	async profitsharingaddreceiver() {
		let {
			payments
		} = this.ctx.data;

		let payTypes = Object.keys(payments)
		for (let i = 0; i < payTypes.length; i++) {
			let payment = payments[payTypes[i]];
			console.log("payment", payment)
			await this.service.payment[payTypes[i]].profitsharingaddreceiver(payment);
		}
	}

	/**
	 * 添加后台登录账户
	 */
	async setmanager() {
		let {
			uid,
			id
		} = this.ctx.data;
		let roleName = "shop_manager";
		let user = await this.service.user.user.getInfoById(uid, ["nickname", "mobile", "role", "password"]);
		//判断用户是否存在手机号
		if (!user.mobile) {
			return {
				code: -1,
				message: "用户没有绑定手机号"
			}
		}
		//判断用户是否已经被添加
		if (user.role && user.role.indexOf(roleName) != -1) {
			return {
				code: 0,
				message: "已添加角色",
			}
		}
		if (!user.password) {
			await this.ctx.uniID.resetPwd({
				uid,
				password: user.mobile
			})
		}
		//绑定登录账户和授权appid//绑定角色
		return await this.service.user.user.update(uid, {
			username: user.mobile
		}, {
			dcloud_appid: this.ctx.context.APPID,
			role: roleName
		})
	}

}
