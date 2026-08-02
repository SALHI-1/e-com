import { n as useAurelia, t as ClientLayout } from "./ClientLayout-BEza7JXt.js";
import { t as PreorderModal } from "./PreorderModal-BUnAXYOF.js";
import { Head, Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region resources/js/Pages/Product/Show.tsx
function Show(props) {
	return /* @__PURE__ */ jsx(ClientLayout, {
		auth: props.auth,
		cartCount: props.cartCount,
		title: props.product.name,
		children: /* @__PURE__ */ jsx(ProductDetail, { ...props })
	});
}
function OureliaToast({ message, type = "success", onClose }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3e3);
		return () => clearTimeout(timer);
	}, [onClose]);
	const isError = type === "error";
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
			background: isError ? "#5c1f1f" : "var(--au-dark, #211A14)",
			boxShadow: "0 12px 40px rgba(33,26,20,.28), 0 2px 8px rgba(0,0,0,.12)",
			color: "var(--au-bg, #F6F0E4)",
			minWidth: "290px",
			maxWidth: "400px",
			animation: "toastSlideIn .4s cubic-bezier(.16,1,.3,1)",
			borderLeft: `4px solid ${isError ? "#e07070" : "var(--au-gold, #C2A063)"}`,
			fontFamily: "var(--au-font-sans, sans-serif)"
		},
		children: [
			/* @__PURE__ */ jsx("span", {
				style: {
					fontSize: "18px",
					lineHeight: 1,
					flexShrink: 0,
					marginTop: "2px",
					color: isError ? "#e07070" : "var(--au-gold, #C2A063)",
					fontFamily: "var(--au-font-serif)"
				},
				children: type === "success" ? "✓" : isError ? "✕" : "ℹ"
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
					children: isError ? "Erreur" : "Ourélia"
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
function ProductDetail({ product, flash, errors }) {
	const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(null);
	const [showPreorder, setShowPreorder] = useState(false);
	useEffect(() => {
		if (flash?.success) setToast({
			message: flash.success,
			type: "success"
		});
		else if (errors?.quantity) setToast({
			message: errors.quantity,
			type: "error"
		});
	}, [flash?.success, errors?.quantity]);
	const addToCart = () => {
		let finalQty = parseInt(quantity) || 1;
		if (finalQty > product.stock) {
			setToast({
				message: "Le stock est insuffisant pour le moment.",
				type: "info"
			});
			setQuantity(product.stock);
			return;
		}
		if (finalQty < 1) {
			finalQty = 1;
			setQuantity(1);
		}
		setLoading(true);
		router.post(route("cart.add"), {
			product_id: product.id,
			quantity: finalQty
		}, {
			preserveScroll: true,
			onFinish: () => setLoading(false)
		});
	};
	const isOut = product.stock === 0;
	const isPreorderable = isOut && product.allow_preorder;
	const isNew = product.is_new && !product.is_bestseller;
	const isBest = product.is_bestseller;
	const isSale = !!product.price_old || !!product.is_sale;
	const tag = isOut && !isPreorderable ? "out" : isBest ? "best" : isNew ? "new" : isSale ? "sale" : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "au-container",
		style: {
			paddingTop: "40px",
			paddingBottom: "40px",
			minHeight: "60vh"
		},
		children: [
			/* @__PURE__ */ jsxs(Head, { children: [
				/* @__PURE__ */ jsx("title", { children: `${product.name} · Ourélia` }),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "description",
					name: "description",
					content: product.description || `Découvrez ${product.name} chez Ourélia.`
				}),
				/* @__PURE__ */ jsx("style", { children: `
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                ` })
			] }),
			toast && /* @__PURE__ */ jsx(OureliaToast, {
				message: toast.message,
				type: toast.type,
				onClose: () => setToast(null)
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "40px",
					alignItems: "start"
				},
				children: [/* @__PURE__ */ jsxs("div", {
					style: {
						background: categoryTint(product.category.name),
						borderRadius: "8px",
						overflow: "hidden",
						position: "relative",
						aspectRatio: "4/5",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						maxWidth: "400px",
						width: "100%",
						margin: "0 auto"
					},
					children: [tag && /* @__PURE__ */ jsx("div", {
						className: "au-prod-tag",
						style: tag === "out" ? {
							background: "var(--au-dark)",
							color: "var(--au-bg)",
							position: "absolute",
							top: "16px",
							left: "16px"
						} : {
							position: "absolute",
							top: "16px",
							left: "16px"
						},
						children: tag === "out" ? "Épuisé" : tagLabel(tag)
					}), product.image_url ? /* @__PURE__ */ jsx("img", {
						src: product.image_url,
						alt: product.name,
						style: {
							width: "100%",
							height: "100%",
							objectFit: "cover",
							mixBlendMode: "multiply"
						}
					}) : /* @__PURE__ */ jsxs("div", {
						style: {
							padding: "40px",
							textAlign: "center",
							color: "var(--au-text)"
						},
						children: [/* @__PURE__ */ jsx("div", {
							style: {
								fontSize: "12px",
								letterSpacing: "0.1em",
								textTransform: "uppercase",
								marginBottom: "8px"
							},
							children: "Ourélia"
						}), /* @__PURE__ */ jsx("div", {
							style: {
								fontFamily: "var(--au-font-serif)",
								fontSize: "24px"
							},
							children: categoryLabel(product.category.name)
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					style: { padding: "20px 0" },
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "au-eyebrow-sm",
							style: { marginBottom: "16px" },
							children: /* @__PURE__ */ jsx(Link, {
								href: `/?category=${encodeURIComponent(product.category.name)}#collection`,
								className: "au-link-underline",
								children: categoryLabel(product.category.name)
							})
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "au-h3",
							style: { marginBottom: "16px" },
							children: product.name
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-price-lg",
							style: { marginBottom: "24px" },
							children: [product.price_old && /* @__PURE__ */ jsxs("span", {
								style: {
									textDecoration: "line-through",
									color: "var(--au-text-muted)",
									fontSize: "0.8em",
									marginRight: "10px"
								},
								children: [Number(product.price_old).toFixed(2), " dh"]
							}), /* @__PURE__ */ jsxs("span", {
								style: isSale && !isOut ? { color: "var(--au-sale)" } : {},
								children: [Number(product.price).toFixed(2), " dh"]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "au-body-text",
							style: {
								marginBottom: "40px",
								whiteSpace: "pre-line",
								color: "var(--au-text-muted)"
							},
							children: product.description || "Un soin essentiel, conçu avec des ingrédients naturels pour répondre aux besoins de votre peau avec efficacité."
						}),
						/* @__PURE__ */ jsxs("div", {
							style: {
								display: "flex",
								gap: "16px",
								alignItems: "stretch",
								marginBottom: "20px"
							},
							children: [/* @__PURE__ */ jsxs("div", {
								style: {
									display: "flex",
									alignItems: "center",
									border: "1px solid var(--au-border)",
									borderRadius: "4px",
									overflow: "hidden",
									width: "120px",
									height: "48px"
								},
								children: [
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => {
											setQuantity(Math.max(1, (parseInt(quantity) || 1) - 1));
										},
										disabled: isOut && !isPreorderable || (parseInt(quantity) || 1) <= 1,
										style: {
											flex: 1,
											height: "100%",
											background: "transparent",
											border: "none",
											cursor: isOut && !isPreorderable || (parseInt(quantity) || 1) <= 1 ? "not-allowed" : "pointer",
											color: "var(--au-text)",
											fontSize: "1.2rem"
										},
										children: "-"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "number",
										min: "1",
										max: product.stock,
										value: quantity,
										onChange: (e) => setQuantity(e.target.value),
										disabled: isOut && !isPreorderable,
										style: {
											width: "40px",
											height: "100%",
											border: "none",
											borderRadius: 0,
											textAlign: "center",
											MozAppearance: "textfield",
											padding: 0
										}
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => {
											const curr = parseInt(quantity) || 1;
											if (!isPreorderable && curr >= product.stock) setToast({
												message: "Le stock est insuffisant pour le moment.",
												type: "info"
											});
											else setQuantity(curr + 1);
										},
										disabled: isOut && !isPreorderable,
										style: {
											flex: 1,
											height: "100%",
											background: "transparent",
											border: "none",
											cursor: isOut && !isPreorderable ? "not-allowed" : "pointer",
											color: "var(--au-text)",
											fontSize: "1.2rem"
										},
										children: "+"
									})
								]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "au-btn",
								onClick: isPreorderable ? () => setShowPreorder(true) : addToCart,
								disabled: loading || isOut && !isPreorderable,
								style: {
									flex: 1,
									height: "48px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: loading ? "…" : isPreorderable ? "Précommander" : isOut ? "Épuisé" : t.addCart
							})]
						}),
						isOut && /* @__PURE__ */ jsx("p", {
							style: {
								color: "var(--au-sale)",
								fontSize: "0.9rem",
								marginTop: "10px"
							},
							children: "Ce produit est actuellement en rupture de stock."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(PreorderModal, {
				show: showPreorder,
				onClose: () => setShowPreorder(false),
				product,
				quantity: parseInt(quantity) || 1
			})
		]
	});
}
//#endregion
export { Show as default };
