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
        brand: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        description: '',
        price: '',
        stock: '',
        volume: '',
        is_new: false,
        // is_new: false,
        is_bestseller: false,
        image: null as File | null,
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
                                <InputLabel htmlFor="brand" value="Marque (optionnel)" />
                                <TextInput id="brand" type="text" className="mt-1 block w-full" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                                <InputError message={errors.brand} className="mt-2" />
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
                                    <InputLabel htmlFor="price" value="Prix (dh)" />
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
                                <InputLabel htmlFor="image" value="Image du produit (optionnel)" />
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative overflow-hidden group hover:border-indigo-500 transition-colors">
                                    {data.image ? (
                                        <div className="text-center w-full">
                                            <p className="text-sm text-gray-600 mb-2">Fichier sélectionné : {data.image.name}</p>
                                            <img src={URL.createObjectURL(data.image)} alt="Preview" className="mx-auto max-h-48 object-contain mb-4" />
                                            <button type="button" onClick={() => setData('image', null)} className="text-red-600 hover:text-red-800 text-sm">Retirer l'image</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Importer un fichier</span>
                                                    <input id="file-upload" name="image" type="file" className="sr-only" accept="image/*" onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)} />
                                                </label>
                                                <p className="pl-1">ou glisser-déposer</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP jusqu'à 10MB</p>
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.image as string} className="mt-2" />
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
