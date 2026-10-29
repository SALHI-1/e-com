import { t as AdminLayout } from "./AdminLayout-CjENzdXY.js";
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
		header: /* @__PURE__ */ jsx("h2", {
			className: "au-h3",
			children: "Analytics Dashboard"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }), /* @__PURE__ */ jsx("div", {
			className: "py-12 bg-gray-50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => scrollToSection("transactions"),
							className: "bg-white px-4 py-2 text-sm font-bold text-[#0F204B] border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors",
							children: "↓ Recent Transactions"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => scrollToSection("top-products"),
							className: "bg-white px-4 py-2 text-sm font-bold text-[#0F204B] border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors",
							children: "↓ Top In-Demand Products"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",
									children: "Today's Revenue"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-3xl font-extrabold text-[#0F204B]",
									children: [Number(metrics?.revenue || 0).toFixed(2), " dh"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",
									children: "Total Orders"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-3xl font-extrabold text-[#0F204B]",
									children: metrics?.orders || 0
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",
									children: "Products in Stock"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-3xl font-extrabold text-[#0F204B]",
									children: metrics?.stock || 0
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",
										children: "Top In-Demand"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-lg font-extrabold text-[#0F204B] leading-tight",
										children: topProduct ? topProduct.name : "None"
									}),
									topProduct && /* @__PURE__ */ jsxs("div", {
										className: "text-xs font-medium text-gray-500 mt-1",
										children: [topProduct.order_items_sum_quantity, " sales"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-8 lg:col-span-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-[#0F204B]",
									children: "Correlation: Revenue vs Volume (30 Days)"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mt-1",
									children: "Evaluating the impact of daily order volume on daily revenue."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-80 w-full",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(ComposedChart, {
										data: salesData,
										margin: {
											top: 10,
											right: 0,
											bottom: 0,
											left: 0
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
												fontSize: 11,
												dy: 10
											}),
											/* @__PURE__ */ jsx(YAxis, {
												yAxisId: "left",
												stroke: SECONDARY_COLOR,
												tickFormatter: (val) => `${val / 1e3}k`,
												tickLine: false,
												axisLine: false,
												fontSize: 11,
												dx: -10
											}),
											/* @__PURE__ */ jsx(YAxis, {
												yAxisId: "right",
												orientation: "right",
												stroke: SECONDARY_COLOR,
												tickLine: false,
												axisLine: false,
												fontSize: 11,
												dx: 10
											}),
											/* @__PURE__ */ jsx(Tooltip, {
												cursor: { fill: "#F3F4F6" },
												contentStyle: {
													borderRadius: "8px",
													border: "none",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
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
													fontSize: "11px",
													color: SECONDARY_COLOR,
													paddingBottom: "20px"
												}
											}),
											/* @__PURE__ */ jsx(Bar, {
												yAxisId: "right",
												dataKey: "orders_count",
												name: "Volume (Orders)",
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
													r: 6,
													fill: PRIMARY_COLOR
												}
											})
										]
									})
								})
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-[#0F204B]",
									children: "Status Funnel"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mt-1",
									children: "Overall order distribution by status."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-80 w-full",
								children: formattedOrderStatusData && formattedOrderStatusData.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(BarChart, {
										layout: "vertical",
										data: formattedOrderStatusData,
										margin: {
											top: 0,
											right: 30,
											left: 10,
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
													fontSize: 11,
													fontWeight: 500
												},
												width: 110
											}),
											/* @__PURE__ */ jsx(Tooltip, {
												cursor: { fill: "transparent" },
												contentStyle: {
													borderRadius: "8px",
													border: "none",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
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
						className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-6 border-b border-gray-100 flex justify-between items-center",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-[#0F204B]",
								children: "Recent Transactions"
							}), /* @__PURE__ */ jsx(Link, {
								href: route("admin.orders.index"),
								className: "text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#0F204B] transition-colors",
								children: "View all →"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-100",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/50",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Reference"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Customer"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Amount"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Date"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "bg-white divide-y divide-gray-50",
									children: [recentOrders && recentOrders.map((order) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/50 transition-colors",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]",
												children: /* @__PURE__ */ jsx(Link, {
													href: route("admin.orders.show", order.id),
													className: "hover:underline",
													children: order.order_number
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
												children: order.user?.name || "Unknown"
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900",
												children: [order.total_amount, " dh"]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
												children: [/* @__PURE__ */ jsxs("div", { children: ["Created: ", new Date(order.created_at).toLocaleDateString()] }), order.status === "reçu" && /* @__PURE__ */ jsxs("div", {
													className: "text-[#0F204B] font-semibold mt-1",
													children: ["Received: ", new Date(order.updated_at).toLocaleDateString()]
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm",
												children: /* @__PURE__ */ jsx("span", {
													className: `px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full ${order.status.includes("annulé") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`,
													children: STATUS_LABELS[order.status] || order.status
												})
											})
										]
									}, order.id)), (!recentOrders || recentOrders.length === 0) && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 5,
										className: "px-6 py-8 text-center text-sm text-gray-400",
										children: "No recent transactions."
									}) })]
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						id: "top-products",
						className: "bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-6 border-b border-gray-100 flex justify-between items-center",
							children: /* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-[#0F204B]",
								children: "Top In-Demand Products"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-100",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/50",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Rank"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Product"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Quantity Ordered"
										})
									] })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "bg-white divide-y divide-gray-50",
									children: [topProducts && topProducts.map((product, index) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/50 transition-colors",
										children: [
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-400",
												children: ["#", index + 1]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]",
												children: product.name
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900",
												children: [product.order_items_sum_quantity, " units"]
											})
										]
									}, product.id)), (!topProducts || topProducts.length === 0) && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 3,
										className: "px-6 py-8 text-center text-sm text-gray-400",
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
