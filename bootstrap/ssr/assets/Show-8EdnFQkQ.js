import { t as AdminLayout } from "./AdminLayout-nNytKXjc.js";
import { Head, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Orders/Show.tsx
function Show({ order }) {
	const { data, setData, put, processing } = useForm({ status: order.status });
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("h2", {
			className: "text-xl font-semibold leading-tight text-gray-800",
			children: ["Détails de la Commande ", order.order_number]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: `Commande ${order.order_number}` }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white p-6 shadow sm:rounded-lg flex justify-between items-center",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("h3", {
							className: "text-lg font-bold",
							children: ["Client : ", order.user.name]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-gray-600",
							children: [
								order.user.email,
								" | ",
								order.user.phone || "Pas de téléphone"
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-gray-600 mt-2",
							children: [
								/* @__PURE__ */ jsx("strong", { children: "Adresse d'expédition :" }),
								" ",
								/* @__PURE__ */ jsx("br", {}),
								" ",
								order.shipping_address
							]
						})
					] }), /* @__PURE__ */ jsxs("div", {
						className: "text-right",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-lg font-bold",
							children: [
								"Montant Total : ",
								order.total_amount,
								" dh"
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-gray-500",
							children: ["Date : ", new Date(order.created_at).toLocaleString()]
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white p-6 shadow sm:rounded-lg",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-bold mb-4",
						children: "Articles commandés"
					}), /* @__PURE__ */ jsxs("table", {
						className: "min-w-full divide-y divide-gray-200",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
									children: "Produit"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
									children: "Prix Unitaire"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
									children: "Quantité"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
									children: "Total"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "bg-white divide-y divide-gray-200",
							children: order.items.map((item) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
									children: item.product.name
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
									children: [item.unit_price, " dh"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
									children: item.quantity
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-6 py-4 whitespace-nowrap text-sm font-medium",
									children: [(item.unit_price * item.quantity).toFixed(2), " dh"]
								})
							] }, item.id))
						})]
					})]
				})]
			})
		})]
	});
}
//#endregion
export { Show as default };
