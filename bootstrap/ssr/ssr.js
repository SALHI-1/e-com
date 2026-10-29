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
		"./Pages/About.tsx": () => import("./assets/About-D8c5knjl.js"),
		"./Pages/Admin/Admins/Index.tsx": () => import("./assets/Index-C7eTFAJ7.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-LyZDZZcE.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BAa_g2o4.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-Da-t1T7n.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-qYvRjZy2.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-BepdAR42.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-DgTC-Pa_.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-DqbvV8Ae.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-UZreEgF3.js"),
		"./Pages/Admin/Products/ProductModal.tsx": () => import("./assets/ProductModal-C9Ye4NSv.js"),
		"./Pages/Admin/Products/Trashed.tsx": () => import("./assets/Trashed-Bc8vlEbt.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-DcZqH-6B.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-Dwgr7NK4.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-XvGKgzmI.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-BUHowwlD.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-3-fwsdgH.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-B9Se-Q_-.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-IGZHbmNM.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-81I-uRQn.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-BTdkkuTs.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-qBMbTGbf.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-DNhaPZp9.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B5OYfF5q.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-D1XSPcww.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-voqEOxO-.js")
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
