import { t as AdminLayout } from "./AdminLayout-DYuByY_V.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Orders/List.tsx
var STATUS_LABELS = {
	"en attente": "Pending",
	"annulé avant la confirmation": "Cancelled (Pre-Confirm)",
	"confirmé": "Confirmed",
	"livré": "Delivered",
	"annulé après la livraison": "Cancelled (Post-Delivery)",
	"reçu": "Received"
};
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
	const hasActiveFilters = Boolean(filterState.order_number || filterState.client_name || filterState.client_email || filterState.status || filterState.type);
	const clearAllFilters = () => {
		setFilterState({
			order_number: "",
			client_name: "",
			client_email: "",
			status: "",
			type: ""
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
		if (status.includes("annulé")) return "bg-red-50 text-red-700 border border-red-200/60";
		if (status === "reçu") return "bg-green-50 text-green-700 border border-green-200/60";
		if (status === "confirmé") return "bg-blue-50 text-blue-700 border border-blue-200/60";
		return "bg-amber-50 text-amber-800 border border-amber-200/60";
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
				children: "All Orders"
			}), /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-gray-500",
				children: [
					filteredOrders.length,
					" order",
					filteredOrders.length !== 1 ? "s" : "",
					" listed"
				]
			})]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Orders List" }), /* @__PURE__ */ jsx("div", {
			className: "py-6 sm:py-10 bg-gray-50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold uppercase tracking-wider text-gray-400",
								children: "Filter Orders"
							}), hasActiveFilters && /* @__PURE__ */ jsx("button", {
								onClick: clearAllFilters,
								className: "text-xs text-red-600 hover:text-red-800 font-semibold underline",
								children: "Reset Filters"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-xs font-semibold text-gray-600 mb-1",
									children: "Order #"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: filterState.order_number,
									onChange: (e) => handleFilter("order_number", e.target.value),
									className: "w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm",
									placeholder: "Search #…"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-xs font-semibold text-gray-600 mb-1",
									children: "Customer Name"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: filterState.client_name,
									onChange: (e) => handleFilter("client_name", e.target.value),
									className: "w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm",
									placeholder: "Name…"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-xs font-semibold text-gray-600 mb-1",
									children: "Customer Email"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: filterState.client_email,
									onChange: (e) => handleFilter("client_email", e.target.value),
									className: "w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm",
									placeholder: "Email…"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-xs font-semibold text-gray-600 mb-1",
									children: "Status"
								}), /* @__PURE__ */ jsxs("select", {
									value: filterState.status,
									onChange: (e) => handleFilter("status", e.target.value),
									className: "w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm",
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "All Statuses"
									}), STATUSES.map((s) => /* @__PURE__ */ jsx("option", {
										value: s,
										children: STATUS_LABELS[s] || s
									}, s))]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-xs font-semibold text-gray-600 mb-1",
									children: "Type"
								}), /* @__PURE__ */ jsxs("select", {
									value: filterState.type,
									onChange: (e) => handleFilter("type", e.target.value),
									className: "w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "",
											children: "All Types"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "normal",
											children: "Standard"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "preorder",
											children: "Pre-order"
										})
									]
								})] })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "block md:hidden space-y-3",
						children: [filteredOrders.map((order) => {
							const isPreorder = order.items?.some((i) => i.is_preorder);
							return /* @__PURE__ */ jsxs("div", {
								className: "bg-white p-4 rounded-xl shadow-xs border border-gray-200/70 space-y-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ jsx(Link, {
											href: route("admin.orders.show", order.id),
											className: "font-bold text-sm text-[#0F204B] hover:underline",
											children: order.order_number
										}), /* @__PURE__ */ jsx("span", {
											className: `px-2 py-0.5 text-[11px] font-bold rounded-full ${getStatusColor(order.status)}`,
											children: STATUS_LABELS[order.status] || order.status
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-xs text-gray-600",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-semibold text-gray-800",
											children: order.user?.name || "Unknown Customer"
										}), order.user?.email && /* @__PURE__ */ jsx("div", {
											className: "text-gray-400 truncate",
											children: order.user.email
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between text-xs pt-2 border-t border-gray-100",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-400",
												children: new Date(order.created_at).toLocaleDateString()
											}), isPreorder ? /* @__PURE__ */ jsx("span", {
												className: "px-1.5 py-0.5 text-[10px] font-bold rounded bg-purple-50 text-purple-700",
												children: "Pre-order"
											}) : /* @__PURE__ */ jsx("span", {
												className: "text-gray-400 text-[10px]",
												children: "Standard"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "font-bold text-sm text-gray-900",
											children: [order.total_amount, " dh"]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between pt-2 border-t border-gray-100",
										children: [/* @__PURE__ */ jsxs("a", {
											href: route("admin.orders.ticket", order.id),
											target: "_blank",
											rel: "noopener noreferrer",
											className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",
											children: [/* @__PURE__ */ jsx("svg", {
												className: "w-3.5 h-3.5 text-gray-500",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24",
												children: /* @__PURE__ */ jsx("path", {
													strokeLinecap: "round",
													strokeLinejoin: "round",
													strokeWidth: 2,
													d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												})
											}), "Slip PDF"]
										}), /* @__PURE__ */ jsxs(Link, {
											href: route("admin.orders.show", order.id),
											className: "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#0F204B] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",
											children: [/* @__PURE__ */ jsx("span", { children: "View Details" }), /* @__PURE__ */ jsx("span", { children: "→" })]
										})]
									})
								]
							}, order.id);
						}), filteredOrders.length === 0 && /* @__PURE__ */ jsx("div", {
							className: "bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400",
							children: "No orders match your filters."
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden md:block bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl",
						children: /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-200",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/70",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Order #"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Date"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Type"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Customer"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Total"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Status"
										}),
										/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "px-6 py-3.5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "bg-white divide-y divide-gray-200",
									children: [filteredOrders.map((order) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/60 transition-colors",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]",
												children: /* @__PURE__ */ jsx(Link, {
													href: route("admin.orders.show", order.id),
													className: "hover:underline",
													children: order.order_number
												})
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-xs text-gray-500",
												children: [/* @__PURE__ */ jsxs("div", { children: ["Created: ", new Date(order.created_at).toLocaleDateString()] }), order.status === "reçu" && /* @__PURE__ */ jsxs("div", {
													className: "text-green-700 font-semibold mt-0.5",
													children: ["Received: ", new Date(order.updated_at).toLocaleDateString()]
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-xs",
												children: order.items?.some((i) => i.is_preorder) ? /* @__PURE__ */ jsx("span", {
													className: "px-2 py-0.5 inline-flex text-xs font-semibold rounded-full bg-purple-50 text-purple-700",
													children: "Pre-order"
												}) : /* @__PURE__ */ jsx("span", {
													className: "text-gray-500",
													children: "Standard"
												})
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm text-gray-700",
												children: [/* @__PURE__ */ jsx("div", {
													className: "font-medium text-gray-900",
													children: order.user?.name || "Unknown Customer"
												}), /* @__PURE__ */ jsx("div", {
													className: "text-xs text-gray-400",
													children: order.user?.email
												})]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900",
												children: [order.total_amount, " dh"]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm",
												children: /* @__PURE__ */ jsx("span", {
													className: `px-2.5 py-1 inline-flex text-xs leading-none font-bold rounded-full ${getStatusColor(order.status)}`,
													children: STATUS_LABELS[order.status] || order.status
												})
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-3",
												children: [/* @__PURE__ */ jsxs("a", {
													href: route("admin.orders.ticket", order.id),
													target: "_blank",
													rel: "noopener noreferrer",
													className: "text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded",
													title: "Download Delivery Slip",
													children: [/* @__PURE__ */ jsx("svg", {
														className: "w-3.5 h-3.5",
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
														className: "text-xs font-semibold",
														children: "Slip"
													})]
												}), /* @__PURE__ */ jsx(Link, {
													href: route("admin.orders.show", order.id),
													className: "text-[#0F204B] font-bold text-xs hover:underline",
													children: "View →"
												})]
											})
										]
									}, order.id)), filteredOrders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 7,
										className: "px-6 py-8 whitespace-nowrap text-sm text-gray-400 text-center",
										children: "No orders found matching the filter criteria."
									}) })]
								})]
							})
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { List as default };
