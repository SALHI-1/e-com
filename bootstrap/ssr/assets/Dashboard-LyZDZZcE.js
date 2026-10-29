import { t as AdminLayout } from "./AdminLayout-DYuByY_V.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bar, BarChart, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region resources/js/Pages/Admin/Dashboard.tsx
var PRIMARY_COLOR = "#0F204B";
var SECONDARY_COLOR = "#8B95A5";
var GRID_COLOR = "#E5E7EB";
var STATUS_LABELS = {
	"en attente": "Pending",
	"annulé avant la confirmation": "Cancelled (Pre-Confirm)",
	"confirmé": "Confirmed",
	"livré": "Delivered",
	"annulé après la livraison": "Cancelled (Post-Delivery)",
	"reçu": "Received"
};
function Dashboard({ metrics, salesData, orderStatusData, recentOrders, topProducts }) {
	const topProduct = topProducts && topProducts.length > 0 ? topProducts[0] : null;
	const formattedOrderStatusData = (orderStatusData || []).map((item) => ({
		...item,
		statusLabel: STATUS_LABELS[item.status] || item.status
	}));
	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
				children: "Analytics Dashboard"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-xs text-gray-500",
				children: "Overview of store performance & metrics"
			})]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }), /* @__PURE__ */ jsx("div", {
			className: "py-6 sm:py-10 bg-gray-50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2 sm:gap-4",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => scrollToSection("transactions"),
							className: "flex-1 sm:flex-initial bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0F204B] border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 transition-colors text-center",
							children: "↓ Recent Transactions"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => scrollToSection("top-products"),
							className: "flex-1 sm:flex-initial bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0F204B] border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 transition-colors text-center",
							children: "↓ Top In-Demand Products"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate",
									children: "Today's Revenue"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B] truncate",
									children: [Number(metrics?.revenue || 0).toFixed(2), " dh"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate",
									children: "Total Orders"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B]",
									children: metrics?.orders || 0
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate",
									children: "Products in Stock"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B]",
									children: metrics?.stock || 0
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate",
										children: "Top In-Demand"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-sm sm:text-base lg:text-lg font-extrabold text-[#0F204B] leading-tight truncate",
										children: topProduct ? topProduct.name : "None"
									}),
									topProduct && /* @__PURE__ */ jsxs("div", {
										className: "text-[11px] font-medium text-gray-500 mt-0.5 truncate",
										children: [topProduct.order_items_sum_quantity, " sales"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-4 sm:p-6 lg:p-8 lg:col-span-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-4 sm:mb-6",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-base sm:text-lg font-bold text-[#0F204B]",
									children: "Correlation: Revenue vs Volume (30 Days)"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs sm:text-sm text-gray-500 mt-1",
									children: "Evaluating daily order volume vs daily revenue."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-64 sm:h-80 w-full -ms-2 sm:ms-0",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(ComposedChart, {
										data: salesData,
										margin: {
											top: 10,
											right: 10,
											bottom: 0,
											left: -15
										},
										children: [
											/* @__PURE__ */ jsx(XAxis, {
												dataKey: "date",
												tickFormatter: (tick) => {
													const d = new Date(tick);
													return `${d.getDate()}/${d.getMonth() + 1}`;
												},
												stroke: SECONDARY_COLOR,
												tickLine: false,
												axisLine: { stroke: GRID_COLOR },
												fontSize: 10,
												dy: 8
											}),
											/* @__PURE__ */ jsx(YAxis, {
												yAxisId: "left",
												stroke: SECONDARY_COLOR,
												tickFormatter: (val) => val >= 1e3 ? `${(val / 1e3).toFixed(0)}k` : val,
												tickLine: false,
												axisLine: false,
												fontSize: 10,
												dx: -5
											}),
											/* @__PURE__ */ jsx(YAxis, {
												yAxisId: "right",
												orientation: "right",
												stroke: SECONDARY_COLOR,
												tickLine: false,
												axisLine: false,
												fontSize: 10,
												dx: 5
											}),
											/* @__PURE__ */ jsx(Tooltip, {
												cursor: { fill: "#F3F4F6" },
												contentStyle: {
													borderRadius: "8px",
													border: "none",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
													fontSize: "12px"
												},
												labelStyle: {
													fontWeight: "bold",
													color: PRIMARY_COLOR,
													marginBottom: "4px"
												},
												labelFormatter: (label) => new Date(label).toLocaleDateString()
											}),
											/* @__PURE__ */ jsx(Legend, {
												verticalAlign: "top",
												align: "right",
												wrapperStyle: {
													fontSize: "10px",
													color: SECONDARY_COLOR,
													paddingBottom: "16px"
												}
											}),
											/* @__PURE__ */ jsx(Bar, {
												yAxisId: "right",
												dataKey: "orders_count",
												name: "Volume",
												fill: "#E5E7EB",
												radius: [
													2,
													2,
													0,
													0
												]
											}),
											/* @__PURE__ */ jsx(Line, {
												yAxisId: "left",
												type: "monotone",
												dataKey: "total",
												name: "Revenue (dh)",
												stroke: PRIMARY_COLOR,
												strokeWidth: 2.5,
												dot: false,
												activeDot: {
													r: 5,
													fill: PRIMARY_COLOR
												}
											})
										]
									})
								})
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-4 sm:p-6 lg:p-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-4 sm:mb-6",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-base sm:text-lg font-bold text-[#0F204B]",
									children: "Status Funnel"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs sm:text-sm text-gray-500 mt-1",
									children: "Order distribution by status."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-64 sm:h-80 w-full",
								children: formattedOrderStatusData && formattedOrderStatusData.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(BarChart, {
										layout: "vertical",
										data: formattedOrderStatusData,
										margin: {
											top: 0,
											right: 20,
											left: -10,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ jsx(XAxis, {
												type: "number",
												hide: true
											}),
											/* @__PURE__ */ jsx(YAxis, {
												dataKey: "statusLabel",
												type: "category",
												axisLine: false,
												tickLine: false,
												tick: {
													fill: PRIMARY_COLOR,
													fontSize: 10,
													fontWeight: 500
												},
												width: 90
											}),
											/* @__PURE__ */ jsx(Tooltip, {
												cursor: { fill: "transparent" },
												contentStyle: {
													borderRadius: "8px",
													border: "none",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
													fontSize: "12px"
												}
											}),
											/* @__PURE__ */ jsx(Bar, {
												dataKey: "count",
												name: "Orders",
												fill: PRIMARY_COLOR,
												radius: [
													0,
													4,
													4,
													0
												]
											})
										]
									})
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-sm mt-10 text-center",
									children: "No data available"
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						id: "transactions",
						className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base sm:text-lg font-bold text-[#0F204B]",
								children: "Recent Transactions"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500 mt-0.5 sm:hidden",
								children: "Swipe horizontally to see all columns"
							})] }), /* @__PURE__ */ jsx(Link, {
								href: route("admin.orders.index"),
								className: "text-xs font-bold uppercase tracking-wider text-[#0F204B] hover:underline transition-colors shrink-0",
								children: "View all →"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-100",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/70",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Reference"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Customer"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Amount"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Date"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "bg-white divide-y divide-gray-50",
									children: [recentOrders && recentOrders.map((order) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/50 transition-colors",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-[#0F204B]",
												children: /* @__PURE__ */ jsx(Link, {
													href: route("admin.orders.show", order.id),
													className: "hover:underline",
													children: order.order_number
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600",
												children: order.user?.name || "Unknown"
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900",
												children: [order.total_amount, " dh"]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500",
												children: [/* @__PURE__ */ jsxs("div", { children: ["Created: ", new Date(order.created_at).toLocaleDateString()] }), order.status === "reçu" && /* @__PURE__ */ jsxs("div", {
													className: "text-[#0F204B] font-semibold mt-0.5",
													children: ["Received: ", new Date(order.updated_at).toLocaleDateString()]
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm",
												children: /* @__PURE__ */ jsx("span", {
													className: `px-2 py-0.5 sm:py-1 inline-flex text-[11px] leading-tight font-bold rounded-full ${order.status.includes("annulé") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`,
													children: STATUS_LABELS[order.status] || order.status
												})
											})
										]
									}, order.id)), (!recentOrders || recentOrders.length === 0) && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 5,
										className: "px-4 sm:px-6 py-8 text-center text-xs sm:text-sm text-gray-400",
										children: "No recent transactions."
									}) })]
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						id: "top-products",
						className: "bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center",
							children: /* @__PURE__ */ jsx("h3", {
								className: "text-base sm:text-lg font-bold text-[#0F204B]",
								children: "Top In-Demand Products"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-100",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/70",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Rank"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Product"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Quantity Ordered"
										})
									] })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "bg-white divide-y divide-gray-50",
									children: [topProducts && topProducts.map((product, index) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/50 transition-colors",
										children: [
											/* @__PURE__ */ jsxs("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-gray-400",
												children: ["#", index + 1]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-[#0F204B]",
												children: product.name
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900",
												children: [product.order_items_sum_quantity, " units"]
											})
										]
									}, product.id)), (!topProducts || topProducts.length === 0) && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 3,
										className: "px-4 sm:px-6 py-8 text-center text-xs sm:text-sm text-gray-400",
										children: "No products sold yet."
									}) })]
								})]
							})
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { Dashboard as default };
