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
                <h2 className="au-h3">
                    Trashed Products
                </h2>
            }
        >
            <Head title="Trashed Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search trashed products..."
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md shadow-sm w-full sm:w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <Link
                            href={route('admin.products.index')}
                            className="au-btn whitespace-nowrap bg-gray-500 hover:bg-gray-600"
                            style={{ margin: 0 }}
                        >
                            Back to Products
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <button 
                                                onClick={() => openProductDetails(product)}
                                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left focus:outline-none"
                                            >
                                                {product.name}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price} dh</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.stock < 5 ? (
                                                <span className="text-red-600 font-bold">{product.stock}</span>
                                            ) : (
                                                product.stock
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleRestore(product.id)} 
                                                className="text-green-600 hover:text-green-900 underline underline-offset-4 decoration-[0.1em]"
                                            >
                                                Restore
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredProducts.length === 0 && (
                             <div className="p-6 text-center text-gray-500">No products found.</div>
                        )}
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
