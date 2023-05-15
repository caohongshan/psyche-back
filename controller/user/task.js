const { Controller } = require('../../common/uni-cloud-router')

module.exports = class TaskController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 *  所有任务
	 */
	async all() {
		const {	uid } = this.ctx.auth;
		return await this.service.user.task.getAll(uid);
	}
	/**
	 *  签到任务，算法比较特殊
	 */
	async signin() {
		let {
			task_id
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		let log = await this.service.user.task.save(uid, task_id);
		if (log.getScore) {
			//更新用户签到日志
			await this.service.user.user.editSignin(uid);
			let historyCount = 0;
			//查询最近7天的签到数据，会包含今天的签到
			let signMoreDays = this.ctx.getConfigs.config("user.signMoreDays");
			if (signMoreDays && signMoreDays > 0) {
				historyCount = await this.service.user.task.getContinuityHistoryLogCount(uid, task_id,
					signMoreDays);
			}
			let notice = log.task.name;
			let bounty = log.bounty;
			/* 第一天加2分， 第二天加3分， 第三天加4分， 第四天加5分, 第五天加6分 ,第六天加7分， */
			if (historyCount > 0) {
				bounty = log.bounty + historyCount;
				notice = `连续签到${historyCount}天，获得${bounty}积分`
				if (historyCount == signMoreDays) {
					//最后一天，抽奖
					let luckDraw = this.ctx.getConfigs.config("user.luckDraw");
					if (luckDraw && luckDraw.length > 0) {
						//抽奖，18分至88分。（18  28 48 68 88）
						let luck = luckDraw[parseInt(Math.random() * luckDraw.length)];
						bounty += luck
						notice += `，签满抽奖获得${luck}积分`;
					}
					log.luck = true;
					//更新任务为已抽奖
					await this.service.user.task.updateLuck(log._id);
				}
			}
			let {
				score
			} = await this.service.user.user.editScore(uid, bounty, `${notice}`, 0, {
				task: log
			});
			//系统每日积分总计
			await this.service.system.app.setScoreDayStatistics(score);
		}
		return log;
	}
	/**
	 *  分享
	 */
	async share() {
		let {
			task_id
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		let log = await this.service.user.task.save(uid, task_id);
		if (log.getScore) {
			let {
				score
			} = await this.service.user.user.editScore(uid, log.bounty, `${log.task.name}`, 0, {
				task: log
			});
			await this.service.system.app.setScoreDayStatistics(score);
		}
		return log;
	}
	/**
	 * 看视频加倍获取
	 */
	async getdouble() {
		let {
			task_id,
			data,
			module
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		let canMakeDouble = await this.service.task[module].checkDouble(uid, data);
		if (!canMakeDouble) {
			console.log("canMakeDouble", module, uid, data)
			return {
				code: -10,
				message: "已获得翻倍奖励"
			}
		}
		let task = await this.service.user.task.getTaskById(task_id);
		let notice = `${task.name}翻倍奖励`
		if (task.bounty) {
			task.bounty = task.bounty * task.multiple;
		} else {
			notice = `${task.name}`
			task.bounty = task.multiple;
		}
		let log = {};
		if (task) {
			//更新用户积分
			let {
				score
			} = await this.service.user.user.editScore(uid, task.bounty, notice, 0, {
				task: log
			});
			await this.service.system.app.setScoreDayStatistics(score);
			//更新子模块以获取双倍积分状态
			await this.service.task[module].afterSetDouble(uid, data);
			//更新日志积分数量
			log = await this.service.user.task.updateTodayLogBounty(uid, task_id, task.bounty)
		}
		//加倍结束
		task.multiple = 0;
		return {
			...log,
			getScore: true,
			getDouble: true,
			task,
			needMore: false,
			result: true
		};
	}
	/**
	 * 普通任务
	 */
	async finish() {
		let {
			task_id
		} = this.ctx.data;
		const {
			uid
		} = this.ctx.auth;
		let log = await this.service.user.task.save(uid, task_id);
		//领取失败
		if (log.task && log.task.bounty == 0) {
			log.getScore = log.result = false
		}
		if (log.getScore) {
			let {
				score
			} = await this.service.user.user.editScore(uid, log.task.bounty, `${log.task.name}`, 0, {
				task: log
			});
			await this.service.system.app.setScoreDayStatistics(score);
		}
		return log;
	}
}
