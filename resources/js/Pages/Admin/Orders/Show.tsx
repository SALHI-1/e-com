import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const STATUS_LABELS: Record<string, string> = {
    'en attente': 'Pending',
    'annulé avant la confirmation': 'Cancelled (Pre-Confirm)',
    'confirmé': 'Confirmed',
    'livré': 'Delivered',
    'annulé après la livraison': 'Cancelled (Post-Delivery)',
    'reçu': 'Received',
};

const STATUSES = [
    'en attente',
    'annulé avant la confirmation',
    'confirmé',
    'livré',
    'annulé après la livraison',
    'reçu',
];

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

    const getStatusBadge = (status: string) => {
        if (status.includes('annulé')) return 'bg-red-50 text-red-700 border border-red-200/60';
        if (status === 'reçu') return 'bg-green-50 text-green-700 border border-green-200/60';
        if (status === 'confirmé') return 'bg-blue-50 text-blue-700 border border-blue-200/60';
        return 'bg-amber-50 text-amber-800 border border-amber-200/60';
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.orders.list')}
                            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                            title="Back to Orders List"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                                Order #{order.order_number}
                            </h2>
                            <div className="text-xs text-gray-500 mt-0.5">
                                Placed on {new Date(order.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <a
                        href={route('admin.orders.ticket', order.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs transition-colors self-start sm:self-auto"
                    >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Delivery Slip (PDF)</span>
                    </a>
                </div>
            }
        >
            <Head title={`Order #${order.order_number}`} />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">

                    {/* Status Management Bar */}
                    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70">
                        <form onSubmit={submitStatus} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Status:</span>
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusBadge(order.status)}`}>
                                    {STATUS_LABELS[order.status] || order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="flex-1 sm:flex-initial rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm py-2"
                                >
                                    {STATUSES.map((s) => (
                                        <option key={s} value={s}>
                                            {STATUS_LABELS[s] || s}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="submit"
                                    disabled={processing || data.status === order.status}
                                    className="px-4 py-2 bg-[#0F204B] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#1a3374] disabled:opacity-50 transition-colors shrink-0 shadow-xs"
                                >
                                    {processing ? 'Saving…' : 'Update Status'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Customer & Order Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Customer Info */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Customer Details</h3>
                            <div className="space-y-1.5 text-sm">
                                <div className="font-bold text-gray-900">{order.user?.name || 'Customer'}</div>
                                <div className="text-gray-600 text-xs sm:text-sm break-all">{order.user?.email}</div>
                                <div className="text-gray-500 text-xs">
                                    Phone: <span className="text-gray-700 font-medium">{order.user?.phone || 'Not provided'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Shipping Address</h3>
                            <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                {order.shipping_address || 'No address provided'}
                            </p>
                        </div>

                        {/* Order Payment Info */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200/70 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Order Total</h3>
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F204B]">
                                    {order.total_amount} dh
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Payment on delivery / standard
                                </div>
                            </div>

                            {order.status === 'reçu' && (
                                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-green-700 font-semibold">
                                    Delivered &amp; received on {new Date(order.updated_at).toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-xs border border-gray-200/70 overflow-hidden">
                        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0F204B]">Ordered Items ({order.items?.length || 0})</h3>
                        </div>

                        {/* Mobile Cards for Items (< sm) */}
                        <div className="block sm:hidden divide-y divide-gray-100">
                            {order.items?.map((item: any) => (
                                <div key={item.id} className="p-4 space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="font-semibold text-sm text-gray-900">
                                            {item.product?.name}
                                        </div>
                                        <div className="font-bold text-sm text-[#0F204B] shrink-0">
                                            {(item.unit_price * item.quantity).toFixed(2)} dh
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Unit: {item.unit_price} dh</span>
                                        <span>Qty: <strong className="text-gray-800">{item.quantity}</strong></span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table for Items (>= sm) */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.items?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-gray-50/60">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {item.product?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.unit_price} dh
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-[#0F204B]">
                                                {(item.unit_price * item.quantity).toFixed(2)} dh
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}

