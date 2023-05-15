const {	Controller } = require('../../common/uni-cloud-router')

module.exports = class InfoController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 * 用户信息
	 */
	async info() {
		let data = await this.service.user.user.getCurrentUserInfo([
			"balance", "score", "score_charge_rate", "coupon", "avatar", "nickname", "member",
			"select_city", "bankinfo", "alipayinfo", "channel_code", "is_subscribe_mp",
			"my_invite_code", "mobile", "wx_openid", "role", "score_cashout", "score_log",
			"mobile_confirmed", "register_date", "last_login_date", "inviter_uid", "statistics"
		]);
		//更新邀请码
		await this.service.user.user.updateUserMyInviteCode(data);
		//score_charge_rate
		if (!data.score_charge_rate) {
			//读取默认比例
			data.score_charge_rate = this.ctx.getConfigs.config("user.score_charge_rate");
		}
		//计算积分情况，方便兑换
		if (!data.score_cashout) {
			data.score_cashout = {
				day: 0,
				money: 0,
				amount: 0
			};
		}
		//如果用户已认证，则姓名和身份证号码需要打星星，只输出类型，状态，姓名，身份证
		if (data.realname_auth) {
			const {
				real_name,
				identity
			} = data.realname_auth;

			data.realname_auth = {
				type: data.realname_auth.type,
				auth_status: data.realname_auth.auth_status, //认证状态：0 未认证 1 等待认证 2 认证通过 3 认证失败
				auth_date: data.realname_auth.auth_date,
				real_name: this.service.system.util.getStringStar(real_name, 1),
				identity: this.service.system.util.getStringStar(identity, 6, 2),
			}
		}
		if (data.mobile) {
			data.mobile = this.service.system.util.getStringStar(data.mobile, 3, 3)
		}
		//提现限制
		data.cashoutType = this.ctx.getConfigs.config("user.cashoutType");
		let [min, max] = this.ctx.getConfigs.config("user.cashoutLimit");
		data.cashoutLimit = {
			min,
			max
		}
		return data;
	}

	async sign_task() {
		const {
			uid
		} = this.ctx.auth;
		//个人中心，添加签到任务
		return await this.service.user.task.getTaskByOpenUrl("::signin", uid);
	}

	/**
	 * 余额申请提现
	 */
	async cashout() {
		//金额应该有限制//提现限制
		let [min, max] = this.ctx.getConfigs.config("user.cashoutLimit");
		let {
			subAppId,
			shopId,
			amount,
			mode
		} = this.ctx.event.data;
		const { user_id: uid } = this.ctx.auth;
		if (amount < 0) {
			return {
				code: -1,
				message: "余额不足"
			}
		}
		if (amount < min || amount > max) {
			return {
				code: -2,
				message: "提现金额超出限制"
			}
		}
		//判断用户是否绑定对应的提现方式
		let info = await this.service.user.user.getCurrentUserInfo([
			"balance", "avatar", "nickname", "mobile", "alipayinfo",
			"score", "wx_openid", "wx_unionid", "ali_openid", "bankinfo"
		]);
		// if (mode == "wxpay") {
		// 	if (!info.wx_openid) {
		// 		return {
		// 			code: -2,
		// 			message: "未绑定微信"
		// 		}
		// 	}
		// } else if (mode == "alipay") {
		// 	//支付宝小程序或者手动绑定支付宝账号
		// 	if (!info.ali_openid && !info.alipayinfo) {
		// 		return {
		// 			code: -3,
		// 			message: "未绑定支付宝"
		// 		}
		// 	}
		// } else if (mode == "bank") {
		// 	if (!info.bankinfo) {
		// 		return {
		// 			code: -4,
		// 			message: "未绑定银行卡"
		// 		}
		// 	}
		// } else {
		// 	return {
		// 		code: -5,
		// 		message: "提现路径不支持"
		// 	}
		// }
		let order = {
			outTradeNo: await this.service.user.user.genIdentityId("tian-user-cashouts", 1),
			total_fee: Math.round(amount * 100),
			subAppId,
			shopId,
			type: "cashout",
			title: "余额提现"
		};
		//调用余额
		return await this.service.payment.balance.app(order, {
			_id: uid
		}, async (payInfo) => {
			console.log("回调处理订单状态")
			//处理各类订单支付完成之后的回调
			return await this.service.user.user.cashout(order.total_fee, mode, uid, payInfo, info)
		}, async (transaction, payInfo) => {
			console.log("扣款中回调")
			return await this.service.user.user.addCashout(order.total_fee, mode, uid, payInfo,
				info, order, transaction);
		});
	}

	/**
	 * 修改用户信息
	 */
	async edit() {
		const { user_id } = this.ctx.auth;
		return await this.service.user.user.edit(user_id, this.ctx.event.data, [
			"avatar", "nickname", "gender", "comment", "birthday"
		]);
	}

	/**
	 * 直接邀请
	 */
	async invite() {
		let { inviteCode } = this.ctx.data;
		let { inviter_uid } = await this.service.user.user.getCurrentUserInfo(["inviter_uid"]);
		if (inviter_uid && inviter_uid.length > 0) {
			//如果已经存在了，就不允许再设置
			return {
				code: 0,
				message: "已邀请"
			};
		}
		const { uid } = this.ctx.auth;

		const { inviterUid } = await this.ctx.uniID.acceptInvite({
			uid: uid,
			inviteCode: inviteCode
		})
		return {
			code: 0,
			inviterUid,
			message: "邀请成功"
		};
	}

	/**
	 * 用手机号加入邀请
	 */
	async jointeam() {
		let { mobile } = this.ctx.data;
		const { uid } = this.ctx.auth;
		let { inviter_uid } = await this.service.user.user.getCurrentUserInfo(["inviter_uid"]);
		if (inviter_uid && inviter_uid.length > 0) {
			//如果已经存在了，就不允许再设置
			return {
				code: -1,
				message: "已邀请"
			};
		}
		//系统默认邀请者
		if (mobile == "none") {
			let sysCode = this.ctx.getConfigs.config("user.inviteCode");
			let index = parseInt(Math.random() * (sysCode.length));
			let inviteCode = sysCode[index];
			console.log("inviteCode", uid, inviteCode, index)
			return await this.service.user.user.setInviteByCode(uid, inviteCode)
		}
		//肯定不是手机号
		if (mobile.length < 11) {
			return await this.service.user.user.setInviteByCode(uid, mobile)
		}
		return await this.service.user.user.setInviteUidByMobile(uid, mobile);
	}

	/**
	 * 我的团队统计
	 */
	async team() {
		//推荐人信息，邀请人数，如果是系统内置人员，则不显示邀请者信息
		// const { uid } = this.ctx.auth
		const { my_invite_code } = this.ctx.event.data;
		//实时查询邀请人数
		return await this.service.user.user.getInviteInfo(Number(my_invite_code));
	}

	/**
	 * 分页查询,获取接受邀请的用户清单
	 */
	async teammember() {
		const {
			page,
			level,
			time,
			my_invite_code
		} = this.ctx.event.data;
		const { uid } = this.ctx.auth;

		return await this.service.user.user.getInviteUser(my_invite_code, time, level, page, 20);
	}

	async push() {
		const { appid } = this.ctx.data;
		const { uid } = this.ctx.auth;

		return await this.service.user.user.setPush(uid, {
			[appid]: {
				...this.ctx.data
			}
		})
	}

	async weixin_phone() {
		const {
			encryptedData,
			iv,
			sessionKey
		} = this.ctx.data;
		const { uid } = this.ctx.auth;
		return await this.service.user.user.bindMobileWithWxCrypt(this.ctx.data, uid)
	}
	/**
	 * 用户修改绑定的手机号
	 */
	async bind_mobile() {
		return await this.ctx.uniID.bindMobile({
			...this.ctx.data,
			type: "sms"
		})
	}
	/**
	 * 第三方平台通用绑定
	 */
	async bind() {
		let {
			provider
		} = this.ctx.data;
		const { uid } = this.ctx.auth;
		//bindAlipay
		let func = bind + "" + provider.slice(0, 1).toUpperCase() + provider.slice(1);
		return this.ctx.uniID[func]({
			uid,
			...this.ctx.data,
		})
	}
	async bind_weixin() {
		let {
			authResult,
		} = this.ctx.data;
		const {
			uid,
		} = this.ctx.auth;
		//获取用户信息
		let info = await this.service.user.user.getWeixinUserInfo(authResult);
		if (!info) {
			return {
				code: -1,
				message: "获取微信信息失败"
			}
		}
		//获取appid，方便将来使用
		let oauth = this.ctx.getUniIdConfigs.appPlatformConfig("oauth");
		info.appid = oauth.weixin && oauth.weixin.appid;
		//绑定微信信息
		return await this.service.user.user.bindWeixinByInfo(info, uid);
	}
	/**
	 * 注销账户,需满足条件：1账户无余额，2无积分，3无粉丝，4未完成的订单
	 */
	async cancellation() {
		const {
			uid
		} = this.ctx.auth;
		let data = await this.service.user.user.getCurrentUserInfo(["balance", "score"]);
		if (data.balance > 0 || data.score > 0) {
			return {
				code: -1,
				message: "账户存在余额或者积分"
			}
		}
		//查询粉丝
		let fans = await this.service.user.user.getInviteCount(uid)
		if (fans > 0) {
			return {
				code: -1,
				message: "账户存在粉丝"
			}
		}
		let unfinish = await this.service.mall.order.getUnfinishCount(uid)
		if (unfinish > 0) {
			return {
				code: -1,
				message: "账户未完成订单"
			}
		}
		await this.service.user.user.deleteUser(uid)
		// await this.service.user.user.edit(uid, {
		// 	status: 1
		// })
		return {
			code: 0,
			message: "申请已通过"
		}
	}
	async weixin_h5() {
		let {
			code,
			state
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		if (!uid) {
			return;
		}
		return await this.service.user.user.bindWeixinByCode(code, uid);
		/* const res = await this.curl(
			`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${oauth.appid}&secret=${oauth.appsecret}&code=${code}&grant_type=authorization_code`, {
				contentType: 'json',
				dataType: 'json',
				timeout: 10000
			})
		console.log(res.data);
		return res.data; */
	}
}
