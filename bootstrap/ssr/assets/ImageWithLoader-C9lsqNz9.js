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
export { ImageWithLoader as t };
