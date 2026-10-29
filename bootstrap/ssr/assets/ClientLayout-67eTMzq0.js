import { a as normalizeLang, i as getStoredLang, n as SUPPORTED_LANGS, o as setStoredLang, r as dictionaries, t as LANG_LABELS } from "./langue-BtFliKHl.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Fragment as Fragment$1, createContext, useContext, useEffect, useState } from "react";
//#region resources/js/Layouts/ClientLayout.tsx
var CATEGORY_TINTS = {
	"hair care": "#ECE0CF",
	"face care": "#E7E5D6",
	"makeup": "#F2E3C6",
	"perfumes": "#EBDFDB",
	"body & bath": "#E4E7E1"
};
var AureliaContext = createContext(null);
function useAurelia() {
	const ctx = useContext(AureliaContext);
	if (!ctx) throw new Error("useAurelia() must be called from within <ClientLayout>.");
	return ctx;
}
function ClientLayout({ auth, cartCount = 0, title, categories = [
	"Hair Care",
	"Face Care",
	"Makeup",
	"Perfumes",
	"Body & Bath"
], children }) {
	const [lang, setLangState] = useState(() => getStoredLang());
	const setLang = (newLang) => {
		const normalized = normalizeLang(newLang);
		setLangState(normalized);
		setStoredLang(normalized);
	};
	const [menuOpen, setMenuOpen] = useState(false);
	const { url } = usePage();
	useEffect(() => {
		setMenuOpen(false);
	}, [url]);
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
			const onKeyDown = (e) => {
				if (e.key === "Escape") setMenuOpen(false);
			};
			window.addEventListener("keydown", onKeyDown);
			return () => {
				document.body.style.overflow = "";
				window.removeEventListener("keydown", onKeyDown);
			};
		} else document.body.style.overflow = "";
	}, [menuOpen]);
	const t = dictionaries[lang] || dictionaries.fr;
	const categoryTint = (cat) => CATEGORY_TINTS[cat.toLowerCase()] || "#ECE0CF";
	const categoryLabel = (cat) => t.common?.categoryLabels && t.common.categoryLabels[cat.toLowerCase()] || t[cat.toLowerCase()] || cat;
	const tagLabel = (tag) => tag === "best" ? t.best : tag === "new" ? t.newTag : tag === "sale" ? t.sale : tag || "";
	const contextValue = {
		lang,
		setLang,
		t,
		categoryTint,
		categoryLabel,
		tagLabel
	};
	const metaDesc = lang === "eng" ? "Discover our range of Ourélia essential care products, cosmetics and perfumes crafted for your daily ritual." : lang === "esp" ? "Descubra nuestra gama de cuidados esenciales Ourélia, cosméticos y perfumes diseñados para su bienestar diario." : "Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être.";
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!("IntersectionObserver" in window)) {
			document.querySelectorAll(".au-reveal, .au-reveal-scale, .au-reveal-left, .au-reveal-right, .au-reveal-group").forEach((el) => {
				el.classList.add("is-revealed");
			});
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-revealed");
					observer.unobserve(entry.target);
				}
			});
		}, {
			root: null,
			rootMargin: "0px 0px -40px 0px",
			threshold: .08
		});
		const observeUnrevealed = () => {
			document.querySelectorAll(".au-reveal:not(.is-revealed), .au-reveal-scale:not(.is-revealed), .au-reveal-left:not(.is-revealed), .au-reveal-right:not(.is-revealed), .au-reveal-group:not(.is-revealed)").forEach((el) => observer.observe(el));
		};
		observeUnrevealed();
		const timer = setTimeout(observeUnrevealed, 250);
		return () => {
			clearTimeout(timer);
			observer.disconnect();
		};
	}, [url, lang]);
	return /* @__PURE__ */ jsxs(AureliaContext.Provider, {
		value: contextValue,
		children: [/* @__PURE__ */ jsxs(Head, {
			title: title ? title === "Ourélia" ? "Ourélia" : `${title} · Ourélia` : "Ourélia — Essential Care",
			children: [
				/* @__PURE__ */ jsx("meta", {
					"head-key": "description",
					name: "description",
					content: metaDesc
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:title",
					property: "og:title",
					content: title ? title === "Ourélia" ? "Ourélia" : `${title} · Ourélia` : "Ourélia — Essential Care"
				}),
				/* @__PURE__ */ jsx("meta", {
					"head-key": "og:description",
					property: "og:description",
					content: metaDesc
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
				/* @__PURE__ */ jsx("header", {
					className: "au-nav",
					children: /* @__PURE__ */ jsxs("div", {
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
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/",
										className: `au-nav-link${url === "/" ? " au-nav-link--active" : ""}`,
										children: t.navHome
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/about",
										className: `au-nav-link${url.startsWith("/about") ? " au-nav-link--active" : ""}`,
										children: t.navAbout
									}),
									categories && categories.length > 0 && /* @__PURE__ */ jsxs("div", {
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
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-nav-right",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "au-lang-toggle",
										children: SUPPORTED_LANGS.map((code) => /* @__PURE__ */ jsx("button", {
											type: "button",
											className: `au-lang-btn${lang === code ? " au-lang-btn--active" : ""}`,
											onClick: () => setLang(code),
											children: LANG_LABELS[code]
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
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: `au-mobile-backdrop${menuOpen ? " is-open" : ""}`,
					onClick: () => setMenuOpen(false),
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsxs("aside", {
					className: `au-mobile-panel${menuOpen ? " is-open" : ""}`,
					id: "mobile-navigation-drawer",
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Menu de navigation",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "au-drawer-header",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "au-drawer-logo",
							onClick: () => setMenuOpen(false),
							children: "OURÉLIA"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "au-drawer-close",
							onClick: () => setMenuOpen(false),
							"aria-label": "Fermer le menu",
							children: /* @__PURE__ */ jsx("svg", {
								width: "22",
								height: "22",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: 1.8,
								children: /* @__PURE__ */ jsx("path", {
									d: "M18 6L6 18M6 6l12 12",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-mobile-inner",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "au-drawer-group",
								children: [
									/* @__PURE__ */ jsxs(Link, {
										href: "/",
										className: `au-mobile-link${url === "/" ? " au-mobile-link--active" : ""}`,
										onClick: () => setMenuOpen(false),
										children: [/* @__PURE__ */ jsx("span", { children: t.navHome }), /* @__PURE__ */ jsx("span", {
											className: "au-drawer-arrow",
											children: "›"
										})]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: "/about",
										className: `au-mobile-link${url.startsWith("/about") ? " au-mobile-link--active" : ""}`,
										onClick: () => setMenuOpen(false),
										children: [/* @__PURE__ */ jsx("span", { children: t.navAbout }), /* @__PURE__ */ jsx("span", {
											className: "au-drawer-arrow",
											children: "›"
										})]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: route("cart.index"),
										className: `au-mobile-link${url.startsWith("/cart") ? " au-mobile-link--active" : ""}`,
										onClick: () => setMenuOpen(false),
										children: [/* @__PURE__ */ jsx("span", { children: t.cartTitle || t.cart?.title || "Panier" }), cartCount > 0 ? /* @__PURE__ */ jsx("span", {
											className: "au-drawer-badge",
											children: cartCount
										}) : /* @__PURE__ */ jsx("span", {
											className: "au-drawer-arrow",
											children: "›"
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "au-drawer-section-title",
								children: t.navShop
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-drawer-sublinks",
								children: [/* @__PURE__ */ jsxs(Link, {
									href: "/#collection",
									className: "au-mobile-sublink",
									onClick: () => setMenuOpen(false),
									children: [/* @__PURE__ */ jsx("span", {
										className: "au-drawer-bullet",
										children: "✦"
									}), /* @__PURE__ */ jsx("span", { children: t.allLabel })]
								}), categories && categories.map((cat) => /* @__PURE__ */ jsxs(Link, {
									href: `/?category=${encodeURIComponent(cat)}#collection`,
									className: "au-mobile-sublink",
									onClick: () => setMenuOpen(false),
									children: [/* @__PURE__ */ jsx("span", {
										className: "au-drawer-bullet",
										children: "✦"
									}), /* @__PURE__ */ jsx("span", { children: categoryLabel(cat) })]
								}, cat))]
							}),
							/* @__PURE__ */ jsx("div", { className: "au-drawer-divider" }),
							/* @__PURE__ */ jsx("div", {
								className: "au-drawer-group",
								children: auth?.user ? /* @__PURE__ */ jsxs(Fragment, { children: [
									/* @__PURE__ */ jsxs("div", {
										className: "au-drawer-user-card",
										children: [/* @__PURE__ */ jsx("div", {
											className: "au-drawer-avatar",
											children: (auth.user.name || "C").charAt(0).toUpperCase()
										}), /* @__PURE__ */ jsxs("div", {
											className: "au-drawer-user-meta",
											children: [/* @__PURE__ */ jsx("div", {
												className: "au-drawer-user-name",
												children: auth.user.name
											}), /* @__PURE__ */ jsx("div", {
												className: "au-drawer-user-email",
												children: auth.user.email
											})]
										})]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: route("profile.edit"),
										className: `au-mobile-link${url.startsWith("/profile") ? " au-mobile-link--active" : ""}`,
										onClick: () => setMenuOpen(false),
										children: [/* @__PURE__ */ jsxs("span", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: "8px"
											},
											children: [/* @__PURE__ */ jsxs("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: 1.6,
												children: [/* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ jsx("circle", {
													cx: "12",
													cy: "7",
													r: "4"
												})]
											}), t.profile]
										}), /* @__PURE__ */ jsx("span", {
											className: "au-drawer-arrow",
											children: "›"
										})]
									}),
									/* @__PURE__ */ jsx(Link, {
										href: route("logout"),
										method: "post",
										as: "button",
										className: "au-mobile-link au-mobile-link--muted",
										onClick: () => setMenuOpen(false),
										children: /* @__PURE__ */ jsxs("span", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: "8px"
											},
											children: [/* @__PURE__ */ jsxs("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: 1.6,
												children: [
													/* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
													/* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
													/* @__PURE__ */ jsx("line", {
														x1: "21",
														y1: "12",
														x2: "9",
														y2: "12"
													})
												]
											}), t.logout]
										})
									})
								] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Link, {
									href: route("login"),
									className: "au-mobile-link",
									onClick: () => setMenuOpen(false),
									children: [/* @__PURE__ */ jsxs("span", {
										style: {
											display: "inline-flex",
											alignItems: "center",
											gap: "8px"
										},
										children: [/* @__PURE__ */ jsxs("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: 1.6,
											children: [
												/* @__PURE__ */ jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
												/* @__PURE__ */ jsx("polyline", { points: "10 17 15 12 10 7" }),
												/* @__PURE__ */ jsx("line", {
													x1: "15",
													y1: "12",
													x2: "3",
													y2: "12"
												})
											]
										}), t.login]
									}), /* @__PURE__ */ jsx("span", {
										className: "au-drawer-arrow",
										children: "›"
									})]
								}), /* @__PURE__ */ jsx(Link, {
									href: route("register"),
									className: "au-mobile-link au-mobile-link--muted",
									onClick: () => setMenuOpen(false),
									children: /* @__PURE__ */ jsxs("span", {
										style: {
											display: "inline-flex",
											alignItems: "center",
											gap: "8px"
										},
										children: [/* @__PURE__ */ jsxs("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: 1.6,
											children: [
												/* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
												/* @__PURE__ */ jsx("circle", {
													cx: "8.5",
													cy: "7",
													r: "4"
												}),
												/* @__PURE__ */ jsx("line", {
													x1: "20",
													y1: "8",
													x2: "20",
													y2: "14"
												}),
												/* @__PURE__ */ jsx("line", {
													x1: "23",
													y1: "11",
													x2: "17",
													y2: "11"
												})
											]
										}), t.register]
									})
								})] })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "au-mobile-lang-section",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "au-mobile-lang-kicker",
									children: [/* @__PURE__ */ jsx("span", { children: "🌐" }), /* @__PURE__ */ jsx("span", { children: lang === "eng" ? "Language" : lang === "esp" ? "Idioma" : "Langue" })]
								}), /* @__PURE__ */ jsx("div", {
									className: "au-mobile-lang-pills",
									children: SUPPORTED_LANGS.map((code) => /* @__PURE__ */ jsx("button", {
										type: "button",
										className: `au-mobile-lang-pill${lang === code ? " au-mobile-lang-pill--active" : ""}`,
										onClick: () => {
											setLang(code);
											setMenuOpen(false);
										},
										children: LANG_LABELS[code]
									}, code))
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "au-marquee",
					"aria-label": "Brand Philosophy",
					children: /* @__PURE__ */ jsx("div", {
						className: "au-marquee-track",
						children: [
							0,
							1,
							2,
							3
						].map((groupIndex) => /* @__PURE__ */ jsx("div", {
							className: "au-marquee-group",
							"aria-hidden": groupIndex > 0 ? "true" : void 0,
							children: [...t.marquee, ...t.marquee].map((item, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: "au-marquee-item",
								children: /* @__PURE__ */ jsx("span", {
									className: "au-marquee-text",
									children: item
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "au-marquee-star",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("svg", {
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "au-star-icon",
									children: /* @__PURE__ */ jsx("path", { d: "M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" })
								})
							})] }, i))
						}, groupIndex))
					})
				}),
				/* @__PURE__ */ jsx("main", {
					className: "au-lang-fade",
					children
				}, lang),
				/* @__PURE__ */ jsxs("section", {
					className: "au-newsletter au-reveal",
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
							children: col.items.map((item, j) => /* @__PURE__ */ jsx(Link, {
								href: item.href,
								className: "au-footer-link",
								children: item.label
							}, j))
						})] }, i))]
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-footer-bottom",
						children: [
							/* @__PURE__ */ jsxs("span", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Ourélia"
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "au-footer-lang",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "au-footer-lang-label",
									children: [lang === "eng" ? "Language" : lang === "esp" ? "Idioma" : "Langue", " :"]
								}), /* @__PURE__ */ jsx("div", {
									className: "au-lang-toggle au-lang-toggle--footer",
									children: SUPPORTED_LANGS.map((code) => /* @__PURE__ */ jsx("button", {
										type: "button",
										className: `au-lang-btn${lang === code ? " au-lang-btn--active" : ""}`,
										onClick: () => setLang(code),
										children: LANG_LABELS[code]
									}, code))
								})]
							}),
							/* @__PURE__ */ jsx("span", { children: t.footerNote })
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { useAurelia as n, ClientLayout as t };
