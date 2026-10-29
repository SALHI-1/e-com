import { t as AdminLayout } from "./AdminLayout-DYuByY_V.js";
import { n as InputLabel, t as TextInput_default } from "./TextInput-CDhi48PK.js";
import { t as InputError } from "./InputError-CCQKfEE5.js";
import { t as Checkbox } from "./Checkbox-BUETY56Z.js";
import { t as PrimaryButton } from "./PrimaryButton-Dlx63LxW.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Products/Edit.tsx
function Edit({ product, categories }) {
	const { data, setData, post, processing, errors } = useForm({
		name: product.name,
		brand: product.brand || "",
		category_id: product.category_id,
		description: product.description,
		price: product.price,
		stock: product.stock,
		volume: product.volume || "",
		is_new: product.is_new,
		is_bestseller: product.is_bestseller,
		allow_preorder: product.allow_preorder,
		image: null,
		_method: "PUT"
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("admin.products.update", product.id), { forceFormData: true });
	};
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
			}), /* @__PURE__ */ jsx("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ jsxs("h2", {
					className: "text-xl sm:text-2xl font-serif font-bold text-[#0F204B] truncate",
					children: ["Edit: ", product.name]
				})
			})]
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: `Edit Product: ${product.name}` }), /* @__PURE__ */ jsx("div", {
			className: "py-6 sm:py-10 bg-gray-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-2xl px-3 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "bg-white p-4 sm:p-6 rounded-xl shadow-xs border border-gray-200/70",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "name",
									value: "Product Name *"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "name",
									type: "text",
									className: "mt-1 block w-full text-xs sm:text-sm",
									value: data.name,
									onChange: (e) => setData("name", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.name,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "brand",
									value: "Brand (optional)"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "brand",
									type: "text",
									className: "mt-1 block w-full text-xs sm:text-sm",
									value: data.brand,
									onChange: (e) => setData("brand", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.brand,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "category_id",
									value: "Category *"
								}),
								/* @__PURE__ */ jsx("select", {
									id: "category_id",
									className: "mt-1 block w-full border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm",
									value: data.category_id,
									onChange: (e) => setData("category_id", e.target.value),
									required: true,
									children: categories.map((cat) => /* @__PURE__ */ jsx("option", {
										value: cat.id,
										children: cat.name
									}, cat.id))
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.category_id,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "description",
									value: "Description *"
								}),
								/* @__PURE__ */ jsx("textarea", {
									id: "description",
									className: "mt-1 block w-full border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm",
									rows: 4,
									value: data.description,
									onChange: (e) => setData("description", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.description,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx(InputLabel, {
										htmlFor: "price",
										value: "Price (dh) *"
									}),
									/* @__PURE__ */ jsx(TextInput_default, {
										id: "price",
										type: "number",
										step: "0.01",
										className: "mt-1 block w-full text-xs sm:text-sm",
										value: data.price,
										onChange: (e) => setData("price", e.target.value),
										required: true
									}),
									/* @__PURE__ */ jsx(InputError, {
										message: errors.price,
										className: "mt-1"
									})
								] }), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx(InputLabel, {
										htmlFor: "stock",
										value: "Stock Quantity *"
									}),
									/* @__PURE__ */ jsx(TextInput_default, {
										id: "stock",
										type: "number",
										className: "mt-1 block w-full text-xs sm:text-sm",
										value: data.stock,
										onChange: (e) => setData("stock", e.target.value),
										required: true
									}),
									/* @__PURE__ */ jsx(InputError, {
										message: errors.stock,
										className: "mt-1"
									})
								] })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "volume",
									value: "Volume (e.g. ml, optional)"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "volume",
									type: "number",
									className: "mt-1 block w-full text-xs sm:text-sm",
									value: data.volume,
									onChange: (e) => setData("volume", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.volume,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "image",
									value: "Product Image (optional)"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 flex justify-center px-4 py-5 border-2 border-gray-300 border-dashed rounded-xl relative overflow-hidden group hover:border-gray-500 transition-colors",
									children: data.image ? /* @__PURE__ */ jsxs("div", {
										className: "text-center w-full",
										children: [
											/* @__PURE__ */ jsxs("p", {
												className: "text-xs text-gray-600 mb-2 truncate max-w-xs mx-auto",
												children: ["New file: ", data.image.name]
											}),
											/* @__PURE__ */ jsx("img", {
												src: URL.createObjectURL(data.image),
												alt: "Preview",
												className: "mx-auto max-h-44 object-contain mb-3 rounded-lg"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setData("image", null),
												className: "text-red-600 hover:text-red-800 text-xs font-semibold",
												children: "Remove new image"
											})
										]
									}) : product.image_url ? /* @__PURE__ */ jsxs("div", {
										className: "text-center w-full",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-600 mb-2",
												children: "Current image"
											}),
											/* @__PURE__ */ jsx("img", {
												src: product.image_url,
												alt: "Current",
												className: "mx-auto max-h-44 object-contain mb-3 rounded-lg"
											}),
											/* @__PURE__ */ jsx("div", {
												className: "flex text-xs sm:text-sm text-gray-600 justify-center",
												children: /* @__PURE__ */ jsxs("label", {
													htmlFor: "file-upload",
													className: "relative cursor-pointer bg-white rounded-md font-semibold text-[#0F204B] hover:underline focus-within:outline-none",
													children: [/* @__PURE__ */ jsx("span", { children: "Replace image" }), /* @__PURE__ */ jsx("input", {
														id: "file-upload",
														name: "image",
														type: "file",
														className: "sr-only",
														accept: "image/*",
														onChange: (e) => setData("image", e.target.files ? e.target.files[0] : null)
													})]
												})
											})
										]
									}) : /* @__PURE__ */ jsxs("div", {
										className: "space-y-1 text-center",
										children: [
											/* @__PURE__ */ jsx("svg", {
												className: "mx-auto h-10 w-10 text-gray-400 group-hover:text-gray-500 transition-colors",
												stroke: "currentColor",
												fill: "none",
												viewBox: "0 0 48 48",
												"aria-hidden": "true",
												children: /* @__PURE__ */ jsx("path", {
													d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",
													strokeWidth: "2",
													strokeLinecap: "round",
													strokeLinejoin: "round"
												})
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex text-xs sm:text-sm text-gray-600 justify-center",
												children: [/* @__PURE__ */ jsxs("label", {
													htmlFor: "file-upload",
													className: "relative cursor-pointer bg-white rounded-md font-semibold text-[#0F204B] hover:underline focus-within:outline-none",
													children: [/* @__PURE__ */ jsx("span", { children: "Upload a file" }), /* @__PURE__ */ jsx("input", {
														id: "file-upload",
														name: "image",
														type: "file",
														className: "sr-only",
														accept: "image/*",
														onChange: (e) => setData("image", e.target.files ? e.target.files[0] : null)
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "pl-1 text-gray-400",
													children: "or drag & drop"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[11px] text-gray-400",
												children: "PNG, JPG, WEBP up to 10MB"
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.image,
									className: "mt-1"
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row sm:space-x-6 gap-2 sm:gap-0 pt-2 border-t border-gray-100",
								children: [
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center cursor-pointer py-1",
										children: [/* @__PURE__ */ jsx(Checkbox, {
											name: "is_new",
											checked: data.is_new,
											onChange: (e) => setData("is_new", e.target.checked)
										}), /* @__PURE__ */ jsx("span", {
											className: "ms-2 text-xs sm:text-sm text-gray-700 select-none",
											children: "New Product"
										})]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center cursor-pointer py-1",
										children: [/* @__PURE__ */ jsx(Checkbox, {
											name: "is_bestseller",
											checked: data.is_bestseller,
											onChange: (e) => setData("is_bestseller", e.target.checked)
										}), /* @__PURE__ */ jsx("span", {
											className: "ms-2 text-xs sm:text-sm text-gray-700 select-none",
											children: "Best Seller"
										})]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center cursor-pointer py-1",
										children: [/* @__PURE__ */ jsx(Checkbox, {
											name: "allow_preorder",
											checked: data.allow_preorder,
											onChange: (e) => setData("allow_preorder", e.target.checked)
										}), /* @__PURE__ */ jsx("span", {
											className: "ms-2 text-xs sm:text-sm text-gray-700 select-none",
											children: "Allow Pre-order"
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-end gap-3 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ jsx(Link, {
									href: route("admin.products.index"),
									className: "px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-800",
									children: "Cancel"
								}), /* @__PURE__ */ jsx(PrimaryButton, {
									disabled: processing,
									className: "w-full sm:w-auto bg-[#0F204B] justify-center",
									children: processing ? "Saving…" : "Update Product"
								})]
							})
						]
					})
				})
			})
		})]
	});
}
//#endregion
export { Edit as default };
