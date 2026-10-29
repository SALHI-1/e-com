import { n as useAurelia, t as ClientLayout } from "./ClientLayout-K39zwBYh.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Cart/Success.tsx
function Success(props) {
	return /* @__PURE__ */ jsx(ClientLayout, {
		auth: props.auth,
		cartCount: props.cartCount,
		title: "Commande confirmée",
		children: /* @__PURE__ */ jsx(SuccessContent, {})
	});
}
function SuccessContent() {
	const { t } = useAurelia();
	const sDict = t.success;
	return /* @__PURE__ */ jsxs("div", {
		className: "au-container",
		style: {
			padding: "80px 0",
			minHeight: "60vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center"
		},
		children: [
			/* @__PURE__ */ jsx(Head, { title: `${sDict.title} · Ourélia` }),
			/* @__PURE__ */ jsxs("svg", {
				width: "64",
				height: "64",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "var(--au-gold)",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				style: { marginBottom: "24px" },
				children: [/* @__PURE__ */ jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ jsx("polyline", { points: "22 4 12 14.01 9 11.01" })]
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "au-h3",
				style: {
					marginBottom: "16px",
					maxWidth: "600px"
				},
				children: sDict.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "au-body-text",
				style: {
					marginBottom: "8px",
					maxWidth: "500px",
					color: "var(--au-text)"
				},
				children: sDict.message
			}),
			/* @__PURE__ */ jsx("p", {
				className: "au-body-text",
				style: {
					marginBottom: "40px",
					maxWidth: "500px",
					color: "var(--au-text-muted)"
				},
				children: sDict.contact
			}),
			/* @__PURE__ */ jsx(Link, {
				href: route("home"),
				className: "au-btn",
				style: {
					display: "inline-block",
					alignSelf: "center",
					textAlign: "center"
				},
				children: sDict.continueShopping
			})
		]
	});
}
//#endregion
export { Success as default };
