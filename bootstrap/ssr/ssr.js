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
	title: (title) => title ? `Ourélia | ${title}` : "Ourélia",
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* #__PURE__ */ Object.assign({
		"./Pages/About.tsx": () => import("./assets/About-DiuOnjZ2.js"),
		"./Pages/Admin/Admins/Index.tsx": () => import("./assets/Index-CoceNPtI.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-B_OiUGiK.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BAa_g2o4.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-BwsDe6cz.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-BQTIpzTV.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-cFMkvw_t.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-CY2IIddW.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-hnNchgmt.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-81zgMmst.js"),
		"./Pages/Admin/Products/ProductModal.tsx": () => import("./assets/ProductModal-C9Ye4NSv.js"),
		"./Pages/Admin/Products/Trashed.tsx": () => import("./assets/Trashed-CaJC4B2C.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-DcZqH-6B.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-Dwgr7NK4.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-XvGKgzmI.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-BUHowwlD.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-3-fwsdgH.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-B9Se-Q_-.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-DDSwd1Ri.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-BsmygGyL.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-bmpsgQGc.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-CxL_VOXZ.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-DNhaPZp9.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B5OYfF5q.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-D1XSPcww.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-DtCdG0tm.js")
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
