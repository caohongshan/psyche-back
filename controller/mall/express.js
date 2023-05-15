const { Controller } = require('../../common/uni-cloud-router')

module.exports = class ExpressController extends Controller {
	constructor(ctx) {
		super(ctx)
	}
	/**
	 *  打印单号信息
	 */
	async print() {
		this.getConfigs();
		return await this.service.expresses[this.model].print(this.ctx.data, this.configs)
	}
	/**
	 *  查询快递详细信息
	 */
	async detail() {
		this.getConfigs();
		return await this.service.expresses[this.model].detail(this.ctx.data, this.configs)
	}
	/**
	 *  根据单号，自动识别公司
	 */
	async company() {
		this.getConfigs();
		return await this.service.expresses[this.model].company(this.ctx.data, this.configs)
	}

	getConfigs() {
		//获取快递配置，一套系统，只允许配置一个
		let config = this.ctx.getConfigs.config("express");
		console.log("config", config)
		this.model = config.api;
		this.configs = {
			...config,
			api: undefined
		}
	}
}
