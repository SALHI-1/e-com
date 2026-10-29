import { s as fr } from "./langue-CbfI8lEO.js";
import { n as useAurelia } from "./ClientLayout-BxqbMFN4.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Components/ImageWithLoader.tsx
function ImageWithLoader({ src, alt, className, style, fallback, ...props }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	if ((!src || hasError) && fallback) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsxs("div", {
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden"
		},
		className,
		children: [!isLoaded && /* @__PURE__ */ jsx("div", {
			style: {
				position: "absolute",
				inset: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(246, 240, 228, 0.5)",
				zIndex: 1
			},
			children: /* @__PURE__ */ jsx("div", {
				className: "animate-spin",
				style: {
					width: "24px",
					height: "24px",
					borderRadius: "50%",
					border: "1.5px solid rgba(194, 160, 99, 0.2)",
					borderTopColor: "var(--au-gold, #C2A063)"
				}
			})
		}), /* @__PURE__ */ jsx("img", {
			src,
			alt,
			onLoad: () => setIsLoaded(true),
			onError: () => {
				setHasError(true);
				setIsLoaded(true);
			},
			style: {
				width: "100%",
				height: "100%",
				objectFit: "cover",
				opacity: isLoaded ? 1 : 0,
				transition: "opacity 0.5s ease-in-out",
				...style
			},
			...props
		})]
	});
}
//#endregion
//#region resources/js/Components/ProductImagePlaceholder.tsx
/**
* Solid luxury background colors per category from the Ourélia brand palette:
* - Face Care: Rose poudré délicat (#F5E8E4)
* - Hair Care: Beige chaud réconfortant (#F4EBE1)
* - Perfumes: Crème noble / porcelaine (#F7F2EA)
* - Body & Bath: Nude lin apaisant (#F0ECE1)
* - Makeup: Rose poudré blush (#F4E5E2)
* - Solaire / Sun Care: Sable doré chaud (#F6EFE2)
* - Default: Nude intemporel (#F3EDE4)
*/
function getCategoryPlaceholderBg(category) {
	const c = (category || "").toLowerCase();
	if (c.includes("face") || c.includes("visage") || c.includes("rostro")) return "#F5E8E4";
	if (c.includes("hair") || c.includes("cheveux") || c.includes("cabello")) return "#F4EBE1";
	if (c.includes("perfume") || c.includes("parfum")) return "#F7F2EA";
	if (c.includes("body") || c.includes("corps") || c.includes("bain") || c.includes("cuerpo") || c.includes("bath")) return "#F0ECE1";
	if (c.includes("makeup") || c.includes("maquill")) return "#F4E5E2";
	if (c.includes("sun") || c.includes("solair") || c.includes("solar")) return "#F6EFE2";
	return "#F3EDE4";
}
/**
* Ultra-fine minimalist line art vector illustrations per category
*/
function CategoryLineArt({ category, size = "md" }) {
	const c = (category || "").toLowerCase();
	const dim = size === "sm" ? 44 : size === "lg" ? 96 : 72;
	const stroke = "#211A14";
	const strokeLight = "rgba(33, 26, 20, 0.45)";
	const gold = "#C2A063";
	if (c.includes("face") || c.includes("visage") || c.includes("rostro")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M47 16 C47 13, 53 13, 53 16 L53 22 L47 22 Z",
				stroke,
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "44",
				y: "22",
				width: "12",
				height: "4",
				rx: "1",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M46 26 L46 32 L54 32 L54 26",
				stroke,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M46 32 C38 34, 34 40, 34 50 L34 76 C34 82, 38 85, 50 85 C62 85, 66 82, 66 76 L66 50 C66 40, 62 34, 54 32",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M37 68 C42 67, 58 67, 63 68",
				stroke: strokeLight,
				strokeWidth: "1",
				strokeLinecap: "round",
				strokeDasharray: "2 3"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M50 42 C48 45, 46 48, 46 51 C46 54, 48 56, 50 56 C52 56, 54 54, 54 51 C54 48, 52 45, 50 42 Z",
				stroke: gold,
				strokeWidth: "1.2",
				fill: gold,
				fillOpacity: "0.15"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M69 36 C74 42, 75 50, 73 57",
				stroke: strokeLight,
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "74",
				cy: "35",
				r: "1",
				fill: gold
			})
		]
	});
	if (c.includes("hair") || c.includes("cheveux") || c.includes("cabello")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M39 18 L55 18 C58 18, 60 20, 60 23 L60 25 L46 25",
				stroke,
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M49 25 L49 32",
				stroke,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "43",
				y: "32",
				width: "14",
				height: "4",
				rx: "1",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M45 36 C40 38, 38 43, 38 52 L38 78 C38 83, 41 85, 50 85 C59 85, 62 83, 62 78 L62 52 C62 43, 60 38, 55 36",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M28 35 C32 46, 26 58, 30 72 C32 79, 36 84, 38 87",
				stroke: strokeLight,
				strokeWidth: "1.1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M72 40 C68 50, 74 62, 70 76 C68 83, 64 86, 62 88",
				stroke: strokeLight,
				strokeWidth: "1.1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M50 56 C50 50, 56 48, 56 48 C56 48, 56 54, 50 56 Z",
				stroke: gold,
				strokeWidth: "1",
				fill: gold,
				fillOpacity: "0.2"
			})
		]
	});
	if (c.includes("perfume") || c.includes("parfum")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "42",
				y: "15",
				width: "16",
				height: "14",
				rx: "1.5",
				stroke,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "44",
				y: "29",
				width: "12",
				height: "4",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M44 33 L28 39 C26 40, 25 42, 25 45 L25 78 C25 82, 28 85, 32 85 L68 85 C72 85, 75 82, 75 78 L75 45 C75 42, 74 40, 72 39 L56 33",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M33 44 L33 76 L67 76 L67 44",
				stroke: strokeLight,
				strokeWidth: "0.9",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "33",
				y1: "62",
				x2: "67",
				y2: "62",
				stroke: gold,
				strokeWidth: "0.9",
				strokeDasharray: "3 2"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "10",
				r: "1.2",
				fill: gold
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "38",
				cy: "8",
				r: "0.9",
				fill: strokeLight
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "62",
				cy: "8",
				r: "0.9",
				fill: strokeLight
			})
		]
	});
	if (c.includes("body") || c.includes("corps") || c.includes("bain") || c.includes("cuerpo") || c.includes("bath")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M26 36 C26 33, 29 31, 33 31 L67 31 C71 31, 74 33, 74 36 L74 41 L26 41 Z",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "27",
				y1: "39",
				x2: "73",
				y2: "39",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M28 41 L28 66 C28 76, 35 81, 50 81 C65 81, 72 76, 72 66 L72 41",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M20 72 C28 69, 36 75, 50 72 C64 69, 72 75, 80 72",
				stroke: strokeLight,
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M24 78 C32 75, 40 81, 50 78 C60 75, 68 81, 76 78",
				stroke: strokeLight,
				strokeWidth: "0.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M50 56 C50 49, 54 46, 54 46 C54 46, 54 52, 50 56 Z",
				stroke: gold,
				strokeWidth: "1",
				fill: gold,
				fillOpacity: "0.2"
			})
		]
	});
	if (c.includes("makeup") || c.includes("maquill")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M43 38 L43 28 C43 24, 49 18, 55 14 L57 18 L57 38",
				stroke,
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "43",
				y1: "28",
				x2: "57",
				y2: "18",
				stroke,
				strokeWidth: "1.1"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "41",
				y: "38",
				width: "18",
				height: "10",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "39",
				y: "48",
				width: "22",
				height: "36",
				rx: "2",
				stroke,
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "54",
				r: "32",
				stroke: strokeLight,
				strokeWidth: "0.9",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M68 28 L70 32 L74 34 L70 36 L68 40 L66 36 L62 34 L66 32 Z",
				fill: gold,
				fillOpacity: "0.6"
			})
		]
	});
	if (c.includes("sun") || c.includes("solair") || c.includes("solar")) return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "38",
				r: "26",
				stroke: strokeLight,
				strokeWidth: "0.9",
				strokeDasharray: "3 3"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "38",
				r: "4",
				stroke: gold,
				strokeWidth: "1.2",
				fill: gold,
				fillOpacity: "0.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M36 28 L64 28 C62 48, 58 66, 56 74 L44 74 C42 66, 38 48, 36 28 Z",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "35",
				y1: "28",
				x2: "65",
				y2: "28",
				stroke: gold,
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "42",
				y: "74",
				width: "16",
				height: "10",
				rx: "1",
				stroke,
				strokeWidth: "1.2"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		width: dim,
		height: dim,
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "43",
				y: "16",
				width: "14",
				height: "8",
				rx: "2",
				stroke,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "45",
				y: "24",
				width: "10",
				height: "4",
				stroke: gold,
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M45 28 C39 30, 36 36, 36 46 L36 76 C36 82, 40 85, 50 85 C60 85, 64 82, 64 76 L64 46 C64 36, 61 30, 55 28 Z",
				stroke,
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M50 70 C50 56, 52 46, 52 42",
				stroke,
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M51 58 C46 56, 44 51, 46 48 C49 48, 51 53, 51 58 Z",
				stroke: gold,
				strokeWidth: "0.9",
				fill: gold,
				fillOpacity: "0.25"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M51 49 C56 47, 58 42, 56 39 C53 39, 51 44, 51 49 Z",
				stroke,
				strokeWidth: "0.9"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "68",
				cy: "34",
				r: "1",
				fill: gold
			})
		]
	});
}
/**
* ProductImagePlaceholder
* Luxury minimalist brand placeholder for products with no image available
*/
function ProductImagePlaceholder({ category, productName, size = "md", className = "", style = {}, showBrand = true }) {
	let t = fr;
	try {
		const aurelia = useAurelia();
		if (aurelia?.t) t = aurelia.t;
	} catch (e) {}
	const bg = getCategoryPlaceholderBg(category);
	const message = t?.common?.visualComingSoon || t?.visualComingSoon || "Visuel bientôt disponible";
	const isSmall = size === "sm";
	const isLarge = size === "lg";
	const brandFontSize = isSmall ? "9px" : isLarge ? "13px" : "11px";
	const textFontSize = isSmall ? "8px" : isLarge ? "10.5px" : "9.5px";
	const textLetterSpacing = isSmall ? "0.12em" : "0.16em";
	return /* @__PURE__ */ jsxs("div", {
		className: `au-product-placeholder ${className}`,
		style: {
			backgroundColor: bg,
			position: "relative",
			width: "100%",
			height: "100%",
			minHeight: isSmall ? "64px" : isLarge ? "260px" : "180px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			padding: isSmall ? "8px 6px" : isLarge ? "28px 20px" : "18px 14px",
			boxSizing: "border-box",
			overflow: "hidden",
			userSelect: "none",
			boxShadow: "inset 0 0 0 1px rgba(33, 26, 20, 0.05)",
			...style
		},
		role: "img",
		"aria-label": `${productName ? productName + " - " : ""}${message}`,
		children: [
			showBrand && /* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: isSmall ? "4px" : "6px",
					marginBottom: isSmall ? "2px" : isLarge ? "14px" : "8px"
				},
				children: [/* @__PURE__ */ jsx("span", {
					style: {
						fontFamily: "'Cormorant Garamond', Georgia, serif",
						fontWeight: 600,
						fontSize: brandFontSize,
						letterSpacing: "0.22em",
						textTransform: "uppercase",
						color: "var(--au-ink, #211A14)",
						opacity: .82,
						lineHeight: 1
					},
					children: "Ourélia"
				}), /* @__PURE__ */ jsx("span", { style: {
					display: "inline-block",
					width: isSmall ? "10px" : "16px",
					height: "1px",
					backgroundColor: "var(--au-gold, #C2A063)",
					opacity: .7
				} })]
			}),
			/* @__PURE__ */ jsx("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flex: "0 0 auto",
					margin: isSmall ? "1px 0" : isLarge ? "8px 0" : "4px 0",
					transition: "transform 0.4s ease"
				},
				children: /* @__PURE__ */ jsx(CategoryLineArt, {
					category,
					size
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					marginTop: isSmall ? "4px" : isLarge ? "14px" : "8px",
					padding: "0 4px",
					textAlign: "center",
					fontFamily: "var(--au-font-sans, 'Jost', sans-serif)",
					fontWeight: 500,
					fontSize: textFontSize,
					letterSpacing: textLetterSpacing,
					textTransform: "uppercase",
					color: "var(--au-text-muted, #7E7267)",
					lineHeight: 1.35,
					maxWidth: "92%"
				},
				children: [
					"«\xA0",
					message,
					"\xA0»"
				]
			})
		]
	});
}
//#endregion
export { ImageWithLoader as n, ProductImagePlaceholder as t };
