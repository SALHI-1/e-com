import { n as useAurelia, t as ClientLayout } from "./ClientLayout-C7YwqqfL.js";
import { t as Modal } from "./Modal-D5A3RQdx.js";
import { t as ProductImagePlaceholder } from "./ProductImagePlaceholder-Cn-w4Vxs.js";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
//#region resources/js/Pages/Profile/Edit.tsx
function Edit(props) {
	const pageProps = usePage().props;
	return /* @__PURE__ */ jsx(ClientLayout, {
		auth: props.auth || pageProps.auth,
		cartCount: props.cartCount || 0,
		children: /* @__PURE__ */ jsx(ProfileContent, { ...props })
	});
}
function ProfileContent({ mustVerifyEmail, status, orders = [] }) {
	const { auth } = usePage().props;
	const user = auth.user;
	const { t, lang } = useAurelia();
	const p = t.profilePage;
	const locale = lang === "eng" ? "en-US" : lang === "esp" ? "es-ES" : "fr-FR";
	const [activeTab, setActiveTab] = useState("orders");
	const infoForm = useForm({
		name: user.name || "",
		email: user.email || "",
		phone: user.phone || ""
	});
	const submitInfo = (e) => {
		e.preventDefault();
		infoForm.patch(route("profile.update"), { preserveScroll: true });
	};
	const currentPasswordRef = useRef(null);
	const newPasswordRef = useRef(null);
	const passwordForm = useForm({
		current_password: "",
		password: "",
		password_confirmation: ""
	});
	const submitPassword = (e) => {
		e.preventDefault();
		passwordForm.put(route("password.update"), {
			preserveScroll: true,
			onSuccess: () => passwordForm.reset(),
			onError: (err) => {
				if (err.password) {
					passwordForm.reset("password", "password_confirmation");
					newPasswordRef.current?.focus();
				}
				if (err.current_password) {
					passwordForm.reset("current_password");
					currentPasswordRef.current?.focus();
				}
			}
		});
	};
	const [confirmingDeletion, setConfirmingDeletion] = useState(false);
	const deletePasswordRef = useRef(null);
	const deleteForm = useForm({ password: "" });
	const submitDelete = (e) => {
		e.preventDefault();
		deleteForm.delete(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => setConfirmingDeletion(false),
			onError: () => deletePasswordRef.current?.focus(),
			onFinish: () => deleteForm.reset()
		});
	};
	const totalOrders = orders.length;
	const activeOrders = orders.filter((o) => o.status !== "reçu" && !o.status.includes("annulé")).length;
	const totalSpent = orders.reduce((sum, o) => sum + parseFloat(String(o.total_amount || 0)), 0).toFixed(2);
	const getStatusStyle = (statusKey) => {
		if (statusKey.includes("annulé")) return {
			bg: "#FEE2E2",
			color: "#991B1B",
			border: "#FECACA"
		};
		if (statusKey === "reçu") return {
			bg: "#D1FAE5",
			color: "#065F46",
			border: "#A7F3D0"
		};
		if (statusKey === "confirmé") return {
			bg: "#DBEAFE",
			color: "#1E40AF",
			border: "#BFDBFE"
		};
		if (statusKey === "livré") return {
			bg: "#EDE9FE",
			color: "#5B21B6",
			border: "#DDD6FE"
		};
		return {
			bg: "#FEF3C7",
			color: "#92400E",
			border: "#FDE68A"
		};
	};
	const userInitials = (user.name || "Client").split(" ").filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${p.title} · Ourélia` }), /* @__PURE__ */ jsxs("div", {
		className: "au-container au-profile-section",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "au-profile-header",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "au-profile-user-info",
					children: [/* @__PURE__ */ jsx("div", {
						className: "au-profile-avatar",
						children: userInitials
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "au-profile-name",
						children: p.welcomeBack(user.name)
					}), /* @__PURE__ */ jsxs("div", {
						className: "au-profile-meta",
						children: [
							/* @__PURE__ */ jsx("span", { children: user.email }),
							user.phone && /* @__PURE__ */ jsxs("span", { children: ["• ", user.phone] }),
							/* @__PURE__ */ jsx("span", {
								className: "au-profile-meta-tag",
								children: p.memberTag
							})
						]
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "au-profile-stats",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "au-profile-stat-box",
							children: [/* @__PURE__ */ jsx("div", {
								className: "au-profile-stat-val",
								children: totalOrders
							}), /* @__PURE__ */ jsx("div", {
								className: "au-profile-stat-lbl",
								children: p.tabOrders
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-profile-stat-box",
							children: [/* @__PURE__ */ jsx("div", {
								className: "au-profile-stat-val",
								children: activeOrders
							}), /* @__PURE__ */ jsx("div", {
								className: "au-profile-stat-lbl",
								children: p.activeOrdersLabel
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-profile-stat-box",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "au-profile-stat-val",
								style: { color: "var(--au-gold)" },
								children: [
									totalSpent,
									" ",
									/* @__PURE__ */ jsx("span", {
										style: { fontSize: "13px" },
										children: "DH"
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "au-profile-stat-lbl",
								children: p.orderTotal
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "au-profile-tabs",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `au-profile-tab-btn${activeTab === "orders" ? " is-active" : ""}`,
						onClick: () => setActiveTab("orders"),
						children: [
							/* @__PURE__ */ jsxs("svg", {
								width: "17",
								height: "17",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: 1.8,
								children: [/* @__PURE__ */ jsx("path", { d: "M6 8h12l-1 12H7L6 8z" }), /* @__PURE__ */ jsx("path", { d: "M9 8a3 3 0 0 1 6 0" })]
							}),
							/* @__PURE__ */ jsx("span", { children: p.tabOrders }),
							totalOrders > 0 && /* @__PURE__ */ jsx("span", {
								style: {
									background: activeTab === "orders" ? "var(--au-gold)" : "var(--au-border)",
									color: activeTab === "orders" ? "#fff" : "var(--au-text-muted)",
									fontSize: "11px",
									padding: "2px 7px",
									borderRadius: "999px",
									fontWeight: 600
								},
								children: totalOrders
							})
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `au-profile-tab-btn${activeTab === "info" ? " is-active" : ""}`,
						onClick: () => setActiveTab("info"),
						children: [/* @__PURE__ */ jsxs("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: 1.8,
							children: [/* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ jsx("circle", {
								cx: "12",
								cy: "7",
								r: "4"
							})]
						}), /* @__PURE__ */ jsx("span", { children: p.tabInfo })]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `au-profile-tab-btn${activeTab === "security" ? " is-active" : ""}`,
						onClick: () => setActiveTab("security"),
						children: [/* @__PURE__ */ jsxs("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: 1.8,
							children: [/* @__PURE__ */ jsx("rect", {
								x: "3",
								y: "11",
								width: "18",
								height: "11",
								rx: "2",
								ry: "2"
							}), /* @__PURE__ */ jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
						}), /* @__PURE__ */ jsx("span", { children: p.tabSecurity })]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `au-profile-tab-btn${activeTab === "danger" ? " is-active" : ""}`,
						onClick: () => setActiveTab("danger"),
						children: [/* @__PURE__ */ jsxs("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: 1.8,
							children: [
								/* @__PURE__ */ jsx("circle", {
									cx: "12",
									cy: "12",
									r: "10"
								}),
								/* @__PURE__ */ jsx("line", {
									x1: "15",
									y1: "9",
									x2: "9",
									y2: "15"
								}),
								/* @__PURE__ */ jsx("line", {
									x1: "9",
									y1: "9",
									x2: "15",
									y2: "15"
								})
							]
						}), /* @__PURE__ */ jsx("span", { children: p.tabDanger })]
					})
				]
			}),
			activeTab === "orders" && /* @__PURE__ */ jsx("div", { children: orders.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "au-profile-card",
				style: {
					textAlign: "center",
					padding: "64px 24px"
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						style: {
							width: "64px",
							height: "64px",
							margin: "0 auto 20px",
							borderRadius: "50%",
							background: "var(--au-bg)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "var(--au-gold)"
						},
						children: /* @__PURE__ */ jsxs("svg", {
							width: "30",
							height: "30",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: 1.5,
							children: [/* @__PURE__ */ jsx("path", { d: "M6 8h12l-1 12H7L6 8z" }), /* @__PURE__ */ jsx("path", { d: "M9 8a3 3 0 0 1 6 0" })]
						})
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "au-profile-card-title",
						children: p.noOrders
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-profile-card-desc",
						style: {
							maxWidth: "420px",
							margin: "0 auto 24px"
						},
						children: p.subtitle
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/#collection",
						className: "au-btn-gold",
						children: p.shopNow
					})
				]
			}) : /* @__PURE__ */ jsx("div", { children: orders.map((order) => {
				const badge = getStatusStyle(order.status);
				const statusDisplay = p.statusLabels[order.status] || order.status;
				const formattedDate = new Date(order.created_at).toLocaleDateString(locale, {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
				return /* @__PURE__ */ jsxs("div", {
					className: "au-order-card",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "au-order-top",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "au-order-top-left",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "au-order-id-row",
									children: [/* @__PURE__ */ jsx("span", {
										className: "au-order-num",
										children: order.order_number
									}), /* @__PURE__ */ jsx("span", {
										className: "au-order-status-badge",
										style: {
											backgroundColor: badge.bg,
											color: badge.color,
											border: `1px solid ${badge.border}`
										},
										children: statusDisplay
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "au-order-date",
									children: [
										p.orderDate,
										": ",
										formattedDate
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "au-order-top-right",
								children: [/* @__PURE__ */ jsx("span", {
									className: "au-order-total-lbl",
									children: p.orderTotal
								}), /* @__PURE__ */ jsxs("div", {
									className: "au-order-total-val",
									children: [
										order.total_amount,
										" ",
										/* @__PURE__ */ jsx("span", {
											style: { fontSize: "13px" },
											children: "DH"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-order-body",
							children: [order.items && order.items.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "au-order-items-list",
								children: order.items.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "au-order-item-row",
									children: [
										item.product?.image_url ? /* @__PURE__ */ jsx("img", {
											src: item.product.image_url,
											alt: item.product.name,
											className: "au-order-item-img"
										}) : /* @__PURE__ */ jsx(ProductImagePlaceholder, {
											category: item.product?.category?.name,
											productName: item.product?.name,
											size: "sm",
											className: "au-order-item-img"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "au-order-item-details",
											children: [/* @__PURE__ */ jsx("div", {
												className: "au-order-item-title",
												children: item.product?.name || p.productFallback
											}), /* @__PURE__ */ jsxs("div", {
												className: "au-order-item-sub",
												children: [/* @__PURE__ */ jsxs("span", { children: [
													item.quantity,
													" × ",
													item.unit_price,
													" DH"
												] }), item.is_preorder && /* @__PURE__ */ jsx("span", {
													className: "au-order-item-preorder",
													children: p.preorderBadge
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "au-order-item-price",
											children: [(item.quantity * item.unit_price).toFixed(2), " DH"]
										})
									]
								}, item.id))
							}), order.shipping_address && /* @__PURE__ */ jsxs("div", {
								className: "au-order-address-box",
								children: [
									/* @__PURE__ */ jsxs("strong", {
										style: { color: "var(--au-ink)" },
										children: [p.orderAddress, ":"]
									}),
									" ",
									order.shipping_address
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "au-order-footer",
							children: [/* @__PURE__ */ jsx("span", {
								className: "au-order-count",
								children: p.articlesCount(order.items?.length || 0)
							}), /* @__PURE__ */ jsxs("a", {
								href: route("profile.order.ticket", order.id),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "au-btn-ghost au-order-ticket-btn",
								children: [/* @__PURE__ */ jsx("svg", {
									width: "14",
									height: "14",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									})
								}), /* @__PURE__ */ jsx("span", { children: p.downloadTicket })]
							})]
						})
					]
				}, order.id);
			}) }) }),
			activeTab === "info" && /* @__PURE__ */ jsxs("div", {
				className: "au-profile-card",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "au-profile-card-title",
						children: p.infoTitle
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-profile-card-desc",
						children: p.infoSubtitle
					}),
					infoForm.recentlySuccessful && /* @__PURE__ */ jsx("div", {
						className: "au-flash au-flash-success",
						style: {
							background: "#D1FAE5",
							color: "#065F46",
							padding: "12px 16px",
							borderRadius: "6px",
							marginBottom: "20px",
							fontSize: "13px",
							fontWeight: 500,
							border: "1px solid #A7F3D0"
						},
						children: p.savedSuccess
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submitInfo,
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "1.25rem",
							maxWidth: "580px"
						},
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "au-label",
									htmlFor: "profile-name",
									children: [p.fullName, " *"]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "profile-name",
									type: "text",
									className: "au-input",
									value: infoForm.data.name,
									onChange: (e) => infoForm.setData("name", e.target.value),
									required: true
								}),
								infoForm.errors.name && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: infoForm.errors.name
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "au-label",
									htmlFor: "profile-email",
									children: [p.emailAddress, " *"]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "profile-email",
									type: "email",
									className: "au-input",
									value: infoForm.data.email,
									onChange: (e) => infoForm.setData("email", e.target.value),
									required: true
								}),
								infoForm.errors.email && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: infoForm.errors.email
								})
							] }),
							mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", {
								style: {
									background: "#FEF3C7",
									border: "1px solid #FDE68A",
									padding: "12px 16px",
									borderRadius: "6px",
									fontSize: "13px",
									color: "#92400E"
								},
								children: [
									/* @__PURE__ */ jsx("p", { children: p.emailUnverified }),
									/* @__PURE__ */ jsx(Link, {
										href: route("verification.send"),
										method: "post",
										as: "button",
										className: "au-auth-link",
										style: {
											marginTop: "6px",
											display: "inline-block"
										},
										children: p.resendVerification
									}),
									status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
										style: {
											marginTop: "6px",
											fontWeight: 600,
											color: "#065F46"
										},
										children: p.verificationSent
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "au-label",
									htmlFor: "profile-phone",
									children: p.phoneLabel
								}),
								/* @__PURE__ */ jsx("input", {
									id: "profile-phone",
									type: "tel",
									className: "au-input",
									placeholder: p.phonePlaceholder,
									value: infoForm.data.phone,
									onChange: (e) => infoForm.setData("phone", e.target.value)
								}),
								/* @__PURE__ */ jsx("p", {
									style: {
										fontSize: "11px",
										color: "var(--au-text-muted)",
										marginTop: "4px"
									},
									children: p.phoneHelp
								}),
								infoForm.errors.phone && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: infoForm.errors.phone
								})
							] }),
							/* @__PURE__ */ jsx("div", {
								style: { paddingTop: "8px" },
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: infoForm.processing,
									className: "au-btn-gold",
									children: infoForm.processing ? "..." : p.saveChanges
								})
							})
						]
					})
				]
			}),
			activeTab === "security" && /* @__PURE__ */ jsxs("div", {
				className: "au-profile-card",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "au-profile-card-title",
						children: p.securityTitle
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-profile-card-desc",
						children: p.securitySubtitle
					}),
					passwordForm.recentlySuccessful && /* @__PURE__ */ jsx("div", {
						className: "au-flash au-flash-success",
						style: {
							background: "#D1FAE5",
							color: "#065F46",
							padding: "12px 16px",
							borderRadius: "6px",
							marginBottom: "20px",
							fontSize: "13px",
							fontWeight: 500,
							border: "1px solid #A7F3D0"
						},
						children: p.passwordUpdated
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submitPassword,
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "1.25rem",
							maxWidth: "580px"
						},
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "au-label",
									htmlFor: "current-password",
									children: [p.currentPassword, " *"]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "current-password",
									ref: currentPasswordRef,
									type: "password",
									className: "au-input",
									value: passwordForm.data.current_password,
									onChange: (e) => passwordForm.setData("current_password", e.target.value),
									autoComplete: "current-password",
									required: true
								}),
								passwordForm.errors.current_password && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: passwordForm.errors.current_password
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "au-label",
									htmlFor: "new-password",
									children: [p.newPassword, " *"]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "new-password",
									ref: newPasswordRef,
									type: "password",
									className: "au-input",
									value: passwordForm.data.password,
									onChange: (e) => passwordForm.setData("password", e.target.value),
									autoComplete: "new-password",
									required: true
								}),
								passwordForm.errors.password && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: passwordForm.errors.password
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "au-label",
									htmlFor: "confirm-password",
									children: [p.confirmPassword, " *"]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "confirm-password",
									type: "password",
									className: "au-input",
									value: passwordForm.data.password_confirmation,
									onChange: (e) => passwordForm.setData("password_confirmation", e.target.value),
									autoComplete: "new-password",
									required: true
								}),
								passwordForm.errors.password_confirmation && /* @__PURE__ */ jsx("p", {
									className: "au-field-error",
									children: passwordForm.errors.password_confirmation
								})
							] }),
							/* @__PURE__ */ jsx("div", {
								style: { paddingTop: "8px" },
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: passwordForm.processing,
									className: "au-btn-gold",
									children: passwordForm.processing ? "..." : p.updatePassword
								})
							})
						]
					})
				]
			}),
			activeTab === "danger" && /* @__PURE__ */ jsxs("div", {
				className: "au-profile-card",
				style: {
					borderColor: "#FCA5A5",
					background: "#FFFDFD"
				},
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "au-profile-card-title",
						style: { color: "#991B1B" },
						children: p.dangerTitle
					}),
					/* @__PURE__ */ jsx("p", {
						className: "au-profile-card-desc",
						children: p.dangerSubtitle
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setConfirmingDeletion(true),
						style: {
							background: "#EF4444",
							color: "#fff",
							border: "none",
							padding: "12px 24px",
							borderRadius: "999px",
							fontFamily: "var(--au-font-sans)",
							fontSize: "12px",
							fontWeight: 600,
							letterSpacing: ".12em",
							textTransform: "uppercase",
							cursor: "pointer",
							transition: "background .2s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "#DC2626",
						onMouseLeave: (e) => e.currentTarget.style.background = "#EF4444",
						children: p.deleteAccountBtn
					}),
					/* @__PURE__ */ jsx(Modal, {
						show: confirmingDeletion,
						onClose: () => setConfirmingDeletion(false),
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: submitDelete,
							className: "p-6",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-bold",
									style: {
										color: "var(--au-ink)",
										marginBottom: "8px"
									},
									children: p.confirmModalTitle
								}),
								/* @__PURE__ */ jsx("p", {
									style: {
										fontSize: "13px",
										color: "var(--au-text-muted)",
										marginBottom: "20px"
									},
									children: p.confirmModalText
								}),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "au-label",
										htmlFor: "delete-password",
										children: p.currentPassword
									}),
									/* @__PURE__ */ jsx("input", {
										id: "delete-password",
										ref: deletePasswordRef,
										type: "password",
										className: "au-input",
										value: deleteForm.data.password,
										onChange: (e) => deleteForm.setData("password", e.target.value),
										placeholder: "••••••••",
										required: true
									}),
									deleteForm.errors.password && /* @__PURE__ */ jsx("p", {
										className: "au-field-error",
										children: deleteForm.errors.password
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									className: "au-modal-actions",
									style: {
										display: "flex",
										justifyContent: "flex-end",
										gap: "12px",
										marginTop: "24px"
									},
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setConfirmingDeletion(false),
										className: "au-btn-ghost au-modal-btn",
										style: {
											padding: "10px 20px",
											fontSize: "12px"
										},
										children: p.cancelBtn
									}), /* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: deleteForm.processing,
										className: "au-modal-btn",
										style: {
											background: "#EF4444",
											color: "#fff",
											border: "none",
											padding: "10px 22px",
											borderRadius: "999px",
											fontFamily: "var(--au-font-sans)",
											fontSize: "12px",
											fontWeight: 600,
											cursor: "pointer"
										},
										children: deleteForm.processing ? "..." : p.deleteAccountBtn
									})]
								})
							]
						})
					})
				]
			})
		]
	})] });
}
//#endregion
export { Edit as default };
