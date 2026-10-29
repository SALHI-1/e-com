import { a as normalizeLang, i as getStoredLang, n as SUPPORTED_LANGS, o as setStoredLang, r as dictionaries, t as LANG_LABELS } from "./langue-CbfI8lEO.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
//#region resources/js/Layouts/GuestLayout.tsx
var GuestContext = createContext(null);
function useGuestLang() {
	const ctx = useContext(GuestContext);
	if (!ctx) {
		const lang = getStoredLang();
		return {
			lang,
			setLang: setStoredLang,
			t: dictionaries[lang]
		};
	}
	return ctx;
}
function Guest({ children }) {
	const [lang, setLangState] = useState(() => getStoredLang());
	const setLang = (newLang) => {
		const norm = normalizeLang(newLang);
		setLangState(norm);
		setStoredLang(norm);
	};
	const t = dictionaries[lang] || dictionaries.fr;
	return /* @__PURE__ */ jsx(GuestContext.Provider, {
		value: {
			lang,
			setLang,
			t
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "au-auth-wrap",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "au-auth-lang-bar",
					children: /* @__PURE__ */ jsx("div", {
						className: "au-lang-toggle au-auth-lang-toggle",
						children: SUPPORTED_LANGS.map((code) => /* @__PURE__ */ jsx("button", {
							type: "button",
							className: `au-lang-btn${lang === code ? " au-lang-btn--active" : ""}`,
							onClick: () => setLang(code),
							children: LANG_LABELS[code]
						}, code))
					})
				}),
				/* @__PURE__ */ jsx(Link, {
					href: "/",
					className: "au-auth-logo",
					children: "OURÉLIA"
				}),
				/* @__PURE__ */ jsx("div", { className: "au-auth-divider" }),
				/* @__PURE__ */ jsx("div", {
					className: "au-auth-card",
					children
				})
			]
		})
	});
}
//#endregion
export { useGuestLang as n, Guest as t };
