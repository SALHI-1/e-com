import { n as useAurelia, t as ClientLayout } from "./ClientLayout-LgnMEJmu.js";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region resources/js/Pages/Welcome.tsx
var HOME_COPY = {
	fr: {
		heroKicker: "Soins essentiels · chaque jour",
		heroTitle: "Beauté honnête",
		heroItalic: "pour votre routine",
		heroSub: "Des formules simples et efficaces pour les cheveux, le visage et la peau. L'essentiel, sans excès.",
		heroCta: "Voir la collection",
		heroLink: "Notre histoire",
		heroPanelCap: "oro líquido",
		heroPanelTag: "Huile d'argan",
		manifestoKicker: "La maison",
		manifestoText: "Les bons soins n'ont pas besoin d'être compliqués ou chers. Nous sélectionnons des formules efficaces, avec des ingrédients que vous reconnaissez, et les présentons sans bruit — car la beauté honnête commence par l'essentiel.",
		spreadKicker: "Icônes Ourélia",
		spreadTitle: "Les signatures",
		catTitle: "Acheter par catégorie",
		catSub: "Tout ce dont votre routine a besoin",
		bestTitle: "Les favoris",
		bestSub: "Ce que nos clientes choisissent le plus",
		viewAll: "Tout voir",
		productsWord: "Produits",
		darkKicker: "Notre philosophie",
		darkTitle: "Moins de produits.",
		darkTitleIt: "De meilleures formules.",
		darkText: "Nous croyons aux soins essentiels : des ingrédients qui fonctionnent, des emballages honnêtes et des prix justes. Sans promesses impossibles.",
		darkCta: "Découvrez-nous",
		v1t: "Ingrédients reconnaissables",
		v1d: "Huile d'argan, argile blanche, camomille. Des actifs que vous savez lire.",
		v2t: "Prix honnête",
		v2d: "Une cosmétique de qualité qui prend soin de votre peau et de votre porte-monnaie.",
		v3t: "Pour chaque jour",
		v3d: "Des routines simples qui s'adaptent à votre rythme, pas l'inverse.",
		soldOut: "Épuisé",
		essentialCare: "Soin essentiel"
	},
	es: {
		heroKicker: "Cuidado esencial · cada día",
		heroTitle: "Belleza honesta",
		heroItalic: "para tu rutina diaria",
		heroSub: "Fórmulas sencillas y eficaces para el cabello, el rostro y la piel. Lo esencial, sin excesos.",
		heroCta: "Ver la colección",
		heroLink: "Nuestra historia",
		heroPanelCap: "oro líquido",
		heroPanelTag: "Aceite de argán",
		manifestoKicker: "La maison",
		manifestoText: "El buen cuidado no necesita ser complicado ni caro. Seleccionamos fórmulas eficaces, con ingredientes que reconoces, y las presentamos sin ruido — porque la belleza honesta empieza por lo esencial.",
		spreadKicker: "Iconos Ourélia",
		spreadTitle: "Las firmas",
		catTitle: "Compra por categoría",
		catSub: "Todo lo que tu rutina necesita",
		bestTitle: "Los favoritos",
		bestSub: "Lo que más repiten nuestras clientas",
		viewAll: "Ver todo",
		productsWord: "Productos",
		darkKicker: "Nuestra filosofía",
		darkTitle: "Menos productos.",
		darkTitleIt: "Mejores fórmulas.",
		darkText: "Creemos en el cuidado esencial: ingredientes que funcionan, envases honestos y precios justos. Sin promesas imposibles.",
		darkCta: "Conócenos",
		v1t: "Ingredientes reconocibles",
		v1d: "Aceite de argán, arcilla blanca, camomila. Activos que sabes leer.",
		v2t: "Precio honesto",
		v2d: "Cosmética de calidad que cuida tu piel y tu bolsillo.",
		v3t: "Para cada día",
		v3d: "Rutinas sencillas que se adaptan a tu ritmo, no al revés.",
		soldOut: "Agotado",
		essentialCare: "Cuidado esencial"
	},
	en: {
		heroKicker: "Essential care · every day",
		heroTitle: "Honest beauty",
		heroItalic: "for your daily ritual",
		heroSub: "Simple, effective formulas for hair, face and skin. The essentials, nothing more.",
		heroCta: "Shop the collection",
		heroLink: "Our story",
		heroPanelCap: "oro líquido",
		heroPanelTag: "Argan oil",
		manifestoKicker: "The maison",
		manifestoText: "Good care doesn’t need to be complicated or expensive. We choose effective formulas, with ingredients you recognise, and present them without the noise — because honest beauty starts with the essentials.",
		spreadKicker: "Ourélia icons",
		spreadTitle: "The signatures",
		catTitle: "Shop by category",
		catSub: "Everything your routine needs",
		bestTitle: "The favourites",
		bestSub: "What our customers reach for again",
		viewAll: "View all",
		productsWord: "Products",
		darkKicker: "Our philosophy",
		darkTitle: "Fewer products.",
		darkTitleIt: "Better formulas.",
		darkText: "We believe in essential care: ingredients that work, honest packaging and fair prices. No impossible promises.",
		darkCta: "About us",
		v1t: "Ingredients you know",
		v1d: "Argan oil, white clay, camomile. Actives you can actually read.",
		v2t: "Honest pricing",
		v2d: "Quality skincare that looks after your skin and your wallet.",
		v3t: "For every day",
		v3d: "Simple routines that fit your rhythm, not the other way round.",
		soldOut: "Sold out",
		essentialCare: "Essential care"
	}
};
var SPREADS = [
	{
		num: "01",
		claim: {
			fr: "Or liquide pour vos cheveux",
			es: "Oro líquido para tu cabello",
			en: "Liquid gold for your hair"
		},
		story: {
			fr: "Une formule pure qui nourrit en profondeur, redonnant force et brillance naturelle dès la première utilisation.",
			es: "Fórmula pura que nutre en profundidad, devolviéndole fuerza y un brillo natural desde el primer uso.",
			en: "Pure formula that deeply nourishes, restoring strength and a natural shine from the very first use."
		},
		tags: {
			fr: [
				"Soin intense",
				"Sans silicones",
				"Brillance"
			],
			es: [
				"Cuidado intenso",
				"Sin siliconas",
				"Brillo"
			],
			en: [
				"Intense care",
				"Silicone-free",
				"Shine"
			]
		}
	},
	{
		num: "02",
		claim: {
			fr: "Dix gestes en un",
			es: "Diez gestos en uno",
			en: "Ten rituals in one"
		},
		story: {
			fr: "Un soin léger qui illumine, contrôle les frisottis et apporte de la brillance sans alourdir. L'étape finale qui transforme tout.",
			es: "Un cuidado ligero que ilumina, controla el frizz y aporta brillo sin apelmazar. El paso final que lo transforma todo.",
			en: "A weightless care that brightens, tames frizz and adds shine without weighing down. The final step that transforms everything."
		},
		tags: {
			fr: [
				"10 en 1",
				"Anti-frisottis",
				"Protection"
			],
			es: [
				"10 en 1",
				"Anti-frizz",
				"Protección"
			],
			en: [
				"10-in-1",
				"Anti-frizz",
				"Protection"
			]
		}
	},
	{
		num: "03",
		claim: {
			fr: "Votre signature quotidienne",
			es: "Tu firma, cada día",
			en: "Your signature, every day"
		},
		story: {
			fr: "Une note fraîche et lumineuse, pensée pour vous accompagner du matin au soir. Votre geste de beauté le plus personnel.",
			es: "Una nota fresca y luminosa, pensada para acompañarte de la mañana a la noche. Tu gesto de belleza más personal.",
			en: "A fresh, luminous note made to carry you from morning to night. Your most personal beauty gesture."
		},
		tags: {
			fr: [
				"Frais",
				"Essentiel",
				"Durable"
			],
			es: [
				"Fresco",
				"Esencial",
				"Duradero"
			],
			en: [
				"Fresh",
				"Essential",
				"Lasting"
			]
		}
	}
];
var ICON_INK = "#241C13";
var ICON_GOLD = "#C2A063";
var ICON_PORCELAIN = "#F6F0E4";
var ICON_PORCELAIN_EDGE = "#E6DCC8";
var ICON_LIQUID = {
	cabello: "#D9B888",
	rostro: "#C9CBB0",
	solar: "#EBCB78",
	perfume: "#D7B4AC",
	bucal: "#BCD0C0",
	default: "#D9B888"
};
var ICON_BAND = {
	cabello: "#F0E4D0",
	rostro: "#ECEDDE",
	solar: "#F6EAC9",
	perfume: "#F0E1DC",
	bucal: "#E5EEE7",
	default: "#F0E4D0"
};
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
	if (cat === "perfume") return "flacon";
	if (cat === "bucal" || cat === "solar") return "tube";
	if (cat === "rostro") return "pump";
	return "bottle";
}
function ProductIcon({ shape, cat, catLabel, scale = 1 }) {
	const s = (n) => Math.round(n * scale);
	const liquid = ICON_LIQUID[cat.toLowerCase()] || ICON_LIQUID.default;
	const band = ICON_BAND[cat.toLowerCase()] || ICON_BAND.default;
	const wrapStyle = (w, h) => ({
		position: "relative",
		width: s(w),
		height: s(h),
		filter: `drop-shadow(0 ${s(10)}px ${s(26)}px rgba(33,26,20,0.13))`
	});
	const Label = ({ w, h, radius, style }) => /* @__PURE__ */ jsxs("div", {
		style: {
			position: "absolute",
			background: band,
			overflow: "hidden",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: s(3),
			borderRadius: radius ?? s(2),
			width: s(w),
			height: s(h),
			boxShadow: "inset 0 0 0 1px rgba(33,26,20,0.05)",
			...style
		},
		children: [
			/* @__PURE__ */ jsx("span", {
				style: {
					fontFamily: "'Cormorant Garamond',serif",
					fontWeight: 600,
					fontSize: s(8.5),
					letterSpacing: "0.2em",
					color: ICON_INK,
					lineHeight: 1,
					paddingLeft: "0.2em"
				},
				children: "Ourélia"
			}),
			/* @__PURE__ */ jsx("span", { style: {
				width: s(18),
				height: 1,
				background: ICON_GOLD
			} }),
			/* @__PURE__ */ jsx("span", {
				style: {
					fontFamily: "'Jost',sans-serif",
					fontWeight: 500,
					fontSize: s(5.5),
					letterSpacing: "0.18em",
					textTransform: "uppercase",
					color: "#9A8460",
					lineHeight: 1
				},
				children: catLabel
			})
		]
	});
	if (shape === "pump") return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(58, 170),
		children: [
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: 0,
				left: "24%",
				width: s(28),
				height: s(10),
				background: ICON_INK,
				borderRadius: s(4)
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(9),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(8),
				height: s(18),
				background: ICON_INK
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(25),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(20),
				height: s(8),
				background: ICON_INK,
				borderRadius: s(2)
			} }),
			/* @__PURE__ */ jsx("div", {
				style: {
					position: "absolute",
					top: s(32),
					left: 0,
					width: s(58),
					height: s(138),
					background: ICON_PORCELAIN,
					borderRadius: `${s(12)}px ${s(12)}px ${s(13)}px ${s(13)}px`,
					boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
				},
				children: /* @__PURE__ */ jsx("div", { style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: s(30),
					background: liquid,
					opacity: .45,
					borderRadius: `0 0 ${s(12)}px ${s(12)}px`
				} })
			}),
			/* @__PURE__ */ jsx(Label, {
				w: 44,
				h: 52,
				style: {
					top: s(66),
					left: "50%",
					transform: "translateX(-50%)"
				}
			})
		]
	});
	if (shape === "tube") return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(54, 162),
		children: [
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: 0,
				left: 0,
				width: s(54),
				height: s(140),
				background: ICON_PORCELAIN,
				borderRadius: `${s(7)}px ${s(7)}px ${s(26)}px ${s(26)}px`,
				boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(34),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(40),
				height: s(3),
				background: ICON_GOLD
			} }),
			/* @__PURE__ */ jsx(Label, {
				w: 40,
				h: 56,
				style: {
					top: s(46),
					left: "50%",
					transform: "translateX(-50%)"
				}
			}),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				bottom: 0,
				left: "50%",
				transform: "translateX(-50%)",
				width: s(54),
				height: s(22),
				background: ICON_INK,
				borderRadius: `0 0 ${s(6)}px ${s(6)}px`
			} })
		]
	});
	if (shape === "jar") return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(128, 104),
		children: [
			/* @__PURE__ */ jsx("div", {
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: s(128),
					height: s(34),
					background: ICON_INK,
					borderRadius: `${s(14)}px ${s(14)}px 0 0`
				},
				children: /* @__PURE__ */ jsx("div", { style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: s(3),
					background: ICON_GOLD
				} })
			}),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(30),
				left: 0,
				width: s(128),
				height: s(74),
				background: ICON_PORCELAIN,
				borderRadius: `0 0 ${s(18)}px ${s(18)}px`,
				boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
			} }),
			/* @__PURE__ */ jsx(Label, {
				w: 78,
				h: 46,
				style: {
					top: s(46),
					left: "50%",
					transform: "translateX(-50%)"
				}
			})
		]
	});
	if (shape === "flacon") return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(104, 130),
		children: [
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: 0,
				left: "50%",
				transform: "translateX(-50%)",
				width: s(28),
				height: s(16),
				background: ICON_INK,
				borderRadius: s(3)
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(14),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(20),
				height: s(9),
				background: ICON_GOLD
			} }),
			/* @__PURE__ */ jsx("div", {
				style: {
					position: "absolute",
					top: s(22),
					left: 0,
					width: s(104),
					height: s(108),
					background: ICON_PORCELAIN,
					borderRadius: s(20),
					boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
				},
				children: /* @__PURE__ */ jsx("div", { style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: s(58),
					background: liquid,
					opacity: .42,
					borderRadius: `0 0 ${s(20)}px ${s(20)}px`
				} })
			}),
			/* @__PURE__ */ jsx(Label, {
				w: 60,
				h: 48,
				radius: s(3),
				style: {
					top: s(50),
					left: "50%",
					transform: "translateX(-50%)"
				}
			})
		]
	});
	if (shape === "pouch") return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(134, 96),
		children: [
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: 0,
				left: 0,
				width: s(134),
				height: s(96),
				background: ICON_PORCELAIN,
				borderRadius: s(16),
				boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: s(12),
				background: ICON_INK,
				borderRadius: `${s(16)}px ${s(16)}px 0 0`
			} }),
			/* @__PURE__ */ jsx(Label, {
				w: 72,
				h: 50,
				style: {
					top: "52%",
					left: "50%",
					transform: "translate(-50%,-50%)"
				}
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		style: wrapStyle(60, 156),
		children: [
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(2),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(30),
				height: s(20),
				background: ICON_INK,
				borderRadius: `${s(5)}px ${s(5)}px 0 0`
			} }),
			/* @__PURE__ */ jsx("div", { style: {
				position: "absolute",
				top: s(20),
				left: "50%",
				transform: "translateX(-50%)",
				width: s(34),
				height: s(4),
				background: ICON_GOLD
			} }),
			/* @__PURE__ */ jsx("div", {
				style: {
					position: "absolute",
					top: s(22),
					left: 0,
					width: s(60),
					height: s(134),
					background: ICON_PORCELAIN,
					borderRadius: `${s(11)}px ${s(11)}px ${s(16)}px ${s(16)}px`,
					boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}`
				},
				children: /* @__PURE__ */ jsx("div", { style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: s(34),
					background: liquid,
					opacity: .5,
					borderRadius: `0 0 ${s(15)}px ${s(15)}px`
				} })
			}),
			/* @__PURE__ */ jsx(Label, {
				w: 46,
				h: 52,
				style: {
					top: s(56),
					left: "50%",
					transform: "translateX(-50%)"
				}
			})
		]
	});
}
function ProductCard({ product }) {
	const { t, lang, categoryLabel, tagLabel, categoryTint } = useAurelia();
	const copy = HOME_COPY[lang];
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
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
	const isNew = product.is_new && !product.is_bestseller;
	const isBest = product.is_bestseller;
	const isSale = !!product.price_old || !!product.is_sale;
	const tag = isOut ? "out" : isBest ? "best" : isNew ? "new" : isSale ? "sale" : void 0;
	const shape = resolveShape(product);
	return /* @__PURE__ */ jsxs("div", {
		className: `au-prod-card ${isOut ? "is-out-of-stock" : ""}`,
		style: isOut ? { opacity: .6 } : {},
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-media",
				style: {
					background: categoryTint(product.category.name),
					filter: isOut ? "grayscale(100%)" : "none"
				},
				children: [tag && /* @__PURE__ */ jsx("div", {
					className: "au-prod-tag",
					style: tag === "out" ? {
						background: "var(--au-dark)",
						color: "var(--au-bg)"
					} : {},
					children: tag === "out" ? copy.soldOut : tagLabel(tag)
				}), product.image_url ? /* @__PURE__ */ jsx("img", {
					src: product.image_url,
					alt: product.name,
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}
				}) : /* @__PURE__ */ jsx(ProductIcon, {
					shape,
					cat: product.category.name,
					catLabel: categoryLabel(product.category.name)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-info",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "au-prod-cat",
						children: categoryLabel(product.category.name)
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-prod-name",
						children: product.name
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-prod-note",
						children: product.description || copy.essentialCare
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "au-prod-footer",
				style: { pointerEvents: isOut ? "none" : "auto" },
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
						if (isOut) e.preventDefault();
					},
					children: [/* @__PURE__ */ jsx("input", {
						type: "number",
						min: "1",
						max: product.stock,
						value: quantity,
						onChange: (e) => setQuantity(parseInt(e.target.value) || 1),
						className: "au-qty-input",
						"aria-label": "Quantity",
						disabled: isOut
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "au-add-btn",
						onClick: addToCart,
						disabled: loading || isOut,
						children: loading ? "…" : isOut ? copy.soldOut : t.add
					})]
				})]
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
	const { lang, t, categoryLabel, categoryTint, tagLabel } = useAurelia();
	const copy = HOME_COPY[lang];
	const heroShape = heroProduct ? resolveShape(heroProduct) : "bottle";
	const heroCat = heroProduct?.category?.name || "cabello";
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Head, { children: [
			/* @__PURE__ */ jsx("title", { children: activeCategory ? `${categoryLabel(activeCategory)} · Ourélia` : "Ourélia" }),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "description",
				name: "description",
				content: activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia.` : copy.heroSub
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "keywords",
				name: "keywords",
				content: activeCategory ? `${categoryLabel(activeCategory).toLowerCase()}, soins, beauté, Ourélia, cosmétiques` : "soins, beauté, cosmétiques, parfums, Ourélia, argan, bien-être"
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "og:title",
				property: "og:title",
				content: activeCategory ? `${categoryLabel(activeCategory)} · Ourélia` : "Ourélia"
			}),
			/* @__PURE__ */ jsx("meta", {
				"head-key": "og:description",
				property: "og:description",
				content: activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia.` : copy.heroSub
			})
		] }),
		(flash?.success || errors?.quantity) && /* @__PURE__ */ jsx("div", {
			className: "au-flash",
			style: { background: errors?.quantity ? "var(--au-sale)" : "var(--au-gold)" },
			children: flash?.success || errors?.quantity
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
						children: [/* @__PURE__ */ jsx("a", {
							href: "#collection",
							className: "au-btn",
							children: copy.heroCta
						}), /* @__PURE__ */ jsx(Link, {
							href: "/about",
							className: "au-link-underline",
							children: copy.heroLink
						})]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "au-hero-panel",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "au-hero-panel-tag-left",
							children: "N°01"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "au-hero-panel-tag-right",
							children: copy.heroPanelTag
						}),
						heroProduct?.image_url ? /* @__PURE__ */ jsx("img", {
							src: heroProduct.image_url,
							alt: "Hero",
							style: {
								width: "60%",
								height: "100%",
								objectFit: "contain"
							}
						}) : /* @__PURE__ */ jsx(ProductIcon, {
							shape: heroShape,
							cat: heroCat,
							catLabel: categoryLabel(heroCat),
							scale: 2.4
						}),
						/* @__PURE__ */ jsx("div", {
							className: "au-hero-panel-caption",
							children: copy.heroPanelCap
						})
					]
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
				const spread = SPREADS[i] || SPREADS[0];
				const shape = resolveShape(product);
				return /* @__PURE__ */ jsxs("div", {
					className: "au-spread-row",
					style: { flexDirection: i % 2 === 1 ? "row-reverse" : "row" },
					children: [/* @__PURE__ */ jsxs("div", {
						className: "au-spread-media",
						style: { background: categoryTint(product.category.name) },
						children: [product.is_bestseller && /* @__PURE__ */ jsx("div", {
							className: "au-tag-pill",
							children: tagLabel("best")
						}), product.image_url ? /* @__PURE__ */ jsx("img", {
							src: product.image_url,
							alt: product.name,
							style: {
								width: "100%",
								height: "100%",
								objectFit: "cover"
							}
						}) : /* @__PURE__ */ jsx(ProductIcon, {
							shape,
							cat: product.category.name,
							catLabel: categoryLabel(product.category.name),
							scale: 1.7
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
							/* @__PURE__ */ jsx("h3", {
								className: "au-h3",
								children: product.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "au-body-text",
								children: product.description || spread.story[lang]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "au-tags",
								children: spread.tags[lang].map((tag) => /* @__PURE__ */ jsx("span", {
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
					const count = products.filter((p) => p.category.name === cat && (activeBrand ? p.brand === activeBrand : true)).length;
					return /* @__PURE__ */ jsxs("a", {
						href: "#collection",
						onClick: (e) => {
							setActiveCategory(activeCategory === cat ? null : cat);
						},
						className: "au-cat-card",
						style: {
							background: categoryTint(cat),
							border: activeCategory === cat ? "2px solid var(--au-gold)" : "2px solid transparent"
						},
						children: [/* @__PURE__ */ jsxs("span", {
							className: "au-cat-num",
							children: ["N°", String(count).padStart(2, "0")]
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "au-cat-label",
							children: categoryLabel(cat)
						}), /* @__PURE__ */ jsxs("div", {
							className: "au-cat-discover",
							children: [t.discover, /* @__PURE__ */ jsx("span", {
								style: { fontSize: 13 },
								children: "→"
							})]
						})] })]
					}, cat);
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "au-container au-bestsellers",
			id: "collection",
			children: [/* @__PURE__ */ jsxs("div", {
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
							children: "Toutes les marques"
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
						children: activeCategory || activeBrand ? `Tout voir (${products.length})` : `${products.length} ${copy.productsWord}`
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "au-prod-grid",
				children: products.filter((p) => activeCategory ? p.category.name === activeCategory : true).filter((p) => activeBrand ? p.brand === activeBrand : true).map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id))
			})]
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
