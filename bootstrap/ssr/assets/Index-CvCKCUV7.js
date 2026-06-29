import { t as AdminLayout } from "./AdminLayout-nNytKXjc.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Products/Index.tsx
function Index({ products }) {
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "text-xl font-semibold leading-tight text-gray-800",
			children: "Gestion des Produits"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Produits" }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-4 flex justify-end",
					children: /* @__PURE__ */ jsx(Link, {
						href: route("admin.products.create"),
						className: "bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700",
						children: "Ajouter un produit"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "overflow-hidden bg-white shadow-sm sm:rounded-lg",
					children: [/* @__PURE__ */ jsxs("table", {
						className: "min-w-full divide-y divide-gray-200",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "ID"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Nom"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Catégorie"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Prix"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Stock"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "bg-white divide-y divide-gray-200",
							children: products.map((product) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
									children: product.id
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
									children: product.name
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
									children: product.category.name
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
									children: [product.price, " dh"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
									children: product.stock
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
									children: /* @__PURE__ */ jsx(Link, {
										href: route("admin.products.edit", product.id),
										className: "text-indigo-600 hover:text-indigo-900 mr-4",
										children: "Modifier"
									})
								})
							] }, product.id))
						})]
					}), products.length === 0 && /* @__PURE__ */ jsx("div", {
						className: "p-6 text-center text-gray-500",
						children: "Aucun produit trouvé."
					})]
				})]
			})
		})]
	});
}
//#endregion
export { Index as default };
