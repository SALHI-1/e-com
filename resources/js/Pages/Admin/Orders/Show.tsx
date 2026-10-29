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
        <AdminLayout header={<h2 className="au-h3">Order Details #{order.order_number}</h2>}>
            <Head title={`Order #${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Header Info */}
                    <div className="bg-white p-6 shadow sm:rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">Customer: {order.user.name}</h3>
                            <p className="text-gray-600">{order.user.email} | {order.user.phone || 'No phone provided'}</p>
                            <p className="text-gray-600 mt-2"><strong>Shipping Address:</strong> <br /> {order.shipping_address}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-lg font-bold">Total Amount: {order.total_amount} dh</h3>
                            <p className="text-gray-500">Created: {new Date(order.created_at).toLocaleString()}</p>
                            {order.status === 'reçu' && (
                                <p className="text-green-700 font-bold mt-1">Received on: {new Date(order.updated_at).toLocaleString()}</p>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Order Items</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit_price} dh</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{(item.unit_price * item.quantity).toFixed(2)} dh</td>
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
