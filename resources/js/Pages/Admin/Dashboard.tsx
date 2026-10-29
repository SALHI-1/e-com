import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ComposedChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    Legend
} from 'recharts';

// McKinsey Style Colors
const PRIMARY_COLOR = '#0F204B'; // Deep Navy Blue
const SECONDARY_COLOR = '#8B95A5'; // Muted Grey
const ACCENT_COLOR = '#F26D21'; // Muted Orange for highlights
const GRID_COLOR = '#E5E7EB'; 

const STATUS_LABELS: Record<string, string> = {
    'en attente': 'Pending',
    'annulé avant la confirmation': 'Cancelled (Pre-Confirm)',
    'confirmé': 'Confirmed',
    'livré': 'Delivered',
    'annulé après la livraison': 'Cancelled (Post-Delivery)',
    'reçu': 'Received',
};

export default function Dashboard({ 
    metrics, 
    salesData, 
    orderStatusData, 
    recentOrders,
    topProducts
}: any) {
    const topProduct = topProducts && topProducts.length > 0 ? topProducts[0] : null;

    const formattedOrderStatusData = (orderStatusData || []).map((item: any) => ({
        ...item,
        statusLabel: STATUS_LABELS[item.status] || item.status,
    }));

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F204B]">
                        Analytics Dashboard
                    </h2>
                    <span className="text-xs text-gray-500">
                        Overview of store performance & metrics
                    </span>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-6 sm:py-10 bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
                    
                    {/* Quick Navigation Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        <button 
                            onClick={() => scrollToSection('transactions')}
                            className="flex-1 sm:flex-initial bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0F204B] border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 transition-colors text-center"
                        >
                            ↓ Recent Transactions
                        </button>
                        <button 
                            onClick={() => scrollToSection('top-products')}
                            className="flex-1 sm:flex-initial bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0F204B] border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 transition-colors text-center"
                        >
                            ↓ Top In-Demand Products
                        </button>
                    </div>

                    {/* Key Metrics Cards - 2 cols on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center">
                            <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
                                Today's Revenue
                            </div>
                            <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B] truncate">
                                {Number(metrics?.revenue || 0).toFixed(2)} dh
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center">
                            <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
                                Total Orders
                            </div>
                            <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B]">
                                {metrics?.orders || 0}
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center">
                            <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
                                Products in Stock
                            </div>
                            <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0F204B]">
                                {metrics?.stock || 0}
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-3.5 sm:p-6 flex flex-col justify-center">
                            <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
                                Top In-Demand
                            </div>
                            <div className="text-sm sm:text-base lg:text-lg font-extrabold text-[#0F204B] leading-tight truncate">
                                {topProduct ? topProduct.name : 'None'}
                            </div>
                            {topProduct && (
                                <div className="text-[11px] font-medium text-gray-500 mt-0.5 truncate">
                                    {topProduct.order_items_sum_quantity} sales
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Multilayered Sales Chart */}
                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-4 sm:p-6 lg:p-8 lg:col-span-2">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-bold text-[#0F204B]">Correlation: Revenue vs Volume (30 Days)</h3>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">Evaluating daily order volume vs daily revenue.</p>
                            </div>
                            <div className="h-64 sm:h-80 w-full -ms-2 sm:ms-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={salesData} margin={{ top: 10, right: 10, bottom: 0, left: -15 }}>
                                        <XAxis 
                                            dataKey="date" 
                                            tickFormatter={(tick) => {
                                                const d = new Date(tick);
                                                return `${d.getDate()}/${d.getMonth()+1}`;
                                            }}
                                            stroke={SECONDARY_COLOR}
                                            tickLine={false}
                                            axisLine={{ stroke: GRID_COLOR }}
                                            fontSize={10}
                                            dy={8}
                                        />
                                        <YAxis 
                                            yAxisId="left"
                                            stroke={SECONDARY_COLOR} 
                                            tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} 
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={10}
                                            dx={-5}
                                        />
                                        <YAxis 
                                            yAxisId="right" 
                                            orientation="right" 
                                            stroke={SECONDARY_COLOR} 
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={10}
                                            dx={5}
                                        />
                                        <RechartsTooltip 
                                            cursor={{fill: '#F3F4F6'}}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                            labelStyle={{ fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: '4px' }}
                                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                        />
                                        <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px', color: SECONDARY_COLOR, paddingBottom: '16px' }}/>
                                        <Bar yAxisId="right" dataKey="orders_count" name="Volume" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
                                        <Line yAxisId="left" type="monotone" dataKey="total" name="Revenue (dh)" stroke={PRIMARY_COLOR} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: PRIMARY_COLOR }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Order Status Horizontal Bar Chart */}
                        <div className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl p-4 sm:p-6 lg:p-8">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-bold text-[#0F204B]">Status Funnel</h3>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">Order distribution by status.</p>
                            </div>
                            <div className="h-64 sm:h-80 w-full">
                                {formattedOrderStatusData && formattedOrderStatusData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            layout="vertical"
                                            data={formattedOrderStatusData}
                                            margin={{ top: 0, right: 20, left: -10, bottom: 0 }}
                                        >
                                            <XAxis type="number" hide />
                                            <YAxis 
                                                dataKey="statusLabel" 
                                                type="category" 
                                                axisLine={false} 
                                                tickLine={false}
                                                tick={{ fill: PRIMARY_COLOR, fontSize: 10, fontWeight: 500 }}
                                                width={90}
                                            />
                                            <RechartsTooltip 
                                                cursor={{fill: 'transparent'}}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                            />
                                            <Bar dataKey="count" name="Orders" fill={PRIMARY_COLOR} radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-500 text-sm mt-10 text-center">No data available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div id="transactions" className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl">
                        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#0F204B]">Recent Transactions</h3>
                                <p className="text-xs text-gray-500 mt-0.5 sm:hidden">Swipe horizontally to see all columns</p>
                            </div>
                            <Link href={route('admin.orders.index')} className="text-xs font-bold uppercase tracking-wider text-[#0F204B] hover:underline transition-colors shrink-0">
                                View all &rarr;
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Reference</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {recentOrders && recentOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-[#0F204B]">
                                                <Link href={route('admin.orders.show', order.id)} className="hover:underline">
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                                                {order.user?.name || 'Unknown'}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900">
                                                {order.total_amount} dh
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                                <div>Created: {new Date(order.created_at).toLocaleDateString()}</div>
                                                {order.status === 'reçu' && (
                                                    <div className="text-[#0F204B] font-semibold mt-0.5">Received: {new Date(order.updated_at).toLocaleDateString()}</div>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                                                <span className={`px-2 py-0.5 sm:py-1 inline-flex text-[11px] leading-tight font-bold rounded-full ${order.status.includes('annulé') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                                    {STATUS_LABELS[order.status] || order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!recentOrders || recentOrders.length === 0) && (
                                        <tr>
                                            <td colSpan={5} className="px-4 sm:px-6 py-8 text-center text-xs sm:text-sm text-gray-400">No recent transactions.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Products Table */}
                    <div id="top-products" className="bg-white overflow-hidden shadow-xs border border-gray-200/70 rounded-xl">
                        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-bold text-[#0F204B]">Top In-Demand Products</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Rank</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity Ordered</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {topProducts && topProducts.map((product: any, index: number) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-gray-400">
                                                #{index + 1}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-[#0F204B]">
                                                {product.name}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900">
                                                {product.order_items_sum_quantity} units
                                            </td>
                                        </tr>
                                    ))}
                                    {(!topProducts || topProducts.length === 0) && (
                                        <tr>
                                            <td colSpan={3} className="px-4 sm:px-6 py-8 text-center text-xs sm:text-sm text-gray-400">No products sold yet.</td>
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
