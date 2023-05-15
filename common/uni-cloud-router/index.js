"use strict";
Object.defineProperty(exports, "__esModule", {
	value: !0
});
var e = require("fs"),
	t = require("path"),
	n = require("events"),
	r = require("querystring");

function o(e) {
	return e && "object" == typeof e && "default" in e ? e : {
		default: e
	}
}
var i = o(e),
	s = o(t);

function c(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var a = c((function(e, t) {
	! function(n) {
		const r = Function.prototype.toString;

		function o(e) {
			if ("function" != typeof e) return !1;
			if (/^class[\s{]/.test(r.call(e))) return !0;
			const t = function(e) {
				return r.call(e).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "")
			}(e);
			return /classCallCheck\(/.test(t) || /TypeError\("Cannot call a class as a function"\)/.test(t)
		}
		e.exports && (t = e.exports = o), t.isClass = o
	}()
}));
a.isClass;
var u, f = c((function(e) {
		const t = {};
		e.exports = function(n = "./", ...r) {
			const o = new Map,
				c = {};
			return o.set(c, {
					path: s.default.isAbsolute(n) ? s.default.join(n, "./") : s.default.join(s.default
						.dirname(e.parent.filename), n, "./"),
					is_class: !1
				}),
				function e(n) {
					return new Proxy(n, {
						get: (n, s) => {
							if (s in n || "symbol" == typeof s || "inspect" == s) return n[s];
							const c = o.get(n);
							if (c.is_class) return c.instance || (c.instance = new n(...r)), c
								.instance[s] ? c.instance[s] : "$map" == s ? c : c.instance[
									s];
							if ("$map" == s) return c;
							let u = {};
							const f = c.path + s + "/",
								l = c.path + s + ".js";
							if (t[f] || ((e => i.default.existsSync(e) && i.default.statSync(e)
									.isFile())(l) ? t[f] = "file" : (e => i.default
									.existsSync(e) && i.default.statSync(e).isDirectory())(
									f) ? t[f] = "dir" : t[f] = "none"), "file" == t[f]) u =
								require(l), u.__esModule && (u = u.default);
							else if ("dir" != t[f]) return;
							return o.set(u, {
								path: f,
								is_class: a(u)
							}), n[s] = e(u), n[s]
						},
						set: (e, t, n) => {
							if (t in e) return e[t] = n, !0;
							const i = o.get(e);
							return i.is_class ? (i.instance || (i.instance = new e(...r)), i
								.instance[t] = n, !0) : (e[t] = n, !0)
						}
					})
				}(c)
		}
	})),
	l = (u = f) && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;

function d(e, t) {
	void 0 === t && (t = {});
	for (var n = function(e) {
				for (var t = [], n = 0; n < e.length;) {
					var r = e[n];
					if ("*" !== r && "+" !== r && "?" !== r)
						if ("\\" !== r)
							if ("{" !== r)
								if ("}" !== r)
									if (":" !== r)
										if ("(" !== r) t.push({
											type: "CHAR",
											index: n,
											value: e[n++]
										});
										else {
											var o = 1,
												i = "";
											if ("?" === e[c = n + 1]) throw new TypeError(
												'Pattern cannot start with "?" at '.concat(c));
											for (; c < e.length;)
												if ("\\" !== e[c]) {
													if (")" === e[c]) {
														if (0 == --o) {
															c++;
															break
														}
													} else if ("(" === e[c] && (o++, "?" !== e[c + 1]))
													throw new TypeError("Capturing groups are not allowed at "
															.concat(c));
													i += e[c++]
												} else i += e[c++] + e[c++];
											if (o) throw new TypeError("Unbalanced pattern at ".concat(n));
											if (!i) throw new TypeError("Missing pattern at ".concat(n));
											t.push({
												type: "PATTERN",
												index: n,
												value: i
											}), n = c
										}
					else {
						for (var s = "", c = n + 1; c < e.length;) {
							var a = e.charCodeAt(c);
							if (!(a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || 95 === a)) break;
							s += e[c++]
						}
						if (!s) throw new TypeError("Missing parameter name at ".concat(n));
						t.push({
							type: "NAME",
							index: n,
							value: s
						}), n = c
					} else t.push({
						type: "CLOSE",
						index: n,
						value: e[n++]
					});
					else t.push({
						type: "OPEN",
						index: n,
						value: e[n++]
					});
					else t.push({
						type: "ESCAPED_CHAR",
						index: n++,
						value: e[n++]
					});
					else t.push({
						type: "MODIFIER",
						index: n,
						value: e[n++]
					})
				}
				return t.push({
					type: "END",
					index: n,
					value: ""
				}), t
			}(e), r = t.prefixes, o = void 0 === r ? "./" : r, i = "[^".concat(p(t.delimiter || "/#?"), "]+?"), s = [],
			c = 0, a = 0, u = "", f = function(e) {
				if (a < n.length && n[a].type === e) return n[a++].value
			}, l = function(e) {
				var t = f(e);
				if (void 0 !== t) return t;
				var r = n[a],
					o = r.type,
					i = r.index;
				throw new TypeError("Unexpected ".concat(o, " at ").concat(i, ", expected ").concat(e))
			}, d = function() {
				for (var e, t = ""; e = f("CHAR") || f("ESCAPED_CHAR");) t += e;
				return t
			}; a < n.length;) {
		var h = f("CHAR"),
			y = f("NAME"),
			m = f("PATTERN");
		if (y || m) {
			var v = h || ""; - 1 === o.indexOf(v) && (u += v, v = ""), u && (s.push(u), u = ""), s.push({
				name: y || c++,
				prefix: v,
				suffix: "",
				pattern: m || i,
				modifier: f("MODIFIER") || ""
			})
		} else {
			var g = h || f("ESCAPED_CHAR");
			if (g) u += g;
			else if (u && (s.push(u), u = ""), f("OPEN")) {
				v = d();
				var w = f("NAME") || "",
					x = f("PATTERN") || "",
					E = d();
				l("CLOSE"), s.push({
					name: w || (x ? c++ : ""),
					pattern: w && !x ? i : x,
					prefix: v,
					suffix: E,
					modifier: f("MODIFIER") || ""
				})
			} else l("END")
		}
	}
	return s
}

function p(e) {
	return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
}

function h(e) {
	return e && e.sensitive ? "" : "i"
}

function y(e, t, n) {
	return function(e, t, n) {
		void 0 === n && (n = {});
		for (var r = n.strict, o = void 0 !== r && r, i = n.start, s = void 0 === i || i, c = n.end, a = void 0 ===
				c || c, u = n.encode, f = void 0 === u ? function(e) {
					return e
				} : u, l = n.delimiter, d = void 0 === l ? "/#?" : l, y = n.endsWith, m = "[".concat(p(void 0 ===
					y ? "" : y), "]|$"), v = "[".concat(p(d), "]"), g = s ? "^" : "", w = 0, x = e; w < x
			.length; w++) {
			var E = x[w];
			if ("string" == typeof E) g += p(f(E));
			else {
				var b = p(f(E.prefix)),
					C = p(f(E.suffix));
				if (E.pattern)
					if (t && t.push(E), b || C)
						if ("+" === E.modifier || "*" === E.modifier) {
							var A = "*" === E.modifier ? "?" : "";
							g += "(?:".concat(b, "((?:").concat(E.pattern, ")(?:").concat(C).concat(b, "(?:")
								.concat(E.pattern, "))*)").concat(C, ")").concat(A)
						} else g += "(?:".concat(b, "(").concat(E.pattern, ")").concat(C, ")").concat(E.modifier);
				else "+" === E.modifier || "*" === E.modifier ? g += "((?:".concat(E.pattern, ")").concat(E
					.modifier, ")") : g += "(".concat(E.pattern, ")").concat(E.modifier);
				else g += "(?:".concat(b).concat(C, ")").concat(E.modifier)
			}
		}
		if (a) o || (g += "".concat(v, "?")), g += n.endsWith ? "(?=".concat(m, ")") : "$";
		else {
			var O = e[e.length - 1],
				R = "string" == typeof O ? v.indexOf(O[O.length - 1]) > -1 : void 0 === O;
			o || (g += "(?:".concat(v, "(?=").concat(m, "))?")), R || (g += "(?=".concat(v, "|").concat(m, ")"))
		}
		return new RegExp(g, h(n))
	}(d(e, n), t, n)
}

function m(e, t, n) {
	return e instanceof RegExp ? function(e, t) {
		if (!t) return e;
		for (var n = /\((?:\?<(.*?)>)?(?!\?)/g, r = 0, o = n.exec(e.source); o;) t.push({
			name: o[1] || r++,
			prefix: "",
			suffix: "",
			modifier: "",
			pattern: ""
		}), o = n.exec(e.source);
		return e
	}(e, t) : Array.isArray(e) ? function(e, t, n) {
		var r = e.map((function(e) {
			return m(e, t, n).source
		}));
		return new RegExp("(?:".concat(r.join("|"), ")"), h(n))
	}(e, t, n) : y(e, t, n)
}
const v = "INVOKE_FUNCTION_FAILED",
	g = "undefined" != typeof uniCloud,
	w = () => !1,
	x = () => !0;

function E(e) {
	if ("string" == typeof e) {
		const t = m(e, [], {
			end: !1
		});
		return t.global && (t.lastIndex = 0), e => t.test(e.event.action)
	}
	if (e instanceof RegExp) return t => (e.global && (e.lastIndex = 0), e.test(t.event.action));
	if ("function" == typeof e) return e;
	if (Array.isArray(e)) {
		const t = e.map((e => E(e)));
		return e => t.some((t => t(e)))
	}
	throw new Error("match/ignore pattern must be RegExp, Array or String, but got " + e)
}
class b {
	constructor(e) {
		this.ctx = e, this.config = e.config, this.service = e.service, this.controller = e.controller, this.throw =
			e.throw, this.db = e.db, this.curl = e.curl, this.httpclient = e.httpclient
	}
	pick(e, t) {
		return e = e || {}, "string" == typeof t && (t = t.split(/ +/)), t.reduce((function(t, n) {
			return null == e[n] || (t[n] = e[n]), t
		}), {})
	}
}
var C = function(e) {
	if (!Array.isArray(e)) throw new TypeError("Middleware stack must be an array!");
	for (const t of e)
		if ("function" != typeof t) throw new TypeError("Middleware must be composed of functions!");
	return function(t, n) {
		let r = -1;
		return function o(i) {
			if (i <= r) return Promise.reject(new Error("next() called multiple times"));
			r = i;
			let s = e[i];
			i === e.length && (s = n);
			if (!s) return Promise.resolve();
			try {
				return Promise.resolve(s(t, o.bind(null, i + 1)))
			} catch (e) {
				return Promise.reject(e)
			}
		}(0)
	}
};
const A = e => "string" != typeof e,
	O = "application/json";

function R(e, t) {
	if (t) {
		const {
			headers: t,
			httpMethod: n,
			body: o,
			queryStringParameters: i
		} = e.event;
		if (function(e) {
				const t = Object.keys(e).find((e => "content-type" === e.toLowerCase()));
				t ? (e["content-type"] = e[t].toLowerCase(), "content-type" !== t && delete e[t]) : e["content-type"] =
					O
			}(t), e.query = i, "GET" === n) e.data = e.query;
		else if (e.data = Object.create(null), o) {
			const n = t["content-type"];
			if (n === O) try {
				e.data = JSON.parse(o)
			} catch (e) {} else n && 0 === n.indexOf("application/x-www-form-urlencoded") && (e.data = r.parse(o))
		}
	}
	e.set = function(t, n) {
		if (2 === arguments.length) Array.isArray(n) ? n = n.map((e => "string" == typeof e ? e : String(e))) :
			"string" != typeof n && (n = String(n)), e.headers[t] = n;
		else if (A(t))
			for (const n in t) e.set(n, t[n])
	}
}
async function _(e, t) {
	const n = function(e, t) {
		const n = t.env || null;
		return !(!n || "http" !== n.MP_SOURCE) || !(!e.httpMethod || !e.headers)
	}(e.event, e.context);
	if (R(e, n), n) {
		const n = {
			"content-type": O
		};
		try {
			await t()
		} catch (t) {
			const r = {
				code: t.code || v,
				message: t.message
			};
			return !0 === e.config.debug && (r.stack = t.stack || ""), e.body = {
				mpserverlessComposedResponse: !0,
				statusCode: 400,
				headers: n,
				body: JSON.stringify(r)
			}
		}
		const r = e.headers["content-type"] || O;
		e.body = {
			mpserverlessComposedResponse: !0,
			isBase64Encoded: !!e.isBase64Encoded,
			statusCode: e.status,
			headers: Object.assign(e.headers, {
				"content-type": r
			}),
			body: r === O ? JSON.stringify(e.body) : e.body
		}
	} else await t()
}

function M(e) {
	const t = async function(t) {
		t.throw(e)
	};
	return t._name = "error", t
}
class S extends n.EventEmitter {
	constructor(e) {
		super(), this.middleware = [], this.config = e || {};
		const {
			baseDir: t = process.cwd(),
			middleware: n
		} = this.config;
		this.serviceDir = s.default.resolve(t, "service"), this.controllerDir = s.default.resolve(t,
			"controller"), this.initMiddleware(n)
	}
	use(e, t) {
		if ("function" != typeof e) throw new TypeError("middleware must be a function");
		return this.middleware.push(this.wrapMiddleware(e, t)), this
	}
	async serve(e, t) {
		const n = function(e, t, n, r, o) {
				const i = {
					state: {},
					event: t,
					context: n
				};
				return i.config = e, i.service = l(r, i), i.controller = l(o, i), i.query = Object.create(null),
					i.data = t.data || Object.create(null), i.status = 200, i.headers = Object.create(null), 
					i.throw = (e, t) => {
						if (t) throw {
							code: e,
							message: t
						};
						throw {
							code: v,
							message: e
						}
					}, g && (i.db = uniCloud.database(), i.curl = uniCloud.httpclient.request.bind(uniCloud.httpclient), 
						i.httpclient = uniCloud.httpclient), i
			}(this.config, e || g && uniCloud.$args, t || g && uniCloud.$ctx, this.serviceDir, this
				.controllerDir),
			r = this.controller(n);
		let o;
		return o = "error" === r._name ? C([_, r]) : C(this.middleware.concat(r)), new Promise((e => {
			o(n).then((() => {
				e(this.respond(n))
			})).catch((t => {
				e(this.failed(t))
			}))
		}))
	}
	initMiddleware(e) {
		this.use(_, {
			name: "http"
		}), Array.isArray(e) && e.forEach((([e, t]) => {
			this.use(e, t)
		}))
	}
	wrapMiddleware(e, t) {
		const n = function(e) {
				if (!e) return x;
				const {
					enable: t,
					match: n,
					ignore: r
				} = e;
				if (!1 === t) return w;
				if (!n && !r) return x;
				if (n && r) throw new Error("options.match and options.ignore can not both present");
				const o = E(n || r);
				return function(e) {
					const t = o(e);
					return n ? t : !t
				}
			}(t),
			r = (t, r) => n(t) ? e(t, r) : r();
		return t && t.name && (r._name = t.name), r._name || (r._name = e._name || e.name), r
	}
	controller(e) {
		const t = function(e) {
			!e.action && e.path && (e.action = e.path.substr(1));
			let t = String(e.action || "");
			return t.startsWith("/") && (e.action = t = t.substr(1)), t
		}(e.event);
		if (!t) return M("action is required");
		const n = t.split("/").filter(Boolean),
			r = n.length;
		if (1 === r) return M('action must contain "/"');
		const o = n[r - 1];
		let i = e.controller;
		for (let e = 0; e < r - 1; e++) i = i[n[e]];
		if (!i) return M(`controller/${t.replace(new RegExp("/" + o + "$"), "")} not found`);
		const s = i[o];
		if ("function" != typeof s) return M(
			`controller/${t.replace(new RegExp("/" + o + "$"), "." + o)} is not a function`);
		const c = async function(e) {
			const t = await s.call(i, e);
			void 0 !== t && (e.body = t)
		};
		return c._name = o, c
	}
	failed(e) {
		const t = {
			code: e.code || v,
			message: e.message || e
		};
		return !0 === this.config.debug && (t.stack = e.stack || ""), t
	}
	respond(e) {
		return e.body
	}
}
const P = b,
	T = b;
exports.Controller = T, exports.Router = S, exports.Service = P;