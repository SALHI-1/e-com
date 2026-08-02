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
		"./Pages/About.tsx": () => import("./assets/About-vusy57Or.js"),
		"./Pages/Admin/Admins/Index.tsx": () => import("./assets/Index-nnmdena4.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-CU4UcqgE.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BpuVsKBF.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-DTYZcQT8.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-BEc6cydn.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-jyaMURZw.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-C48v6wGv.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-CJ0kwrdX.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-DLHV2KDV.js"),
		"./Pages/Admin/Products/ProductModal.tsx": () => import("./assets/ProductModal-FCOIWgKp.js"),
		"./Pages/Admin/Products/Trashed.tsx": () => import("./assets/Trashed-GWXO9HXp.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-B_JIbd5O.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-D9pppjLq.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-X2tOd8q0.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-B9Ct5TYz.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-B8g14q-d.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-D2FVrdfj.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-CbNhiuHp.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-B-0Ee7Lt.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-DM4eLDF1.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-2-Q-2kRB.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-Cq0r606J.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-pi-h2dom.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-BBmKlf_W.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-BPmC-GPK.js")
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
