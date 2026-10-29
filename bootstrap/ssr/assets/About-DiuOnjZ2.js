import { n as useAurelia, t as ClientLayout } from "./ClientLayout-C7YwqqfL.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "react";
//#region resources/js/Pages/About.tsx
function About(_props) {
	const page = usePage().props;
	return /* @__PURE__ */ jsx(ClientLayout, {
		cartCount: page.cartCount,
		auth: page.auth,
		children: /* @__PURE__ */ jsx(AboutContent, {})
	});
}
function AboutContent() {
	const { t } = useAurelia();
	const about = t.about;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, {
			title: about.meta.title,
			children: /* @__PURE__ */ jsx("meta", {
				"head-key": "description",
				name: "description",
				content: about.meta.description
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "au-about-hero",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-container au-about-hero-inner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "au-kicker",
						children: about.hero.kicker
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "au-h1",
						children: about.hero.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-about-lead",
						children: about.hero.lead
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "au-manifesto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-container au-manifesto-inner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "au-kicker",
						children: about.manifesto.kicker
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-quote",
						children: about.manifesto.quote
					}),
					/* @__PURE__ */ jsx("div", {
						className: "au-quote-sign",
						children: about.manifesto.sign
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "au-container au-journey",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "au-section-head",
				children: [/* @__PURE__ */ jsx("div", {
					className: "au-section-eyebrow",
					children: about.journeyEyebrow
				}), /* @__PURE__ */ jsx("h2", {
					className: "au-section-title",
					children: about.journeyTitle
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "au-timeline",
				children: about.journey.map((item) => /* @__PURE__ */ jsxs("div", {
					className: "au-timeline-item",
					children: [/* @__PURE__ */ jsx("div", {
						className: "au-spread-num au-timeline-num",
						children: item.num
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-timeline-body",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "au-timeline-title",
							children: item.title
						}), /* @__PURE__ */ jsx("p", {
							className: "au-timeline-text",
							children: item.text
						})]
					})]
				}, item.num))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			id: "valeurs",
			className: "au-dark-band",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-container au-dark-inner",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "au-dark-head",
					children: [/* @__PURE__ */ jsx("div", {
						className: "au-dark-kicker",
						children: about.valuesKicker
					}), /* @__PURE__ */ jsx("h2", {
						className: "au-dark-title",
						children: about.valuesTitle
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "au-values-grid",
					children: about.values.map((value) => /* @__PURE__ */ jsxs("div", {
						className: "au-value-card",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "au-value-num",
								children: value.num
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "au-value-title",
								children: value.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "au-value-text",
								children: value.text
							})
						]
					}, value.num))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "au-container au-stats-section",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "au-section-head",
				children: [/* @__PURE__ */ jsx("div", {
					className: "au-section-eyebrow",
					children: about.statsEyebrow
				}), /* @__PURE__ */ jsx("h2", {
					className: "au-section-title",
					children: about.statsTitle
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "au-stats-grid",
				children: about.stats.map((stat) => /* @__PURE__ */ jsxs("div", {
					className: "au-stat",
					children: [/* @__PURE__ */ jsx("div", {
						className: "au-stat-figure",
						children: stat.figure
					}), /* @__PURE__ */ jsx("div", {
						className: "au-stat-label",
						children: stat.label
					})]
				}, stat.label))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "au-manifesto au-about-closing",
			children: /* @__PURE__ */ jsxs("div", {
				className: "au-container au-manifesto-inner",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "au-section-title",
						children: about.closingTitle
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-about-closing-text",
						children: about.closingText
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "au-about-closing-actions",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "au-btn",
							children: about.ctaPrimary
						}), /* @__PURE__ */ jsx("a", {
							href: "#valeurs",
							className: "au-btn-outline-dark",
							children: about.ctaSecondary
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { About as default };
