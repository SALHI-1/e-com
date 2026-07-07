import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ products, filters }: { products: any[], filters?: any }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [lowStock, setLowStock] = useState(filters?.low_stock === 'true' || filters?.low_stock === true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                route('admin.products.index'),
                { search, low_stock: lowStock },
                { preserveState: true, replace: true, preserveScroll: true }
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, lowStock]);

    return (
        <AdminLayout
            header={
                <h2 className="au-h3">
                    Gestion des Produits
                </h2>
            }
        >
            <Head title="Produits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md shadow-sm w-full sm:w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            
                            <label className="flex items-center space-x-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-gray-800 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                                    checked={lowStock}
                                    onChange={(e) => setLowStock(e.target.checked)}
                                />
                                <span>Stock {'<'} 5</span>
                            </label>
                        </div>
                        
                        <Link
                            href={route('admin.products.create')}
                            className="au-btn whitespace-nowrap"
                            style={{ margin: 0 }}
                        >
                            Ajouter un produit
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
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
                                            <Link href={route('admin.products.edit', product.id)} className="au-link-underline">
                                                Modifier
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                             <div className="p-6 text-center text-gray-500">Aucun produit trouvé.</div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
