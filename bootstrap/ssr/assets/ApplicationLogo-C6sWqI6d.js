import { jsx } from "react/jsx-runtime";
//#region resources/js/Components/ApplicationLogo.tsx
function ApplicationLogo(props) {
	return /* @__PURE__ */ jsx("img", {
		...props,
		src: "/favicon.png",
		alt: "Logo"
	});
}
//#endregion
export { ApplicationLogo as t };
