const {
	Service
} = require('../../common/uni-cloud-router')
const {
	getTodayTime,
	thumbImg
} = require('../util');
const md5 = require('md5-node');
module.exports = class UtilService extends Service {
	constructor(ctx) {
		super(ctx)
	}
	getStringStar(str, pre = 1, end = 1) {
		if (!str) {
			return str;
		}
		let out = []
		out.push(str.substr(0, pre))
		//中间星星
		if (str.length > pre + end) {
			out.push('*'.repeat(str.length - (pre + end)))
			out.push(str.substr(end * -1, end))
		} else {
			out.push('*'.repeat(end))
		}
		return out.join("")
	}
	async uploadFileByUrl(url) {
		if (typeof url == "object") {
			let outUrl = []
			for (let i = 0; i < url.length; i++) {
				outUrl.push(await this.uploadFileByUrl(url[i]))
			}
			return outUrl;
		}
		if (!url) {
			return ""
		}
		//获取大图
		url = thumbImg(url, "750x750")
		return this.ctx.memorycache("file-url:" + md5(url), null, 3600, async () => {
			console.log("开始下载文件", url)
			let names = url.split("/")
			let file = await this.ctx.curl(url)
			const {
				fileID
			} = await uniCloud.uploadFile({
				cloudPath: names[names.length - 1],
				fileContent: file.data
			})
			console.log("上传文件", fileID)
			if (fileID && fileID.indexOf("cloud") == 0) {
				//腾讯云需要转换一下地址
				const {
					fileList
				} = await uniCloud.getTempFileURL({
					fileList: [fileID]
				})
				return fileList[0].tempFileURL
			}
			return fileID;
		})
	}
}
