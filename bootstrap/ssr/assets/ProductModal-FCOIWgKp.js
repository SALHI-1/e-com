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
			className: "p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold text-gray-900",
						children: "Détails du Produit"
					}), /* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "text-gray-500 hover:text-gray-700",
						children: /* @__PURE__ */ jsx("svg", {
							className: "w-6 h-6",
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
					className: "flex flex-col md:flex-row gap-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-full md:w-1/3",
						children: product.image_url ? /* @__PURE__ */ jsx("img", {
							src: product.image_url,
							alt: product.name,
							className: "w-full h-auto object-cover rounded-md border border-gray-200"
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-48 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-gray-400",
								children: "Aucune image"
							})
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "w-full md:w-2/3 space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-semibold text-gray-900",
								children: product.name
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm text-gray-500 flex gap-2 mt-1",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium",
									children: ["ID: ", product.id]
								}), product.category && /* @__PURE__ */ jsx("span", {
									className: "px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium",
									children: product.category.name
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 p-3 rounded border border-gray-100",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-xs text-gray-500 uppercase font-semibold",
										children: "Prix"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-lg font-bold text-gray-900",
										children: [product.price, " dh"]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 p-3 rounded border border-gray-100",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-xs text-gray-500 uppercase font-semibold",
										children: "Stock"
									}), /* @__PURE__ */ jsx("span", {
										className: `text-lg font-bold ${product.stock < 5 ? "text-red-600" : "text-green-600"}`,
										children: product.stock
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4 text-sm",
								children: [
									product.brand && /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-700",
											children: "Marque :"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-600",
											children: product.brand
										})
									] }),
									product.volume && /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-gray-700",
											children: "Volume :"
										}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-600",
											children: product.volume
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-gray-700",
										children: "Nouveau :"
									}), /* @__PURE__ */ jsx("span", {
										className: "ml-2 text-gray-600",
										children: product.is_new ? "Oui" : "Non"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-gray-700",
										children: "Bestseller :"
									}), /* @__PURE__ */ jsx("span", {
										className: "ml-2 text-gray-600",
										children: product.is_bestseller ? "Oui" : "Non"
									})] })
								]
							}),
							product.description && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "block text-sm font-semibold text-gray-700 mb-1",
								children: "Description :"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-sm text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-wrap max-h-40 overflow-y-auto",
								children: product.description
							})] })
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 flex justify-end",
					children: /* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "au-btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-none",
						children: "Fermer"
					})
				})
			]
		})
	});
}
//#endregion
export { ProductModal as default };
