const { Service } = require('../../common/uni-cloud-router')

module.exports = class BalanceService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = db.collection('uni-id-address')
	}

    async app(order, id, func1, func2) {
        let res = await func1(order)  // first part of the task, e.g. fetching balance and address from the user's account.
        let balance = res.balance // balance of the user's address. e.g. 10000.
        let address = res.address // address of the user's account. e.g. 0x5409ed021d9302ca38059c
        let balance2 = await func2(address, balance) // second part of the task, e.g. using the user's address and balance to
        return { balance, address, balance2 }
    }

}