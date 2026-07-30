import React, { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';

interface PreorderModalProps {
    show: boolean;
    onClose: () => void;
    product: any;
    quantity: number;
}

export default function PreorderModal({ show, onClose, product, quantity }: PreorderModalProps) {
    const { auth } = usePage<any>().props;
    const user = auth?.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product?.id || '',
        quantity: quantity,
        guest_name: user?.name || '',
        phone: user?.phone || '',
        shipping_address: '',
        delivery_city: '',
    });

    React.useEffect(() => {
        if (show && product) {
            setData((prev) => ({
                ...prev,
                product_id: product.id,
                quantity: quantity,
            }));
        }
    }, [show, product, quantity]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('preorder.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!product) return null;

    const CITIES = [
        'Agadir', 'Casablanca', 'El Jadida', 'Fès', 'Kénitra', 'Marrakech', 
        'Meknès', 'Oujda', 'Rabat', 'Safi', 'Tanger', 'Tétouan'
    ];

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--au-font-serif)', color: 'var(--au-dark)' }}>
                        Précommander
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
                </div>

                <div className="mb-6 flex gap-4 p-4 rounded-lg" style={{ background: 'var(--au-cream)' }}>
                    {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div>
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <p className="text-sm text-gray-600">{Number(product.price).toFixed(2)} dh</p>
                        <div className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--au-gold)' }}>
                            <span>Quantité:</span>
                            <span className="font-bold">{quantity}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {(!user || user.is_admin) && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#C2A063] focus:ring-[#C2A063]"
                                value={data.guest_name}
                                onChange={e => setData('guest_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.guest_name} className="mt-1" />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (WhatsApp)</label>
                        <input
                            type="text"
                            placeholder="+212..."
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#C2A063] focus:ring-[#C2A063]"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville de livraison</label>
                        <select
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#C2A063] focus:ring-[#C2A063]"
                            value={data.delivery_city}
                            onChange={e => setData('delivery_city', e.target.value)}
                            required
                        >
                            <option value="" disabled>Choisir une ville</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <InputError message={errors.delivery_city} className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                        <textarea
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#C2A063] focus:ring-[#C2A063]"
                            rows={3}
                            value={data.shipping_address}
                            onChange={e => setData('shipping_address', e.target.value)}
                            required
                        />
                        <InputError message={errors.shipping_address} className="mt-1" />
                    </div>

                    {errors.preorder && (
                        <div className="p-3 bg-red-50 text-red-800 text-sm rounded border border-red-200">
                            {errors.preorder}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="au-btn w-full flex justify-center"
                        >
                            {processing ? 'En cours...' : 'Confirmer la précommande'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
