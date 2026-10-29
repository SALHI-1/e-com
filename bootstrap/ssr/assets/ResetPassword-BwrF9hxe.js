import { n as useGuestLang, t as Guest } from "./GuestLayout-BhrsokB9.js";
import { Head, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/ResetPassword.tsx
function ResetPasswordForm({ token, email }) {
	const { t } = useGuestLang();
	const a = t.auth;
	const { data, setData, post, processing, errors, reset } = useForm({
		token,
		email,
		password: "",
		password_confirmation: ""
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("password.store"), { onFinish: () => reset("password", "password_confirmation") });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.resetPasswordTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.resetPasswordTitle
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
						name: "email",
						value: data.email,
						className: "au-input",
						autoComplete: "username",
						onChange: (e) => setData("email", e.target.value),
						required: true
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
						name: "password",
						value: data.password,
						className: "au-input",
						autoComplete: "new-password",
						autoFocus: true,
						onChange: (e) => setData("password", e.target.value),
						required: true
					}),
					errors.password && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.password
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						className: "au-label",
						htmlFor: "password_confirmation",
						children: a.confirmPasswordLabel
					}),
					/* @__PURE__ */ jsx("input", {
						id: "password_confirmation",
						type: "password",
						name: "password_confirmation",
						value: data.password_confirmation,
						className: "au-input",
						autoComplete: "new-password",
						onChange: (e) => setData("password_confirmation", e.target.value),
						required: true
					}),
					errors.password_confirmation && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.password_confirmation
					})
				] }),
				/* @__PURE__ */ jsx("div", {
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
						children: processing ? a.loggingIn : a.resetPasswordBtn
					})
				})
			]
		})
	] });
}
function ResetPassword(props) {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(ResetPasswordForm, { ...props }) });
}
//#endregion
export { ResetPassword as default };
