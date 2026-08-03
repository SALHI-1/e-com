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
function StarRating({ rating, size = 16, color = "var(--au-gold, #C2A063)" }) {
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "flex",
			gap: "2px",
			alignItems: "center"
		},
		children: [
			1,
			2,
			3,
			4,
			5
		].map((star) => /* @__PURE__ */ jsx("svg", {
			width: size,
			height: size,
			viewBox: "0 0 24 24",
			fill: star <= rating ? color : "none",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			style: { cursor: "inherit" },
			children: /* @__PURE__ */ jsx("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
		}, star))
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
function ProductDetail({ product, flash, errors, auth }) {
	const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(null);
	const [showPreorder, setShowPreorder] = useState(false);
	const userReview = product.reviews?.find((r) => r.user_id === auth.user?.id);
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
				/* @__PURE__ */ jsx("link", {
					"head-key": "canonical",
					rel: "canonical",
					href: route("product.show", product.id)
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
						alt: `Soin Ourélia - ${product.name}`,
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
							style: { marginBottom: "8px" },
							children: product.name
						}),
						/* @__PURE__ */ jsxs("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "8px",
								marginBottom: "16px"
							},
							children: [/* @__PURE__ */ jsx(StarRating, { rating: Math.round(product.reviews_avg_rating || 0) }), /* @__PURE__ */ jsxs("span", {
								style: {
									fontSize: "13px",
									color: "var(--au-text-muted)"
								},
								children: [product.reviews_count || 0, " avis"]
							})]
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
			/* @__PURE__ */ jsxs("div", {
				style: {
					marginTop: "80px",
					borderTop: "1px solid var(--au-border)",
					paddingTop: "40px"
				},
				children: [/* @__PURE__ */ jsx("h2", {
					className: "au-h4",
					style: { marginBottom: "24px" },
					children: "Avis clients"
				}), /* @__PURE__ */ jsxs("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "40px"
					},
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						style: {
							fontSize: "16px",
							marginBottom: "16px",
							fontFamily: "var(--au-font-serif)"
						},
						children: "Laisser un avis"
					}), auth.user ? userReview ? /* @__PURE__ */ jsxs("div", {
						style: {
							padding: "24px",
							background: "var(--au-bg-alt, #efe9db)",
							borderRadius: "8px",
							textAlign: "center"
						},
						children: [/* @__PURE__ */ jsx("p", {
							style: {
								fontSize: "14px",
								color: "var(--au-text-muted)",
								marginBottom: "12px"
							},
							children: "Vous avez déjà évalué ce produit :"
						}), /* @__PURE__ */ jsx("div", {
							style: {
								display: "flex",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ jsx(StarRating, {
								rating: userReview.rating,
								size: 20
							})
						})]
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const form = e.target;
							const data = new FormData(form);
							router.post(route("reviews.store", product.id), Object.fromEntries(data.entries()), {
								preserveScroll: true,
								onSuccess: () => {
									setToast({
										message: "Votre avis a été enregistré avec succès.",
										type: "success"
									});
									form.reset();
								},
								onError: (err) => {
									setToast({
										message: Object.values(err)[0],
										type: "error"
									});
								}
							});
						},
						children: [/* @__PURE__ */ jsxs("div", {
							style: { marginBottom: "16px" },
							children: [/* @__PURE__ */ jsx("label", {
								style: {
									display: "block",
									fontSize: "13px",
									marginBottom: "8px",
									color: "var(--au-text-muted)"
								},
								children: "Note"
							}), /* @__PURE__ */ jsx("div", {
								style: {
									display: "flex",
									gap: "4px"
								},
								children: [
									1,
									2,
									3,
									4,
									5
								].map((star) => /* @__PURE__ */ jsxs("label", {
									style: { cursor: "pointer" },
									children: [/* @__PURE__ */ jsx("input", {
										type: "radio",
										name: "rating",
										value: star,
										required: true,
										style: { display: "none" },
										onChange: (e) => {
											(e.target.parentElement?.parentElement?.querySelectorAll("svg"))?.forEach((s, i) => {
												s.style.fill = i < star ? "var(--au-gold, #C2A063)" : "none";
											});
										}
									}), /* @__PURE__ */ jsx("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "var(--au-gold, #C2A063)",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: /* @__PURE__ */ jsx("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
									})]
								}, star))
							})]
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "au-btn",
							style: { padding: "12px 24px" },
							children: "Publier mon avis"
						})]
					}) : /* @__PURE__ */ jsxs("div", {
						style: {
							padding: "24px",
							background: "var(--au-bg-alt, #efe9db)",
							borderRadius: "8px",
							textAlign: "center"
						},
						children: [/* @__PURE__ */ jsx("p", {
							style: {
								fontSize: "14px",
								color: "var(--au-text-muted)",
								marginBottom: "16px"
							},
							children: "Vous devez être connecté pour laisser un avis."
						}), /* @__PURE__ */ jsx(Link, {
							href: route("login"),
							className: "au-btn-outline",
							style: {
								display: "inline-block",
								padding: "10px 20px"
							},
							children: "Se connecter"
						})]
					})] }), /* @__PURE__ */ jsx("div", { children: product.reviews && product.reviews.length > 0 ? /* @__PURE__ */ jsx("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "24px"
						},
						children: product.reviews.map((review) => /* @__PURE__ */ jsxs("div", {
							style: {
								borderBottom: "1px solid var(--au-border)",
								paddingBottom: "24px"
							},
							children: [/* @__PURE__ */ jsxs("div", {
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									marginBottom: "8px"
								},
								children: [/* @__PURE__ */ jsx("span", {
									style: {
										fontWeight: 500,
										fontSize: "14px"
									},
									children: review.user.name
								}), /* @__PURE__ */ jsx("span", {
									style: {
										fontSize: "12px",
										color: "var(--au-text-muted)"
									},
									children: new Date(review.created_at).toLocaleDateString("fr-FR")
								})]
							}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(StarRating, {
								rating: review.rating,
								size: 14
							}) })]
						}, review.id))
					}) : /* @__PURE__ */ jsx("p", {
						style: {
							fontSize: "14px",
							color: "var(--au-text-muted)",
							fontStyle: "italic"
						},
						children: "Aucun avis pour le moment. Soyez le premier à donner votre avis !"
					}) })]
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
