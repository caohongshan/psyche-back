"use strict";
function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("crypto")),
	n = e(require("buffer")),
	r = e(require("stream")),
	i = e(require("util"));

const o = {
		PARAM_ERROR: {
			errCode: "param-error"
		},
		PARAM_REQUIRED: {
			errCode: "param-required"
		},
		USER_NOT_EXIST: {
			errCode: "user-not-exist"
		},
		ROLE_NOT_EXIST: {
			errCode: "role-not-exist"
		},
		PERMISSION_NOT_EXIST: {
			errCode: "permission-not-exist"
		},
		MULTI_USER_MATCHED: {
			errCode: "multi-user-matched"
		},
		USER_INFO_ERROR: {
			errCode: "user-info-error"
		},
		USER_ACCOUNT_CONFLICT: {
			errCode: "user-account-conflict"
		},
		USER_ACCOUNT_CLOSED: {
			errCode: "user-account-closed"
		},
		ACCOUNT_EXISTS: {
			errCode: "account-exists"
		},
		ACCOUNT_NOT_EXISTS: {
			errCode: "account-not-exists"
		},
		ACCOUNT_BOUND: {
			errCode: "account-bound"
		},
		UNBIND_FAILED: {
			errCode: "unbind-failed"
		},
		INVALID_INVITE_CODE: {
			errCode: "invalid-invite-code"
		},
		SET_INVITE_CODE_FAILED: {
			errCode: "set-invite-code-failed"
		},
		GET_THIRD_PARTY_ACCOUNT_FAILED: {
			errCode: "get-third-party-account-failed"
		},
		GET_THIRD_PARTY_USER_INFO_FAILED: {
			errCode: "get-third-party-user-info-failed"
		}
	},
	s = {
		0: {
			errCode: 0,
			errMsg: ""
		},
		10001: {
			errCode: "account-banned"
		},
		10002: o.USER_NOT_EXIST,
		10003: o.MULTI_USER_MATCHED,
		10004: o.USER_INFO_ERROR,
		10005: o.USER_ACCOUNT_CONFLICT,
		10006: o.USER_ACCOUNT_CLOSED,
		10102: {
			errCode: "password-error"
		},
		10103: {
			errCode: "password-error-exceed-limit"
		},
		10201: o.ACCOUNT_EXISTS,
		10202: o.ACCOUNT_NOT_EXISTS,
		10203: o.INVALID_INVITE_CODE,
		10301: o.ACCOUNT_EXISTS,
		10302: o.ACCOUNT_NOT_EXISTS,
		10401: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10402: o.ACCOUNT_EXISTS,
		10403: o.ACCOUNT_NOT_EXISTS,
		10501: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10502: o.ACCOUNT_EXISTS,
		10503: o.ACCOUNT_NOT_EXISTS,
		10601: o.ACCOUNT_EXISTS,
		10602: o.ACCOUNT_NOT_EXISTS,
		10701: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10702: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10703: o.ACCOUNT_EXISTS,
		10704: o.ACCOUNT_NOT_EXISTS,
		10705: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10706: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10801: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10802: o.ACCOUNT_EXISTS,
		10803: o.ACCOUNT_NOT_EXISTS,
		20101: o.PARAM_REQUIRED,
		20102: o.ACCOUNT_EXISTS,
		30101: o.PARAM_REQUIRED,
		30201: {
			errCode: "check-device-feature-failed"
		},
		30202: {
			errCode: "token-not-exist"
		},
		30203: {
			errCode: "token-expired"
		},
		30204: {
			errCode: "check-token-failed"
		},
		40201: o.USER_NOT_EXIST,
		40202: {
			errCode: "invalid-old-password"
		},
		50101: o.PARAM_REQUIRED,
		50102: o.PARAM_ERROR,
		50201: o.PARAM_REQUIRED,
		50203: o.PARAM_ERROR,
		50202: {
			errCode: "invalid-verify-code"
		},
		50301: {
			errCode: "send-sms-code-failed"
		},
		60101: o.ACCOUNT_BOUND,
		60201: o.ACCOUNT_BOUND,
		60301: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60302: o.ACCOUNT_BOUND,
		60401: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60402: o.ACCOUNT_BOUND,
		60501: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60502: o.ACCOUNT_BOUND,
		70101: o.UNBIND_FAILED,
		70201: o.UNBIND_FAILED,
		70301: o.UNBIND_FAILED,
		70401: o.UNBIND_FAILED,
		70501: o.UNBIND_FAILED,
		80301: o.USER_NOT_EXIST,
		80401: o.SET_INVITE_CODE_FAILED,
		80402: o.SET_INVITE_CODE_FAILED,
		80501: o.INVALID_INVITE_CODE,
		80502: o.USER_NOT_EXIST,
		80503: {
			errCode: "modify-invite-code-is-not-allowed"
		},
		80601: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80602: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80701: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80702: o.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80801: {
			errCode: "decrypt-weixin-data-failed"
		},
		80802: {
			errCode: "decrypt-weixin-data-failed"
		},
		80803: {
			errCode: "invalid-weixin-appid"
		},
		80804: o.PARAM_REQUIRED,
		80805: o.PARAM_REQUIRED,
		80806: o.PARAM_REQUIRED,
		80901: o.GET_THIRD_PARTY_USER_INFO_FAILED,
		90001: {
			errCode: "database-operation-failed"
		},
		90002: o.PARAM_REQUIRED,
		90003: o.PARAM_ERROR,
		90004: o.USER_NOT_EXIST,
		90005: o.ROLE_NOT_EXIST,
		90006: o.PERMISSION_NOT_EXIST
	};
class a extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const c = Object.prototype.toString,
	u = Object.prototype.hasOwnProperty;

function d(e, t) {
	return u.call(e, t)
}

function p(e) {
	return "[object Object]" === c.call(e)
}

function l(e) {
	return "function" == typeof e
}

function f(e) {
	return !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then
}

function m(e) {
	return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}
const h = /_(\w)/g,
	g = /[A-Z]/g;

function y(e) {
	return e.replace(h, (e, t) => t ? t.toUpperCase() : "")
}

function w(e) {
	return e.replace(g, e => "_" + e.toLowerCase())
}

function _(e, t) {
	let n, r;
	switch (t) {
		case "snake2camel":
			r = y, n = h;
			break;
		case "camel2snake":
			r = w, n = g
	}
	for (const i in e)
		if (d(e, i) && n.test(i)) {
			const n = r(i);
			e[n] = e[i], delete e[i], p(e[n]) ? e[n] = _(e[n], t) : Array.isArray(e[n]) && (e[n] = e[n].map(e => _(e,
				t)))
		} return e
}

function v(e) {
	return _(e, "snake2camel")
}

function b(e) {
	return _(e, "camel2snake")
}

function T(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const n = [];
		return n.push(e.getFullYear()), n.push(("00" + (e.getMonth() + 1)).substr(-2)), n.push(("00" + e.getDate())
			.substr(-2)), n.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const n = [];
		return n.push(("00" + e.getHours()).substr(-2)), n.push(("00" + e.getMinutes()).substr(-2)), n.push(("00" +
			e.getSeconds()).substr(-2)), n.join(t)
	}(e)
}

function C() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function E(e = 6) {
	let t = "";
	for (let n = 0; n < e; n++) t += Math.floor(10 * Math.random());
	return t
}

function I(e) {
	return Array.from(new Set(e))
}

function x(e = {}, t) {
	if (!t || !e) return e;
	const n = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let r = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		r = Object.assign(r, e)
	}
	if (p(t))
		for (const i in t) {
			const o = t[i];
			l(o) && -1 === n.indexOf(i) ? e[i] = o(e) : "string" == typeof o && -1 === n.indexOf(i) && (e[i] = e[o], r
				.shouldDelete.add(o))
		} else l(t) && (e = t(e));
	if (r.shouldDelete)
		for (const t of r.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function A(e, t) {
	const n = new e(t);
	return new Proxy(n, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const n = e._protocols[t];
				return async function(r) {
					r = x(r, n.args);
					let i = await e[t](r);
					return i = x(i, n.returnValue), i
				}
			}
			return e[t]
		}
	})
}

function S(e) {
	if (p(e))
		if (0 === e.code) e.errCode = e.code, e.message = e.errMsg = e.msg, delete e.messageValues;
		else if (d(s, e.code)) {
		const t = s[e.code];
		e.errCode = "uni-id-" + t.errCode, e.errMsg = this.t(t.errCode, e.messageValues || {}) || e.msg, e.message = e
			.msg = e.errMsg, delete e.messageValues
	} else e.code && console.warn(`error code not found, error code: ${e.code}, please contact us`)
}
var k = {
	"zh-Hans": {
		alipay: "支付宝",
		wechat: "微信",
		user: "用户",
		"user-id": "用户ID",
		"dcloud-appid": "应用Appid",
		"dcloud-appid-list": "应用列表",
		account: "账号",
		username: "用户名",
		email: "邮箱",
		mobile: "手机号",
		sms: "短信",
		"wechat-openid": "微信openid",
		"wechat-account": "微信账号",
		"alipay-account": "支付宝账号",
		"qq-openid": "QQ openid",
		"qq-account": "QQ账号",
		"apple-account": "苹果账号",
		password: "密码",
		"verify-code": "验证码",
		"verify-code-type": "验证码类型",
		"user-unique-param": "用户名、邮箱或手机号",
		"role-id": "角色ID",
		"permission-id": "权限ID",
		login: "登录",
		"verify-mobile": "验证手机",
		"context-param-required": "context内缺少{param}，请使用uniID.createInstance传入客户端信息",
		"config-param-require": "uni-id的配置内缺少{param}",
		"uni-verify-config-required": "请在config.json中配置service.univerify下一键登录相关参数",
		"login-with-invite-type-required": "强制使用邀请码注册时，需指明type为register还是login",
		"type-array-required": "{param}应为数组形式",
		"query-field-warning": "检测到当前使用queryField匹配多字段进行登录操作，需要注意：uni-id并未限制用户名不能是手机号或邮箱，需要开发者自行限制。否则可能出现用户输入abc@xx.com会同时匹配到邮箱为此值的用户和用户名为此值的用户，导致登录失败",
		"add-role-admin-is-not-allowed": "不可新增roleID为admin的角色",
		"password-secret-type-error": "config内passwordSecret类型错误，只可设置string类型和array类型",
		"token-expires-config-warning": "tokenExpiresIn不可小于或等于tokenExpiresThreshold",
		"type-function-required": "{param}应为function类型",
		"dev-warning": "当前正在使用uniID.dev属性，注意此属性仅可用于开发调试",
		"config-file-invalid": "请确保公用模块uni-id对应的配置文件（common/uni-config-center/uni-id/config.json）格式正确（不可包含注释）",
		"config-file-not-found": "请在common/uni-config-center/uni-id/config.json内添加uni-id相关配置信息",
		"hx-version-warning": "当前使用的HBuilderX版本过低，请升级HBuilderX到最新版本",
		"account-banned": "账号已禁用",
		"user-not-exist": "用户不存在",
		"multi-user-matched": "匹配到多个账号",
		"user-info-error": "用户信息不正确",
		"user-account-conflict": "用户账号冲突",
		"user-account-closed": "此账号已注销",
		"password-error": "密码错误",
		"password-error-exceed-limit": "密码错误次数过多，请稍后再试",
		"account-exists": "此账号已注册",
		"account-not-exists": "此账号尚未注册",
		"invalid-invite-code": "邀请码无效",
		"get-third-party-account-failed": "获取{account}失败",
		"get-third-party-user-info-failed": "获取用户信息失败",
		"param-required": "{param}不可为空",
		"check-device-feature-failed": "设备特征校验未通过",
		"token-not-exist": "登录状态无效，云端已不包含此token",
		"token-expired": "token已过期",
		"check-token-failed": "token校验未通过",
		"invalid-old-password": "旧密码错误",
		"param-error": "{param}参数错误，{reason}",
		"invalid-verify-code": "{type}验证码错误或已失效",
		"send-sms-code-failed": "短信验证码发送失败",
		"account-bound": "此账号已被绑定",
		"unbind-failed": "解绑失败",
		"set-invite-code-failed": "邀请码设置失败",
		"modify-invite-code-is-not-allowed": "邀请码不可修改",
		"decrypt-weixin-data-failed": "解密失败",
		"invalid-weixin-appid": "appid不匹配",
		"database-operation-failed": "数据库读写异常",
		"role-not-exist": "角色不存在",
		"permission-not-exist": "权限不存在",
		"context-required": "uni-id无法获取context.{key}，请使用uniID.createInstance方法传入",
		"limit-client-platform": "当前客户端平台不支持此接口"
	},
	en: {
		alipay: "alipay",
		wechat: "wechat",
		user: "user",
		"user-id": "user id",
		"dcloud-appid": "DCloud appid",
		"dcloud-appid-list": "DCloud appid list",
		account: "account",
		username: "username",
		email: "email",
		mobile: "phone number",
		sms: "sms",
		"wechat-openid": "wechat openid",
		"wechat-account": "wechat account",
		"alipay-account": "alipay account",
		"qq-openid": "QQ openid",
		"qq-account": "QQ account",
		"apple-account": "apple account",
		password: "password",
		"verify-code": "verify code",
		"verify-code-type": "verify code type",
		"user-unique-param": "username, email or mobile phone number",
		"role-id": "role id",
		"permission-id": "permission id",
		login: "login",
		"verify-mobile": "verify mobile phone number",
		"context-param-required": "You should pass {param} in context using uniID.createInstance",
		"config-param-require": "{param} is required in uni-id's config",
		"uni-verify-config-required": "Univerify config required: service.univerify",
		"login-with-invite-type-required": "Parameter type is required when forceInviteCode set to true",
		"type-array-required": "Type of {param} must be array",
		"query-field-warning": "You are using multi query field to login, be aware that uni-id will not check username's fromat, eg: abc@xx.com is a valid username for uni-id. You should check username in your code.",
		"add-role-admin-is-not-allowed": 'Add role with an id of "admin" is not allowed',
		"password-secret-type-error": '"passwordSecret" in config must be string or array',
		"token-expires-config-warning": '"tokenExpiresIn" must be greater than "tokenExpiresThreshold"',
		"type-function-required": "{param} must be a function",
		"dev-warning": "warning: uniID.dev is only for development",
		"config-file-invalid": "Invalid config file (common/uni-config-center/uni-id/config.json), please note that comment is not allowed",
		"config-file-not-found": "Config file (common/uni-config-center/uni-id/config.json) not found",
		"hx-version-warning": "The HBuilderX you are using is too old, please upgrade to the latest version of HBuilderX",
		"account-banned": "Account is banned",
		"user-not-exist": "User does not exist",
		"multi-user-matched": "Multiple users are matched",
		"user-info-error": "User info error",
		"user-account-conflict": "User account conflict",
		"user-account-closed": "User account has been closed",
		"password-error": "The password is incorrect",
		"password-error-exceed-limit": "The number of password errors exceeded the limit",
		"account-exists": "Account exists",
		"account-not-exists": "Account does not exists",
		"invalid-invite-code": "Invalid invite code",
		"get-third-party-account-failed": "Get {account} failed",
		"get-third-party-user-info-failed": "Get user info failed",
		"param-required": "{param} is required",
		"check-device-feature-failed": "Check device feature failed",
		"token-not-exist": "The login status is invalid, token does not exist",
		"token-expired": "The login status is invalid, token has expired",
		"check-token-failed": "Check token failed",
		"invalid-old-password": "Invalid old password",
		"param-error": "{param} error, {reason}",
		"invalid-verify-code": "Invalid {type} verify code",
		"send-sms-code-failed": "Send sms code failed",
		"account-bound": "Account has been bound",
		"unbind-failed": "Unbind failed",
		"set-invite-code-failed": "Set invite code failed",
		"modify-invite-code-is-not-allowed": "Modifying the invitation code is prohibited",
		"decrypt-weixin-data-failed": "Decrypt weixin data failed",
		"invalid-weixin-appid": "Invalid weixin appid",
		"database-operation-failed": "Database operation failed",
		"role-not-exist": "Role does not exist",
		"permission-not-exist": "Permission does not exist",
		"context-required": '"context.{key}" is required, you should pass context using uniID.createInstance',
		"limit-client-platform": "Unsupported client platform"
	}
};

let	P = db.collection("uni-id-users"),
	R = db.collection("opendb-verify-codes"),
	j = db.collection("uni-id-roles"),
	D = db.collection("uni-id-permissions"),
	q = db.collection("uni-id-channel"),
	N = {
		username: "username",
		mobile: "mobile",
		email: "email",
		wx_unionid: "wechat-account",
		"wx_openid.app-plus": "wechat-account",
		"wx_openid.app": "wechat-account",
		"wx_openid.mp-weixin": "wechat-account",
		qq_unionid: "qq-account",
		"qq_openid.app-plus": "qq-account",
		"qq_openid.app": "qq-account",
		"qq_openid.mp-weixin": "qq-account",
		ali_openid: "alipay-account",
		apple_openid: "alipay-account"
	},
	U = 90002,
	L = 90003,
	V = 90004,
	M = 90005,
	B = 0,
	$ = 1,
	F = 4;

	
