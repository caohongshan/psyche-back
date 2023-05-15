const {
	Service
} = require('../../common/uni-cloud-router')
const {
	getObjectValue,
} = require('../util');
module.exports = class RedbagService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('tian-redbag')
		this.redUsercollection = db.collection('tian-redbag-users')
	}
	async updateLog(id, info) {
		return this.redUsercollection.doc(id).update(info);
	}
	async saveLog(uid, info) {
		return this.redUsercollection.add({
			...getObjectValue(info, ["dcloud_appid", "housing_appid", "payment", "money", "type",
				"type_text", "user"
			]),
			redbag_id: info._id,
			user_id: uid,
			create_date: Date.now(),
			update_date: Date.now(),
		})
	}
	async getLogCountByUid(redbag_id, uid) {
		const {
			total
		} = await this.redUsercollection.where({
			redbag_id,
			user_id: uid
		}).count();
		return total
	}
	async getLogByUid(redbag_id, uid) {
		const {
			data
		} = await this.redUsercollection.where({
			redbag_id,
			user_id: uid
		}).get();
		if (data.length == 0) {
			return false;
		}
		return data[0]
	}
	async saveStatic(redbag) {
		//修改统计，领取数量，领取金额
		const cmd = db.command;
		return this.collection.doc(redbag._id).update({
			get_count: cmd.inc(1),
			stock: cmd.inc(-1),
			total_money: cmd.inc(redbag.money),
			update_date: Date.now()
		})

	}
	async getInfoByType(type, dcloud_appid, housing_appid, PLATFORM) {
		const res = await this.collection.where({
			type,
			status: true,
			housing_appid,
			dcloud_appid,
			platforms: PLATFORM
		}).field({
			title: 1,
			blessing: 1,
			open: 1,
			type: 1,
			payment: 1,
			position: 1,
			auto_show: 1,
			status: 1,
			background: 1,
			avatar: 1,
			stock: 1,
			get_limit: 1,
			update_date: 1,
		}).get();
		if (res.data.length == 0) {
			return false;
		}
		return this.buildInfo(res.data[0]);
	}


	async getInfo(id) {
		const res = await this.collection.doc(id).get();
		if (res.data.length == 0) {
			return false;
		}
		return this.buildInfo(res.data[0]);
	}

	buildInfo(info) {
		//处理信息
		if (info.avatar) {
			info.avatar = info.avatar.url
		}
		if (info.background) {
			info.background = info.background.url
		}

		const types = {
			"newpeople": "新人注册",
			"addcircle": "小区圈发帖"
		}
		info.type_text = types[info.type]
		// if (info.moneys) {
		// 	let moneys = info.moneys.split(",")
		// 	info.money = moneys[parseInt(Math.random() * moneys.length)] //输出的带小数，将来到账转化为分
		// } else {
		// 	//随机生成数字0.3-5
		// 	info.money = Math.max((Math.random() * 5).toFixed(2), 0.3);
		// }
		return info;
	}
}
