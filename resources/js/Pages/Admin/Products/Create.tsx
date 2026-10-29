import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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
        is_bestseller: false,
        allow_preorder: false,
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={route('admin.products.index')}
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                        title="Back to Products"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                        Add New Product
                    </h2>
                </div>
            }
        >
            <Head title="Add Product" />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-2xl px-3 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xs border border-gray-200/70">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Product Name *" />
                                <TextInput id="name" type="text" className="mt-1 block w-full text-xs sm:text-sm" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="brand" value="Brand (optional)" />
                                <TextInput id="brand" type="text" className="mt-1 block w-full text-xs sm:text-sm" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                                <InputError message={errors.brand} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="category_id" value="Category *" />
                                <select id="category_id" className="mt-1 block w-full border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required>
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description *" />
                                <textarea id="description" className="mt-1 block w-full border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm" rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <InputLabel htmlFor="price" value="Price (dh) *" />
                                    <TextInput id="price" type="number" step="0.01" className="mt-1 block w-full text-xs sm:text-sm" value={data.price} onChange={(e) => setData('price', e.target.value)} required />
                                    <InputError message={errors.price} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="stock" value="Stock Quantity *" />
                                    <TextInput id="stock" type="number" className="mt-1 block w-full text-xs sm:text-sm" value={data.stock} onChange={(e) => setData('stock', e.target.value)} required />
                                    <InputError message={errors.stock} className="mt-1" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="volume" value="Volume (e.g. ml, optional)" />
                                <TextInput id="volume" type="number" className="mt-1 block w-full text-xs sm:text-sm" value={data.volume} onChange={(e) => setData('volume', e.target.value)} />
                                <InputError message={errors.volume} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Product Image (optional)" />
                                <div className="mt-1 flex justify-center px-4 py-5 border-2 border-gray-300 border-dashed rounded-xl relative overflow-hidden group hover:border-gray-500 transition-colors">
                                    {data.image ? (
                                        <div className="text-center w-full">
                                            <p className="text-xs text-gray-600 mb-2 truncate max-w-xs mx-auto">Selected: {data.image.name}</p>
                                            <img src={URL.createObjectURL(data.image)} alt="Preview" className="mx-auto max-h-44 object-contain mb-3 rounded-lg" />
                                            <button type="button" onClick={() => setData('image', null)} className="text-red-600 hover:text-red-800 text-xs font-semibold">
                                                Remove image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-10 w-10 text-gray-400 group-hover:text-gray-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-xs sm:text-sm text-gray-600 justify-center">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-semibold text-[#0F204B] hover:underline focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="image" type="file" className="sr-only" accept="image/*" onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)} />
                                                </label>
                                                <p className="pl-1 text-gray-400">or drag &amp; drop</p>
                                            </div>
                                            <p className="text-[11px] text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.image as string} className="mt-1" />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:space-x-6 gap-2 sm:gap-0 pt-2 border-t border-gray-100">
                                <label className="flex items-center cursor-pointer py-1">
                                    <Checkbox name="is_new" checked={data.is_new} onChange={(e) => setData('is_new', e.target.checked)} />
                                    <span className="ms-2 text-xs sm:text-sm text-gray-700 select-none">New Product</span>
                                </label>
                                <label className="flex items-center cursor-pointer py-1">
                                    <Checkbox name="is_bestseller" checked={data.is_bestseller} onChange={(e) => setData('is_bestseller', e.target.checked)} />
                                    <span className="ms-2 text-xs sm:text-sm text-gray-700 select-none">Best Seller</span>
                                </label>
                                <label className="flex items-center cursor-pointer py-1">
                                    <Checkbox name="allow_preorder" checked={data.allow_preorder} onChange={(e) => setData('allow_preorder', e.target.checked)} />
                                    <span className="ms-2 text-xs sm:text-sm text-gray-700 select-none">Allow Pre-order</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('admin.products.index')}
                                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing} className="w-full sm:w-auto bg-[#0F204B] justify-center">
                                    {processing ? 'Saving…' : 'Save Product'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

