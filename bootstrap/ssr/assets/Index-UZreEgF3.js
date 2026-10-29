import { t as AdminLayout } from "./AdminLayout-DYuByY_V.js";
import ProductModal from "./ProductModal-C9Ye4NSv.js";
import { Head, Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Products/Index.tsx
function Index({ products, filters }) {
	const [search, setSearch] = useState(filters?.search || "");
	const [lowStock, setLowStock] = useState(filters?.low_stock === "true" || filters?.low_stock === true);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openProductDetails = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};
	const handleDelete = (id) => {
		if (confirm("Are you sure you want to delete this product?")) router.delete(route("admin.products.destroy", id));
	};
	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
		const matchesStock = lowStock ? product.stock < 5 : true;
		return matchesSearch && matchesStock;
	});
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B]",
				children: "Product Management"
			}), /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-gray-500",
				children: [
					filteredProducts.length,
					" product",
					filteredProducts.length !== 1 ? "s" : "",
					" listed"
				]
			})]
		}),
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Products" }),
			/* @__PURE__ */ jsx("div", {
				className: "py-6 sm:py-10 bg-gray-50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative flex-1 sm:w-72",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "text",
											placeholder: "Search products…",
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
								}), /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none py-1",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										className: "rounded border-gray-300 text-[#0F204B] shadow-xs focus:ring-[#0F204B]",
										checked: lowStock,
										onChange: (e) => setLowStock(e.target.checked)
									}), /* @__PURE__ */ jsxs("span", { children: [
										"Low stock (",
										"<",
										" 5)"
									] })]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 w-full sm:w-auto justify-end",
								children: [/* @__PURE__ */ jsx(Link, {
									href: route("admin.products.trashed"),
									className: "flex-1 sm:flex-initial text-center px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",
									children: "Trash"
								}), /* @__PURE__ */ jsx(Link, {
									href: route("admin.products.create"),
									className: "flex-1 sm:flex-initial text-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F204B] hover:bg-[#1a3374] rounded-lg shadow-xs transition-colors",
									children: "+ Add Product"
								})]
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
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0",
											children: ["ID #", product.id]
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
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-400",
												children: "Stock:"
											}), product.stock < 5 ? /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 font-bold rounded-full bg-red-50 text-red-700 text-[11px]",
												children: [product.stock, " (Low)"]
											}) : /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 font-semibold rounded-full bg-green-50 text-green-700 text-[11px]",
												children: [product.stock, " in stock"]
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => openProductDetails(product),
													className: "px-2.5 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md",
													children: "View"
												}),
												/* @__PURE__ */ jsx(Link, {
													href: route("admin.products.edit", product.id),
													className: "px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md",
													children: "Edit"
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => handleDelete(product.id),
													className: "px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-md",
													children: "Delete"
												})
											]
										})]
									})
								]
							}, product.id)), filteredProducts.length === 0 && /* @__PURE__ */ jsx("div", {
								className: "bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400",
								children: "No products found matching your search."
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
													children: /* @__PURE__ */ jsx("span", {
														className: "px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium",
														children: product.category?.name || "—"
													})
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900",
													children: [product.price, " dh"]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-6 py-4 whitespace-nowrap text-xs",
													children: product.stock < 5 ? /* @__PURE__ */ jsxs("span", {
														className: "px-2 py-0.5 font-bold rounded-full bg-red-50 text-red-700",
														children: [product.stock, " (Low)"]
													}) : /* @__PURE__ */ jsx("span", {
														className: "text-gray-700 font-medium",
														children: product.stock
													})
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-3",
													children: [/* @__PURE__ */ jsx(Link, {
														href: route("admin.products.edit", product.id),
														className: "text-[#0F204B] font-bold hover:underline",
														children: "Edit"
													}), /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => handleDelete(product.id),
														className: "text-red-600 hover:text-red-800 font-semibold underline",
														children: "Delete"
													})]
												})
											]
										}, product.id)), filteredProducts.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
											colSpan: 6,
											className: "px-6 py-8 text-center text-sm text-gray-400",
											children: "No products found matching your search."
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
export { Index as default };
