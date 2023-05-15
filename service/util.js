/**
 * 中国时差
 */
let timeZone = 8;

/**
 * 获取当天时间戳，写入数据和取出数据，不需要增加时差
 */
function getTodayTime(day = 0, check = false) {
	let time = new Date();
	time.setMinutes(0);
	time.setSeconds(0);
	time.setMilliseconds(0)
	if (check) {
		//由于时差问题，我们的0点，是utc的前一天16点
		time.setHours(time.getHours() + timeZone);
		time.setHours(timeZone * -1);
	} else {
		time.setHours(0);
	}
	if (day != 0) {
		time.setDate(time.getDate() + day);
	}
	return time.getTime();
}

/**
 * 根据时间戳，获得日期，存在8小时时差
 */
function getDateByTime(timestamp) {
	let time;
	if (timestamp) {
		time = new Date(timestamp);
	} else {
		time = new Date();
	}
	time.setHours(timeZone);
	return time.getDate();
}
/**
 * 获取当前的小时数，存在8小时时差
 */
function getNowHours() {
	let time = new Date();
	time.setHours(time.getHours() + timeZone);
	return time.getHours();
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
function dateFormat(format, timeStamp) {
	let _date;
	if (!timeStamp) {
		_date = new Date();
	} else {
		if (isNaN(timeStamp)) {

		} else if ('' + timeStamp.length <= 10) {
			timeStamp = +timeStamp * 1000;
		} else {
			timeStamp = +timeStamp;
		}
		_date = new Date(timeStamp);
	}
	//处理时差问题
	_date.setHours(_date.getHours() + timeZone);
	let Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	//周
	let week = {
		"0": "日",
		"1": "一",
		"2": "二",
		"3": "三",
		"4": "四",
		"5": "五",
		"6": "六"
	};
	if (/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
			week[_date
				.getDay() + ""]);
	}
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}

function getObjectValue(info, fields = []) {
	if (fields.length > 0) {
		return fields.reduce(function(pre, key) {
			pre[key] = info[key]
			return pre;
		}, {})
	}
	return info;
}

/**
 * 动态处理缩略图，居中短边裁剪
 * @param {Object} value
 * @param {Object} fmt 宽x高 200x200
 */
function thumbImg(value, fmt, func) {
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
		fmt = `w_${wh[0]}`;
		if (wh[1]) {
			fmt += `,h_${wh[1]}`
			func = "m_fill"
		}
		//阿里云?x-oss-process=image/resize,m_fill,w_300,h_300
		return [value, `?x-oss-process=image/resize,${func},`, fmt].join("");
	} else if (value.indexOf("qcloud.la") > -1) {
		if (!func) {
			func = "crop"
		}
		if (func == "thumb") {
			func = "thumbnail"
		}
		//腾讯云?imageMogr2/crop/300x300/gravity/center
		return [value, `?imageMogr2/${func}/`, fmt, "/gravity/center"].join("");
	} else if (value.indexOf("7.nbgaofang.cn") > -1) {
		//七牛云?imageView2/1/w/200/h/200/q/75
		let wh = fmt.split("x");
		fmt = `w/${wh[0]}/h/${wh[1]}`;
		return [value, "?imageView2/1/", fmt, "/q/75"].join("");
	} else if (value.indexOf("360buyimg.com") > -1) {
		//京东采集图片，去水印https://www.qyzhsm.cn/down/showdownload.php?id=21
		return value.replace(/s(\d+)x(\d+)/, `s${fmt}`).replace(/\.com\/(.*)\/s/g,".com/imgzone/s").replace(/\.com\/(.*)\/jfs/g,".com/imgzone/jfs")
	} else if (value.indexOf("img.jxhh.com") > -1) {
		//聚合供应链
		//https://img.jxhh.com/ewei_shop_5fd72fe3bf0f3?imageMogr2/thumbnail/60x/strip/quality/75/format/jpg
		let wh = fmt.split("x");
		let maxWidth = Math.max(...wh);
		return [value, "?imageMogr2/thumbnail/", maxWidth, "x/strip/quality/75/format/jpg"].join("");
	}
	return value;
}
module.exports = {
	getTodayTime,
	getDateByTime,
	getNowHours,
	dateFormat,
	getObjectValue,
	thumbImg
}
