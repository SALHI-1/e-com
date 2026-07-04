import { t as ClientLayout } from "./ClientLayout-BEza7JXt.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/About.tsx
var STRINGS = {
	fr: {
		meta: {
			title: "À propos — Ourélia",
			description: "Découvrez l'histoire d'Ourélia : des soins honnêtes, des ingrédients reconnaissables et des prix justes."
		},
		hero: {
			kicker: "Notre histoire",
			title: "Une beauté qui ne ment pas.",
			lead: "Ourélia est née d'une question simple : pourquoi le bon soin doit-il toujours coûter plus et promettre plus qu'il ne tient ? Nous avons choisi une autre voie — des formules efficaces, des ingrédients que l'on reconnaît, et des prix qui restent honnêtes."
		},
		manifesto: {
			kicker: "Notre engagement",
			quote: "Nous ne vendons pas un rêve. Nous formulons des produits qui font ce qu'ils annoncent, avec des ingrédients que vous pouvez lire et prononcer — et nous les vendons à un prix juste.",
			sign: "— Ourélia"
		},
		journeyEyebrow: "Depuis le début",
		journeyTitle: "Notre parcours",
		journey: [
			{
				num: "01",
				title: "Le constat",
				text: "Trop de marques vendent de l'espoir en pot, à des prix qui n'ont aucun rapport avec ce qu'elles contiennent. Nous avons voulu vérifier s'il était possible de faire autrement."
			},
			{
				num: "02",
				title: "La méthode",
				text: "Nous travaillons directement avec des laboratoires, sans intermédiaires inutiles. Chaque formule est pensée pour son efficacité avant son packaging, et chaque liste d'ingrédients reste lisible."
			},
			{
				num: "03",
				title: "Aujourd'hui",
				text: "Ourélia couvre désormais le visage, les cheveux, le corps, le maquillage et le parfum — toujours avec la même règle : moins de produits, de meilleures formules."
			}
		],
		valuesKicker: "Nos valeurs",
		valuesTitle: "Ce qui guide chaque formule",
		values: [
			{
				num: "01",
				title: "Transparence",
				text: "Des listes d'ingrédients claires, sans jargon marketing pour masquer ce qu'il y a réellement dans le flacon."
			},
			{
				num: "02",
				title: "Accessibilité",
				text: "Une cosmétique de qualité ne devrait pas être un luxe. Nos prix reflètent ce que les produits coûtent réellement à bien faire."
			},
			{
				num: "03",
				title: "Responsabilité",
				text: "Sans tests sur les animaux, avec des emballages pensés pour durer ou se recycler — par défaut, pas en option."
			}
		],
		statsEyebrow: "En quelques chiffres",
		statsTitle: "Ourélia aujourd'hui",
		stats: [
			{
				figure: "5",
				label: "univers de soin"
			},
			{
				figure: "100%",
				label: "formules testées dermatologiquement"
			},
			{
				figure: "0",
				label: "test sur les animaux"
			},
			{
				figure: "+30",
				label: "ingrédients que vous savez lire"
			}
		],
		closingTitle: "Essayez l'essentiel.",
		closingText: "Pas de promesse impossible, juste des soins qui font leur travail. Découvrez la collection et jugez par vous-même.",
		ctaPrimary: "Découvrir la collection",
		ctaSecondary: "Revoir nos valeurs"
	},
	en: {
		meta: {
			title: "About — Ourélia",
			description: "The Ourélia story: honest skincare, ingredients you can read, and fair prices."
		},
		hero: {
			kicker: "Our story",
			title: "Beauty that doesn't oversell.",
			lead: "Ourélia started with a simple question: why does good skincare always have to cost more and promise more than it delivers? We chose a different path — effective formulas, ingredients you recognise, and prices that stay honest."
		},
		manifesto: {
			kicker: "Our commitment",
			quote: "We don't sell a dream. We formulate products that do what they say, with ingredients you can read and pronounce — and we price them fairly.",
			sign: "— Ourélia"
		},
		journeyEyebrow: "From the start",
		journeyTitle: "Our journey",
		journey: [
			{
				num: "01",
				title: "The starting point",
				text: "Too many brands sell hope in a jar at prices that have nothing to do with what's inside. We wanted to find out if there was another way."
			},
			{
				num: "02",
				title: "The method",
				text: "We work directly with labs, cutting out unnecessary middlemen. Every formula is built for performance before packaging, and every ingredient list stays readable."
			},
			{
				num: "03",
				title: "Today",
				text: "Ourélia now spans face, hair, body, makeup and perfume — always with the same rule: fewer products, better formulas."
			}
		],
		valuesKicker: "Our values",
		valuesTitle: "What guides every formula",
		values: [
			{
				num: "01",
				title: "Transparency",
				text: "Clear ingredient lists, with no marketing jargon hiding what's actually in the bottle."
			},
			{
				num: "02",
				title: "Accessibility",
				text: "Quality skincare shouldn't be a luxury. Our prices reflect what it actually costs to do this well."
			},
			{
				num: "03",
				title: "Responsibility",
				text: "Cruelty-free, with packaging designed to last or be recycled — by default, not as an option."
			}
		],
		statsEyebrow: "By the numbers",
		statsTitle: "Ourélia today",
		stats: [
			{
				figure: "5",
				label: "care categories"
			},
			{
				figure: "100%",
				label: "dermatologically tested formulas"
			},
			{
				figure: "0",
				label: "animal testing"
			},
			{
				figure: "+30",
				label: "ingredients you can actually read"
			}
		],
		closingTitle: "Try the essentials.",
		closingText: "No impossible promises, just skincare that does its job. Explore the collection and judge for yourself.",
		ctaPrimary: "Explore the collection",
		ctaSecondary: "Revisit our values"
	},
	es: {
		meta: {
			title: "Nosotros — Ourélia",
			description: "La historia de Ourélia: cuidado honesto, ingredientes que se entienden y precios justos."
		},
		hero: {
			kicker: "Nuestra historia",
			title: "Una belleza que no exagera.",
			lead: "Ourélia nació de una pregunta simple: ¿por qué el buen cuidado de la piel siempre debe costar más y prometer más de lo que cumple? Elegimos otro camino: fórmulas eficaces, ingredientes reconocibles y precios que siguen siendo honestos."
		},
		manifesto: {
			kicker: "Nuestro compromiso",
			quote: "No vendemos un sueño. Formulamos productos que hacen lo que anuncian, con ingredientes que se pueden leer y pronunciar, y los vendemos a un precio justo.",
			sign: "— Ourélia"
		},
		journeyEyebrow: "Desde el principio",
		journeyTitle: "Nuestro camino",
		journey: [
			{
				num: "01",
				title: "El punto de partida",
				text: "Demasiadas marcas venden esperanza en un frasco a precios que no tienen relación con lo que contienen. Quisimos comprobar si había otra forma de hacerlo."
			},
			{
				num: "02",
				title: "El método",
				text: "Trabajamos directamente con laboratorios, sin intermediarios innecesarios. Cada fórmula se piensa por su eficacia antes que por su envase, y cada lista de ingredientes sigue siendo legible."
			},
			{
				num: "03",
				title: "Hoy",
				text: "Ourélia abarca ahora rostro, cabello, cuerpo, maquillaje y perfume, siempre con la misma regla: menos productos, mejores fórmulas."
			}
		],
		valuesKicker: "Nuestros valores",
		valuesTitle: "Lo que guía cada fórmula",
		values: [
			{
				num: "01",
				title: "Transparencia",
				text: "Listas de ingredientes claras, sin jerga de marketing que oculte lo que realmente hay en el frasco."
			},
			{
				num: "02",
				title: "Accesibilidad",
				text: "Una cosmética de calidad no debería ser un lujo. Nuestros precios reflejan lo que realmente cuesta hacerlo bien."
			},
			{
				num: "03",
				title: "Responsabilidad",
				text: "Sin pruebas en animales, con envases pensados para durar o reciclarse, por defecto, no como opción."
			}
		],
		statsEyebrow: "En cifras",
		statsTitle: "Ourélia hoy",
		stats: [
			{
				figure: "5",
				label: "categorías de cuidado"
			},
			{
				figure: "100%",
				label: "fórmulas testadas dermatológicamente"
			},
			{
				figure: "0",
				label: "pruebas en animales"
			},
			{
				figure: "+30",
				label: "ingredientes que se saben leer"
			}
		],
		closingTitle: "Pruebe lo esencial.",
		closingText: "Sin promesas imposibles, solo cuidado que cumple su trabajo. Descubra la colección y compruébelo usted misma.",
		ctaPrimary: "Descubrir la colección",
		ctaSecondary: "Revisar nuestros valores"
	}
};
function About({ locale: localeProp }) {
	const page = usePage().props;
	const t = STRINGS[page.locale ?? localeProp ?? "fr"];
	return /* @__PURE__ */ jsxs(ClientLayout, {
		cartCount: page.cartCount,
		auth: page.auth,
		children: [
			/* @__PURE__ */ jsx(Head, {
				title: t.meta.title,
				children: /* @__PURE__ */ jsx("meta", {
					"head-key": "description",
					name: "description",
					content: t.meta.description
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "au-about-hero",
				children: /* @__PURE__ */ jsxs("div", {
					className: "au-container au-about-hero-inner",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "au-kicker",
							children: t.hero.kicker
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "au-h1",
							children: t.hero.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "au-about-lead",
							children: t.hero.lead
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
							children: t.manifesto.kicker
						}),
						/* @__PURE__ */ jsx("p", {
							className: "au-quote",
							children: t.manifesto.quote
						}),
						/* @__PURE__ */ jsx("div", {
							className: "au-quote-sign",
							children: t.manifesto.sign
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
						children: t.journeyEyebrow
					}), /* @__PURE__ */ jsx("h2", {
						className: "au-section-title",
						children: t.journeyTitle
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "au-timeline",
					children: t.journey.map((item) => /* @__PURE__ */ jsxs("div", {
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
							children: t.valuesKicker
						}), /* @__PURE__ */ jsx("h2", {
							className: "au-dark-title",
							children: t.valuesTitle
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "au-values-grid",
						children: t.values.map((value) => /* @__PURE__ */ jsxs("div", {
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
						children: t.statsEyebrow
					}), /* @__PURE__ */ jsx("h2", {
						className: "au-section-title",
						children: t.statsTitle
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "au-stats-grid",
					children: t.stats.map((stat) => /* @__PURE__ */ jsxs("div", {
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
							children: t.closingTitle
						}),
						/* @__PURE__ */ jsx("p", {
							className: "au-about-closing-text",
							children: t.closingText
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-about-closing-actions",
							children: [/* @__PURE__ */ jsx(Link, {
								href: "/",
								className: "au-btn",
								children: t.ctaPrimary
							}), /* @__PURE__ */ jsx("a", {
								href: "#valeurs",
								className: "au-btn-outline-dark",
								children: t.ctaSecondary
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { About as default };
