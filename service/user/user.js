const { Service } = require('../../common/uni-cloud-router')
const { getTodayTime } = require('../util');
//全局变量，所有人都可以使用
let inviterMap = {};

module.exports = class UserService extends Service {
	constructor(ctx) {
		super(ctx)
		this.usersTable = 'uni-id-users';
		this.balanceTable = 'uni-id-balances';
		this.cashoutTable = 'tian-user-cashouts';
		this.collection = db.collection('uni-id-users')
		this.scoreCollection = db.collection('uni-id-scores')
		this.balanceCollection = db.collection('uni-id-balances')
		this.cashoutsCollection = db.collection('tian-user-cashouts')
		this.signinDays = 30;
	}
	/**
	 * 验证token是否有效
	 */
	async checkToken(token, needUserInfo = false) {
		if (!token) {
			return {}
		}
		const auth = await this.ctx.uniID.checkToken(token, {
			needPermission: true,
			needUserInfo
		})
		// console.log("check token", token, needUserInfo)
		if (auth.code) {
			// 校验失败，抛出错误信息
			return {};
		}
		auth.todayTime = getTodayTime(0, true);
		this.ctx.auth = auth // 设置当前请求的 auth 对象
	}

	async getCurrentUserInfo(field = []) {
		//最基础几个字段，防止后面没有值
		let defConfig = {
			balance: 0,
			score: 0,
			coupon: 0,
			// member: {}
		}
		if (!this.ctx.auth) {
			return {}
		}
		let info = await this.collection.findOne({
			my_invite_code: this.ctx.auth.user_id
		})
		return {
			...defConfig,
			...info
		};
	}

	async getUserInfoByInviteCode(code) {
		let {
			data
		} = await this.collection.where({
			my_invite_code: `${code}`
		}).field({
			nickname: 1,
			channel_code: 1,
			inviter_uid: 1,
			statistics: 1,
			mobile: 1,
			avatar: 1,
		}).limit(1).get();
		if (data.length > 0) {
			return data[0]
		}
		return false;
	}

	// 登录记录
	async loginLog(res = {}, params, type = 'login') {
		const now = Date.now()
		const uniIdLogCollection = db.collection('uni-id-log')
		let logData = {
			deviceId: params.deviceId || this.ctx.DEVICEID,
			ip: params.ip || this.ctx.CLIENTIP,
			type,
			create_date: now
		};

		Object.assign(logData,
			res.code === 0 ? {
				user_id: res.uid,
				state: 1
			} : {
				state: 0
			})

		return uniIdLogCollection.add(logData)
	}
	/**
	 * 根据渠道号，查询渠道用户信息，包含openid，在使用到的地方，需要增加字段，再修改此方法
	 * @param {Object} code
	 */
	async getChannelUserByCode(code, fields = []) {
		if (!fields) {
			fields = []
		}
		if (!code) {
			return false
		}
		return this.ctx.memorycache("channel_user_" + [code].concat(fields).join("_"), null, 3600, async () => {
			let {
				data
			} = await db.collection("uni-id-channel").where({
				id: `${code}`
			}).field({
				rebate_money_rate: 1,
				user_id: 1
			}).get();
			if (data.length > 0) {
				let channel_uid = data[0].user_id;
				if (channel_uid) {
					let user = await this.getInfoById(channel_uid, [
						...fields,
						"nickname", "mobile", "avatar", "wx_openid", "id", "channel_code"
					])
					//渠道返利到零钱，自行提现
					return {
						...user,
						rebate_money_rate: data[0].rebate_money_rate ? data[0].rebate_money_rate : 0
					}
				}
			}
			return false;
		});
	}
	async setPush(uid, data) {
		return await this.ctx.uniID.updateUser({
			uid: uid,
			push: data,
			update_time: Date.now()
		});
	}

	/**
	 * 邀请码设置邀请关系
	 * @param {Object} uid
	 * @param {Object} inviteCode
	 */
	async setInviteByCode(uid, inviteCode) {
		return await this.ctx.uniID.acceptInvite({
			uid,
			inviteCode
		});
	}
	/**
	 * 设置邀请
	 * @param {Object} uid
	 * @param {Object} mobile
	 */
	async setInviteUidByMobile(uid, my_invite_code) {
		let inviter = inviterMap[uid];
		//邀请人uid，按层级从下往上排列的uid数组，即第一个是直接上级
		let uidUser = await this.collection.find({ my_invite_code : Number(uid) }).project({ inviter_uid: 1 }).toArray();
		//邀请者的上级,这里强制限制只能存在2级邀请,inviter_uid数组，存在1-2个id
		let myInviters = [uid];
		if (uidUser[0].inviter_uid && uidUser[0].inviter_uid.length > 0) {
			myInviters.push(uidUser[0].inviter_uid[0])
		}
		await this.collection.updateOne({ my_invite_code }, { $set: { inviter_uid: myInviters, invite_time: Date.now(), update_time: Date.now() } })
		return {
			code: 0,
			message: "绑定成功"
		};
	}
	/**
	 * 查询我的团队信息
	 * @param {Object} uid
	 */
	async getInviteInfo(uid) {
		let info = await db.collection('uni-id-users').find({ 
			my_invite_code: uid
		}, { 
			inviter_uid: 1, //邀请者列表 
			teamSignin: 1, //我的团队日签到统计 
			signin: 1, 
			score_log: 1, 
			statistics: 1
		}).toArray();
		if (info.length == 0 || !info[0].inviter_uid || info[0].inviter_uid.length == 0) {
			return false;
		}
		info = info[0];
		//所有上级，通过二维码邀请，可以看到多级邀请者,这里只取2级
		let inviter_uid = info.inviter_uid;
		//除去重复的邀请人
		if (inviter_uid && inviter_uid.length > 1) {
			let extIds = [];
			inviter_uid.map(id => {
				if (extIds.indexOf(id) == -1) {
					extIds.push(id);
				}
			})
			inviter_uid = extIds;
		}
		let inviters = inviter_uid;
		//直接上级(第一个用户)
		let last_invite = inviters[0];
		inviters = await this.getMyInviterById(inviters);

		let today = getTodayTime(0, 1);
		let before30day = getTodayTime(this.signinDays * -1, 1);
		// 直接推荐
		let zhiRes = await this.collection.countDocuments({
			"inviter_uid.0": String(uid)
		})
		// 间接推荐
		let jianRes = await this.collection.countDocuments({
			"inviter_uid.1": String(uid)
		})
		let todayRate = "0.00";
		let monthRate = "0.00";
		let total = zhiRes + jianRes;
		// 今日邀请
		let todayRes = await this.collection.countDocuments({
			inviter_uid: String(uid),
			invite_time: { $gt: today }
		});
		let todayZhiRes = await this.collection.countDocuments({
			"inviter_uid.0": String(uid),
			invite_time: { $gt: today }
		});
		// 昨日邀请
		let yestodayRes = await this.collection.find({
			inviter_uid: String(uid),
			invite_time: { $gt: getTodayTime(-1, 1), $lt: today },
		});
		let yestodayZhiRes = await this.collection.find({
			"inviter_uid.0": String(uid),
			invite_time: { $gt:getTodayTime(-1, 1),$lt :today},
		});
		// 近7日邀请
		let weekRes = await this.collection.countDocuments({
			inviter_uid: String(uid),
			invite_time: { $gt: getTodayTime(-7 ,1)}
		});
		let weekZhiRes = await this.collection.countDocuments({
			"inviter_uid.0": uid,
			invite_time: { $gt: getTodayTime(-7 ,1)}
		});
		// 近30日邀请
		let monthRes = await this.collection.countDocuments({
			inviter_uid: String(uid),
			invite_time: { $gt: before30day }
		});
		let monthZhiRes = await this.collection.countDocuments({
			"inviter_uid.0": String(uid),
			invite_time: { $gt: before30day }
		});
		this.build30DaysRate(info, today, before30day, getTodayTime(-1, 1), getTodayTime(-7, 1));
		if (total > 0) {
			// 计算今日签到率
			if (info.teamSignin && info.teamSignin[today]) {
				todayRate = (info.teamSignin[today] / total * 100).toFixed(2);
			}
			info.statistics = {
				invite_all_total: total, //总的邀请人数
				invite_total: zhiRes, //直推人数
				today_rate: todayRate, //今日签到率

				today_total: todayRes,
				yestoday_total: yestodayRes.total,
				week_total: weekRes.total,
				month_total: monthRes,

				today_zhi_total: todayZhiRes,
				yestoday_zhi_total: yestodayZhiRes.total,
				week_zhi_total: weekZhiRes.total,
				month_zhi_total: monthZhiRes.total,

				today,
				month: before30day
			};
			//临时存一下，方便上级统计
			await this.collection.updateOne(
				{ uid: String(uid) },
				{ $set: { statistics: info.statistics } }
			);
		}
		return {
			...info,
			legend: {
				todaySignRate: "今日签到率",
				todaySign: "今日签到",
				monthSignRate: "近30日签到率"
			},
			last_invite,
			todayRate,
			monthRate,
			total: total,
			zhijie: zhiRes,
			todayTotal: todayRes,
			monthTotal: monthRes,
			inviters
		}
	}

	/**
	 * 分页获取接受邀请的用户清单
	 * @param {Object} uid
	 * @param {string} time today|yestoday|week|month
	 * @param {Object} level 0所有，1第一级，2第二级
	 * @param {Object} page
	 * @param {Object} limit
	 */
	async getInviteUser(uid, time, level, page, limit, config) {
		let condition = {};
		if (time) {
			condition = this.getTimeCondition(time)
		}
		const cmd = db.command;
		if (level > 0) {
			condition["inviter_uid." + (level - 1)] = uid;
		} else {
			//所有下级
			condition["inviter_uid"] = uid;
		}

		//signin ,只保留最近40条记录的日期列表
		let data = await this.collection.find(condition, {
				invite_time: 1,
				nickName: 1,
				signin: 1,
				mobile: 1,
				avatarUrl: 1,
				score_log: 1,
				 statistics: { $slice : [ "$statistics", -1 ] }
			  }).sort({ "statistics.invite_all_total": -1 }).skip((page - 1) * limit).limit(limit).toArray();
		//计算签到率,当天是否签到
		let today = getTodayTime(0, 1);
		let before30day = getTodayTime(this.signinDays * -1, 1);
		data.forEach(usr => {
			this.build30DaysRate(usr, today, before30day);
		})
		return data;
	}

	getTimeCondition(t) {
		let today = getTodayTime(0, 1)
		let days = {
			today: {
			  invite_time: { $gt: today }
			},
			yestoday: {
			  invite_time: { $gt: getTodayTime(-1, 1), $lt: today }
			},
			week:{
			  invite_time:{ $gt:getTodayTime(-7,1)}
			 },
			 month:{
			   invite_time:{ $gt:getTodayTime(-30,1)}
			 }
		  }
		return days[t]
	}

	build30DaysRate(usr, today, before30day, yestoday, weekday) {
		if (!usr.signin) {
			usr.signin = [];
		}
		//今日签到
		usr.todaySignin = usr.signin.indexOf(today) != -1;
		//提取签到有效时间
		usr.signin = usr.signin.filter(t => t > before30day);
		//签到比例
		usr.signinRate = parseInt(usr.signin.length / this.signinDays * 10000) / 100;
		usr.signinLength = usr.signin.length;
		delete usr.signin;

		//score_log,积分获得情况
		usr.scores = {
			today: 0,
			yestoday: 0,
			week: 0,
			month: 0,
		};
		if (usr.score_log) {
			usr.scores.today = usr.score_log[today] ? usr.score_log[today] : 0
			if (yestoday) {
				usr.scores.yestoday = usr.score_log[yestoday] ? usr.score_log[yestoday] : 0
			}
			if (weekday) {
				for (let key in usr.score_log) {
					if (key >= weekday) {
						usr.scores.week += usr.score_log[key];
					}
				}
			}
			for (let key in usr.score_log) {
				if (key >= before30day) {
					usr.scores.month += usr.score_log[key];
				}
			}
		}
	}
	async editScoreCashout(uid, {
		money,
		day,
		amount
	}) {
		const cmd = db.command;
		return await this.collection.doc(uid).update({
			score_cashout: {
				day,
				money: cmd.inc(money),
				amount: cmd.inc(amount)
			}
		});
	}
	async update(uid, data, pushData) {
		const cmd = db.command;
		if (pushData) {
			for (let key in pushData) {
				data[key] = cmd.push(pushData[key])
			}
		}
		return this.collection.doc(uid).update(data);
	}
	/**
	 * 字段递增
	 * @param {Object} uid
	 * @param {Object} incData
	 */
	async updateInc(uid, incData) {
		console.log("更新用户递增", incData)
		const cmd = db.command;
		let data = {}
		for (let key in incData) {
			data[key] = cmd.inc(incData[key])
		}
		return this.collection.doc(uid).update(data);
	}
	async edit(uid, data, filter = []) {
		let save_data = {
			update_time: Date.now()
		}
		if (filter.length > 0) {
			//过滤data
			for (let key in data) {
				if (filter.indexOf(key) != -1) {
					save_data[key] = data[key]
				}
			}
		} else {
			save_data = data;
		}
		return await this.collection.updateOne({ my_invite_code: uid }, {"$set": save_data})
		
		// return await this.ctx.uniID.updateUser({
		// 	uid,
		// 	...save_data
		// })
	}

	async deleteUser(uid) {
		//先备份用户表，再删除
		const {
			data
		} = await this.collection.doc(uid).get();
		if (data.length == 0) {
			return {
				code: -1,
				message: "注销失败"
			};
		}
		//直接uni-id-users-backup不允许创建
		try {
			//可能不存在此表
			await db.collection("backup-uni-id-users").add(data[0])
		} catch (e) {
			//TODO handle the exception
		}
		return await this.collection.doc(uid).remove();
	}

	/**
	 * 更新用户积分，以及积分日志
	 */
	async editScore(uid, amount, comment, level = 0, log = {}) {
		if (amount == 0) {
			//0积分，不做任何操作
			return 0;
		}
		let today = getTodayTime(0, 1);
		const cmd = db.command;
		let updateData = {
			score: cmd.inc(amount),
			// update_time: Date.now()
		};
		let condition = {
			_id: uid
		}
		if (amount > 0) {
			//当日获得积分总计
			updateData["score_log"] = {
				[today]: cmd.inc(amount)
			}
		} else {
			//永远是负数
			updateData["score_consume_log"] = {
				[today]: cmd.inc(amount)
			}
			condition["score"] = cmd.gte(amount * -1);
		}
		let {
			updated
		} = await this.collection.where(condition).update(updateData);
		if (!updated) {
			console.log("增加用户积分，可惜用户不存在1")
			return 0;
		}
		//查询出最后的积分
		let {
			data
		} = await this.collection.doc(uid).field({
			score: 1,
			nickname: 1,
			avatar: 1,
			my_invite_code: 1,
			mobile: 1,
			inviter_uid: 1
		}).get();
		if (data.length == 0) {
			console.log("增加用户积分，可惜用户不存在")
			return 0;
		}
		let info = data[0];
		let balance = info.score;
		await this.scoreCollection.add({
			user_id: uid,
			user: info, //冗余存储，避免后台关联查询
			log, //冗余存储，增加积分的来源信息
			score: amount,
			type: amount > 0 ? 1 : 2,
			balance,
			comment,
			create_date: Date.now()
		})

		let {
			reward_level,
			reward_rates
		} = this.ctx.getConfigs.config("user.score");
		let reward = 0;
		console.log("editScore", level, reward_level,
			reward_rates)
		//直推邀请人获得奖励
		if (amount > 0 && level < reward_level && info.inviter_uid && info.inviter_uid.length > 0 &&
			reward_rates.length >
			0) {
			let parentAmount = reward_rates[level] * amount;
			if (level == 0) {
				let nickname = info.nickname ? info.nickname : "好友"
				comment = `${nickname}${comment}奖励`
			}
			level++;
			let rewardData = await this.editScore(info.inviter_uid[0], parentAmount, comment, level, log);
			if (rewardData) {
				reward = rewardData.score;
			}
		}
		return {
			score: amount + reward,
			balance
		};
	}

	async getScoreLogByTaskLogId(id) {
		let {
			data
		} = await this.scoreCollection.where({
			"log.task._id": id
		}).limit(1).get();
		if (data.length == 0) {
			return false;
		}
		return data[0]
	}

	/**
	 * 记录当前用户的签到记录，最近30天
	 * @param {Object} uid
	 */
	async editSignin(uid) {
		let today = getTodayTime(0, 1);
		const cmd = db.command;
		//更新自己的签到数据
		await this.collection.doc(uid).update({
			signin: cmd.push({
				each: [today],
				slice: -30,
			}),
			update_time: Date.now()
		})
		//更新团队的签到统计 实时查询邀请者，缓存中的邀请信息，很有可能不准确
		let info = await this.getCurrentUserInfo(["inviter_uid"]);
		if (info.inviter_uid) {
			//更新团队统计，多余数据，另外开定时器，每天清理
			await this.collection.where({
				_id: cmd.in(info.inviter_uid)
			}).update({
				teamSignin: {
					[today]: cmd.inc(1)
				}
			})
		}
	}


	/**
	 * 修改余额 
	 * @param {Object} uid
	 * @param {Object} amount
	 * @param {Object} comment
	 */
	async editBalance(uid, amount, comment, level = 0, log = {}, callback = false) {
		const { inviter_uid } = await db.collection(this.usersTable).findOneAndUpdate(
			{ my_invite_code: log.user_id },
			{
				$set: { period: log.period },
				$inc: { balance: -log.total_fee }
			}
		)
		
		if(inviter_uid[0]) { // 直接上级获得佣金
			const user0 = await db.collection(this.usersTable).findOneAndUpdate(
				{ my_invite_code: Number(inviter_uid[0]) },
				{
					$inc: { balance: log.total_fee * 0.05 }
				}
			)

			db.collection(this.balanceTable).insertOne({
				user_id: Number(inviter_uid[0]),
				amount: amount,
				type: amount > 0 ? 1 : 2,
				balance: user0.value.balance,
				comment,
				log, //冗余存储，来源信息
				create_date: Date.now()
			})
		}

		if(inviter_uid[1]) {
			const user1 = await db.collection(this.usersTable).findOneAndUpdate(
				{ my_invite_code: Number(inviter_uid[1]) },
				{
					$inc: { balance: log.total_fee * 0.01 }
				}
			)

			db.collection(this.balanceTable).insertOne({
				user_id: Number(inviter_uid[1]),
				amount: amount,
				type: amount > 0 ? 1 : 2,
				balance: user1.value.balance,
				comment,
				log, //冗余存储，来源信息
				create_date: Date.now()
			})
		}
	}



	/**
	 * 修改余额 
	 * @param {Object} uid
	 * @param {Object} amount
	 * @param {Object} comment
	 */
	async editBalanceInit(uid, amount, comment, level = 0, log = {}, callback = false) {
		console.log("开始editBalance");
		const cmd = db.command;
		//开启事务，保证扣除余额与日志一致
		const transaction = await db.startTransaction();

		try {
			//2021-11-04腾讯云不支持事务中使用updateAndReturn
			//https://uniapp.dcloud.net.cn/uniCloud/cf-database.html#update
			let { 
				updated, 
				doc: info
			} = await transaction.collection(this.usersTable).where({
				_id: uid
			}).updateAndReturn({
				balance: cmd.inc(amount),
				total_money: amount > 0 ? cmd.inc(amount) : cmd.inc(0)
			});
			let balance = info.balance;
			//减少余额
			if (amount < 0 && balance < 0) {
				console.log("余额不足")
				await transaction.rollback(-100);
				return {
					code: -1,
					message: "余额不足"
				};
			}
			console.log("支付后余额", balance)
			let { id } = await transaction.collection(this.balanceTable).add({
				user_id: uid,
				amount: amount,
				type: amount > 0 ? 1 : 2,
				balance,
				comment,
				log, //冗余存储，来源信息
				create_date: Date.now()
			})
			console.log("结束扣款");
			let payInfo = {
				code: 0,
				balance,
				userInfo: {
					_id: info._id,
					balance: info.balance,
					avatar: info.avatar,
					nickname: info.nickname
				},
				transaction_id: id, //交易单号
			}
			if (callback) {
				//如果存在中途回调，必须有返回值
				let cResult = await callback(transaction, payInfo);
				if (!cResult) {
					await transaction.rollback(-100);
					return {
						code: -1,
						message: "处理失败"
					};
				}
			}
			console.log("结束editBalance1");
			await transaction.commit();
			console.log("结束editBalance2");
			return payInfo;
		} catch (e) {
			try {
				console.log(e);
				await transaction.rollback(-100);
			} catch (e2) {
				console.log("回滚事务失败");
				console.log(e2);
			}
			return {
				code: -1,
				message: "系统错误"
			};
		}
	}

	async getInviterInfoByMobiles(mobiles) {
		const cmd = db.command;
		const {
			data
		} = await this.collection.where({
			mobile: cmd.in(mobiles)
		}).field({
			mobile,
			inviter_uid: 1
		});
		return data;
	}


	/**
	 * 生成唯一id
	 * @param {Object} key
	 * @param {Int} inc 递增数字,默认1
	 * @param {Int} start 开始号码
	 */
	async genIdentityId(key, inc, start = 1) {
		//生成用户id----开始-----
		const res = await db.collection('tian-identity').findOneAndUpdate(
			{ key },
			{ $inc: { value: +inc } },
		);
		if(!res.value) {
			await db.collection('tian-identity').insertOne({ key, value: start });
		}
		return res.value ? res.value.value : 0;
	}

	/**
	 * 检测邀请码是否有效，否则重新生成
	 * @param {Object} data
	 */
	async updateUserMyInviteCode(data) {
		let uid = data.uid ? data.uid : data._id;
		if (!uid) {
			return false;
		}
		if (!data.my_invite_code || data.my_invite_code == data.mobile) {
			//重新生成邀请码
			let my_invite_code = await this.genIdentityId("uni-id-users", 1);
			data.my_invite_code = my_invite_code;
			await this.ctx.uniID.updateUser({
				uid: uid,
				my_invite_code: `${my_invite_code}`
			});
		}
	}

	async getInfoById(id, fields = []) {
		let field = {}
		if (fields.length == 0) {
			fields = ["nickname", "mobile", "avatar", "id", "score"];
		}
		for (let s of fields) {
			field[s] = 1;
		}
		let {
			data
		} = await this.collection.doc(id).field(field).get();
		if (data.length == 0) {
			console.log("用户信息不存在", id)
			return false;
		}
		return data[0];
	}
	/**
	 * 查询我邀请了多少人，直接或者间接都算
	 * @param {Object} uid
	 */
	async getInviteCount(uid) {
		let {
			total
		} = await this.collection.where({
			inviter_uid: uid
		}).count();
		return total;
	}
	/**
	 * 查询多个用户信息
	 */
	async getInfoByIds(ids, fields = [], isMap = false) {
		const cmd = db.command;
		let field = {}
		if (fields.length == 0) {
			fields = ["nickname", "mobile", "avatar", "id", "score"];
		}
		for (let s of fields) {
			field[s] = 1;
		}
		let {
			data
		} = await this.collection.where({
			_id: cmd.in(ids)
		}).field(field).get();
		if (data.length == 0) {
			return false;
		}
		if (isMap) {
			//转化为map对象
			return data.reduce(function(pre, item) {
				pre[item._id] = item;
				return pre;
			}, {})
		}
		return data[0];
	}

	/**
	 * 根据用户id，查询邀请信息
	 * @param {Object} id
	 */
	async getMyInviters(id) {
		// 2022-01-01，增加推广渠道信息
		let userInfo = await this.getInfoById(id, ["nickname", "mobile", "avatar", "inviter_uid",
			"channel_code"
		]);
		if (!userInfo) {
			return {
				userInfo: {},
				inviters: [],
				channel: {}
			};
		}
		let inviters = await this.getMyInviterById(userInfo.inviter_uid);
		let channel = {};
		if (userInfo.channel_code) {
			channel = await this.getChannelUserByCode(userInfo.channel_code)
		}
		//设置佣金比例
		inviters.forEach((inviter, index) => {
			inviter.state = 0; //返利状态，0未结算，1已结算
			inviter.score = 0;
			inviter.money = 0;
		})
		return {
			userInfo,
			inviters,
			channel
		}
	}

	async getMyInviterById(inviters) {
		if (!inviters || inviters.length == 0) {
			return [];
		}
		//系统邀请码
		let sysCode = this.ctx.getConfigs.config("user.inviteCode");
		//邀请者称呼
		let inviterCall = this.ctx.getConfigs.config("user.inviter_call");
		//先邀请的，肯定在最上面
		let inviterData = await this.collection.find({
			uid: { $in: inviters },
			my_invite_code: { $nin: sysCode }
		  }).project({
			avatarUrl: 1,
			nickName: 1,
			mobile: 1,
			statistics: 1,
			invite_time: 1,
			my_invite_code: 1
		  }).toArray();
		//按照id，来显示
		let usrMap = {}
		if (inviterData.length > 0) {
			inviterData.map(usr => {
				usrMap[usr.my_invite_code] = usr;
			})
		}
		return inviters.map((id, index) => {
			//限制输出的邀请层级
			if (usrMap[id] && inviterCall[index]) {
				return {
					...usrMap[id],
					callname: inviterCall[index]
				}
			}
			return false;
		}).filter(e => e);
	}

	/**
	 * 根据手机号查询用户
	 * @param {Object} mobile
	 * @param {Array} fields
	 */
	async getInfoByMobile(mobile, fields = []) {
		let field = {
			dcloud_appid: 1
		}
		if (fields.length == 0) {
			fields = ["nickname", "mobile", "avatar", "score"];
		}
		for (let s of fields) {
			field[s] = 1;
		}
		let {
			data
		} = await this.collection.where({
			mobile: `${mobile}`,
		}).field(field).limit(1).get();
		data = this.getCurrentAppUser(data);
		if (data.length == 0) {
			console.log("用户信息不存在", mobile)
			return false;
		}
		return data[0];
	}

	getCurrentAppUser(userList) {
		const dcloudAppid = this.ctx.context.APPID
		return userList.filter(item => {
			// 空数组不允许登录
			return item.dcloud_appid === undefined || item.dcloud_appid === null || item.dcloud_appid
				.indexOf(dcloudAppid) > -1
		})
	}

	async getMobileWithWxCrypt(data) {
		return await this.ctx.uniID.wxBizDataCrypt(data);
	}

	async bindMobileWithWxCrypt(data, uid) {
		let res = await this.ctx.uniID.wxBizDataCrypt(data)
		console.log(res)
		if (res.code == 0) {
			//判断系统里面是否已经存在手机号，需要合并手机号
			let mobile = res.phoneNumber;
			let {
				data: infoData
			} = await this.collection.where({
				dcloud_appid: this.ctx.context.APPID,
				mobile,
			}).field({
				inviter_uid: 1,
				wx_openid: 1,
				avatar: 1,
				gender: 1,
				nickname: 1,
			}).limit(1).get();
			if (infoData.length == 0) {
				//解密成功，更新手机号
				await this.ctx.uniID.updateUser({
					uid,
					mobile_confirmed: 1,
					mobile
				})
			} else if (infoData[0]._id == uid) {
				return res;
			} else {
				let userInfo = infoData[0];
				let platform = this.ctx.context.PLATFORM;
				if (userInfo.wx_openid && userInfo.wx_openid[platform]) {
					//此手机号已经绑定微信
					return {
						code: -1,
						message: "此手机号已绑定其他微信"
					}
				}
				//@todo 合并账户

			}
		}
		return res;
	}

	/**
	 * 用户绑定微信
	 * @param {Object} code
	 * @param {Object} uid
	 */
	async bindWeixinByCode(code, uid) {
		console.log("bindWeixinByCode code:", code, uid)
		const res = await this.ctx.uniID.bindWeixin({
			uid: uid,
			code: code
		})
		console.log("bindWeixinByCode", res)
		return res;
	}
	async bindWeixinByInfo(info, uid) {
		console.log("bindWeixinByInfo:", info, uid)
		//一个微信允许绑定多个账户，但是一个用户只能绑定一个微信
		let userInfo = await this.getInfoById(uid, ["wx_openid", "wx_unionid"]);
		if (userInfo.wx_openid && userInfo.wx_openid["app"] == info.openid) {
			return {
				code: -1,
				message: "已绑定微信"
			}
		} else if (userInfo.wx_unionid && userInfo.wx_unionid != info.unionid) {
			return {
				code: -2,
				message: "绑定主体不一致"
			}
		}
		const cmd = db.command;
		return await this.collection.doc(uid).update({
			wx_unionid: info.unionid,
			wx_openid: {
				"app": info.openid
			},
			weixin: info
		});
	}
	async getWeixinUserInfo({
		access_token,
		openid
	}) {
		//https://api.weixin.qq.com/sns/userinfo?
		//access_token=46_SYnmMHbU_vFzfUx2mtHjQeVTBTTEobEE6CSTH2E37zxzFWPm-TC_UX_paIMwqgyx2Uhj2SHvU1mrFlKgtojXgdboQdltyGS1fcgl5sGuPl4
		//&openid=ofWg95y9_tuLMhFqVjbf9IY4htnk
		const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/sns/userinfo", {
			method: 'GET',
			data: {
				access_token,
				openid
			},
			contentType: 'json', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		});
		console.log("getWeixinUserInfo", res.data)
		return res.data;
	}
	/**
	 * 账户提现
	 * @param {Object} amount
	 * @param {Object} user_id
	 * @param {Object} payInfo
	 */
	async cashout(amount, mode, user_id, payInfo, info) {
		const newCashout = {
			user_id,
			amount,
			status: 0,
			mode,
			process_time: Date.now(),
			platform: this.ctx.context.PLATFORM,
			user: info,
			balance: payInfo.balance,
			payInfo,
			update_time: Date.now(),
			create_time: Date.now()
		};
		

		this.collection.findOneAndUpdate({my_invite_code: user_id}, {
			$inc: { balance: -amount }
		})

		return await this.cashoutsCollection.insertOne(newCashout);
	}
	/**
	 * 账户提现
	 * @param {Object} amount
	 * @param {Object} user_id
	 * @param {Object} payInfo
	 */
	async addCashout(amount, mode, user_id, payInfo, info, order) {
		
		let platform = this.ctx.context.PLATFORM;
		//判断微信是否在对应的微信平台申请提现，否则默认第一个平台
		// if (mode == "wxpay") {
		// 	let plts = Object.keys(info.wx_openid);
		// 	if (plts.indexOf(platform) == -1) {
		// 		platform = plts[0];
		// 	}
		// }
		let status = 0;
		//判断系统是否自动到账
		let is_verify = this.ctx.getConfigs.config("transfers.is_auto_verify");
		if (!!is_verify && (mode == "wxpay" || mode == "alipay")) {
			//调用转账接口，只有微信才能这样处理
			status = 1;
		}

		// const transaction = await db.startTransaction();

		// const newCashout = {
		// 	outTradeNo: order.outTradeNo,
		// 	user_id,
		// 	amount,
		// 	status:0,//审核中，1审核通过，2拒绝，3通过不付款
		// 	mode,
		// 	process_time: Date.now(),//执行定时器时间
		// 	platform,
		// 	dcloud_appid: this.ctx.context.APPID, //应用id
		// 	user: info,
		// 	balance: payInfo.balance,
		// 	payInfo,
		// 	update_time: Date.now(),
		// 	create_time: Date.now(),
		// }

		// return await transaction.collection(this.cashoutTable).insertOne(newCashout)
	}

	async getCashoutById(id) {
		let {
			data
		} = await this.cashoutsCollection.doc(id).get();
		// console.log("getCashoutById", data)
		if (data.length > 0) {
			return data[0]
		}
		return false
	}
	async cashoutSave(id, data) {
		return await this.cashoutsCollection.doc(id).update({
			...data,
			update_time: Date.now(),
		})
	}
	/**
	 * 查询未付款成功的提现
	 */
	async getUnpayCashout(limit = 10) {
		const cmd = db.command;
		let {
			data
		} = await this.cashoutsCollection.where({
			status: 1,
			process_time: cmd.lte(Date.now()),
			payment: cmd.exists(false)
		}).limit(limit).get();
		return data;
	}
}
