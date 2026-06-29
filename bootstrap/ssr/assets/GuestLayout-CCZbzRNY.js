import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Layouts/GuestLayout.tsx
function Guest({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "au-auth-wrap",
		children: [
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
	});
}
//#endregion
export { Guest as t };
