import { n as useGuestLang, t as Guest } from "./GuestLayout-BhrsokB9.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/VerifyEmail.tsx
function VerifyEmailContent({ status }) {
	const { t } = useGuestLang();
	const a = t.auth;
	const { post, processing } = useForm({});
	const submit = (e) => {
		e.preventDefault();
		post(route("verification.send"));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${a.verifyEmailTitle} — Aurélia` }),
		/* @__PURE__ */ jsx("h2", {
			className: "au-auth-title",
			children: a.verifyEmailTitle
		}),
		/* @__PURE__ */ jsx("p", {
			style: {
				fontSize: "0.875rem",
				color: "var(--au-text-muted)",
				marginBottom: "1.25rem",
				lineHeight: 1.6
			},
			children: a.verifyEmailText
		}),
		status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
			className: "au-flash au-flash-success",
			style: { margin: "0 0 1rem" },
			children: a.verifyEmailSent
		}),
		/* @__PURE__ */ jsx("form", {
			onSubmit: submit,
			children: /* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: "1rem"
				},
				children: [/* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: processing,
					className: "au-btn-gold",
					style: { padding: "0.7rem 1.5rem" },
					children: processing ? a.loggingIn : a.resendVerificationEmail
				}), /* @__PURE__ */ jsx(Link, {
					href: route("logout"),
					method: "post",
					as: "button",
					className: "au-auth-link",
					children: a.logout
				})]
			})
		})
	] });
}
function VerifyEmail(props) {
	return /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(VerifyEmailContent, { ...props }) });
}
//#endregion
export { VerifyEmail as default };
