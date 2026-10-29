import { t as ApplicationLogo } from "./ApplicationLogo-C6sWqI6d.js";
import { t as Ke } from "./transition-MXKqs4Qd.js";
import { Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
//#region resources/js/Components/Dropdown.tsx
var DropDownContext = createContext({
	open: false,
	setOpen: () => {},
	toggleOpen: () => {}
});
var Dropdown = ({ children }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => {
		setOpen((previousState) => !previousState);
	};
	return /* @__PURE__ */ jsx(DropDownContext.Provider, {
		value: {
			open,
			setOpen,
			toggleOpen
		},
		children: /* @__PURE__ */ jsx("div", {
			className: "relative",
			children
		})
	});
};
var Trigger = ({ children }) => {
	const { open, setOpen, toggleOpen } = useContext(DropDownContext);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		onClick: toggleOpen,
		children
	}), open && /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-40",
		onClick: () => setOpen(false)
	})] });
};
var Content = ({ align = "right", width = "48", contentClasses = "py-1 bg-white", children }) => {
	const { open, setOpen } = useContext(DropDownContext);
	let alignmentClasses = "origin-top";
	if (align === "left") alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
	else if (align === "right") alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
	let widthClasses = "";
	if (width === "48") widthClasses = "w-48";
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Ke, {
		show: open,
		enter: "transition ease-out duration-200",
		enterFrom: "opacity-0 scale-95",
		enterTo: "opacity-100 scale-100",
		leave: "transition ease-in duration-75",
		leaveFrom: "opacity-100 scale-100",
		leaveTo: "opacity-0 scale-95",
		children: /* @__PURE__ */ jsx("div", {
			className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
			onClick: () => setOpen(false),
			children: /* @__PURE__ */ jsx("div", {
				className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses,
				children
			})
		})
	}) });
};
var DropdownLink = ({ className = "", children, ...props }) => {
	return /* @__PURE__ */ jsx(Link, {
		...props,
		className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none " + className,
		children
	});
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
//#endregion
//#region resources/js/Components/NavLink.tsx
function NavLink({ active = false, className = "", children, ...props }) {
	return /* @__PURE__ */ jsx(Link, {
		...props,
		className: "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-gray-800 text-gray-900 focus:border-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") + className,
		children
	});
}
//#endregion
//#region resources/js/Components/ResponsiveNavLink.tsx
function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
	return /* @__PURE__ */ jsx(Link, {
		...props,
		className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-gray-800 bg-gray-50 text-gray-800 focus:border-gray-900 focus:bg-gray-100 focus:text-gray-900" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
		children
	});
}
//#endregion
//#region resources/js/Layouts/AdminLayout.tsx
function AdminLayout({ header, children }) {
	const pageProps = usePage().props;
	const user = pageProps.auth?.admin || pageProps.auth?.user;
	const flashSuccess = pageProps.flash?.success;
	const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setShowingNavigationDropdown(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	useEffect(() => {
		if (showingNavigationDropdown) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [showingNavigationDropdown]);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900",
		children: [
			/* @__PURE__ */ jsx("nav", {
				className: "sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex h-16 justify-between items-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 sm:hidden",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowingNavigationDropdown(true),
									"aria-label": "Open navigation menu",
									className: "inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300",
									children: /* @__PURE__ */ jsx("svg", {
										className: "h-6 w-6",
										stroke: "currentColor",
										fill: "none",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											d: "M4 6h16M4 12h16M4 18h16"
										})
									})
								}), /* @__PURE__ */ jsxs(Link, {
									href: "/admin/dashboard",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-7 w-auto" }), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-serif tracking-widest text-xs font-semibold text-[#0F204B] uppercase leading-none",
											children: "Ourélia"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[8px] font-sans font-bold uppercase tracking-wider text-amber-700 mt-0.5",
											children: "Admin"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden sm:flex sm:items-center",
								children: [/* @__PURE__ */ jsxs(Link, {
									href: "/admin/dashboard",
									className: "flex items-center gap-2.5 group",
									children: [/* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-8 w-auto transition-transform group-hover:scale-105" }), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-serif tracking-widest text-sm font-semibold text-[#0F204B] uppercase leading-none",
											children: "Ourélia"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[9px] font-sans font-bold uppercase tracking-wider text-amber-700 mt-0.5",
											children: "Admin Panel"
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-x-6 lg:space-x-8 sm:-my-px sm:ms-8 flex",
									children: [
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.dashboard"),
											active: route().current("admin.dashboard"),
											children: "Dashboard"
										}),
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.products.index"),
											active: route().current("admin.products.*"),
											children: "Products"
										}),
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.orders.index"),
											active: route().current("admin.orders.index"),
											children: "Orders Kanban"
										}),
										/* @__PURE__ */ jsx(NavLink, {
											href: route("admin.orders.list"),
											active: route().current("admin.orders.list"),
											children: "Orders List"
										}),
										user?.is_super_admin && /* @__PURE__ */ jsx(NavLink, {
											href: route("admin.admins.index"),
											active: route().current("admin.admins.*"),
											children: "Administrators"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden sm:flex sm:items-center sm:gap-3",
								children: [/* @__PURE__ */ jsxs("a", {
									href: "/",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors",
									title: "Open customer storefront in a new tab",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-3.5 h-3.5 text-gray-500",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										})
									}), "Storefront"]
								}), /* @__PURE__ */ jsx("div", {
									className: "relative",
									children: /* @__PURE__ */ jsxs(Dropdown, { children: [/* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										className: "inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "w-6 h-6 rounded-full bg-[#0F204B] text-white flex items-center justify-center text-xs font-bold mr-2",
												children: user?.name ? user.name.charAt(0).toUpperCase() : "A"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "max-w-[120px] truncate",
												children: user?.name || "Admin"
											}),
											/* @__PURE__ */ jsx("svg", {
												className: "-me-0.5 ms-2 h-4 w-4 text-gray-400",
												xmlns: "http://www.w3.org/2000/svg",
												viewBox: "0 0 20 20",
												fill: "currentColor",
												children: /* @__PURE__ */ jsx("path", {
													fillRule: "evenodd",
													d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
													clipRule: "evenodd"
												})
											})
										]
									}) }), /* @__PURE__ */ jsxs(Dropdown.Content, { children: [/* @__PURE__ */ jsxs("div", {
										className: "px-4 py-2 border-b border-gray-100 text-xs text-gray-500",
										children: [
											"Signed in as ",
											/* @__PURE__ */ jsx("strong", {
												className: "text-gray-800",
												children: user?.email
											}),
											user?.is_super_admin && /* @__PURE__ */ jsx("span", {
												className: "block mt-0.5 text-[10px] font-bold text-purple-700",
												children: "Super Administrator"
											})
										]
									}), /* @__PURE__ */ jsx(Dropdown.Link, {
										href: route("admin.logout"),
										method: "post",
										as: "button",
										className: "text-red-600 hover:bg-red-50",
										children: "Log Out"
									})] })] })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1 sm:hidden",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100",
									title: "View Storefront",
									children: /* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										})
									})
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowingNavigationDropdown(true),
									className: "w-8 h-8 rounded-full bg-[#0F204B] text-white flex items-center justify-center text-xs font-bold",
									title: "Open navigation",
									children: user?.name ? user.name.charAt(0).toUpperCase() : "A"
								})]
							})
						]
					})
				})
			}),
			showingNavigationDropdown && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 bg-black/60 z-50 sm:hidden transition-opacity",
				onClick: () => setShowingNavigationDropdown(false),
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-200 ease-in-out sm:hidden flex flex-col justify-between overflow-y-auto border-r border-gray-200 ${showingNavigationDropdown ? "translate-x-0" : "-translate-x-full"}`,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Navigation menu",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "h-16 px-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10",
					children: [/* @__PURE__ */ jsxs(Link, {
						href: "/admin/dashboard",
						onClick: () => setShowingNavigationDropdown(false),
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-7 w-auto" }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-serif tracking-widest text-sm font-semibold text-[#0F204B] uppercase leading-none",
								children: "Ourélia"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[9px] font-sans font-bold uppercase tracking-wider text-amber-700 mt-0.5",
								children: "Admin Panel"
							})]
						})]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setShowingNavigationDropdown(false),
						"aria-label": "Close menu",
						className: "p-2 -mr-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none",
						children: /* @__PURE__ */ jsx("svg", {
							className: "w-5 h-5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M6 18L18 6M6 6l12 12"
							})
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "py-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "px-4 pb-2 mb-1 flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold uppercase tracking-wider text-gray-400",
								children: "Navigation"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700",
								children: "Admin"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-0.5",
							children: [
								/* @__PURE__ */ jsxs(ResponsiveNavLink, {
									href: route("admin.dashboard"),
									active: route().current("admin.dashboard"),
									onClick: () => setShowingNavigationDropdown(false),
									className: "flex items-center gap-3 px-4 py-3",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 opacity-70 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										})
									}), /* @__PURE__ */ jsx("span", { children: "Dashboard" })]
								}),
								/* @__PURE__ */ jsxs(ResponsiveNavLink, {
									href: route("admin.products.index"),
									active: route().current("admin.products.*"),
									onClick: () => setShowingNavigationDropdown(false),
									className: "flex items-center gap-3 px-4 py-3",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 opacity-70 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
										})
									}), /* @__PURE__ */ jsx("span", { children: "Products" })]
								}),
								/* @__PURE__ */ jsxs(ResponsiveNavLink, {
									href: route("admin.orders.index"),
									active: route().current("admin.orders.index"),
									onClick: () => setShowingNavigationDropdown(false),
									className: "flex items-center gap-3 px-4 py-3",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 opacity-70 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
										})
									}), /* @__PURE__ */ jsx("span", { children: "Orders Kanban" })]
								}),
								/* @__PURE__ */ jsxs(ResponsiveNavLink, {
									href: route("admin.orders.list"),
									active: route().current("admin.orders.list"),
									onClick: () => setShowingNavigationDropdown(false),
									className: "flex items-center gap-3 px-4 py-3",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 opacity-70 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
										})
									}), /* @__PURE__ */ jsx("span", { children: "Orders List" })]
								}),
								user?.is_super_admin && /* @__PURE__ */ jsxs(ResponsiveNavLink, {
									href: route("admin.admins.index"),
									active: route().current("admin.admins.*"),
									onClick: () => setShowingNavigationDropdown(false),
									className: "flex items-center gap-3 px-4 py-3",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 opacity-70 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										})
									}), /* @__PURE__ */ jsx("span", { children: "Administrators" })]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pt-3 px-4",
							children: /* @__PURE__ */ jsxs("a", {
								href: "/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",
								children: [/* @__PURE__ */ jsx("svg", {
									className: "w-4 h-4 text-gray-500",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									})
								}), /* @__PURE__ */ jsx("span", { children: "View Storefront" })]
							})
						})
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "border-t border-gray-200 p-4 bg-gray-50",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-9 h-9 rounded-full bg-[#0F204B] text-white flex items-center justify-center font-bold text-sm shrink-0",
							children: user?.name ? user.name.charAt(0).toUpperCase() : "A"
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-gray-900 truncate",
									children: user?.name || "Administrator"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-xs text-gray-500 truncate",
									children: user?.email
								}),
								user?.is_super_admin && /* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-bold text-purple-700 uppercase tracking-wide",
									children: "Super Admin"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs(ResponsiveNavLink, {
						method: "post",
						href: route("admin.logout"),
						as: "button",
						className: "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-white border border-gray-200 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors shadow-xs",
						children: [/* @__PURE__ */ jsx("svg", {
							className: "w-4 h-4",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							})
						}), /* @__PURE__ */ jsx("span", { children: "Log Out" })]
					})]
				})]
			}),
			header && /* @__PURE__ */ jsx("header", {
				className: "bg-white border-b border-gray-200/80 shadow-xs",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 py-3 sm:py-5 sm:px-6 lg:px-8",
					children: header
				})
			}),
			flashSuccess && /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-7xl w-full px-4 pt-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg bg-green-50 p-3.5 sm:p-4 border border-green-200 text-sm text-green-800 flex items-center gap-3 shadow-xs",
					children: [/* @__PURE__ */ jsx("svg", {
						className: "w-5 h-5 text-green-600 shrink-0",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M5 13l4 4L19 7"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: flashSuccess
					})]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1 w-full",
				children
			})
		]
	});
}
//#endregion
export { AdminLayout as t };
