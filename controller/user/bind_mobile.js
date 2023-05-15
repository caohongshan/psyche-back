const { Controller } = require('../../common/uni-cloud-router');
module.exports = class BindMobileController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	async baidu() {
		const {
			uid,
			openid
		} = this.ctx.data;
		let {
			code,
			mobile
		} = await this.ctx.uniID.bdBizDataCrypt(this.ctx.data);
		if (code) {
			return {
				code,
				message: "获取手机号失败"
			}
		}
		let oldUser = await this.service.user.user.getInfoByMobile(mobile, ["bd_openid", "inviter_uid",
			"invite_time", "nickname", "mobile", "avatar"
		]);
		if (!oldUser) {
			//直接绑定手机号
			return await this.ctx.uniID.updateUser({
				uid,
				mobile_confirmed: 1,
				mobile: mobile
			})
		}
		//相当于是用手机号登录，这里缺少token和tokenExpired
		return await this.baiduBindUser(openid, uid, {
			uid: oldUser._id,
			userInfo: oldUser
		}, true);
	}
	async toutiao() {}
	/**
	 * 微信绑定手机号，如果手机号已存在，则替换为新手机号
	 */
	async weixin() {
		const {
			uid,
			openid
		} = this.ctx.data;
		let {
			code,
			phoneNumber
		} = await this.service.user.user.getMobileWithWxCrypt(this.ctx.data);
		if (code) {
			return {
				code,
				message: "获取手机号失败"
			}
		}
		let oldUser = await this.service.user.user.getInfoByMobile(phoneNumber, ["wx_openid", "inviter_uid",
			"invite_time", "nickname", "mobile", "avatar"
		]);
		if (!oldUser) {
			//直接绑定手机号
			return await this.ctx.uniID.updateUser({
				uid,
				mobile_confirmed: 1,
				mobile: phoneNumber
			})
		}
		//相当于是用手机号登录，这里缺少token和tokenExpired
		return await this.weixinBindUser(openid, uid, {
			uid: oldUser._id,
			userInfo: oldUser
		}, true);
	}

	async weixinBindUser(openid, uid, res, reLogin = false) {
		//绑定openid
		let platform = this.ctx.context.PLATFORM;
		if (res.userInfo.wx_openid && res.userInfo.wx_openid[platform]) {
			//此手机号已经绑定微信
			return {
				code: -1,
				message: "此手机号已绑定其他微信"
			}
		}
		let oldInfo = {
			wx_openid: {
				[platform]: openid
			}
		};
		//查询wx_unionid
		if (uid) {
			let {
				userInfo
			} = await this.ctx.uniID.getUserInfo({
				uid: uid,
				field: ["wx_unionid", "invite_time", "inviter_uid", "worker"]
			});
			if (userInfo) {
				oldInfo.wx_unionid = userInfo.wx_unionid;
				//同步邀请信息
				if (!res.userInfo.inviter_uid) {
					oldInfo.invite_time = userInfo.invite_time;
					oldInfo.inviter_uid = userInfo.inviter_uid;
					oldInfo.worker = userInfo.worker;
				}
			}
			if (reLogin) {
				//创建token
				let {
					token,
					tokenExpired
				} = await this.ctx.uniID.createToken({
					uid: res.uid,
					needPermission: true
				});
				//相当于用这个账户登录一下，返回token
				reLogin = {
					token: token
				}
				res.token = token;
				res.tokenExpired = tokenExpired;
			}
		}
		//更新用户微信绑定信息============改为collection更新，支持push
		await this.service.user.user.update(res.uid, {
			...oldInfo,
		}, {
			...reLogin
		});
		//删除原来的用户id
		if (uid) {
			await this.service.user.user.deleteUser(uid);
		}
		res.userInfo = Object.assign(res.userInfo, {
			...oldInfo
		})
		return res;
	}
	async baiduBindUser(openid, uid, res, reLogin = false) {
		//绑定openid
		let platform = this.ctx.context.PLATFORM;
		if (res.userInfo.bd_openid && res.userInfo.bd_openid[platform]) {
			//此手机号已经绑定微信
			return {
				code: -1,
				message: "此手机号已绑定其他微信"
			}
		}
		let oldInfo = {
			bd_openid: {
				[platform]: openid
			}
		};
		//查询wx_unionid
		if (uid) {
			let {
				userInfo
			} = await this.ctx.uniID.getUserInfo({
				uid: uid,
				field: ["wx_unionid", "invite_time", "inviter_uid", "worker"]
			});
			if (userInfo) {
				oldInfo.bd_unionid = userInfo.bd_unionid;
				//同步邀请信息
				if (!res.userInfo.inviter_uid) {
					oldInfo.invite_time = userInfo.invite_time;
					oldInfo.inviter_uid = userInfo.inviter_uid;
					oldInfo.worker = userInfo.worker;
				}
			}
			if (reLogin) {
				//创建token
				let {
					token,
					tokenExpired
				} = await this.ctx.uniID.createToken({
					uid: res.uid,
					needPermission: true
				});
				//相当于用这个账户登录一下，返回token
				reLogin = {
					token: token
				}
				res.token = token;
				res.tokenExpired = tokenExpired;
			}
		}
		//更新用户微信绑定信息============改为collection更新，支持push
		await this.service.user.user.update(res.uid, {
			...oldInfo,
		}, {
			...reLogin
		});
		//删除原来的用户id
		if (uid) {
			await this.service.user.user.deleteUser(uid);
		}
		res.userInfo = Object.assign(res.userInfo, {
			...oldInfo
		})
		return res;
	}
}
