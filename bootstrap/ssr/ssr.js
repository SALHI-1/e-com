import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { route } from "ziggy-js";
import { jsx } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.tsx
createServer((page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	title: (title) => title,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* #__PURE__ */ Object.assign({
		"./Pages/About.tsx": () => import("./assets/About-vusy57Or.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-wb0b8TN6.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BpuVsKBF.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-B4MbP88k.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-D2IqjVaM.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-HUqYxc6a.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-DPdnS0RN.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-DXmLaj0i.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-n4xEtAzo.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BL17ZLhq.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-CWtuH0ZQ.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-X2tOd8q0.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-B9Ct5TYz.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-C5iTigEy.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-BoX6JN3j.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-BZyJ5rPJ.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-B-0Ee7Lt.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-CmyEkwxf.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-Dp2YiXDO.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-BXewx4_g.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B4fQr3uE.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-f2GTeEXm.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-DWQpdOHl.js")
	})),
	setup: ({ App, props }) => {
		global.route = (name, params, absolute) => route(name, params, absolute, {
			...page.props.ziggy,
			location: new URL(page.props.ziggy.location)
		});
		return /* @__PURE__ */ jsx(App, { ...props });
	}
}));
//#endregion
export {};
