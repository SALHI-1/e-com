import { n as useAurelia, t as ClientLayout } from "./ClientLayout-C7YwqqfL.js";
import { t as ApplicationLogo } from "./ApplicationLogo-C6sWqI6d.js";
import { t as ImageWithLoader } from "./ImageWithLoader-C9lsqNz9.js";
import { t as ProductImagePlaceholder } from "./ProductImagePlaceholder-Cn-w4Vxs.js";
import { t as PreorderModal } from "./PreorderModal-6brq-_rI.js";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region resources/js/Pages/Welcome.tsx
function OureliaToast({ message, type = "success", onClose }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3e3);
		return () => clearTimeout(timer);
	}, [onClose]);
	const isError = type === "error";
	return /* @__PURE__ */ jsxs("div", {
		className: "au-toast",
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
/** Scroll fluide vers un élément par son id */
function smoothScrollTo(id) {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
/** Infer a packaging shape from a product when the DB doesn't carry one. */
function resolveShape(product) {
	const explicit = (product?.shape || "").toString().toLowerCase();
	if ([
		"bottle",
		"pump",
		"tube",
		"jar",
		"flacon",
		"pouch"
	].includes(explicit)) return explicit;
	const name = (product?.name || "").toString().toLowerCase();
	const cat = (product?.category?.name || "").toString().toLowerCase();
	if (/(masque|mascarilla|mask|baume|crème pot|jar)/.test(name)) return "jar";
	if (/(sérum|serum|gel|leave|sans rinçage|sin aclarado|pump)/.test(name)) return "pump";
	if (/(dentifrice|dentífrico|toothpaste|exfoliant|exfoliante|crème solaire|solar|sunscreen|tube)/.test(name)) return "tube";
	if (/(parfum|perfume|eau de|fragrance|flacon)/.test(name)) return "flacon";
	if (/(lingette|toallita|wipe|sachet|pouch)/.test(name)) return "pouch";
	if (cat === "perfumes") return "flacon";
	if (cat === "body & bath" || cat === "makeup") return "tube";
	if (cat === "face care") return "pump";
	return "bottle";
}
function ProductCard({ product, onError }) {
	const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
	const copy = t.home;
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [showPreorder, setShowPreorder] = useState(false);
	const addToCart = () => {
		setLoading(true);
		router.post(route("cart.add"), {
			product_id: product.id,
			quantity
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
	resolveShape(product);
	return /* @__PURE__ */ jsxs("div", {
		className: `au-prod-card ${isOut ? "is-out-of-stock" : ""}`,
		style: isOut ? { opacity: .8 } : {},
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-media",
				style: {
					background: categoryTint(product.category.name),
					position: "relative"
				},
				children: [tag && /* @__PURE__ */ jsx("div", {
					className: "au-prod-tag",
					style: tag === "out" ? {
						background: "var(--au-dark)",
						color: "var(--au-bg)",
						zIndex: 20
					} : { zIndex: 20 },
					children: tag === "out" ? copy.soldOut : tagLabel(tag)
				}), /* @__PURE__ */ jsx(Link, {
					href: route("product.show", product.id),
					style: {
						display: "block",
						height: "100%",
						filter: isOut ? "grayscale(100%)" : "none",
						opacity: isOut ? .6 : 1
					},
					children: product.image_url ? /* @__PURE__ */ jsx(ImageWithLoader, {
						src: product.image_url,
						alt: `Soin Ourélia - ${product.name}`,
						style: { mixBlendMode: "multiply" },
						fallback: /* @__PURE__ */ jsx(ProductImagePlaceholder, {
							category: product.category.name,
							productName: product.name,
							size: "md"
						})
					}) : /* @__PURE__ */ jsx(ProductImagePlaceholder, {
						category: product.category.name,
						productName: product.name,
						size: "md"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-info",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "au-prod-cat",
						children: categoryLabel(product.category.name)
					}),
					/* @__PURE__ */ jsx(Link, {
						href: route("product.show", product.id),
						className: "au-prod-name",
						style: {
							textDecoration: "none",
							color: "inherit",
							display: "block",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis"
						},
						children: product.name
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-prod-note",
						style: {
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							textOverflow: "ellipsis",
							height: "2.8em"
						},
						children: product.description || copy.essentialCare
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-footer",
				style: { pointerEvents: isOut && !isPreorderable ? "none" : "auto" },
				children: [/* @__PURE__ */ jsxs("div", {
					className: "au-prod-price-group",
					children: [product.price_old && /* @__PURE__ */ jsxs("span", {
						className: "au-prod-price-old",
						children: [Number(product.price_old).toFixed(2), " dh"]
					}), /* @__PURE__ */ jsxs("span", {
						className: `au-prod-price${isSale && !isOut ? " au-prod-price--sale" : ""}`,
						children: [Number(product.price).toFixed(2), " dh"]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "au-qty-add",
					onClick: (e) => {
						if (isOut && !isPreorderable) e.preventDefault();
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "au-qty-stepper",
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "au-qty-step-btn",
								onClick: () => setQuantity(Math.max(1, quantity - 1)),
								disabled: isOut && !isPreorderable || quantity <= 1,
								"aria-label": "Diminuer la quantité",
								children: "−"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								inputMode: "numeric",
								pattern: "[0-9]*",
								value: quantity,
								onChange: (e) => {
									const clean = e.target.value.replace(/[^0-9]/g, "");
									if (!clean) {
										setQuantity(1);
										return;
									}
									const val = parseInt(clean, 10);
									if (!isPreorderable && val > product.stock) {
										if (onError) onError(t.common.stockInsufficient);
										setQuantity(product.stock);
									} else setQuantity(Math.max(1, val));
								},
								className: "au-qty-input",
								"aria-label": "Quantity",
								disabled: isOut && !isPreorderable
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "au-qty-step-btn",
								onClick: () => {
									if (!isPreorderable && quantity >= product.stock) {
										if (onError) onError(t.common.stockInsufficient);
									} else setQuantity(quantity + 1);
								},
								disabled: isOut && !isPreorderable,
								"aria-label": "Augmenter la quantité",
								children: "+"
							})
						]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "au-add-btn",
						onClick: isPreorderable ? () => setShowPreorder(true) : addToCart,
						disabled: loading || isOut && !isPreorderable,
						children: loading ? "…" : isPreorderable ? t.common.preorder : isOut ? copy.soldOut : t.add
					})]
				})]
			}),
			/* @__PURE__ */ jsx(PreorderModal, {
				show: showPreorder,
				onClose: () => setShowPreorder(false),
				product,
				quantity
			})
		]
	});
}
function Welcome(props) {
	const categoriesList = Array.from(new Set((props.products || []).map((p) => p.category.name)));
	return /* @__PURE__ */ jsx(ClientLayout, {
		auth: props.auth,
		cartCount: props.cartCount,
		title: "Ourélia",
		categories: categoriesList,
		children: /* @__PURE__ */ jsx(WelcomeContent, { ...props })
	});
}
function WelcomeContent({ products = [], flash, errors }) {
	const { url } = usePage();
	const [activeCategory, setActiveCategory] = useState(null);
	const [activeBrand, setActiveBrand] = useState(null);
	const [toast, setToast] = useState(null);
	const [visibleCount, setVisibleCount] = useState(10);
	const [loadingMore, setLoadingMore] = useState(false);
	const handleLoadMore = () => {
		setLoadingMore(true);
		setTimeout(() => {
			setVisibleCount((v) => v + 10);
			setLoadingMore(false);
		}, 600);
	};
	useEffect(() => {
		setVisibleCount(10);
	}, [activeCategory, activeBrand]);
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
	useEffect(() => {
		if (typeof window !== "undefined") {
			const cat = new URL(url, window.location.origin).searchParams.get("category");
			if (cat) {
				setActiveCategory(cat);
				setTimeout(() => {
					const el = document.getElementById("collection");
					if (el) el.scrollIntoView({ behavior: "smooth" });
				}, 100);
			} else setActiveCategory(null);
		}
	}, [url]);
	products.filter((p) => p.is_bestseller).slice(0, 8).length > 0 || products.slice(0, 8);
	const spreadProducts = products.slice(0, 3);
	const heroProduct = products.length > 0 ? products[0] : null;
	const brandsList = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
	const categoriesList = Array.from(new Set(products.filter((p) => activeBrand ? p.brand === activeBrand : true).map((p) => p.category.name)));
	const { t, categoryLabel, categoryTint, tagLabel } = useAurelia();
	const copy = t.home;
	heroProduct && resolveShape(heroProduct);
	heroProduct?.category?.name;
	const filteredProducts = products.filter((p) => activeCategory ? p.category.name === activeCategory : true).filter((p) => activeBrand ? p.brand === activeBrand : true);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Head, { children: [
			/* @__PURE__ */ jsx("title", { children: activeCategory ? `${categoryLabel(activeCategory)} · Ourélia (Ourelia)` : "Ourélia | Ourelia Beauty" }),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "description",
				name: "description",
				content: activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia (Ourelia).` : `Ourélia (Ourelia Beauty) : ${copy.heroSub}`
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "keywords",
				name: "keywords",
				content: activeCategory ? `${categoryLabel(activeCategory).toLowerCase()}, soins, beauté, Ourélia, Ourelia, cosmétiques` : "Ourelia, Ourélia, Ourelia Beauty, Ourélia Beauty, Ourelia maquillage, Ourélia maquillage, soins, beauté, cosmétiques, parfums, argan"
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "og:title",
				property: "og:title",
				content: activeCategory ? `${categoryLabel(activeCategory)} · Ourélia (Ourelia)` : "Ourélia | Ourelia Beauty"
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "og:description",
				property: "og:description",
				content: activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia (Ourelia).` : `Ourélia (Ourelia Beauty) : ${copy.heroSub}`
			}),
			/* @__PURE__ */ jsx("link", {
				"head-key": "canonical",
				rel: "canonical",
				href: route("home")
			})
		] }),
		toast && /* @__PURE__ */ jsx(OureliaToast, {
			message: toast.message,
			type: toast.type,
			onClose: () => setToast(null)
		}),
		/* @__PURE__ */ jsx("div", {
			className: "au-container au-hero",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-hero-grid",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "au-eyebrow",
						children: [/* @__PURE__ */ jsx("span", { className: "au-eyebrow-line" }), /* @__PURE__ */ jsx("span", {
							className: "au-eyebrow-label",
							children: copy.heroKicker
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "au-h1",
						children: copy.heroTitle
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-h1-italic",
						children: copy.heroItalic
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-lead",
						children: copy.heroSub
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "au-cta-row",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "au-btn",
							onClick: () => smoothScrollTo("collection"),
							children: copy.heroCta
						}), /* @__PURE__ */ jsx(Link, {
							href: "/about",
							className: "au-link-underline",
							children: copy.heroLink
						})]
					})
				] }), /* @__PURE__ */ jsx("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						minHeight: "400px"
					},
					children: /* @__PURE__ */ jsx(ApplicationLogo, { style: {
						width: "80%",
						maxWidth: "400px",
						height: "auto",
						objectFit: "contain"
					} })
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "au-manifesto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-manifesto-inner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "au-kicker",
						children: copy.manifestoKicker
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-quote",
						children: copy.manifestoText
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-quote-sign",
						children: "— Ourélia"
					})
				]
			})
		}),
		spreadProducts.length > 0 && /* @__PURE__ */ jsxs("div", {
			className: "au-container au-spreads",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "au-spreads-head",
				children: [/* @__PURE__ */ jsx("div", {
					className: "au-section-eyebrow",
					children: copy.spreadKicker
				}), /* @__PURE__ */ jsx("h2", {
					className: "au-section-title",
					children: copy.spreadTitle
				})]
			}), spreadProducts.map((product, i) => {
				const spread = copy.spreads[i] || copy.spreads[0];
				resolveShape(product);
				return /* @__PURE__ */ jsxs("div", {
					className: "au-spread-row",
					style: { flexDirection: i % 2 === 1 ? "row-reverse" : "row" },
					children: [/* @__PURE__ */ jsxs(Link, {
						href: route("product.show", product.id),
						className: "au-spread-media",
						style: {
							background: categoryTint(product.category.name),
							display: "flex",
							textDecoration: "none",
							color: "inherit"
						},
						children: [product.is_bestseller && /* @__PURE__ */ jsx("div", {
							className: "au-tag-pill",
							children: tagLabel("best")
						}), product.image_url ? /* @__PURE__ */ jsx(ImageWithLoader, {
							src: product.image_url,
							alt: `Soin Ourélia - ${product.name}`,
							style: { mixBlendMode: "multiply" },
							fallback: /* @__PURE__ */ jsx(ProductImagePlaceholder, {
								category: product.category.name,
								productName: product.name,
								size: "lg"
							})
						}) : /* @__PURE__ */ jsx(ProductImagePlaceholder, {
							category: product.category.name,
							productName: product.name,
							size: "lg"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-spread-body",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "au-spread-num",
								children: spread.num
							}),
							/* @__PURE__ */ jsx("div", {
								className: "au-eyebrow-sm",
								children: categoryLabel(product.category.name)
							}),
							/* @__PURE__ */ jsx(Link, {
								href: route("product.show", product.id),
								style: {
									textDecoration: "none",
									color: "inherit",
									display: "inline-block"
								},
								children: /* @__PURE__ */ jsx("h3", {
									className: "au-h3",
									children: product.name
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "au-body-text",
								children: product.description || spread.story
							}),
							/* @__PURE__ */ jsx("div", {
								className: "au-tags",
								children: spread.tags.map((tag) => /* @__PURE__ */ jsx("span", {
									className: "au-tag",
									children: tag
								}, tag))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-price-row",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "au-price-lg",
									children: [Number(product.price).toFixed(2), " dh"]
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "au-btn-sm",
									onClick: () => router.post(route("cart.add"), {
										product_id: product.id,
										quantity: 1
									}, { preserveScroll: true }),
									children: t.addCart
								})]
							})
						]
					})]
				}, product.id);
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "au-container au-categories",
			children: [/* @__PURE__ */ jsx("div", {
				className: "au-section-head",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "au-section-eyebrow",
					children: copy.catTitle
				}), /* @__PURE__ */ jsx("h2", {
					className: "au-section-title",
					children: copy.catSub
				})] })
			}), /* @__PURE__ */ jsx("div", {
				className: "au-cat-grid",
				children: categoriesList.map((cat, i) => {
					products.filter((p) => p.category.name === cat && (activeBrand ? p.brand === activeBrand : true)).length;
					return /* @__PURE__ */ jsx("a", {
						href: "#collection",
						onClick: (e) => {
							e.preventDefault();
							setActiveCategory(activeCategory === cat ? null : cat);
							setTimeout(() => smoothScrollTo("collection"), 60);
						},
						className: "au-cat-card",
						style: {
							background: categoryTint(cat),
							border: activeCategory === cat ? "2px solid var(--au-gold)" : "2px solid transparent"
						},
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "au-cat-label",
							children: categoryLabel(cat)
						}), /* @__PURE__ */ jsxs("div", {
							className: "au-cat-discover",
							children: [t.discover, /* @__PURE__ */ jsx("span", {
								style: { fontSize: 13 },
								children: "→"
							})]
						})] })
					}, cat);
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "au-container au-bestsellers",
			id: "collection",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "au-section-head au-section-head--lg",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "au-section-eyebrow",
						children: copy.bestTitle
					}), /* @__PURE__ */ jsx("h2", {
						className: "au-section-title",
						children: copy.bestSub
					})] }), /* @__PURE__ */ jsxs("div", {
						style: {
							display: "flex",
							gap: "16px",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "flex-end"
						},
						children: [brandsList.length > 0 && /* @__PURE__ */ jsxs("select", {
							value: activeBrand || "",
							onChange: (e) => setActiveBrand(e.target.value || null),
							style: {
								padding: "6px 12px",
								fontSize: "14px",
								borderRadius: "4px",
								border: "1px solid var(--au-border)",
								background: "transparent",
								fontFamily: "var(--au-font-sans)",
								outline: "none"
							},
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: copy.allBrands
							}), brandsList.map((b) => /* @__PURE__ */ jsx("option", {
								value: b,
								children: b
							}, b))]
						}), /* @__PURE__ */ jsx("span", {
							className: "au-link-underline cursor-pointer",
							onClick: () => {
								setActiveCategory(null);
								setActiveBrand(null);
							},
							children: activeCategory || activeBrand ? copy.viewAllWithCount(filteredProducts.length) : copy.productsCount(products.length)
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "au-prod-grid",
					children: filteredProducts.slice(0, visibleCount).map((product) => /* @__PURE__ */ jsx(ProductCard, {
						product,
						onError: (msg) => setToast({
							message: msg,
							type: "info"
						})
					}, product.id))
				}),
				filteredProducts.length > visibleCount && /* @__PURE__ */ jsx("div", {
					style: {
						display: "flex",
						justifyContent: "center",
						marginTop: "48px",
						minHeight: "40px"
					},
					children: loadingMore ? /* @__PURE__ */ jsxs("div", {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "12px"
						},
						children: [/* @__PURE__ */ jsx("div", {
							className: "animate-spin",
							style: {
								width: "24px",
								height: "24px",
								borderRadius: "50%",
								border: "2px dotted var(--au-gold)",
								borderTopColor: "transparent"
							}
						}), /* @__PURE__ */ jsx("span", {
							style: {
								fontSize: "12px",
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								color: "var(--au-gold)"
							},
							children: copy.loading
						})]
					}) : /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "au-btn-ghost",
						onClick: handleLoadMore,
						children: copy.loadMore
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "au-dark-band",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-container au-dark-inner",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "au-dark-head",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "au-dark-kicker",
								children: copy.darkKicker
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "au-dark-title",
								children: [
									copy.darkTitle,
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "au-dark-title-italic",
										children: copy.darkTitleIt
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "au-dark-text",
								children: copy.darkText
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "au-values-grid",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "au-value",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "au-value-num",
										children: "01"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "au-value-title",
										children: copy.v1t
									}),
									/* @__PURE__ */ jsx("p", {
										className: "au-value-text",
										children: copy.v1d
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-value",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "au-value-num",
										children: "02"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "au-value-title",
										children: copy.v2t
									}),
									/* @__PURE__ */ jsx("p", {
										className: "au-value-text",
										children: copy.v2d
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-value",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "au-value-num",
										children: "03"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "au-value-title",
										children: copy.v3t
									}),
									/* @__PURE__ */ jsx("p", {
										className: "au-value-text",
										children: copy.v3d
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-dark-cta-wrap",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/about",
							className: "au-btn-outline-dark",
							children: copy.darkCta
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Welcome as default };
