import { t as AdminLayout } from "./AdminLayout-D3tHsjk_.js";
import { Head, Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Orders/Index.tsx
var STATUSES = [
	"en attente",
	"annulé avant la confirmation",
	"confirmé",
	"livré",
	"annulé après la livraison",
	"reçu"
];
var STATUS_LABELS = {
	"en attente": "Pending",
	"annulé avant la confirmation": "Cancelled (Pre-Confirm)",
	"confirmé": "Confirmed",
	"livré": "Delivered",
	"annulé après la livraison": "Cancelled (Post-Delivery)",
	"reçu": "Received"
};
function Index({ orders, filters }) {
	const [draggingId, setDraggingId] = useState(null);
	const [dateFilter, setDateFilter] = useState(filters?.date || "");
	const handleFilterChange = (e) => {
		const date = e.target.value;
		setDateFilter(date);
	};
	const filteredOrders = orders.filter((order) => {
		if (!dateFilter) return true;
		return order.created_at.substring(0, 10) >= dateFilter;
	});
	const handleDragStart = (e, orderId) => {
		setDraggingId(orderId);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", orderId.toString());
	};
	const handleDragOver = (e, targetStatus) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};
	const handleDrop = (e, targetStatus) => {
		e.preventDefault();
		if (!draggingId) return;
		const order = orders.find((o) => o.id === draggingId);
		if (!order) return;
		const fromIndex = STATUSES.indexOf(order.status);
		if (STATUSES.indexOf(targetStatus) <= fromIndex) {
			alert("Invalid move: Cannot revert order status backwards.");
			setDraggingId(null);
			return;
		}
		router.put(route("admin.orders.update", order.id), { status: targetStatus }, {
			preserveScroll: true,
			onFinish: () => setDraggingId(null)
		});
	};
	const handleQuickMove = (orderId, targetStatus) => {
		router.put(route("admin.orders.update", orderId), { status: targetStatus }, { preserveScroll: true });
	};
	const getAvailableTransitions = (currentStatus) => {
		const currentIndex = STATUSES.indexOf(currentStatus);
		if (currentIndex === -1 || currentStatus === "reçu" || currentStatus.includes("annulé")) return [];
		return STATUSES.filter((_, idx) => idx > currentIndex);
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
				children: "Orders Management (Kanban)"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-xs text-gray-500 sm:hidden",
				children: "Swipe columns horizontally • Drag or tap Move"
			})]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Orders Kanban" }), /* @__PURE__ */ jsx("div", {
			className: "py-4 sm:py-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-full px-3 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-gray-200/70 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "dateFilter",
								className: "text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap",
								children: "Filter from:"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "date",
								id: "dateFilter",
								value: dateFilter,
								onChange: handleFilterChange,
								className: "flex-1 sm:flex-initial rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
							}),
							dateFilter && /* @__PURE__ */ jsx("button", {
								onClick: () => setDateFilter(""),
								className: "text-xs text-red-600 hover:text-red-800 font-semibold underline",
								children: "Clear"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-xs text-gray-500 font-medium",
						children: [
							"Showing ",
							/* @__PURE__ */ jsx("strong", { children: filteredOrders.length }),
							" orders"
						]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory h-[calc(100vh-210px)] -mx-3 sm:mx-0 px-3 sm:px-0",
					children: STATUSES.map((status) => {
						const columnOrders = filteredOrders.filter((o) => o.status === status);
						return /* @__PURE__ */ jsxs("div", {
							className: "bg-gray-100/90 rounded-xl min-w-[270px] w-[82vw] sm:w-[280px] sm:min-w-[280px] snap-center shrink-0 flex flex-col shadow-xs border border-gray-200/60",
							onDragOver: (e) => handleDragOver(e, status),
							onDrop: (e) => handleDrop(e, status),
							children: [/* @__PURE__ */ jsxs("div", {
								className: `p-3 border-b border-gray-200 rounded-t-xl font-bold text-xs sm:text-sm text-center flex items-center justify-between px-4 ${status.includes("annulé") ? "bg-red-50 text-red-800" : status === "reçu" ? "bg-green-50 text-green-800" : "bg-white text-gray-800"}`,
								children: [/* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: STATUS_LABELS[status] || status
								}), /* @__PURE__ */ jsx("span", {
									className: "ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600",
									children: columnOrders.length
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-2.5 sm:p-3 flex-1 overflow-y-auto space-y-2.5",
								children: [columnOrders.map((order) => {
									const isCancelled = status.includes("annulé");
									const transitions = getAvailableTransitions(status);
									return /* @__PURE__ */ jsxs("div", {
										draggable: !isCancelled,
										onDragStart: (e) => !isCancelled && handleDragStart(e, order.id),
										className: `bg-white p-3.5 rounded-lg shadow-xs border border-gray-100 border-l-4 transition-all ${isCancelled ? "cursor-not-allowed opacity-80" : "cursor-grab active:cursor-grabbing hover:shadow-md"}`,
										style: { borderColor: status.includes("annulé") ? "#ef4444" : status === "reçu" ? "#10b981" : status === "confirmé" ? "#3b82f6" : "#f59e0b" },
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between items-start mb-1.5 gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold text-xs sm:text-sm text-[#0F204B] truncate",
													children: order.order_number
												}), /* @__PURE__ */ jsxs("div", {
													className: "text-right shrink-0",
													children: [/* @__PURE__ */ jsx("div", {
														className: "text-[10px] text-gray-400",
														children: new Date(order.created_at).toLocaleDateString()
													}), status === "reçu" && /* @__PURE__ */ jsxs("div", {
														className: "text-[10px] text-green-700 font-bold",
														children: ["Rec'd ", new Date(order.updated_at).toLocaleDateString()]
													})]
												})]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "text-xs text-gray-600 truncate mb-1",
												children: order.user?.name || "Customer"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "text-xs sm:text-sm font-bold text-gray-900 mb-2.5",
												children: [order.total_amount, " dh"]
											}),
											transitions.length > 0 && /* @__PURE__ */ jsxs("div", {
												className: "mb-2 pt-2 border-t border-gray-100 flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-[10px] uppercase font-bold text-gray-400",
													children: "Move:"
												}), /* @__PURE__ */ jsxs("select", {
													value: "",
													onChange: (e) => {
														if (e.target.value) handleQuickMove(order.id, e.target.value);
													},
													className: "flex-1 text-[11px] py-1 px-2 border-gray-200 rounded bg-gray-50 text-gray-700 focus:ring-1 focus:ring-[#0F204B]",
													children: [/* @__PURE__ */ jsx("option", {
														value: "",
														disabled: true,
														children: "Select status…"
													}), transitions.map((t) => /* @__PURE__ */ jsxs("option", {
														value: t,
														children: ["→ ", STATUS_LABELS[t] || t]
													}, t))]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between items-center pt-1 border-t border-gray-50",
												children: [isCancelled ? /* @__PURE__ */ jsx("button", {
													onClick: (e) => {
														e.stopPropagation();
														if (confirm("Restore this order to pending?")) router.put(route("admin.orders.update", order.id), { status: "en attente" }, { preserveScroll: true });
													},
													className: "text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded font-medium",
													children: "Restore"
												}) : /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsxs(Link, {
													href: route("admin.orders.show", order.id),
													className: "text-xs font-semibold text-[#0F204B] hover:underline flex items-center gap-0.5 ml-auto",
													children: [/* @__PURE__ */ jsx("span", { children: "Details" }), /* @__PURE__ */ jsx("span", { children: "→" })]
												})]
											})
										]
									}, order.id);
								}), columnOrders.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "text-center text-xs text-gray-400 italic py-6",
									children: "No orders"
								})]
							})]
						}, status);
					})
				})]
			})
		})]
	});
}
//#endregion
export { Index as default };
