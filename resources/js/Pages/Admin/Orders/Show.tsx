import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Show({ order }: { order: any }) {
    const { data, setData, put, processing } = useForm({
        status: order.status,
    });

    const submitStatus: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.orders.update', order.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Détails de la Commande {order.order_number}</h2>}>
            <Head title={`Commande ${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Header Info */}
                    <div className="bg-white p-6 shadow sm:rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">Client : {order.user.name}</h3>
                            <p className="text-gray-600">{order.user.email} | {order.user.phone || 'Pas de téléphone'}</p>
                            <p className="text-gray-600 mt-2"><strong>Adresse d'expédition :</strong> <br /> {order.shipping_address}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-lg font-bold">Montant Total : {order.total_amount} €</h3>
                            <p className="text-gray-500">Date : {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Status Update Form */}
                    {/* <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Modifier le statut</h3>
                        <form onSubmit={submitStatus} className="flex items-center space-x-4">
                            <select 
                                value={data.status} 
                                onChange={(e) => setData('status', e.target.value)}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="en attente">En attente</option>
                                <option value="payée">Payée</option>
                                <option value="expédiée">Expédiée</option>
                                <option value="livrée">Livrée</option>
                                <option value="annulée">Annulée</option>
                            </select>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700"
                            >
                                Mettre à jour
                            </button>
                        </form>
                    </div> */}

                    {/* Order Items */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Articles commandés</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Unitaire</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit_price} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{(item.unit_price * item.quantity).toFixed(2)} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
