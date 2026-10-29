import { n as useGuestLang, t as Guest } from "./GuestLayout-BhrsokB9.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/Login.tsx
function LoginForm({ status, canResetPassword }) {
	const { t } = useGuestLang();
	const a = t.auth;
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("login"), { onFinish: () => reset("password") });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.loginTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.loginTitle
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
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						className: "au-label",
						htmlFor: "email",
						children: a.emailLabel
					}),
					/* @__PURE__ */ jsx("input", {
						id: "email",
						type: "email",
						value: data.email,
						onChange: (e) => setData("email", e.target.value),
						className: "au-input",
						autoComplete: "username",
						autoFocus: true
					}),
					errors.email && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.email
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						className: "au-label",
						htmlFor: "password",
						children: a.passwordLabel
					}),
					/* @__PURE__ */ jsx("input", {
						id: "password",
						type: "password",
						value: data.password,
						onChange: (e) => setData("password", e.target.value),
						className: "au-input",
						autoComplete: "current-password"
					}),
					errors.password && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.password
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "0.5rem"
					},
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: "au-checkbox",
						id: "remember",
						checked: data.remember,
						onChange: (e) => setData("remember", e.target.checked)
					}), /* @__PURE__ */ jsx("label", {
						htmlFor: "remember",
						style: {
							fontSize: "0.8rem",
							color: "var(--au-text-muted)",
							cursor: "pointer"
						},
						children: a.rememberMe
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "au-auth-action-row",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: "0.5rem"
					},
					children: [canResetPassword && /* @__PURE__ */ jsx(Link, {
						href: route("password.request"),
						className: "au-auth-link",
						children: a.forgotPasswordLink
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: processing,
						className: "au-btn-gold",
						style: { padding: "0.7rem 2rem" },
						children: processing ? a.loggingIn : a.loginBtn
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					style: {
						textAlign: "center",
						fontSize: "0.8rem",
						color: "var(--au-text-dim)",
						marginTop: "0.5rem"
					},
					children: [
						a.dontHaveAccount,
						" ",
						/* @__PURE__ */ jsx(Link, {
							href: route("register"),
							className: "au-auth-link",
							children: a.createAccountLink
						})
					]
				})
			]
		})
	] });
}
function Login(props) {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(LoginForm, { ...props }) });
}
//#endregion
export { Login as default };
