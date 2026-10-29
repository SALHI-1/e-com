import { n as useGuestLang, t as Guest } from "./GuestLayout-BhrsokB9.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/ForgotPassword.tsx
function ForgotPasswordContent({ status }) {
	const { t } = useGuestLang();
	const a = t.auth;
	const { data, setData, post, processing, errors } = useForm({ email: "" });
	const submit = (e) => {
		e.preventDefault();
		post(route("password.email"));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.forgotPasswordTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.forgotPasswordTitle
		}),
		/* @__PURE__ */ jsx("p", {
			style: {
				fontSize: "0.875rem",
				color: "var(--au-text-muted)",
				marginBottom: "1.25rem",
				lineHeight: 1.6
			},
			children: a.forgotPasswordText
		}),
		status && /* @__PURE__ */ jsx("div", {
			className: "au-flash au-flash-success",
			style: { margin: "0 0 1rem" },
			children: status
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
					htmlFor: "email",
					children: a.emailLabel
				}),
				/* @__PURE__ */ jsx("input", {
					id: "email",
					type: "email",
					name: "email",
					value: data.email,
					onChange: (e) => setData("email", e.target.value),
					className: "au-input",
					autoComplete: "username",
					autoFocus: true,
					required: true
				}),
				errors.email && /* @__PURE__ */ jsx("p", {
					className: "au-field-error",
					children: errors.email
				})
			] }), /* @__PURE__ */ jsxs("div", {
				className: "au-auth-action-row",
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: "0.5rem"
				},
				children: [/* @__PURE__ */ jsx(Link, {
					href: route("login"),
					className: "au-auth-link",
					children: a.loginBtn
				}), /* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: processing,
					className: "au-btn-gold",
					style: { padding: "0.7rem 1.5rem" },
					children: processing ? a.loggingIn : a.sendResetLink
				})]
			})]
		})
	] });
}
function ForgotPassword(props) {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(ForgotPasswordContent, { ...props }) });
}
//#endregion
export { ForgotPassword as default };
