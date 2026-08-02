import { t as AdminLayout } from "./AdminLayout-B-B3bn_G.js";
import ProductModal from "./ProductModal-FCOIWgKp.js";
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
		if (confirm("Êtes-vous sûr de vouloir restaurer ce produit ?")) router.post(route("admin.products.restore", id));
	};
	const filteredProducts = products.filter((product) => {
		return product.name.toLowerCase().includes(search.toLowerCase());
	});
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "au-h3",
			children: "Produits Supprimés (Corbeille)"
		}),
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Corbeille Produits" }),
			/* @__PURE__ */ jsx("div", {
				className: "py-12",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto",
							children: /* @__PURE__ */ jsx("input", {
								type: "text",
								placeholder: "Rechercher un produit supprimé...",
								className: "border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md shadow-sm w-full sm:w-64",
								value: search,
								onChange: (e) => setSearch(e.target.value)
							})
						}), /* @__PURE__ */ jsx(Link, {
							href: route("admin.products.index"),
							className: "au-btn whitespace-nowrap bg-gray-500 hover:bg-gray-600",
							style: { margin: 0 },
							children: "Retour aux produits"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "overflow-hidden bg-white shadow-sm sm:rounded-lg",
						children: [/* @__PURE__ */ jsxs("table", {
							className: "min-w-full divide-y divide-gray-200",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-gray-50",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "ID"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Nom"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Catégorie"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Prix"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Stock"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", {
								className: "bg-white divide-y divide-gray-200",
								children: filteredProducts.map((product) => /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
										children: product.id
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
										children: /* @__PURE__ */ jsx("button", {
											onClick: () => openProductDetails(product),
											className: "font-medium text-blue-600 hover:text-blue-800 hover:underline text-left focus:outline-none",
											children: product.name
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
										children: product.category.name
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
										children: [product.price, " dh"]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
										children: product.stock < 5 ? /* @__PURE__ */ jsx("span", {
											className: "text-red-600 font-bold",
											children: product.stock
										}) : product.stock
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
										children: /* @__PURE__ */ jsx("button", {
											onClick: () => handleRestore(product.id),
											className: "text-green-600 hover:text-green-900 underline underline-offset-4 decoration-[0.1em]",
											children: "Restaurer"
										})
									})
								] }, product.id))
							})]
						}), filteredProducts.length === 0 && /* @__PURE__ */ jsx("div", {
							className: "p-6 text-center text-gray-500",
							children: "Aucun produit trouvé."
						})]
					})]
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
