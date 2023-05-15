module.exports = () => {
	// 返回中间件函数
	return async function auth(ctx, next) {

		// 校验 token
		// const auth = await ctx.uniID.checkToken(ctx.event.uniIdToken, {
		// 	needPermission: true,
		// 	needUserInfo: false
		// })
		const auth = {
			user_id: ctx.event.data.user_id,
			token: "2222", 
			tokenExpired: 24 * 60 * 60 * 1000
		}
		// apitoken可以访问任意方法，但是没有用户信息
		if (auth.code && !ctx.apiLogin) {
			// 校验失败，抛出错误信息
			ctx.throw('TOKEN_INVALID', `${auth.message}，${auth.code}`)
		}
		ctx.auth = auth // 设置当前请求的 auth 对象
		await next() // 执行后续中间件

		const { token, tokenExpired } = auth
		if (token && tokenExpired) {
			Object.assign(ctx.body, {
				token,
				tokenExpired
			})
		}
	}
}
