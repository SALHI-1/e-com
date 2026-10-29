import { n as useGuestLang, t as Guest } from "./GuestLayout-BhrsokB9.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/Register.tsx
function RegisterForm() {
	const { t } = useGuestLang();
	const a = t.auth;
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: ""
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("register"), { onFinish: () => reset("password", "password_confirmation") });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.registerTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.registerTitle
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
						htmlFor: "name",
						children: a.nameLabel
					}),
					/* @__PURE__ */ jsx("input", {
						id: "name",
						name: "name",
						type: "text",
						value: data.name,
						onChange: (e) => setData("name", e.target.value),
						className: "au-input",
						autoComplete: "name",
						autoFocus: true,
						required: true
					}),
					errors.name && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.name
					})
				] }),
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
						onChange: (e) => setData("email", e.target.value),
						className: "au-input",
						autoComplete: "username",
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
						onChange: (e) => setData("password", e.target.value),
						className: "au-input",
						autoComplete: "new-password",
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
						onChange: (e) => setData("password_confirmation", e.target.value),
						className: "au-input",
						autoComplete: "new-password",
						required: true
					}),
					errors.password_confirmation && /* @__PURE__ */ jsx("p", {
						className: "au-field-error",
						children: errors.password_confirmation
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
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
						children: a.alreadyHaveAccount
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: processing,
						className: "au-btn-gold",
						style: { padding: "0.7rem 2rem" },
						children: processing ? a.registering : a.registerBtn
					})]
				})
			]
		})
	] });
}
function Register() {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(RegisterForm, {}) });
}
//#endregion
export { Register as default };
