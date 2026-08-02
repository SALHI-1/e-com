import { t as AdminLayout } from "./AdminLayout-B-B3bn_G.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Orders/List.tsx
function List({ orders, filters }) {
	const [filterState, setFilterState] = useState({
		order_number: filters?.order_number || "",
		client_name: filters?.client_name || "",
		client_email: filters?.client_email || "",
		status: filters?.status || "",
		type: filters?.type || ""
	});
	const handleFilter = (key, value) => {
		setFilterState({
			...filterState,
			[key]: value
		});
	};
	const filteredOrders = orders.filter((order) => {
		const matchNumber = order.order_number?.toLowerCase().includes(filterState.order_number.toLowerCase()) ?? true;
		const matchName = !filterState.client_name || order.user?.name?.toLowerCase().includes(filterState.client_name.toLowerCase());
		const matchEmail = !filterState.client_email || order.user?.email?.toLowerCase().includes(filterState.client_email.toLowerCase());
		const matchStatus = !filterState.status || order.status === filterState.status;
		const matchType = !filterState.type || (filterState.type === "preorder" ? order.items?.some((i) => i.is_preorder) : !order.items?.some((i) => i.is_preorder));
		return matchNumber && matchName && matchEmail && matchStatus && matchType;
	});
	const STATUSES = [
		"en attente",
		"annulé avant la confirmation",
		"confirmé",
		"livré",
		"annulé après la livraison",
		"reçu"
	];
	const getStatusColor = (status) => {
		if (status.includes("annulé")) return "bg-red-100 text-red-800";
		if (status === "reçu") return "bg-green-100 text-green-800";
		if (status === "confirmé") return "bg-blue-100 text-blue-800";
		return "bg-yellow-100 text-yellow-800";
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "au-h3",
			children: "Toutes les Commandes"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Liste des Commandes" }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-6 bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "N° Commande"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: filterState.order_number,
							onChange: (e) => handleFilter("order_number", e.target.value),
							className: "w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
							placeholder: "Rechercher..."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Nom du client"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: filterState.client_name,
							onChange: (e) => handleFilter("client_name", e.target.value),
							className: "w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
							placeholder: "Rechercher..."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Email du client"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: filterState.client_email,
							onChange: (e) => handleFilter("client_email", e.target.value),
							className: "w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
							placeholder: "Rechercher..."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Statut"
						}), /* @__PURE__ */ jsxs("select", {
							value: filterState.status,
							onChange: (e) => handleFilter("status", e.target.value),
							className: "w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Tous les statuts"
							}), STATUSES.map((s) => /* @__PURE__ */ jsx("option", {
								value: s,
								children: s
							}, s))]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Type"
						}), /* @__PURE__ */ jsxs("select", {
							value: filterState.type,
							onChange: (e) => handleFilter("type", e.target.value),
							className: "w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Tous"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "normal",
									children: "Normale"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "preorder",
									children: "Précommande"
								})
							]
						})] })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "bg-white overflow-hidden shadow-sm sm:rounded-lg",
					children: /* @__PURE__ */ jsx("div", {
						className: "p-6 text-gray-900 overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "min-w-full divide-y divide-gray-200",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-gray-50",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "N° Commande"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Date"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Type"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Client"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Total"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Statut"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ jsxs("tbody", {
								className: "bg-white divide-y divide-gray-200",
								children: [filteredOrders.map((order) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
											children: order.order_number
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
											children: [/* @__PURE__ */ jsxs("div", { children: ["Création: ", new Date(order.created_at).toLocaleDateString()] }), order.status === "reçu" && /* @__PURE__ */ jsxs("div", {
												className: "text-green-700 font-semibold mt-1",
												children: ["Reçue: ", new Date(order.updated_at).toLocaleDateString()]
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm",
											children: order.items?.some((i) => i.is_preorder) ? /* @__PURE__ */ jsx("span", {
												className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800",
												children: "Précommande"
											}) : /* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Normale"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
											children: order.user?.name || "Client Inconnu"
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900",
											children: [order.total_amount, " dh"]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 whitespace-nowrap text-sm",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`,
												children: order.status
											})
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-4",
											children: [/* @__PURE__ */ jsxs("a", {
												href: route("admin.orders.ticket", order.id),
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-gray-500 hover:text-gray-800 flex items-center gap-1",
												title: "Télécharger le ticket de livraison",
												children: [/* @__PURE__ */ jsx("svg", {
													className: "w-4 h-4",
													fill: "none",
													stroke: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														strokeWidth: 2,
														d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													})
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs uppercase tracking-wider font-semibold",
													children: "Ticket"
												})]
											}), /* @__PURE__ */ jsx(Link, {
												href: route("admin.orders.show", order.id),
												className: "au-link-underline",
												children: "Voir"
											})]
										})
									]
								}, order.id)), filteredOrders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 6,
									className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center",
									children: "Aucune commande trouvée."
								}) })]
							})]
						})
					})
				})]
			})
		})]
	});
}
//#endregion
export { List as default };
