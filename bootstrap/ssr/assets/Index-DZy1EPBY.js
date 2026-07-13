import { n as Modal, t as SecondaryButton } from "./SecondaryButton-4U7GL1sF.js";
import { t as AdminLayout } from "./AdminLayout-B-B3bn_G.js";
import { t as InputLabel } from "./InputLabel-4-xi2Z9Z.js";
import { n as TextInput_default, t as InputError } from "./InputError-Dt1CqBgh.js";
import { t as Checkbox } from "./Checkbox-BUETY56Z.js";
import { t as PrimaryButton } from "./PrimaryButton-Dlx63LxW.js";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Admins/Index.tsx
function Index({ admins }) {
	const { auth } = usePage().props;
	const currentUser = auth.admin || auth.user;
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingAdmin, setEditingAdmin] = useState(null);
	const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		is_super_admin: false
	});
	const openCreateModal = () => {
		clearErrors();
		reset();
		setIsCreateModalOpen(true);
	};
	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
		reset();
	};
	const openEditModal = (admin) => {
		clearErrors();
		setEditingAdmin(admin);
		setData({
			name: admin.name,
			email: admin.email,
			password: "",
			password_confirmation: "",
			is_super_admin: admin.is_super_admin
		});
		setIsEditModalOpen(true);
	};
	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setEditingAdmin(null);
		reset();
	};
	const submitCreate = (e) => {
		e.preventDefault();
		post(route("admin.admins.store"), { onSuccess: () => closeCreateModal() });
	};
	const submitEdit = (e) => {
		e.preventDefault();
		put(route("admin.admins.update", editingAdmin.id), { onSuccess: () => closeEditModal() });
	};
	const deleteAdmin = (admin) => {
		if (confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?")) router.delete(route("admin.admins.destroy", admin.id));
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		header: /* @__PURE__ */ jsx("h2", {
			className: "au-h3 text-[#0F204B]",
			children: "Gestion des Administrateurs"
		}),
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Administrateurs" }),
			/* @__PURE__ */ jsx("div", {
				className: "py-12 bg-gray-50",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-6 bg-white border-b border-gray-100 flex justify-between items-center",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-[#0F204B]",
								children: "Comptes Administrateurs"
							}), /* @__PURE__ */ jsx(PrimaryButton, {
								onClick: openCreateModal,
								className: "bg-[#0F204B]",
								children: "+ Nouvel Administrateur"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "min-w-full divide-y divide-gray-100",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-gray-50/50",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Nom"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Email"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Rôle"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Date d'ajout"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ jsx("tbody", {
									className: "bg-white divide-y divide-gray-50",
									children: admins.map((admin) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-gray-50/50 transition-colors",
										children: [
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]",
												children: [admin.name, currentUser?.id === admin.id && /* @__PURE__ */ jsx("span", {
													className: "ml-2 text-xs font-normal text-gray-500",
													children: "(Vous)"
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
												children: admin.email
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm",
												children: admin.is_super_admin ? /* @__PURE__ */ jsx("span", {
													className: "px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full bg-purple-50 text-purple-700",
													children: "Super Admin"
												}) : /* @__PURE__ */ jsx("span", {
													className: "px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full bg-blue-50 text-blue-700",
													children: "Admin"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
												children: new Date(admin.created_at).toLocaleDateString()
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3",
												children: [/* @__PURE__ */ jsx("button", {
													onClick: () => openEditModal(admin),
													className: "text-gray-400 hover:text-[#0F204B] transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														fill: "none",
														viewBox: "0 0 24 24",
														strokeWidth: 1.5,
														stroke: "currentColor",
														className: "w-5 h-5",
														children: /* @__PURE__ */ jsx("path", {
															strokeLinecap: "round",
															strokeLinejoin: "round",
															d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
														})
													})
												}), currentUser?.id !== admin.id && /* @__PURE__ */ jsx("button", {
													onClick: () => deleteAdmin(admin),
													className: "text-gray-400 hover:text-red-600 transition-colors ml-2",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														fill: "none",
														viewBox: "0 0 24 24",
														strokeWidth: 1.5,
														stroke: "currentColor",
														className: "w-5 h-5",
														children: /* @__PURE__ */ jsx("path", {
															strokeLinecap: "round",
															strokeLinejoin: "round",
															d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
														})
													})
												})]
											})
										]
									}, admin.id))
								})]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Modal, {
				show: isCreateModalOpen,
				onClose: closeCreateModal,
				maxWidth: "md",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submitCreate,
					className: "p-6",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-[#0F204B]",
							children: "Nouvel Administrateur"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "name",
									value: "Nom complet"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "name",
									className: "mt-1 block w-full",
									value: data.name,
									onChange: (e) => setData("name", e.target.value),
									required: true,
									autoFocus: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.name
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "email",
									value: "Email"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "email",
									type: "email",
									className: "mt-1 block w-full",
									value: data.email,
									onChange: (e) => setData("email", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.email
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "password",
									value: "Mot de passe"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "password",
									type: "password",
									className: "mt-1 block w-full",
									value: data.password,
									onChange: (e) => setData("password", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.password
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "password_confirmation",
									value: "Confirmer le mot de passe"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "password_confirmation",
									type: "password",
									className: "mt-1 block w-full",
									value: data.password_confirmation,
									onChange: (e) => setData("password_confirmation", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.password_confirmation
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "block mt-6",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Checkbox, {
									name: "is_super_admin",
									checked: data.is_super_admin,
									onChange: (e) => setData("is_super_admin", e.target.checked)
								}), /* @__PURE__ */ jsx("span", {
									className: "ms-2 text-sm text-gray-600",
									children: "Donner les privilèges de Super Administrateur"
								})]
							}), /* @__PURE__ */ jsx(InputError, {
								className: "mt-2",
								message: errors.is_super_admin
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end",
							children: [/* @__PURE__ */ jsx(SecondaryButton, {
								onClick: closeCreateModal,
								children: "Annuler"
							}), /* @__PURE__ */ jsx(PrimaryButton, {
								className: "ms-3 bg-[#0F204B]",
								disabled: processing,
								children: "Créer"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(Modal, {
				show: isEditModalOpen,
				onClose: closeEditModal,
				maxWidth: "md",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submitEdit,
					className: "p-6",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-[#0F204B]",
							children: "Modifier l'Administrateur"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "edit_name",
									value: "Nom complet"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "edit_name",
									className: "mt-1 block w-full",
									value: data.name,
									onChange: (e) => setData("name", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.name
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "edit_email",
									value: "Email"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "edit_email",
									type: "email",
									className: "mt-1 block w-full",
									value: data.email,
									onChange: (e) => setData("email", e.target.value),
									required: true
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.email
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 border-t border-gray-100 pt-4",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 mb-2",
									children: "Laissez vide si vous ne souhaitez pas modifier le mot de passe."
								}),
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "edit_password",
									value: "Nouveau mot de passe (optionnel)"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "edit_password",
									type: "password",
									className: "mt-1 block w-full",
									value: data.password,
									onChange: (e) => setData("password", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.password
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "edit_password_confirmation",
									value: "Confirmer le nouveau mot de passe"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "edit_password_confirmation",
									type: "password",
									className: "mt-1 block w-full",
									value: data.password_confirmation,
									onChange: (e) => setData("password_confirmation", e.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, {
									className: "mt-2",
									message: errors.password_confirmation
								})
							]
						}),
						currentUser?.id !== editingAdmin?.id && /* @__PURE__ */ jsxs("div", {
							className: "block mt-6",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Checkbox, {
									name: "edit_is_super_admin",
									checked: data.is_super_admin,
									onChange: (e) => setData("is_super_admin", e.target.checked)
								}), /* @__PURE__ */ jsx("span", {
									className: "ms-2 text-sm text-gray-600",
									children: "Donner les privilèges de Super Administrateur"
								})]
							}), /* @__PURE__ */ jsx(InputError, {
								className: "mt-2",
								message: errors.is_super_admin
							})]
						}),
						currentUser?.id === editingAdmin?.id && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500 mt-4 italic",
							children: "Vous ne pouvez pas modifier votre propre rôle super admin d'ici."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end",
							children: [/* @__PURE__ */ jsx(SecondaryButton, {
								onClick: closeEditModal,
								children: "Annuler"
							}), /* @__PURE__ */ jsx(PrimaryButton, {
								className: "ms-3 bg-[#0F204B]",
								disabled: processing,
								children: "Enregistrer"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as default };
