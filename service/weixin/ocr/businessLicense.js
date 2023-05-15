const {
	Service
} = require('../../common/uni-cloud-router');
const BasicService = require('./basic.js')
/**
 * 营业执照
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.businessLicense.html
 */
module.exports = class BusinessLicenseService extends BasicService {
	constructor(ctx) {
		super(ctx)
		this.type = "businessLicense";
		this.url = "/cv/ocr/bizlicense"
	}


	/**
	 * 返回值处理
	 * @param {Object} content
	 */
	async getMessageResult(content) {
		console.log(content)
		let subject_type = "SUBJECT_TYPE_ENTERPRISE";
		let settlement_id = "716",
			bank_account_type = "BANK_ACCOUNT_TYPE_CORPORATE",
			account_name = content.enterprise_name,
			qualification_type = "零售批发/生活娱乐/网上商城/其他"
		if (content.type_of_enterprise.indexOf("个体") != -1) {
			subject_type = "SUBJECT_TYPE_INDIVIDUAL"
			settlement_id = "719"
			bank_account_type = "BANK_ACCOUNT_TYPE_PERSONAL"
			account_name = content.legal_representative;
			qualification_type = "零售批发/生活娱乐/其他"
		}

		return {
			...content,
			merchant_shortname: content.enterprise_name,
			merchant_name: content.enterprise_name,
			legal_person: content.legal_representative,
			license_number: content.reg_num,
			account_name,
			qualification_type,
			bank_account_type,
			settlement_id,
			subject_type,
		};
	}
}
