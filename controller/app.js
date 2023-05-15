const fs = require('fs');
const path = require('path');
const { Controller } = require('../common/uni-cloud-router');

module.exports = class AppController extends Controller {
	async init() {
		// const currentUserInfo = await this.service.user.user.getCurrentUserInfo(['_id', 'username'])
		return {
		test: "111"
		// result: {
		//   share: this.ctx.getConfigs.config("share"),
		//   customer: this.ctx.getConfigs.config("customer"), //客服
		//   userInfo: {
		//     ...currentUserInfo.userInfo,
		//     token: undefined,
		//     password: undefined,
		//   },
		//   // navMenu: await this.service.menu.getMenu()
		//   navMenu: ''
		// }
		};
	}

	async clientDB() {
		const { collectionName, user_id } = this.ctx.event.data;
		return await db.collection(collectionName).find({ user_id }).toArray();
	}

	async upload() {
		const fileName = this.ctx.req.headers['file-name'];
		const filePath = path.join(__dirname, 'upload', fileName);
		const ws = fs.createWriteStream(filePath);
		this.ctx.req.pipe(ws);
		this.ctx.req.on('end', () => {
		const fileUrl = `http://${this.ctx.req.headers.host}/upload/${fileName}`; // 上传文件的url
		this.ctx.res.writeHead(200, { 'Content-Type': 'text/plain' });
		this.ctx.res.end(fileUrl);
		});
		return; // 不再继续执行router代码
	}

	async static() {
		// 处理静态文件请求
		const filePath = path.join(__dirname, this.ctx.req.url);
		fs.readFile(filePath, (err, data) => {
		if (err) {
			console.log('读取静态文件失败：', err);
			this.ctx.res.writeHead(404);
			this.ctx.res.end();
			return;
		}
		const contentType = this.getContentType(filePath);
		this.ctx.res.writeHead(200, { 'Content-Type': contentType });
		this.ctx.res.end(data);
		});
	}

	
};