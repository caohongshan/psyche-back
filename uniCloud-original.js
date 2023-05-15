
const e = {
	"$provider": "aliyun",
	"$options": {
		"context": {
			"CLIENTIP": "127.0.0.1",
			"CLIENTUA": "HBuilderX",
			"FUNCTION_NAME": "test11",
			"SPACEINFO": {
				"provider": "aliyun",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"useOldSpaceId": false
			},
			"SOURCE": "client",
			"requestId": "555833f1-de04-4560-9d46-c67207298bd2",
			"mpserverless": {
				"options": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"logger": {
						"log": function() {

						},
						"warn": function() {
							[native]
						},
						"dir": function() {
							[native]
						},
						"time": function() {
							[native]
						},
						"timeEnd": function() {
							[native]
						},
						"timeLog": function() {
							[native]
						},
						"trace": function() {
							[native]
						},
						"assert": function() {
							[native]
						},
						"clear": function() {
							[native]
						},
						"count": function() {
							[native]
						},
						"countReset": function() {
							[native]
						},
						"group": function() {
							[native]
						},
						"groupEnd": function() {
							[native]
						},
						"table": function() {
							[native]
						},
						"debug": function() {
							[native]
						},
						"info": function() {
							[native]
						},
						"dirxml": function() {
							[native]
						},
						"error": function() {
							[native]
						},
						"groupCollapsed": function() {
							[native]
						},
						"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
							// We have to test new.target here to see if this function is called
							// with new, because we need to define a custom instanceof to accommodate
							// the global console.
							if (new.target === undefined) {
								return ReflectConstruct(Console, arguments);
							}

							if (!options || typeof options.write === 'function') {
								options = {
									stdout: options,
									stderr: arguments[1],
									ignoreErrors: arguments[2]
								};
							}

							const {
								stdout,
								stderr = stdout,
								ignoreErrors = true,
								colorMode = 'auto',
								inspectOptions,
								groupIndentation,
							} = options;

							if (!stdout || typeof stdout.write !== 'function') {
								throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
							}
							if (!stderr || typeof stderr.write !== 'function') {
								throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
							}

							if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
								throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

							if (groupIndentation !== undefined) {
								validateInteger(groupIndentation, 'groupIndentation',
									0, kMaxGroupIndentation);
							}

							if (inspectOptions !== undefined) {
								validateObject(inspectOptions, 'options.inspectOptions');

								if (inspectOptions.colors !== undefined &&
									options.colorMode !== undefined) {
									throw new ERR_INCOMPATIBLE_OPTION_PAIR(
										'options.inspectOptions.color', 'colorMode');
								}
								optionsMap.set(this, inspectOptions);
							}

							// Bind the prototype functions to this Console instance
							ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
								// We have to bind the methods grabbed from the instance instead of from
								// the prototype so that users extending the Console can override them
								// from the prototype chain of the subclass.
								this[key] = FunctionPrototypeBind(this[key], this);
								ObjectDefineProperty(this[key], 'name', {
									__proto__: null,
									value: key
								});
							});

							this[kBindStreamsEager](stdout, stderr);
							this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
						},
						"profile": function profile() {
							[native]
						},
						"profileEnd": function profileEnd() {
							[native]
						},
						"timeStamp": function timeStamp() {
							[native]
						},
						"context": function context() {
							[native]
						}
					},
					"timeout": 10000,
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"serverSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"clientSecret": "l3xqbhavuzDbphGjRccnMw=="
				},
				"_debug": false,
				"_logger": {
					"log": function() {
						[native]
					},
					"warn": function() {
						[native]
					},
					"dir": function() {
						[native]
					},
					"time": function() {
						[native]
					},
					"timeEnd": function() {
						[native]
					},
					"timeLog": function() {
						[native]
					},
					"trace": function() {
						[native]
					},
					"assert": function() {
						[native]
					},
					"clear": function() {
						[native]
					},
					"count": function() {
						[native]
					},
					"countReset": function() {
						[native]
					},
					"group": function() {
						[native]
					},
					"groupEnd": function() {
						[native]
					},
					"table": function() {
						[native]
					},
					"debug": function() {
						[native]
					},
					"info": function() {
						[native]
					},
					"dirxml": function() {
						[native]
					},
					"error": function() {
						[native]
					},
					"groupCollapsed": function() {
						[native]
					},
					"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
						// We have to test new.target here to see if this function is called
						// with new, because we need to define a custom instanceof to accommodate
						// the global console.
						if (new.target === undefined) {
							return ReflectConstruct(Console, arguments);
						}

						if (!options || typeof options.write === 'function') {
							options = {
								stdout: options,
								stderr: arguments[1],
								ignoreErrors: arguments[2]
							};
						}

						const {
							stdout,
							stderr = stdout,
							ignoreErrors = true,
							colorMode = 'auto',
							inspectOptions,
							groupIndentation,
						} = options;

						if (!stdout || typeof stdout.write !== 'function') {
							throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
						}
						if (!stderr || typeof stderr.write !== 'function') {
							throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
						}

						if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
							throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

						if (groupIndentation !== undefined) {
							validateInteger(groupIndentation, 'groupIndentation',
								0, kMaxGroupIndentation);
						}

						if (inspectOptions !== undefined) {
							validateObject(inspectOptions, 'options.inspectOptions');

							if (inspectOptions.colors !== undefined &&
								options.colorMode !== undefined) {
								throw new ERR_INCOMPATIBLE_OPTION_PAIR(
									'options.inspectOptions.color', 'colorMode');
							}
							optionsMap.set(this, inspectOptions);
						}

						// Bind the prototype functions to this Console instance
						ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
							// We have to bind the methods grabbed from the instance instead of from
							// the prototype so that users extending the Console can override them
							// from the prototype chain of the subclass.
							this[key] = FunctionPrototypeBind(this[key], this);
							ObjectDefineProperty(this[key], 'name', {
								__proto__: null,
								value: key
							});
						});

						this[kBindStreamsEager](stdout, stderr);
						this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
					},
					"profile": function profile() {
						[native]
					},
					"profileEnd": function profileEnd() {
						[native]
					},
					"timeStamp": function timeStamp() {
						[native]
					},
					"context": function context() {
						[native]
					}
				},
				"transport": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"authType": undefined,
					"protocol": "HTTP",
					"logger": {
						"log": function() {},
						"info": function() {},
						"warn": function() {},
						"error": function() {},
						"debug": function() {}
					},
					"appId": "all",
					"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"timeout": 10000,
					"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
					"httpRequest": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				},
				"pkg": {
					"name": "@alicloud/mpserverless-node-sdk",
					"author": "junmo <qwe_lingkun@163.com>",
					"version": "1.2.3",
					"description": "Ant MPServerless JavaScript SDK for FaaS Egg Framework",
					"main": "dist/index.js",
					"types": "dist/index.d.ts",
					"files": ["dist"],
					"license": "MIT",
					"engines": {
						"node": ">=8.0.0"
					},
					"publishConfig": {
						"access": "public"
					},
					"scripts": {
						"tsc": "tsc -p tsconfig.json",
						"tsc:w": "npm run tsc -- -w"
					},
					"dependencies": {
						"@alicloud/mp-db-service": "^3.0.0",
						"@alicloud/mp-function-service": "^3.0.0",
						"@alicloud/mpserverless-node-file-service": "^1.2.0",
						"@alicloud/mpserverless-node-user-service": "^1.2.0",
						"@alicloud/mpserverless-core": "^3.0.0",
						"tslib": "^1.9.3",
						"urllib": "^2.34.2"
					}
				},
				"db": {
					"transport": {
						"endpoint": "mongodb://192.168.233.128:27017/psychic",
						"authType": undefined,
						"protocol": "HTTP",
						"logger": {
							"log": function() {},
							"info": function() {},
							"warn": function() {},
							"error": function() {},
							"debug": function() {}
						},
						"appId": "all",
						"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
						"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
						"timeout": 10000,
						"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
						"httpRequest": function request(url, args, callback) {
							// request(url, callback)
							if (arguments.length === 2 && typeof args === 'function') {
								callback = args;
								args = null;
							}
							if (typeof callback === 'function') {
								return exports.requestWithCallback(url, args, callback);
							}

							// Promise
							if (!_Promise) {
								_Promise = require('any-promise');
							}
							return new _Promise(function(resolve, reject) {
								exports.requestWithCallback(url, args, makeCallback(resolve, reject));
							});
						}
					},
					"toJSON": function() {
						return "_db"
					}
				},
				"user": {
					"transport": {
						"endpoint": "mongodb://192.168.233.128:27017/psychic",
						"authType": undefined,
						"protocol": "HTTP",
						"logger": {
							"log": function() {},
							"info": function() {},
							"warn": function() {},
							"error": function() {},
							"debug": function() {}
						},
						"appId": "all",
						"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
						"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
						"timeout": 10000,
						"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
						"httpRequest": function request(url, args, callback) {
							// request(url, callback)
							if (arguments.length === 2 && typeof args === 'function') {
								callback = args;
								args = null;
							}
							if (typeof callback === 'function') {
								return exports.requestWithCallback(url, args, callback);
							}

							// Promise
							if (!_Promise) {
								_Promise = require('any-promise');
							}
							return new _Promise(function(resolve, reject) {
								exports.requestWithCallback(url, args, makeCallback(resolve, reject));
							});
						}
					}
				},
				"file": {
					"transport": {
						"endpoint": "mongodb://192.168.233.128:27017/psychic",
						"authType": undefined,
						"protocol": "HTTP",
						"logger": {
							"log": function() {},
							"info": function() {},
							"warn": function() {},
							"error": function() {},
							"debug": function() {}
						},
						"appId": "all",
						"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
						"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
						"timeout": 10000,
						"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
						"httpRequest": function request(url, args, callback) {
							// request(url, callback)
							if (arguments.length === 2 && typeof args === 'function') {
								callback = args;
								args = null;
							}
							if (typeof callback === 'function') {
								return exports.requestWithCallback(url, args, callback);
							}

							// Promise
							if (!_Promise) {
								_Promise = require('any-promise');
							}
							return new _Promise(function(resolve, reject) {
								exports.requestWithCallback(url, args, makeCallback(resolve, reject));
							});
						}
					},
					"request": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				},
				"function": {
					"transport": {
						"endpoint": "mongodb://192.168.233.128:27017/psychic",
						"authType": undefined,
						"protocol": "HTTP",
						"logger": {
							"log": function() {},
							"info": function() {},
							"warn": function() {},
							"error": function() {},
							"debug": function() {}
						},
						"appId": "all",
						"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
						"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
						"timeout": 10000,
						"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
						"httpRequest": function request(url, args, callback) {
							// request(url, callback)
							if (arguments.length === 2 && typeof args === 'function') {
								callback = args;
								args = null;
							}
							if (typeof callback === 'function') {
								return exports.requestWithCallback(url, args, callback);
							}

							// Promise
							if (!_Promise) {
								_Promise = require('any-promise');
							}
							return new _Promise(function(resolve, reject) {
								exports.requestWithCallback(url, args, makeCallback(resolve, reject));
							});
						}
					}
				},
				"httpProxyClient": {
					"get": (url, query) => this.user.proxyHttpClientGetRequest(url, query),
					"post": (url, text, header) => this.user.proxyHttpClientPostRequest(url, text, header),
					"postJson": (url, json, header) => this.user.proxyHttpClientPostJsonRequest(url, json, header),
					"postForm": (url, data, header) => this.user.proxyHttpClientPostFormDataRequest(url, data, header)
				}
			},
			"logger": {
				"log": function() {
					[native]
				},
				"warn": function() {
					[native]
				},
				"dir": function() {
					[native]
				},
				"time": function() {
					[native]
				},
				"timeEnd": function() {
					[native]
				},
				"timeLog": function() {
					[native]
				},
				"trace": function() {
					[native]
				},
				"assert": function() {
					[native]
				},
				"clear": function() {
					[native]
				},
				"count": function() {
					[native]
				},
				"countReset": function() {
					[native]
				},
				"group": function() {
					[native]
				},
				"groupEnd": function() {
					[native]
				},
				"table": function() {
					[native]
				},
				"debug": function() {
					[native]
				},
				"info": function() {
					[native]
				},
				"dirxml": function() {
					[native]
				},
				"error": function() {
					[native]
				},
				"groupCollapsed": function() {
					[native]
				},
				"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
					// We have to test new.target here to see if this function is called
					// with new, because we need to define a custom instanceof to accommodate
					// the global console.
					if (new.target === undefined) {
						return ReflectConstruct(Console, arguments);
					}

					if (!options || typeof options.write === 'function') {
						options = {
							stdout: options,
							stderr: arguments[1],
							ignoreErrors: arguments[2]
						};
					}

					const {
						stdout,
						stderr = stdout,
						ignoreErrors = true,
						colorMode = 'auto',
						inspectOptions,
						groupIndentation,
					} = options;

					if (!stdout || typeof stdout.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
					}
					if (!stderr || typeof stderr.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
					}

					if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
						throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

					if (groupIndentation !== undefined) {
						validateInteger(groupIndentation, 'groupIndentation',
							0, kMaxGroupIndentation);
					}

					if (inspectOptions !== undefined) {
						validateObject(inspectOptions, 'options.inspectOptions');

						if (inspectOptions.colors !== undefined &&
							options.colorMode !== undefined) {
							throw new ERR_INCOMPATIBLE_OPTION_PAIR(
								'options.inspectOptions.color', 'colorMode');
						}
						optionsMap.set(this, inspectOptions);
					}

					// Bind the prototype functions to this Console instance
					ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
						// We have to bind the methods grabbed from the instance instead of from
						// the prototype so that users extending the Console can override them
						// from the prototype chain of the subclass.
						this[key] = FunctionPrototypeBind(this[key], this);
						ObjectDefineProperty(this[key], 'name', {
							__proto__: null,
							value: key
						});
					});

					this[kBindStreamsEager](stdout, stderr);
					this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
				},
				"profile": function profile() {
					[native]
				},
				"profileEnd": function profileEnd() {
					[native]
				},
				"timeStamp": function timeStamp() {
					[native]
				},
				"context": function context() {
					[native]
				}
			},
			"httpclient": {
				"_events": {},
				"_eventsCount": 0,
				"_maxListeners": undefined,
				"agent": {
					"_events": {
						"free": (socket, options) => {
							const name = this.getName(options);
							debug('agent.on(free)', name);

							// TODO(ronag): socket.destroy(err) might have been called
							// before coming here and have an 'error' scheduled. In the
							// case of socket.destroy() below this 'error' has no handler
							// and could cause unhandled exception.

							if (!socket.writable) {
								socket.destroy();
								return;
							}

							const requests = this.requests[name];
							if (requests && requests.length) {
								const req = ArrayPrototypeShift(requests);
								const reqAsyncRes = req[kRequestAsyncResource];
								if (reqAsyncRes) {
									// Run request within the original async context.
									reqAsyncRes.runInAsyncScope(() => {
										asyncResetHandle(socket);
										setRequestSocket(this, req, socket);
									});
									req[kRequestAsyncResource] = null;
								} else {
									setRequestSocket(this, req, socket);
								}
								if (requests.length === 0) {
									delete this.requests[name];
								}
								return;
							}

							// If there are no pending requests, then put it in
							// the freeSockets pool, but only if we're allowed to do so.
							const req = socket._httpMessage;
							if (!req || !req.shouldKeepAlive || !this.keepAlive) {
								socket.destroy();
								return;
							}

							const freeSockets = this.freeSockets[name] || [];
							const freeLen = freeSockets.length;
							let count = freeLen;
							if (this.sockets[name])
								count += this.sockets[name].length;

							if (this.totalSocketCount > this.maxTotalSockets ||
								count > this.maxSockets ||
								freeLen >= this.maxFreeSockets ||
								!this.keepSocketAlive(socket)) {
								socket.destroy();
								return;
							}

							this.freeSockets[name] = freeSockets;
							socket[async_id_symbol] = -1;
							socket._httpMessage = null;
							this.removeSocket(socket, options);

							socket.once('error', freeSocketErrorListener);
							ArrayPrototypePush(freeSockets, socket);
						},
						"newListener": function maybeEnableKeylog(eventName) {
							if (eventName === 'keylog') {
								this.removeListener('newListener', maybeEnableKeylog);
								// Future sockets will listen on keylog at creation.
								const agent = this;
								this[kOnKeylog] = function onkeylog(keylog) {
									agent.emit('keylog', keylog, this);
								};
								// Existing sockets will start listening on keylog now.
								const sockets = ObjectValues(this.sockets);
								for (let i = 0; i < sockets.length; i++) {
									sockets[i].on('keylog', this[kOnKeylog]);
								}
							}
						}
					},
					"_eventsCount": 2,
					"_maxListeners": undefined,
					"defaultPort": 80,
					"protocol": "http:",
					"options": {
						"path": null
					},
					"requests": {},
					"sockets": {},
					"freeSockets": {},
					"keepAliveMsecs": 1000,
					"keepAlive": false,
					"maxSockets": 1000,
					"maxFreeSockets": 256,
					"scheduling": "lifo",
					"maxTotalSockets": Infinity,
					"totalSocketCount": 0,
					"Symbol(kCapture)": false
				},
				"hasCustomAgent": false,
				"httpsAgent": {
					"_events": {
						"free": (socket, options) => {
							const name = this.getName(options);
							debug('agent.on(free)', name);

							// TODO(ronag): socket.destroy(err) might have been called
							// before coming here and have an 'error' scheduled. In the
							// case of socket.destroy() below this 'error' has no handler
							// and could cause unhandled exception.

							if (!socket.writable) {
								socket.destroy();
								return;
							}

							const requests = this.requests[name];
							if (requests && requests.length) {
								const req = ArrayPrototypeShift(requests);
								const reqAsyncRes = req[kRequestAsyncResource];
								if (reqAsyncRes) {
									// Run request within the original async context.
									reqAsyncRes.runInAsyncScope(() => {
										asyncResetHandle(socket);
										setRequestSocket(this, req, socket);
									});
									req[kRequestAsyncResource] = null;
								} else {
									setRequestSocket(this, req, socket);
								}
								if (requests.length === 0) {
									delete this.requests[name];
								}
								return;
							}

							// If there are no pending requests, then put it in
							// the freeSockets pool, but only if we're allowed to do so.
							const req = socket._httpMessage;
							if (!req || !req.shouldKeepAlive || !this.keepAlive) {
								socket.destroy();
								return;
							}

							const freeSockets = this.freeSockets[name] || [];
							const freeLen = freeSockets.length;
							let count = freeLen;
							if (this.sockets[name])
								count += this.sockets[name].length;

							if (this.totalSocketCount > this.maxTotalSockets ||
								count > this.maxSockets ||
								freeLen >= this.maxFreeSockets ||
								!this.keepSocketAlive(socket)) {
								socket.destroy();
								return;
							}

							this.freeSockets[name] = freeSockets;
							socket[async_id_symbol] = -1;
							socket._httpMessage = null;
							this.removeSocket(socket, options);

							socket.once('error', freeSocketErrorListener);
							ArrayPrototypePush(freeSockets, socket);
						},
						"newListener": function maybeEnableKeylog(eventName) {
							if (eventName === 'keylog') {
								this.removeListener('newListener', maybeEnableKeylog);
								// Future sockets will listen on keylog at creation.
								const agent = this;
								this[kOnKeylog] = function onkeylog(keylog) {
									agent.emit('keylog', keylog, this);
								};
								// Existing sockets will start listening on keylog now.
								const sockets = ObjectValues(this.sockets);
								for (let i = 0; i < sockets.length; i++) {
									sockets[i].on('keylog', this[kOnKeylog]);
								}
							}
						}
					},
					"_eventsCount": 2,
					"_maxListeners": undefined,
					"defaultPort": 443,
					"protocol": "https:",
					"options": {
						"path": null
					},
					"requests": {},
					"sockets": {},
					"freeSockets": {},
					"keepAliveMsecs": 1000,
					"keepAlive": false,
					"maxSockets": 1000,
					"maxFreeSockets": 256,
					"scheduling": "lifo",
					"maxTotalSockets": Infinity,
					"totalSocketCount": 0,
					"maxCachedSessions": 100,
					"_sessionCache": {
						"map": {},
						"list": []
					},
					"Symbol(kCapture)": false
				},
				"hasCustomHttpsAgent": false,
				"defaultArgs": undefined,
				"Symbol(kCapture)": false,
				"request": function(url, args, callback) {
					if (typeof args === 'function') { 
						callback = args; args = null; 
					} args = args || {}; 
					if (this.defaultArgs) { 
						args = utility.assign({}, [this.defaultArgs, args]); 
					} 
					args.emitter = this; 
					args.agent = getAgent(args.agent, this.agent); 
					args.httpsAgent = getAgent(args.httpsAgent, this.httpsAgent);
					return urllib.request(url, args, callback); 
				}
			},
			"httpProxyClient": {
				"get": (url, query) => this.user.proxyHttpClientGetRequest(url, query),
				"post": (url, text, header) => this.user.proxyHttpClientPostRequest(url, text, header),
				"postJson": (url, json, header) => this.user.proxyHttpClientPostJsonRequest(url, json, header),
				"postForm": (url, data, header) => this.user.proxyHttpClientPostFormDataRequest(url, data, header)
			},
			"args": {},
			"env": {
				"MP_SOURCE": "client",
				"MP_CLIENT_IP": "127.0.0.1",
				"MP_RUNTIME_VERSION": "2.0.0",
				"MP_SPACE_ID": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"MP_USER_AGENT": "HBuilderX"
			}
		}
	},
	"$context": {
		"CLIENTIP": "127.0.0.1",
		"CLIENTUA": "HBuilderX",
		"FUNCTION_NAME": "test11",
		"SPACEINFO": {
			"provider": "aliyun",
			"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
			"useOldSpaceId": false
		},
		"SOURCE": "client",
		"requestId": "555833f1-de04-4560-9d46-c67207298bd2",
		"mpserverless": {
			"options": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"logger": {
					"log": function() {
						[native]
					},
					"warn": function() {
						[native]
					},
					"dir": function() {
						[native]
					},
					"time": function() {
						[native]
					},
					"timeEnd": function() {
						[native]
					},
					"timeLog": function() {
						[native]
					},
					"trace": function() {
						[native]
					},
					"assert": function() {
						[native]
					},
					"clear": function() {
						[native]
					},
					"count": function() {
						[native]
					},
					"countReset": function() {
						[native]
					},
					"group": function() {
						[native]
					},
					"groupEnd": function() {
						[native]
					},
					"table": function() {
						[native]
					},
					"debug": function() {
						[native]
					},
					"info": function() {
						[native]
					},
					"dirxml": function() {
						[native]
					},
					"error": function() {
						[native]
					},
					"groupCollapsed": function() {
						[native]
					},
					"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
						// We have to test new.target here to see if this function is called
						// with new, because we need to define a custom instanceof to accommodate
						// the global console.
						if (new.target === undefined) {
							return ReflectConstruct(Console, arguments);
						}

						if (!options || typeof options.write === 'function') {
							options = {
								stdout: options,
								stderr: arguments[1],
								ignoreErrors: arguments[2]
							};
						}

						const {
							stdout,
							stderr = stdout,
							ignoreErrors = true,
							colorMode = 'auto',
							inspectOptions,
							groupIndentation,
						} = options;

						if (!stdout || typeof stdout.write !== 'function') {
							throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
						}
						if (!stderr || typeof stderr.write !== 'function') {
							throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
						}

						if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
							throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

						if (groupIndentation !== undefined) {
							validateInteger(groupIndentation, 'groupIndentation',
								0, kMaxGroupIndentation);
						}

						if (inspectOptions !== undefined) {
							validateObject(inspectOptions, 'options.inspectOptions');

							if (inspectOptions.colors !== undefined &&
								options.colorMode !== undefined) {
								throw new ERR_INCOMPATIBLE_OPTION_PAIR(
									'options.inspectOptions.color', 'colorMode');
							}
							optionsMap.set(this, inspectOptions);
						}

						// Bind the prototype functions to this Console instance
						ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
							// We have to bind the methods grabbed from the instance instead of from
							// the prototype so that users extending the Console can override them
							// from the prototype chain of the subclass.
							this[key] = FunctionPrototypeBind(this[key], this);
							ObjectDefineProperty(this[key], 'name', {
								__proto__: null,
								value: key
							});
						});

						this[kBindStreamsEager](stdout, stderr);
						this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
					},
					"profile": function profile() {
						[native]
					},
					"profileEnd": function profileEnd() {
						[native]
					},
					"timeStamp": function timeStamp() {
						[native]
					},
					"context": function context() {
						[native]
					}
				},
				"timeout": 10000,
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"serverSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"clientSecret": "l3xqbhavuzDbphGjRccnMw=="
			},
			"_debug": false,
			"_logger": {
				"log": function() {
					[native]
				},
				"warn": function() {
					[native]
				},
				"dir": function() {
					[native]
				},
				"time": function() {
					[native]
				},
				"timeEnd": function() {
					[native]
				},
				"timeLog": function() {
					[native]
				},
				"trace": function() {
					[native]
				},
				"assert": function() {
					[native]
				},
				"clear": function() {
					[native]
				},
				"count": function() {
					[native]
				},
				"countReset": function() {
					[native]
				},
				"group": function() {
					[native]
				},
				"groupEnd": function() {
					[native]
				},
				"table": function() {
					[native]
				},
				"debug": function() {
					[native]
				},
				"info": function() {
					[native]
				},
				"dirxml": function() {
					[native]
				},
				"error": function() {
					[native]
				},
				"groupCollapsed": function() {
					[native]
				},
				"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
					// We have to test new.target here to see if this function is called
					// with new, because we need to define a custom instanceof to accommodate
					// the global console.
					if (new.target === undefined) {
						return ReflectConstruct(Console, arguments);
					}

					if (!options || typeof options.write === 'function') {
						options = {
							stdout: options,
							stderr: arguments[1],
							ignoreErrors: arguments[2]
						};
					}

					const {
						stdout,
						stderr = stdout,
						ignoreErrors = true,
						colorMode = 'auto',
						inspectOptions,
						groupIndentation,
					} = options;

					if (!stdout || typeof stdout.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
					}
					if (!stderr || typeof stderr.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
					}

					if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
						throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

					if (groupIndentation !== undefined) {
						validateInteger(groupIndentation, 'groupIndentation',
							0, kMaxGroupIndentation);
					}

					if (inspectOptions !== undefined) {
						validateObject(inspectOptions, 'options.inspectOptions');

						if (inspectOptions.colors !== undefined &&
							options.colorMode !== undefined) {
							throw new ERR_INCOMPATIBLE_OPTION_PAIR(
								'options.inspectOptions.color', 'colorMode');
						}
						optionsMap.set(this, inspectOptions);
					}

					// Bind the prototype functions to this Console instance
					ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
						// We have to bind the methods grabbed from the instance instead of from
						// the prototype so that users extending the Console can override them
						// from the prototype chain of the subclass.
						this[key] = FunctionPrototypeBind(this[key], this);
						ObjectDefineProperty(this[key], 'name', {
							__proto__: null,
							value: key
						});
					});

					this[kBindStreamsEager](stdout, stderr);
					this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
				},
				"profile": function profile() {
					[native]
				},
				"profileEnd": function profileEnd() {
					[native]
				},
				"timeStamp": function timeStamp() {
					[native]
				},
				"context": function context() {
					[native]
				}
			},
			"transport": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"authType": undefined,
				"protocol": "HTTP",
				"logger": {
					"log": function() {},
					"info": function() {},
					"warn": function() {},
					"error": function() {},
					"debug": function() {}
				},
				"appId": "all",
				"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"timeout": 10000,
				"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
				"httpRequest": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			},
			"pkg": {
				"name": "@alicloud/mpserverless-node-sdk",
				"author": "junmo <qwe_lingkun@163.com>",
				"version": "1.2.3",
				"description": "Ant MPServerless JavaScript SDK for FaaS Egg Framework",
				"main": "dist/index.js",
				"types": "dist/index.d.ts",
				"files": ["dist"],
				"license": "MIT",
				"engines": {
					"node": ">=8.0.0"
				},
				"publishConfig": {
					"access": "public"
				},
				"scripts": {
					"tsc": "tsc -p tsconfig.json",
					"tsc:w": "npm run tsc -- -w"
				},
				"dependencies": {
					"@alicloud/mp-db-service": "^3.0.0",
					"@alicloud/mp-function-service": "^3.0.0",
					"@alicloud/mpserverless-node-file-service": "^1.2.0",
					"@alicloud/mpserverless-node-user-service": "^1.2.0",
					"@alicloud/mpserverless-core": "^3.0.0",
					"tslib": "^1.9.3",
					"urllib": "^2.34.2"
				}
			},
			"db": {
				"transport": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"authType": undefined,
					"protocol": "HTTP",
					"logger": {
						"log": function() {},
						"info": function() {},
						"warn": function() {},
						"error": function() {},
						"debug": function() {}
					},
					"appId": "all",
					"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"timeout": 10000,
					"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
					"httpRequest": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				},
				"toJSON": function() {
					return "_db"
				}
			},
			"user": {
				"transport": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"authType": undefined,
					"protocol": "HTTP",
					"logger": {
						"log": function() {},
						"info": function() {},
						"warn": function() {},
						"error": function() {},
						"debug": function() {}
					},
					"appId": "all",
					"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"timeout": 10000,
					"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
					"httpRequest": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				}
			},
			"file": {
				"transport": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"authType": undefined,
					"protocol": "HTTP",
					"logger": {
						"log": function() {},
						"info": function() {},
						"warn": function() {},
						"error": function() {},
						"debug": function() {}
					},
					"appId": "all",
					"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"timeout": 10000,
					"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
					"httpRequest": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				},
				"request": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			},
			"function": {
				"transport": {
					"endpoint": "mongodb://192.168.233.128:27017/psychic",
					"authType": undefined,
					"protocol": "HTTP",
					"logger": {
						"log": function() {},
						"info": function() {},
						"warn": function() {},
						"error": function() {},
						"debug": function() {}
					},
					"appId": "all",
					"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
					"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
					"timeout": 10000,
					"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
					"httpRequest": function request(url, args, callback) {
						// request(url, callback)
						if (arguments.length === 2 && typeof args === 'function') {
							callback = args;
							args = null;
						}
						if (typeof callback === 'function') {
							return exports.requestWithCallback(url, args, callback);
						}

						// Promise
						if (!_Promise) {
							_Promise = require('any-promise');
						}
						return new _Promise(function(resolve, reject) {
							exports.requestWithCallback(url, args, makeCallback(resolve, reject));
						});
					}
				}
			},
			"httpProxyClient": {
				"get": (url, query) => this.user.proxyHttpClientGetRequest(url, query),
				"post": (url, text, header) => this.user.proxyHttpClientPostRequest(url, text, header),
				"postJson": (url, json, header) => this.user.proxyHttpClientPostJsonRequest(url, json, header),
				"postForm": (url, data, header) => this.user.proxyHttpClientPostFormDataRequest(url, data, header)
			}
		},
		"logger": {
			"log": function() {
				[native]
			},
			"warn": function() {
				[native]
			},
			"dir": function() {
				[native]
			},
			"time": function() {
				[native]
			},
			"timeEnd": function() {
				[native]
			},
			"timeLog": function() {
				[native]
			},
			"trace": function() {
				[native]
			},
			"assert": function() {
				[native]
			},
			"clear": function() {
				[native]
			},
			"count": function() {
				[native]
			},
			"countReset": function() {
				[native]
			},
			"group": function() {
				[native]
			},
			"groupEnd": function() {
				[native]
			},
			"table": function() {
				[native]
			},
			"debug": function() {
				[native]
			},
			"info": function() {
				[native]
			},
			"dirxml": function() {
				[native]
			},
			"error": function() {
				[native]
			},
			"groupCollapsed": function() {
				[native]
			},
			"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
				// We have to test new.target here to see if this function is called
				// with new, because we need to define a custom instanceof to accommodate
				// the global console.
				if (new.target === undefined) {
					return ReflectConstruct(Console, arguments);
				}

				if (!options || typeof options.write === 'function') {
					options = {
						stdout: options,
						stderr: arguments[1],
						ignoreErrors: arguments[2]
					};
				}

				const {
					stdout,
					stderr = stdout,
					ignoreErrors = true,
					colorMode = 'auto',
					inspectOptions,
					groupIndentation,
				} = options;

				if (!stdout || typeof stdout.write !== 'function') {
					throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
				}
				if (!stderr || typeof stderr.write !== 'function') {
					throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
				}

				if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
					throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

				if (groupIndentation !== undefined) {
					validateInteger(groupIndentation, 'groupIndentation',
						0, kMaxGroupIndentation);
				}

				if (inspectOptions !== undefined) {
					validateObject(inspectOptions, 'options.inspectOptions');

					if (inspectOptions.colors !== undefined &&
						options.colorMode !== undefined) {
						throw new ERR_INCOMPATIBLE_OPTION_PAIR(
							'options.inspectOptions.color', 'colorMode');
					}
					optionsMap.set(this, inspectOptions);
				}

				// Bind the prototype functions to this Console instance
				ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
					// We have to bind the methods grabbed from the instance instead of from
					// the prototype so that users extending the Console can override them
					// from the prototype chain of the subclass.
					this[key] = FunctionPrototypeBind(this[key], this);
					ObjectDefineProperty(this[key], 'name', {
						__proto__: null,
						value: key
					});
				});

				this[kBindStreamsEager](stdout, stderr);
				this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
			},
			"profile": function profile() {
				[native]
			},
			"profileEnd": function profileEnd() {
				[native]
			},
			"timeStamp": function timeStamp() {
				[native]
			},
			"context": function context() {
				[native]
			}
		},
		"httpclient": {
			"_events": {},
			"_eventsCount": 0,
			"_maxListeners": undefined,
			"agent": {
				"_events": {
					"free": (socket, options) => {
						const name = this.getName(options);
						debug('agent.on(free)', name);

						// TODO(ronag): socket.destroy(err) might have been called
						// before coming here and have an 'error' scheduled. In the
						// case of socket.destroy() below this 'error' has no handler
						// and could cause unhandled exception.

						if (!socket.writable) {
							socket.destroy();
							return;
						}

						const requests = this.requests[name];
						if (requests && requests.length) {
							const req = ArrayPrototypeShift(requests);
							const reqAsyncRes = req[kRequestAsyncResource];
							if (reqAsyncRes) {
								// Run request within the original async context.
								reqAsyncRes.runInAsyncScope(() => {
									asyncResetHandle(socket);
									setRequestSocket(this, req, socket);
								});
								req[kRequestAsyncResource] = null;
							} else {
								setRequestSocket(this, req, socket);
							}
							if (requests.length === 0) {
								delete this.requests[name];
							}
							return;
						}

						// If there are no pending requests, then put it in
						// the freeSockets pool, but only if we're allowed to do so.
						const req = socket._httpMessage;
						if (!req || !req.shouldKeepAlive || !this.keepAlive) {
							socket.destroy();
							return;
						}

						const freeSockets = this.freeSockets[name] || [];
						const freeLen = freeSockets.length;
						let count = freeLen;
						if (this.sockets[name])
							count += this.sockets[name].length;

						if (this.totalSocketCount > this.maxTotalSockets ||
							count > this.maxSockets ||
							freeLen >= this.maxFreeSockets ||
							!this.keepSocketAlive(socket)) {
							socket.destroy();
							return;
						}

						this.freeSockets[name] = freeSockets;
						socket[async_id_symbol] = -1;
						socket._httpMessage = null;
						this.removeSocket(socket, options);

						socket.once('error', freeSocketErrorListener);
						ArrayPrototypePush(freeSockets, socket);
					},
					"newListener": function maybeEnableKeylog(eventName) {
						if (eventName === 'keylog') {
							this.removeListener('newListener', maybeEnableKeylog);
							// Future sockets will listen on keylog at creation.
							const agent = this;
							this[kOnKeylog] = function onkeylog(keylog) {
								agent.emit('keylog', keylog, this);
							};
							// Existing sockets will start listening on keylog now.
							const sockets = ObjectValues(this.sockets);
							for (let i = 0; i < sockets.length; i++) {
								sockets[i].on('keylog', this[kOnKeylog]);
							}
						}
					}
				},
				"_eventsCount": 2,
				"_maxListeners": undefined,
				"defaultPort": 80,
				"protocol": "http:",
				"options": {
					"path": null
				},
				"requests": {},
				"sockets": {},
				"freeSockets": {},
				"keepAliveMsecs": 1000,
				"keepAlive": false,
				"maxSockets": 1000,
				"maxFreeSockets": 256,
				"scheduling": "lifo",
				"maxTotalSockets": Infinity,
				"totalSocketCount": 0,
				"Symbol(kCapture)": false
			},
			"hasCustomAgent": false,
			"httpsAgent": {
				"_events": {
					"free": (socket, options) => {
						const name = this.getName(options);
						debug('agent.on(free)', name);

						// TODO(ronag): socket.destroy(err) might have been called
						// before coming here and have an 'error' scheduled. In the
						// case of socket.destroy() below this 'error' has no handler
						// and could cause unhandled exception.

						if (!socket.writable) {
							socket.destroy();
							return;
						}

						const requests = this.requests[name];
						if (requests && requests.length) {
							const req = ArrayPrototypeShift(requests);
							const reqAsyncRes = req[kRequestAsyncResource];
							if (reqAsyncRes) {
								// Run request within the original async context.
								reqAsyncRes.runInAsyncScope(() => {
									asyncResetHandle(socket);
									setRequestSocket(this, req, socket);
								});
								req[kRequestAsyncResource] = null;
							} else {
								setRequestSocket(this, req, socket);
							}
							if (requests.length === 0) {
								delete this.requests[name];
							}
							return;
						}

						// If there are no pending requests, then put it in
						// the freeSockets pool, but only if we're allowed to do so.
						const req = socket._httpMessage;
						if (!req || !req.shouldKeepAlive || !this.keepAlive) {
							socket.destroy();
							return;
						}

						const freeSockets = this.freeSockets[name] || [];
						const freeLen = freeSockets.length;
						let count = freeLen;
						if (this.sockets[name])
							count += this.sockets[name].length;

						if (this.totalSocketCount > this.maxTotalSockets ||
							count > this.maxSockets ||
							freeLen >= this.maxFreeSockets ||
							!this.keepSocketAlive(socket)) {
							socket.destroy();
							return;
						}

						this.freeSockets[name] = freeSockets;
						socket[async_id_symbol] = -1;
						socket._httpMessage = null;
						this.removeSocket(socket, options);

						socket.once('error', freeSocketErrorListener);
						ArrayPrototypePush(freeSockets, socket);
					},
					"newListener": function maybeEnableKeylog(eventName) {
						if (eventName === 'keylog') {
							this.removeListener('newListener', maybeEnableKeylog);
							// Future sockets will listen on keylog at creation.
							const agent = this;
							this[kOnKeylog] = function onkeylog(keylog) {
								agent.emit('keylog', keylog, this);
							};
							// Existing sockets will start listening on keylog now.
							const sockets = ObjectValues(this.sockets);
							for (let i = 0; i < sockets.length; i++) {
								sockets[i].on('keylog', this[kOnKeylog]);
							}
						}
					}
				},
				"_eventsCount": 2,
				"_maxListeners": undefined,
				"defaultPort": 443,
				"protocol": "https:",
				"options": {
					"path": null
				},
				"requests": {},
				"sockets": {},
				"freeSockets": {},
				"keepAliveMsecs": 1000,
				"keepAlive": false,
				"maxSockets": 1000,
				"maxFreeSockets": 256,
				"scheduling": "lifo",
				"maxTotalSockets": Infinity,
				"totalSocketCount": 0,
				"maxCachedSessions": 100,
				"_sessionCache": {
					"map": {},
					"list": []
				},
				"Symbol(kCapture)": false
			},
			"hasCustomHttpsAgent": false,
			"defaultArgs": undefined,
			"Symbol(kCapture)": false
		},
		"httpProxyClient": {
			"get": (url, query) => this.user.proxyHttpClientGetRequest(url, query),
			"post": (url, text, header) => this.user.proxyHttpClientPostRequest(url, text, header),
			"postJson": (url, json, header) => this.user.proxyHttpClientPostJsonRequest(url, json, header),
			"postForm": (url, data, header) => this.user.proxyHttpClientPostFormDataRequest(url, data, header)
		},
		"args": {},
		"env": {
			"MP_SOURCE": "client",
			"MP_CLIENT_IP": "127.0.0.1",
			"MP_RUNTIME_VERSION": "2.0.0",
			"MP_SPACE_ID": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
			"MP_USER_AGENT": "HBuilderX"
		}
	},
	"$scope": {
		"options": {
			"endpoint": "mongodb://192.168.233.128:27017/psychic",
			"logger": {
				"log": function() {
					[native]
				},
				"warn": function() {
					[native]
				},
				"dir": function() {
					[native]
				},
				"time": function() {
					[native]
				},
				"timeEnd": function() {
					[native]
				},
				"timeLog": function() {
					[native]
				},
				"trace": function() {
					[native]
				},
				"assert": function() {
					[native]
				},
				"clear": function() {
					[native]
				},
				"count": function() {
					[native]
				},
				"countReset": function() {
					[native]
				},
				"group": function() {
					[native]
				},
				"groupEnd": function() {
					[native]
				},
				"table": function() {
					[native]
				},
				"debug": function() {
					[native]
				},
				"info": function() {
					[native]
				},
				"dirxml": function() {
					[native]
				},
				"error": function() {
					[native]
				},
				"groupCollapsed": function() {
					[native]
				},
				"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
					// We have to test new.target here to see if this function is called
					// with new, because we need to define a custom instanceof to accommodate
					// the global console.
					if (new.target === undefined) {
						return ReflectConstruct(Console, arguments);
					}

					if (!options || typeof options.write === 'function') {
						options = {
							stdout: options,
							stderr: arguments[1],
							ignoreErrors: arguments[2]
						};
					}

					const {
						stdout,
						stderr = stdout,
						ignoreErrors = true,
						colorMode = 'auto',
						inspectOptions,
						groupIndentation,
					} = options;

					if (!stdout || typeof stdout.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
					}
					if (!stderr || typeof stderr.write !== 'function') {
						throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
					}

					if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
						throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

					if (groupIndentation !== undefined) {
						validateInteger(groupIndentation, 'groupIndentation',
							0, kMaxGroupIndentation);
					}

					if (inspectOptions !== undefined) {
						validateObject(inspectOptions, 'options.inspectOptions');

						if (inspectOptions.colors !== undefined &&
							options.colorMode !== undefined) {
							throw new ERR_INCOMPATIBLE_OPTION_PAIR(
								'options.inspectOptions.color', 'colorMode');
						}
						optionsMap.set(this, inspectOptions);
					}

					// Bind the prototype functions to this Console instance
					ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
						// We have to bind the methods grabbed from the instance instead of from
						// the prototype so that users extending the Console can override them
						// from the prototype chain of the subclass.
						this[key] = FunctionPrototypeBind(this[key], this);
						ObjectDefineProperty(this[key], 'name', {
							__proto__: null,
							value: key
						});
					});

					this[kBindStreamsEager](stdout, stderr);
					this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
				},
				"profile": function profile() {
					[native]
				},
				"profileEnd": function profileEnd() {
					[native]
				},
				"timeStamp": function timeStamp() {
					[native]
				},
				"context": function context() {
					[native]
				}
			},
			"timeout": 10000,
			"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
			"serverSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
			"clientSecret": "l3xqbhavuzDbphGjRccnMw=="
		},
		"_debug": false,
		"_logger": {
			"log": function() {
				[native]
			},
			"warn": function() {
				[native]
			},
			"dir": function() {
				[native]
			},
			"time": function() {
				[native]
			},
			"timeEnd": function() {
				[native]
			},
			"timeLog": function() {
				[native]
			},
			"trace": function() {
				[native]
			},
			"assert": function() {
				[native]
			},
			"clear": function() {
				[native]
			},
			"count": function() {
				[native]
			},
			"countReset": function() {
				[native]
			},
			"group": function() {
				[native]
			},
			"groupEnd": function() {
				[native]
			},
			"table": function() {
				[native]
			},
			"debug": function() {
				[native]
			},
			"info": function() {
				[native]
			},
			"dirxml": function() {
				[native]
			},
			"error": function() {
				[native]
			},
			"groupCollapsed": function() {
				[native]
			},
			"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
				// We have to test new.target here to see if this function is called
				// with new, because we need to define a custom instanceof to accommodate
				// the global console.
				if (new.target === undefined) {
					return ReflectConstruct(Console, arguments);
				}

				if (!options || typeof options.write === 'function') {
					options = {
						stdout: options,
						stderr: arguments[1],
						ignoreErrors: arguments[2]
					};
				}

				const {
					stdout,
					stderr = stdout,
					ignoreErrors = true,
					colorMode = 'auto',
					inspectOptions,
					groupIndentation,
				} = options;

				if (!stdout || typeof stdout.write !== 'function') {
					throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
				}
				if (!stderr || typeof stderr.write !== 'function') {
					throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
				}

				if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
					throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

				if (groupIndentation !== undefined) {
					validateInteger(groupIndentation, 'groupIndentation',
						0, kMaxGroupIndentation);
				}

				if (inspectOptions !== undefined) {
					validateObject(inspectOptions, 'options.inspectOptions');

					if (inspectOptions.colors !== undefined &&
						options.colorMode !== undefined) {
						throw new ERR_INCOMPATIBLE_OPTION_PAIR(
							'options.inspectOptions.color', 'colorMode');
					}
					optionsMap.set(this, inspectOptions);
				}

				// Bind the prototype functions to this Console instance
				ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
					// We have to bind the methods grabbed from the instance instead of from
					// the prototype so that users extending the Console can override them
					// from the prototype chain of the subclass.
					this[key] = FunctionPrototypeBind(this[key], this);
					ObjectDefineProperty(this[key], 'name', {
						__proto__: null,
						value: key
					});
				});

				this[kBindStreamsEager](stdout, stderr);
				this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
			},
			"profile": function profile() {
				[native]
			},
			"profileEnd": function profileEnd() {
				[native]
			},
			"timeStamp": function timeStamp() {
				[native]
			},
			"context": function context() {
				[native]
			}
		},
		"transport": {
			"endpoint": "mongodb://192.168.233.128:27017/psychic",
			"authType": undefined,
			"protocol": "HTTP",
			"logger": {
				"log": function() {},
				"info": function() {},
				"warn": function() {},
				"error": function() {},
				"debug": function() {}
			},
			"appId": "all",
			"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
			"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
			"timeout": 10000,
			"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
			"httpRequest": function request(url, args, callback) {
				// request(url, callback)
				if (arguments.length === 2 && typeof args === 'function') {
					callback = args;
					args = null;
				}
				if (typeof callback === 'function') {
					return exports.requestWithCallback(url, args, callback);
				}

				// Promise
				if (!_Promise) {
					_Promise = require('any-promise');
				}
				return new _Promise(function(resolve, reject) {
					exports.requestWithCallback(url, args, makeCallback(resolve, reject));
				});
			}
		},
		"pkg": {
			"name": "@alicloud/mpserverless-node-sdk",
			"author": "junmo <qwe_lingkun@163.com>",
			"version": "1.2.3",
			"description": "Ant MPServerless JavaScript SDK for FaaS Egg Framework",
			"main": "dist/index.js",
			"types": "dist/index.d.ts",
			"files": ["dist"],
			"license": "MIT",
			"engines": {
				"node": ">=8.0.0"
			},
			"publishConfig": {
				"access": "public"
			},
			"scripts": {
				"tsc": "tsc -p tsconfig.json",
				"tsc:w": "npm run tsc -- -w"
			},
			"dependencies": {
				"@alicloud/mp-db-service": "^3.0.0",
				"@alicloud/mp-function-service": "^3.0.0",
				"@alicloud/mpserverless-node-file-service": "^1.2.0",
				"@alicloud/mpserverless-node-user-service": "^1.2.0",
				"@alicloud/mpserverless-core": "^3.0.0",
				"tslib": "^1.9.3",
				"urllib": "^2.34.2"
			}
		},
		"db": {
			"transport": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"authType": undefined,
				"protocol": "HTTP",
				"logger": {
					"log": function() {},
					"info": function() {},
					"warn": function() {},
					"error": function() {},
					"debug": function() {}
				},
				"appId": "all",
				"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"timeout": 10000,
				"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
				"httpRequest": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			},
			"toJSON": function() {
				return "_db"
			}
		},
		"user": {
			"transport": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"authType": undefined,
				"protocol": "HTTP",
				"logger": {
					"log": function() {},
					"info": function() {},
					"warn": function() {},
					"error": function() {},
					"debug": function() {}
				},
				"appId": "all",
				"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"timeout": 10000,
				"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
				"httpRequest": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			}
		},
		"file": {
			"transport": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"authType": undefined,
				"protocol": "HTTP",
				"logger": {
					"log": function() {},
					"info": function() {},
					"warn": function() {},
					"error": function() {},
					"debug": function() {}
				},
				"appId": "all",
				"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"timeout": 10000,
				"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
				"httpRequest": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			},
			"request": function request(url, args, callback) {
				// request(url, callback)
				if (arguments.length === 2 && typeof args === 'function') {
					callback = args;
					args = null;
				}
				if (typeof callback === 'function') {
					return exports.requestWithCallback(url, args, callback);
				}

				// Promise
				if (!_Promise) {
					_Promise = require('any-promise');
				}
				return new _Promise(function(resolve, reject) {
					exports.requestWithCallback(url, args, makeCallback(resolve, reject));
				});
			}
		},
		"function": {
			"transport": {
				"endpoint": "mongodb://192.168.233.128:27017/psychic",
				"authType": undefined,
				"protocol": "HTTP",
				"logger": {
					"log": function() {},
					"info": function() {},
					"warn": function() {},
					"error": function() {},
					"debug": function() {}
				},
				"appId": "all",
				"appSecret": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQupa6GPOHWW+Ewr/GRxOoMxDB3uxkyn0L8mIKyRO0yUziYrOjevdjZ1g+2J71YGBttTn3RZ3HAjKLxQD6jZKjG/cVPhgEQ7yKt//i1OrlifQawvBEfxgjn1Lv+enD1SfqhlFf2rRhDPcw12kOrhXFIGFwCPQEf7iwupSYEfBHY/C9w7XXrLKPJwh7G2bT7nOfDFif8OtfXU6Xq7zC6FlWFCn+2c6PJFq/4qZllHxjnka0fl+WChPFb0BOIYRpProamH00Q6DTgZCHJRf2Toh9baXdm08KyiZM2xsS+0oFmRN1xcVKyW3+7u9vEBv0rYg4gIUn6xmMZwKU6rOROu6jAgMBAAECggEAH3Qdu9YeXwUF4oF8sjfSQtTOSIQNNh53rLgBrLxkhv7UscKnrdjUmQrlt8rWSRen/U/MiDvd/Vkx6QRooQtRmhdCzKAREiQyfqdcekyxvC8OGR7SnuBMO7mtia/zqPbTVPnaB439c7YgpsG5+FHHM29FHdckSTIEzovOLXqAkNMIOwnuYJ5SHMWxqA9zC2vDKwAfGbXY0a0WiAB+K/aUcRmMwSwtPoAUwNZs6LvBGUviEeq8vavszSm7ISlwO/MyPV9wSHEmtwIanxUWG9Zu2jltyMv4zriebGZYCnKWj0j8k/vio5GfVldUZsdNCbV2dZuawIbWpfgUhoQViDnM4QKBgQDZsyxA0BpzhYwNYM+Yw0qMNlawQJHd73Po8qFnUj135vCZQonNBf+pxGReL6RSoA9Dx172H8xM4oOulxFB6XtnwarYf2NZTDkFYfwwa9DTVcGvhcuLNF1EW+gABySfCdycGqnR0x/rEs9NKVNvPVCkDi638x7OxbjZ8EHEdiZ7UQKBgQCqMO09A3XxQ3LIrD2xlDYlTAAVzLl4B68DvXdb/gkS3iB+lkyek/5d5CkAUBiSNVnI21BuuIjTpWwl6ReamXCRMPp7mk2Xx0FTIrh5qzq+OErZmVSLTDeyGEMrti6vaDvd17sUULVW/sSw/a+FbOyyNws2VRF4SgBYAuKg/IAlswKBgB6X+W4aUL1PVUFEC6iSOVW/BSu7x0QDNKzV/CzC9/Rztfgzy53ObAF1og1CcLtT1xFVYVkBWvqrEopknH5Ay6DnLJVEQbf46EKDZKeBX1VzxcZe7R3g/AJxUAdA+bqH7kLZ1GeyXdfxSsSzPBBz83M6swIS3o98Zd/qzbNIT1whAoGAdVGe6HVPQ04kfRLGwHgTzygR0vU6UPSy/5gHBKIcrSX0Lm77SEFqklyqqu2L0pX2W5BbZMfOgl9BKu0AeXEWeO/Ta4sVu+/+JwoDMtQHfYMejdu1vQSATEOPYj2G9yGaSzXgX4O3Tc331q455XcNv1hUYVLI5SvWCtWKVkFZMSMCgYEAz6maffaHd5OB+fNnw9RfLIm6fNZ4KYMgS47d6NMQKWLZyttM4OnXNDHzUa3RsucHObdk3n3Qq7/rQ46jlgBIghNtcRSc/3E0xhIroi8AOeJUSGILjXzVeWgYCZAAwwRKXL/aBjJVP/o94yr+3iu5ewJQFmj0WGAshV4zvAXjK+M=\n-----END PRIVATE KEY-----",
				"spaceId": "mp-a7a9e4b6-5073-4e51-854a-44dbd85438b7",
				"timeout": 10000,
				"ua": "pkg_name:@alicloud/mpserverless-node-sdk;ver:1.2.3;",
				"httpRequest": function request(url, args, callback) {
					// request(url, callback)
					if (arguments.length === 2 && typeof args === 'function') {
						callback = args;
						args = null;
					}
					if (typeof callback === 'function') {
						return exports.requestWithCallback(url, args, callback);
					}

					// Promise
					if (!_Promise) {
						_Promise = require('any-promise');
					}
					return new _Promise(function(resolve, reject) {
						exports.requestWithCallback(url, args, makeCallback(resolve, reject));
					});
				}
			}
		},
		"httpProxyClient": {
			"get": (url, query) => this.user.proxyHttpClientGetRequest(url, query),
			"post": (url, text, header) => this.user.proxyHttpClientPostRequest(url, text, header),
			"postJson": (url, json, header) => this.user.proxyHttpClientPostJsonRequest(url, json, header),
			"postForm": (url, data, header) => this.user.proxyHttpClientPostFormDataRequest(url, data, header)
		}
	},
	"auth": function() {
		throw new Error(`${阿里云}服务空间暂不支持 ${e}`)
	},
	"customAuth": function() {
		throw new Error(`${阿里云}服务空间暂不支持 ${e}`)
	},
	"uploadFile": async function(t = {}) {
		const r = {
			fileName: t.cloudPath
		};
		return Buffer.isBuffer(t.fileContent) ? r.fileBuffer = t.fileContent : r.filePath = t.fileContent, e.$scope
			.file.uploadFile(r).then(e => ({
				fileID: e.fileUrl
			}))
	},
	"deleteFile": async function({
		fileList: t = []
	} = {}) {
		if (!Array.isArray(t) || !t.length) return {
			fileList: []
		};
		if (function(e) {
				const t = e.env.MP_RUNTIME_VERSION;
				return !(!t || "string" != typeof t) && parseInt(t.split(".")[0]) >= 2
			}(e.$context)) return E(t);
		const r = [];
		t.forEach(e => {
			e && r.push(b(e))
		});
		return {
			fileList: await Promise.all(r)
		}
	},
	"getUploadFileOptions": async function({
		cloudPath: t = ""
	} = {}) {
		return e.$scope.file.getUploadFileOptions({
			filePath: t
		})
	},
	"getTempFileURL": async function({
		fileList: e
	} = {}) {
		if (!Array.isArray(e) || 0 === e.length) throw new r({
			code: "INVALID_PARAM",
			message: "fileList的元素必须是非空的字符串"
		});
		return {
			fileList: e.map(e => ({
				fileID: e,
				tempFileURL: e
			}))
		}
	},
	"getFileInfo": async function({
		fileList: t
	} = {}) {
		if (!Array.isArray(t) || 0 === t.length) throw new r({
			code: "INVALID_PARAM",
			message: "fileList的元素必须是非空的字符串"
		});
		const {
			result: n
		} = await e.$scope.file.info(t);
		return {
			fileList: n
		}
	},
	"downloadFile": function() {
		throw new Error(`${阿里云}服务空间暂不支持 ${e}`)
	},
	"logger": {
		"log": function() {
			[native]
		},
		"warn": function() {
			[native]
		},
		"dir": function() {
			[native]
		},
		"time": function() {
			[native]
		},
		"timeEnd": function() {
			[native]
		},
		"timeLog": function() {
			[native]
		},
		"trace": function() {
			[native]
		},
		"assert": function() {
			[native]
		},
		"clear": function() {
			[native]
		},
		"count": function() {
			[native]
		},
		"countReset": function() {
			[native]
		},
		"group": function() {
			[native]
		},
		"groupEnd": function() {
			[native]
		},
		"table": function() {
			[native]
		},
		"debug": function() {
			[native]
		},
		"info": function() {
			[native]
		},
		"dirxml": function() {
			[native]
		},
		"error": function() {
			[native]
		},
		"groupCollapsed": function() {
			[native]
		},
		"Console": function Console(options /* or: stdout, stderr, ignoreErrors = true */ ) {
			// We have to test new.target here to see if this function is called
			// with new, because we need to define a custom instanceof to accommodate
			// the global console.
			if (new.target === undefined) {
				return ReflectConstruct(Console, arguments);
			}

			if (!options || typeof options.write === 'function') {
				options = {
					stdout: options,
					stderr: arguments[1],
					ignoreErrors: arguments[2]
				};
			}

			const {
				stdout,
				stderr = stdout,
				ignoreErrors = true,
				colorMode = 'auto',
				inspectOptions,
				groupIndentation,
			} = options;

			if (!stdout || typeof stdout.write !== 'function') {
				throw new ERR_CONSOLE_WRITABLE_STREAM('stdout');
			}
			if (!stderr || typeof stderr.write !== 'function') {
				throw new ERR_CONSOLE_WRITABLE_STREAM('stderr');
			}

			if (typeof colorMode !== 'boolean' && colorMode !== 'auto')
				throw new ERR_INVALID_ARG_VALUE('colorMode', colorMode);

			if (groupIndentation !== undefined) {
				validateInteger(groupIndentation, 'groupIndentation',
					0, kMaxGroupIndentation);
			}

			if (inspectOptions !== undefined) {
				validateObject(inspectOptions, 'options.inspectOptions');

				if (inspectOptions.colors !== undefined &&
					options.colorMode !== undefined) {
					throw new ERR_INCOMPATIBLE_OPTION_PAIR(
						'options.inspectOptions.color', 'colorMode');
				}
				optionsMap.set(this, inspectOptions);
			}

			// Bind the prototype functions to this Console instance
			ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
				// We have to bind the methods grabbed from the instance instead of from
				// the prototype so that users extending the Console can override them
				// from the prototype chain of the subclass.
				this[key] = FunctionPrototypeBind(this[key], this);
				ObjectDefineProperty(this[key], 'name', {
					__proto__: null,
					value: key
				});
			});

			this[kBindStreamsEager](stdout, stderr);
			this[kBindProperties](ignoreErrors, colorMode, groupIndentation);
		},
		"profile": function profile() {
			[native]
		},
		"profileEnd": function profileEnd() {
			[native]
		},
		"timeStamp": function timeStamp() {
			[native]
		},
		"context": function context() {
			[native]
		}
	},
	"database": function(t) {
		return e.$scope.db.toJSON = function() {
			return "_db"
		// }, new At(e.$scope.db, t)
		}, e.$scope.db, t
	},
	"callFunction": async function({
		name: e,
		data: n
	} = {}) {
		const {
			realWorkspace: o,
			provider: r
		} = global.uniCloudDebug, i = W(o, r, e);
		let s;
		try {
			s = a.default.statSync(c.default.resolve(i, "encrypt"))
		} catch (e) {}
		if (s && s.isFile()) throw new E({
			code: "FUNCTION_ENCRYPTED",
			message: "此云函数已加密，不可本地运行"
		});
		de(i);
		try {
			const o = a.default.existsSync(c.default.resolve(i, "index.js")),
				r = a.default.existsSync(c.default.resolve(i, "index.obj.js"));
			if (o) {
				if (r) throw new Error("index.js和index.obj.js不可同时存在");
				return {
					success: !0,
					result: await require(i).main(n, {
						...t(),
						FUNCTION_NAME: e,
						FUNCTION_TYPE: "cloudfunction"
					})
				}
			}
			if (r) {
				return {
					success: !0,
					result: await pe({
						functionPath: i,
						event: n,
						context: {
							...t(),
							FUNCTION_NAME: e,
							FUNCTION_TYPE: "cloudobject"
						}
					})
				}
			}
			throw new Error("云函数名称错误或所请求云函数在cloudfunctions目录不存在，如果云端已上传可以下载到本地")
		} catch (e) {
			throw "MODULE_NOT_FOUND" === e.code && console.error(
				"请求云函数错误，可能是由于云函数名称错误或者引用的其他模块未找到导致的，请参考下方详细错误信息。注意公共模块需要参考 https://uniapp.dcloud.net.cn/uniCloud/cf-common 进行本地安装。"
				), e
		}
	},
	"httpclient": {
		"_events": {},
		"_eventsCount": 0,
		"_maxListeners": undefined,
		"agent": {
			"_events": {
				"free": (socket, options) => {
					const name = this.getName(options);
					debug('agent.on(free)', name);

					// TODO(ronag): socket.destroy(err) might have been called
					// before coming here and have an 'error' scheduled. In the
					// case of socket.destroy() below this 'error' has no handler
					// and could cause unhandled exception.

					if (!socket.writable) {
						socket.destroy();
						return;
					}

					const requests = this.requests[name];
					if (requests && requests.length) {
						const req = ArrayPrototypeShift(requests);
						const reqAsyncRes = req[kRequestAsyncResource];
						if (reqAsyncRes) {
							// Run request within the original async context.
							reqAsyncRes.runInAsyncScope(() => {
								asyncResetHandle(socket);
								setRequestSocket(this, req, socket);
							});
							req[kRequestAsyncResource] = null;
						} else {
							setRequestSocket(this, req, socket);
						}
						if (requests.length === 0) {
							delete this.requests[name];
						}
						return;
					}

					// If there are no pending requests, then put it in
					// the freeSockets pool, but only if we're allowed to do so.
					const req = socket._httpMessage;
					if (!req || !req.shouldKeepAlive || !this.keepAlive) {
						socket.destroy();
						return;
					}

					const freeSockets = this.freeSockets[name] || [];
					const freeLen = freeSockets.length;
					let count = freeLen;
					if (this.sockets[name])
						count += this.sockets[name].length;

					if (this.totalSocketCount > this.maxTotalSockets ||
						count > this.maxSockets ||
						freeLen >= this.maxFreeSockets ||
						!this.keepSocketAlive(socket)) {
						socket.destroy();
						return;
					}

					this.freeSockets[name] = freeSockets;
					socket[async_id_symbol] = -1;
					socket._httpMessage = null;
					this.removeSocket(socket, options);

					socket.once('error', freeSocketErrorListener);
					ArrayPrototypePush(freeSockets, socket);
				},
				"newListener": function maybeEnableKeylog(eventName) {
					if (eventName === 'keylog') {
						this.removeListener('newListener', maybeEnableKeylog);
						// Future sockets will listen on keylog at creation.
						const agent = this;
						this[kOnKeylog] = function onkeylog(keylog) {
							agent.emit('keylog', keylog, this);
						};
						// Existing sockets will start listening on keylog now.
						const sockets = ObjectValues(this.sockets);
						for (let i = 0; i < sockets.length; i++) {
							sockets[i].on('keylog', this[kOnKeylog]);
						}
					}
				}
			},
			"_eventsCount": 2,
			"_maxListeners": undefined,
			"defaultPort": 80,
			"protocol": "http:",
			"options": {
				"path": null
			},
			"requests": {},
			"sockets": {},
			"freeSockets": {},
			"keepAliveMsecs": 1000,
			"keepAlive": false,
			"maxSockets": 1000,
			"maxFreeSockets": 256,
			"scheduling": "lifo",
			"maxTotalSockets": Infinity,
			"totalSocketCount": 0,
			"Symbol(kCapture)": false
		},
		"hasCustomAgent": false,
		"httpsAgent": {
			"_events": {
				"free": (socket, options) => {
					const name = this.getName(options);
					debug('agent.on(free)', name);

					// TODO(ronag): socket.destroy(err) might have been called
					// before coming here and have an 'error' scheduled. In the
					// case of socket.destroy() below this 'error' has no handler
					// and could cause unhandled exception.

					if (!socket.writable) {
						socket.destroy();
						return;
					}

					const requests = this.requests[name];
					if (requests && requests.length) {
						const req = ArrayPrototypeShift(requests);
						const reqAsyncRes = req[kRequestAsyncResource];
						if (reqAsyncRes) {
							// Run request within the original async context.
							reqAsyncRes.runInAsyncScope(() => {
								asyncResetHandle(socket);
								setRequestSocket(this, req, socket);
							});
							req[kRequestAsyncResource] = null;
						} else {
							setRequestSocket(this, req, socket);
						}
						if (requests.length === 0) {
							delete this.requests[name];
						}
						return;
					}

					// If there are no pending requests, then put it in
					// the freeSockets pool, but only if we're allowed to do so.
					const req = socket._httpMessage;
					if (!req || !req.shouldKeepAlive || !this.keepAlive) {
						socket.destroy();
						return;
					}

					const freeSockets = this.freeSockets[name] || [];
					const freeLen = freeSockets.length;
					let count = freeLen;
					if (this.sockets[name])
						count += this.sockets[name].length;

					if (this.totalSocketCount > this.maxTotalSockets ||
						count > this.maxSockets ||
						freeLen >= this.maxFreeSockets ||
						!this.keepSocketAlive(socket)) {
						socket.destroy();
						return;
					}

					this.freeSockets[name] = freeSockets;
					socket[async_id_symbol] = -1;
					socket._httpMessage = null;
					this.removeSocket(socket, options);

					socket.once('error', freeSocketErrorListener);
					ArrayPrototypePush(freeSockets, socket);
				},
				"newListener": function maybeEnableKeylog(eventName) {
					if (eventName === 'keylog') {
						this.removeListener('newListener', maybeEnableKeylog);
						// Future sockets will listen on keylog at creation.
						const agent = this;
						this[kOnKeylog] = function onkeylog(keylog) {
							agent.emit('keylog', keylog, this);
						};
						// Existing sockets will start listening on keylog now.
						const sockets = ObjectValues(this.sockets);
						for (let i = 0; i < sockets.length; i++) {
							sockets[i].on('keylog', this[kOnKeylog]);
						}
					}
				}
			},
			"_eventsCount": 2,
			"_maxListeners": undefined,
			"defaultPort": 443,
			"protocol": "https:",
			"options": {
				"path": null
			},
			"requests": {},
			"sockets": {},
			"freeSockets": {},
			"keepAliveMsecs": 1000,
			"keepAlive": false,
			"maxSockets": 1000,
			"maxFreeSockets": 256,
			"scheduling": "lifo",
			"maxTotalSockets": Infinity,
			"totalSocketCount": 0,
			"maxCachedSessions": 100,
			"_sessionCache": {
				"map": {},
				"list": []
			},
			"Symbol(kCapture)": false
		},
		"hasCustomHttpsAgent": false,
		"defaultArgs": undefined,
		"Symbol(kCapture)": false
	},
	"httpProxyForEip": {
		"get": async function(...e) {
			const t = await s(...e);
			let r, n;
			return "string" == typeof t ? (r = t, n = JSON.parse(r)) : (n = t, r = JSON.stringify(n)), Object
				.defineProperty(n, "toString", {
					get: () => function() {
						return r
					}
				}), n
		},
		"postForm": async function(...e) {
			const t = await s(...e);
			let r, n;
			return "string" == typeof t ? (r = t, n = JSON.parse(r)) : (n = t, r = JSON.stringify(n)), Object
				.defineProperty(n, "toString", {
					get: () => function() {
						return r
					}
				}), n
		},
		"postJson": async function(...e) {
			const t = await s(...e);
			let r, n;
			return "string" == typeof t ? (r = t, n = JSON.parse(r)) : (n = t, r = JSON.stringify(n)), Object
				.defineProperty(n, "toString", {
					get: () => function() {
						return r
					}
				}), n
		},
		"post": async function(...e) {
			const t = await s(...e);
			let r, n;
			return "string" == typeof t ? (r = t, n = JSON.parse(r)) : (n = t, r = JSON.stringify(n)), Object
				.defineProperty(n, "toString", {
					get: () => function() {
						return r
					}
				}), n
		}
	}
}


module.exports = e;