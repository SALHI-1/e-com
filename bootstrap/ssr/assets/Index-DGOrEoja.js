import { t as AdminLayout } from "./AdminLayout-nNytKXjc.js";
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
function Index({ orders }) {
	const [draggingId, setDraggingId] = useState(null);
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
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-full px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
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
											className: "flex justify-between items-center mb-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-sm",
												children: order.order_number
											}), /* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-500",
												children: new Date(order.created_at).toLocaleDateString()
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
										/* @__PURE__ */ jsx("div", {
											className: "text-right",
											children: /* @__PURE__ */ jsx(Link, {
												href: route("admin.orders.show", order.id),
												className: "text-xs text-indigo-600 hover:underline",
												children: "Détails →"
											})
										})
									]
								}, order.id);
							}), orders.filter((o) => o.status === status).length === 0 && /* @__PURE__ */ jsx("div", {
								className: "text-center text-sm text-gray-400 italic py-4",
								children: "Aucune commande"
							})]
						})]
					}, status))
				})
			})
		})]
	});
}
//#endregion
export { Index as default };
