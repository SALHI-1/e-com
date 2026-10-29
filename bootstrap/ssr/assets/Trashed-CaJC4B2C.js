import { t as AdminLayout } from "./AdminLayout-D3tHsjk_.js";
import ProductModal from "./ProductModal-C9Ye4NSv.js";
import { Head, Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Products/Trashed.tsx
function Trashed({ products, filters }) {
	const [search, setSearch] = useState(filters?.search || "");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openProductDetails = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};
	const handleRestore = (id) => {
		if (confirm("Are you sure you want to restore this product?")) router.post(route("admin.products.restore", id));
	};
	const filteredProducts = products.filter((product) => {
		return product.name.toLowerCase().includes(search.toLowerCase());
	});
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ jsx(Link, {
				href: route("admin.products.index"),
				className: "p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors",
				title: "Back to Products",
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
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", {
				className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
				children: "Trashed Products"
			}) })]
		}),
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Trashed Products" }),
			/* @__PURE__ */ jsx("div", {
				className: "py-6 sm:py-10 bg-gray-50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative flex-1 sm:w-72",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "text",
										placeholder: "Search trashed products…",
										className: "w-full pl-9 pr-4 py-2 border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm",
										value: search,
										onChange: (e) => setSearch(e.target.value)
									}),
									/* @__PURE__ */ jsx("svg", {
										className: "w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										})
									}),
									search && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setSearch(""),
										className: "absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600",
										children: "✕"
									})
								]
							}), /* @__PURE__ */ jsx(Link, {
								href: route("admin.products.index"),
								className: "text-center px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",
								children: "← Back to Products"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "block md:hidden space-y-3",
							children: [filteredProducts.map((product) => /* @__PURE__ */ jsxs("div", {
								className: "bg-white p-4 rounded-xl shadow-xs border border-gray-200/70 space-y-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => openProductDetails(product),
											className: "font-bold text-sm text-[#0F204B] hover:underline text-left leading-snug",
											children: product.name
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 shrink-0",
											children: "Trashed"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between text-xs pt-1 border-t border-gray-100",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-gray-500 font-medium",
											children: product.category?.name || "Uncategorized"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-sm font-bold text-gray-900",
											children: [product.price, " dh"]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between text-xs pt-2 border-t border-gray-100",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-gray-500",
											children: ["Stock: ", product.stock]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => openProductDetails(product),
												className: "px-2.5 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md",
												children: "View"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => handleRestore(product.id),
												className: "px-3 py-1 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded-md",
												children: "Restore"
											})]
										})]
									})
								]
							}, product.id)), filteredProducts.length === 0 && /* @__PURE__ */ jsx("div", {
								className: "bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400",
								children: "No trashed products found."
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
												className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "ID"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Name"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Category"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Price"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Stock"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-3.5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider",
												children: "Actions"
											})
										] })
									}), /* @__PURE__ */ jsxs("tbody", {
										className: "bg-white divide-y divide-gray-200",
										children: [filteredProducts.map((product) => /* @__PURE__ */ jsxs("tr", {
											className: "hover:bg-gray-50/60 transition-colors",
											children: [
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500",
													children: ["#", product.id]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
													children: /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => openProductDetails(product),
														className: "font-bold text-[#0F204B] hover:underline text-left focus:outline-none",
														children: product.name
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-xs text-gray-500",
													children: product.category.name
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900",
													children: [product.price, " dh"]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-xs text-gray-500",
													children: product.stock < 5 ? /* @__PURE__ */ jsx("span", {
														className: "text-red-600 font-bold",
														children: product.stock
													}) : product.stock
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-right text-xs font-medium",
													children: /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => handleRestore(product.id),
														className: "text-green-600 hover:text-green-800 font-semibold underline",
														children: "Restore"
													})
												})
											]
										}, product.id)), filteredProducts.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
											colSpan: 6,
											className: "px-6 py-8 text-center text-sm text-gray-400",
											children: "No trashed products found."
										}) })]
									})]
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(ProductModal, {
				show: isModalOpen,
				onClose: () => setIsModalOpen(false),
				product: selectedProduct
			})
		]
	});
}
//#endregion
export { Trashed as default };
