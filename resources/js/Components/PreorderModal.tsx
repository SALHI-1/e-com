import React, { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import { useAurelia } from '@/Layouts/ClientLayout';
import ImageWithLoader from '@/Components/ImageWithLoader';
import ProductImagePlaceholder from '@/Components/ProductImagePlaceholder';

interface PreorderModalProps {
    show: boolean;
    onClose: () => void;
    product: any;
    quantity: number;
}

const MOROCCO_CITIES = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès',
    'Oujda', 'Kénitra', 'Tétouan', 'Safi', 'Mohammedia', 'El Jadida', 'Khouribga',
    'Béni Mellal', 'Nador', 'Taza', 'Settat', 'Berrechid', 'Khémisset',
    'Inezgane', 'Laâyoune', 'Ksar El Kébir', 'Larache', 'Guelmim', 'Berkane',
    'Al Hoceïma', 'Taourirt', 'Dakhla', 'Errachidia', 'Ouarzazate', 'Tiznit',
    'Ifrane', 'Azrou', 'Midelt', 'Sefrou', 'Boujdour', 'Smara', 'Tan-Tan',
    'Taroudant', 'Essaouira', 'Sidi Ifni', 'Zagora', 'Tinghir', 'Boulemane',
    'Figuig', 'Chefchaouen', 'Fnideq', 'Martil', 'M\'diq', 'Ait Melloul',
    'Deroua', 'Bouskoura', 'Médiouna', 'Nouaceur', 'Salé', 'Skhirate',
    'Témara', 'Harhoura', 'Ain Aouda', 'Sidi Yahia', 'Benslimane', 'Azemmour',
    'Bir Jdid', 'Oualidia', 'Youssoufia', 'Ben Guerir', 'Fquih Ben Salah',
    'Azilal', 'Souk Sebt', 'Oulad Teima', 'Ait Baha', 'Biougra', 'Chtouka',
    'Drarga', 'Lqliaa', 'Reggada', 'Imzouren', 'Beni Ansar', 'Selouane',
    'Zaio', 'Ahfir', 'Oujda Angad', 'Ain Beni Mathar', 'Jerada',
    'Taourirt Autre', 'Tafraout', 'Assa', 'Foum Zguid', 'Tata',
    'Goulmima', 'Erfoud', 'Rissani', 'Arfoud', 'Khénifra', 'Mrirt',
    'El Hajeb', 'Beni Mellal-Khenifra', 'Sidi Bennour', 'Oulad Frej',
];

export default function PreorderModal({ show, onClose, product, quantity }: PreorderModalProps) {
    const { t } = useAurelia();
    const pDict = t.preorder;
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

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'var(--au-font-serif)', color: 'var(--au-dark)' }}>
                        {pDict.title}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded">×</button>
                </div>

                <div className="mb-6 flex gap-4 p-4 rounded-lg" style={{ background: 'var(--au-cream)' }}>
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        {product.image_url ? (
                            <ImageWithLoader
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                fallback={
                                    <ProductImagePlaceholder
                                        category={product.category?.name}
                                        productName={product.name}
                                        size="sm"
                                        showBrand={false}
                                    />
                                }
                            />
                        ) : (
                            <ProductImagePlaceholder
                                category={product.category?.name}
                                productName={product.name}
                                size="sm"
                                showBrand={false}
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <p className="text-sm text-gray-600">{Number(product.price).toFixed(2)} dh</p>
                        <div className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--au-gold)' }}>
                            <span>{pDict.quantity}</span>
                            <span className="font-bold">{quantity}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(!user || user.is_admin) && (
                        <div>
                            <label className="au-label">{pDict.fullName}</label>
                            <input
                                type="text"
                                className="au-input"
                                value={data.guest_name}
                                onChange={e => setData('guest_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.guest_name} className="mt-1" />
                        </div>
                    )}

                    <div>
                        <label className="au-label">{pDict.phone}</label>
                        <div style={{ display: 'flex', border: '1px solid var(--au-border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--au-bg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: 'var(--au-surface)', borderRight: '1px solid var(--au-border)', color: 'var(--au-text)', fontWeight: 500, fontSize: '1rem', letterSpacing: '0.05em' }}>
                                +212
                            </div>
                            <input
                                type="tel"
                                value={data.phone.replace(/^\+212/, '')}
                                onChange={e => {
                                    let rest = e.target.value.replace(/[^0-9]/g, '');
                                    if (rest.startsWith('0')) {
                                        rest = rest.slice(1);
                                    }
                                    if (rest.length > 9) {
                                        rest = rest.slice(0, 9);
                                    }
                                    setData('phone', '+212' + rest);
                                }}
                                placeholder="6 12 34 56 78"
                                className="au-input"
                                style={{ border: 'none', borderRadius: 0, flex: 1, boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <InputError message={errors.phone} className="mt-1" />
                    </div>

                    <div>
                        <label className="au-label">{pDict.city}</label>
                        <select
                            className="au-input"
                            style={{ cursor: 'pointer' }}
                            value={data.delivery_city}
                            onChange={e => setData('delivery_city', e.target.value)}
                            required
                        >
                            <option value="" disabled>{pDict.chooseCity}</option>
                            {MOROCCO_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <InputError message={errors.delivery_city} className="mt-1" />
                    </div>

                    <div>
                        <label className="au-label">{pDict.address}</label>
                        <textarea
                            className="au-textarea"
                            rows={3}
                            value={data.shipping_address}
                            onChange={e => setData('shipping_address', e.target.value)}
                            required
                        />
                        <InputError message={errors.shipping_address} className="mt-1" />
                    </div>

                    {(errors as any).preorder && (
                        <div className="p-3 bg-red-50 text-red-800 text-sm rounded border border-red-200">
                            {(errors as any).preorder}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="au-btn-gold"
                            style={{ width: '100%', textAlign: 'center' }}
                        >
                            {processing ? pDict.submitting : pDict.confirm}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
