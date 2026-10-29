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
		"./Pages/Admin/Admins/Index.tsx": () => import("./assets/Index-lcR0Itjn.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-DgW_kZNE.js"),
		"./Pages/Admin/Login.tsx": () => import("./assets/Login-wzwBD2sg.js"),
		"./Pages/Admin/Orders/Index.tsx": () => import("./assets/Index-D5k1Imbh.js"),
		"./Pages/Admin/Orders/List.tsx": () => import("./assets/List-d2cnaop2.js"),
		"./Pages/Admin/Orders/Show.tsx": () => import("./assets/Show-C6KbPlLJ.js"),
		"./Pages/Admin/Products/Create.tsx": () => import("./assets/Create-BCabx1Mu.js"),
		"./Pages/Admin/Products/Edit.tsx": () => import("./assets/Edit-CUvGnW54.js"),
		"./Pages/Admin/Products/Index.tsx": () => import("./assets/Index-ucEFgo0E.js"),
		"./Pages/Admin/Products/ProductModal.tsx": () => import("./assets/ProductModal-De1o1uSd.js"),
		"./Pages/Admin/Products/Trashed.tsx": () => import("./assets/Trashed-B5T6ej8H.js"),
		"./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-DyNmE_Pd.js"),
		"./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-D1JdgbXb.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-zVJ4z61M.js"),
		"./Pages/Auth/Register.tsx": () => import("./assets/Register-vkTS85Hd.js"),
		"./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-24Km26F_.js"),
		"./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-D8egVeJV.js"),
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
