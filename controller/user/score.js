const { Controller } = require('../../common/uni-cloud-router')

module.exports = class ScoreController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 * 转账
	 */
	async transfer() {
		const {
			uid
		} = this.ctx.auth;
		let {
			integral,
			mobile
		} = this.ctx.data;
		return this.service.user.score.transfer(uid, parseInt(integral), mobile);
	}

	async cashout_info() {
		let data = await this.service.user.user.getCurrentUserInfo([
			"balance", "score", "score_charge_rate", "score_cashout", "score_log",
		]);
		//计算积分情况，方便兑换
		if (!data.score_cashout) {
			data.score_cashout = {
				day: 0,
				money: 0,
				amount: 0
			};
		}
		if (data.score > 0) {
			await this.getMyScoreMoney(data);
		}
		return data;
	}

	async cashout() {
		const {
			uid
		} = this.ctx.auth;
		//可提现信息
		let {
			moneyList,
			score_cashout
		} = await this.cashout_info();
		if (moneyList.length == 0) {
			return {
				code: -1,
				message: "兑换记录获取失败"
			}
		}
		let {
			money,
			day,
			amount
		} = score_cashout.enable;
		//减少积分，
		let {
			score,
			balance
		} = await this.service.user.user.editScore(uid, amount * -1, "积分兑换现金", 99)
		console.log("扣除积分完成", score, balance)
		if (score && score != 0) {
			console.log("开始增加现金")
			//增加余额，
			let res2 = await this.service.user.user.editBalance(uid, money, "积分兑换现金", 99)
			console.log("修改用户兑换总计")
			//写入兑换总计
			await this.service.user.user.editScoreCashout(uid, {
				money,
				day,
				amount
			});
			console.log("新增兑换日志")
			//写入兑换日志
			await this.service.user.score.setCashoutLog(uid, {
				money,
				day,
				balance,
				amount
			});
			return true;
		}
		return {
			code: -1,
			message: "积分不足"
		}
	}


	/**
	 * 计算我可提现积分
	 * @param {Object} data
	 */
	async getMyScoreMoney(data) {
		let moneyList = await this.service.system.app.getNewMoney(data.score_cashout.day);
		//计算可提现金额
		if (moneyList.length > 0 && data.score_log) {
			let score = 0;
			let money = 0;
			let lastDay = 0;
			data.moneyList = []
			for (let item of moneyList) {
				//自己余额必须足够
				if (data.score_log[item.day] && score <= data.score) {
					score += data.score_log[item.day];
					money += item.money / item.value * data.score_log[item.day];
					data.moneyList.push(item)
					lastDay = item.day;
				}
			}
			data.score_cashout.enable = {
				amount: score,
				day: lastDay,
				money: parseInt(money)
			}
		}
	}
}
