import { t as AdminLayout } from "./AdminLayout-DYuByY_V.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Orders/Show.tsx
var STATUS_LABELS = {
	"en attente": "Pending",
	"annulé avant la confirmation": "Cancelled (Pre-Confirm)",
	"confirmé": "Confirmed",
	"livré": "Delivered",
	"annulé après la livraison": "Cancelled (Post-Delivery)",
	"reçu": "Received"
};
var STATUSES = [
	"en attente",
	"annulé avant la confirmation",
	"confirmé",
	"livré",
	"annulé après la livraison",
	"reçu"
];
function Show({ order }) {
	const { data, setData, put, processing } = useForm({ status: order.status });
	const submitStatus = (e) => {
		e.preventDefault();
		put(route("admin.orders.update", order.id), { preserveScroll: true });
	};
	const getStatusBadge = (status) => {
		if (status.includes("annulé")) return "bg-red-50 text-red-700 border border-red-200/60";
		if (status === "reçu") return "bg-green-50 text-green-700 border border-green-200/60";
		if (status === "confirmé") return "bg-blue-50 text-blue-700 border border-blue-200/60";
		return "bg-amber-50 text-amber-800 border border-amber-200/60";
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx(Link, {
					href: route("admin.orders.list"),
					className: "p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors",
					title: "Back to Orders List",
					children: /* @__PURE__ */ jsx("svg", {
						className: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M10 19l-7-7m0 0l7-7m-7 7h18"
						})
					})
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
					children: ["Order #", order.order_number]
				}), /* @__PURE__ */ jsxs("div", {
					className: "text-xs text-gray-500 mt-0.5",
					children: ["Placed on ", new Date(order.created_at).toLocaleString()]
				})] })]
			}), /* @__PURE__ */ jsxs("a", {
				href: route("admin.orders.ticket", order.id),
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs transition-colors self-start sm:self-auto",
				children: [/* @__PURE__ */ jsx("svg", {
					className: "w-4 h-4 text-gray-500",
					fill: "none",
					stroke: "currentColor",
					viewBox: "0 0 24 24",
					children: /* @__PURE__ */ jsx("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
						d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					})
				}), /* @__PURE__ */ jsx("span", { children: "Download Delivery Slip (PDF)" })]
			})]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: `Order #${order.order_number}` }), /* @__PURE__ */ jsx("div", {
			className: "py-6 sm:py-10 bg-gray-50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: submitStatus,
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-wider text-gray-400",
									children: "Current Status:"
								}), /* @__PURE__ */ jsx("span", {
									className: `px-2.5 py-1 text-xs font-bold rounded-full ${getStatusBadge(order.status)}`,
									children: STATUS_LABELS[order.status] || order.status
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 w-full sm:w-auto",
								children: [/* @__PURE__ */ jsx("select", {
									value: data.status,
									onChange: (e) => setData("status", e.target.value),
									className: "flex-1 sm:flex-initial rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm py-2",
									children: STATUSES.map((s) => /* @__PURE__ */ jsx("option", {
										value: s,
										children: STATUS_LABELS[s] || s
									}, s))
								}), /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing || data.status === order.status,
									className: "px-4 py-2 bg-[#0F204B] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#1a3374] disabled:opacity-50 transition-colors shrink-0 shadow-xs",
									children: processing ? "Saving…" : "Update Status"
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-3",
									children: "Customer Details"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5 text-sm",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "font-bold text-gray-900",
											children: order.user?.name || "Customer"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-gray-600 text-xs sm:text-sm break-all",
											children: order.user?.email
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-gray-500 text-xs",
											children: ["Phone: ", /* @__PURE__ */ jsx("span", {
												className: "text-gray-700 font-medium",
												children: order.user?.phone || "Not provided"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-3",
									children: "Shipping Address"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed",
									children: order.shipping_address || "No address provided"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-3",
										children: "Order Total"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-2xl sm:text-3xl font-extrabold text-[#0F204B]",
										children: [order.total_amount, " dh"]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-xs text-gray-500 mt-1",
										children: "Payment on delivery / standard"
									})
								] }), order.status === "reçu" && /* @__PURE__ */ jsxs("div", {
									className: "mt-3 pt-3 border-t border-gray-100 text-xs text-green-700 font-semibold",
									children: ["Delivered & received on ", new Date(order.updated_at).toLocaleString()]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-xl shadow-xs border border-gray-200/70 overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between",
								children: /* @__PURE__ */ jsxs("h3", {
									className: "text-base font-bold text-[#0F204B]",
									children: [
										"Ordered Items (",
										order.items?.length || 0,
										")"
									]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "block sm:hidden divide-y divide-gray-100",
								children: order.items?.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "p-4 space-y-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-start gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-semibold text-sm text-gray-900",
											children: item.product?.name
										}), /* @__PURE__ */ jsxs("div", {
											className: "font-bold text-sm text-[#0F204B] shrink-0",
											children: [(item.unit_price * item.quantity).toFixed(2), " dh"]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between text-xs text-gray-500",
										children: [/* @__PURE__ */ jsxs("span", { children: [
											"Unit: ",
											item.unit_price,
											" dh"
										] }), /* @__PURE__ */ jsxs("span", { children: ["Qty: ", /* @__PURE__ */ jsx("strong", {
											className: "text-gray-800",
											children: item.quantity
										})] })]
									})]
								}, item.id))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hidden sm:block overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "min-w-full divide-y divide-gray-200",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "bg-gray-50/70",
										children: /* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Product"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Unit Price"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Quantity"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Total"
											})
										] })
									}), /* @__PURE__ */ jsx("tbody", {
										className: "bg-white divide-y divide-gray-200",
										children: order.items?.map((item) => /* @__PURE__ */ jsxs("tr", {
											className: "hover:bg-gray-50/60",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900",
													children: item.product?.name
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
													children: [item.unit_price, " dh"]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900",
													children: item.quantity
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-[#0F204B]",
													children: [(item.unit_price * item.quantity).toFixed(2), " dh"]
												})
											]
										}, item.id))
									})]
								})
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { Show as default };
