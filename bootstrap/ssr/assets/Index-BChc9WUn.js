import { n as useAurelia, t as ClientLayout } from "./ClientLayout-LgnMEJmu.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Cart/Index.tsx
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
	const { data, setData, post, processing, errors: formErrors } = useForm({
		shipping_address: "",
		phone: auth.user?.phone ?? "",
		guest_name: "",
		guest_email: ""
	});
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
		flash?.success && /* @__PURE__ */ jsx("div", {
			className: "au-flash",
			children: flash.success
		}),
		(errors?.cart || errors?.stock) && /* @__PURE__ */ jsx("div", {
			className: "au-flash au-flash-error",
			children: errors.cart || errors.stock
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
							/* @__PURE__ */ jsx("input", {
								type: "number",
								min: "1",
								max: item.product.stock,
								value: item.quantity,
								onChange: (e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1),
								className: "au-qty"
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
							children: [/* @__PURE__ */ jsx("span", { children: t.shipping }), /* @__PURE__ */ jsx("span", {
								style: { color: "var(--au-gold)" },
								children: t.free
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-cart-summary-total",
							children: [/* @__PURE__ */ jsx("span", { children: t.total }), /* @__PURE__ */ jsxs("span", { children: [totalAmount.toFixed(2), " dh"] })]
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
								!auth.user && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", { children: [
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
								] }), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "au-label",
										children: t.guestEmail
									}),
									/* @__PURE__ */ jsx("input", {
										type: "email",
										value: data.guest_email,
										onChange: (e) => setData("guest_email", e.target.value),
										placeholder: "jean@exemple.fr",
										className: "au-input"
									}),
									formErrors.guest_email && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: formErrors.guest_email
									})
								] })] }),
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
												children: "(ex: +33612345678)"
											})
										]
									}),
									/* @__PURE__ */ jsx("input", {
										type: "tel",
										value: data.phone,
										onChange: (e) => setData("phone", e.target.value),
										placeholder: "+33 6 12 34 56 78",
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
										children: t.address
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: data.shipping_address,
										onChange: (e) => setData("shipping_address", e.target.value),
										placeholder: "12 rue de la Paix, 75001 Paris",
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
