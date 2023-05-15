const {	Controller } = require('../../common/uni-cloud-router')
module.exports = class RedbagController extends Controller {
	/**
	 * 查看是否有红包
	 */
	async info() {
		const {
			uid
		} = this.ctx.auth;
		let {
			type
		} = this.ctx.data;
		//查询此类型的红包领取情况
		let {
			APPID,
			PLATFORM,
			HOUSINGID
		} = this.ctx.context;
		console.log("检查红包配置", type, APPID, HOUSINGID)

		let redbag = await this.service.user.redbag.getInfoByType(type, APPID, HOUSINGID, PLATFORM)
		console.log(redbag)
		if (!redbag || redbag.stock < 1) {
			//领完了或者没有这个类型的红包
			return false;
		}
		let logCount = await this.service.user.redbag.getLogCountByUid(redbag._id, uid);
		console.log(logCount)
		//判断领取数量与限额之间的关系
		if (logCount && logCount >= redbag.get_limit) {
			//领取受限
			return false;
		}
		return redbag;
	}
	/**
	 * 领取红包
	 */
	async receive() {
		const {
			uid
		} = this.ctx.auth;
		let {
			_id
		} = this.ctx.data;
		//查询此类型的红包领取情况
		let {
			APPID,
			HOUSINGID
		} = this.ctx.context;
		let redbag = await this.service.user.redbag.getInfo(_id)
		console.log(redbag)
		if (!redbag || redbag.stock < 1 || !redbag.status) {
			//领完了或者没有这个类型的红包
			return {
				code: -1,
				message: "红包领完了"
			};
		}
		let logCount = await this.service.user.redbag.getLogCountByUid(redbag._id, uid);
		console.log(logCount)
		//判断领取数量与限额之间的关系
		if (logCount && logCount >= redbag.get_limit) {
			//领取受限
			return {
				code: -2,
				message: "领取超过限制"
			};
		}
		//计算领取金额
		if (redbag.moneys) {
			let moneys = redbag.moneys.split(",")
			redbag.money = parseInt(moneys[parseInt(Math.random() * moneys.length)] * 100)
		} else {
			//随机生成数字0.3-5
			redbag.money = parseInt(Math.max((Math.random() * 5).toFixed(2), 0.3) * 100);
		}
		//查询用户信息
		redbag.user = await this.service.user.user.getCurrentUserInfo(["wx_openid", "appid", "nickname",
			"avatar",
			"score", "mobile", "email"
		])

		//写入数据库
		const {
			id: log_id
		} = await this.service.user.redbag.saveLog(uid, redbag)
		redbag.log_id = log_id;
		//修改红包统计
		await this.service.user.redbag.saveStatic(redbag)
		//红包金额，默认放入余额，如果支付类型是微信，则自动创建提现记录
		await this.service.user.user.editBalance(uid, redbag.money, redbag.type_text + "红包", 99, {
			redbag
		})
		if (redbag.payment == "wxpay") {
			if (redbag.user.wx_openid) {
				let order = {
					outTradeNo: await this.service.user.user.genIdentityId("tian-user-cashouts", 1),
					total_fee: redbag.money,
					type: "cashout",
					title: redbag.type_text + "红包自动发放"
				};
				//调用余额
				await this.service.payment.balance.app(order, {
					_id: uid
				}, async (payInfo) => {
					console.log("回调处理订单状态")
					//处理各类订单支付完成之后的回调
				}, async (transaction, payInfo) => {
					console.log("扣款中回调")
					return await this.service.user.user.addCashout(order.total_fee, redbag
						.payment, uid, payInfo,
						redbag.user, order, transaction);
				});
			} else {
				//存入零钱
				redbag.payment = "balance"
				//写入到红包日志
				await this.service.user.redbag.updateLog(log_id, {
					payment: redbag.payment
				})
			}
		}
		return {
			code: 0,
			log_id,
			money: redbag.money / 100,
			payment: redbag.payment,
			message: "领取成功"
		};
	}
}
