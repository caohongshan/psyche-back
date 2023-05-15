const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 身份证
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.idcard.html
 */
module.exports = class IdcardService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "idcard";
		this.url = "/cv/ocr/idcard"
	}


	/**
	 * 返回值处理
	 * @param {Object} content
	 */
	async getMessageResult(content) {
		console.log(content)
		if (content.type == "Front") {
			return {
				...content,
				id_card_name: content.name,
				legal_person: content.name,
				contact_name: content.name,
				id_card_number: content.id,
				contact_id_number: content.id,
			};
		}
		//处理身份证有效期
		let [card_period_begin, card_period_end] = content.valid_date.split("-");
		card_period_begin = card_period_begin.split("")
		card_period_begin.splice(4, 0, "-")
		card_period_begin.splice(7, 0, "-")

		if (card_period_end.indexOf("长期") == -1) {
			card_period_end = card_period_end.split("")
			card_period_end.splice(4, 0, "-")
			card_period_end.splice(7, 0, "-")
		} else {
			card_period_end = [card_period_end]
		}

		return {
			...content,
			card_period_begin: card_period_begin.join(""),
			card_period_end: card_period_end.join(""),
		};

	}
}
