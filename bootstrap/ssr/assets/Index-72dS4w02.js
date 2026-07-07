import { t as AdminLayout } from "./AdminLayout-B8-O_FZg.js";
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
function Index({ orders, filters }) {
	const [draggingId, setDraggingId] = useState(null);
	const [dateFilter, setDateFilter] = useState(filters?.date || "");
	const handleFilterChange = (e) => {
		const date = e.target.value;
		setDateFilter(date);
		router.get(route("admin.orders.index"), { date }, {
			preserveState: true,
			preserveScroll: true
		});
	};
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
			alert("Mouvement invalide : Impossible de reculer le statut de la commande.");
			setDraggingId(null);
			return;
		}
		router.put(route("admin.orders.update", order.id), { status: targetStatus }, {
			preserveScroll: true,
			onFinish: () => setDraggingId(null)
		});
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "text-xl font-semibold leading-tight text-gray-800",
			children: "Gestion des Commandes (Kanban)"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Commandes" }), /* @__PURE__ */ jsx("div", {
			className: "py-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-full px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-6 bg-white p-4 rounded-lg shadow-sm flex items-center gap-4",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "dateFilter",
							className: "text-sm font-medium text-gray-700",
							children: "Filtrer à partir du :"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "date",
							id: "dateFilter",
							value: dateFilter,
							onChange: handleFilterChange,
							className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						}),
						dateFilter && /* @__PURE__ */ jsx("button", {
							onClick: () => {
								setDateFilter("");
								router.get(route("admin.orders.index"), { date: "" }, {
									preserveState: true,
									preserveScroll: true
								});
							},
							className: "text-sm text-gray-500 hover:text-gray-700 underline",
							children: "Effacer"
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]",
					children: STATUSES.map((status) => /* @__PURE__ */ jsxs("div", {
						className: "bg-gray-100 rounded-lg min-w-[280px] w-[280px] flex flex-col shadow-sm",
						onDragOver: (e) => handleDragOver(e, status),
						onDrop: (e) => handleDrop(e, status),
						children: [/* @__PURE__ */ jsxs("div", {
							className: `p-3 border-b border-gray-300 rounded-t-lg font-bold capitalize text-sm text-center ${status.includes("annulé") ? "bg-red-100 text-red-800" : "bg-gray-200 text-gray-700"}`,
							children: [status, /* @__PURE__ */ jsxs("span", {
								className: "ml-2 text-xs font-normal text-gray-500",
								children: [
									"(",
									orders.filter((o) => o.status === status).length,
									")"
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-3 flex-1 overflow-y-auto space-y-3",
							children: [orders.filter((o) => o.status === status).map((order) => {
								const isCancelled = status.includes("annulé");
								return /* @__PURE__ */ jsxs("div", {
									draggable: !isCancelled,
									onDragStart: (e) => !isCancelled && handleDragStart(e, order.id),
									className: `bg-white p-4 rounded shadow-sm border-l-4 transition-shadow ${isCancelled ? "cursor-not-allowed opacity-75" : "cursor-grab active:cursor-grabbing hover:shadow-md"}`,
									style: { borderColor: status.includes("annulé") ? "#ef4444" : status === "reçu" ? "#10b981" : status === "confirmé" ? "#3b82f6" : "#f59e0b" },
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-start mb-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-sm",
												children: order.order_number
											}), /* @__PURE__ */ jsxs("div", {
												className: "text-right",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "text-[10px] text-gray-500 uppercase",
													children: ["Création: ", new Date(order.created_at).toLocaleDateString()]
												}), status === "reçu" && /* @__PURE__ */ jsxs("div", {
													className: "text-[10px] text-green-700 font-bold uppercase mt-0.5",
													children: ["Reçu: ", new Date(order.updated_at).toLocaleDateString()]
												})]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-sm text-gray-700 mb-1",
											children: order.user?.name || "Client"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-sm font-semibold text-gray-900 mb-3",
											children: [order.total_amount, " dh"]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center mt-2",
											children: [isCancelled ? /* @__PURE__ */ jsx("button", {
												onClick: (e) => {
													e.stopPropagation();
													if (confirm("Voulez-vous récupérer cette commande (en attente) ?")) router.put(route("admin.orders.update", order.id), { status: "en attente" }, { preserveScroll: true });
												},
												className: "text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded",
												children: "Récupérer"
											}) : /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx(Link, {
												href: route("admin.orders.show", order.id),
												className: "text-xs text-indigo-600 hover:underline",
												children: "Détails →"
											})]
										})
									]
								}, order.id);
							}), orders.filter((o) => o.status === status).length === 0 && /* @__PURE__ */ jsx("div", {
								className: "text-center text-sm text-gray-400 italic py-4",
								children: "Aucune commande"
							})]
						})]
					}, status))
				})]
			})
		})]
	});
}
//#endregion
export { Index as default };