async function H({
	uid: e,
	status: t
} = {}) {
	return e ? (await P.updateOne(
		{ _id: e },
		{
			$set: {
				status: t,
				status_update_date: Date.now()
			}
		}
	), {
		code: 0
	}) : {
		code: U,
		messageValues: {
			param: this.t("user-id")
		}
	}
}
async function K({
	name: e,
	url: t,
	data: n,
	options: r,
	defaultOptions: i
}) {
	let o = {};
	const s = b(Object.assign({}, n));
	s && s.access_token && delete s.access_token;
	try {
		// const http = require('http');
		r = Object.assign({}, i, r, {
			data: s
		}),
		// o = await uniCloud.httpclient.request(t, r)
		o = { 
			headers: {
				'content-type': 'application/json'
			},
			"access_token":"ACCESS_TOKEN", 
			"expires_in":7200, 
			"refresh_token":"REFRESH_TOKEN",
			"openid":"OPENID", 
			"scope":"SCOPE",
			"unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
		}
		
		// console.log("url=====", t);
		// console.log("opt=====", r);

		// o = await new Promise((resolve, reject) => {
		// 	const req = http.request({
		// 		hostname: t,
		// 		...r,
		// 	}, res => {
		// 		console.log("res---", res);
		// 		let data = '';
		// 			res.on('data', chunk => data += chunk);
		// 			res.on('end', () => resolve(data));
		// 		});
		// 		req.on('error', error => reject(error));
		// 		req.end();
		// });
		
	} catch (t) {
		return function(e, t) {
			throw new a({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}



	let c = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(c) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer
		.isBuffer(c) && (c = {
			buffer: c,
			contentType: u
		});
	else try {
		c = JSON.parse(c.toString())
	} catch (e) {
		c = c.toString()
	}
	return v(function(e, t) {
		if (t.errcode) throw new a({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, {
			...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, c || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function G(e, t) {
	let n = "";
	if (t && t.accessToken) {
		n = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${n}`
}
class Q {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: n,
		options: r
	}) {
		const i = {
				method: "GET",
				dataType: "json",
				dataAsQueryString: !0,
				timeout: this.options.timeout
			},
			// o = await K({
			// 	name: "auth." + e,
			// 	url: `${this.options.baseUrl}${G(t,n)}`,
			// 	data: n,
			// 	options: r,
			// 	defaultOptions: i
			// });
			o = {
				expiresIn: Date.now(),
				openid: this.options.secret,
				"access_token": "ACCESS_TOKEN",
				"refresh_token": "REFRESH_TOKEN",
				"scope": "snsapi_userinfo",
				"unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
			}
		return o.appid = this.options.appId, o
	}
	async code2Session(e) {
		if (this.options.component_appid) return this.componentCode2Session(e);
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async componentCode2Session(e) {
		return await this._requestWxOpenapi({
			name: "jscode2session",
			url: "/sns/component/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				component_appid: this.options.component_appid,
				component_access_token: this.options.component_access_token,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		const t = await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		});
		return t.expiresIn && (t.expired = Date.now() + t.expiresIn), t
	}
	async getUserInfo({
		accessToken: e,
		openid: t
	} = {}) {
		const {
			nickname: n,
			headimgurl: r
		} = await this._requestWxOpenapi({
			name: "getUserInfo",
			url: "/sns/userinfo",
			data: {
				accessToken: e,
				openid: t,
				appid: this.options.appId,
				secret: this.options.secret,
				scope: "snsapi_userinfo"
			}
		});
		return {
			nickname: n,
			avatar: r
		}
	}
}
async function X({
	name: e,
	url: t,
	data: n,
	options: r,
	defaultOptions: i
}) {
	let o;
	r = Object.assign({}, i, r, {
		data: b(Object.assign({}, n))
	});
	try {
		o = await uniCloud.httpclient.request(t, r)
	} catch (t) {
		return function(e, t) {
			throw new a({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let s = o.data;
	const c = o.headers["content-type"];
	if (!Buffer.isBuffer(s) || 0 !== c.indexOf("text/plain") && 0 !== c.indexOf("application/json")) Buffer
		.isBuffer(s) && (s = {
			buffer: s,
			contentType: c
		});
	else try {
		s = JSON.parse(s.toString())
	} catch (e) {
		s = s.toString()
	}
	return v(function(e, t) {
		if (t.ret || t.error) {
			const n = t.ret || t.error || t.errcode || -2,
				r = t.msg || t.error_description || t.errmsg || e + " fail";
			throw new a({
				code: n,
				message: r
			})
		}
		return delete t.ret, delete t.msg, delete t.error, delete t.error_description, delete t.errcode,
			delete t.errmsg, {
				...t,
				errMsg: e + " ok",
				errCode: 0
			}
	}(e, s || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}
class Y {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://graph.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestQQOpenapi({
		name: e,
		url: t,
		data: n,
		options: r
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		var o, s;
		return await X({
			name: "auth." + e,
			url: (o = this.options.baseUrl, s = t, /^https?:/.test(s) ? s : o + s),
			data: n,
			options: r,
			defaultOptions: i
		})
	}
	async getOpenidByToken({
		accessToken: e
	} = {}) {
		const t = await this._requestQQOpenapi({
			name: "getOpenidByToken",
			url: "/oauth2.0/me",
			data: {
				accessToken: e,
				unionid: 1,
				fmt: "json"
			}
		});
		if (t.clientId !== this.options.appId) throw new a({
			code: "APPID_NOT_MATCH",
			message: "appid not match"
		});
		return {
			openid: t.openid,
			unionid: t.unionid
		}
	}
	async code2Session({
		code: e
	} = {}) {
		return await this._requestQQOpenapi({
			name: "getOpenidByToken",
			url: "https://api.q.qq.com/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
}
const z = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var J = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class W extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t,
			e);
		const n = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, n), this.options.alipayPublicKey && (this
			.options.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let n = e;
		const r = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version",
			"notify_url", "return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (r.indexOf(e) > -1) {
				const r = encodeURIComponent(t[e]);
				n = `${n}${n.includes("?")?"&":"?"}${e}=${r}`, delete t[e]
			} return {
			execParams: t,
			url: n
		}
	}
	_getSign(e, n) {
		const r = n.bizContent || null;
		delete n.bizContent;
		const i = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: T((o = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date)
				.getTimezoneOffset() + 60 * (o || 0)))))
		}, n);
		var o;
		r && (i.bizContent = JSON.stringify(b(r)));
		const s = b(i),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)),
					`${e}=${t}`
			}).join("&"),
			c = t.createSign(z[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, n = {}) {
		const r = this._getSign(e, t),
			{
				url: i,
				execParams: o
			} = this._formatUrl(this.options.gateway, r),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(i, {
				method: "POST",
				data: o,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== s) throw new Error("request fail");
		const c = JSON.parse(a),
			u = e.replace(/\./g, "_") + "_response",
			d = c[u],
			p = c.error_response;
		if (d) {
			if (!n.validateSign || this._checkResponseSign(a, u)) {
				if (!d.code || "10000" === d.code) {
					return {
						errCode: 0,
						errMsg: d.msg || "",
						...v(d)
					}
				}
				const e = d.sub_code ? `${d.sub_code} ${d.sub_msg}` : "" + (d.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("check sign error")
		}
		if (p) throw new Error(p.sub_msg || p.msg || "request fail");
		throw new Error("request fail")
	}
	_checkResponseSign(e, n) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const r = this._getSignStr(e, n),
			i = JSON.parse(e).sign,
			o = t.createVerify(z[this.options.signType]);
		return o.update(r, "utf8"), o.verify(this.options.alipayPublicKey, i, "base64")
	}
	_getSignStr(e, t) {
		let n = e.trim();
		const r = e.indexOf(t + '"'),
			i = e.lastIndexOf('"sign"');
		return n = n.substr(r + t.length + 1), n = n.substr(0, i), n = n.replace(/^[^{]*{/g, "{"), n = n.replace(
			/\}([^}]*)$/g, "}"), n
	}
} {
	constructor(e) {
		super(e), this._protocols = J
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}

function Z(e) {
	var t = e[0];
	return t < "0" || t > "7" ? "00" + e : e
}

function ee(e) {
	var t = e.toString(16);
	return t.length % 2 ? "0" + t : t
}

function te(e) {
	if (e <= 127) return ee(e);
	var t = ee(e);
	return ee(128 + t.length / 2) + t
}

function ne(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var re = ne((function(e, t) {
		var r = n.Buffer;

		function i(e, t) {
			for (var n in e) t[n] = e[n]
		}

		function o(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = n : (i(n, t), t.Buffer = o), o
			.prototype = Object.create(r.prototype), i(r, o), o.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, o.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var i = r(e);
				return void 0 !== t ? "string" == typeof n ? i.fill(t, n) : i.fill(t) : i.fill(0), i
			}, o.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, o.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return n.SlowBuffer(e)
			}
	})),
	ie = (re.Buffer, re.Buffer);

function oe(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = ie.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = ie.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
i.inherits(oe, r), oe.prototype.write = function(e) {
	this.buffer = ie.concat([this.buffer, ie.from(e)]), this.emit("data", e)
}, oe.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var se = oe,
	ae = n.Buffer,
	ce = n.SlowBuffer,
	ue = de;

function de(e, t) {
	if (!ae.isBuffer(e) || !ae.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var n = 0, r = 0; r < e.length; r++) n |= e[r] ^ t[r];
	return 0 === n
}
de.install = function() {
	ae.prototype.equal = ce.prototype.equal = function(e) {
		return de(this, e)
	}
};
var pe = ae.prototype.equal,
	le = ce.prototype.equal;

function fe(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
de.restore = function() {
	ae.prototype.equal = pe, ce.prototype.equal = le
};
var me = {
	ES256: fe(256),
	ES384: fe(384),
	ES512: fe(521)
};
var he = function(e) {
		var t = me[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	ge = re.Buffer;

function ye(e) {
	if (ge.isBuffer(e)) return e;
	if ("string" == typeof e) return ge.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function we(e, t, n) {
	for (var r = 0; t + r < n && 0 === e[t + r];) ++r;
	return e[t + r] >= 128 && --r, r
}
var _e = {
		derToJose: function(e, t) {
			e = ye(e);
			var n = he(t),
				r = n + 1,
				i = e.length,
				o = 0;
			if (48 !== e[o++]) throw new Error('Could not find expected "seq"');
			var s = e[o++];
			if (129 === s && (s = e[o++]), i - o < s) throw new Error('"seq" specified length of "' + s +
				'", only "' + (i - o) + '" remaining');
			if (2 !== e[o++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[o++];
			if (i - o - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (i - o - 2) +
				'" available');
			if (r < a) throw new Error('"r" specified length of "' + a + '", max of "' + r + '" is acceptable');
			var c = o;
			if (o += a, 2 !== e[o++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[o++];
			if (i - o !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (i - o) + '"');
			if (r < u) throw new Error('"s" specified length of "' + u + '", max of "' + r + '" is acceptable');
			var d = o;
			if ((o += u) !== i) throw new Error('Expected to consume entire buffer, but "' + (i - o) +
				'" bytes remain');
			var p = n - a,
				l = n - u,
				f = ge.allocUnsafe(p + a + l + u);
			for (o = 0; o < p; ++o) f[o] = 0;
			e.copy(f, o, c + Math.max(-p, 0), c + a);
			for (var m = o = n; o < m + l; ++o) f[o] = 0;
			return e.copy(f, o, d + Math.max(-l, 0), d + u), f = (f = f.toString("base64")).replace(/=/g, "")
				.replace(/\+/g, "-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = ye(e);
			var n = he(t),
				r = e.length;
			if (r !== 2 * n) throw new TypeError('"' + t + '" signatures must be "' + 2 * n + '" bytes, saw "' + r +
				'"');
			var i = we(e, 0, n),
				o = we(e, n, e.length),
				s = n - i,
				a = n - o,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				d = ge.allocUnsafe((u ? 2 : 3) + c),
				p = 0;
			return d[p++] = 48, u ? d[p++] = c : (d[p++] = 129, d[p++] = 255 & c), d[p++] = 2, d[p++] = s, i < 0 ? (
					d[p++] = 0, p += e.copy(d, p, 0, n)) : p += e.copy(d, p, i, n), d[p++] = 2, d[p++] = a, o < 0 ?
				(d[p++] = 0, e.copy(d, p, n)) : e.copy(d, p, n + o), d
		}
	},
	ve = re.Buffer,
	be = "secret must be a string or buffer",
	Te = "key must be a string or a buffer",
	Ce = "function" == typeof t.createPublicKey;

function Ee(e) {
	if (!ve.isBuffer(e) && "string" != typeof e) {
		if (!Ce) throw Se(Te);
		if ("object" != typeof e) throw Se(Te);
		if ("string" != typeof e.type) throw Se(Te);
		if ("string" != typeof e.asymmetricKeyType) throw Se(Te);
		if ("function" != typeof e.export) throw Se(Te)
	}
}

function Ie(e) {
	if (!ve.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw Se(
		"key must be a string, a buffer or an object")
}

function xe(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Ae(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var n = 0; n < t; ++n) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function Se(e) {
	var t = [].slice.call(arguments, 1),
		n = i.format.bind(i, e).apply(null, t);
	return new TypeError(n)
}

function ke(e) {
	var t;
	return t = e, ve.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function Oe(e) {
	return function(n, r) {
		! function(e) {
			if (!ve.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!Ce) throw Se(be);
				if ("object" != typeof e) throw Se(be);
				if ("secret" !== e.type) throw Se(be);
				if ("function" != typeof e.export) throw Se(be)
			}
		}(r), n = ke(n);
		var i = t.createHmac("sha" + e, r);
		return xe((i.update(n), i.digest("base64")))
	}
}

function Pe(e) {
	return function(t, n, r) {
		var i = Oe(e)(t, r);
		return ue(ve.from(n), ve.from(i))
	}
}

function Re(e) {
	return function(n, r) {
		Ie(r), n = ke(n);
		var i = t.createSign("RSA-SHA" + e);
		return xe((i.update(n), i.sign(r, "base64")))
	}
}

function je(e) {
	return function(n, r, i) {
		Ee(i), n = ke(n), r = Ae(r);
		var o = t.createVerify("RSA-SHA" + e);
		return o.update(n), o.verify(i, r, "base64")
	}
}

function De(e) {
	return function(n, r) {
		Ie(r), n = ke(n);
		var i = t.createSign("RSA-SHA" + e);
		return xe((i.update(n), i.sign({
			key: r,
			padding: t.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function qe(e) {
	return function(n, r, i) {
		Ee(i), n = ke(n), r = Ae(r);
		var o = t.createVerify("RSA-SHA" + e);
		return o.update(n), o.verify({
			key: i,
			padding: t.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function Ne(e) {
	var t = Re(e);
	return function() {
		var n = t.apply(null, arguments);
		return n = _e.derToJose(n, "ES" + e)
	}
}

function Ue(e) {
	var t = je(e);
	return function(n, r, i) {
		return r = _e.joseToDer(r, "ES" + e).toString("base64"), t(n, r, i)
	}
}

function Le() {
	return function() {
		return ""
	}
}

function Ve() {
	return function(e, t) {
		return "" === t
	}
}
Ce && (Te += " or a KeyObject", be += "or a KeyObject");
var Me = function(e) {
		var t = {
				hs: Oe,
				rs: Re,
				ps: De,
				es: Ne,
				none: Le
			},
			n = {
				hs: Pe,
				rs: je,
				ps: qe,
				es: Ue,
				none: Ve
			},
			r = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!r) throw Se(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var i = (r[1] || r[3]).toLowerCase(),
			o = r[2];
		return {
			sign: t[i](o),
			verify: n[i](o)
		}
	},
	Be = n.Buffer,
	$e = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || Be.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	Fe = re.Buffer;

function He(e, t) {
	return Fe.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Ke(e) {
	var t = e.header,
		n = e.payload,
		r = e.secret || e.privateKey,
		o = e.encoding,
		s = Me(t.alg),
		a = function(e, t, n) {
			n = n || "utf8";
			var r = He($e(e), "binary"),
				o = He($e(t), n);
			return i.format("%s.%s", r, o)
		}(t, n, o),
		c = s.sign(a, r);
	return i.format("%s.%s", a, c)
}

function Ge(e) {
	var t = e.secret || e.privateKey || e.key,
		n = new se(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key =
		n, this.payload = new se(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
i.inherits(Ge, r), Ge.prototype.sign = function() {
	try {
		var e = Ke({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Ge.sign = Ke;
var Qe = Ge,
	Xe = re.Buffer,
	Ye = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function ze(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function Je(e) {
	var t = e.split(".", 1)[0];
	return ze(Xe.from(t, "base64").toString("binary"))
}

function We(e) {
	return e.split(".")[2]
}

function Ze(e) {
	return Ye.test(e) && !!Je(e)
}

function et(e, t, n) {
	if (!t) {
		var r = new Error("Missing algorithm parameter for jws.verify");
		throw r.code = "MISSING_ALGORITHM", r
	}
	var i = We(e = $e(e)),
		o = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return Me(t).verify(o, i, n)
}

function tt(e, t) {
	if (t = t || {}, !Ze(e = $e(e))) return null;
	var n = Je(e);
	if (!n) return null;
	var r = function(e, t) {
		t = t || "utf8";
		var n = e.split(".")[1];
		return Xe.from(n, "base64").toString(t)
	}(e);
	return ("JWT" === n.typ || t.json) && (r = JSON.parse(r, t.encoding)), {
		header: n,
		payload: r,
		signature: We(e)
	}
}

function nt(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		n = new se(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this
		.key = n, this.signature = new se(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
i.inherits(nt, r), nt.prototype.verify = function() {
	try {
		var e = et(this.signature.buffer, this.algorithm, this.key.buffer),
			t = tt(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, nt.decode = tt, nt.isValid = Ze, nt.verify = et;
var rt = nt,
	it = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Qe.sign,
		verify: rt.verify,
		decode: rt.decode,
		isValid: rt.isValid,
		createSign: function(e) {
			return new Qe(e)
		},
		createVerify: function(e) {
			return new rt(e)
		}
	},
	ot = function(e, t) {
		t = t || {};
		var n = it.decode(e, t);
		if (!n) return null;
		var r = n.payload;
		if ("string" == typeof r) try {
			var i = JSON.parse(r);
			null !== i && "object" == typeof i && (r = i)
		} catch (e) {}
		return !0 === t.complete ? {
			header: n.header,
			payload: r,
			signature: n.signature
		} : r
	},
	st = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(st.prototype = Object.create(Error.prototype)).constructor = st;
var at = st,
	ct = function(e, t) {
		at.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(ct.prototype = Object.create(at.prototype)).constructor = ct;
var ut = ct,
	dt = function(e, t) {
		at.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(dt.prototype = Object.create(at.prototype)).constructor = dt;
var pt = dt,
	lt = 1e3,
	ft = 60 * lt,
	mt = 60 * ft,
	ht = 24 * mt,
	gt = function(e, t) {
		t = t || {};
		var n = typeof e;
		if ("string" === n && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var n = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * n;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * n;
				case "days":
				case "day":
				case "d":
					return n * ht;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return n * mt;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return n * ft;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return n * lt;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return n;
				default:
					return
			}
		}(e);
		if ("number" === n && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= ht) return yt(e, t, ht, "day");
			if (t >= mt) return yt(e, t, mt, "hour");
			if (t >= ft) return yt(e, t, ft, "minute");
			if (t >= lt) return yt(e, t, lt, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= ht) return Math.round(e / ht) + "d";
			if (t >= mt) return Math.round(e / mt) + "h";
			if (t >= ft) return Math.round(e / ft) + "m";
			if (t >= lt) return Math.round(e / lt) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function yt(e, t, n, r) {
	var i = t >= 1.5 * n;
	return Math.round(e / n) + " " + r + (i ? "s" : "")
}
var wt = function(e, t) {
		var n = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var r = gt(e);
			if (void 0 === r) return;
			return Math.floor(n + r / 1e3)
		}
		return "number" == typeof e ? n + e : void 0
	},
	_t = ne((function(e, t) {
		var n;
		t = e.exports = G, n = "object" == typeof process && process.env && process.env.NODE_DEBUG &&
			/\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
				var e = Array.prototype.slice.call(arguments, 0);
				e.unshift("SEMVER"), console.log.apply(console, e)
			} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var r = Number.MAX_SAFE_INTEGER || 9007199254740991,
			i = t.re = [],
			o = t.src = [],
			s = 0,
			a = s++;
		o[a] = "0|[1-9]\\d*";
		var c = s++;
		o[c] = "[0-9]+";
		var u = s++;
		o[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var d = s++;
		o[d] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
		var p = s++;
		o[p] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
		var l = s++;
		o[l] = "(?:" + o[a] + "|" + o[u] + ")";
		var f = s++;
		o[f] = "(?:" + o[c] + "|" + o[u] + ")";
		var m = s++;
		o[m] = "(?:-(" + o[l] + "(?:\\." + o[l] + ")*))";
		var h = s++;
		o[h] = "(?:-?(" + o[f] + "(?:\\." + o[f] + ")*))";
		var g = s++;
		o[g] = "[0-9A-Za-z-]+";
		var y = s++;
		o[y] = "(?:\\+(" + o[g] + "(?:\\." + o[g] + ")*))";
		var w = s++,
			_ = "v?" + o[d] + o[m] + "?" + o[y] + "?";
		o[w] = "^" + _ + "$";
		var v = "[v=\\s]*" + o[p] + o[h] + "?" + o[y] + "?",
			b = s++;
		o[b] = "^" + v + "$";
		var T = s++;
		o[T] = "((?:<|>)?=?)";
		var C = s++;
		o[C] = o[c] + "|x|X|\\*";
		var E = s++;
		o[E] = o[a] + "|x|X|\\*";
		var I = s++;
		o[I] = "[v=\\s]*(" + o[E] + ")(?:\\.(" + o[E] + ")(?:\\.(" + o[E] + ")(?:" + o[m] + ")?" + o[y] +
			"?)?)?";
		var x = s++;
		o[x] = "[v=\\s]*(" + o[C] + ")(?:\\.(" + o[C] + ")(?:\\.(" + o[C] + ")(?:" + o[h] + ")?" + o[y] +
			"?)?)?";
		var A = s++;
		o[A] = "^" + o[T] + "\\s*" + o[I] + "$";
		var S = s++;
		o[S] = "^" + o[T] + "\\s*" + o[x] + "$";
		var k = s++;
		o[k] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var O = s++;
		o[O] = "(?:~>?)";
		var P = s++;
		o[P] = "(\\s*)" + o[O] + "\\s+", i[P] = new RegExp(o[P], "g");
		var R = s++;
		o[R] = "^" + o[O] + o[I] + "$";
		var j = s++;
		o[j] = "^" + o[O] + o[x] + "$";
		var D = s++;
		o[D] = "(?:\\^)";
		var q = s++;
		o[q] = "(\\s*)" + o[D] + "\\s+", i[q] = new RegExp(o[q], "g");
		var N = s++;
		o[N] = "^" + o[D] + o[I] + "$";
		var U = s++;
		o[U] = "^" + o[D] + o[x] + "$";
		var L = s++;
		o[L] = "^" + o[T] + "\\s*(" + v + ")$|^$";
		var V = s++;
		o[V] = "^" + o[T] + "\\s*(" + _ + ")$|^$";
		var M = s++;
		o[M] = "(\\s*)" + o[T] + "\\s*(" + v + "|" + o[I] + ")", i[M] = new RegExp(o[M], "g");
		var B = s++;
		o[B] = "^\\s*(" + o[I] + ")\\s+-\\s+(" + o[I] + ")\\s*$";
		var $ = s++;
		o[$] = "^\\s*(" + o[x] + ")\\s+-\\s+(" + o[x] + ")\\s*$";
		var F = s++;
		o[F] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) n(H, o[H]), i[H] || (i[H] = new RegExp(o[H]));

		function K(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? i[b] : i[w]).test(e)) return null;
			try {
				return new G(e, t)
			} catch (e) {
				return null
			}
		}

		function G(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof G)) return new G(e, t);
			n("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var o = e.trim().match(t.loose ? i[b] : i[w]);
			if (!o) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > r || this
				.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > r || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > r || this.patch < 0) throw new TypeError("Invalid patch version");
			o[4] ? this.prerelease = o[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < r) return t
				}
				return e
			})) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format()
		}
		t.parse = K, t.valid = function(e, t) {
			var n = K(e, t);
			return n ? n.version : null
		}, t.clean = function(e, t) {
			var n = K(e.trim().replace(/^[=v]+/, ""), t);
			return n ? n.version : null
		}, t.SemVer = G, G.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease
				.length && (this.version += "-" + this.prerelease.join(".")), this.version
		}, G.prototype.toString = function() {
			return this.version
		}, G.prototype.compare = function(e) {
			return n("SemVer.compare", this.version, this.options, e), e instanceof G || (e = new G(e, this
				.options)), this.compareMain(e) || this.comparePre(e)
		}, G.prototype.compareMain = function(e) {
			return e instanceof G || (e = new G(e, this.options)), X(this.major, e.major) || X(this.minor, e
				.minor) || X(this.patch, e.patch)
		}, G.prototype.comparePre = function(e) {
			if (e instanceof G || (e = new G(e, this.options)), this.prerelease.length && !e.prerelease
				.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var r = this.prerelease[t],
					i = e.prerelease[t];
				if (n("prerelease compare", t, r, i), void 0 === r && void 0 === i) return 0;
				if (void 0 === i) return 1;
				if (void 0 === r) return -1;
				if (r !== i) return X(r, i)
			} while (++t)
		}, G.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(
						"pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++,
						this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this
						.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var n = this.prerelease.length; --n >= 0;) "number" == typeof this.prerelease[
							n] && (this.prerelease[n]++, n = -2); - 1 === n && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t,
						0]) : this.prerelease = [t, 0]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, n, r) {
			"string" == typeof n && (r = n, n = void 0);
			try {
				return new G(e, n).inc(t, r).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (W(e, t)) return null;
			var n = K(e),
				r = K(t),
				i = "";
			if (n.prerelease.length || r.prerelease.length) {
				i = "pre";
				var o = "prerelease"
			}
			for (var s in n)
				if (("major" === s || "minor" === s || "patch" === s) && n[s] !== r[s]) return i + s;
			return o
		}, t.compareIdentifiers = X;
		var Q = /^[0-9]+$/;

		function X(e, t) {
			var n = Q.test(e),
				r = Q.test(t);
			return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1
		}

		function Y(e, t, n) {
			return new G(e, n).compare(new G(t, n))
		}

		function z(e, t, n) {
			return Y(e, t, n) > 0
		}

		function J(e, t, n) {
			return Y(e, t, n) < 0
		}

		function W(e, t, n) {
			return 0 === Y(e, t, n)
		}

		function Z(e, t, n) {
			return 0 !== Y(e, t, n)
		}

		function ee(e, t, n) {
			return Y(e, t, n) >= 0
		}

		function te(e, t, n) {
			return Y(e, t, n) <= 0
		}

		function ne(e, t, n, r) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version),
						e === n;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version),
						e !== n;
				case "":
				case "=":
				case "==":
					return W(e, n, r);
				case "!=":
					return Z(e, n, r);
				case ">":
					return z(e, n, r);
				case ">=":
					return ee(e, n, r);
				case "<":
					return J(e, n, r);
				case "<=":
					return te(e, n, r);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function re(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof re) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof re)) return new re(e, t);
			n("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ?
				this.value = "" : this.value = this.operator + this.semver.version, n("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return X(t, e)
		}, t.major = function(e, t) {
			return new G(e, t).major
		}, t.minor = function(e, t) {
			return new G(e, t).minor
		}, t.patch = function(e, t) {
			return new G(e, t).patch
		}, t.compare = Y, t.compareLoose = function(e, t) {
			return Y(e, t, !0)
		}, t.rcompare = function(e, t, n) {
			return Y(t, e, n)
		}, t.sort = function(e, n) {
			return e.sort((function(e, r) {
				return t.compare(e, r, n)
			}))
		}, t.rsort = function(e, n) {
			return e.sort((function(e, r) {
				return t.rcompare(e, r, n)
			}))
		}, t.gt = z, t.lt = J, t.eq = W, t.neq = Z, t.gte = ee, t.lte = te, t.cmp = ne, t.Comparator = re;
		var ie = {};

		function oe(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof oe) return e.loose === !!t.loose && e.includePrerelease === !!t
				.includePrerelease ? e : new oe(e.raw, t);
			if (e instanceof re) return new oe(e.value, t);
			if (!(this instanceof oe)) return new oe(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this
				.raw = e, this.set = e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function se(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function ae(e, t, n, r, i, o, s, a, c, u, d, p, l) {
			return ((t = se(n) ? "" : se(r) ? ">=" + n + ".0.0" : se(i) ? ">=" + n + "." + r + ".0" : ">=" +
				t) + " " + (a = se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(d) ? "<" + c + "." + (+u +
					1) + ".0" : p ? "<=" + c + "." + u + "." + d + "-" + p : "<=" + a)).trim()
		}

		function ce(e, t, r) {
			for (var i = 0; i < e.length; i++)
				if (!e[i].test(t)) return !1;
			if (t.prerelease.length && !r.includePrerelease) {
				for (i = 0; i < e.length; i++)
					if (n(e[i].semver), e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
						var o = e[i].semver;
						if (o.major === t.major && o.minor === t.minor && o.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, n) {
			try {
				t = new oe(t, n)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function de(e, t, n, r) {
			var i, o, s, a, c;
			switch (e = new G(e, r), t = new oe(t, r), n) {
				case ">":
					i = z, o = te, s = J, a = ">", c = ">=";
					break;
				case "<":
					i = J, o = ee, s = z, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, r)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var d = t.set[u],
					p = null,
					l = null;
				if (d.forEach((function(e) {
						e.semver === ie && (e = new re(">=0.0.0")), p = p || e, l = l || e, i(e.semver,
							p.semver, r) ? p = e : s(e.semver, l.semver, r) && (l = e)
					})), p.operator === a || p.operator === c) return !1;
				if ((!l.operator || l.operator === a) && o(e, l.semver)) return !1;
				if (l.operator === c && s(e, l.semver)) return !1
			}
			return !0
		}
		re.prototype.parse = function(e) {
			var t = this.options.loose ? i[L] : i[V],
				n = e.match(t);
			if (!n) throw new TypeError("Invalid comparator: " + e);
			this.operator = n[1], "=" === this.operator && (this.operator = ""), n[2] ? this.semver = new G(
				n[2], this.options.loose) : this.semver = ie
		}, re.prototype.toString = function() {
			return this.value
		}, re.prototype.test = function(e) {
			return n("Comparator.test", e, this.options.loose), this.semver === ie || ("string" ==
				typeof e && (e = new G(e, this.options)), ne(e, this.operator, this.semver, this
					.options))
		}, re.prototype.intersects = function(e, t) {
			if (!(e instanceof re)) throw new TypeError("a Comparator is required");
			var n;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return n = new oe(e.value, t), ue(this.value, n, t);
			if ("" === e.operator) return n = new oe(this.value, t), ue(e.semver, n, t);
			var r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e
					.operator),
				i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e
					.operator),
				o = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e
					.operator),
				a = ne(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this
				.operator) && ("<=" === e.operator || "<" === e.operator),
				c = ne(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this
				.operator) && (">=" === e.operator || ">" === e.operator);
			return r || i || o && s || a || c
		}, t.Range = oe, oe.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, oe.prototype.toString = function() {
			return this.range
		}, oe.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var r = t ? i[$] : i[B];
			e = e.replace(r, ae), n("hyphen replace", e), e = e.replace(i[M], "$1$2$3"), n(
					"comparator trim", e, i[M]), e = (e = (e = e.replace(i[P], "$1~")).replace(i[q], "$1^"))
				.split(/\s+/).join(" ");
			var o = t ? i[L] : i[V],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return n("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									n("caret", e, t);
									var r = t.loose ? i[U] : i[N];
									return e.replace(r, (function(t, r, i,
										o, s) {
										var a;
										return n("caret", e, t,
												r, i, o, s), se(
												r) ? a = "" :
											se(i) ? a = ">=" +
											r + ".0.0 <" + (+r +
												1) + ".0.0" :
											se(o) ? a = "0" ===
											r ? ">=" + r + "." +
											i + ".0 <" + r +
											"." + (+i + 1) +
											".0" : ">=" + r +
											"." + i + ".0 <" + (
												+r + 1) +
											".0.0" : s ? (n(
													"replaceCaret pr",
													s), a =
												"0" === r ?
												"0" === i ?
												">=" + r + "." +
												i + "." + o +
												"-" + s + " <" +
												r + "." + i +
												"." + (+o + 1) :
												">=" + r + "." +
												i + "." + o +
												"-" + s + " <" +
												r + "." + (+i +
													1) + ".0" :
												">=" + r + "." +
												i + "." + o +
												"-" + s + " <" +
												(+r + 1) +
												".0.0") : (n(
													"no pr"),
												a = "0" === r ?
												"0" === i ?
												">=" + r + "." +
												i + "." + o +
												" <" + r + "." +
												i + "." + (+o +
													1) : ">=" +
												r + "." + i +
												"." + o + " <" +
												r + "." + (+i +
													1) + ".0" :
												">=" + r + "." +
												i + "." + o +
												" <" + (+r +
												1) + ".0.0"), n(
												"caret return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), n("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var r = t.loose ? i[j] : i[R];
									return e.replace(r, (function(t, r, i,
										o, s) {
										var a;
										return n("tilde", e, t,
												r, i, o, s), se(
												r) ? a = "" :
											se(i) ? a = ">=" +
											r + ".0.0 <" + (+r +
												1) + ".0.0" :
											se(o) ? a = ">=" +
											r + "." + i +
											".0 <" + r + "." + (
												+i + 1) + ".0" :
											s ? (n("replaceTilde pr",
													s), a =
												">=" + r + "." +
												i + "." + o +
												"-" + s + " <" +
												r + "." + (+i +
													1) + ".0") :
											a = ">=" + r + "." +
											i + "." + o + " <" +
											r + "." + (+i + 1) +
											".0", n(
												"tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), n("tildes", e), e = function(e, t) {
							return n("replaceXRanges", e, t), e.split(/\s+/).map((function(
								e) {
								return function(e, t) {
									e = e.trim();
									var r = t.loose ? i[S] : i[A];
									return e.replace(r, (function(t, r, i,
										o, s, a) {
										n("xRange", e, t, r, i,
											o, s, a);
										var c = se(i),
											u = c || se(o),
											d = u || se(s);
										return "=" === r && d &&
											(r = ""), c ? t =
											">" === r || "<" ===
											r ? "<0.0.0" : "*" :
											r && d ? (u && (o =
													0), s = 0,
												">" === r ? (r =
													">=", u ? (
														i = +i +
														1, o =
														0, s = 0
														) : (
														o = +o +
														1, s = 0
														)) :
												"<=" === r && (
													r = "<", u ?
													i = +i + 1 :
													o = +o + 1),
												t = r + i +
												"." + o + "." +
												s) : u ? t =
											">=" + i +
											".0.0 <" + (+i +
											1) + ".0.0" : d && (
												t = ">=" + i +
												"." + o +
												".0 <" + i +
												"." + (+o + 1) +
												".0"), n(
												"xRange return",
												t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), n("xrange", e), e = function(e, t) {
							return n("replaceStars", e, t), e.trim().replace(i[F], "")
						}(e, t), n("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(o)
			}))), s = s.map((function(e) {
				return new re(e, this.options)
			}), this)
		}, oe.prototype.intersects = function(e, t) {
			if (!(e instanceof oe)) throw new TypeError("a Range is required");
			return this.set.some((function(n) {
				return n.every((function(n) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return n.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new oe(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, oe.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new G(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, n) {
			var r = null,
				i = null;
			try {
				var o = new oe(t, n)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (r && -1 !== i.compare(e) || (i = new G(r = e, n)))
			})), r
		}, t.minSatisfying = function(e, t, n) {
			var r = null,
				i = null;
			try {
				var o = new oe(t, n)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (r && 1 !== i.compare(e) || (i = new G(r = e, n)))
			})), r
		}, t.minVersion = function(e, t) {
			e = new oe(e, t);
			var n = new G("0.0.0");
			if (e.test(n)) return n;
			if (n = new G("0.0.0-0"), e.test(n)) return n;
			n = null;
			for (var r = 0; r < e.set.length; ++r) {
				e.set[r].forEach((function(e) {
					var t = new G(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t
								.raw = t.format();
						case "":
						case ">=":
							n && !z(n, t) || (n = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (n && e.test(n)) return n;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new oe(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, n) {
			return de(e, t, "<", n)
		}, t.gtr = function(e, t, n) {
			return de(e, t, ">", n)
		}, t.outside = de, t.prerelease = function(e, t) {
			var n = K(e, t);
			return n && n.prerelease.length ? n.prerelease : null
		}, t.intersects = function(e, t, n) {
			return e = new oe(e, n), t = new oe(t, n), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof G) return e;
			if ("string" != typeof e) return null;
			var t = e.match(i[k]);
			if (null == t) return null;
			return K(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	vt = (_t.SEMVER_SPEC_VERSION, _t.re, _t.src, _t.parse, _t.valid, _t.clean, _t.SemVer, _t.inc, _t.diff, _t
		.compareIdentifiers, _t.rcompareIdentifiers, _t.major, _t.minor, _t.patch, _t.compare, _t.compareLoose, _t
		.rcompare, _t.sort, _t.rsort, _t.gt, _t.lt, _t.eq, _t.neq, _t.gte, _t.lte, _t.cmp, _t.Comparator, _t.Range, _t
		.toComparators, _t.satisfies, _t.maxSatisfying, _t.minSatisfying, _t.minVersion, _t.validRange, _t.ltr, _t.gtr,
		_t.outside, _t.prerelease, _t.intersects, _t.coerce, _t.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	bt = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	Tt = ["RS256", "RS384", "RS512"],
	Ct = ["HS256", "HS384", "HS512"];
vt && (bt.splice(3, 0, "PS256", "PS384", "PS512"), Tt.splice(3, 0, "PS256", "PS384", "PS512"));
var Et = /^\s+|\s+$/g,
	It = /^[-+]0x[0-9a-f]+$/i,
	xt = /^0b[01]+$/i,
	At = /^0o[0-7]+$/i,
	St = /^(?:0|[1-9]\d*)$/,
	kt = parseInt;

function Ot(e) {
	return e != e
}

function Pt(e, t) {
	return function(e, t) {
		for (var n = -1, r = e ? e.length : 0, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
		return i
	}(t, (function(t) {
		return e[t]
	}))
}
var Rt, jt, Dt = Object.prototype,
	qt = Dt.hasOwnProperty,
	Nt = Dt.toString,
	Ut = Dt.propertyIsEnumerable,
	Lt = (Rt = Object.keys, jt = Object, function(e) {
		return Rt(jt(e))
	}),
	Vt = Math.max;

function Mt(e, t) {
	var n = Ft(e) || function(e) {
			return function(e) {
				return Gt(e) && Ht(e)
			}(e) && qt.call(e, "callee") && (!Ut.call(e, "callee") || "[object Arguments]" == Nt.call(e))
		}(e) ? function(e, t) {
			for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
			return r
		}(e.length, String) : [],
		r = n.length,
		i = !!r;
	for (var o in e) !t && !qt.call(e, o) || i && ("length" == o || $t(o, r)) || n.push(o);
	return n
}

function Bt(e) {
	if (n = (t = e) && t.constructor, r = "function" == typeof n && n.prototype || Dt, t !== r) return Lt(e);
	var t, n, r, i = [];
	for (var o in Object(e)) qt.call(e, o) && "constructor" != o && i.push(o);
	return i
}

function $t(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || St.test(e)) && e > -1 && e % 1 == 0 &&
		e < t
}
var Ft = Array.isArray;

function Ht(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = Kt(e) ? Nt.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function Kt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function Gt(e) {
	return !!e && "object" == typeof e
}
var Qt = function(e, t, n, r) {
		var i;
		e = Ht(e) ? e : (i = e) ? Pt(i, function(e) {
			return Ht(e) ? Mt(e) : Bt(e)
		}(i)) : [], n = n && !r ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || Gt(e) && "[object Symbol]" == Nt.call(e)
								}(e)) return NaN;
							if (Kt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Kt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(Et, "");
							var n = xt.test(e);
							return n || At.test(e) ? kt(e.slice(2), n ? 2 : 8) : It.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				n = t % 1;
			return t == t ? n ? t - n : t : 0
		}(n) : 0;
		var o = e.length;
		return n < 0 && (n = Vt(o + n, 0)),
			function(e) {
				return "string" == typeof e || !Ft(e) && Gt(e) && "[object String]" == Nt.call(e)
			}(e) ? n <= o && e.indexOf(t, n) > -1 : !!o && function(e, t, n) {
				if (t != t) return function(e, t, n, r) {
					for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i;)
						if (t(e[o], o, e)) return o;
					return -1
				}(e, Ot, n);
				for (var r = n - 1, i = e.length; ++r < i;)
					if (e[r] === t) return r;
				return -1
			}(e, t, n) > -1
	},
	Xt = Object.prototype.toString;
var Yt = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == Xt.call(e)
	},
	zt = /^\s+|\s+$/g,
	Jt = /^[-+]0x[0-9a-f]+$/i,
	Wt = /^0b[01]+$/i,
	Zt = /^0o[0-7]+$/i,
	en = parseInt,
	tn = Object.prototype.toString;

function nn(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var rn = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == tn.call(e)
								}(e)) return NaN;
							if (nn(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = nn(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(zt, "");
							var n = Wt.test(e);
							return n || Zt.test(e) ? en(e.slice(2), n ? 2 : 8) : Jt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				n = t % 1;
			return t == t ? n ? t - n : t : 0
		}(e)
	},
	on = Object.prototype.toString;
var sn = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == on.call(e)
};
var an = Function.prototype,
	cn = Object.prototype,
	un = an.toString,
	dn = cn.hasOwnProperty,
	pn = un.call(Object),
	ln = cn.toString,
	fn = function(e, t) {
		return function(n) {
			return e(t(n))
		}
	}(Object.getPrototypeOf, Object);
var mn = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != ln.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = fn(e);
		if (null === t) return !0;
		var n = dn.call(t, "constructor") && t.constructor;
		return "function" == typeof n && n instanceof n && un.call(n) == pn
	},
	hn = Object.prototype.toString,
	gn = Array.isArray;
var yn = function(e) {
		return "string" == typeof e || !gn(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == hn.call(e)
	},
	wn = /^\s+|\s+$/g,
	_n = /^[-+]0x[0-9a-f]+$/i,
	vn = /^0b[01]+$/i,
	bn = /^0o[0-7]+$/i,
	Tn = parseInt,
	Cn = Object.prototype.toString;

function En(e, t) {
	var n;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Cn.call(e)
								}(e)) return NaN;
							if (In(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = In(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(wn, "");
							var n = vn.test(e);
							return n || bn.test(e) ? Tn(e.slice(2), n ? 2 : 8) : _n.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				n = t % 1;
			return t == t ? n ? t - n : t : 0
		}(e),
		function() {
			return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = void 0), n
		}
}

function In(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var xn = function(e) {
		return En(2, e)
	},
	An = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
vt && An.splice(3, 0, "PS256", "PS384", "PS512");
var Sn = {
		expiresIn: {
			isValid: function(e) {
				return rn(e) || yn(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return rn(e) || yn(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return yn(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Qt.bind(null, An),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: mn,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: yn,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: yn,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: yn,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: yn,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: Yt,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: yn,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: Yt,
			message: '"mutatePayload" must be a boolean'
		}
	},
	kn = {
		iat: {
			isValid: sn,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: sn,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: sn,
			message: '"nbf" should be a number of seconds'
		}
	};

function On(e, t, n, r) {
	if (!mn(n)) throw new Error('Expected "' + r + '" to be a plain object.');
	Object.keys(n).forEach((function(i) {
		var o = e[i];
		if (o) {
			if (!o.isValid(n[i])) throw new Error(o.message)
		} else if (!t) throw new Error('"' + i + '" is not allowed in "' + r + '"')
	}))
}
var Pn = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	Rn = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	jn = function(e, t, n, r) {
		var i;
		if ("function" != typeof n || r || (r = n, n = {}), n || (n = {}), n = Object.assign({}, n), i = r || function(
				e, t) {
				if (e) throw e;
				return t
			}, n.clockTimestamp && "number" != typeof n.clockTimestamp) return i(new at(
			"clockTimestamp must be a number"));
		if (void 0 !== n.nonce && ("string" != typeof n.nonce || "" === n.nonce.trim())) return i(new at(
			"nonce must be a non-empty string"));
		var o = n.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return i(new at("jwt must be provided"));
		if ("string" != typeof e) return i(new at("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return i(new at("jwt malformed"));
		try {
			s = ot(e, {
				complete: !0
			})
		} catch (e) {
			return i(e)
		}
		if (!s) return i(new at("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!r) return i(new at(
				"verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, n) {
			return n(null, t)
		};
		return c(u, (function(t, r) {
			if (t) return i(new at("error in secret or public key callback: " + t.message));
			var c, d = "" !== a[2].trim();
			if (!d && r) return i(new at("jwt signature is required"));
			if (d && !r) return i(new at("secret or public key must be provided"));
			if (d || n.algorithms || (n.algorithms = ["none"]), n.algorithms || (n.algorithms = ~r
					.toString().indexOf("BEGIN CERTIFICATE") || ~r.toString().indexOf("BEGIN PUBLIC KEY") ?
					bt : ~r.toString().indexOf("BEGIN RSA PUBLIC KEY") ? Tt : Ct), !~n.algorithms.indexOf(s
					.header.alg)) return i(new at("invalid algorithm"));
			try {
				c = it.verify(e, s.header.alg, r)
			} catch (e) {
				return i(e)
			}
			if (!c) return i(new at("invalid signature"));
			var p = s.payload;
			if (void 0 !== p.nbf && !n.ignoreNotBefore) {
				if ("number" != typeof p.nbf) return i(new at("invalid nbf value"));
				if (p.nbf > o + (n.clockTolerance || 0)) return i(new ut("jwt not active", new Date(1e3 * p
					.nbf)))
			}
			if (void 0 !== p.exp && !n.ignoreExpiration) {
				if ("number" != typeof p.exp) return i(new at("invalid exp value"));
				if (o >= p.exp + (n.clockTolerance || 0)) return i(new pt("jwt expired", new Date(1e3 * p
					.exp)))
			}
			if (n.audience) {
				var l = Array.isArray(n.audience) ? n.audience : [n.audience];
				if (!(Array.isArray(p.aud) ? p.aud : [p.aud]).some((function(e) {
						return l.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return i(new at("jwt audience invalid. expected: " + l.join(" or ")))
			}
			if (n.issuer && ("string" == typeof n.issuer && p.iss !== n.issuer || Array.isArray(n.issuer) &&
					-1 === n.issuer.indexOf(p.iss))) return i(new at("jwt issuer invalid. expected: " + n
				.issuer));
			if (n.subject && p.sub !== n.subject) return i(new at("jwt subject invalid. expected: " + n
				.subject));
			if (n.jwtid && p.jti !== n.jwtid) return i(new at("jwt jwtid invalid. expected: " + n.jwtid));
			if (n.nonce && p.nonce !== n.nonce) return i(new at("jwt nonce invalid. expected: " + n.nonce));
			if (n.maxAge) {
				if ("number" != typeof p.iat) return i(new at("iat required when maxAge is specified"));
				var f = wt(n.maxAge, p.iat);
				if (void 0 === f) return i(new at(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
					));
				if (o >= f + (n.clockTolerance || 0)) return i(new pt("maxAge exceeded", new Date(1e3 * f)))
			}
			if (!0 === n.complete) {
				var m = s.signature;
				return i(null, {
					header: u,
					payload: p,
					signature: m
				})
			}
			return i(null, p)
		}))
	},
	Dn = function(e, t, n, r) {
		"function" == typeof n ? (r = n, n = {}) : n = n || {};
		var i = "object" == typeof e && !Buffer.isBuffer(e),
			o = Object.assign({
				alg: n.algorithm || "HS256",
				typ: i ? "JWT" : void 0,
				kid: n.keyid
			}, n.header);

		function s(e) {
			if (r) return r(e);
			throw e
		}
		if (!t && "none" !== n.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (i) {
			try {
				! function(e) {
					On(kn, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			n.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = Rn.filter((function(e) {
				return void 0 !== n[e]
			}));
			if (a.length > 0) return s(new Error("invalid " + a.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== n.expiresIn) return s(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== n.notBefore) return s(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				On(Sn, !1, e, "options")
			}(n)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (n.noTimestamp ? delete e.iat : i && (e.iat = c), void 0 !== n.notBefore) {
			try {
				e.nbf = wt(n.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		if (void 0 !== n.expiresIn && "object" == typeof e) {
			try {
				e.exp = wt(n.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		Object.keys(Pn).forEach((function(t) {
			var r = Pn[t];
			if (void 0 !== n[t]) {
				if (void 0 !== e[r]) return s(new Error('Bad "options.' + t +
					'" option. The payload already has an "' + r + '" property.'));
				e[r] = n[t]
			}
		}));
		var u = n.encoding || "utf8";
		if ("function" != typeof r) return it.sign({
			header: o,
			payload: e,
			secret: t,
			encoding: u
		});
		r = r && xn(r), it.createSign({
			header: o,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", r).once("done", (function(e) {
			r(null, e)
		}))
	};
let qn = [];
class Nn {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://appleid.apple.com",
			timeout: 1e4
		}, e)
	}
	async _fetch(e, t) {
		const {
			baseUrl: n
		} = this.options;
		return uniCloud.httpclient.request(n + e, t)
	}
	async verifyIdentityToken(e) {
		const t = e.split(".")[0],
			{
				kid: n
			} = JSON.parse(Buffer.from(t, "base64").toString());
		if (!qn.length) try {
			qn = await this.getAuthKeys()
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		const r = this.getUsedKey(qn, n);
		if (!Object.keys(r).length && !this.fetched) try {
			qn = await this.getAuthKeys()
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		let i = null;
		try {
			i = jn(e, function(e, t) {
				var n = Buffer.from(e, "base64"),
					r = Buffer.from(t, "base64"),
					i = n.toString("hex"),
					o = r.toString("hex");
				i = Z(i), o = Z(o);
				var s = i.length / 2,
					a = o.length / 2,
					c = te(s),
					u = te(a),
					d = "30" + te(s + a + c.length / 2 + u.length / 2 + 2) + "02" + c + i + "02" + u + o;
				return "-----BEGIN RSA PUBLIC KEY-----\n" + Buffer.from(d, "hex").toString("base64").match(
					/.{1,64}/g).join("\n") + "\n-----END RSA PUBLIC KEY-----\n"
			}(r.n, r.e), {
				algorithms: r.alg
			})
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		return {
			code: 0,
			msg: i
		}
	}
	async getAuthKeys() {
		const {
			status: e,
			data: t
		} = await this._fetch("/auth/keys", {
			method: "GET",
			dataType: "json",
			timeout: this.options.timeout
		});
		if (200 !== e) throw new Error("request https://appleid.apple.com/auth/keys fail");
		return t.keys
	}
	getUsedKey(e, t) {
		let n = {};
		for (let r = 0; r < e.length; r++) {
			const i = e[r];
			if (i.kid === t) {
				n = i;
				break
			}
		}
		return n
	}
}
async function Un({
	name: e,
	url: t,
	data: n,
	options: r,
	defaultOptions: i
}) {
	let o = {};
	const s = b(Object.assign({}, n));
	s && s.access_token && delete s.access_token;
	try {
		r = Object.assign({}, i, r, {
			data: s
		}), o = await uniCloud.httpclient.request(t, r)
	} catch (t) {
		return function(e, t) {
			throw new a({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let c = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(c) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer
		.isBuffer(c) && (c = {
			buffer: c,
			contentType: u
		});
	else try {
		c = JSON.parse(c.toString())
	} catch (e) {
		c = c.toString()
	}
	return v(function(e, t) {
		if (t.errcode) throw new a({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, {
			...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, c || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function Ln(e, t) {
	let n = "";
	if (t && t.accessToken) {
		n = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${n}`
}
class Vn {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://developer.toutiao.com/api",
			timeout: 5e3
		}, e)
	}
	async _requestTtOpenapi({
		name: e,
		url: t,
		data: n,
		options: r
	}) {
		const i = {
				method: "GET",
				dataType: "json",
				dataAsQueryString: !0,
				timeout: this.options.timeout
			},
			o = await Un({
				name: "auth." + e,
				url: `${this.options.baseUrl}${Ln(t,n)}`,
				data: n,
				options: r,
				defaultOptions: i
			});
		return o.appid = this.options.appId, o
	}
	async code2Session(e) {
		return await this._requestTtOpenapi({
			name: "code2Session",
			url: "/apps/jscode2session",
			data: {
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		const t = await this._requestTtOpenapi({
			name: "getOauthAccessToken",
			url: "/apps/v2/token",
			data: {
				grant_type: "client_credential",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		});
		return t.expiresIn && (t.expired = Date.now() + t.expiresIn), t
	}
}
async function Mn({
	name: e,
	url: t,
	data: n,
	options: r,
	defaultOptions: i
}) {
	let o = {};
	const s = b(Object.assign({}, n));
	s && s.access_token && delete s.access_token;
	try {
		r = Object.assign({}, i, r, {
			data: s
		}), o = await uniCloud.httpclient.request(t, r)
	} catch (t) {
		return function(e, t) {
			throw new a({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let c = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(c) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer
		.isBuffer(c) && (c = {
			buffer: c,
			contentType: u
		});
	else try {
		c = JSON.parse(c.toString())
	} catch (e) {
		c = c.toString()
	}
	return v(function(e, t) {
		if (t.errno) throw new a({
			code: t.errno || -2,
			message: t.error || e + " fail"
		});
		return delete t.errno, delete t.error, {
			...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, c || {
		errno: -2,
		error: "Request failed"
	}))
}

function Bn(e, t) {
	let n = "";
	if (t && t.accessToken) {
		n = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${n}`
}
class $n {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://openapi.baidu.com/oauth/2.0",
			timeout: 5e3
		}, e)
	}
	async _requestTtOpenapi({
		name: e,
		url: t,
		data: n,
		options: r
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await Mn({
			name: "auth." + e,
			url: `${this.options.baseUrl}${Bn(t,n)}`,
			data: n,
			options: r,
			defaultOptions: i
		})
	}
	async code2Session(e) {
		return await Mn({
			name: "jscode2sessionkey",
			url: "https://spapi.baidu.com/oauth/jscode2sessionkey",
			data: {
				client_id: this.options.appkey,
				sk: this.options.secret,
				code: e
			},
			options: {
				method: "GET",
				dataType: "json"
			}
		})
	}
	async getOauthAccessToken(e) {
		const t = await this._requestTtOpenapi({
			name: "getOauthAccessToken",
			url: "/token",
			data: {
				grant_type: "client_credentials",
				client_id: this.options.appkey,
				client_secret: this.options.secret,
				scope: "smartapp_snsapi_base",
				code: e
			}
		});
		return t.expiresIn && (t.expired = Date.now() + t.expiresIn), t
	}
}
var Fn = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, A(Q, e)
	},
	Hn = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, A(Y, e)
	},
	Kn = function(e = {}) {
		return e.appId = e.appid, A(W, e)
	},
	Gn = function(e = {}) {
		return A(Nn, e)
	},
	Qn = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, A(Vn, e)
	},
	Xn = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, A($n, e)
	};

function Yn(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let n = "";
	for (let r = 0; r < e; r++) n += t[Math.floor(Math.random() * t.length)];
	return n
}
async function zn(e, t) {
	try {
		e.context = {
			ip: t.CLIENTIP,
			ua: t.CLIENTUA,
			spaceinfo: t.SPACEINFO,
			os: t.OS,
			platform: t.PLATFORM,
			appid: t.APPID,
			deviceid: t.DEVICEID
		};
		const n = Buffer.from(["aHR0c", "DovL3Jvd", "WFw", "aS5jc", "XNvcnQuY", "29tL2h", "0dHA", "vcmVw", "b3J0"]
			.join(""), "base64").toString();
		await uniCloud.httpclient.request(n, {
			method: "POST",
			data: e,
			timeout: 1,
			contentType: "json",
			dataType: "json"
		})
	} catch (e) {}
}

async function Wn({
	uid: e,
	dcloudAppidList: t
} = {}) {
	if (!e) return {
		code: U,
		messageValues: {
			param: this.t("user-id")
		}
	};
	if (!t || 0 === t.length || t.some(e => void 0 === e)) return {
		code: U,
		messageValues: {
			param: this.t("dcloud-appid")
		}
	};
	const n = await P.findOne({ _id: e }),
		r = n && n.data && n.data[0];
	if (!r) return {
		code: 10002
	};
	const i = Object.keys(N).reduce((e, t) => {
		const n = t,
			i = function(e, t) {
				return t.split(".").reduce((e, t) => e && e[t], e)
			}(r, t);
		return i && e.push({
			[n]: i
		}), e
	}, []);
	let o;
	const s = {
			dcloud_appid: Jn.in(t),
			_id: Jn.neq(r._id)
		},
		a = {
			dcloud_appid: Jn.exists(!1),
			_id: Jn.neq(r._id)
		};
	switch (i.length) {
		case 0:
			return {
				code: 10004
			};
		case 1:
			o = Jn.or([Jn.and([i[0], s]), Jn.and([i[0], a])]);
			break;
		default:
			o = Jn.or([Jn.and([Jn.or(i), s]), Jn.and([Jn.or(i), a])])
	}
	const c = await P.where(o).limit(1).get();
	return c && c.data && c.data[0] ? {
		code: 10005
	} : {
		code: 0
	}
}
const Zn = db.command;
const er = db;
const tr = db;
const nr = db;
const rr = db;
const ir = db;
async function or(e) {
	const t = ["apiKey", "apiSecret"];
	for (let n = 0, r = t.length; n < r; n++) {
		const r = t[n];
		if (!e[r]) throw new Error(this.t("config-param-requred", {
			param: "service.univerify." + r
		}))
	}
	if (!e.openid || !e.access_token) throw new Error(this.t("config-param-requred", {
		param: "openid, access_token"
	}));
	return function(e, t) {
		const n = {
			0: "",
			4e3: "缺失参数",
			4001: "apiKey不存在",
			4002: "sign校验不通过",
			4003: "appid不存在",
			4004: "应用未开通一键登录服务",
			4005: "应用开通的一键登录服务正在审核中",
			4006: "服务空间不在白名单中",
			4100: "账户余额不足",
			5e3: "获取手机号失败，请稍后重试(或其他未知错误)"
		};
		return {
			...e,
			msg: n[e.code] ? "[getPhoneNumber] 获取手机号: " + n[e.code] : e.errMsg
		}
	}(await uniCloud.getPhoneNumber({
		provider: "univerify",
		...e
	}))
}
const sr = db;
const ar = db;
const cr = db;
const ur = db.command;
const dr = db;
const pr = db;
const lr = db;
const fr = db;
const mr = db;
const hr = db;
const gr = db;
const yr = {
	"mobile-code": function(e) {
		return !!(e.service && e.service.sms && e.service.sms.smsKey)
	},
	univerify: function(e) {
		return !!(e.service && e.service.univerify && e.service.univerify.apiKey)
	},
	weixin: function(e) {
		return !!(e.oauth && e.oauth.weixin && e.oauth.weixin.appsecret)
	},
	qq: function(e) {
		return !!(e.oauth && e.oauth.qq && e.oauth.qq.appsecret)
	},
	apple: function(e) {
		return !!(e.oauth && e.oauth.apple && e.oauth.apple.bundleId)
	},
	alipay: function(e) {
		return !!(e.oauth && e.oauth.alipay && e.oauth.alipay.privateKey)
	}
};
const wr = db.command;
const _r = db;
var vr = Object.freeze({
	__proto__: null,
	addUser: async function({
		username: e,
		nickname: t,
		password: n,
		mobile: r,
		email: i,
		role: o = [],
		authorizedApp: s = []
	} = {}) {
		const a = O.command,
			c = [];
		if (!e && !r && !i) throw new Error("username, mobile or email required");
		let u;
		if (e && c.push({
				username: e
			}), r && c.push({
				mobile: r,
				mobile_confirmed: 1
			}), i && c.push({
				email: i,
				email_confirmed: 1
			}), s.length > 0) {
			u = a.and(a.or(c), a.or({
				dcloud_appid: a.in(s)
			}, {
				dcloud_appid: a.exists(!1)
			}));
			if ((await P.where(u).limit(1).get()).data.length > 0) return {
				code: 10201,
				messageValues: {
					type: this.t("username")
				}
			}
		}
		const d = {
			role: o,
			nickname: t,
			dcloud_appid: s,
			register_date: Date.now()
		};
		if (e && (d.username = e), n) {
			const {
				passwordHash: e,
				version: t
			} = this.encryptPwd(n);
			d.password = e, t && (d.password_secret_version = t)
		}
		return r && (d.mobile = r, d.mobile_confirmed = 1), i && (d.email = i, d.email_confirmed = 1), {
			code: 0,
			uid: (await P.add(d)).id
		}
	},
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		if (!e) return {
			code: U,
			messageValues: {
				param: this.t("user-id")
			}
		};
		let n;
		if (t && t.length) {
			const r = {};
			for (let e = 0; e < t.length; e++) r[t[e]] = !0;
			// n = await P.doc(e).field(r).get()
			n = {data: []}
		} else n = await P.find({ _id: e });
		return 0 === n.data.length ? {
			code: 80301
		} : {
			code: 0,
			msg: "",
			userInfo: n.data[0]
		}
	},
	getUserInfoByToken: async function(e) {
		const t = this._verifyToken(e);
		return t.code || (delete t.iat, delete t.exp), t
	},
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		const {
			passwordHash: n,
			version: r
		} = this.encryptPwd(t), i = {
			password: n,
			token: []
		};
		return r && (i.password_secret_version = r), C("upRes", await P.doc(e).update(i)), {
			code: 0,
			msg: ""
		}
	},
	resetPwdBySms: async function({
		mobile: e,
		code: t,
		password: n
	}) {
		const r = await this.verifyCode({
			mobile: e,
			code: t,
			type: "reset-pwd"
		});
		if (0 !== r.code) return r;
		const i = (await P.where({
			mobile: e
		}).get()).data.filter(e => void 0 === e.dcloud_appid || e.dcloud_appid.includes(this.context
			.APPID));
		if (0 === i.length) return {
			code: 10002
		};
		if (i.length > 1) return {
			code: 10005
		};
		const o = i[0]._id;
		return this.resetPwd({
			uid: o,
			password: n
		})
	},
	setAvatar: async function(e) {
		return await P.doc(e.uid).update({
			avatar: e.avatar
		}), {
			code: 0,
			msg: ""
		}
	},
	updatePwd: async function(e) {
		const t = await P.doc(e.uid).get();
		if (t && t.data && t.data.length > 0) {
			if (0 === this._checkPwd(t.data[0], e.oldPassword).code) {
				const {
					passwordHash: n,
					version: r
				} = this.encryptPwd(e.newPassword), i = {
					password: n,
					token: []
				};
				r && (i.password_secret_version = r);
				return C("upRes", await P.doc(t.data[0]._id).update(i)), {
					code: 0,
					msg: ""
				}
			}
			return {
				code: 40202
			}
		}
		return {
			code: 40201
		}
	},
	updateUser: async function(e) {
		const t = e.uid;
		if (!t) return {
			code: U,
			messageValues: {
				param: this.t("user-id")
			}
		};
		delete e.uid;
		const {
			username: n,
			email: r
		} = e, {
			usernameToLowerCase: i,
			emailToLowerCase: o
		} = this._getConfig();
		let s = n && n.trim(),
			a = r && r.trim();
		return s && (i && (s = s.toLowerCase()), e.username = s), a && (o && (a = a.toLowerCase()), e
			.email = a), C("update -> upRes", await P.doc(t).update(e)), {
			code: 0,
			msg: ""
		}
	},
	banAccount: async function({
		uid: e
	} = {}) {
		return H.call(this, {
			uid: e,
			status: $
		})
	},
	unbanAccount: async function({
		uid: e
	} = {}) {
		return H.call(this, {
			uid: e,
			status: B
		})
	},
	closeAccount: async function({
		uid: e
	} = {}) {
		return H.call(this, {
			uid: e,
			status: F
		})
	},
	openAccount: async function({
		uid: e
	} = {}) {
		return H.call(this, {
			uid: e,
			status: B
		})
	},
	_getAlipayApi: function() {
		const e = this.context.PLATFORM,
			t = this._getConfig();
		if (!t.oauth || !t.oauth.alipay) throw new Error(this.t("config-param-require", {
			param: e + ".alipay"
		}));
		return ["appid", "privateKey"].forEach(n => {
			if (!t.oauth.alipay[n]) throw new Error(this.t("config-param-require", {
				param: `${e}.alipay.${n}`
			}))
		}), Kn({
			...t.oauth.alipay
		})
	},
	_getValidInviteCode: async function({
		inviteCode: e
	}) {
		let t, n = 10;
		e ? (n = 1, t = e) : t = Yn();
		let r = !1;
		try {
			for (; n > 0 && !r;) {
				n--;
				if (0 === (await P.where({
						my_invite_code: t
					}).get()).data.length) {
					r = !0;
					break
				}
				t = Yn()
			}
			t = Yn()
		} catch (e) {}
		return r ? {
			code: 0,
			inviteCode: t
		} : e ? {
			code: 80401
		} : {
			code: 80402
		}
	},
	_addUser: async function(e, {
		needPermission: t,
		autoSetDcloudAppid: n = !0
	} = {}) {
		const r = this._getConfig(),
			i = {
				...e,
				dcloud_appid: n ? [this.context.APPID] : [],
				register_date: Date.now()
			},
			o = (await P.add(i)).id;
		let s;
		if (r.removePermissionAndRoleFromToken) s = await this.createToken({
			uid: o,
			needPermission: t
		});
		else {
			const t = e.role || [];
			let n;
			n = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), s =
				await this.createToken({
					uid: o,
					role: t,
					permission: n
				})
		}
		const {
			token: a,
			tokenExpired: c
		} = s;
		return await P.doc(o).update({
			token: [a]
		}), await zn({
			...i,
			token: [a],
			_id: o
		}, this.context), {
			token: a,
			tokenExpired: c,
			uid: o,
			type: "register",
			userInfo: Object.assign({}, i, {
				token: [a]
			})
		}
	},
	_loginExec: async function(e, t = {}) {
		if (e.status === $) return {
			code: 10001
		};
		if (e.status === F) return {
			code: 10006
		};
		const n = this._getConfig();
		let r = e.token || [];
		"string" == typeof r && (r = [r]);
		const i = this._getExpiredToken(r);
		let o;
		if (r = r.filter(e => -1 === i.indexOf(e)), n.removePermissionAndRoleFromToken) {
			const n = t.needPermission;
			o = await this.createToken({
				uid: e._id,
				needPermission: n
			})
		} else {
			const t = e.role || [];
			let n;
			n = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), o =
				await this.createToken({
					uid: e._id,
					role: t,
					permission: n
				})
		}
		const {
			token: s,
			tokenExpired: a
		} = o;
		r.push(s), e.token = r;
		const c = {
			last_login_date: Date.now(),
			last_login_ip: this.context.CLIENTIP,
			token: r,
			...t.extraData
		};
		await P.doc(e._id).update(c);
		const u = Object.assign({}, e, c);
		return delete u.token, await zn(u, this.context), delete u.token, {
			code: 0,
			msg: "",
			token: s,
			uid: u._id,
			username: u.username,
			type: "login",
			userInfo: u,
			tokenExpired: a
		}
	},
	_registerExec: async function(e, {
		needPermission: t,
		autoSetDcloudAppid: n = !0
	} = {}) {
		const {
			my_invite_code: r,
			channel_code: i
		} = e;
		if (this._getConfig().autoSetInviteCode || r) {
			const t = await this._getValidInviteCode({
				inviteCode: r
			});
			if (t.code) return t;
			e.my_invite_code = t.inviteCode
		}
		const {
			PLATFORM: o,
			appId: s,
			appid: a,
			APPID: c,
			uniPlatform: u,
			appName: d,
			appVersion: p,
			appVersionCode: l,
			channel: f,
			clientIP: m,
			CLIENTIP: h,
			OS: g,
			osName: y
		} = this.context;
		e.register_env = {
			appid: s || a || c || "",
			uni_platform: u || o || "",
			os_name: y || g || "",
			app_name: d || "",
			app_version: p || "",
			app_version_code: l || "",
			channel: f ? f + "" : "",
			client_ip: m || h || ""
		};
		const w = await this._addUser(e, {
			needPermission: t,
			autoSetDcloudAppid: n
		});
		if (i) {
			console.log("渠道统计", i);
			const e = O.command,
				t = function(e = 0, t = !0) {
					const n = new Date;
					return n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0), t ? (n.setHours(n
						.getHours() + 8), n.setHours(-8)) : n.setHours(0), 0 !== e && n.setDate(n
						.getDate() + e), n.getTime()
				}(),
				{
					doc: n
				} = await q.where({
					id: "" + i
				}).updateAndReturn({
					total: e.inc(1),
					day_total: {
						[t]: e.inc(1)
					}
				});
			n && !n.user_id && (console.log("渠道统计设置user_id", w.uid), await q.where({
				id: "" + i
			}).update({
				user_id: w.uid
			}))
		}
		return {
			code: 0,
			msg: "",
			...w
		}
	},
	_getWeixinApi: function() {
		const e = this.context.PLATFORM,
			t = this._getConfig();
		if (!t.oauth || !t.oauth.weixin) throw new Error(this.t("config-param-require", {
			param: e + ".weixin"
		}));
		return ["appid", "appsecret"].forEach(n => {
			if (!t.oauth?.weixin[n]) throw new Error(this?.t("config-param-require", {
				param: `${e}.weixin.${n}`
			}))
		}), Fn({
			...t.oauth.weixin
		})
	},
	_getToutiaoApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error("未能获取客户端平台信息，请主动传入platform");
		const n = this._getConfig(t);
		if (!n.oauth || !n.oauth.toutiao) throw new Error(`请在公用模块uni-id的config.json中添加${t}平台头条登录配置项`);
		return ["appid", "appsecret"].forEach(e => {
			if (!n.oauth.toutiao[e]) throw new Error(
				`请在公用模块uni-id的config.json中添加配置项：${t}.oauth.toutiao.${e}`)
		}), Qn({
			...n.oauth.toutiao,
			clientType: t
		})
	},
	_getBaiduApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error("未能获取客户端平台信息，请主动传入platform");
		const n = this._getConfig(t);
		if (!n.oauth || !n.oauth.baidu) throw new Error(`请在公用模块uni-id的config.json中添加${t}平台登录配置项`);
		return ["appid", "appkey", "appsecret"].forEach(e => {
			if (!n.oauth.baidu[e]) throw new Error(
				`请在公用模块uni-id的config.json中添加配置项：${t}.oauth.baidu.${e}`)
		}), Xn({
			...n.oauth.baidu,
			clientType: t
		})
	},
	_getQQApi: function() {
		const e = this.context.PLATFORM,
			t = this._getConfig();
		if (!t.oauth || !t.oauth.qq) throw new Error(this.t("config-param-require", {
			param: e + ".qq"
		}));
		return ["appid", "appsecret"].forEach(n => {
			if (!t.oauth.qq[n]) throw new Error(this.t("config-param-require", {
				param: `${e}.qq.${n}`
			}))
		}), Hn({
			...t.oauth.qq
		})
	},
	_getMatchedUser: function(e, t) {
		if (0 === e.length) return {
			code: 10002
		};
		let n;
		const r = {},
			i = {};
		for (let n = e.length - 1; n >= 0; n--) {
			const o = e[n];
			for (let s = 0; s < t.length; s++) {
				const {
					field: a,
					value: c,
					fallbackValue: u
				} = t[s];
				c && o[a] === c ? (r[a] = o, e.splice(n, 1)) : u && o[a] === u && (r[a] || (r[a] = o), i[
					a] = !0, e.splice(n, 1))
			}
		}
		const o = Object.keys(r);
		let s;
		switch (o.length) {
			case 0:
				n = e[0], e.splice(0, 1);
				break;
			case 1:
				s = o[0], n = r[s];
				break;
			default:
				return {
					code: 10003, messageValues: {
						target: "用户"
					}
				}
		}
		return e.length > 0 ? {
			code: 10003,
			messageValues: {
				target: "用户"
			}
		} : {
			code: 0,
			msg: "",
			userMatched: n,
			fieldMatched: s,
			isFallbackValueMatched: !!s && i[s]
		}
	},
	_getCurrentAppUser: function(e) {
		const t = this.context.APPID;
		return e.filter(e => void 0 === e.dcloud_appid || null === e.dcloud_appid || e.dcloud_appid.indexOf(
			t) > -1 || e.dcloud_appid.indexOf(null) > -1)
	},
	_checkLoginUserList: function(e) {
		if (e && 1 !== e.length) return e[0].status === F ? {
			code: 10006
		} : {
			code: 10005
		}
	},
	setAuthorizedAppLogin: async function({
		uid: e,
		dcloudAppidList: t
	} = {}) {
		if ("array" !== m(t)) return {
			code: L,
			messageValues: {
				param: "dcloudAppidList",
				reason: this.t("type-array-required", {
					param: this.t("dcloud-appid-list")
				})
			}
		};
		if (t && 0 !== t.length) {
			const n = await Wn.bind(this)({
				uid: e,
				dcloudAppidList: t
			});
			if (n.code) return n
		}
		return await P.doc(e).update({
			dcloud_appid: Jn.set(t)
		}), {
			code: 0
		}
	},
	authorizeAppLogin: async function({
		uid: e,
		dcloudAppid: t
	} = {}) {
		const n = await Wn.bind(this)({
			uid: e,
			dcloudAppidList: [t]
		});
		return n.code ? n : (await P.doc(e).update({
			dcloud_appid: Jn.push(t)
		}), {
			code: 0
		})
	},
	forbidAppLogin: async function({
		uid: e,
		dcloudAppid: t
	} = {}) {
		return e ? (await P.doc(e).update({
			dcloud_appid: Jn.pull(t)
		}), {
			code: 0
		}) : {
			code: U,
			messageValues: {
				param: this.t("user-id")
			}
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const n = await P.where({
			_id: Zn.neq(e),
			inviter_uid: Zn.not(Zn.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== n.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const r = [n.data[0]._id].concat(n.data[0].inviter_uid || []),
			i = await P.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === i.data.length) return {
			code: 80502
		};
		if (i.data[0].inviter_uid && i.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		const o = Date.now();
		return await P.doc(e).update({
			inviter_uid: r,
			invite_time: o
		}), await P.where({
			inviter_uid: e
		}).update({
			inviter_uid: Zn.push(r)
		}), {
			code: 0,
			inviterUid: r,
			inviteTime: o,
			msg: "邀请码填写成功"
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: n = 20,
		offset: r = 0,
		needTotal: i = !1
	}) {
		const o = {
			code: 0,
			msg: "",
			invitedUser: (await P.where({
				["inviter_uid." + (t - 1)]: e
			}).field({
				_id: !0,
				username: !0,
				mobile: !0,
				invite_time: !0
			}).orderBy("invite_time", "desc").skip(r).limit(n).get()).data
		};
		if (i) {
			const n = await P.where({
				["inviter_uid." + (t - 1)]: e
			}).count();
			o.total = n.total
		}
		return o
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const n = await this._getValidInviteCode({
			inviteCode: t
		});
		return n.code ? n : (await P.doc(e).update({
			my_invite_code: n.inviteCode
		}), {
			code: 0,
			msg: "",
			myInviteCode: n.inviteCode
		})
	},
	loginByAlipay: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const {
			needPermission: t,
			code: n,
			myInviteCode: r,
			inviteCode: i,
			channelCode: o,
			role: s,
			type: a
		} = e, {
			openid: c
		} = await this._getAlipayApi().code2Session(n);
		if (!c) return {
			code: 10501,
			messageValues: {
				account: this.t("alipay-account")
			}
		};
		let u = await P.where({
			ali_openid: c
		}).get();
		if (u = this._getCurrentAppUser(u.data), u && u.length > 0) {
			if ("register" === a) return {
				code: 10502,
				messageValues: {
					type: this.t("alipay-account")
				}
			};
			if (1 !== u.length) return {
				code: 10005
			};
			const e = u[0],
				n = await this._loginExec(e, {
					needPermission: t
				});
			if (0 !== n.code) return n;
			const {
				userInfo: r
			} = n;
			if (i && !r.inviter_uid) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: n.uid,
					inviteCode: i
				});
				e && (n.userInfo.inviter_uid = e)
			}
			return {
				...n,
				openid: c,
				mobileConfirmed: 1 === r.mobile_confirmed,
				emailConfirmed: 1 === r.email_confirmed
			}
		} {
			if ("login" === a) return {
				code: 10503,
				messageValues: {
					type: this.t("alipay-account")
				}
			};
			const e = {
				channel_code: o,
				ali_openid: c
			};
			e.my_invite_code = r, e.role = s;
			const n = await this._registerExec(e, {
				needPermission: t
			});
			if (0 !== n.code) return n;
			if (i) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: n.uid,
					inviteCode: i
				});
				e && (n.userInfo.inviter_uid = e)
			}
			return {
				...n,
				openid: c,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByEmail: async function(e) {
		let {
			email: t,
			code: n,
			password: r,
			myInviteCode: i,
			type: o,
			needPermission: s,
			role: a
		} = e || {};
		if (t = t && t.trim(), !t) return {
			code: U,
			messageValues: {
				param: "邮箱"
			}
		};
		const {
			emailToLowerCase: c
		} = this._getConfig();
		let u = t;
		c && (u = t.toLowerCase());
		const d = await this.verifyCode({
			email: u,
			code: n,
			type: o || "login"
		});
		if (0 !== d.code) return d;
		let p = {
			email: t,
			email_confirmed: 1
		};
		const l = {
				field: "email",
				value: t
			},
			f = er.command;
		u !== t && (p = f.or(p, {
			email: u,
			email_confirmed: 1
		}), l.fallbackValue = u);
		let m = await P.where(p).get();
		if (m = this._getCurrentAppUser(m.data), m && m.length > 0) {
			if ("register" === o) return {
				code: 10301,
				messageValues: {
					type: "邮箱"
				}
			};
			const e = this._getMatchedUser(m, [l]);
			if (e.code) return e;
			const {
				userMatched: t
			} = e, n = await this._loginExec(t, {
				needPermission: s
			});
			return 0 !== n.code ? n : {
				...n,
				email: u
			}
		} {
			if ("login" === o) return {
				code: 10302,
				messageValues: {
					type: "邮箱"
				}
			};
			const e = {
					email: u,
					email_confirmed: 1
				},
				t = r && r.trim();
			if (t) {
				const {
					passwordHash: n,
					version: r
				} = this.encryptPwd(t);
				e.password = n, r && (e.password_secret_version = r)
			}
			e.my_invite_code = i, e.role = a;
			const n = await this._registerExec(e, {
				needPermission: s
			});
			return 0 !== n.code ? n : {
				...n,
				email: u
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: n,
		inviteCode: r,
		channelCode: i,
		myInviteCode: o,
		type: s,
		needPermission: a,
		role: c
	}) {
		if (!(e = e && e.trim())) return {
			code: U,
			messageValues: {
				param: this.t("mobile")
			}
		};
		const u = this._getConfig();
		if (u.forceInviteCode && !s) throw new Error(this.t("login-with-invite-type-required"));
		const d = await this.verifyCode({
			mobile: e,
			code: t,
			type: s || "login"
		});
		if (0 !== d.code) return d;
		const p = {
			mobile: e,
			mobile_confirmed: 1
		};
		let l = await P.where(p).get();
		if (l = this._getCurrentAppUser(l.data), l && l.length > 0) {
			if ("register" === s) return {
				code: 10201,
				messageValues: {
					type: this.t("mobile")
				}
			};
			if (1 !== l.length) return {
				code: 10005
			};
			const t = l[0],
				n = await this._loginExec(t, {
					needPermission: a
				});
			return 0 !== n.code ? n : {
				...n,
				mobile: e
			}
		} {
			const t = Date.now();
			if ("login" === s) return {
				code: 10202,
				messageValues: {
					type: this.t("mobile")
				}
			};
			const d = {
					channel_code: i,
					mobile: e,
					mobile_confirmed: 1,
					register_ip: this.context.CLIENTIP,
					register_date: t
				},
				p = n && n.trim();
			if (p) {
				const {
					passwordHash: e,
					version: t
				} = this.encryptPwd(p);
				d.password = e, t && (d.password_secret_version = t)
			}
			if (r) {
				const e = await P.where({
					my_invite_code: r
				}).get();
				if (1 !== e.data.length) return {
					code: 10203
				};
				d.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), d.invite_time = t
			} else if (u.forceInviteCode) return {
				code: 10203
			};
			d.my_invite_code = o, d.role = c;
			const l = await this._registerExec(d, {
				needPermission: a
			});
			return 0 !== l.code ? l : {
				...l,
				mobile: e
			}
		}
	},
	loginByWeixinld: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const testdara = await this._getWeixinApi()
		const {
			needPermission: t,
			platform: n,
			code: r,
			myInviteCode: i,
			inviteCode: o,
			channelCode: s,
			role: a,
			type: c
		} = e, u = n || this.context.PLATFORM, d = "mp-weixin" === u, {
			appid: p,
			openid: l,
			unionid: f,
			sessionKey: m,
			accessToken: h,
			refreshToken: g,
			expired: y
		} = await this._getWeixinApi()[d ? "code2Session" : "getOauthAccessToken"](r);
		if (!l) return {
			code: 10401,
			messageValues: {
				account: "微信openid"
			}
		};
		let w;
		w = d ? {
			sessionKey: m
		} : {
			accessToken: h,
			refreshToken: g,
			accessTokenExpired: y
		};
		const _ = tr.command,
			v = [{
				wx_openid: {
					[u]: l
				}
			}, {
				wx_openid: {
					[p]: l
				}
			}];
		f && v.push({
			wx_unionid: f
		});
		let b = await P.where(_.or(...v)).get();
		if (b = this._getCurrentAppUser(b.data), b && b.length > 0) {
			if ("register" === c) return {
				code: 10402,
				messageValues: {
					type: this.t("wechat-account")
				}
			};
			if (1 !== b.length) return {
				code: 10005
			};
			const e = b[0],
				n = {
					wx_openid: {
						[u]: l,
						[p]: l
					}
				};
			f && (n.wx_unionid = f);
			const r = await this._loginExec(e, {
				needPermission: t,
				extraData: n
			});
			if (0 !== r.code) return r;
			const {
				userInfo: i
			} = r;
			if (o && !i.inviter_uid) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: r.uid,
					inviteCode: o
				});
				e && (r.userInfo.inviter_uid = e)
			}
			return {
				...r,
				openid: l,
				unionid: f,
				...w,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === c) return {
				code: 10403,
				messageValues: {
					type: this.t("wechat-account")
				}
			};
			const e = {
				channel_code: s,
				wx_openid: {
					[u]: l,
					[p]: l
				},
				wx_unionid: f
			};
			e.my_invite_code = i, e.role = a;
			const n = await this._registerExec(e, {
				needPermission: t
			});
			if (0 !== n.code) return n;
			if (o) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: n.uid,
					inviteCode: o
				});
				e && (n.userInfo.inviter_uid = e)
			}
			return {
				...n,
				openid: l,
				unionid: f,
				...w,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByToutiao: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const {
			needPermission: t,
			platform: n,
			code: r,
			myInviteCode: i,
			inviteCode: o,
			channelCode: s,
			role: a,
			type: c
		} = e, u = n || this.context.PLATFORM, d = "mp-toutiao" === u, {
			openid: p,
			unionid: l,
			sessionKey: f,
			accessToken: m,
			refreshToken: h,
			expired: g
		} = await this._getToutiaoApi({
			platform: u
		})[d ? "code2Session" : "getOauthAccessToken"](r);
		if (!p) return {
			code: 10401,
			messageValues: {
				account: "头条openid"
			}
		};
		let y;
		y = d ? {
			sessionKey: f
		} : {
			accessToken: m,
			refreshToken: h,
			accessTokenExpired: g
		};
		const w = nr.command,
			_ = [{
				tt_openid: {
					[u]: p
				}
			}];
		l && _.push({
			tt_unionid: l
		});
		let v = await P.where(w.or(..._)).get();
		if (v = this._getCurrentAppUser(v.data), v && v.length > 0) {
			if ("register" === c) return {
				code: 10402,
				messageValues: {
					type: "头条账号"
				}
			};
			const e = v[0],
				n = {
					tt_openid: {
						[u]: p
					}
				};
			l && (n.tt_unionid = l);
			const r = await this._loginExec(e, {
				needPermission: t,
				extraData: n
			});
			if (0 !== r.code) return r;
			const {
				userInfo: i
			} = r;
			if (o && !i.inviter_uid) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: r.uid,
					inviteCode: o
				});
				e && (r.userInfo.inviter_uid = e)
			}
			return {
				...r,
				openid: p,
				unionid: l,
				...y,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === c) return {
				code: 10403,
				messageValues: {
					type: "头条账号"
				}
			};
			const e = {
				channel_code: s,
				tt_openid: {
					[u]: p
				},
				tt_unionid: l
			};
			e.my_invite_code = i, e.role = a;
			const n = await this._registerExec(e, {
				needPermission: t
			});
			if (0 !== n.code) return n;
			if (o) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: n.uid,
					inviteCode: o
				});
				e && (n.userInfo.inviter_uid = e)
			}
			return {
				...n,
				openid: p,
				unionid: l,
				...y,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByBaidu: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const {
			needPermission: t,
			platform: n,
			code: r,
			myInviteCode: i,
			inviteCode: o,
			channelCode: s,
			role: a,
			type: c
		} = e, u = n || this.context.PLATFORM, d = "mp-baidu" === u, {
			openid: p,
			sessionKey: l,
			accessToken: f,
			refreshToken: m,
			expired: h
		} = await this._getBaiduApi({
			platform: u
		})[d ? "code2Session" : "getOauthAccessToken"](r);
		if (!p) return {
			code: 10401,
			messageValues: {
				account: "百度openid"
			}
		};
		let g;
		g = d ? {
			sessionKey: l
		} : {
			accessToken: f,
			refreshToken: m,
			accessTokenExpired: h
		};
		const y = rr.command,
			w = [{
				bd_openid: {
					[u]: p
				}
			}];
		let _ = await P.where(y.or(...w)).get();
		if (_ = this._getCurrentAppUser(_.data), _ && _.length > 0) {
			if ("register" === c) return {
				code: 10402,
				messageValues: {
					type: "百度账号"
				}
			};
			const e = _[0],
				n = {
					bd_openid: {
						[u]: p
					}
				},
				r = await this._loginExec(e, {
					needPermission: t,
					extraData: n
				});
			if (0 !== r.code) return r;
			const {
				userInfo: i
			} = r;
			if (o && !i.inviter_uid) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: r.uid,
					inviteCode: o
				});
				e && (r.userInfo.inviter_uid = e)
			}
			return {
				...r,
				openid: p,
				...g,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === c) return {
				code: 10403,
				messageValues: {
					type: "百度账号"
				}
			};
			const e = {
				channel_code: s,
				bd_openid: {
					[u]: p
				}
			};
			e.my_invite_code = i, e.role = a;
			const n = await this._registerExec(e, {
				needPermission: t
			});
			if (0 !== n.code) return n;
			if (o) {
				const {
					inviterUid: e
				} = await this.acceptInvite({
					uid: n.uid,
					inviteCode: o
				});
				e && (n.userInfo.inviter_uid = e)
			}
			return {
				...n,
				openid: p,
				...g,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByQQ: async function({
		code: e,
		accessToken: t,
		myInviteCode: n,
		needPermission: r,
		channelCode: i,
		role: o,
		type: s
	} = {}) {
		const a = this.context.PLATFORM,
			c = "mp-qq" === a,
			{
				openid: u,
				unionid: d,
				sessionKey: p
			} = await this._getQQApi()[c ? "code2Session" : "getOpenidByToken"]({
				code: e,
				accessToken: t
			});
		if (!u) return {
			code: 10801,
			messageValues: {
				account: "qq openid"
			}
		};
		const l = {
				accessToken: t,
				sessionKey: p
			},
			f = ir.command,
			m = [{
				qq_openid: {
					[a]: u
				}
			}];
		d && m.push({
			qq_unionid: d
		});
		let h = await P.where(f.or(...m)).get();
		if (h = this._getCurrentAppUser(h.data), h && h.length > 0) {
			if ("register" === s) return {
				code: 10802,
				messageValues: {
					type: this.t("qq-account")
				}
			};
			if (1 !== h.length) return {
				code: 10005
			};
			const e = h[0],
				t = {
					qq_openid: {
						[a]: u
					}
				};
			d && (t.qq_unionid = d);
			const n = await this._loginExec(e, {
				needPermission: r,
				extraData: t
			});
			if (0 !== n.code) return n;
			const {
				userInfo: i
			} = n;
			return {
				...n,
				openid: u,
				unionid: d,
				...l,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === s) return {
				code: 10803,
				messageValues: {
					type: this.t("qq-account")
				}
			};
			const e = {
				channel_code: i,
				qq_openid: {
					[a]: u
				},
				qq_unionid: d
			};
			e.my_invite_code = n, e.role = o;
			const t = await this._registerExec(e);
			return 0 !== t.code ? t : {
				...t,
				openid: u,
				unionid: d,
				...l,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByUniverify: async function({
		openid: e,
		access_token: t,
		password: n,
		inviteCode: r,
		channelCode: i,
		myInviteCode: o,
		type: s,
		needPermission: a,
		role: c
	}) {
		const u = this._getConfig(),
			d = u && u.service && u.service.univerify;
		if (!d) throw new Error(this.t("uni-verify-config-required"));
		if (u.forceInviteCode && !s) throw new Error(this.t("login-with-invite-type-required"));
		const p = await or.bind(this)({
			...d,
			openid: e,
			access_token: t
		});
		if (0 !== p.code) return p;
		const l = String(p.phoneNumber);
		let f = await P.where({
			mobile: l,
			mobile_confirmed: 1
		}).get();
		if (f = this._getCurrentAppUser(f.data), f && f.length > 0) {
			if ("register" === s) return {
				code: 10601,
				messageValues: {
					type: this.t("mobile")
				}
			};
			if (1 !== f.length) return {
				code: 10005
			};
			const e = f[0],
				t = await this._loginExec(e, {
					needPermission: a
				});
			return 0 !== t.code ? t : {
				...t,
				mobile: l
			}
		}
		if ("login" === s) return {
			code: 10602,
			messageValues: {
				type: this.t("mobile")
			}
		};
		const m = Date.now(),
			h = {
				mobile: l,
				channel_code: i,
				my_invite_code: o,
				mobile_confirmed: 1,
				role: c
			},
			g = n && n.trim();
		if (g) {
			const {
				passwordHash: e,
				version: t
			} = this.encryptPwd(g);
			h.password = e, t && (h.password_secret_version = t)
		}
		if (r) {
			let e = await P.where({
				my_invite_code: r
			}).get();
			if (1 !== e.data.length) return {
				code: 10203
			};
			e = e.data[0], h.inviter_uid = [e._id].concat(e.inviter_uid || []), h.invite_time = m
		} else if (u.forceInviteCode) return {
			code: 10203
		};
		h.my_invite_code = o;
		const y = await this._registerExec(h, {
			needPermission: a
		});
		return 0 !== y.code ? y : {
			...y,
			mobile: l
		}
	},
	loginByApple: async function({
		nickName: e,
		fullName: t,
		identityToken: n,
		myInviteCode: r,
		channelCode: i,
		type: o,
		needPermission: s,
		role: a
	}) {
		const c = this._getConfig(),
			u = c && c.oauth && c.oauth.apple,
			d = u && u.bundleId;
		if (!d) throw new Error(this.t("config-param-require", {
			param: "(app || app-plus).apple.bundleId"
		}));
		if (!n) return {
			code: U,
			messageValues: {
				param: "identityToken"
			}
		};
		t = e || (t && Object.keys(t).length > 0 ? t.familyName + t.givenName : "");
		const {
			code: p,
			msg: l
		} = await Gn().verifyIdentityToken(n);
		if (0 !== p) return {
			code: p,
			msg: l,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		const {
			iss: f,
			sub: m,
			aud: h,
			email: g
		} = l;
		if ("https://appleid.apple.com" !== f) return {
			code: 10706,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		if (!m) return {
			code: 10701,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		if (d !== h) return {
			code: 10702,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		const y = t || "User-" + (g ? g.split("@")[0] : Math.random().toString(32).slice(2));
		let w = await P.where({
			apple_openid: m
		}).get();
		if (w = this._getCurrentAppUser(w.data), w && w.length > 0) {
			if ("register" === o) return {
				code: 10703,
				messageValues: {
					type: this.t("apple-account")
				}
			};
			if (1 !== w.length) return {
				code: 10005
			};
			const e = w[0],
				t = await this._loginExec(e, {
					needPermission: s
				});
			return 0 !== t.code ? t : {
				...t,
				openid: m
			}
		}
		if ("login" === o) return {
			code: 10704,
			messageValues: {
				type: this.t("apple-account")
			}
		};
		const _ = {
				channel_code: i,
				nickname: y,
				apple_openid: m,
				my_invite_code: r,
				role: a
			},
			v = await this._registerExec(_, {
				needPermission: s
			});
		return 0 !== v.code ? v : {
			...v,
			openid: m
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: n = [],
		needPermission: r
	}) {
		const i = sr.command,
			o = [];
		n && n.length || (n = ["username"]), n.length > 1 && console.warn(this.t("query-field-warning"));
		const {
			usernameToLowerCase: s,
			emailToLowerCase: a,
			passwordErrorLimit: c,
			passwordErrorRetryTime: u
		} = this._getConfig(), d = {
			email: {
				email_confirmed: 1
			},
			mobile: {
				mobile_confirmed: 1
			}
		}, p = {}, l = e && e.trim();
		if (!l) return {
			code: U,
			messageValues: {
				param: this.t("username")
			}
		};
		s && (p.username = l.toLowerCase()), a && (p.email = l.toLowerCase());
		const f = [];
		n.forEach(t => {
			o.push({
				[t]: e,
				...d[t]
			});
			const n = {
				field: t,
				value: e
			};
			"username" === t && p.username !== e ? (o.push({
				[t]: p.username,
				...d[t]
			}), n.fallbackValue = p.username) : "email" === t && p.email !== e && (o.push({
				[t]: p.email,
				...d[t]
			}), n.fallbackValue = p.email), f.push(n)
		});
		let m = await P.where(i.or(...o)).get();
		m = this._getCurrentAppUser(m.data);
		const h = this.context.CLIENTIP,
			g = this._getMatchedUser(m, f);
		if (g.code) return g;
		const {
			userMatched: y
		} = g;
		let w = y.login_ip_limit || [];
		w = w.filter(e => e.last_error_time > Date.now() - 1e3 * u);
		let _ = w.find(e => e.ip === h);
		if (_ && _.error_times >= c) return {
			code: 10103
		};
		const v = t && t.trim();
		if (!v) return {
			code: U,
			messageValues: {
				param: "密码"
			}
		};
		const b = this._checkPwd(y, v);
		if (0 === b.code) {
			const e = w.indexOf(_);
			e > -1 && w.splice(e, 1);
			const t = {
					login_ip_limit: w
				},
				{
					passwordHash: n,
					passwordVersion: i
				} = b;
			n && i && (t.password = n, t.password_secret_version = i);
			const o = await this._loginExec(y, {
				needPermission: r,
				extraData: t
			});
			return o.code, o
		}
		return _ ? (_.error_times++, _.last_error_time = Date.now()) : (_ = {
			ip: h,
			error_times: 1,
			last_error_time: Date.now()
		}, w.push(_)), await P.doc(y._id).update({
			login_ip_limit: w
		}), {
			code: 10102,
			msg: "密码错误"
		}
	},
	register: async function(e) {
		const t = [],
			n = [{
				name: "username",
				desc: this.t("username")
			}, {
				name: "email",
				desc: this.t("email"),
				extraCond: {
					email_confirmed: 1
				}
			}, {
				name: "mobile",
				desc: this.t("mobile"),
				extraCond: {
					mobile_confirmed: 1
				}
			}],
			{
				usernameToLowerCase: r,
				emailToLowerCase: i
			} = this._getConfig();
		n.forEach(n => {
			const o = n.name;
			let s = e[o] && e[o].trim();
			s ? (("username" === n.name && r || "email" === n.name && i) && (s = s.toLowerCase()),
				e[o] = s, t.push({
					[o]: s,
					...n.extraCond
				})) : delete e[o]
		});
		const {
			username: o,
			email: s,
			mobile: a,
			myInviteCode: c,
			needPermission: u,
			autoSetDcloudAppid: d = !0
		} = e;
		if ("needPermission" in e && delete e.needPermission, "autoSetDcloudAppid" in e && delete e
			.autoSetDcloudAppid, 0 === t.length) return {
			code: 20101,
			messageValues: {
				param: this.t("user-unique-param")
			}
		};
		const p = ar.command;
		let l = await P.where(p.or(...t)).get();
		if (l = this._getCurrentAppUser(l.data), l && l.length > 0) {
			const t = l[0];
			if (t.status === F) return {
				code: 10006
			};
			for (let r = 0; r < n.length; r++) {
				const i = n[r];
				let o = !0;
				if (i.extraCond && (o = Object.keys(i.extraCond).every(e => t[e] === i.extraCond[e])), t[i
						.name] === e[i.name] && o) return {
					code: 20102,
					messageValues: {
						type: i.desc
					}
				}
			}
		}
		const f = e.password && e.password.trim();
		if (!f) return {
			code: U,
			messageValues: {
				param: this.t("password")
			}
		};
		const {
			passwordHash: m,
			version: h
		} = this.encryptPwd(f);
		e.password = m, h && (e.password_secret_version = h), e.my_invite_code = c, delete e.myInviteCode;
		const g = await this._registerExec(e, {
			needPermission: u,
			autoSetDcloudAppid: d
		});
		return 0 !== g.code ? g : {
			...g,
			username: o,
			email: s,
			mobile: a
		}
	},
	logout: async function(e) {
		const t = await this.checkToken(e);
		if (t.code) return t;
		const n = cr.command;
		return await P.doc(t.uid).update({
			token: n.pull(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	getRoleByUid: async function({
		uid: e
	}) {
		if (!e) return {
			code: U,
			messageValues: {
				param: this.t("user-id")
			}
		};
		const t = await P.doc(e).get();
		return 0 === t.data.length ? {
			code: V
		} : {
			code: 0,
			msg: "",
			role: t.data[0].role || []
		}
	},
	getPermissionByRole: async function({
		roleID: e
	}) {
		if (!e) return {
			code: U,
			messageValues: {
				param: "roleID"
			}
		};
		if ("admin" === e) {
			return {
				code: 0,
				msg: "",
				permission: (await D.limit(1e3).get()).data.map(e => e.permission_id)
			}
		}
		const t = await j.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: M
		} : {
			code: 0,
			msg: "",
			permission: t.data[0].permission || []
		}
	},
	getPermissionByUid: async function({
		uid: e
	} = {}) {
		const t = await P.aggregate().match({
				_id: e
			}).project({
				role: !0
			}).unwind("$role").lookup({
				from: "uni-id-roles",
				localField: "role",
				foreignField: "role_id",
				as: "roleDetail"
			}).unwind("$roleDetail").replaceRoot({
				newRoot: "$roleDetail"
			}).end(),
			n = [],
			r = [];
		return t.data.forEach(e => {
			r.push(e.role_id), n.push(...e.permission)
		}), {
			code: 0,
			msg: "",
			role: r,
			permission: I(n)
		}
	},
	bindRole: async function({
		uid: e,
		roleList: t,
		reset: n = !1
	}) {
		const r = {};
		return "string" == typeof t && (t = [t]), r.role = n ? t : ur.push(t), await P.doc(e).update(r), {
			code: 0,
			msg: ""
		}
	},
	bindPermission: async function({
		roleID: e,
		permissionList: t,
		reset: n = !1
	}) {
		const r = {};
		return "string" == typeof t && (t = [t]), r.permission = n ? t : ur.push(t), await j.where({
			role_id: e
		}).update(r), {
			code: 0,
			msg: ""
		}
	},
	unbindRole: async function({
		uid: e,
		roleList: t
	}) {
		return "string" == typeof t && (t = [t]), await P.doc(e).update({
			role: ur.pull(ur.in(t))
		}), {
			code: 0,
			msg: ""
		}
	},
	unbindPermission: async function({
		roleID: e,
		permissionList: t
	}) {
		return "string" == typeof t && (t = [t]), await j.where({
			role_id: e
		}).update({
			permission: ur.pull(ur.in(t))
		}), {
			code: 0,
			msg: ""
		}
	},
	addRole: async function({
		roleID: e,
		roleName: t,
		comment: n,
		permission: r = []
	}) {
		return e ? "admin" === e ? {
			code: L,
			messageValues: {
				param: "roleID",
				reason: this.t("add-role-admin-is-not-allowed")
			}
		} : (await j.add({
			role_id: e,
			role_name: t,
			comment: n,
			permission: r,
			create_date: Date.now()
		}), {
			code: 0,
			msg: ""
		}) : {
			code: U,
			messageValues: {
				param: this.t("role-id")
			}
		}
	},
	addPermission: async function({
		permissionID: e,
		permissionName: t,
		comment: n
	}) {
		return e ? (await D.add({
			permission_id: e,
			permission_name: t,
			comment: n,
			create_date: Date.now()
		}), {
			code: 0,
			msg: ""
		}) : {
			code: U,
			messageValues: {
				param: this.t("permission-id")
			}
		}
	},
	getRoleList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: n = !0
	}) {
		const r = {
			code: 0,
			msg: "",
			roleList: (await j.skip(t).limit(e).get()).data
		};
		if (n) {
			const {
				total: e
			} = await j.where({
				_id: ur.exists(!0)
			}).count();
			r.total = e
		}
		return r
	},
	getRoleInfo: async function(e) {
		const t = await j.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: M
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updateRole: async function({
		roleID: e,
		roleName: t,
		comment: n,
		permission: r
	}) {
		return e ? (await j.where({
			role_id: e
		}).update({
			role_name: t,
			comment: n,
			permission: r
		}), {
			code: 0,
			msg: ""
		}) : {
			code: U,
			messageValues: {
				param: this.t("role-id")
			}
		}
	},
	deleteRole: async function({
		roleID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("typeof roleID must be array or string");
		return await j.where({
			role_id: ur.in(e)
		}).remove(), await P.where({
			role: ur.elemMatch(ur.in(e))
		}).update({
			role: ur.pullAll(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	getPermissionList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: n = !0
	}) {
		const r = {
			code: 0,
			msg: "",
			permissionList: (await D.skip(t).limit(e).get()).data
		};
		if (n) {
			const {
				total: e
			} = await D.where({
				_id: ur.exists(!0)
			}).count();
			r.total = e
		}
		return r
	},
	getPermissionInfo: async function(e) {
		const t = await D.where({
			permission_id: e
		}).get();
		return 0 === t.data.length ? {
			code: U,
			messageValues: {
				param: this.t("permission-id")
			}
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updatePermission: async function({
		permissionID: e,
		permissionName: t,
		comment: n
	}) {
		return e ? (await D.where({
			permission_id: e
		}).update({
			permission_name: t,
			comment: n
		}), {
			code: 0,
			msg: ""
		}) : {
			code: U,
			messageValues: {
				param: this.t("permission-id")
			}
		}
	},
	deletePermission: async function({
		permissionID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("typeof permissionID must be array or string");
		return await D.where({
			permission_id: ur.in(e)
		}).remove(), await j.where({
			permission: ur.elemMatch(ur.in(e))
		}).update({
			permission: ur.pullAll(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: n
	}) {
		const r = n || this.context.PLATFORM,
			{
				openid: i
			} = await this._getAlipayApi({
				platform: r
			}).code2Session(t);
		if (!i) return {
			code: 60401,
			messageValues: {
				account: this.t("alipay-account")
			}
		};
		let o = await P.where({
			ali_openid: i
		}).get();
		return o = this._getCurrentAppUser(o.data), o && o.length > 0 ? {
			code: 60402,
			messageValues: {
				type: this.t("alipay-account")
			}
		} : (await P.doc(e).update({
			ali_openid: i
		}), {
			code: 0,
			openid: i,
			msg: ""
		})
	},
	bindEmail: async function(e) {
		let {
			uid: t,
			email: n,
			code: r
		} = e || {};
		if (n = n && n.trim(), !n) return {
			code: U,
			messageValues: {
				param: this.t("email")
			}
		};
		if (!r) return {
			code: U,
			messageValues: {
				param: this.t("verify-code")
			}
		};
		const {
			emailToLowerCase: i
		} = this._getConfig();
		i && (n = n.toLowerCase());
		let o = await P.where({
			email: n,
			email_confirmed: 1
		}).get();
		if (o = this._getCurrentAppUser(o.data), o && o.length > 0) return {
			code: 60201,
			messageValues: {
				type: this.t("email")
			}
		};
		const s = await this.verifyCode({
			email: n,
			code: r,
			type: "bind"
		});
		return 0 !== s.code ? s : (await P.doc(t).update({
			email: n,
			email_confirmed: 1
		}), {
			code: 0,
			msg: "",
			email: n
		})
	},
	bindMobile: async function(e) {
		let {
			uid: t,
			mobile: n,
			code: r,
			openid: i,
			access_token: o,
			type: s = "sms"
		} = e || {};
		if ("univerify" === s) {
			const e = this._getConfig(),
				t = e && e.service && e.service.univerify;
			if (!t) throw new Error("请在config.json中配置service.univerify下一键登录相关参数");
			const r = await or.bind(this)({
				...t,
				openid: i,
				access_token: o
			});
			if (0 !== r.code) return r;
			n = "" + r.phoneNumber
		}
		let a = await P.where({
			mobile: n,
			mobile_confirmed: 1
		}).get();
		if (a = this._getCurrentAppUser(a.data), a && a.length > 0) return {
			code: 60101,
			messageValues: {
				type: "手机号"
			}
		};
		if ("sms" === s && "code" in e) {
			if (!n) return {
				code: U,
				messageValues: {
					param: this.t("mobile")
				}
			};
			if (!r) return {
				code: U,
				messageValues: {
					param: this.t("verify-code")
				}
			};
			const e = await this.verifyCode({
				mobile: n,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return await P.doc(t).update({
			mobile: n,
			mobile_confirmed: 1
		}), {
			code: 0,
			msg: "",
			mobile: n
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: n
	}) {
		const r = n || this.context.PLATFORM,
			i = "mp-weixin" === r,
			{
				openid: o,
				unionid: s,
				sessionKey: a,
				accessToken: c,
				refreshToken: u,
				expired: d
			} = await this._getWeixinApi({
				platform: r
			})[i ? "code2Session" : "getOauthAccessToken"](t);
		if (!o) return {
			code: 60301,
			messageValues: {
				account: "微信openid"
			}
		};
		const p = dr.command,
			l = [{
				wx_openid: {
					[r]: o
				}
			}];
		s && l.push({
			wx_unionid: s
		});
		let f = await P.where(p.or(...l)).get();
		if (f = this._getCurrentAppUser(f.data), f && f.length > 0) return {
			code: 60302,
			messageValues: {
				type: this.t("wechat-account")
			}
		};
		const m = {
			wx_openid: {
				[r]: o
			}
		};
		let h;
		return s && (m.wx_unionid = s), await P.doc(e).update(m), h = i ? {
			sessionKey: a
		} : {
			accessToken: c,
			refreshToken: u,
			accessTokenExpired: d
		}, {
			code: 0,
			msg: "",
			openid: o,
			unionid: s,
			...h
		}
	},
	bindQQ: async function({
		uid: e,
		code: t,
		accessToken: n,
		platform: r
	} = {}) {
		const i = r || this.context.PLATFORM,
			o = "mp-qq" === i,
			{
				openid: s,
				unionid: a,
				sessionKey: c
			} = await this._getQQApi()[o ? "code2Session" : "getOpenidByToken"]({
				code: t,
				accessToken: n
			});
		if (!s) return {
			code: 60501,
			messageValues: {
				account: "qq openid"
			}
		};
		const u = pr.command,
			d = [{
				qq_openid: {
					[i]: s
				}
			}];
		a && d.push({
			qq_unionid: a
		});
		let p = await P.where(u.or(...d)).get();
		if (p = this._getCurrentAppUser(p.data), p && p.length > 0) return {
			code: 60502,
			messageValues: {
				type: this.t("qq-account")
			}
		};
		const l = {
			qq_openid: {
				[i]: s
			}
		};
		return a && (l.qq_unionid = a), await P.doc(e).update(l), {
			code: 0,
			msg: "",
			openid: s,
			unionid: a,
			...{
				accessToken: n,
				sessionKey: c
			}
		}
	},
	unbindAlipay: async function(e) {
		const t = lr.command,
			n = await P.doc(e).update({
				ali_openid: t.remove()
			});
		return C("upRes:", n), 1 === n.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70401
		}
	},
	unbindEmail: async function(e) {
		let {
			uid: t,
			email: n,
			code: r
		} = e || {};
		if (n = n && n.trim(), !t || !n) return {
			code: U,
			messageValues: {
				param: t ? this.t("email") : this.t("user-id")
			}
		};
		const {
			emailToLowerCase: i
		} = this._getConfig();
		if ("code" in e) {
			const e = await this.verifyCode({
				email: n,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const o = fr.command;
		let s = {
			_id: t,
			email: n
		};
		if (i) {
			const e = n.toLowerCase();
			e !== n && (s = o.or(s, {
				_id: t,
				email: e
			}))
		}
		return 1 === (await P.where(s).update({
			email: o.remove(),
			email_confirmed: o.remove()
		})).updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70201
		}
	},
	unbindMobile: async function(e) {
		const {
			uid: t,
			mobile: n,
			code: r
		} = e || {};
		if ("code" in e) {
			const e = await this.verifyCode({
				mobile: n,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const i = mr.command;
		return 1 === (await P.where({
			_id: t,
			mobile: n
		}).update({
			mobile: i.remove(),
			mobile_confirmed: i.remove()
		})).updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70101
		}
	},
	unbindWeixin: async function(e) {
		const t = hr.command,
			n = await P.doc(e).update({
				wx_openid: t.remove(),
				wx_unionid: t.remove()
			});
		return C("upRes:", n), 1 === n.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70301
		}
	},
	unbindQQ: async function(e) {
		const t = gr.command,
			n = await P.doc(e).update({
				qq_openid: t.remove(),
				qq_unionid: t.remove()
			});
		return C("upRes:", n), 1 === n.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70501
		}
	},
	getSupportedLoginType: function({
		appid: e,
		platform: t
	} = {}) {
		if (!e || !t) throw new Error("Parameter appid and platform is required");
		const n = this._getConfig({
				appid: e,
				platform: t
			}),
			r = ["username-password", "mobile-password", "email-password"];
		for (const e in yr) yr[e](n) && r.push(e);
		return {
			supportedLoginType: r
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				n = await this._getAlipayApi({
					platform: e
				}).code2Session(t.code);
			return n.openid ? {
				code: 0,
				msg: "",
				...n
			} : {
				code: 80701,
				messageValues: {
					account: this.t("alipay-account")
				}
			}
		} catch (e) {
			return {
				code: 80702,
				messageValues: {
					account: this.t("alipay-account")
				}
			}
		}
	},
	code2SessionWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				n = await this._getWeixinApi({
					platform: e
				})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
			return n.openid ? {
				code: 0,
				msg: "",
				...n
			} : {
				code: 80601,
				messageValues: {
					account: "微信openid"
				}
			}
		} catch (e) {
			return {
				code: 80602,
				messageValues: {
					account: "微信openid"
				}
			}
		}
	},
	verifyAppleIdentityToken: async function({
		identityToken: e,
		platform: t
	}) {
		const n = t || this.context.PLATFORM,
			{
				code: r,
				msg: i
			} = await Gn({
				clientType: n
			}).verifyIdentityToken(e);
		return 0 !== r ? {
			code: r,
			msg: i
		} : {
			code: r,
			msg: "验证通过",
			...i
		}
	},
	wxBizDataCrypt: async function({
		code: e,
		sessionKey: n,
		encryptedData: r,
		iv: i
	}) {
		if (!r) return {
			code: U,
			messageValues: {
				param: "encryptedData"
			}
		};
		if (!i) return {
			code: U,
			messageValues: {
				param: "iv"
			}
		};
		if (!e && !n) return {
			code: U,
			messageValues: {
				param: "sessionKey"
			}
		};
		const o = this._getWeixinApi();
		if (!n) {
			const t = await o.code2Session(e);
			if (!t.sessionKey) return {
				code: 80801
			};
			n = t.sessionKey
		}
		n = Buffer.from(n, "base64"), r = Buffer.from(r, "base64"), i = Buffer.from(i, "base64");
		try {
			var s = t.createDecipheriv("aes-128-cbc", n, i);
			s.setAutoPadding(!0);
			var a = s.update(r, "binary", "utf8");
			a += s.final("utf8"), a = JSON.parse(a)
		} catch (e) {
			return console.error(e), {
				code: 80802
			}
		}
		return a.watermark.appid !== o.options.appId ? {
			code: 80803
		} : {
			code: 0,
			msg: "",
			...a
		}
	},
	getWeixinUserInfo: async function({
		accessToken: e,
		openid: t
	} = {}) {
		const n = this.context.PLATFORM;
		if ("app" !== n && "app-plus" !== n) throw new Error(this.t("limit-client-platform"));
		try {
			return {
				code: 0,
				msg: "",
				...await this._getWeixinApi().getUserInfo({
					accessToken: e,
					openid: t
				})
			}
		} catch (e) {
			return {
				code: 80901
			}
		}
	},
	encryptPwd: function(e, {
		value: n,
		version: r
	} = {}) {
		if (!(e = e && e.trim())) throw new Error(this.t("param-required", {
			param: this.t("password")
		}));
		if (!n) {
			const e = this._getConfig(),
				{
					passwordSecret: t
				} = e;
			if ("array" === m(t)) {
				const e = t.sort((e, t) => e.version - t.version);
				n = e[e.length - 1].value, r = e[e.length - 1].version
			} else n = t
		}
		if (!n) throw new Error(this.t("param-error", {
			param: "passwordSecret",
			reason: "invalid passwordSecret"
		}));
		const i = t.createHmac("sha1", n.toString("ascii"));
		return i.update(e), {
			passwordHash: i.digest("hex"),
			version: r
		}
	},
	checkToken: async function(e, {
		needPermission: t,
		needUserInfo: n = !0
	} = {}) {
		const r = this._getConfig(),
			i = this._verifyToken(e);
		if (i.code) return i;
		const {
			uid: o,
			needPermission: s,
			role: a,
			permission: c,
			exp: u,
			iat: d,
			...p
		} = i, l = a && c;
		t = void 0 === t ? s : t;
		const f = r.removePermissionAndRoleFromToken || !l || n,
			m = !r.removePermissionAndRoleFromToken && !l || r.removePermissionAndRoleFromToken && l || r
			.tokenExpiresThreshold && u - Date.now() / 1e3 < r.tokenExpiresThreshold;
		let h = {};
		if (f || m) {
			const t = await P.doc(o).get();
			if (!t.data || 0 === t.data.length || !t.data[0].token) return {
				code: 30202
			};
			if (h = t.data[0], h.status === $) return {
				code: 10001
			};
			if (h.status === F) return {
				code: 10006
			};
			let n = h.token;
			if (n ? "string" == typeof n && (n = [n]) : n = [], -1 === n.indexOf(e)) return {
				code: 30202
			}
		}
		const g = {
			code: 0,
			uid: o,
			...p
		};
		let y, w;
		if (l && (g.role = a, g.permission = c), n && (g.userInfo = h), (!l && t || m) && (y = g.role = h
				.role || [], w = 0 === y.length || y.includes("admin") ? g.permission = [] : g.permission =
				await this._getPermissionListByRoleList(g.role), t && (g.role = y, g.permission = w)), m) {
			let e;
			e = r.removePermissionAndRoleFromToken ? await this.createToken({
				uid: o,
				needPermission: s
			}) : await this.createToken({
				uid: o,
				role: y,
				permission: w
			});
			const t = h.token;
			return await this._updateToken({
				uid: o,
				tokenList: t,
				addToken: [e.token]
			}), {
				...g,
				...e
			}
		}
		return g
	},
	createToken: function({
		uid: e,
		needPermission: t,
		role: n,
		permission: r
	}) {
		if (!e) return {
			code: 30101,
			messageValues: {
				param: this.t("user-id")
			}
		};
		const i = {
				uid: e,
				needPermission: t,
				role: n,
				permission: r
			},
			o = this._getConfig();
		if (!this.interceptorMap.has("customToken")) {
			const e = {
				...i
			};
			return this._createTokenInternal({
				signContent: e,
				config: o
			})
		}
		const s = this.interceptorMap.get("customToken");
		if ("function" != typeof s) throw new Error(this.t("type-function-required", "customToken"));
		const a = s(i);
		return a instanceof Promise ? a.then(e => this._createTokenInternal({
			signContent: e,
			config: o
		})) : this._createTokenInternal({
			signContent: a,
			config: o
		})
	},
	_updateToken: async function({
		uid: e,
		tokenList: t,
		removeToken: n = [],
		addToken: r = []
	} = {}) {
		if (!t) {
			const n = await P.doc(e).get(),
				r = n.data && n.data[0];
			t = r && r.token || []
		}
		"string" == typeof t && (t = [t]);
		const i = this._getExpiredToken(t);
		(t = t.filter(e => -1 === i.indexOf(e))).push(...r);
		for (let e = 0; e < n.length; e++) {
			const r = t.indexOf(n[e]);
			t.splice(r, 1)
		}
		await P.doc(e).update({
			token: t,
			last_login_date: Date.now(),
			last_login_ip: this.context.CLIENTIP
		})
	},
	refreshToken: async function({
		token: e
	} = {}) {
		const t = this._getConfig(),
			n = this._verifyToken(e);
		if (n.code) return n;
		const {
			uid: r,
			needPermission: i
		} = n;
		let o;
		if (t.removePermissionAndRoleFromToken) o = await this.createToken({
			uid: r,
			needPermission: i
		});
		else {
			const {
				role: e,
				permission: t
			} = await this.getPermissionByUid({
				uid: r
			});
			o = await this.createToken({
				uid: r,
				role: e,
				permission: t
			})
		}
		return await this._updateToken({
			uid: r,
			addToken: [o.token],
			removeToken: [e]
		}), o
	},
	_checkPwd: function(e, t) {
		if (!t) return {
			code: 1
		};
		const {
			password: n,
			password_secret_version: r
		} = e, i = this._getConfig(), {
			passwordSecret: o
		} = i, s = m(o);
		if ("string" === s) {
			const {
				passwordHash: e
			} = this.encryptPwd(t, {
				value: o
			});
			return e === n ? {
				code: 0,
				message: ""
			} : {
				code: 2
			}
		}
		if ("array" !== s) throw new Error(this.t("password-secret-type-error"));
		const a = o.sort((e, t) => e.version - t.version);
		let c;
		if (c = r ? a.find(e => e.version === r) : a[0], !c) return {
			code: 3
		};
		const u = a[a.length - 1],
			{
				passwordHash: d
			} = this.encryptPwd(t, c);
		if (d === n) {
			const e = {
				code: 0
			};
			if (c !== u) {
				const {
					passwordHash: n,
					version: r
				} = this.encryptPwd(t, u);
				e.passwordHash = n, e.passwordVersion = r
			}
			return e
		}
		return {
			code: 4,
			message: ""
		}
	},
	_verifyToken: function(e) {
		const t = this._getConfig();
		let n;
		try {
			n = jn(e, t.tokenSecret)
		} catch (e) {
			return "TokenExpiredError" === e.name ? {
				code: 30203,
				err: e
			} : {
				code: 30204,
				err: e
			}
		}
		return t.bindTokenToDevice && n.clientId && n.clientId !== this._getClientUaHash() ? {
			code: 30201
		} : {
			code: 0,
			message: "",
			...n
		}
	},
	_getExpiredToken: function(e) {
		const t = this._getConfig(),
			n = [];
		return e.forEach(e => {
			try {
				jn(e, t.tokenSecret)
			} catch (t) {
				n.push(e)
			}
		}), n
	},
	_getPermissionListByRoleList: async function(e) {
		if (!Array.isArray(e)) return [];
		if (0 === e.length) return [];
		if (e.includes("admin")) {
			return (await D.limit(500).get()).data.map(e => e.permission_id)
		}
		const t = await j.where({
				role_id: wr.in(e)
			}).get(),
			n = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(n, e.permission)
		}), I(n)
	},
	_getClientUaHash: function() {
		const e = t.createHash("md5"),
			n = /MicroMessenger/i.test(this.context.CLIENTUA) ? this.context.CLIENTUA.replace(
				/(MicroMessenger\S+).*/i, "$1") : this.context.CLIENTUA;
		return e.update(n), e.digest("hex")
	},
	_createTokenInternal: function({
		signContent: e,
		config: t
	}) {
		if (t.tokenExpiresIn && t.tokenExpiresThreshold && t.tokenExpiresIn <= t.tokenExpiresThreshold)
			throw new Error(this.t("token-expires-config-warning"));
		return "object" === m(e) && e.uid ? (t.bindTokenToDevice && (e.clientId = this
	._getClientUaHash()), {
			token: Dn(e, t.tokenSecret, {
				expiresIn: t.tokenExpiresIn
			}),
			tokenExpired: Date.now() + 1e3 * t.tokenExpiresIn
		}) : {
			code: 30101,
			messageValues: {
				param: this.t("user-id")
			}
		}
	},
	setVerifyCode: async function({
		mobile: e,
		email: t,
		code: n,
		expiresIn: r,
		type: i
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t) return {
			code: 50101,
			messageValues: {
				param: "手机号或邮箱"
			}
		};
		if (e && t) return {
			code: 50102,
			messageValues: {
				param: "参数",
				reason: "手机号和邮箱不可同时存在"
			}
		};
		n || (n = E()), r || (r = 180);
		const o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: i,
				code: n,
				state: 0,
				ip: this.context.CLIENTIP,
				created_at: o,
				expired_at: o + 1e3 * r
			};
		return await R.add(s), {
			code: 0,
			mobile: e,
			email: t
		}
	},
	verifyCode: async function({
		mobile: e,
		email: t,
		code: n,
		type: r
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t) return {
			code: 50201,
			messageValues: {
				param: "手机号或邮箱"
			}
		};
		if (e && t) return {
			code: 50203,
			messageValues: {
				param: "参数",
				reason: "手机号和邮箱不可同时存在"
			}
		};
		if (!n) return {
			code: 50202,
			messageValues: {
				type: this.t(e ? "sms" : "email")
			}
		};
		const i = _r.command,
			o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: r,
				code: n,
				state: 0,
				expired_at: i.gt(o)
			},
			a = await R.where(s).orderBy("created_at", "desc").limit(1).get();
		if (a && a.data && a.data.length > 0) {
			const e = a.data[0];
			return await R.doc(e._id).update({
				state: 1
			}), {
				code: 0,
				msg: "验证通过"
			}
		}
		return {
			code: 50202,
			messageValues: {
				type: this.t(e ? "sms" : "email")
			}
		}
	},
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: n,
		templateId: r
	}) {
		if (!e) return {
			code: U,
			messageValues: {
				param: this.t("mobile")
			}
		};
		if (t || (t = E()), !n) return {
			code: U,
			messageValues: {
				param: this.t("verify-code-type")
			}
		};
		const i = this._getConfig();
		let o = i && i.service && i.service.sms;
		if (!o) throw new Error(this.t("config-param-required", {
			param: "service.sms"
		}));
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const s = ["smsKey", "smsSecret"];
		for (let e = 0, t = s.length; e < t; e++) {
			const t = s[e];
			if (!o[t]) throw new Error(this.t("config-param-required", {
				param: "service.sms." + t
			}))
		}
		const {
			name: a,
			smsKey: c,
			smsSecret: u,
			codeExpiresIn: d
		} = o;
		let p;
		switch (n) {
			case "login":
				p = this.t("login");
				break;
			default:
				p = this.t("verify-mobile")
		}
		try {
			const i = {
				name: a,
				code: t,
				action: p,
				expMinute: "" + Math.round(d / 60)
			};
			a && (i.name = a), await uniCloud.sendSms({
				smsKey: c,
				smsSecret: u,
				phone: e,
				templateId: r || "uniID_code",
				data: i
			});
			const o = await this.setVerifyCode({
				mobile: e,
				code: t,
				expiresIn: d,
				type: n
			});
			return o.code >= 0 ? o : {
				code: 0,
				msg: ""
			}
		} catch (e) {
			return {
				code: 50301
			}
		}
	}
});
let br;
try {
	br = require("../uni-config-center")
} catch (e) {
	throw new Error("Plugin[uni-config-center] was not found")
}
class Tr {
	constructor({
		context: e,
		clientInfo: t,
		config: n
	} = {}) {
		const r = br({
			pluginId: "uni-id"
		});
		this.pluginConfig = r, this.config = n || this._getConfigContent(), this._configCache = {}, Object
			.defineProperty(this, "context", {
				get() {
					let n;
					n = t ? {
						OS: t.os,
						CLIENTIP: t.clientIP,
						CLIENTUA: t.userAgent,
						PLATFORM: t.platform,
						APPID: t.appId,
						LOCALE: t.locale,
						DEVICEID: t.deviceId
					} : Object.assign({}, e || global.__ctx__ || {});
					const r = ["CLIENTIP", "PLATFORM", "APPID", "LOCALE"];
					for (let e = 0; e < r.length; e++) {
						const t = r[e];
						void 0 === n[t] && console.warn(i?.t("context-required", {
							key: t
						}))
					}
					const o = n.APPID,
						s = n.PLATFORM,
						a = this._getAppConfig(this.config, o);
					if ("app" === s || "app-plus" === s ? n.PLATFORM = a.preferedAppPlatform || s :
						"web" !== s && "h5" !== s || (n.PLATFORM = a.preferedWebPlatform || s), "app" === n
						.PLATFORM && a["app-plus"] || "app-plus" === n.PLATFORM && a.app) throw new Error(
						`Client platform is ${n.PLATFORM}, but ${"app"===n.PLATFORM?"app-plus":"app"} was found in config. Please refer to: https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=prefered-app-platform`
						);
					if ("web" === n.PLATFORM && a.h5 || "h5" === n.PLATFORM && a.web) throw new Error(
						`Client platform is ${n.PLATFORM}, but ${"web"===n.PLATFORM?"h5":"web"} was found in config. Please refer to: https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=prefered-web-platform`
						);
					return n
				}
			}), this.interceptorMap = new Map, r && r.hasFile("custom-token.js") && this.setInterceptor(
				"customToken", require(r.resolve("custom-token.js")));
		let i, o = k;
		if (r && r.hasFile("lang/index.js")) {
			const e = r.requireFile("lang/index.js");
			o = function(e, t) {
				const n = Object.keys(e);
				n.push(...Object.keys(t));
				const r = {};
				for (let i = 0; i < n.length; i++) {
					const o = n[i];
					r[o] = Object.assign({}, e[o], t[o])
				}
				return r
			}(k, e)
		}
		// if (!uniCloud.initI18n) throw new Error(
		// 	"The HBuilderX version is too old, please upgrade to the latest version of HBuilderX");
		// i = uniCloud.initI18n({
		// 	locale: "en",
		// 	fallbackLocale: "zh-Hans",
		// 	messages: o
		// }), 
		Object.defineProperty(this, "t", {
			get() {
				// return i.setLocale(this.context.LOCALE || "zh-Hans"), i.t.bind(i)
				// return o.t?.bind(o)() // eslint-disable-line no-useless-escape,no-fallthrough,no-
				return function(value) {
					return o["zh-Hans"].value || value;
				}
			}
		})
	}
	get dev() {
		return console.warn(this.t("dev-warning")), {
			getConfig: this._getConfig.bind(this)
		}
	}
	_getAppConfig(e, t) {
		return Array.isArray(e) ? e.find(e => e.dcloudAppid === t) || e.find(e => e.isDefaultConfig) : e
	}
	_getConfigContent() {
		if (this.pluginConfig && this.pluginConfig.hasFile("config.json")) {
			let e;
			try {
				e = this.pluginConfig.config()
			} catch (e) {
				throw new Error("Invalid config file\n" + e.message)
			}
			return Array.isArray(e) ? e : e[0] ? Object.values(e) : e
		}
	}
	init() {
		throw new Error("uniID.init has been deprecated, use uniID.createInstance instead")
	}
	setInterceptor(e, t) {
		this.interceptorMap.set(e, t)
	}
	_getConfig({
		appid: e,
		platform: t
	} = {}) {
		const n = `${e=e||this.context.APPID}_${t=t||this.context.PLATFORM}`;
		if (this._configCache[n]) return this._configCache[n];
		if (!(this.config && 0 !== Object.keys(this.config).length)) throw new Error(this.t(
			"config-file-not-found"));
		const r = this._getAppConfig(this.config, e);
		"app" !== t && "app-plus" !== t || (t = r.preferedAppPlatform || t), "web" !== t && "h5" !== t || (t = r
			.preferedWebPlatform || t);
		const i = Object.assign(r, r[t]) || {},
			o = Object.assign({
				bindTokenToDevice: !1,
				tokenExpiresIn: 7200,
				tokenExpiresThreshold: 1200,
				passwordErrorLimit: 6,
				passwordErrorRetryTime: 3600,
				usernameToLowerCase: !0,
				emailToLowerCase: !0
			}, i);
		return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"]
			.forEach(e => {
				if (!o || !o[e]) throw new Error(this.t("config-param-required", {
					param: e
				}))
			}), this._configCache[n] = o, o
	}
}
for (const e in vr) Tr.prototype[e] = vr[e];

function Cr(e) {
	const t = new Tr(e);
	return new Proxy(t, {
		get(e, t) {
			if (t in e && 0 !== t.indexOf("_")) {
				if ("function" == typeof e[t]) return (n = e[t], function() {
					const e = n.apply(this, arguments);
					return f(e) ? e.then(e => (S.bind(this)(e), e)) : (S.bind(this)(e), e)
				}).bind(e);
				if ("context" !== t && "config" !== t) return e[t]
			}
			var n
		}
	})
}
Tr.prototype.createInstance = Cr;
var Er = Cr();
module.exports = Er;