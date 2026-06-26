import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }: { orders: any[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestion des Commandes
                </h2>
            }
        >
            <Head title="Commandes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total_amount} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${order.status === 'livrée' ? 'bg-green-100 text-green-800' : 
                                                order.status === 'annulée' ? 'bg-red-100 text-red-800' : 
                                                'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={route('admin.orders.show', order.id)} className="text-indigo-600 hover:text-indigo-900">
                                                Voir détails
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {orders.length === 0 && (
                            <div className="p-6 text-center text-gray-500">Aucune commande trouvée.</div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
