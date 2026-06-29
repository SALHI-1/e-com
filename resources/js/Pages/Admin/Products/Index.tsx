import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products }: { products: any[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestion des Produits
                </h2>
            }
        >
            <Head title="Produits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-end">
                        <Link
                            href={route('admin.products.create')}
                            className="bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700"
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={route('admin.products.edit', product.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
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
