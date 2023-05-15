const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 银行卡识别
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.bankcard.html
 */
module.exports = class BankcardService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "bankcard";
		this.url = "/cv/ocr/bankcard"
	}

	/**
	 * 返回值处理
	 * @param {Object} content
	 */
	async getMessageResult(content) {
		console.log(content)
		return {
			...content,
			account_number: content.number
		};
	}
}
