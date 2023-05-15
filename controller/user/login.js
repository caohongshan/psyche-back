const { Controller } = require('../../common/uni-cloud-router');

module.exports = class LoginController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 * uni一键登录
	 */
	async univerify() {
		const res = await this.ctx.uniID.loginByUniverify({
			...this.ctx.event.data,
			needPermission: true
		});
		await this.setMemberInfo(res);
		return res;
	}
	async apple() {
		const res = await this.ctx.uniID.loginByApple({
			...this.ctx.event.data
		})
		return res;
	}
	async qq() {
		return this.ctx.uniID.loginByQQ({
			...this.ctx.event.data
		})
	}
	async sinaweibo() {

	}
	async alipay() {
		return this.ctx.uniID.loginByAlipay({
			...this.ctx.event.data
		})
	}
	async baidu() {
		const res = await this.ctx.uniID.loginByBaidu({
			...this.ctx.event.data,
			needPermission: true
		});
		return res;
	}
	async toutiao() {
		const res = await this.ctx.uniID.loginByToutiao({
			...this.ctx.event.data,
			needPermission: true
		});
		return res;
	}
	/**
	 * 微信登录，小程序或者app微信授权
	 */
	async weixin() {
		let { inviteCode, signature=null } = this.ctx.event.data;
		if (!inviteCode) {
			inviteCode = this.ctx.getConfigs.getRandomValue("user.inviteCode")
		}
		const user = await db.collection("uni-id-users").findOne({ signature });
		if(!user) {
			await this.setMemberInfo(this.ctx.event.data);
		} 
		return await db.collection("uni-id-users").findOne({ signature });
	}

	/**
	 * 发送验证码，type：login、其他
	 */
	async sendSms() {
		let {
			mobile,
			type
		} = this.ctx.event.data;
		//过滤虚拟号码，只填写开头，英文逗号隔开，避免后台操作JSON，太复杂了
		let blacklist = this.ctx.getConfigs.config("service.sms.blacklist");
		if (blacklist) {
			blacklist = blacklist.split(",").filter(e => mobile.indexOf(e) == 0);
			if (blacklist.length > 0) {
				return {
					code: -2,
					message: "号码不可使用"
				}
			}
		}
		//是否必须新用户才能短信登录
		let mustNewUser = this.ctx.getConfigs.config("service.sms.mustNewUser");
		if (mustNewUser) {
			let info = await this.service.user.user.getInfoByMobile(mobile);
			if (info) {
				return {
					code: -1,
					message: "请使用一键登录"
				}
			}
		}

		return await this.ctx.uniID.sendSmsCode({
			mobile: mobile,
			type: type || "login",
			templateId: this.ctx.getConfigs.config("service.sms.templateId.login"),
			code: this.getRandomCode(),
			expiresIn: 180
		});
	}
	/**
	 * 手机号+验证码登录,
	 * @param {Object}  data:{
		 mobile,code
	 } 
	 */
	async mobile() {
		let {
			mobile,
			code,
			uid,
			openid
		} = this.ctx.event.data;
		//过滤虚拟号码，只填写开头，英文逗号隔开，避免后台操作JSON，太复杂了
		let blacklist = this.ctx.getConfigs.config("service.sms.blacklist");
		if (blacklist) {
			blacklist = blacklist.split(",").filter(e => mobile.indexOf(e) == 0);
			if (blacklist.length > 0) {
				return {
					code: -2,
					message: "号码不可使用"
				}
			}
		}
		if (this.getTestMobile().indexOf(mobile) != -1) {
			let res = await this.setVerifyCode(mobile, 3600);
			code = res.code;
			console.log(res);
		}
		let res = await this.ctx.uniID.loginBySms({
			...this.ctx.event.data,
			code,
			needPermission: true
		});
		await this.setMemberInfo(res);
		if (openid && res.userInfo) {
			//微信绑定手机号，如果手机号已经存在，则以手机号为主
			await this.weixinBindUser(openid, uid, res);
		}
		return res;
	}

	/**
	 * 微信绑定手机号，如果手机号已存在，则替换为新手机号
	 */
	async weixin_phone() {
		const {
			uid,
			openid
		} = this.ctx.event.data;
		let {
			code,
			phoneNumber
		} = await this.service.user.user.getMobileWithWxCrypt(this.ctx.event.data);
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
				field: ["wx_unionid", "invite_time", "inviter_uid"]
			});
			if (userInfo) {
				oldInfo.wx_unionid = userInfo.wx_unionid;
				//同步邀请信息
				if (!res.userInfo.inviter_uid) {
					oldInfo.invite_time = userInfo.invite_time;
					oldInfo.inviter_uid = userInfo.inviter_uid;
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
	/**
	 * 退出登录
	 */
	async logout() {
		return await this.ctx.uniID.logout(this.ctx.event.uniIdToken)
	}

	/**
	 * 导入新会员
	 */
	async apilogin() {
		let {
			mobile,
			token,
			invite //邀请者手机号
		} = this.ctx.event.data;
		if (!this.ctx.apiLogin) {
			return false;
		}
		//注册，查询，绑定关系
		let {
			code
		} = await this.setVerifyCode(mobile, 3600);
		let {
			uid
		} = await this.ctx.uniID.loginBySms({
			mobile,
			code
		});
		if (invite) {
			await this.service.user.user.setInviteUidByMobile(uid, invite);
		}
		return uid
	}

	async importmember() {
		let {
			mobiles, //多个手机号，英文逗号隔开
			invite //邀请者手机号
		} = this.ctx.event.data;
		if (!this.ctx.apiLogin || !mobiles) {
			console.log("token 验证失败", this.ctx.apiLogin)
			return "token 验证失败";
		}
		mobiles = mobiles.split(",");
		if (mobiles.length == 0) {
			console.log("手机号参数为空")
			return "手机号参数为空";
		}
		let result = {}
		for (let mobile of mobiles) {
			//手机号去除重复
			if (mobile && !result[mobile]) {
				let {
					code
				} = await this.setVerifyCode(mobile, 3600);
				let {
					uid
				} = await this.ctx.uniID.loginBySms({
					mobile,
					code
				});
				if (invite) {
					await this.service.user.user.setInviteUidByMobile(uid, invite);
				}
				result[mobile] = uid;
			}
		}
		console.log("导入完成")
		return result;
	}

	/**
	 * 获取随机验证码
	 */
	getRandomCode() {
		return (Math.random() + "").substr(2, 6);
	}

	/**
	 * 获取测试手机号码
	 */
	getTestMobile() {
		let mobiles = this.ctx.getConfigs.config("user.testMobiles");
		if (mobiles) {
			return mobiles;
		}
		return []
	}

	async setVerifyCode(mobile, expiresIn) {
		let code = this.getRandomCode();
		let params = {
			mobile,
			code,
			type: "login",
			expiresIn: expiresIn,
		}
		//临时设置验证码，模拟登录
		let res = await this.ctx.uniID.setVerifyCode(params);
		// console.log(params)
		return params;
	}
	/**
	 * 注册用户，默认会员等级
	 * @param {Object} res
	 */
	async setMemberInfo(res) {
		// 注册赠送积分988积分userInfo
		let my_invite_code = await this.service.user.user.genIdentityId("uni-id-users", 1);
		res.userInfo.score = 0;
		res.userInfo.my_invite_code = my_invite_code;
		await db.collection("uni-id-users").insertOne({
			uid: res.inviteCode,
			coupon: 0,
			balance: 0,
			my_invite_code: `${my_invite_code}`,
			score: 0,
			signature: res.signature,
			...res.userInfo,
			inviter_uid: [res.inviteCode]
		})
		// 更新邀请码
		// await this.service.user.user.updateUserMyInviteCode(res.userInfo);

		//处理用户信息，与info接口一致
		// await this.buildUserInfo(res.userInfo)

		await this.service.user.user.setInviteUidByMobile(res.inviteCode, my_invite_code);
	}
	async buildUserInfo(data) {
		if (!data) {
			return;
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
		let delFields = ["password", "context"]
		delFields.map(e => {
			delete data[e]
		})
		data.cashoutType = this.ctx.getConfigs.config("user.cashoutType");
		let [min, max] = this.ctx.getConfigs.config("user.cashoutLimit");
		data.cashoutLimit = {
			min,
			max
		}
	}
}
