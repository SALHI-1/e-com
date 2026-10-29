import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function Index({ products, filters }: { products: any[], filters?: any }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [lowStock, setLowStock] = useState(filters?.low_stock === 'true' || filters?.low_stock === true);
    
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProductDetails = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesStock = lowStock ? product.stock < 5 : true;
        return matchesSearch && matchesStock;
    });

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                        Product Management
                    </h2>
                    <span className="text-xs text-gray-500">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} listed
                    </span>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
                    {/* Filter & Action Toolbar */}
                    <div className="bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 sm:w-72">
                                <input
                                    type="text"
                                    placeholder="Search products…"
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
                            
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none py-1">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-[#0F204B] shadow-xs focus:ring-[#0F204B]"
                                    checked={lowStock}
                                    onChange={(e) => setLowStock(e.target.checked)}
                                />
                                <span>Low stock ({'<'} 5)</span>
                            </label>
                        </div>
                        
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <Link
                                href={route('admin.products.trashed')}
                                className="flex-1 sm:flex-initial text-center px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Trash
                            </Link>
                            <Link
                                href={route('admin.products.create')}
                                className="flex-1 sm:flex-initial text-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F204B] hover:bg-[#1a3374] rounded-lg shadow-xs transition-colors"
                            >
                                + Add Product
                            </Link>
                        </div>
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
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                                        ID #{product.id}
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
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-gray-400">Stock:</span>
                                        {product.stock < 5 ? (
                                            <span className="px-2 py-0.5 font-bold rounded-full bg-red-50 text-red-700 text-[11px]">
                                                {product.stock} (Low)
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 font-semibold rounded-full bg-green-50 text-green-700 text-[11px]">
                                                {product.stock} in stock
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openProductDetails(product)}
                                            className="px-2.5 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                                        >
                                            View
                                        </button>
                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(product.id)}
                                            className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredProducts.length === 0 && (
                            <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400">
                                No products found matching your search.
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
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                                                    {product.category?.name || '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{product.price} dh</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                {product.stock < 5 ? (
                                                    <span className="px-2 py-0.5 font-bold rounded-full bg-red-50 text-red-700">
                                                        {product.stock} (Low)
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-700 font-medium">{product.stock}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-3">
                                                <Link href={route('admin.products.edit', product.id)} className="text-[#0F204B] font-bold hover:underline">
                                                    Edit
                                                </Link>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleDelete(product.id)} 
                                                    className="text-red-600 hover:text-red-800 font-semibold underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                                                No products found matching your search.
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

