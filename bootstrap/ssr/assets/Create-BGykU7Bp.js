import { t as AdminLayout } from "./AdminLayout-nNytKXjc.js";
import { t as InputLabel } from "./InputLabel-4-xi2Z9Z.js";
import { n as TextInput_default, t as InputError } from "./InputError-CvL50cpz.js";
import { t as PrimaryButton } from "./PrimaryButton-C1EagpHT.js";
import { t as Checkbox } from "./Checkbox-BUETY56Z.js";
import { Head, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Products/Create.tsx
function Create({ categories }) {
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		brand: "",
		category_id: categories.length > 0 ? categories[0].id : "",
		description: "",
		price: "",
		stock: "",
		volume: "",
		is_new: false,
		is_bestseller: false,
		image: null
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("admin.products.store"));
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "text-xl font-semibold leading-tight text-gray-800",
			children: "Ajouter un produit"
		}),
		children: [/* @__PURE__ */ jsx(Head, { title: "Ajouter un produit" }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-2xl sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "bg-white p-6 shadow sm:rounded-lg",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "name",
									value: "Nom du produit"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "name",
									type: "text",
									className: "mt-1 block w-full",
									value: data.name,
									onChange: (e) => setData("name", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.name,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "brand",
									value: "Marque (optionnel)"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "brand",
									type: "text",
									className: "mt-1 block w-full",
									value: data.brand,
									onChange: (e) => setData("brand", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.brand,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "category_id",
									value: "Catégorie"
								}),
								/* @__PURE__ */ jsxs("select", {
									id: "category_id",
									className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
									value: data.category_id,
									onChange: (e) => setData("category_id", e.target.value),
									required: true,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										disabled: true,
										children: "Sélectionner une catégorie"
									}), categories.map((cat) => /* @__PURE__ */ jsx("option", {
										value: cat.id,
										children: cat.name
									}, cat.id))]
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.category_id,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "description",
									value: "Description"
								}),
								/* @__PURE__ */ jsx("textarea", {
									id: "description",
									className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
									rows: 4,
									value: data.description,
									onChange: (e) => setData("description", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.description,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx(InputLabel, {
										htmlFor: "price",
										value: "Prix (dh)"
									}),
									/* @__PURE__ */ jsx(TextInput_default, {
										id: "price",
										type: "number",
										step: "0.01",
										className: "mt-1 block w-full",
										value: data.price,
										onChange: (e) => setData("price", e.target.value),
										required: true
									}),
									/* @__PURE__ */ jsx(InputError, {
										message: errors.price,
										className: "mt-2"
									})
								] }), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx(InputLabel, {
										htmlFor: "stock",
										value: "Stock"
									}),
									/* @__PURE__ */ jsx(TextInput_default, {
										id: "stock",
										type: "number",
										className: "mt-1 block w-full",
										value: data.stock,
										onChange: (e) => setData("stock", e.target.value),
										required: true
									}),
									/* @__PURE__ */ jsx(InputError, {
										message: errors.stock,
										className: "mt-2"
									})
								] })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "volume",
									value: "Volume (ex: ml, optionnel)"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "volume",
									type: "number",
									className: "mt-1 block w-full",
									value: data.volume,
									onChange: (e) => setData("volume", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.volume,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "image",
									value: "Image du produit (optionnel)"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative overflow-hidden group hover:border-indigo-500 transition-colors",
									children: data.image ? /* @__PURE__ */ jsxs("div", {
										className: "text-center w-full",
										children: [
											/* @__PURE__ */ jsxs("p", {
												className: "text-sm text-gray-600 mb-2",
												children: ["Fichier sélectionné : ", data.image.name]
											}),
											/* @__PURE__ */ jsx("img", {
												src: URL.createObjectURL(data.image),
												alt: "Preview",
												className: "mx-auto max-h-48 object-contain mb-4"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setData("image", null),
												className: "text-red-600 hover:text-red-800 text-sm",
												children: "Retirer l'image"
											})
										]
									}) : /* @__PURE__ */ jsxs("div", {
										className: "space-y-1 text-center",
										children: [
											/* @__PURE__ */ jsx("svg", {
												className: "mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors",
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
												className: "flex text-sm text-gray-600 justify-center",
												children: [/* @__PURE__ */ jsxs("label", {
													htmlFor: "file-upload",
													className: "relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500",
													children: [/* @__PURE__ */ jsx("span", { children: "Importer un fichier" }), /* @__PURE__ */ jsx("input", {
														id: "file-upload",
														name: "image",
														type: "file",
														className: "sr-only",
														accept: "image/*",
														onChange: (e) => setData("image", e.target.files ? e.target.files[0] : null)
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "pl-1",
													children: "ou glisser-déposer"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: "PNG, JPG, WEBP jusqu'à 10MB"
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.image,
									className: "mt-2"
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex space-x-6",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx(Checkbox, {
										name: "is_new",
										checked: data.is_new,
										onChange: (e) => setData("is_new", e.target.checked)
									}), /* @__PURE__ */ jsx("span", {
										className: "ms-2 text-sm text-gray-600",
										children: "Nouveau produit"
									})]
								}), /* @__PURE__ */ jsxs("label", {
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx(Checkbox, {
										name: "is_bestseller",
										checked: data.is_bestseller,
										onChange: (e) => setData("is_bestseller", e.target.checked)
									}), /* @__PURE__ */ jsx("span", {
										className: "ms-2 text-sm text-gray-600",
										children: "Bestseller"
									})]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsx(PrimaryButton, {
									disabled: processing,
									children: "Enregistrer"
								})
							})
						]
					})
				})
			})
		})]
	});
}
//#endregion
export { Create as default };
