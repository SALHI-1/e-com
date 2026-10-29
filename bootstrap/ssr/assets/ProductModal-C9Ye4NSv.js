import { t as Modal } from "./Modal-D5A3RQdx.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Products/ProductModal.tsx
function ProductModal({ product, show, onClose }) {
	if (!product) return null;
	return /* @__PURE__ */ jsx(Modal, {
		show,
		onClose,
		maxWidth: "2xl",
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-4 sm:p-6 max-h-[88vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-4 pb-2 border-b border-gray-100",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg sm:text-xl font-bold text-[#0F204B]",
						children: "Product Details"
					}), /* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors",
						"aria-label": "Close modal",
						children: /* @__PURE__ */ jsx("svg", {
							className: "w-5 h-5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M6 18L18 6M6 6l12 12"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row gap-4 sm:gap-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-full md:w-1/3 shrink-0",
						children: product.image_url ? /* @__PURE__ */ jsx("img", {
							src: product.image_url,
							alt: product.name,
							className: "w-full max-h-60 sm:max-h-72 object-contain bg-gray-50 rounded-xl border border-gray-200"
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-44 sm:h-56 bg-gray-50 flex items-center justify-center rounded-xl border border-gray-200",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-xs text-gray-400",
								children: "No image available"
							})
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "w-full md:w-2/3 space-y-3 sm:space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg sm:text-2xl font-bold text-gray-900 leading-snug",
								children: product.name
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-xs text-gray-500 flex flex-wrap gap-1.5 mt-1",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-mono font-medium",
									children: ["ID: #", product.id]
								}), product.category && /* @__PURE__ */ jsx("span", {
									className: "px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium",
									children: product.category.name
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-2.5 sm:gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 p-3 rounded-lg border border-gray-100",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[10px] text-gray-500 uppercase font-bold tracking-wider",
										children: "Price"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-base sm:text-lg font-bold text-gray-900",
										children: [product.price, " dh"]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 p-3 rounded-lg border border-gray-100",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[10px] text-gray-500 uppercase font-bold tracking-wider",
										children: "Stock"
									}), /* @__PURE__ */ jsxs("span", {
										className: `text-base sm:text-lg font-bold ${product.stock < 5 ? "text-red-600" : "text-green-600"}`,
										children: [
											product.stock,
											" ",
											product.stock < 5 ? "(Low)" : ""
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm",
								children: [
									product.brand && /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-500",
											children: "Brand:"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-800",
											children: product.brand
										})
									] }),
									product.volume && /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-500",
											children: "Volume:"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-800",
											children: product.volume
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-500",
											children: "New Product:"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-800",
											children: product.is_new ? "Yes" : "No"
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-500",
											children: "Best Seller:"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-800",
											children: product.is_bestseller ? "Yes" : "No"
										})
									] })
								]
							}),
							product.description && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1",
								children: "Description"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs sm:text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed border border-gray-100",
								children: product.description
							})] })
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-5 sm:mt-6 flex justify-end",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "w-full sm:w-auto px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs sm:text-sm font-semibold transition-colors text-center",
						children: "Close"
					})
				})
			]
		})
	});
}
//#endregion
export { ProductModal as default };
