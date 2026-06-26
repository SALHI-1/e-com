import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Create({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        description: '',
        price: '',
        stock: '',
        volume: '',
        is_new: false,
        is_bestseller: false,
        image_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ajouter un produit</h2>}>
            <Head title="Ajouter un produit" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Nom du produit" />
                                <TextInput id="name" type="text" className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="category_id" value="Catégorie" />
                                <select id="category_id" className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required>
                                    <option value="" disabled>Sélectionner une catégorie</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea id="description" className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="price" value="Prix (€)" />
                                    <TextInput id="price" type="number" step="0.01" className="mt-1 block w-full" value={data.price} onChange={(e) => setData('price', e.target.value)} required />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <TextInput id="stock" type="number" className="mt-1 block w-full" value={data.stock} onChange={(e) => setData('stock', e.target.value)} required />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="volume" value="Volume (ex: ml, optionnel)" />
                                <TextInput id="volume" type="number" className="mt-1 block w-full" value={data.volume} onChange={(e) => setData('volume', e.target.value)} />
                                <InputError message={errors.volume} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image_url" value="URL de l'image (optionnel)" />
                                <TextInput id="image_url" type="text" className="mt-1 block w-full" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} />
                                <InputError message={errors.image_url} className="mt-2" />
                            </div>

                            <div className="flex space-x-6">
                                <label className="flex items-center">
                                    <Checkbox name="is_new" checked={data.is_new} onChange={(e) => setData('is_new', e.target.checked)} />
                                    <span className="ms-2 text-sm text-gray-600">Nouveau produit</span>
                                </label>
                                <label className="flex items-center">
                                    <Checkbox name="is_bestseller" checked={data.is_bestseller} onChange={(e) => setData('is_bestseller', e.target.checked)} />
                                    <span className="ms-2 text-sm text-gray-600">Bestseller</span>
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
