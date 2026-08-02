import { t as Modal } from "./Modal-D5A3RQdx.js";
import { t as InputError } from "./InputError-CCQKfEE5.js";
import { useForm, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
//#region resources/js/Components/PreorderModal.tsx
var MOROCCO_CITIES = [
	"Casablanca",
	"Rabat",
	"Marrakech",
	"Fès",
	"Tanger",
	"Agadir",
	"Meknès",
	"Oujda",
	"Kénitra",
	"Tétouan",
	"Safi",
	"Mohammedia",
	"El Jadida",
	"Khouribga",
	"Béni Mellal",
	"Nador",
	"Taza",
	"Settat",
	"Berrechid",
	"Khémisset",
	"Inezgane",
	"Laâyoune",
	"Ksar El Kébir",
	"Larache",
	"Guelmim",
	"Berkane",
	"Al Hoceïma",
	"Taourirt",
	"Dakhla",
	"Errachidia",
	"Ouarzazate",
	"Tiznit",
	"Ifrane",
	"Azrou",
	"Midelt",
	"Sefrou",
	"Boujdour",
	"Smara",
	"Tan-Tan",
	"Taroudant",
	"Essaouira",
	"Sidi Ifni",
	"Zagora",
	"Tinghir",
	"Boulemane",
	"Figuig",
	"Chefchaouen",
	"Fnideq",
	"Martil",
	"M'diq",
	"Ait Melloul",
	"Deroua",
	"Bouskoura",
	"Médiouna",
	"Nouaceur",
	"Salé",
	"Skhirate",
	"Témara",
	"Harhoura",
	"Ain Aouda",
	"Sidi Yahia",
	"Benslimane",
	"Azemmour",
	"Bir Jdid",
	"Oualidia",
	"Youssoufia",
	"Ben Guerir",
	"Fquih Ben Salah",
	"Azilal",
	"Souk Sebt",
	"Oulad Teima",
	"Ait Baha",
	"Biougra",
	"Chtouka",
	"Drarga",
	"Lqliaa",
	"Reggada",
	"Imzouren",
	"Beni Ansar",
	"Selouane",
	"Zaio",
	"Ahfir",
	"Oujda Angad",
	"Ain Beni Mathar",
	"Jerada",
	"Taourirt Autre",
	"Tafraout",
	"Assa",
	"Foum Zguid",
	"Tata",
	"Goulmima",
	"Erfoud",
	"Rissani",
	"Arfoud",
	"Khénifra",
	"Mrirt",
	"El Hajeb",
	"Beni Mellal-Khenifra",
	"Sidi Bennour",
	"Oulad Frej"
];
function PreorderModal({ show, onClose, product, quantity }) {
	const { auth } = usePage().props;
	const user = auth?.user;
	const { data, setData, post, processing, errors, reset } = useForm({
		product_id: product?.id || "",
		quantity,
		guest_name: user?.name || "",
		phone: user?.phone || "",
		shipping_address: "",
		delivery_city: ""
	});
	React.useEffect(() => {
		if (show && product) setData((prev) => ({
			...prev,
			product_id: product.id,
			quantity
		}));
	}, [
		show,
		product,
		quantity
	]);
	const submit = (e) => {
		e.preventDefault();
		post(route("preorder.store"), {
			preserveScroll: true,
			onSuccess: () => {
				reset();
				onClose();
			}
		});
	};
	if (!product) return null;
	return /* @__PURE__ */ jsx(Modal, {
		show,
		onClose,
		maxWidth: "md",
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold",
						style: {
							fontFamily: "var(--au-font-serif)",
							color: "var(--au-dark)"
						},
						children: "Précommander"
					}), /* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "text-gray-400 hover:text-gray-600",
						children: "×"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6 flex gap-4 p-4 rounded-lg",
					style: { background: "var(--au-cream)" },
					children: [product.image_url && /* @__PURE__ */ jsx("img", {
						src: product.image_url,
						alt: product.name,
						className: "w-16 h-16 object-cover rounded"
					}), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-sm",
							children: product.name
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-600",
							children: [Number(product.price).toFixed(2), " dh"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 text-sm flex items-center gap-1",
							style: { color: "var(--au-gold)" },
							children: [/* @__PURE__ */ jsx("span", { children: "Quantité:" }), /* @__PURE__ */ jsx("span", {
								className: "font-bold",
								children: quantity
							})]
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "1rem"
					},
					children: [
						(!user || user.is_admin) && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "au-label",
								children: "Nom Complet"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								className: "au-input",
								value: data.guest_name,
								onChange: (e) => setData("guest_name", e.target.value),
								required: true
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.guest_name,
								className: "mt-1"
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "au-label",
								children: "Téléphone (WhatsApp)"
							}),
							/* @__PURE__ */ jsxs("div", {
								style: {
									display: "flex",
									border: "1px solid var(--au-border)",
									borderRadius: "4px",
									overflow: "hidden",
									background: "var(--au-bg)"
								},
								children: [/* @__PURE__ */ jsx("div", {
									style: {
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										padding: "0 16px",
										background: "var(--au-surface)",
										borderRight: "1px solid var(--au-border)",
										color: "var(--au-text)",
										fontWeight: 500,
										fontSize: "1rem",
										letterSpacing: "0.05em"
									},
									children: "+212"
								}), /* @__PURE__ */ jsx("input", {
									type: "tel",
									value: data.phone.replace(/^\+212/, ""),
									onChange: (e) => {
										let rest = e.target.value.replace(/[^0-9]/g, "");
										if (rest.startsWith("0")) rest = rest.slice(1);
										if (rest.length > 9) rest = rest.slice(0, 9);
										setData("phone", "+212" + rest);
									},
									placeholder: "6 12 34 56 78",
									className: "au-input",
									style: {
										border: "none",
										borderRadius: 0,
										flex: 1,
										boxShadow: "none"
									},
									required: true
								})]
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.phone,
								className: "mt-1"
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "au-label",
								children: "Ville de livraison"
							}),
							/* @__PURE__ */ jsxs("select", {
								className: "au-input",
								style: { cursor: "pointer" },
								value: data.delivery_city,
								onChange: (e) => setData("delivery_city", e.target.value),
								required: true,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "— Choisir une ville —"
								}), MOROCCO_CITIES.map((c) => /* @__PURE__ */ jsx("option", {
									value: c,
									children: c
								}, c))]
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.delivery_city,
								className: "mt-1"
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "au-label",
								children: "Adresse complète"
							}),
							/* @__PURE__ */ jsx("textarea", {
								className: "au-textarea",
								rows: 3,
								value: data.shipping_address,
								onChange: (e) => setData("shipping_address", e.target.value),
								required: true
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.shipping_address,
								className: "mt-1"
							})
						] }),
						errors.preorder && /* @__PURE__ */ jsx("div", {
							className: "p-3 bg-red-50 text-red-800 text-sm rounded border border-red-200",
							children: errors.preorder
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 flex justify-end",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "au-btn-gold",
								style: {
									width: "100%",
									textAlign: "center"
								},
								children: processing ? "En cours..." : "Confirmer la précommande"
							})
						})
					]
				})
			]
		})
	});
}
//#endregion
export { PreorderModal as t };
