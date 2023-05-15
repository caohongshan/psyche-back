const { Controller } = require('./common/uni-cloud-router')

module.exports = class UtilsController extends Controller {
	/**
	 * 地址解析（地址转坐标）
	 * @param {Object} address 详细地址
	 * @param {Object} region 地区（选填）
	 * @link https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
	 */
	async getAddressGeo() {
		const { address, region } = this.ctx.data;
		let {
			key,
			mode
		} = this.ctx.getConfigs.config("qqmap");
		console.log("key", key)
		const res = await uniCloud.httpclient.request("https://apis.map.qq.com/ws/geocoder/v1/", {
			method: 'GET',
			data: {
				address,
				region,
				key
			},
			dataType: 'json'
		});
		console.log(res)
		if (res.status == 200 && res.data.status == 0) {
			return res.data.result;
		}
		return false;
	}
	/**
	 * 逆地址解析（坐标位置描述）
	 * @param {Object} fromLatlng
	 * @param {Object} poi_options
	 * @link https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
	 */
	async getLocationAddress() {
		let {
			fromLatlng,
			poi_options
		} = this.ctx.data;
		let {
			key,
			mode
		} = this.ctx.getConfigs.config("qqmap");
		poi_options = poi_options || "address_format=short;policy=5";
		const res = await uniCloud.httpclient.request("https://apis.map.qq.com/ws/geocoder/v1/", {
			method: 'GET',
			data: {
				location: fromLatlng,
				get_poi: 1,
				poi_options: poi_options,
				key
			},
			dataType: 'json'
		});
		console.log(res)
		if (res.status == 200 && res.data.status == 0) {
			return res.data.result;
		}
		return false;
	}
	async getPositionByIp() {
		let {
			ip
		} = this.ctx.data;
		const res = await uniCloud.httpclient.request("https://apis.map.qq.com/ws/location/v1/ip", {
			method: 'GET',
			data: {
				ip: ip,
				key
			},
			dataType: 'json'
		});
		if (res.status == 200 && res.data.status == 0) {
			return res.data.result;
		}
		return false;
	}
	/**
	 * 根据经纬度，计算距离，如果需要在结算的时候，保证距离万无一失，就需要调用此接口，如果信任前端传过来的距离参数，就没必要调用
	 * @param {Object} fromLatlng 起点坐标
	 * @param {Object} toLatlng 终点坐标
	 * @link https://lbs.qq.com/service/webService/webServiceGuide/webServiceMatrix
	 */
	async getMapDistance() {
		let {
			fromLatlng,
			toLatlng
		} = this.ctx.data;
		let {
			key,
			mode
		} = this.ctx.getConfigs.config("qqmap");
		console.log(fromLatlng, toLatlng)
		let fromLength = fromLatlng.split(";").length;
		let toLength = toLatlng.split(";").length;
		const res = await uniCloud.httpclient.request("https://apis.map.qq.com/ws/distance/v1/matrix", {
			method: 'GET',
			data: {
				key,
				mode,
				from: fromLatlng,
				to: toLatlng
			},
			dataType: 'json'
		});
		if (res.status == 200 && res.data.status == 0) {
			//一对一，只返回一个结果
			if (fromLength == toLength && toLength == 1) {
				return res.data.result.rows[0].elements[0];
			}
			//多对一
			if (toLength == 1) {
				let data = [];
				res.data.result.rows.map(ro => {
					data.push(ro.elements[0]);
				});
				return data;
			}
			return res.data.result.rows;
		}
		//查询失败
		return false;
	}
	/**
	 * 后台系统关键表同步
	 * @link http://tiantian.cqsort.com/http/mall/utils/database?collection=tian-page-components
	 */
	async database() {
		let {
			collection,
			condition
		} = this.ctx.data;
		let allowCollections = ["tian-page-components", "opendb-admin-menus", "uni-id-permissions",
			"tian-payment-types", "tian-identity", "uni-id-roles"
		];
		let delete_ids = ["opendb-admin-menus", "opendb-banner", "opendb-app-list", "opendb-city-china",
			"opendb-news-articles", "tian-identity", "tian-page-components", "tian-payment-types",
			"uni-id-permissions", "uni-id-roles",
		]
		let extData = {
			"tian-identity": {
				key: "key",
				content: [".oauth", ".payment", ".share", "service.sms", "cache_", "email.", "transfers."]
			}
		}
		let deleteFields = ["created", "create_date"]
		if (allowCollections.indexOf(collection) == -1) {
			return false;
		}
		if (!condition) {
			condition = {}
		} else if (typeof condition == "string") {
			condition = JSON.parse(condition);
		}
		const md5 = require('md5-node');
		//增加1小时缓存
		return this.ctx.memorycache("database-async-" + md5(JSON.stringify(this.ctx.data)), false, 3600, async (
			configs) => {
			let data = await this.service.system.collection.getAll(collection, condition, delete_ids
				.indexOf(
					collection) != -
				1)
			//不返回created，create_date字段
			data.forEach(e => {
				for (let s of deleteFields) {
					if (e[s]) {
						delete e[s]
					}
				}
			})
			if (extData[collection]) {
				//过滤不需要返回的数据
				let key = extData[collection].key;
				return data.filter(e => extData[collection].content.filter(e2 => e[key].indexOf(
						e2) != -1).length ==
					0)
			}
			return data;
		});

	}
}
