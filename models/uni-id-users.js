/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:42:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-18 10:23:04
 */
/* 定义 goods Schema */
const mongoose = require("mongoose");

const UniIdUsersSchema = new mongoose.Schema({
	"bsonType": "object",
	"permission": {
		"read": true,
		"create": "'CREATE_UNI_ID_USERS' in auth.permission",
		"update": "doc._id == auth.uid || 'UPDATE_UNI_ID_USERS' in auth.permission",
		"delete": "'DELETE_UNI_ID_USERS' in auth.permission"
	},
	"properties": {
		"_id": {
			"description": "存储文档 ID（用户 ID），系统自动生成"
		},
		"ali_openid": {
			"bsonType": "string",
			"description": "支付宝平台openid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"apple_openid": {
			"bsonType": "string",
			"description": "苹果登录openid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"avatar": {
			"bsonType": "string",
			"description": "头像地址",
			"title": "头像地址",
			"trim": "both",
			"permission": {
				"read": true,
				"write": "doc._id == auth.uid || 'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"avatar_file": {
			"bsonType": "file",
			"description": "用file类型方便使用uni-file-picker组件",
			"title": "头像文件",
			"permission": {
				"read": true,
				"write": "doc._id == auth.uid || 'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"comment": {
			"bsonType": "string",
			"description": "备注",
			"title": "备注",
			"trim": "both",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"dcloud_appid": {
			"bsonType": "array",
			"description": "允许登录的客户端的appid列表",
			"foreignKey": "opendb-app-list.appid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"department_id": {
			"bsonType": "array",
			"description": "部门ID",
			"enum": {
				"collection": "opendb-department",
				"field": "_id as value, name as text",
				"orderby": "name asc"
			},
			"enumType": "tree",
			"title": "部门",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"email": {
			"bsonType": "string",
			"description": "邮箱地址",
			"format": "email",
			"title": "邮箱",
			"trim": "both",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"email_confirmed": {
			"bsonType": "int",
			"defaultValue": 0,
			"description": "邮箱验证状态：0 未验证 1 已验证",
			"enum": [{
					"text": "未验证",
					"value": 0
				},
				{
					"text": "已验证",
					"value": 1
				}
			],
			"title": "邮箱验证状态",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"gender": {
			"bsonType": "int",
			"defaultValue": 0,
			"description": "用户性别：0 未知 1 男性 2 女性",
			"enum": [{
					"text": "未知",
					"value": 0
				},
				{
					"text": "男",
					"value": 1
				},
				{
					"text": "女",
					"value": 2
				}
			],
			"title": "性别",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"invite_time": {
			"bsonType": "timestamp",
			"description": "受邀时间",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"inviter_uid": {
			"bsonType": "array",
			"description": "用户全部上级邀请者",
			"trim": "both",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"last_login_date": {
			"bsonType": "timestamp",
			"description": "最后登录时间",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"last_login_ip": {
			"bsonType": "string",
			"description": "最后登录时 IP 地址",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"mobile": {
			"bsonType": "string",
			"description": "手机号码",
			"pattern": "^\\+?[0-9-]{3,20}$",
			"title": "手机号码",
			"trim": "both",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"mobile_confirmed": {
			"bsonType": "int",
			"defaultValue": 0,
			"description": "手机号验证状态：0 未验证 1 已验证",
			"enum": [{
					"text": "未验证",
					"value": 0
				},
				{
					"text": "已验证",
					"value": 1
				}
			],
			"title": "手机号验证状态",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"my_invite_code": {
			"bsonType": "string",
			"description": "用户自身邀请码",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"nickname": {
			"bsonType": "string",
			"description": "用户昵称",
			"title": "昵称",
			"trim": "both",
			"permission": {
				"read": true,
				"write": "doc._id == auth.uid || 'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"password": {
			"bsonType": "password",
			"description": "密码，加密存储",
			"title": "密码",
			"trim": "both"
		},
		"password_secret_version": {
			"bsonType": "int",
			"description": "密码使用的passwordSecret版本",
			"title": "passwordSecret",
			"permission": {
				"read": false,
				"write": false
			}
		},
		"realname_auth": {
			"bsonType": "object",
			"description": "实名认证信息",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			},
			"properties": {
				"auth_date": {
					"bsonType": "timestamp",
					"description": "认证通过时间"
				},
				"auth_status": {
					"bsonType": "int",
					"description": "认证状态：0 未认证 1 等待认证 2 认证通过 3 认证失败",
					"maximum": 3,
					"minimum": 0
				},
				"contact_email": {
					"bsonType": "string",
					"description": "联系人邮箱"
				},
				"contact_mobile": {
					"bsonType": "string",
					"description": "联系人手机号码"
				},
				"contact_person": {
					"bsonType": "string",
					"description": "联系人姓名"
				},
				"id_card_back": {
					"bsonType": "string",
					"description": "身份证反面照 URL"
				},
				"id_card_front": {
					"bsonType": "string",
					"description": "身份证正面照 URL"
				},
				"identity": {
					"bsonType": "string",
					"description": "身份证号码/营业执照号码"
				},
				"in_hand": {
					"bsonType": "string",
					"description": "手持身份证照片 URL"
				},
				"license": {
					"bsonType": "string",
					"description": "营业执照 URL"
				},
				"real_name": {
					"bsonType": "string",
					"description": "真实姓名/企业名称"
				},
				"type": {
					"bsonType": "int",
					"description": "用户类型：0 个人用户 1 企业用户",
					"maximum": 1,
					"minimum": 0
				}
			},
			"required": [
				"type",
				"auth_status"
			]
		},
		"register_date": {
			"bsonType": "timestamp",
			"description": "注册时间",
			"forceDefaultValue": {
				"$env": "now"
			},
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"register_ip": {
			"bsonType": "string",
			"description": "注册时 IP 地址",
			"forceDefaultValue": {
				"$env": "clientIP"
			},
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"role": {
			"bsonType": "array",
			"description": "用户角色",
			"enum": {
				"collection": "uni-id-roles",
				"field": "role_id as value, role_name as text"
			},
			"foreignKey": "uni-id-roles.role_id",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			},
			"title": "角色"
		},
		"tags":{
			"bsonType": "array",
			"description": "用户标签",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			},
			"title": "标签"
		},
		"score": {
			"bsonType": "int",
			"description": "用户积分，积分变更记录可参考：uni-id-scores表定义",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"status": {
			"bsonType": "int",
			"defaultValue": 0,
			"description": "用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			},
			"enum": [{
					"text": "正常",
					"value": 0
				},
				{
					"text": "禁用",
					"value": 1
				},
				{
					"text": "审核中",
					"value": 2
				},
				{
					"text": "审核拒绝",
					"value": 3
				}
			],
			"title": "用户状态"
		},
		"token": {
			"bsonType": "array",
			"description": "用户token",
			"permission": {
				"read": false,
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"username": {
			"bsonType": "string",
			"description": "用户名，不允许重复",
			"title": "用户名",
			"trim": "both",
			"permission": {
				"read": "doc._id == auth.uid || 'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"wx_openid": {
			"bsonType": "object",
			"description": "微信各个平台openid",
			"properties": {
				"app": {
					"bsonType": "string",
					"description": "app平台微信openid"
				},
				"mp": {
					"bsonType": "string",
					"description": "微信小程序平台openid"
				},
				"h5": {
					"bsonType": "string",
					"description": "微信公众号登录openid"
				},
				"web": {
					"bsonType": "string",
					"description": "PC页面扫码登录openid"
				}
			},
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"wx_unionid": {
			"bsonType": "string",
			"description": "微信unionid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"qq_openid": {
			"bsonType": "object",
			"description": "QQ各个平台openid",
			"properties": {
				"app": {
					"bsonType": "string",
					"description": "app平台QQ openid"
				},
				"mp": {
					"bsonType": "string",
					"description": "QQ小程序平台openid"
				}
			},
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"qq_unionid": {
			"bsonType": "string",
			"description": "QQ unionid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		},
		"third_party": {
			"bsonType": "object",
			"description": "三方平台凭证",
			"permission": {
				"read": false,
				"write": false
			}
		},
		"identities": {
			"bsonType": "array",
			"description": "三方平台身份信息；一个对象代表一个身份，参数支持: provider 身份源, userInfo 三方用户信息, openid 三方openid, unionid 三方unionid, uid 三方uid",
			"permission": {
				"read": "'READ_UNI_ID_USERS' in auth.permission",
				"write": "'CREATE_UNI_ID_USERS' in auth.permission || 'UPDATE_UNI_ID_USERS' in auth.permission"
			}
		}
	},
	"required": []
});

// 创建Model
const UniIdUsersModel = mongoose.model("uni-id-users", UniIdUsersSchema, 'uni-id-users');
module.exports = UniIdUsersModel
