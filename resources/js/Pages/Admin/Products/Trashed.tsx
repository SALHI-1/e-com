import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function Trashed({ products, filters }: { products: any[], filters?: any }) {
    const [search, setSearch] = useState(filters?.search || '');

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProductDetails = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleRestore = (id: number) => {
        if (confirm('Are you sure you want to restore this product?')) {
            router.post(route('admin.products.restore', id));
        }
    };

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });

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
                    <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                            Trashed Products
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Trashed Products" />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
                    {/* Search & Action bar */}
                    <div className="bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                        <div className="relative flex-1 sm:w-72">
                            <input
                                type="text"
                                placeholder="Search trashed products…"
                                className="w-full pl-9 pr-4 py-2 border-gray-300 focus:border-[#0F204B] focus:ring-[#0F204B] rounded-lg shadow-xs text-xs sm:text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        <Link
                            href={route('admin.products.index')}
                            className="text-center px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            &larr; Back to Products
                        </Link>
                    </div>

                    {/* Mobile Product Card List (< md) */}
                    <div className="block md:hidden space-y-3">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-xl shadow-xs border border-gray-200/70 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => openProductDetails(product)}
                                        className="font-bold text-sm text-[#0F204B] hover:underline text-left leading-snug"
                                    >
                                        {product.name}
                                    </button>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 shrink-0">
                                        Trashed
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                                    <span className="text-gray-500 font-medium">
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {product.price} dh
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                                    <span className="text-gray-500">
                                        Stock: {product.stock}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openProductDetails(product)}
                                            className="px-2.5 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                                        >
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRestore(product.id)}
                                            className="px-3 py-1 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded-md"
                                        >
                                            Restore
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredProducts.length === 0 && (
                            <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400">
                                No trashed products found.
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View (>= md) */}
                    <div className="hidden md:block bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3.5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">#{product.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button 
                                                    type="button"
                                                    onClick={() => openProductDetails(product)}
                                                    className="font-bold text-[#0F204B] hover:underline text-left focus:outline-none"
                                                >
                                                    {product.name}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{product.category.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{product.price} dh</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                {product.stock < 5 ? (
                                                    <span className="text-red-600 font-bold">{product.stock}</span>
                                                ) : (
                                                    product.stock
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                                                <button 
                                                    type="button"
                                                    onClick={() => handleRestore(product.id)} 
                                                    className="text-green-600 hover:text-green-800 font-semibold underline"
                                                >
                                                    Restore
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                                                No trashed products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModal 
                show={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                product={selectedProduct} 
            />
        </AdminLayout>
    );
}

