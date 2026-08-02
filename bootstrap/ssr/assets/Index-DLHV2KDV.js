import { t as AdminLayout } from "./AdminLayout-B-B3bn_G.js";
import ProductModal from "./ProductModal-FCOIWgKp.js";
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
		if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) router.delete(route("admin.products.destroy", id));
	};
	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
		const matchesStock = lowStock ? product.stock < 5 : true;
		return matchesSearch && matchesStock;
	});
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "au-h3",
			children: "Gestion des Produits"
		}),
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Produits" }),
			/* @__PURE__ */ jsx("div", {
				className: "py-12",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto",
							children: [/* @__PURE__ */ jsx("input", {
								type: "text",
								placeholder: "Rechercher un produit...",
								className: "border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md shadow-sm w-full sm:w-64",
								value: search,
								onChange: (e) => setSearch(e.target.value)
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex items-center space-x-2 text-sm text-gray-600",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									className: "rounded border-gray-300 text-gray-800 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50",
									checked: lowStock,
									onChange: (e) => setLowStock(e.target.checked)
								}), /* @__PURE__ */ jsxs("span", { children: [
									"Stock ",
									"<",
									" 5"
								] })]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Link, {
								href: route("admin.products.trashed"),
								className: "au-btn whitespace-nowrap bg-gray-500 hover:bg-gray-600",
								style: { margin: 0 },
								children: "Corbeille"
							}), /* @__PURE__ */ jsx(Link, {
								href: route("admin.products.create"),
								className: "au-btn whitespace-nowrap",
								style: { margin: 0 },
								children: "Ajouter un produit"
							})]
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
									/* @__PURE__ */ jsxs("td", {
										className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
										children: [/* @__PURE__ */ jsx(Link, {
											href: route("admin.products.edit", product.id),
											className: "au-link-underline mr-4",
											children: "Modifier"
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => handleDelete(product.id),
											className: "text-red-600 hover:text-red-900 underline underline-offset-4 decoration-[0.1em]",
											children: "Supprimer"
										})]
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
export { Index as default };
