import { n as useGuestLang, t as Guest } from "./GuestLayout-Bq3z4XbT.js";
import { Head, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/ConfirmPassword.tsx
function ConfirmPasswordForm() {
	const { t } = useGuestLang();
	const a = t.auth;
	const { data, setData, post, processing, errors, reset } = useForm({ password: "" });
	const submit = (e) => {
		e.preventDefault();
		post(route("password.confirm"), { onFinish: () => reset("password") });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.confirmPasswordTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.confirmPasswordTitle
		}),
		/* @__PURE__ */ jsx("p", {
			style: {
				fontSize: "0.875rem",
				color: "var(--au-text-muted)",
				marginBottom: "1.25rem",
				lineHeight: 1.6
			},
			children: a.confirmPasswordText
		}),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			style: {
				display: "flex",
				flexDirection: "column",
				gap: "1.1rem"
			},
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("label", {
					className: "au-label",
					htmlFor: "password",
					children: a.passwordLabel
				}),
				/* @__PURE__ */ jsx("input", {
					id: "password",
					type: "password",
					name: "password",
					value: data.password,
					className: "au-input",
					autoComplete: "current-password",
					autoFocus: true,
					onChange: (e) => setData("password", e.target.value),
					required: true
				}),
				errors.password && /* @__PURE__ */ jsx("p", {
					className: "au-field-error",
					children: errors.password
				})
			] }), /* @__PURE__ */ jsx("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					marginTop: "0.5rem"
				},
				children: /* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: processing,
					className: "au-btn-gold",
					style: { padding: "0.7rem 2rem" },
					children: processing ? a.loggingIn : a.confirmBtn
				})
			})]
		})
	] });
}
function ConfirmPassword() {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(ConfirmPasswordForm, {}) });
}
//#endregion
export { ConfirmPassword as default };
