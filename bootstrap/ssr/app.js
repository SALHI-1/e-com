import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
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
//#region resources/js/app.tsx
createInertiaApp({
	title: (title) => title,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* #__PURE__ */ Object.assign({
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-KtRZZIEX.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-BpuVsKBF.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-DGOrEoja.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-8EdnFQkQ.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-BGykU7Bp.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit--74K0EEW.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-CvCKCUV7.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BL17ZLhq.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-CWtuH0ZQ.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-X2tOd8q0.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-B9Ct5TYz.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-C5iTigEy.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-BoX6JN3j.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-BChc9WUn.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-BFMOP19M.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-BacZSmvI.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-D_Mzz8Mm.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-C7EIJ0L4.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-D2C-XbkO.js")
	})),
	setup({ el, App, props }) {
		createRoot(el).render(/* @__PURE__ */ jsx(App, { ...props }));
	},
	progress: { color: "#4B5563" }
});
//#endregion
export {};
