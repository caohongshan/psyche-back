const fs = require("fs");
const createConfig = require('../common/uni-config-center');

module.exports = (options) => {
	// 返回中间件函数
	return async function config(ctx, next) {
		/**
		 * 从对象取值
		 * @param {Object} key1
		 * @param {Object} data
		 */
		ctx.objectFormat = function(key1, data) {
			if (!key1) {
				return "";
			}
			if (data[key1] !== undefined) {
				//存在变量对于的value
				return data[key1];
			}
			let keyArr = key1.split(".");
			if (keyArr.length > 1) {
				let tmp = data[keyArr[0]];
				keyArr.shift();
				for (let key2 of keyArr) {
					tmp = tmp[key2];
					if (tmp === undefined) {
						return key1;
					}
				}
				// console.log("tmp", tmp)
				if (tmp !== undefined) {
					return tmp;
				}
			}
			return key1;
		}
		/**
		 * 字符串格式化
		 * @param {Object} format
		 * @param {Object} data
		 */
		ctx.stringFormat = function(format, data) {
			if (!format) {
				return "";
			}
			//匹配大括号+英文字符
			return format.replace(/\{([a-zA-Z0-9$_\.]+)\}/g, key => {
				//去掉大括号，得到变量
				let key1 = key.replace(/[\{\}]/g, "");
				// console.log("key1", key1)
				return ct.objectFormat(key1, data);
			});
		}
		// console.log("init config")
		//获取插件配置
		ctx.getConfigs = createConfig({
			pluginId: 'psyche', // 插件id, 注意pluginId需和uni-config-center下的目录名一致
			defaultConfig: ctx.sysconfig, // 默认配置，非必填
			customMerge: (defaultConfig, userConfig) => {
				// 自定义默认配置和用户配置的合并规则，非必填，不设置的情况侠会对默认配置和用户配置进行深度合并
				// defaudltConfig 默认配置
				// userConfig 用户配置
				return Object.assign(userConfig, defaultConfig)
			}
		});
		/**
		 * 获取当前平台独有配置
		 */
		ctx.getConfigs.platformConfigs = function(key, platform) {
			if (!platform) {
				platform = ctx.context.PLATFORM;
			}
			return this.config(platform + "." + key)
		}

		/**
		 * 获取当前时区的时间
		 */
		ctx.getTimeZoneDate = function() {
			//时区
			let zone = this.getConfigs.config("timezone");
			//0时区时间戳
			let dt = new Date();
			dt.setHours(dt.getHours() + zone);
			return dt;
		}
		/**
		 * 根据平台随机获取一个值
		 * @param {Object} key
		 * @param {Object} platform
		 */
		ctx.getConfigs.getPlatformRandomValue = function(key, platform) {
			if (!platform) {
				platform = ctx.context.PLATFORM;
			}
			return this.getRandomValue(platform + "." + key)
		}
		/**
		 * 获取配置中的随机一个值
		 * @param {Object} key
		 */
		ctx.getConfigs.getRandomValue = function(key) {
			let values = this.config(key);
			if (!values) {
				return "";
			}
			if (typeof values == "object" && values.length > 0) {
				return values[parseInt(Math.random() * values.length)]
			}
			return ""
		}
		/**
		 * 获取支付配置
		 */
		ctx.getConfigs.paymentConfigs = function(key, platform) {
			if (!platform) {
				platform = ctx.context.PLATFORM;
			}
			//只需要文件完整地址
			let paths = ["alipayRootCertPath", "appCertPath", "alipayPublicCertPath"];
			//需要读取文件内容
			let fileContent = ["pfx"];
			let configs = {
				...this.config(platform + ".payment." + key)
			};
			if (!configs) {
				console.log("未读取到支付配置")
				return {}
			}
			for (let key in configs) {
				if (paths.indexOf(key) != -1 && configs[key]) {
					// 获取文件绝对路径
					configs[key] = this.resolve(configs[key]) // 获取文件的路径
				} else if (fileContent.indexOf(key) != -1 && configs[key]) {
					// 获取文件内容
					let fullPath = this.resolve(configs[key]) // 获取文件的内容
					try {
						console.log("p12文件读取", fullPath);
						configs[key] = fs.readFileSync(fullPath);
					} catch (e) {
						delete configs[key];
						console.log("p12文件读取失败", fullPath);
						console.log("error", e.message)
					}
				}
			}
			return configs;
		}
		/**
		 * 统一构造支付通知回调地址
		 * @param {Object} type
		 * @param {Object} module
		 */
		ctx.getConfigs.paymentNotifyUrl = function(type, module) {
			let domain = this.config("domain");
			if (!domain) {
				//拼接默认域名
				console.log("开始拼接默认域名")
				let {
					spaceId,
					provider
				} = ctx.context.SPACEINFO;
				if (provider == "tencent") {
					domain = `https://${spaceId}.service.tcloudbase.com`
				} else if (provider == "aliyun") {
					//https://3fbab731-e993-47e6-882f-a74e444709a3.bspapp.com
					domain = `https://${spaceId}.bspapp.com`
				}
			}
			return domain + this.config("notify-floder") +
				"/payment/notify/" + ctx.context.APPID + "/" + ctx.context.PLATFORM + "/" +
				type + "/" +
				module;
		}
		ctx.getConfigs.staticDomain = function() {
			let domain = this.config("static-domain");
			if (!domain) {
				//拼接默认域名
				console.log("开始拼接默认静态域名")
				let {
					spaceId,
					provider
				} = ctx.context.SPACEINFO;
				if (provider == "tencent") {
					//@todo 1302181076这个数字是腾讯云那边的用户id，目前不能直接获取
					//https://tcb-tqpzupiktzkqmrnffef9a-a84549-1302181076.tcloudbaseapp.com/
					// domain = `https://${spaceId}-1302181076.tcloudbaseapp.com`
				} else if (provider == "aliyun") {
					//https://static-3fbab731-e993-47e6-882f-a74e444709a3.bspapp.com/
					domain = `https://static-${spaceId}.bspapp.com`
				}
			}
			return domain;
		}
		/**
		 * 格式化字符串
		 * @param {String} key a.b.c
		 * @param {Object} data 
		 * @param {Boolean} platform 是否平台差异
		 */
		ctx.getConfigs.templateConfigs = function(key, data, platform) {
			let format = "";
			//是否存在平台差异
			if (platform) {
				format = this.platformConfigs(key);
			}
			if (!format) {
				format = this.config(key);
			}
			if (!format) {
				return "";
			}
			//匹配大括号+英文字符，例如{a.b.c}
			return ctx.stringFormat(format, data);
		}
		/**
		 * 根据前端appid，来获取配置
		 * @param {Object} key
		 * @param {Object} platform
		 */
		ctx.getAppConfigs = ctx.getConfigs;

		/**
		 * 获取uniid配置里面，指定平台下的指定类型信息
		 * @param {Object} config
		 * @param {Object} platform
		 * @param {Object} type
		 */
		ctx.getUniIdConfigs.appPlatformConfig = function(type, platform, dcloudAppid) {
			// let currentConfig = this.currentAppConfig(dcloudAppid);
			//系统总配置
			let currentConfig = ctx.sysconfig;
			if (!platform) {
				platform = ctx.context.PLATFORM;
			}
			if (!currentConfig) {
				return ""
			}
			//把平台下的信息合并到主列表
			let platFormConfig = Object.assign({}, {
				...currentConfig,
				...currentConfig[platform]
			})
			if (type) {
				return platFormConfig[type];
			}
			return platFormConfig;
		}

		if (ctx.event.queryStringParameters && ctx.event.queryStringParameters.apiToken) {
			let token = ctx.getConfigs.config("apiToken");
			ctx.apiLogin = ctx.event.queryStringParameters.apiToken == token;
			if (!token || !ctx.apiLogin) {
				ctx.throw('TOKEN_INVALID', "认证失败")
			}
			ctx.data = ctx.event.queryStringParameters;
			delete ctx.data.apiToken;
		}

		await next() // 执行后续中间件
	}
}
