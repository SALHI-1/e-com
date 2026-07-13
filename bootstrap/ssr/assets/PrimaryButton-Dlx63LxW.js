import { jsx } from "react/jsx-runtime";
//#region resources/js/Components/PrimaryButton.tsx
function PrimaryButton({ className = "", disabled, children, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		...props,
		className: `au-btn ${disabled && "opacity-25"} ` + className,
		disabled,
		children
	});
}
//#endregion
export { PrimaryButton as t };
