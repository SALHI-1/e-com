import { i as ApplicationLogo, n as NavLink, r as Dropdown, t as ResponsiveNavLink } from "./ResponsiveNavLink-Tbv55d25.js";
import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Layouts/AdminLayout.tsx
function AdminLayout({ header, children }) {
	const user = usePage().props.auth.user;
	const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-100",
		children: [
			/* @__PURE__ */ jsxs("nav", {
				className: "border-b border-gray-100 bg-white",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex h-16 justify-between",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex shrink-0 items-center",
									children: /* @__PURE__ */ jsx(Link, {
										href: "/admin/dashboard",
										children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto fill-current text-gray-800" })
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "hidden space-x-8 sm:-my-px sm:ms-10 sm:flex",
									children: [
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.dashboard"),
											active: route().current("admin.dashboard"),
											children: "Tableau de bord"
										}),
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.products.index"),
											active: route().current("admin.products.*"),
											children: "Produits"
										}),
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.orders.index"),
											active: route().current("admin.orders.*"),
											children: "Commandes"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hidden sm:ms-6 sm:flex sm:items-center",
								children: /* @__PURE__ */ jsx("div", {
									className: "relative ms-3",
									children: /* @__PURE__ */ jsxs(Dropdown, { children: [/* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", {
										className: "inline-flex rounded-md",
										children: /* @__PURE__ */ jsxs("button", {
											type: "button",
											className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
											children: [user?.name || "Admin", /* @__PURE__ */ jsx("svg", {
												className: "-me-0.5 ms-2 h-4 w-4",
												xmlns: "http://www.w3.org/2000/svg",
												viewBox: "0 0 20 20",
												fill: "currentColor",
												children: /* @__PURE__ */ jsx("path", {
													fillRule: "evenodd",
													d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
													clipRule: "evenodd"
												})
											})]
										})
									}) }), /* @__PURE__ */ jsx(Dropdown.Content, { children: /* @__PURE__ */ jsx(Dropdown.Link, {
										href: route("admin.logout"),
										method: "post",
										as: "button",
										children: "Déconnexion"
									}) })] })
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "-me-2 flex items-center sm:hidden",
								children: /* @__PURE__ */ jsx("button", {
									onClick: () => setShowingNavigationDropdown((previousState) => !previousState),
									className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none",
									children: /* @__PURE__ */ jsxs("svg", {
										className: "h-6 w-6",
										stroke: "currentColor",
										fill: "none",
										viewBox: "0 0 24 24",
										children: [/* @__PURE__ */ jsx("path", {
											className: !showingNavigationDropdown ? "inline-flex" : "hidden",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											d: "M4 6h16M4 12h16M4 18h16"
										}), /* @__PURE__ */ jsx("path", {
											className: showingNavigationDropdown ? "inline-flex" : "hidden",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											d: "M6 18L18 6M6 6l12 12"
										})]
									})
								})
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-1 pb-3 pt-2",
						children: [
							/* @__PURE__ */ jsx(ResponsiveNavLink, {
								href: route("admin.dashboard"),
								active: route().current("admin.dashboard"),
								children: "Tableau de bord"
							}),
							/* @__PURE__ */ jsx(ResponsiveNavLink, {
								href: route("admin.products.index"),
								active: route().current("admin.products.*"),
								children: "Produits"
							}),
							/* @__PURE__ */ jsx(ResponsiveNavLink, {
								href: route("admin.orders.index"),
								active: route().current("admin.orders.*"),
								children: "Commandes"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border-t border-gray-200 pb-1 pt-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "px-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-base font-medium text-gray-800",
								children: user?.name
							}), /* @__PURE__ */ jsx("div", {
								className: "text-sm font-medium text-gray-500",
								children: user?.email
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-3 space-y-1",
							children: /* @__PURE__ */ jsx(ResponsiveNavLink, {
								method: "post",
								href: route("admin.logout"),
								as: "button",
								children: "Déconnexion"
							})
						})]
					})]
				})]
			}),
			header && /* @__PURE__ */ jsx("header", {
				className: "bg-white shadow",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
					children: header
				})
			}),
			/* @__PURE__ */ jsx("main", { children })
		]
	});
}
//#endregion
export { AdminLayout as t };
