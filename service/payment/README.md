## 支付方式处理文件  
新增支付方式需要继承的方法  
//验证回调参数是否正确
```
async verify(config, event, next) {}
```
//企业转账到微信零钱
```
async transfers(data, platform, type) {}
```


```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const mchid = "1605159156"

	const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVEZcepzGIP8g7
zBNAiwsq0qcig1x/Wwui19U=
-----END PRIVATE KEY-----`
	const {
		Rsa,
		Wechatpay,
		Formatter,
		Aes: {
			AesGcm
		}
	} = require('wechatpay-axios-plugin');
	const platformCertificateSerial = "42684BB7E84A0072BB284374DE248FA8649AE582"
	const serial = "3711051510A09B2ABAAAED8F5392A1A55DA8B4A5"
	const wxpay = new Wechatpay({
		mchid: mchid,
		serial: serial,
		privateKey: privateKey,
		certs: {
			[platformCertificateSerial]: `-----BEGIN CERTIFICATE-----
Br2UVOD4sHAvf3JSA9+8j3Hg7bOy4PQbhpS0U+fgb/I=
-----END CERTIFICATE-----`,
		},
		// 使用APIv2时，需要至少设置 `secret`字段，示例代码未开启
		// APIv2密钥(32字节)
		// secret: 'xQHSfantYNGFZ6pwDLuesv4qGRmWNBnZ',
		// // 接口不要求证书情形，例如仅收款merchant对象参数可选
		// merchant: {
		//   cert: "any",
		//   key: "merchantPrivateKeyInstance",
		//   // or
		//   passphrase: 'your_merchant_id',
		//   pfx: "any",
		// },
	});
	//返回数据给客户端
	//商户进件
	/* let res = await wxpay.v3.applyment4sub.applyment.$noop$({
		a:1
	}, {
		noop: '',
		headers: {
			'Wechatpay-Serial': serial
		}
	}, ) */
	//获取证书
	/* let res = await wxpay.v3.certificates.get()
	let certs = {}
	let secret= 'xQHSfantYNGFZ6pwDLuesv4qGRmWNBnZ';
	console.log("res.data", res.data)
	res.data.data.forEach(({
		serial_no: serialNo,
		encrypt_certificate: {
			nonce,
			associated_data: aad,
			ciphertext
		},
	}) => {
		Object.assign(certs, {
			[serialNo]: AesGcm.decrypt(nonce, secret, ciphertext, aad)
		});
	}); */
	let res = await wxpay.v3.pay.transactions.jsapi
		.post({
			mchid: mchid,
			out_trade_no: 'jsapi' + Date.now(),
			appid: 'wxcfb12cd3b92a58ed',
			description: 'Image形象店-深圳腾大-QQ公仔',
			notify_url: 'https://weixin.qq.com/',
			amount: {
				total: 1,
				currency: 'CNY'
			},
			payer: {
				openid: "oMpYy5fOgD2Xs4yWEgrwlgQvH2Jo"
			}
		});

	const params = {
		appId: 'wxcfb12cd3b92a58ed',
		timeStamp: `${Formatter.timestamp()}`,
		nonceStr: Formatter.nonce(),
		package: 'prepay_id=' + res.data.prepay_id,
		signType: 'RSA',
	}
	params.paySign = Rsa.sign(Formatter.joinedByLineFeed(
		params.appId, params.timeStamp, params.nonceStr, params.package
	), privateKey)

	console.info(params)
	/* let res = await wxpay.v2.pay.unifiedorder({
		appid: 'wxd87770f8b866253e',
		attach: '支付测试',
		body: 'H5支付测试',
		mch_id: '1241654602',
		nonce_str: Formatter.nonce(),
		notify_url: 'http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php',
		openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
		out_trade_no: '1415659990',
		spbill_create_ip: '14.23.150.211',
		total_fee: 1,
		trade_type: 'MWEB',
		scene_info: JSON.stringify({
			h5_info: {
				type: "IOS",
				app_name: "王者荣耀",
				package_name: "com.tencent.tmgp.sgame"
			}
		}),
	})*/
	// return certs
	return params
};

```