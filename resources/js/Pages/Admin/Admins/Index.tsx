import { FormEventHandler, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ admins }: { admins: any[] }) {
    const { auth } = usePage().props as any;
    const currentUser = auth.admin || auth.user;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<any>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_super_admin: false,
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

    const openEditModal = (admin: any) => {
        clearErrors();
        setEditingAdmin(admin);
        setData({
            name: admin.name,
            email: admin.email,
            password: '',
            password_confirmation: '',
            is_super_admin: admin.is_super_admin,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingAdmin(null);
        reset();
    };

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.admins.store'), {
            onSuccess: () => closeCreateModal(),
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.admins.update', editingAdmin.id), {
            onSuccess: () => closeEditModal(),
        });
    };

    const deleteAdmin = (admin: any) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
            router.delete(route('admin.admins.destroy', admin.id));
        }
    };

    return (
        <AdminLayout
            header={
                <h2 className="au-h3 text-[#0F204B]">
                    Gestion des Administrateurs
                </h2>
            }
        >
            <Head title="Administrateurs" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#0F204B]">Comptes Administrateurs</h3>
                            <PrimaryButton onClick={openCreateModal} className="bg-[#0F204B]">
                                + Nouvel Administrateur
                            </PrimaryButton>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Rôle</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date d'ajout</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {admins.map((admin) => (
                                        <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]">
                                                {admin.name}
                                                {currentUser?.id === admin.id && <span className="ml-2 text-xs font-normal text-gray-500">(Vous)</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {admin.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {admin.is_super_admin ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full bg-purple-50 text-purple-700">
                                                        Super Admin
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full bg-blue-50 text-blue-700">
                                                        Admin
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(admin.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                <button
                                                    onClick={() => openEditModal(admin)}
                                                    className="text-gray-400 hover:text-[#0F204B] transition-colors"
                                                    title="Modifier"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </button>
                                                {currentUser?.id !== admin.id && (
                                                    //faire un espace entre les boutons
                                                    <button
                                                        onClick={() => deleteAdmin(admin)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                                        title="Supprimer"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Création */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal} maxWidth="md">
                <form onSubmit={submitCreate} className="p-6">
                    <h2 className="text-lg font-bold text-[#0F204B]">Nouvel Administrateur</h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Nom complet" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                    </div>

                    <div className="block mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="is_super_admin"
                                checked={data.is_super_admin}
                                onChange={(e) => setData('is_super_admin', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Donner les privilèges de Super Administrateur</span>
                        </label>
                        <InputError className="mt-2" message={errors.is_super_admin} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeCreateModal}>Annuler</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-[#0F204B]" disabled={processing}>
                            Créer
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Modification */}
            <Modal show={isEditModalOpen} onClose={closeEditModal} maxWidth="md">
                <form onSubmit={submitEdit} className="p-6">
                    <h2 className="text-lg font-bold text-[#0F204B]">Modifier l'Administrateur</h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_name" value="Nom complet" />
                        <TextInput
                            id="edit_name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_email" value="Email" />
                        <TextInput
                            id="edit_email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-500 mb-2">Laissez vide si vous ne souhaitez pas modifier le mot de passe.</p>
                        <InputLabel htmlFor="edit_password" value="Nouveau mot de passe (optionnel)" />
                        <TextInput
                            id="edit_password"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_password_confirmation" value="Confirmer le nouveau mot de passe" />
                        <TextInput
                            id="edit_password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                    </div>

                    {currentUser?.id !== editingAdmin?.id && (
                        <div className="block mt-6">
                            <label className="flex items-center">
                                <Checkbox
                                    name="edit_is_super_admin"
                                    checked={data.is_super_admin}
                                    onChange={(e) => setData('is_super_admin', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Donner les privilèges de Super Administrateur</span>
                            </label>
                            <InputError className="mt-2" message={errors.is_super_admin} />
                        </div>
                    )}
                    {currentUser?.id === editingAdmin?.id && (
                        <p className="text-xs text-gray-500 mt-4 italic">Vous ne pouvez pas modifier votre propre rôle super admin d'ici.</p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeEditModal}>Annuler</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-[#0F204B]" disabled={processing}>
                            Enregistrer
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
