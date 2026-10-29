import { jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
//#region resources/js/Components/InputLabel.tsx
function InputLabel({ value, className = "", children, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		...props,
		className: `block text-sm font-medium text-gray-700 ` + className,
		children: value ? value : children
	});
}
//#endregion
//#region resources/js/Components/TextInput.tsx
var TextInput_default = forwardRef(function TextInput({ type = "text", className = "", isFocused = false, ...props }, ref) {
	const localRef = useRef(null);
	useImperativeHandle(ref, () => ({ focus: () => localRef.current?.focus() }));
	useEffect(() => {
		if (isFocused) localRef.current?.focus();
	}, [isFocused]);
	return /* @__PURE__ */ jsx("input", {
		...props,
		type,
		className: "rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 " + className,
		ref: localRef
	});
});
//#endregion
export { InputLabel as n, TextInput_default as t };
