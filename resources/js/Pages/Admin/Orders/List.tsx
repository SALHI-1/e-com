import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const STATUS_LABELS: Record<string, string> = {
    'en attente': 'Pending',
    'annulé avant la confirmation': 'Cancelled (Pre-Confirm)',
    'confirmé': 'Confirmed',
    'livré': 'Delivered',
    'annulé après la livraison': 'Cancelled (Post-Delivery)',
    'reçu': 'Received',
};

export default function List({ orders, filters }: { orders: any[], filters: any }) {
    const [filterState, setFilterState] = useState({
        order_number: filters?.order_number || '',
        client_name: filters?.client_name || '',
        client_email: filters?.client_email || '',
        status: filters?.status || '',
        type: filters?.type || '',
    });

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filterState, [key]: value };
        setFilterState(newFilters);
    };

    const hasActiveFilters = Boolean(
        filterState.order_number || 
        filterState.client_name || 
        filterState.client_email || 
        filterState.status || 
        filterState.type
    );

    const clearAllFilters = () => {
        setFilterState({
            order_number: '',
            client_name: '',
            client_email: '',
            status: '',
            type: '',
        });
    };

    const filteredOrders = orders.filter(order => {
        const matchNumber = order.order_number?.toLowerCase().includes(filterState.order_number.toLowerCase()) ?? true;
        const matchName = !filterState.client_name || (order.user?.name?.toLowerCase().includes(filterState.client_name.toLowerCase()));
        const matchEmail = !filterState.client_email || (order.user?.email?.toLowerCase().includes(filterState.client_email.toLowerCase()));
        const matchStatus = !filterState.status || order.status === filterState.status;
        const matchType = !filterState.type || 
            (filterState.type === 'preorder' ? order.items?.some((i: any) => i.is_preorder) : !order.items?.some((i: any) => i.is_preorder));
        return matchNumber && matchName && matchEmail && matchStatus && matchType;
    });

    const STATUSES = [
        'en attente',
        'annulé avant la confirmation',
        'confirmé',
        'livré',
        'annulé après la livraison',
        'reçu',
    ];

    const getStatusColor = (status: string) => {
        if (status.includes('annulé')) return 'bg-red-50 text-red-700 border border-red-200/60';
        if (status === 'reçu') return 'bg-green-50 text-green-700 border border-green-200/60';
        if (status === 'confirmé') return 'bg-blue-50 text-blue-700 border border-blue-200/60';
        return 'bg-amber-50 text-amber-800 border border-amber-200/60';
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                        All Orders
                    </h2>
                    <span className="text-xs text-gray-500">
                        {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} listed
                    </span>
                </div>
            }
        >
            <Head title="Orders List" />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
                    {/* Filter Card */}
                    <div className="bg-white p-3.5 sm:p-5 rounded-xl shadow-xs border border-gray-200/70">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Filter Orders</span>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs text-red-600 hover:text-red-800 font-semibold underline"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Order #</label>
                                <input
                                    type="text"
                                    value={filterState.order_number}
                                    onChange={(e) => handleFilter('order_number', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
                                    placeholder="Search #…"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    value={filterState.client_name}
                                    onChange={(e) => handleFilter('client_name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
                                    placeholder="Name…"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Email</label>
                                <input
                                    type="text"
                                    value={filterState.client_email}
                                    onChange={(e) => handleFilter('client_email', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
                                    placeholder="Email…"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                                <select
                                    value={filterState.status}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
                                >
                                    <option value="">All Statuses</option>
                                    {STATUSES.map(s => (
                                        <option key={s} value={s}>{STATUS_LABELS[s] || s}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                                <select
                                    value={filterState.type}
                                    onChange={(e) => handleFilter('type', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-xs focus:border-[#0F204B] focus:ring-[#0F204B] text-xs sm:text-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="normal">Standard</option>
                                    <option value="preorder">Pre-order</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Orders List View (< md) */}
                    <div className="block md:hidden space-y-3">
                        {filteredOrders.map((order) => {
                            const isPreorder = order.items?.some((i: any) => i.is_preorder);
                            return (
                                <div key={order.id} className="bg-white p-4 rounded-xl shadow-xs border border-gray-200/70 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <Link href={route('admin.orders.show', order.id)} className="font-bold text-sm text-[#0F204B] hover:underline">
                                            {order.order_number}
                                        </Link>
                                        <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${getStatusColor(order.status)}`}>
                                            {STATUS_LABELS[order.status] || order.status}
                                        </span>
                                    </div>

                                    <div className="text-xs text-gray-600">
                                        <div className="font-semibold text-gray-800">{order.user?.name || 'Unknown Customer'}</div>
                                        {order.user?.email && <div className="text-gray-400 truncate">{order.user.email}</div>}
                                    </div>

                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </span>
                                            {isPreorder ? (
                                                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-purple-50 text-purple-700">
                                                    Pre-order
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-[10px]">Standard</span>
                                            )}
                                        </div>

                                        <div className="font-bold text-sm text-gray-900">
                                            {order.total_amount} dh
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <a
                                            href={route('admin.orders.ticket', order.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Slip PDF
                                        </a>

                                        <Link
                                            href={route('admin.orders.show', order.id)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#0F204B] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <span>View Details</span>
                                            <span>&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredOrders.length === 0 && (
                            <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-200/70 text-center text-sm text-gray-400">
                                No orders match your filters.
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View (>= md) */}
                    <div className="hidden md:block bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Order #
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]">
                                                <Link href={route('admin.orders.show', order.id)} className="hover:underline">
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                <div>Created: {new Date(order.created_at).toLocaleDateString()}</div>
                                                {order.status === 'reçu' && (
                                                    <div className="text-green-700 font-semibold mt-0.5">Received: {new Date(order.updated_at).toLocaleDateString()}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                {order.items?.some((i: any) => i.is_preorder) ? (
                                                    <span className="px-2 py-0.5 inline-flex text-xs font-semibold rounded-full bg-purple-50 text-purple-700">
                                                        Pre-order
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500">Standard</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <div className="font-medium text-gray-900">{order.user?.name || 'Unknown Customer'}</div>
                                                <div className="text-xs text-gray-400">{order.user?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                {order.total_amount} dh
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-none font-bold rounded-full ${getStatusColor(order.status)}`}>
                                                    {STATUS_LABELS[order.status] || order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-3">
                                                <a 
                                                    href={route('admin.orders.ticket', order.id)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded" 
                                                    title="Download Delivery Slip"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <span className="text-xs font-semibold">Slip</span>
                                                </a>
                                                <Link href={route('admin.orders.show', order.id)} className="text-[#0F204B] font-bold text-xs hover:underline">
                                                    View &rarr;
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 whitespace-nowrap text-sm text-gray-400 text-center">
                                                No orders found matching the filter criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

