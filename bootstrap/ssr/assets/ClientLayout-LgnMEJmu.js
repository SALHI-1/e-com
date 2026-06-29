import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Fragment as Fragment$1, createContext, useContext, useState } from "react";
//#region resources/js/Layouts/ClientLayout.tsx
var COMMON = {
	fr: {
		announce: "Livraison gratuite pour les commandes de plus de 20 dh",
		navHome: "Accueil",
		navShop: "Boutique",
		navHair: "Cheveux",
		navAbout: "Histoire",
		add: "Ajouter",
		addCart: "Ajouter au panier",
		allLabel: "Tout",
		discover: "Découvrir",
		best: "Best-seller",
		newTag: "Nouveau",
		sale: "Promo",
		cabello: "Cheveux",
		rostro: "Visage",
		solar: "Solaire",
		perfume: "Parfum",
		bucal: "Soins dentaires",
		marquee: [
			"Beauté honnête",
			"Soins essentiels",
			"Ingrédients réels",
			"Pour chaque jour",
			"Prix juste"
		],
		promiseKicker: "Rejoignez-nous",
		promiseTitle: "Prenez soin de vous",
		promiseText: "Recevez des conseils pour votre routine. Pas de spam, juste l'essentiel.",
		emailPh: "Votre adresse e-mail",
		subscribe: "S'abonner",
		footerTagline: "Des soins essentiels pour chaque jour.",
		footerNote: "Fait avec soin · Espagne",
		footer: [
			{
				title: "Boutique",
				items: [
					"Cheveux",
					"Visage",
					"Solaire",
					"Parfum",
					"Soins dentaires"
				]
			},
			{
				title: "Société",
				items: [
					"Notre histoire",
					"Philosophie",
					"Durabilité",
					"Contact"
				]
			},
			{
				title: "Aide",
				items: [
					"Livraison",
					"Retours",
					"FAQ",
					"Confidentialité"
				]
			}
		],
		login: "Connexion",
		register: "Créer un compte",
		profile: "Profil",
		logout: "Déconnexion",
		cartTitle: "Votre Panier",
		cartEmpty: "Votre panier est vide.",
		backShop: "Retourner à la boutique",
		unit: "unité",
		subtotal: "Sous-total",
		shipping: "Livraison",
		free: "Gratuite",
		total: "Total",
		checkout: "Passer la commande",
		waNote: "📱 Vous recevrez un message WhatsApp pour confirmer votre commande.",
		guestName: "Votre nom *",
		guestEmail: "Adresse e-mail *",
		waPhone: "Numéro WhatsApp *",
		address: "Adresse de livraison *",
		back: "Retour",
		confirm: "Confirmer",
		sending: "Envoi…"
	},
	es: {
		announce: "Envío gratis en pedidos superiores a 20 dh",
		navHome: "Inicio",
		navShop: "Tienda",
		navHair: "Cabello",
		navAbout: "Historia",
		add: "Añadir",
		addCart: "Añadir al carro",
		allLabel: "Todo",
		discover: "Descubrir",
		best: "Más vendido",
		newTag: "Nuevo",
		sale: "Oferta",
		cabello: "Cabello",
		rostro: "Rostro",
		solar: "Solar",
		perfume: "Perfume",
		bucal: "Cuidado bucal",
		marquee: [
			"Belleza honesta",
			"Cuidado esencial",
			"Ingredientes reales",
			"Para cada día",
			"Precio justo"
		],
		promiseKicker: "Únete",
		promiseTitle: "Cuídate con nosotras",
		promiseText: "Recibe consejos de rutina y nuestras novedades. Sin spam, solo lo esencial.",
		emailPh: "Tu correo electrónico",
		subscribe: "Suscribirme",
		footerTagline: "Cuidado esencial para cada día.",
		footerNote: "Hecho con cariño · España",
		footer: [
			{
				title: "Tienda",
				items: [
					"Cabello",
					"Rostro",
					"Solar",
					"Perfume",
					"Cuidado bucal"
				]
			},
			{
				title: "Compañía",
				items: [
					"Nuestra historia",
					"Filosofía",
					"Sostenibilidad",
					"Contacto"
				]
			},
			{
				title: "Ayuda",
				items: [
					"Envíos",
					"Devoluciones",
					"Preguntas frecuentes",
					"Privacidad"
				]
			}
		],
		login: "Acceder",
		register: "Crear cuenta",
		profile: "Perfil",
		logout: "Salir",
		cartTitle: "Tu Carrito",
		cartEmpty: "Tu carrito está vacío.",
		backShop: "Volver a la tienda",
		unit: "unidad",
		subtotal: "Subtotal",
		shipping: "Envío",
		free: "Gratis",
		total: "Total",
		checkout: "Realizar pedido",
		waNote: "📱 Recibirás un mensaje de WhatsApp para confirmar tu pedido.",
		guestName: "Tu nombre *",
		guestEmail: "Correo electrónico *",
		waPhone: "Número de WhatsApp *",
		address: "Dirección de envío *",
		back: "Atrás",
		confirm: "Confirmar",
		sending: "Enviando…"
	},
	en: {
		announce: "Free shipping on orders over 20 dh",
		navHome: "Home",
		navShop: "Shop",
		navHair: "Hair",
		navAbout: "About",
		add: "Add",
		addCart: "Add to cart",
		allLabel: "All",
		discover: "Discover",
		best: "Best seller",
		newTag: "New",
		sale: "Sale",
		cabello: "Hair",
		rostro: "Face",
		solar: "Sun care",
		perfume: "Fragrance",
		bucal: "Oral care",
		marquee: [
			"Honest beauty",
			"Essential care",
			"Real ingredients",
			"For every day",
			"Fair pricing"
		],
		promiseKicker: "Join us",
		promiseTitle: "Take care, with us",
		promiseText: "Get routine tips and new arrivals. No spam, only the essentials.",
		emailPh: "Your email address",
		subscribe: "Subscribe",
		footerTagline: "Essential care for every day.",
		footerNote: "Made with care · Spain",
		footer: [
			{
				title: "Shop",
				items: [
					"Hair",
					"Face",
					"Sun care",
					"Fragrance",
					"Oral care"
				]
			},
			{
				title: "Company",
				items: [
					"Our story",
					"Philosophy",
					"Sustainability",
					"Contact"
				]
			},
			{
				title: "Help",
				items: [
					"Shipping",
					"Returns",
					"FAQ",
					"Privacy"
				]
			}
		],
		login: "Log in",
		register: "Create account",
		profile: "Profile",
		logout: "Log out",
		cartTitle: "Your Cart",
		cartEmpty: "Your cart is empty.",
		backShop: "Back to shop",
		unit: "unit",
		subtotal: "Subtotal",
		shipping: "Shipping",
		free: "Free",
		total: "Total",
		checkout: "Checkout",
		waNote: "📱 You will receive a WhatsApp message to confirm your order.",
		guestName: "Your name *",
		guestEmail: "Email address *",
		waPhone: "WhatsApp number *",
		address: "Shipping address *",
		back: "Back",
		confirm: "Confirm",
		sending: "Sending…"
	}
};
var CATEGORY_TINTS = {
	cabello: "#ECE0CF",
	rostro: "#E7E5D6",
	solar: "#F2E3C6",
	perfume: "#EBDFDB",
	bucal: "#E4E7E1"
};
var LANGS = [
	"fr",
	"en",
	"es"
];
var AureliaContext = createContext(null);
function useAurelia() {
	const ctx = useContext(AureliaContext);
	if (!ctx) throw new Error("useAurelia() must be called from within <ClientLayout>.");
	return ctx;
}
function ClientLayout({ auth, cartCount = 0, title, categories, children }) {
	const [lang, setLangState] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("au_lang");
			if (saved === "fr" || saved === "en" || saved === "es") return saved;
		}
		return "fr";
	});
	const setLang = (newLang) => {
		setLangState(newLang);
		if (typeof window !== "undefined") localStorage.setItem("au_lang", newLang);
	};
	const [menuOpen, setMenuOpen] = useState(false);
	const { url } = usePage();
	const t = COMMON[lang];
	const categoryTint = (cat) => CATEGORY_TINTS[cat.toLowerCase()] || "#ECE0CF";
	const categoryLabel = (cat) => t[cat.toLowerCase()] || cat;
	const tagLabel = (tag) => tag === "best" ? t.best : tag === "new" ? t.newTag : tag === "sale" ? t.sale : tag || "";
	const contextValue = {
		lang,
		setLang,
		t,
		categoryTint,
		categoryLabel,
		tagLabel
	};
	return /* @__PURE__ */ jsxs(AureliaContext.Provider, {
		value: contextValue,
		children: [/* @__PURE__ */ jsxs(Head, {
			title: title ? title === "Ourélia" ? "Ourélia" : `${title} · Ourélia` : "Ourélia — Essential Care",
			children: [
				/* @__PURE__ */ jsx("meta", {
					"head-key": "description",
					name: "description",
					content: "Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être."
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:title",
					property: "og:title",
					content: title ? title === "Ourélia" ? "Ourélia" : `${title} · Ourélia` : "Ourélia — Essential Care"
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:description",
					property: "og:description",
					content: "Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être."
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:image",
					property: "og:image",
					content: "/assets/og-default.jpg"
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:type",
					property: "og:type",
					content: "website"
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:card",
					content: "summary_large_image"
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "au-page",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "au-announce",
					children: t.announce
				}),
				/* @__PURE__ */ jsxs("header", {
					className: "au-nav",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "au-nav-inner",
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "au-burger",
								"aria-label": "Menu",
								"aria-expanded": menuOpen,
								onClick: () => setMenuOpen((o) => !o),
								children: menuOpen ? /* @__PURE__ */ jsx("svg", {
									width: "24",
									height: "24",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 1.6,
									children: /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M18 6L6 18" })
								}) : /* @__PURE__ */ jsx("svg", {
									width: "24",
									height: "24",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 1.6,
									children: /* @__PURE__ */ jsx("path", { d: "M3 6h18M3 12h18M3 18h18" })
								})
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/",
								className: "au-logo",
								children: "OURÉLIA"
							}),
							/* @__PURE__ */ jsxs("nav", {
								className: "au-nav-links",
								children: [/* @__PURE__ */ jsx(Link, {
									href: "/",
									className: `au-nav-link${url === "/" ? " au-nav-link--active" : ""}`,
									children: t.navHome
								}), categories && categories.length > 0 && /* @__PURE__ */ jsxs("div", {
									className: "au-nav-dropdown-wrap",
									children: [/* @__PURE__ */ jsxs("button", {
										className: "au-nav-link au-nav-dropdown-btn",
										children: [t.navShop, " ▾"]
									}), /* @__PURE__ */ jsxs("div", {
										className: "au-nav-dropdown-menu",
										children: [/* @__PURE__ */ jsx(Link, {
											href: "/#collection",
											className: "au-nav-dropdown-item",
											children: t.allLabel
										}), categories.map((cat) => /* @__PURE__ */ jsx(Link, {
											href: `/?category=${encodeURIComponent(cat)}#collection`,
											className: "au-nav-dropdown-item",
											children: categoryLabel(cat)
										}, cat))]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-nav-right",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "au-lang-toggle",
										children: LANGS.map((code) => /* @__PURE__ */ jsx("button", {
											type: "button",
											className: `au-lang-btn${lang === code ? " au-lang-btn--active" : ""}`,
											onClick: () => setLang(code),
											children: code.toUpperCase()
										}, code))
									}),
									/* @__PURE__ */ jsx("div", {
										className: "au-auth-links",
										children: auth?.user ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
											href: route("profile.edit"),
											className: "au-nav-link",
											children: t.profile
										}), /* @__PURE__ */ jsx(Link, {
											href: route("logout"),
											method: "post",
											as: "button",
											className: "au-nav-link au-nav-link--button",
											children: t.logout
										})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
											href: route("login"),
											className: "au-nav-link",
											children: t.login
										}), /* @__PURE__ */ jsx(Link, {
											href: route("register"),
											className: "au-nav-link",
											children: t.register
										})] })
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: route("cart.index"),
										className: "au-cart-btn",
										"aria-label": "Cart",
										children: [/* @__PURE__ */ jsxs("svg", {
											width: "21",
											height: "21",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: 1.4,
											children: [/* @__PURE__ */ jsx("path", { d: "M6 8h12l-1 12H7L6 8z" }), /* @__PURE__ */ jsx("path", { d: "M9 8a3 3 0 0 1 6 0" })]
										}), cartCount > 0 && /* @__PURE__ */ jsx("span", {
											className: "au-cart-badge",
											children: cartCount
										})]
									})
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: `au-mobile-panel${menuOpen ? " is-open" : ""}`,
						children: /* @__PURE__ */ jsxs("div", {
							className: "au-mobile-inner",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: "/",
									className: "au-mobile-link",
									onClick: () => setMenuOpen(false),
									children: t.navHome
								}),
								/* @__PURE__ */ jsx("div", {
									className: "au-mobile-link",
									style: {
										pointerEvents: "none",
										color: "var(--au-text-muted)",
										paddingTop: "20px"
									},
									children: t.navShop
								}),
								/* @__PURE__ */ jsx(Link, {
									href: "/#collection",
									className: "au-mobile-link",
									onClick: () => setMenuOpen(false),
									style: { paddingLeft: "20px" },
									children: t.allLabel
								}),
								categories && categories.map((cat) => /* @__PURE__ */ jsx(Link, {
									href: `/?category=${encodeURIComponent(cat)}#collection`,
									className: "au-mobile-link",
									onClick: () => setMenuOpen(false),
									style: { paddingLeft: "20px" },
									children: categoryLabel(cat)
								}, cat)),
								/* @__PURE__ */ jsx("div", { style: { height: "16px" } }),
								auth?.user ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
									href: route("profile.edit"),
									className: "au-mobile-link au-mobile-link--muted",
									onClick: () => setMenuOpen(false),
									children: t.profile
								}), /* @__PURE__ */ jsx(Link, {
									href: route("logout"),
									method: "post",
									as: "button",
									className: "au-mobile-link au-mobile-link--muted",
									children: t.logout
								})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
									href: route("login"),
									className: "au-mobile-link au-mobile-link--muted",
									onClick: () => setMenuOpen(false),
									children: t.login
								}), /* @__PURE__ */ jsx(Link, {
									href: route("register"),
									className: "au-mobile-link au-mobile-link--muted",
									onClick: () => setMenuOpen(false),
									children: t.register
								})] }),
								/* @__PURE__ */ jsx("div", {
									className: "au-mobile-lang",
									children: /* @__PURE__ */ jsx("div", {
										className: "au-lang-toggle",
										children: LANGS.map((code) => /* @__PURE__ */ jsx("button", {
											type: "button",
											className: `au-lang-btn${lang === code ? " au-lang-btn--active" : ""}`,
											onClick: () => setLang(code),
											children: code.toUpperCase()
										}, code))
									})
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "au-marquee",
					children: /* @__PURE__ */ jsx("div", {
						className: "au-marquee-track",
						children: [0, 1].map((groupIndex) => /* @__PURE__ */ jsx("div", {
							className: "au-marquee-group",
							children: t.marquee.map((item, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: "au-marquee-item",
								children: item
							}), /* @__PURE__ */ jsx("span", { className: "au-dot" })] }, i))
						}, groupIndex))
					})
				}),
				/* @__PURE__ */ jsx("main", {
					className: "au-lang-fade",
					children
				}, lang),
				/* @__PURE__ */ jsxs("section", {
					className: "au-newsletter",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "au-kicker",
							children: t.promiseKicker
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "au-newsletter-title",
							children: t.promiseTitle
						}),
						/* @__PURE__ */ jsx("p", {
							className: "au-newsletter-text",
							children: t.promiseText
						}),
						/* @__PURE__ */ jsxs("form", {
							className: "au-newsletter-form",
							onSubmit: (e) => e.preventDefault(),
							children: [/* @__PURE__ */ jsx("input", {
								type: "email",
								placeholder: t.emailPh,
								className: "au-newsletter-input"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "au-newsletter-btn",
								children: t.subscribe
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("footer", {
					className: "au-footer",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "au-footer-grid",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "au-footer-logo",
							children: "OURÉLIA"
						}), /* @__PURE__ */ jsx("p", {
							className: "au-footer-tagline",
							children: t.footerTagline
						})] }), t.footer.map((col, i) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "au-footer-col-title",
							children: col.title
						}), /* @__PURE__ */ jsx("div", {
							className: "au-footer-col-links",
							children: col.items.map((item, j) => /* @__PURE__ */ jsx("span", {
								className: "au-footer-link",
								children: item
							}, j))
						})] }, i))]
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-footer-bottom",
						children: [/* @__PURE__ */ jsxs("span", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Ourélia"
						] }), /* @__PURE__ */ jsx("span", { children: t.footerNote })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { useAurelia as n, ClientLayout as t };
