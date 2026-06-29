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

export default function Dashboard({ 
    metrics, 
    salesData, 
    orderStatusData, 
    recentOrders 
}: any) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tableau de bord Analytique
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Revenus d'aujourd'hui</div>
                            <div className="text-3xl font-extrabold text-[#0F204B]">{Number(metrics?.revenue || 0).toFixed(2)} dh</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Commandes Totales</div>
                            <div className="text-3xl font-extrabold text-[#0F204B]">{metrics?.orders || 0}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-6 flex flex-col justify-center">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Produits en Stock</div>
                            <div className="text-3xl font-extrabold text-[#0F204B]">{metrics?.stock || 0}</div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Multilayered Sales Chart */}
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-8 lg:col-span-2">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-[#0F204B]">Corrélation : Revenus vs Volume (30 jours)</h3>
                                <p className="text-sm text-gray-500 mt-1">Évaluation de l'impact du volume de commandes sur le chiffre d'affaires quotidien.</p>
                            </div>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={salesData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                                        <XAxis 
                                            dataKey="date" 
                                            tickFormatter={(tick) => {
                                                const d = new Date(tick);
                                                return `${d.getDate()}/${d.getMonth()+1}`;
                                            }}
                                            stroke={SECONDARY_COLOR}
                                            tickLine={false}
                                            axisLine={{ stroke: GRID_COLOR }}
                                            fontSize={11}
                                            dy={10}
                                        />
                                        <YAxis 
                                            yAxisId="left"
                                            stroke={SECONDARY_COLOR} 
                                            tickFormatter={(val) => `${val/1000}k`} 
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={11}
                                            dx={-10}
                                        />
                                        <YAxis 
                                            yAxisId="right" 
                                            orientation="right" 
                                            stroke={SECONDARY_COLOR} 
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={11}
                                            dx={10}
                                        />
                                        <RechartsTooltip 
                                            cursor={{fill: '#F3F4F6'}}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            labelStyle={{ fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: '4px' }}
                                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                        />
                                        <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', color: SECONDARY_COLOR, paddingBottom: '20px' }}/>
                                        <Bar yAxisId="right" dataKey="orders_count" name="Volume (Commandes)" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
                                        <Line yAxisId="left" type="monotone" dataKey="total" name="Revenus (dh)" stroke={PRIMARY_COLOR} strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: PRIMARY_COLOR }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Order Status Horizontal Bar Chart */}
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-[#0F204B]">Entonnoir des statuts</h3>
                                <p className="text-sm text-gray-500 mt-1">Répartition volumétrique globale.</p>
                            </div>
                            <div className="h-80 w-full">
                                {orderStatusData && orderStatusData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            layout="vertical"
                                            data={orderStatusData}
                                            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                                        >
                                            <XAxis type="number" hide />
                                            <YAxis 
                                                dataKey="status" 
                                                type="category" 
                                                axisLine={false} 
                                                tickLine={false}
                                                tick={{ fill: PRIMARY_COLOR, fontSize: 11, fontWeight: 500 }}
                                                width={100}
                                            />
                                            <RechartsTooltip 
                                                cursor={{fill: 'transparent'}}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Bar dataKey="count" name="Commandes" fill={PRIMARY_COLOR} radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-500 text-sm mt-10 text-center">Aucune donnée disponible</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-lg">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#0F204B]">Dernières transactions</h3>
                            <Link href={route('admin.orders.index')} className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#0F204B] transition-colors">Voir tout &rarr;</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Référence</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Montant</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {recentOrders && recentOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F204B]">
                                                <Link href={route('admin.orders.show', order.id)} className="hover:underline">
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.user?.name || 'Inconnu'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {order.total_amount} dh
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>Création: {new Date(order.created_at).toLocaleDateString()}</div>
                                                {order.status === 'reçu' && (
                                                    <div className="text-[#0F204B] font-semibold mt-1">Reçue: {new Date(order.updated_at).toLocaleDateString()}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-none font-bold rounded-full ${order.status.includes('annulé') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!recentOrders || recentOrders.length === 0) && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">Aucune transaction récente.</td>
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
