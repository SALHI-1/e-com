import { n as useAurelia, t as ClientLayout } from "./ClientLayout-CXCiJW1n.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
//#region resources/js/Pages/Cart/Index.tsx
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
var FREE_DELIVERY_CITIES = ["casablanca", "tanger"];
var FREE_DELIVERY_THRESHOLD = 299;
var DELIVERY_FEE = 20;
function getDeliveryFee(city, subtotal) {
	if (subtotal > FREE_DELIVERY_THRESHOLD) return 0;
	if (city && FREE_DELIVERY_CITIES.includes(city.toLowerCase())) return 0;
	return DELIVERY_FEE;
}
function Toast({ message, type = "success", onClose }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3e3);
		return () => clearTimeout(timer);
	}, [onClose]);
	const isSuccess = type === "success";
	return /* @__PURE__ */ jsxs("div", {
		style: {
			position: "fixed",
			top: "88px",
			right: "24px",
			zIndex: 9999,
			display: "flex",
			alignItems: "flex-start",
			gap: "14px",
			padding: "18px 22px",
			borderRadius: "6px",
			background: isSuccess ? "var(--au-dark, #211A14)" : "#5c1f1f",
			boxShadow: "0 12px 40px rgba(33,26,20,.28), 0 2px 8px rgba(0,0,0,.12)",
			color: "var(--au-bg, #F6F0E4)",
			minWidth: "290px",
			maxWidth: "400px",
			animation: "toastSlideIn .4s cubic-bezier(.16,1,.3,1)",
			borderLeft: `4px solid ${isSuccess ? "var(--au-gold, #C2A063)" : "#e07070"}`,
			fontFamily: "var(--au-font-sans, sans-serif)"
		},
		children: [
			/* @__PURE__ */ jsx("span", {
				style: {
					fontSize: "18px",
					lineHeight: 1,
					flexShrink: 0,
					marginTop: "2px",
					color: isSuccess ? "var(--au-gold, #C2A063)" : "#e07070",
					fontFamily: "var(--au-font-serif)"
				},
				children: isSuccess ? "✓" : "✕"
			}),
			/* @__PURE__ */ jsxs("div", {
				style: { flex: 1 },
				children: [/* @__PURE__ */ jsx("p", {
					style: {
						margin: 0,
						fontSize: "11px",
						fontWeight: 500,
						letterSpacing: ".2em",
						textTransform: "uppercase",
						color: "var(--au-gold, #C2A063)",
						lineHeight: 1,
						marginBottom: "6px"
					},
					children: isSuccess ? "Ourélia" : "Erreur"
				}), /* @__PURE__ */ jsx("p", {
					style: {
						margin: 0,
						fontSize: "13px",
						fontWeight: 300,
						color: "var(--au-cream, #F0E6D4)",
						lineHeight: 1.5,
						letterSpacing: ".01em"
					},
					children: message
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: onClose,
				style: {
					background: "none",
					border: "none",
					color: "rgba(240,230,212,.45)",
					cursor: "pointer",
					fontSize: "16px",
					lineHeight: 1,
					padding: "0 0 0 6px",
					flexShrink: 0,
					marginTop: "1px"
				},
				"aria-label": "Fermer",
				children: "×"
			})
		]
	});
}
function Index(props) {
	return /* @__PURE__ */ jsx(ClientLayout, {
		auth: props.auth,
		cartCount: props.cartCount,
		title: "Aurélia",
		children: /* @__PURE__ */ jsx(CartContent, { ...props })
	});
}
function CartContent({ auth, cartItems, totalAmount, flash, errors }) {
	const { t } = useAurelia();
	const [showCheckout, setShowCheckout] = useState(false);
	const [toast, setToast] = useState(null);
	const { data, setData, post, processing, errors: formErrors } = useForm({
		shipping_address: "",
		phone: auth.user?.phone || "+212",
		guest_name: "",
		delivery_city: ""
	});
	useEffect(() => {
		if (flash?.success) setToast({
			message: flash.success,
			type: "success"
		});
		else if (errors?.cart || errors?.stock) setToast({
			message: errors.cart || errors.stock || "Une erreur est survenue.",
			type: "error"
		});
	}, [
		flash?.success,
		errors?.cart,
		errors?.stock
	]);
	const deliveryFee = useMemo(() => getDeliveryFee(data.delivery_city, totalAmount), [data.delivery_city, totalAmount]);
	const grandTotal = totalAmount + deliveryFee;
	const updateQuantity = (productId, quantity) => {
		router.patch(route("cart.update"), {
			product_id: productId,
			quantity
		}, { preserveScroll: true });
	};
	const removeItem = (productId) => {
		router.delete(route("cart.remove"), {
			data: { product_id: productId },
			preserveScroll: true
		});
	};
	const handleCheckout = (e) => {
		e.preventDefault();
		post(route("cart.checkout"));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${t.cartTitle} — Aurélia` }),
		toast && /* @__PURE__ */ jsx(Toast, {
			message: toast.message,
			type: toast.type,
			onClose: () => setToast(null)
		}),
		/* @__PURE__ */ jsx("div", {
			className: "au-cart-section",
			children: cartItems.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "au-empty",
				children: [
					/* @__PURE__ */ jsxs("svg", {
						width: "48",
						height: "48",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "#4A4038",
						strokeWidth: "1",
						style: { margin: "0 auto 1.5rem" },
						children: [
							/* @__PURE__ */ jsx("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }),
							/* @__PURE__ */ jsx("line", {
								x1: "3",
								y1: "6",
								x2: "21",
								y2: "6"
							}),
							/* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 01-8 0" })
						]
					}),
					/* @__PURE__ */ jsx("p", { children: t.cartEmpty }),
					/* @__PURE__ */ jsx("div", {
						style: { marginTop: "2rem" },
						children: /* @__PURE__ */ jsx(Link, {
							href: route("home"),
							className: "au-btn-gold",
							children: t.backShop
						})
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("h1", {
				className: "au-cart-title",
				children: t.cartTitle
			}), /* @__PURE__ */ jsxs("div", {
				className: "au-cart-grid",
				children: [/* @__PURE__ */ jsx("div", {
					className: "au-cart-items",
					children: cartItems.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "au-cart-item",
						children: [
							item.product.image_url && /* @__PURE__ */ jsx("img", {
								src: item.product.image_url,
								alt: item.product.name,
								className: "au-cart-item-img"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-cart-item-info",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "au-cart-item-name",
										children: item.product.name
									}),
									item.product.category && /* @__PURE__ */ jsx("p", {
										className: "au-cart-item-cat",
										children: item.product.category.name
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "au-cart-item-price",
										children: [
											item.product.price,
											" dh / ",
											t.unit
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								style: {
									display: "flex",
									alignItems: "center",
									border: "1px solid var(--au-border)",
									borderRadius: "4px",
									overflow: "hidden",
									width: "80px",
									height: "36px"
								},
								children: [
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => updateQuantity(item.product.id, Math.max(1, item.quantity - 1)),
										disabled: item.quantity <= 1,
										style: {
											padding: "0 10px",
											background: "transparent",
											border: "none",
											cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
											color: "var(--au-text)"
										},
										children: "-"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "number",
										min: "1",
										max: item.product.stock,
										value: item.quantity,
										onChange: (e) => updateQuantity(item.product.id, Math.min(item.product.stock, Math.max(1, parseInt(e.target.value) || 1))),
										className: "au-qty",
										style: {
											border: "none",
											borderRadius: 0,
											textAlign: "center",
											width: "100%",
											MozAppearance: "textfield",
											padding: 0
										}
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1)),
										disabled: item.quantity >= item.product.stock,
										style: {
											padding: "0 10px",
											background: "transparent",
											border: "none",
											cursor: item.quantity >= item.product.stock ? "not-allowed" : "pointer",
											color: "var(--au-text)"
										},
										children: "+"
									})
								]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "au-cart-item-subtotal",
								children: [item.subtotal.toFixed(2), " dh"]
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => removeItem(item.product.id),
								className: "au-cart-remove",
								title: "Retirer du panier",
								children: "✕"
							})
						]
					}, item.product.id))
				}), /* @__PURE__ */ jsxs("div", {
					className: "au-cart-summary",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "au-cart-summary-title",
							children: "Récapitulatif"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-cart-summary-row",
							children: [/* @__PURE__ */ jsx("span", { children: t.subtotal }), /* @__PURE__ */ jsxs("span", { children: [totalAmount.toFixed(2), " dh"] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-cart-summary-row",
							children: [/* @__PURE__ */ jsx("span", { children: t.deliveryFee }), deliveryFee === 0 ? /* @__PURE__ */ jsxs("span", {
								style: {
									color: "var(--au-gold)",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									gap: "6px"
								},
								children: [/* @__PURE__ */ jsx("span", {
									style: {
										textDecoration: "line-through",
										color: "var(--au-text-muted)",
										fontWeight: 400,
										fontSize: "0.85em"
									},
									children: "20 dh"
								}), /* @__PURE__ */ jsx("span", { children: "0 DH ✓" })]
							}) : /* @__PURE__ */ jsxs("span", {
								style: { fontWeight: 600 },
								children: [deliveryFee.toFixed(2), " dh"]
							})]
						}),
						deliveryFee > 0 && /* @__PURE__ */ jsx("div", {
							style: {
								fontSize: "0.72rem",
								color: "var(--au-text-muted)",
								background: "var(--au-surface)",
								borderRadius: "6px",
								padding: "0.4rem 0.6rem",
								marginBottom: "0.4rem",
								lineHeight: 1.4
							},
							children: "💡 Livraison gratuite pour Casablanca & Tanger, ou pour toute commande supérieure à 299 dh."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-cart-summary-total",
							children: [/* @__PURE__ */ jsx("span", { children: t.orderTotal }), /* @__PURE__ */ jsxs("span", { children: [grandTotal.toFixed(2), " dh"] })]
						}),
						!showCheckout ? /* @__PURE__ */ jsx("button", {
							onClick: () => setShowCheckout(true),
							className: "au-btn-gold",
							style: {
								width: "100%",
								textAlign: "center"
							},
							children: t.checkout
						}) : /* @__PURE__ */ jsxs("form", {
							onSubmit: handleCheckout,
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "au-checkout-note",
									dangerouslySetInnerHTML: { __html: t.waNote.replace("WhatsApp", "<strong>WhatsApp</strong>") }
								}),
								!auth.user && /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "au-label",
										children: t.guestName
									}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										value: data.guest_name,
										onChange: (e) => setData("guest_name", e.target.value),
										placeholder: "Jean Dupont",
										className: "au-input"
									}),
									formErrors.guest_name && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: formErrors.guest_name
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										className: "au-label",
										children: [
											t.waPhone,
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "au-label-hint",
												style: {
													textTransform: "none",
													letterSpacing: "normal"
												},
												children: "(ex: +212612345678)"
											})
										]
									}),
									/* @__PURE__ */ jsx("input", {
										type: "tel",
										value: data.phone,
										onChange: (e) => {
											let val = e.target.value;
											if (!val.startsWith("+212")) val = "+212" + val.replace(/^\+?212/, "");
											let rest = val.slice(4).replace(/[^0-9]/g, "");
											if (rest.startsWith("0")) rest = rest.slice(0, 10);
											else rest = rest.slice(0, 9);
											setData("phone", "+212" + rest);
										},
										placeholder: "+212 6 12 34 56 78",
										className: "au-input"
									}),
									formErrors.phone && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: formErrors.phone
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "au-label",
										children: t.deliveryCity
									}),
									/* @__PURE__ */ jsxs("select", {
										value: data.delivery_city,
										onChange: (e) => setData("delivery_city", e.target.value),
										className: "au-input",
										style: { cursor: "pointer" },
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "— Choisir une ville —"
										}), MOROCCO_CITIES.map((city) => /* @__PURE__ */ jsx("option", {
											value: city,
											children: city
										}, city))]
									}),
									formErrors.delivery_city && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: formErrors.delivery_city
									}),
									data.delivery_city && /* @__PURE__ */ jsx("p", {
										style: {
											fontSize: "0.78rem",
											marginTop: "0.3rem",
											color: deliveryFee === 0 ? "var(--au-gold)" : "var(--au-text-muted)"
										},
										children: deliveryFee === 0 ? `✓ Livraison gratuite pour ${data.delivery_city}` : `Frais de livraison : ${deliveryFee} dh`
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "au-label",
										children: t.address
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: data.shipping_address,
										onChange: (e) => setData("shipping_address", e.target.value),
										placeholder: "Rue, quartier, code postal…",
										rows: 3,
										className: "au-textarea"
									}),
									formErrors.shipping_address && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: formErrors.shipping_address
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									style: {
										display: "flex",
										gap: "0.6rem"
									},
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setShowCheckout(false),
										className: "au-btn-ghost",
										style: { flex: 1 },
										children: t.back
									}), /* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: processing,
										className: "au-btn-gold",
										style: {
											flex: 1,
											textAlign: "center"
										},
										children: processing ? t.sending : t.confirm
									})]
								})
							]
						})
					]
				})]
			})] })
		})
	] });
}
//#endregion
export { Index as default };
