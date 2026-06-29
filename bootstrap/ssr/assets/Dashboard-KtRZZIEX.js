import { t as AdminLayout } from "./AdminLayout-nNytKXjc.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Dashboard.tsx
function Dashboard() {
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "text-xl font-semibold leading-tight text-gray-800",
			children: "Admin Dashboard"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-hidden bg-white shadow-sm sm:rounded-lg",
					children: /* @__PURE__ */ jsxs("div", {
						className: "p-6 text-gray-900 flex justify-between items-center",
						children: [/* @__PURE__ */ jsx("span", { children: "Bienvenue dans l'administration ! Utilisez le menu pour gérer les produits et commandes." }), /* @__PURE__ */ jsx(Link, {
							href: route("admin.logout"),
							method: "post",
							as: "button",
							className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700",
							children: "Déconnexion"
						})]
					})
				})
			})
		})]
	});
}
//#endregion
export { Dashboard as default };
