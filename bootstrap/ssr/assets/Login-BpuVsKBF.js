import { t as Guest } from "./GuestLayout-CCZbzRNY.js";
import { Head, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Login.tsx
function Login({ status }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("admin.login"), { onFinish: () => reset("password") });
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Administration — Aurélia" }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: "Administration"
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
						children: "Email Admin"
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
						children: "Mot de passe"
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
							color: "var(--cream-dim)",
							cursor: "pointer"
						},
						children: "Se souvenir de moi"
					})]
				}),
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
						children: processing ? "Connexion…" : "Accéder au panel"
					})
				})
			]
		})
	] });
}
//#endregion
export { Login as default };
