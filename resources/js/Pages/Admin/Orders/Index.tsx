import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const STATUSES = [
    'en attente',
    'annulé avant la confirmation',
    'confirmé',
    'livré',
    'annulé après la livraison',
    'reçu',
];

export default function Index({ orders }: { orders: any[] }) {
    const [draggingId, setDraggingId] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, orderId: number) => {
        setDraggingId(orderId);
        e.dataTransfer.effectAllowed = 'move';
        // Hack for Firefox
        e.dataTransfer.setData('text/plain', orderId.toString());
    };

    const handleDragOver = (e: React.DragEvent, targetStatus: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStatus: string) => {
        e.preventDefault();
        if (!draggingId) return;

        const order = orders.find(o => o.id === draggingId);
        if (!order) return;

        const fromIndex = STATUSES.indexOf(order.status);
        const toIndex = STATUSES.indexOf(targetStatus);

        // Règle: on ne peut pas reculer en arrière
        if (toIndex <= fromIndex) {
            alert('Mouvement invalide : Impossible de reculer le statut de la commande.');
            setDraggingId(null);
            return;
        }

        // Mettre à jour via Inertia
        router.put(route('admin.orders.update', order.id), {
            status: targetStatus
        }, {
            preserveScroll: true,
            onFinish: () => setDraggingId(null)
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Gestion des Commandes (Kanban)</h2>}>
            <Head title="Commandes" />

            <div className="py-8">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
                        {STATUSES.map(status => (
                            <div 
                                key={status} 
                                className="bg-gray-100 rounded-lg min-w-[280px] w-[280px] flex flex-col shadow-sm"
                                onDragOver={(e) => handleDragOver(e, status)}
                                onDrop={(e) => handleDrop(e, status)}
                            >
                                <div className={`p-3 border-b border-gray-300 rounded-t-lg font-bold capitalize text-sm text-center ${status.includes('annulé') ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-700'}`}>
                                    {status}
                                    <span className="ml-2 text-xs font-normal text-gray-500">
                                        ({orders.filter(o => o.status === status).length})
                                    </span>
                                </div>
                                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                                    {orders.filter(o => o.status === status).map(order => {
                                        const isCancelled = status.includes('annulé');
                                        return (
                                        <div 
                                            key={order.id}
                                            draggable={!isCancelled}
                                            onDragStart={(e) => !isCancelled && handleDragStart(e, order.id)}
                                            className={`bg-white p-4 rounded shadow-sm border-l-4 transition-shadow ${
                                                isCancelled ? 'cursor-not-allowed opacity-75' : 'cursor-grab active:cursor-grabbing hover:shadow-md'
                                            }`}
                                            style={{
                                                borderColor: 
                                                    status.includes('annulé') ? '#ef4444' : 
                                                    status === 'reçu' ? '#10b981' : 
                                                    status === 'confirmé' ? '#3b82f6' : 
                                                    '#f59e0b'
                                            }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-sm">{order.order_number}</span>
                                                <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="text-sm text-gray-700 mb-1">
                                                {order.user?.name || 'Client'}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 mb-3">
                                                {order.total_amount} dh
                                            </div>
                                            <div className="text-right">
                                                <Link href={route('admin.orders.show', order.id)} className="text-xs text-indigo-600 hover:underline">
                                                    Détails &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                        );
                                    })}
                                    {orders.filter(o => o.status === status).length === 0 && (
                                        <div className="text-center text-sm text-gray-400 italic py-4">
                                            Aucune commande
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
