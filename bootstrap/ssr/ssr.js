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
		"./Pages/About.tsx": () => import("./assets/About-CLby1LAD.js"),
		"./Pages/Admin/Admins/Index.tsx": () => import("./assets/Index-DnQ-5bjP.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-CU4UcqgE.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-Cirolasj.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-DTYZcQT8.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-BEc6cydn.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-jyaMURZw.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-HRqpHAWb.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-C30Eio6V.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-DLHV2KDV.js"),
		"./Pages/Admin/Products/ProductModal.tsx": () => import("./assets/ProductModal-FCOIWgKp.js"),
		"./Pages/Admin/Products/Trashed.tsx": () => import("./assets/Trashed-GWXO9HXp.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BvkeItRr.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-BIUWyb8A.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-CXrtapO3.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-BG3LPfAb.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-BwrF9hxe.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-BuB3qLAB.js"),
		"./Pages/Cart/Index.tsx": () => import("./assets/Index-C7q7Pcpq.js"),
		"./Pages/Cart/Success.tsx": () => import("./assets/Success-0p45n_8y.js"),
		"./Pages/Product/Show.tsx": () => import("./assets/Show-DmS-T71O.js"),
		"./Pages/Profile/Edit.tsx": () => import("./assets/Edit-DQfIZNB9.js"),
		"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-DNhaPZp9.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B5OYfF5q.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-D1XSPcww.js"),
		"./Pages/Welcome.tsx": () => import("./assets/Welcome-8414Idat.js")
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
