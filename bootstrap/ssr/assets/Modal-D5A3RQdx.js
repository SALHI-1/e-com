import { _ as t$3, a as i$4, b as s$4, c as T$2, d as A$1, f as K, g as o$5, h as u$5, i as p$3, l as y$2, m as o$6, n as Oe, o as s$5, p as Y, r as f$6, s as u$6, t as Ke$1, u as l$4, v as s$3, y as n$5 } from "./transition-MXKqs4Qd.js";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { Fragment as Fragment$1, createContext, createRef, useCallback, useContext, useEffect, useId, useId as r$4, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { createPortal } from "react-dom";
//#region node_modules/@headlessui/react/dist/components/keyboard.js
var o$4 = ((r) => (r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o$4 || {});
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-event-listener.js
function E$1(n, e, a, t) {
	let i = s$3(a);
	useEffect(() => {
		n = n != null ? n : window;
		function r(o) {
			i.current(o);
		}
		return n.addEventListener(e, r, t), () => n.removeEventListener(e, r, t);
	}, [
		n,
		e,
		t
	]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/default-map.js
var a$10 = class extends Map {
	constructor(t) {
		super();
		this.factory = t;
	}
	get(t) {
		let e = super.get(t);
		return e === void 0 && (e = this.factory(t), this.set(t, e)), e;
	}
};
//#endregion
//#region node_modules/@headlessui/react/dist/machine.js
var h$2 = Object.defineProperty;
var v$1 = (t, e, r) => e in t ? h$2(t, e, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: r
}) : t[e] = r;
var S$3 = (t, e, r) => (v$1(t, typeof e != "symbol" ? e + "" : e, r), r), b = (t, e, r) => {
	if (!e.has(t)) throw TypeError("Cannot " + r);
};
var i$3 = (t, e, r) => (b(t, e, "read from private field"), r ? r.call(t) : e.get(t)), c$3 = (t, e, r) => {
	if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
	e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, u$4 = (t, e, r, s) => (b(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
var n$4, a$9, o$3;
var T$1 = class {
	constructor(e) {
		c$3(this, n$4, {});
		c$3(this, a$9, new a$10(() => /* @__PURE__ */ new Set()));
		c$3(this, o$3, /* @__PURE__ */ new Set());
		S$3(this, "disposables", o$5());
		u$4(this, n$4, e), s$4.isServer && this.disposables.microTask(() => {
			this.dispose();
		});
	}
	dispose() {
		this.disposables.dispose();
	}
	get state() {
		return i$3(this, n$4);
	}
	subscribe(e, r) {
		if (s$4.isServer) return () => {};
		let s = {
			selector: e,
			callback: r,
			current: e(i$3(this, n$4))
		};
		return i$3(this, o$3).add(s), this.disposables.add(() => {
			i$3(this, o$3).delete(s);
		});
	}
	on(e, r) {
		return s$4.isServer ? () => {} : (i$3(this, a$9).get(e).add(r), this.disposables.add(() => {
			i$3(this, a$9).get(e).delete(r);
		}));
	}
	send(e) {
		let r = this.reduce(i$3(this, n$4), e);
		if (r !== i$3(this, n$4)) {
			u$4(this, n$4, r);
			for (let s of i$3(this, o$3)) {
				let l = s.selector(i$3(this, n$4));
				j$2(s.current, l) || (s.current = l, s.callback(l));
			}
			for (let s of i$3(this, a$9).get(e.type)) s(i$3(this, n$4), e);
		}
	}
};
n$4 = /* @__PURE__ */ new WeakMap(), a$9 = /* @__PURE__ */ new WeakMap(), o$3 = /* @__PURE__ */ new WeakMap();
function j$2(t, e) {
	return Object.is(t, e) ? !0 : typeof t != "object" || t === null || typeof e != "object" || e === null ? !1 : Array.isArray(t) && Array.isArray(e) ? t.length !== e.length ? !1 : f$5(t[Symbol.iterator](), e[Symbol.iterator]()) : t instanceof Map && e instanceof Map || t instanceof Set && e instanceof Set ? t.size !== e.size ? !1 : f$5(t.entries(), e.entries()) : p$2(t) && p$2(e) ? f$5(Object.entries(t)[Symbol.iterator](), Object.entries(e)[Symbol.iterator]()) : !1;
}
function f$5(t, e) {
	do {
		let r = t.next(), s = e.next();
		if (r.done && s.done) return !0;
		if (r.done || s.done || !Object.is(r.value, s.value)) return !1;
	} while (!0);
}
function p$2(t) {
	if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
	let e = Object.getPrototypeOf(t);
	return e === null || Object.getPrototypeOf(e) === null;
}
//#endregion
//#region node_modules/@headlessui/react/dist/machines/stack-machine.js
var a$8 = Object.defineProperty;
var r$5 = (e, c, t) => c in e ? a$8(e, c, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e[c] = t;
var p$1 = (e, c, t) => (r$5(e, typeof c != "symbol" ? c + "" : c, t), t);
var k$2 = ((t) => (t[t.Push = 0] = "Push", t[t.Pop = 1] = "Pop", t))(k$2 || {});
var y$1 = {
	[0](e, c) {
		let t = c.id, s = e.stack, i = e.stack.indexOf(t);
		if (i !== -1) {
			let n = e.stack.slice();
			return n.splice(i, 1), n.push(t), s = n, {
				...e,
				stack: s
			};
		}
		return {
			...e,
			stack: [...e.stack, t]
		};
	},
	[1](e, c) {
		let t = c.id, s = e.stack.indexOf(t);
		if (s === -1) return e;
		let i = e.stack.slice();
		return i.splice(s, 1), {
			...e,
			stack: i
		};
	}
};
var o$2 = class o$2 extends T$1 {
	constructor() {
		super(...arguments);
		p$1(this, "actions", {
			push: (t) => this.send({
				type: 0,
				id: t
			}),
			pop: (t) => this.send({
				type: 1,
				id: t
			})
		});
		p$1(this, "selectors", {
			isTop: (t, s) => t.stack[t.stack.length - 1] === s,
			inStack: (t, s) => t.stack.includes(s)
		});
	}
	static new() {
		return new o$2({ stack: [] });
	}
	reduce(t, s) {
		return u$5(s.type, y$1, t, s);
	}
};
var x$3 = new a$10(() => o$2.new());
//#endregion
//#region node_modules/@headlessui/react/dist/react-glue.js
function S$2(e, n, r = j$2) {
	return useSyncExternalStoreWithSelector(o$6((i) => e.subscribe(s$2, i)), o$6(() => e.state), o$6(() => e.state), o$6(n), r);
}
function s$2(e) {
	return e;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
function I$4(o, s) {
	let t = useId(), r = x$3.get(s), [i, c] = S$2(r, useCallback((e) => [r.selectors.isTop(e, t), r.selectors.inStack(e, t)], [r, t]));
	return n$5(() => {
		if (o) return r.actions.push(t), () => r.actions.pop(t);
	}, [
		r,
		o,
		t
	]), o ? c ? i : !0 : !1;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-escape.js
function a$7(o, r = typeof document != "undefined" ? document.defaultView : null, t) {
	let n = I$4(o, "escape");
	E$1(r, "keydown", (e) => {
		n && (e.defaultPrevented || e.key === o$4.Escape && t(e));
	});
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/owner.js
function l$3(n) {
	var u;
	return s$4.isServer ? null : n == null ? document : (u = n == null ? void 0 : n.ownerDocument) != null ? u : document;
}
function r$3(n) {
	var u, o;
	return s$4.isServer ? null : n == null ? document : (o = (u = n == null ? void 0 : n.getRootNode) == null ? void 0 : u.call(n)) != null ? o : document;
}
function e$3(n) {
	var u, o;
	return (o = (u = r$3(n)) == null ? void 0 : u.activeElement) != null ? o : null;
}
function d$2(n) {
	return e$3(n) === n;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-inert-others.js
var f$4 = /* @__PURE__ */ new Map(), u$3 = /* @__PURE__ */ new Map();
function h$1(t) {
	var e;
	let r = (e = u$3.get(t)) != null ? e : 0;
	return u$3.set(t, r + 1), r !== 0 ? () => m$2(t) : (f$4.set(t, {
		"aria-hidden": t.getAttribute("aria-hidden"),
		inert: t.inert
	}), t.setAttribute("aria-hidden", "true"), t.inert = !0, () => m$2(t));
}
function m$2(t) {
	var i;
	let r = (i = u$3.get(t)) != null ? i : 1;
	if (r === 1 ? u$3.delete(t) : u$3.set(t, r - 1), r !== 1) return;
	let e = f$4.get(t);
	e && (e["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", e["aria-hidden"]), t.inert = e.inert, f$4.delete(t));
}
function y(t, { allowed: r, disallowed: e } = {}) {
	let i = I$4(t, "inert-others");
	n$5(() => {
		var d, c;
		if (!i) return;
		let a = o$5();
		for (let n of (d = e == null ? void 0 : e()) != null ? d : []) n && a.add(h$1(n));
		let s = (c = r == null ? void 0 : r()) != null ? c : [];
		for (let n of s) {
			if (!n) continue;
			let l = l$3(n);
			if (!l) continue;
			let o = n.parentElement;
			for (; o && o !== l.body;) {
				for (let p of o.children) s.some((E) => p.contains(E)) || a.add(h$1(p));
				o = o.parentElement;
			}
		}
		return a.dispose;
	}, [
		i,
		r,
		e
	]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-is-touch-device.js
function f$3() {
	var t;
	let [e] = useState(() => typeof window != "undefined" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [o, c] = useState((t = e == null ? void 0 : e.matches) != null ? t : !1);
	return n$5(() => {
		if (!e) return;
		function n(r) {
			c(r.matches);
		}
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, [e]), o;
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/dom.js
function o$1(e) {
	return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function t$2(e) {
	return o$1(e) && "tagName" in e;
}
function n$3(e) {
	return t$2(e) && "accessKey" in e;
}
function i$2(e) {
	return t$2(e) && "tabIndex" in e;
}
function r$2(e) {
	return t$2(e) && "style" in e;
}
function u$2(e) {
	return n$3(e) && e.nodeName === "IFRAME";
}
function l$2(e) {
	return n$3(e) && e.nodeName === "INPUT";
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-on-disappear.js
function p(s, n, o) {
	let i = s$3((t) => {
		let e = t.getBoundingClientRect();
		e.x === 0 && e.y === 0 && e.width === 0 && e.height === 0 && o();
	});
	useEffect(() => {
		if (!s) return;
		let t = n === null ? null : n$3(n) ? n : n.current;
		if (!t) return;
		let e = o$5();
		if (typeof ResizeObserver != "undefined") {
			let r = new ResizeObserver(() => i.current(t));
			r.observe(t), e.add(() => r.disconnect());
		}
		if (typeof IntersectionObserver != "undefined") {
			let r = new IntersectionObserver(() => i.current(t));
			r.observe(t), e.add(() => r.disconnect());
		}
		return () => e.dispose();
	}, [
		n,
		i,
		s
	]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/focus-management.js
var E = [
	"[contentEditable=true]",
	"[tabindex]",
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"iframe",
	"input:not([disabled])",
	"select:not([disabled])",
	"details>summary",
	"textarea:not([disabled])"
].map((e) => `${e}:not([tabindex='-1'])`).join(","), S$1 = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var T = ((o) => (o[o.First = 1] = "First", o[o.Previous = 2] = "Previous", o[o.Next = 4] = "Next", o[o.Last = 8] = "Last", o[o.WrapAround = 16] = "WrapAround", o[o.NoScroll = 32] = "NoScroll", o[o.AutoFocus = 64] = "AutoFocus", o))(T || {}), A = ((n) => (n[n.Error = 0] = "Error", n[n.Overflow = 1] = "Overflow", n[n.Success = 2] = "Success", n[n.Underflow = 3] = "Underflow", n))(A || {}), O$1 = ((t) => (t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(O$1 || {});
function x$2(e = document.body) {
	return e == null ? [] : Array.from(e.querySelectorAll(E)).sort((r, t) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function h(e = document.body) {
	return e == null ? [] : Array.from(e.querySelectorAll(S$1)).sort((r, t) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var I$3 = ((t) => (t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(I$3 || {});
function H$1(e, r = 0) {
	var t;
	return e === ((t = l$3(e)) == null ? void 0 : t.body) ? !1 : u$5(r, {
		[0]() {
			return e.matches(E);
		},
		[1]() {
			let l = e;
			for (; l !== null;) {
				if (l.matches(E)) return !0;
				l = l.parentElement;
			}
			return !1;
		}
	});
}
var g = ((t) => (t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(g || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e) => {
	e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
	e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function w$3(e) {
	e?.focus({ preventScroll: !0 });
}
var _$2 = ["textarea", "input"].join(",");
function P(e) {
	var r, t;
	return (t = (r = e == null ? void 0 : e.matches) == null ? void 0 : r.call(e, _$2)) != null ? t : !1;
}
function G$1(e, r = (t) => t) {
	return e.slice().sort((t, l) => {
		let n = r(t), a = r(l);
		if (n === null || a === null) return 0;
		let u = n.compareDocumentPosition(a);
		return u & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : u & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
	});
}
function v(e, r, { sorted: t = !0, relativeTo: l = null, skipElements: n = [] } = {}) {
	let a = Array.isArray(e) ? e.length > 0 ? r$3(e[0]) : document : r$3(e), u = Array.isArray(e) ? t ? G$1(e) : e : r & 64 ? h(e) : x$2(e);
	n.length > 0 && u.length > 1 && (u = u.filter((i) => !n.some((d) => d != null && "current" in d ? (d == null ? void 0 : d.current) === i : d === i))), l = l != null ? l : a == null ? void 0 : a.activeElement;
	let o = (() => {
		if (r & 5) return 1;
		if (r & 10) return -1;
		throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})(), M = (() => {
		if (r & 1) return 0;
		if (r & 2) return Math.max(0, u.indexOf(l)) - 1;
		if (r & 4) return Math.max(0, u.indexOf(l)) + 1;
		if (r & 8) return u.length - 1;
		throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})(), N = r & 32 ? { preventScroll: !0 } : {}, m = 0, c = u.length, s;
	do {
		if (m >= c || m + c <= 0) return 0;
		let i = M + m;
		if (r & 16) i = (i + c) % c;
		else {
			if (i < 0) return 3;
			if (i >= c) return 1;
		}
		s = u[i], s?.focus(N), m += o;
	} while (s !== e$3(s));
	return r & 6 && P(s) && s.select(), 2;
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/platform.js
function t$1() {
	return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i$1() {
	return /Android/gi.test(window.navigator.userAgent);
}
function n$2() {
	return t$1() || i$1();
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-document-event.js
function i(t, e, o, n) {
	let u = s$3(o);
	useEffect(() => {
		if (!t) return;
		function r(m) {
			u.current(m);
		}
		return document.addEventListener(e, r, n), () => document.removeEventListener(e, r, n);
	}, [
		t,
		e,
		n
	]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-window-event.js
function s$1(t, e, o, n) {
	let i = s$3(o);
	useEffect(() => {
		if (!t) return;
		function r(d) {
			i.current(d);
		}
		return window.addEventListener(e, r, n), () => window.removeEventListener(e, r, n);
	}, [
		t,
		e,
		n
	]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var C$2 = 30;
function k$1(o, f, h) {
	let m = s$3(h), s = useCallback(function(e, c) {
		if (e.defaultPrevented) return;
		let r = c(e);
		if (r === null || !r.getRootNode().contains(r) || !r.isConnected) return;
		let M = function u(n) {
			return typeof n == "function" ? u(n()) : Array.isArray(n) || n instanceof Set ? n : [n];
		}(f);
		for (let u of M) if (u !== null && (u.contains(r) || e.composed && e.composedPath().includes(u))) return;
		return !H$1(r, I$3.Loose) && r.tabIndex !== -1 && e.preventDefault(), m.current(e, r);
	}, [m, f]), i$5 = useRef(null);
	i(o, "pointerdown", (t) => {
		var e, c;
		n$2() || (i$5.current = ((c = (e = t.composedPath) == null ? void 0 : e.call(t)) == null ? void 0 : c[0]) || t.target);
	}, !0), i(o, "pointerup", (t) => {
		if (n$2() || !i$5.current) return;
		let e = i$5.current;
		return i$5.current = null, s(t, () => e);
	}, !0);
	let l = useRef({
		x: 0,
		y: 0
	});
	i(o, "touchstart", (t) => {
		l.current.x = t.touches[0].clientX, l.current.y = t.touches[0].clientY;
	}, !0), i(o, "touchend", (t) => {
		let e = {
			x: t.changedTouches[0].clientX,
			y: t.changedTouches[0].clientY
		};
		if (!(Math.abs(e.x - l.current.x) >= C$2 || Math.abs(e.y - l.current.y) >= C$2)) return s(t, () => i$2(t.target) ? t.target : null);
	}, !0), s$1(o, "blur", (t) => s(t, () => u$2(window.document.activeElement) ? window.document.activeElement : null), !0);
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-owner.js
function u$1(...e) {
	return useMemo(() => l$3(...e), [...e]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/internal/hidden.js
var a$6 = "span";
var s = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(s || {});
function l$1(t, r) {
	var n;
	let { features: d = 1, ...e } = t, o = {
		ref: r,
		"aria-hidden": (d & 2) === 2 ? !0 : (n = e["aria-hidden"]) != null ? n : void 0,
		hidden: (d & 4) === 4 ? !0 : void 0,
		style: {
			position: "fixed",
			top: 1,
			left: 1,
			width: 1,
			height: 0,
			padding: 0,
			margin: -1,
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			borderWidth: "0",
			...(d & 4) === 4 && (d & 2) !== 2 && { display: "none" }
		}
	};
	return K()({
		ourProps: o,
		theirProps: e,
		slot: {},
		defaultTag: a$6,
		name: "Hidden"
	});
}
var f$2 = Y(l$1);
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-root-containers.js
function S({ defaultContainers: l = [], portals: n, mainTreeNode: o } = {}) {
	let c = o$6(() => {
		var r, u;
		let i = l$3(o), t = [];
		for (let e of l) e !== null && (t$2(e) ? t.push(e) : "current" in e && t$2(e.current) && t.push(e.current));
		if (n != null && n.current) for (let e of n.current) t.push(e);
		for (let e of (r = i == null ? void 0 : i.querySelectorAll("html > *, body > *")) != null ? r : []) e !== document.body && e !== document.head && t$2(e) && e.id !== "headlessui-portal-root" && (o && (e.contains(o) || e.contains((u = o == null ? void 0 : o.getRootNode()) == null ? void 0 : u.host)) || t.some((E) => e.contains(E)) || t.push(e));
		return t;
	});
	return {
		resolveContainers: c,
		contains: o$6((i) => c().some((t) => t.contains(i)))
	};
}
var d$1 = createContext(null);
function j$1({ children: l, node: n }) {
	let [o, c] = useState(null), i = x$1(n != null ? n : o);
	return React.createElement(d$1.Provider, { value: i }, l, i === null && React.createElement(f$2, {
		features: s.Hidden,
		ref: (t) => {
			var r, u;
			if (t) {
				for (let e of (u = (r = l$3(t)) == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? u : []) if (e !== document.body && e !== document.head && t$2(e) && e != null && e.contains(t)) {
					c(e);
					break;
				}
			}
		}
	}));
}
function x$1(l = null) {
	var n;
	return (n = useContext(d$1)) != null ? n : l;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-store.js
function o(t) {
	return useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot);
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/store.js
function a$5(o, r) {
	let t = o(), n = /* @__PURE__ */ new Set();
	return {
		getSnapshot() {
			return t;
		},
		subscribe(e) {
			return n.add(e), () => n.delete(e);
		},
		dispatch(e, ...s) {
			let i = r[e].call(t, ...s);
			i && (t = i, n.forEach((c) => c()));
		}
	};
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js
function d() {
	let r;
	return {
		before({ doc: e }) {
			var l;
			let o = e.documentElement, t = (l = e.defaultView) != null ? l : window;
			r = Math.max(0, t.innerWidth - o.clientWidth);
		},
		after({ doc: e, d: o }) {
			let t = e.documentElement, l = Math.max(0, t.clientWidth - t.offsetWidth), n = Math.max(0, r - l);
			o.style(t, "paddingRight", `${n}px`);
		}
	};
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js
function w$2() {
	return t$1() ? { before({ doc: o, d: r, meta: m }) {
		function a(s) {
			for (let l of m().containers) for (let c of l()) if (c.contains(s)) return !0;
			return !1;
		}
		r.microTask(() => {
			var c;
			if (window.getComputedStyle(o.documentElement).scrollBehavior !== "auto") {
				let t = o$5();
				t.style(o.documentElement, "scrollBehavior", "auto"), r.add(() => r.microTask(() => t.dispose()));
			}
			let s = (c = window.scrollY) != null ? c : window.pageYOffset, l = null;
			r.addEventListener(o, "click", (t) => {
				if (i$2(t.target)) try {
					let e = t.target.closest("a");
					if (!e) return;
					let { hash: n } = new URL(e.href), f = o.querySelector(n);
					i$2(f) && !a(f) && (l = f);
				} catch {}
			}, !0), r.group((t) => {
				r.addEventListener(o, "touchstart", (e) => {
					if (t.dispose(), i$2(e.target) && r$2(e.target)) if (a(e.target)) {
						let n = e.target;
						for (; n.parentElement && a(n.parentElement);) n = n.parentElement;
						t.style(n, "overscrollBehavior", "contain");
					} else t.style(e.target, "touchAction", "none");
				});
			}), r.addEventListener(o, "touchmove", (t) => {
				if (i$2(t.target)) {
					if (l$2(t.target)) return;
					if (a(t.target)) {
						let e = t.target;
						for (; e.parentElement && e.dataset.headlessuiPortal !== "" && !(e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);) e = e.parentElement;
						e.dataset.headlessuiPortal === "" && t.preventDefault();
					} else t.preventDefault();
				}
			}, { passive: !1 }), r.add(() => {
				var e;
				s !== ((e = window.scrollY) != null ? e : window.pageYOffset) && window.scrollTo(0, s), l && l.isConnected && (l.scrollIntoView({ block: "nearest" }), l = null);
			});
		});
	} } : {};
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js
function r$1() {
	return { before({ doc: e, d: o }) {
		o.style(e.documentElement, "overflow", "hidden");
	} };
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js
function r(e) {
	let o = {};
	for (let t of e) Object.assign(o, t(o));
	return o;
}
var c$2 = a$5(() => /* @__PURE__ */ new Map(), {
	PUSH(e, o) {
		var n;
		let t = (n = this.get(e)) != null ? n : {
			doc: e,
			count: 0,
			d: o$5(),
			meta: /* @__PURE__ */ new Set(),
			computedMeta: {}
		};
		return t.count++, t.meta.add(o), t.computedMeta = r(t.meta), this.set(e, t), this;
	},
	POP(e, o) {
		let t = this.get(e);
		return t && (t.count--, t.meta.delete(o), t.computedMeta = r(t.meta)), this;
	},
	SCROLL_PREVENT(e) {
		let o = {
			doc: e.doc,
			d: e.d,
			meta() {
				return e.computedMeta;
			}
		}, t = [
			w$2(),
			d(),
			r$1()
		];
		t.forEach(({ before: n }) => n == null ? void 0 : n(o)), t.forEach(({ after: n }) => n == null ? void 0 : n(o));
	},
	SCROLL_ALLOW({ d: e }) {
		e.dispose();
	},
	TEARDOWN({ doc: e }) {
		this.delete(e);
	}
});
c$2.subscribe(() => {
	let e = c$2.getSnapshot(), o = /* @__PURE__ */ new Map();
	for (let [t] of e) o.set(t, t.documentElement.style.overflow);
	for (let t of e.values()) {
		let n = o.get(t.doc) === "hidden", a = t.count !== 0;
		(a && !n || !a && n) && c$2.dispatch(t.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t), t.count === 0 && c$2.dispatch("TEARDOWN", t);
	}
});
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js
function a$4(r, e, n = () => ({ containers: [] })) {
	let f = o(c$2), o$7 = e ? f.get(e) : void 0, i = o$7 ? o$7.count > 0 : !1;
	return n$5(() => {
		if (!(!e || !r)) return c$2.dispatch("PUSH", e, n), () => c$2.dispatch("POP", e, n);
	}, [r, e]), i;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js
function f$1(e, c, n = () => [document.body]) {
	a$4(I$4(e, "scroll-lock"), c, (t) => {
		var o;
		return { containers: [...(o = t.containers) != null ? o : [], n] };
	});
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-slot.js
function n$1(e) {
	return useMemo(() => e, Object.values(e));
}
//#endregion
//#region node_modules/@headlessui/react/dist/internal/close-provider.js
var e$2 = createContext(() => {});
function C$1({ value: t, children: o }) {
	return React.createElement(e$2.Provider, { value: t }, o);
}
//#endregion
//#region node_modules/@headlessui/react/dist/internal/portal-force-root.js
var e$1 = createContext(!1);
function a$3() {
	return useContext(e$1);
}
function l(o) {
	return React.createElement(e$1.Provider, { value: o.force }, o.children);
}
//#endregion
//#region node_modules/@headlessui/react/dist/internal/disabled.js
var e = createContext(void 0);
function a$2() {
	return useContext(e);
}
//#endregion
//#region node_modules/@headlessui/react/dist/components/description/description.js
var a$1 = createContext(null);
a$1.displayName = "DescriptionContext";
function f() {
	let r = useContext(a$1);
	if (r === null) {
		let e = /* @__PURE__ */ new Error("You used a <Description /> component, but it is not inside a relevant parent.");
		throw Error.captureStackTrace && Error.captureStackTrace(e, f), e;
	}
	return r;
}
function H() {
	let [r, e] = useState([]);
	return [r.length > 0 ? r.join(" ") : void 0, useMemo(() => function(t) {
		let i = o$6((n) => (e((o) => [...o, n]), () => e((o) => {
			let s = o.slice(), p = s.indexOf(n);
			return p !== -1 && s.splice(p, 1), s;
		}))), l = useMemo(() => ({
			register: i,
			slot: t.slot,
			name: t.name,
			props: t.props,
			value: t.value
		}), [
			i,
			t.slot,
			t.name,
			t.props,
			t.value
		]);
		return React.createElement(a$1.Provider, { value: l }, t.children);
	}, [e])];
}
var I$2 = "p";
function C(r, e) {
	let c = r$4(), t = a$2(), { id: i = `headlessui-description-${c}`, ...l } = r, n = f(), o = y$2(e);
	n$5(() => n.register(i), [i, n.register]);
	let s = n$1({
		...n.slot,
		disabled: t || !1
	}), p = {
		ref: o,
		...n.props,
		id: i
	};
	return K()({
		ourProps: p,
		theirProps: l,
		slot: s,
		defaultTag: I$2,
		name: n.name || "Description"
	});
}
var _$1 = Y(C), M = Object.assign(_$1, {});
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-on-unmount.js
function c$1(t) {
	let r = o$6(t), e = useRef(!1);
	useEffect(() => (e.current = !1, () => {
		e.current = !0, t$3(() => {
			e.current && r();
		});
	}), [r]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-tab-direction.js
var a = ((r) => (r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(a || {});
function u() {
	let e = useRef(0);
	return s$1(!0, "keydown", (r) => {
		r.key === "Tab" && (e.current = r.shiftKey ? 1 : 0);
	}, !0), e;
}
//#endregion
//#region node_modules/@headlessui/react/dist/hooks/use-watch.js
function m$1(u, t) {
	let e = useRef([]), r = o$6(u);
	useEffect(() => {
		let o = [...e.current];
		for (let [a, l] of t.entries()) if (e.current[a] !== l) {
			let n = r(t, o);
			return e.current = t, n;
		}
	}, [r, ...t]);
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/document-ready.js
function t(n) {
	function e() {
		document.readyState !== "loading" && (n(), document.removeEventListener("DOMContentLoaded", e));
	}
	typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e), e());
}
//#endregion
//#region node_modules/@headlessui/react/dist/utils/active-element-history.js
var n = [];
t(() => {
	function e(t) {
		if (!i$2(t.target) || t.target === document.body || n[0] === t.target) return;
		let r = t.target;
		r = r.closest(E), n.unshift(r != null ? r : t.target), n = n.filter((o) => o != null && o.isConnected), n.splice(10);
	}
	window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
//#endregion
//#region node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
function x(o) {
	if (!o) return /* @__PURE__ */ new Set();
	if (typeof o == "function") return new Set(o());
	let t = /* @__PURE__ */ new Set();
	for (let e of o.current) t$2(e.current) && t.add(e.current);
	return t;
}
var $ = "div";
var G = ((n) => (n[n.None = 0] = "None", n[n.InitialFocus = 1] = "InitialFocus", n[n.TabLock = 2] = "TabLock", n[n.FocusLock = 4] = "FocusLock", n[n.RestoreFocus = 8] = "RestoreFocus", n[n.AutoFocus = 16] = "AutoFocus", n))(G || {});
function w$1(o, t) {
	let e = useRef(null), r = y$2(e, t), { initialFocus: u$7, initialFocusFallback: a$11, containers: n, features: s$6 = 15, ...f } = o;
	l$4() || (s$6 = 0);
	let l = u$1(e.current);
	re(s$6, { ownerDocument: l });
	let T$3 = ne(s$6, {
		ownerDocument: l,
		container: e,
		initialFocus: u$7,
		initialFocusFallback: a$11
	});
	oe$1(s$6, {
		ownerDocument: l,
		container: e,
		containers: n,
		previousActiveElement: T$3
	});
	let g = u(), A = o$6((c) => {
		if (!n$3(e.current)) return;
		let E = e.current;
		((V) => V())(() => {
			u$5(g.current, {
				[a.Forwards]: () => {
					v(E, T.First, { skipElements: [c.relatedTarget, a$11] });
				},
				[a.Backwards]: () => {
					v(E, T.Last, { skipElements: [c.relatedTarget, a$11] });
				}
			});
		});
	}), v$2 = I$4(!!(s$6 & 2), "focus-trap#tab-lock"), N = p$3(), b = useRef(!1), k = {
		ref: r,
		onKeyDown(c) {
			c.key == "Tab" && (b.current = !0, N.requestAnimationFrame(() => {
				b.current = !1;
			}));
		},
		onBlur(c) {
			if (!(s$6 & 4)) return;
			let E = x(n);
			n$3(e.current) && E.add(e.current);
			let L = c.relatedTarget;
			i$2(L) && L.dataset.headlessuiFocusGuard !== "true" && (I$1(E, L) || (b.current ? v(e.current, u$5(g.current, {
				[a.Forwards]: () => T.Next,
				[a.Backwards]: () => T.Previous
			}) | T.WrapAround, { relativeTo: c.target }) : i$2(c.target) && w$3(c.target)));
		}
	}, B = K();
	return React.createElement(React.Fragment, null, v$2 && React.createElement(f$2, {
		as: "button",
		type: "button",
		"data-headlessui-focus-guard": !0,
		onFocus: A,
		features: s.Focusable
	}), B({
		ourProps: k,
		theirProps: f,
		defaultTag: $,
		name: "FocusTrap"
	}), v$2 && React.createElement(f$2, {
		as: "button",
		type: "button",
		"data-headlessui-focus-guard": !0,
		onFocus: A,
		features: s.Focusable
	}));
}
var ee = Y(w$1), ge = Object.assign(ee, { features: G });
function te(o = !0) {
	let t = useRef(n.slice());
	return m$1(([e], [r]) => {
		r === !0 && e === !1 && t$3(() => {
			t.current.splice(0);
		}), r === !1 && e === !0 && (t.current = n.slice());
	}, [
		o,
		n,
		t
	]), o$6(() => {
		var e;
		return (e = t.current.find((r) => r != null && r.isConnected)) != null ? e : null;
	});
}
function re(o, { ownerDocument: t }) {
	let e = !!(o & 8), r = te(e);
	m$1(() => {
		e || d$2(t == null ? void 0 : t.body) && w$3(r());
	}, [e]), c$1(() => {
		e && w$3(r());
	});
}
function ne(o, { ownerDocument: t, container: e, initialFocus: r, initialFocusFallback: u }) {
	let a = useRef(null), n = I$4(!!(o & 1), "focus-trap#initial-focus"), s = f$6();
	return m$1(() => {
		if (o === 0) return;
		if (!n) {
			u != null && u.current && w$3(u.current);
			return;
		}
		let f = e.current;
		f && t$3(() => {
			if (!s.current) return;
			let l = t == null ? void 0 : t.activeElement;
			if (r != null && r.current) {
				if ((r == null ? void 0 : r.current) === l) {
					a.current = l;
					return;
				}
			} else if (f.contains(l)) {
				a.current = l;
				return;
			}
			if (r != null && r.current) w$3(r.current);
			else {
				if (o & 16) {
					if (v(f, T.First | T.AutoFocus) !== A.Error) return;
				} else if (v(f, T.First) !== A.Error) return;
				if (u != null && u.current && (w$3(u.current), (t == null ? void 0 : t.activeElement) === u.current)) return;
				console.warn("There are no focusable elements inside the <FocusTrap />");
			}
			a.current = t == null ? void 0 : t.activeElement;
		});
	}, [
		u,
		n,
		o
	]), a;
}
function oe$1(o, { ownerDocument: t, container: e, containers: r, previousActiveElement: u }) {
	let a = f$6(), n = !!(o & 4);
	E$1(t == null ? void 0 : t.defaultView, "focus", (s) => {
		if (!n || !a.current) return;
		let f = x(r);
		n$3(e.current) && f.add(e.current);
		let l = u.current;
		if (!l) return;
		let T = s.target;
		n$3(T) ? I$1(f, T) ? (u.current = T, w$3(T)) : (s.preventDefault(), s.stopPropagation(), w$3(l)) : w$3(u.current);
	}, !0);
}
function I$1(o, t) {
	for (let e of o) if (e.contains(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/@headlessui/react/dist/components/portal/portal.js
function j(e) {
	let o = a$3(), l = useContext(c), [r, p] = useState(() => {
		var s;
		if (!o && l !== null) return (s = l.current) != null ? s : null;
		if (s$4.isServer) return null;
		let t = e == null ? void 0 : e.getElementById("headlessui-portal-root");
		if (t) return t;
		if (e === null) return null;
		let n = e.createElement("div");
		return n.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(n);
	});
	return useEffect(() => {
		r !== null && (e != null && e.body.contains(r) || e == null || e.body.appendChild(r));
	}, [r, e]), useEffect(() => {
		o || l !== null && p(l.current);
	}, [
		l,
		p,
		o
	]), r;
}
var _ = Fragment$1, I = Y(function(o, l) {
	let { ownerDocument: r = null, ...p } = o, t = useRef(null), n = y$2(T$2((a) => {
		t.current = a;
	}), l), s = u$1(t.current), u = j(r != null ? r : s), y = useContext(m), g = p$3(), v = l$4(), M = K();
	return c$1(() => {
		var a;
		u && u.childNodes.length <= 0 && ((a = u.parentElement) == null || a.removeChild(u));
	}), !u || !v ? null : createPortal(React.createElement("div", {
		"data-headlessui-portal": "",
		ref: (a) => {
			g.dispose(), y && a && g.add(y.register(a));
		}
	}, M({
		ourProps: { ref: n },
		theirProps: p,
		slot: {},
		defaultTag: _,
		name: "Portal"
	})), u);
});
function D(e, o) {
	let l = y$2(o), { enabled: r = !0, ownerDocument: p, ...t } = e, n = K();
	return r ? React.createElement(I, {
		...t,
		ownerDocument: p,
		ref: l
	}) : n({
		ourProps: { ref: l },
		theirProps: t,
		slot: {},
		defaultTag: _,
		name: "Portal"
	});
}
var J = Fragment$1, c = createContext(null);
function X(e, o) {
	let { target: l, ...r } = e, t = { ref: y$2(o) }, n = K();
	return React.createElement(c.Provider, { value: l }, n({
		ourProps: t,
		theirProps: r,
		defaultTag: J,
		name: "Popover.Group"
	}));
}
var m = createContext(null);
function oe() {
	let e = useContext(m), o = useRef([]), l = o$6((t) => (o.current.push(t), e && e.register(t), () => r(t))), r = o$6((t) => {
		let n = o.current.indexOf(t);
		n !== -1 && o.current.splice(n, 1), e && e.unregister(t);
	}), p = useMemo(() => ({
		register: l,
		unregister: r,
		portals: o
	}), [
		l,
		r,
		o
	]);
	return [o, useMemo(() => function({ children: n }) {
		return React.createElement(m.Provider, { value: p }, n);
	}, [p])];
}
var k = Y(D), B = Y(X), le = Object.assign(k, { Group: B });
//#endregion
//#region node_modules/@headlessui/react/dist/components/dialog/dialog.js
var we = ((o) => (o[o.Open = 0] = "Open", o[o.Closed = 1] = "Closed", o))(we || {}), Be = ((t) => (t[t.SetTitleId = 0] = "SetTitleId", t))(Be || {});
var Ue = { [0](e, t) {
	return e.titleId === t.id ? e : {
		...e,
		titleId: t.id
	};
} }, w = createContext(null);
w.displayName = "DialogContext";
function O(e) {
	let t = useContext(w);
	if (t === null) {
		let o = /* @__PURE__ */ new Error(`<${e} /> is missing a parent <Dialog /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(o, O), o;
	}
	return t;
}
function He(e, t) {
	return u$5(t.type, Ue, e, t);
}
var z = Y(function(t, o) {
	let a = r$4(), { id: n = `headlessui-dialog-${a}`, open: i, onClose: p$4, initialFocus: d, role: s = "dialog", autoFocus: f = !0, __demoMode: u = !1, unmount: y$3 = !1, ...S$4 } = t, R = useRef(!1);
	s = function() {
		return s === "dialog" || s === "alertdialog" ? s : (R.current || (R.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
	}();
	let g = u$6();
	i === void 0 && g !== null && (i = (g & i$4.Open) === i$4.Open);
	let T = useRef(null), I = y$2(T, o), F = u$1(T.current), c = i ? 0 : 1, [b, Q] = useReducer(He, {
		titleId: null,
		descriptionId: null,
		panelRef: createRef()
	}), m = o$6(() => p$4(!1)), B$1 = o$6((r) => Q({
		type: 0,
		id: r
	})), D = l$4() ? c === 0 : !1, [Z, ee] = oe(), te = { get current() {
		var r;
		return (r = b.panelRef.current) != null ? r : T.current;
	} }, v = x$1(), { resolveContainers: M } = S({
		mainTreeNode: v,
		portals: Z,
		defaultContainers: [te]
	}), U = g !== null ? (g & i$4.Closing) === i$4.Closing : !1;
	y(u || U ? !1 : D, {
		allowed: o$6(() => {
			var r, W;
			return [(W = (r = T.current) == null ? void 0 : r.closest("[data-headlessui-portal]")) != null ? W : null];
		}),
		disallowed: o$6(() => {
			var r;
			return [(r = v == null ? void 0 : v.closest("body > *:not(#headlessui-portal-root)")) != null ? r : null];
		})
	});
	let P = x$3.get(null);
	n$5(() => {
		if (D) return P.actions.push(n), () => P.actions.pop(n);
	}, [
		P,
		n,
		D
	]);
	let H$2 = S$2(P, useCallback((r) => P.selectors.isTop(r, n), [P, n]));
	k$1(H$2, M, (r) => {
		r.preventDefault(), m();
	}), a$7(H$2, F == null ? void 0 : F.defaultView, (r) => {
		r.preventDefault(), r.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), m();
	}), f$1(u || U ? !1 : D, F, M), p(D, T, m);
	let [oe$2, ne] = H(), re = useMemo(() => [{
		dialogState: c,
		close: m,
		setTitleId: B$1,
		unmount: y$3
	}, b], [
		c,
		m,
		B$1,
		y$3,
		b
	]), N = n$1({ open: c === 0 }), le$1 = {
		ref: I,
		id: n,
		role: s,
		tabIndex: -1,
		"aria-modal": u ? void 0 : c === 0 ? !0 : void 0,
		"aria-labelledby": b.titleId,
		"aria-describedby": oe$2,
		unmount: y$3
	}, ae = !f$3(), E = G.None;
	D && !u && (E |= G.RestoreFocus, E |= G.TabLock, f && (E |= G.AutoFocus), ae && (E |= G.InitialFocus));
	let ie = K();
	return React.createElement(s$5, null, React.createElement(l, { force: !0 }, React.createElement(le, null, React.createElement(w.Provider, { value: re }, React.createElement(B, { target: T }, React.createElement(l, { force: !1 }, React.createElement(ne, { slot: N }, React.createElement(ee, null, React.createElement(ge, {
		initialFocus: d,
		initialFocusFallback: T,
		containers: M,
		features: E
	}, React.createElement(C$1, { value: m }, ie({
		ourProps: le$1,
		theirProps: S$4,
		slot: N,
		defaultTag: Ne,
		features: We,
		visible: c === 0,
		name: "Dialog"
	})))))))))));
}), Ne = "div", We = A$1.RenderStrategy | A$1.Static;
function $e(e, t) {
	let { transition: o = !1, open: a, ...n } = e, i = u$6(), p = e.hasOwnProperty("open") || i !== null, d = e.hasOwnProperty("onClose");
	if (!p && !d) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
	if (!p) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
	if (!d) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
	if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
	if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
	return (a !== void 0 || o) && !n.static ? React.createElement(j$1, null, React.createElement(Ke$1, {
		show: a,
		transition: o,
		unmount: n.unmount
	}, React.createElement(z, {
		ref: t,
		...n
	}))) : React.createElement(j$1, null, React.createElement(z, {
		ref: t,
		open: a,
		...n
	}));
}
var je = "div";
function Ye(e, t) {
	let o = r$4(), { id: a = `headlessui-dialog-panel-${o}`, transition: n = !1, ...i } = e, [{ dialogState: p, unmount: d }, s] = O("Dialog.Panel"), f = y$2(t, s.panelRef), u = n$1({ open: p === 0 }), S = {
		ref: f,
		id: a,
		onClick: o$6((I) => {
			I.stopPropagation();
		})
	}, R = n ? Oe : Fragment$1, g = n ? { unmount: d } : {}, T = K();
	return React.createElement(R, { ...g }, T({
		ourProps: S,
		theirProps: i,
		slot: u,
		defaultTag: je,
		name: "Dialog.Panel"
	}));
}
var Je = "div";
function Ke(e, t) {
	let { transition: o = !1, ...a } = e, [{ dialogState: n, unmount: i }] = O("Dialog.Backdrop"), p = n$1({ open: n === 0 }), d = {
		ref: t,
		"aria-hidden": !0
	}, s = o ? Oe : Fragment$1, f = o ? { unmount: i } : {}, u = K();
	return React.createElement(s, { ...f }, u({
		ourProps: d,
		theirProps: a,
		slot: p,
		defaultTag: Je,
		name: "Dialog.Backdrop"
	}));
}
var Xe = "h2";
function Ve(e, t) {
	let o = r$4(), { id: a = `headlessui-dialog-title-${o}`, ...n } = e, [{ dialogState: i, setTitleId: p }] = O("Dialog.Title"), d = y$2(t);
	useEffect(() => (p(a), () => p(null)), [a, p]);
	let s = n$1({ open: i === 0 }), f = {
		ref: d,
		id: a
	};
	return K()({
		ourProps: f,
		theirProps: n,
		slot: s,
		defaultTag: Xe,
		name: "Dialog.Title"
	});
}
var qe = Y($e), ze = Y(Ye);
Y(Ke);
var Qe = Y(Ve), ht = Object.assign(qe, {
	Panel: ze,
	Title: Qe,
	Description: M
});
//#endregion
//#region resources/js/Components/Modal.tsx
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {} }) {
	const close = () => {
		if (closeable) onClose();
	};
	const maxWidthClass = {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
		"2xl": "sm:max-w-2xl"
	}[maxWidth];
	return /* @__PURE__ */ jsx(Ke$1, {
		show,
		leave: "duration-200",
		children: /* @__PURE__ */ jsxs(ht, {
			as: "div",
			id: "modal",
			className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
			onClose: close,
			children: [/* @__PURE__ */ jsx(Oe, {
				enter: "ease-out duration-300",
				enterFrom: "opacity-0",
				enterTo: "opacity-100",
				leave: "ease-in duration-200",
				leaveFrom: "opacity-100",
				leaveTo: "opacity-0",
				children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
			}), /* @__PURE__ */ jsx(Oe, {
				enter: "ease-out duration-300",
				enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
				enterTo: "opacity-100 translate-y-0 sm:scale-100",
				leave: "ease-in duration-200",
				leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
				leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
				children: /* @__PURE__ */ jsx(ze, {
					className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
					children
				})
			})]
		})
	});
}
//#endregion
export { Modal as t };
