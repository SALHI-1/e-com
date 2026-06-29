import { t as Guest } from "./GuestLayout-CCZbzRNY.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/Register.tsx
function Register() {
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
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Créer un compte — Aurélia" }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: "Créer un compte"
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
						children: "Nom complet"
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
						children: "Email"
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
						children: "Mot de passe"
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
						children: "Confirmer le mot de passe"
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
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: "0.5rem"
					},
					children: [/* @__PURE__ */ jsx(Link, {
						href: route("login"),
						className: "au-auth-link",
						children: "Déjà un compte ?"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: processing,
						className: "au-btn-gold",
						style: { padding: "0.7rem 2rem" },
						children: processing ? "Création…" : "S'inscrire"
					})]
				})
			]
		})
	] });
}
//#endregion
export { Register as default };
