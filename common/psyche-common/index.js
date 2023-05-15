const db = uniCloud.database();
const cmd = db.command;
const shopCollection = db.collection("tian-mall-shops");
/**
 * 中国时差
 */
const timeZone = 8;
const modles = {
	/**
	 * 根据多个店铺id，查询店铺信息
	 * @param {Object} shopIds
	 */
	async getShopsInfoByIds(shopIds) {
		let {
			data
		} = await shopCollection.where({
			_id: cmd.in(shopIds)
		}).field({
			id: 1,
			name: 1,
			src: 1,
			state: 1,
			focus: 1,
			month_sell: 1,
			page_id: 1,
			app_id: 1,
			score: 1,
			online: 1,
		}).get()
		return data.reduce((pre, item) => {
			pre[item._id] = setShopDefaultData(item);
			return pre;
		}, {})
	},
	/**
	 * 根据店铺id，查询信息
	 * @param {Object} id
	 */
	async getShopInfoById(id) {
		let {
			data
		} = await shopCollection.doc(id).field({
			id: 1,
			name: 1,
			src: 1,
			state: 1,
			focus: 1,
			month_sell: 1,
			page_id: 1,
			app_id: 1,
			score: 1,
			online: 1,
		}).get()
		if (data.length > 0) {
			return setShopDefaultData(data[0])
		}
		return {}
	},
	/**
	 * 动态处理缩略图，居中短边裁剪
	 * @param {Object} value
	 * @param {Object} fmt 宽x高 200x200
	 */
	thumbImg(value, fmt, type = "center") {
		if (!fmt) {
			fmt = "200x200";
		}
		if (!value) {
			return "/static/errorImage.jpg"
		}
		//可能出现地址里面有问号
		if (value.indexOf("?") > 0) {
			let [path, query] = value.split("?");
			value = path;
		}
		fmt = fmt.toLowerCase();
		if (value.indexOf("bspapp.com") > -1) {
			let wh = fmt.split("x");
			fmt = `w_${wh[0]},h_${wh[1]}`;
			//阿里云?x-oss-process=image/resize,m_fill,w_300,h_300
			return [value, "?x-oss-process=image/resize,m_fill,", fmt].join("");
		} else if (value.indexOf("qcloud.la") > -1) {
			//腾讯云?imageMogr2/crop/300x300/gravity/center
			return [value, "?imageMogr2/crop/", fmt, "/gravity/center"].join("");
		} else if (value.indexOf("7.nbgaofang.cn") > -1) {
			//七牛云?imageView2/1/w/200/h/200/q/75
			let wh = fmt.split("x");
			fmt = `w/${wh[0]}/h/${wh[1]}`;
			return [value, "?imageView2/1/", fmt, "/q/75"].join("");
		} else if (value.indexOf("360buyimg.com") > -1) {
			//京东采集图片
			return value.replace(/s(\d+)x(\d+)/, `s${fmt}`)
		} else if (value.indexOf("img.jxhh.com") > -1) {
			//聚合供应链
			//https://img.jxhh.com/ewei_shop_5fd72fe3bf0f3?imageMogr2/thumbnail/60x/strip/quality/75/format/jpg
			let wh = fmt.split("x");
			let maxWidth = Math.max(...wh);
			return [value, "?imageMogr2/thumbnail/", maxWidth, "x/strip/quality/75/format/jpg"].join("");
		}
		return value;
	},
	async getShopInfoUpdateSellCountById(id, day) {
		let {
			data
		} = await shopCollection.doc(id).field({
			id: 1,
			name: 1,
			src: 1,
			state: 1,
			focus: 1,
			month_sell: 1,
			day_sales: 1,
			last_update_sell_date: 1,
			page_id: 1,
			app_id: 1,
			score: 1,
			online: 1,
		}).get()
		if (data.length > 0) {
			let info = setShopDefaultData(data[0])
			let today = modles.getTodayTime(0, 1)
			let begin = modles.getTodayTime(-30, 1)
			let totalDay = modles.getTodayTime(-60, 1)
			let updates = {}
			if (info.day_sales) {
				if (!info.last_update_sell_date || info.last_update_sell_date != today) {
					//提取30天的记录	//提取有用的日期
					let days = Object.keys(info.day_sales).filter(e => e >= begin && e < today);
					let total = days.reduce((pre, d) => {
						pre += info.day_sales[d]
						return pre;
					}, 0)
					//@todo 删除没用的日志
					//保留1年内的销售日志
					day_sales = Object.keys(info.day_sales).filter(e => e >= totalDay).reduce((pre, d) => {
						pre[d] = info.day_sales[d]
						return pre;
					}, {})
					//更新数据库
					await shopCollection.doc(id).update({
						month_sell: total,
						last_update_sell_date: today,
						day_sales: cmd.set(day_sales)
					})
					info.month_sell = total
				}
			}
			//不需要反馈给前端
			delete info.day_sales
			delete info.last_update_sell_date
			return info;
		}
		return {}
	},
	getTodayTime(day = 0, check = false) {
		let time = new Date();
		time.setMinutes(0);
		time.setSeconds(0);
		time.setMilliseconds(0)
		if (check) {
			//由于时差问题，我们的0点，是utc的前一天16点
			time.setHours(time.getHours() + getTimeZone());
			time.setHours(getTimeZone() * -1);
		} else {
			time.setHours(0);
		}
		if (day != 0) {
			time.setDate(time.getDate() + day);
		}
		// console.log("getTodayTime", day, check, time.getTime())
		return time.getTime();
	},
	getDateByTime(timestamp) {
		let time;
		if (timestamp) {
			time = new Date(timestamp);
		} else {
			time = new Date();
		}
		time.setHours(getTimeZone());
		return time.getDate();
	},
	getNowHours() {
		let time = new Date();
		time.setHours(time.getHours() + getTimeZone());
		return time.getHours();
	},
}
const getTimeZone = function() {
	if (process.env.PATH && process.env.PATH.indexOf('C:\\Windows') > -1) {
		return 0;
	}
	return timeZone;
}

/**
 * 处理店铺默认信息
 * @param {Object} data
 */
const setShopDefaultData = function(data) {
	let fields = ["focus", "month_sell", "score"]
	fields.map(key => {
		if (!data[key]) {
			data[key + "_text"] = 0
		} else {
			data[key + "_text"] = data[key]
		}
		if (key == "score" && data[key] > 3) {
			data[key + "_text"] = data[key] + " 高"
		} else if (data[key] > 100000) {
			data[key + "_text"] = parseInt(data[key] / 10000) + "万"
		}
	})
	data.enable = data.state && data.online
	return data;
}
module.exports = modles
