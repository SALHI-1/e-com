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
		"./Pages/About.tsx": () => import("./assets/About-DTVNWMuw.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-BaG2XZtQ.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BpuVsKBF.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-CTDXkyhr.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-CT_6HaJg.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-Ba7PGY2U.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-BCoMnNWs.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-BT_B_gue.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-D6npPSul.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BL17ZLhq.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-CWtuH0ZQ.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-X2tOd8q0.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-B9Ct5TYz.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-C5iTigEy.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-BoX6JN3j.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-By-5xmLL.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-DKlKJhVJ.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-Cw13bZPa.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-BQ93j8N3.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-70F8P1h2.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-Bass0qWf.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-C7EIJ0L4.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-Cc6l7nDI.js")
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
