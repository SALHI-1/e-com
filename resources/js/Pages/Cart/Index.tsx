import { PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';

interface CartItem {
    product: {
        id: number;
        name: string;
        price: number;
        stock: number;
        image_url?: string;
        category?: { name: string };
    };
    quantity: number;
    subtotal: number;
}

interface Props extends PageProps {
    cartItems: CartItem[];
    totalAmount: number;
    cartCount: number;
    flash?: { success?: string };
    errors?: Record<string, string>;
}

// Toutes les villes du Maroc
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

// Villes avec livraison gratuite (peu importe le montant)
const FREE_DELIVERY_CITIES = ['casablanca', 'tanger'];
const FREE_DELIVERY_THRESHOLD = 299; // DH — livraison gratuite si subtotal STRICTEMENT supérieur à 299 DH
const DELIVERY_FEE = 20; // DH

function getDeliveryFee(city: string, subtotal: number): number {
    // 1. Toujours gratuit si commande STRICTEMENT supérieure à 299 DH (quelle que soit la ville)
    if (subtotal > FREE_DELIVERY_THRESHOLD) return 0;
    // 2. Gratuit pour Casablanca et Tanger (quelle que soit la valeur)
    if (city && FREE_DELIVERY_CITIES.includes(city.toLowerCase())) return 0;
    // 3. Sinon frais standard
    return DELIVERY_FEE;
}

/* ── Toast Ourélia ─────────────────────────────────────────────────── */
function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isError = type === 'error';
    const isSuccess = type === 'success';

    return (
        <div style={{
            position: 'fixed',
            top: '88px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            padding: '18px 22px',
            borderRadius: '6px',
            background: isError ? '#5c1f1f' : 'var(--au-dark, #211A14)',
            boxShadow: '0 12px 40px rgba(33,26,20,.28), 0 2px 8px rgba(0,0,0,.12)',
            color: 'var(--au-bg, #F6F0E4)',
            minWidth: '290px',
            maxWidth: '400px',
            animation: 'toastSlideIn .4s cubic-bezier(.16,1,.3,1)',
            borderLeft: `4px solid ${isError ? '#e07070' : 'var(--au-gold, #C2A063)'}`,
            fontFamily: 'var(--au-font-sans, sans-serif)',
        }}>
            {/* Icône */}
            <span style={{
                fontSize: '18px',
                lineHeight: 1,
                flexShrink: 0,
                marginTop: '2px',
                color: isError ? '#e07070' : 'var(--au-gold, #C2A063)',
                fontFamily: 'var(--au-font-serif)',
            }}>
                {isSuccess ? '✓' : isError ? '✕' : 'ℹ'}
            </span>
            <div style={{ flex: 1 }}>
                {/* Titre de marque */}
                <p style={{
                    margin: 0,
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    color: 'var(--au-gold, #C2A063)',
                    lineHeight: 1,
                    marginBottom: '6px',
                }}>
                    {isError ? 'Erreur' : 'Ourélia'}
                </p>
                {/* Message */}
                <p style={{
                    margin: 0,
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--au-cream, #F0E6D4)',
                    lineHeight: 1.5,
                    letterSpacing: '.01em',
                }}>
                    {message}
                </p>
            </div>
            {/* Fermer */}
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(240,230,212,.45)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '0 0 0 6px',
                    flexShrink: 0,
                    marginTop: '1px',
                }}
                aria-label="Fermer"
            >
                ×
            </button>
        </div>
    );
}


export default function Index(props: Props) {
    return (
        <ClientLayout auth={props.auth} cartCount={props.cartCount} title="Aurélia">
            <CartContent {...props} />
        </ClientLayout>
    );
}

function CartContent({ auth, cartItems, totalAmount, flash, errors }: Props) {
    const { t } = useAurelia();
    const [showCheckout, setShowCheckout] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const { data, setData, post, processing, errors: formErrors } = useForm<{
        shipping_address: string;
        phone: string;
        guest_name: string;
        delivery_city: string;
    }>({
        shipping_address: '',
        phone: auth.user?.phone || '+212',
        guest_name: '',
        delivery_city: '',
    });

    // Afficher les flash/errors comme toast au montage
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (errors?.cart || errors?.stock) {
            setToast({ message: errors.cart || errors.stock || 'Une erreur est survenue.', type: 'error' });
        }
    }, [flash?.success, errors?.cart, errors?.stock]);

    // Calcul dynamique des frais de livraison
    const deliveryFee = useMemo(
        () => getDeliveryFee(data.delivery_city, totalAmount),
        [data.delivery_city, totalAmount]
    );
    const grandTotal = totalAmount + deliveryFee;

    const updateQuantity = (productId: number, quantity: number) => {
        router.patch(route('cart.update'), { product_id: productId, quantity }, { preserveScroll: true });
    };

    const removeItem = (productId: number) => {
        router.delete(route('cart.remove'), { data: { product_id: productId }, preserveScroll: true });
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cart.checkout'));
    };

    return (
        <>
            <Head title={`${t.cartTitle} — Aurélia`} />

            {/* ── Toast notifications ── */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="au-cart-section">

                {cartItems.length === 0 ? (
                    <div className="au-empty">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A4038" strokeWidth="1" style={{ margin: '0 auto 1.5rem' }}>
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <p>{t.cartEmpty}</p>
                        <div style={{ marginTop: '2rem' }}>
                            <Link href={route('home')} className="au-btn-gold">
                                {t.backShop}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="au-cart-title">{t.cartTitle}</h1>
                        <div className="au-cart-grid">

                            {/* ── Items ── */}
                            <div className="au-cart-items">
                                {cartItems.map((item) => (
                                    <div key={item.product.id} className="au-cart-item">
                                        {item.product.image_url && (
                                            <img
                                                src={item.product.image_url}
                                                alt={item.product.name}
                                                className="au-cart-item-img"
                                            />
                                        )}
                                        <div className="au-cart-item-info">
                                            <p className="au-cart-item-name">{item.product.name}</p>
                                            {item.product.category && (
                                                <p className="au-cart-item-cat">{item.product.category.name}</p>
                                            )}
                                            <p className="au-cart-item-price">{item.product.price} dh / {t.unit}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--au-border)', borderRadius: '4px', overflow: 'hidden', width: '80px', height: '36px' }}>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                                style={{ padding: '0 10px', background: 'transparent', border: 'none', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', color: 'var(--au-text)' }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.product.stock}
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value) || 1;
                                                    if (val > item.product.stock) {
                                                        setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
                                                        updateQuantity(item.product.id, item.product.stock);
                                                    } else {
                                                        updateQuantity(item.product.id, Math.max(1, val));
                                                    }
                                                }}
                                                className="au-qty"
                                                style={{ border: 'none', borderRadius: 0, textAlign: 'center', width: '100%', MozAppearance: 'textfield', padding: 0 }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (item.quantity >= item.product.stock) {
                                                        setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
                                                    } else {
                                                        updateQuantity(item.product.id, item.quantity + 1);
                                                    }
                                                }}
                                                style={{ padding: '0 10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--au-text)' }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="au-cart-item-subtotal">{item.subtotal.toFixed(2)} dh</span>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="au-cart-remove"
                                            title="Retirer du panier"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* ── Summary + Checkout ── */}
                            <div className="au-cart-summary">
                                <h2 className="au-cart-summary-title">Récapitulatif</h2>
                                <div className="au-cart-summary-row">
                                    <span>{t.subtotal}</span>
                                    <span>{totalAmount.toFixed(2)} dh</span>
                                </div>

                                {/* Frais de livraison — toujours affichés */}
                                <div className="au-cart-summary-row">
                                    <span>{t.deliveryFee}</span>
                                    {deliveryFee === 0 ? (
                                        <span style={{ color: 'var(--au-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ textDecoration: 'line-through', color: 'var(--au-text-muted)', fontWeight: 400, fontSize: '0.85em' }}>20 dh</span>
                                            <span>0 DH ✓</span>
                                        </span>
                                    ) : (
                                        <span style={{ fontWeight: 600 }}>
                                            {deliveryFee.toFixed(2)} dh
                                        </span>
                                    )}
                                </div>

                                {/* Note livraison gratuite si ville non choisie ou hors seuil */}
                                {deliveryFee > 0 && (
                                    <div style={{
                                        fontSize: '0.72rem',
                                        color: 'var(--au-text-muted)',
                                        background: 'var(--au-surface)',
                                        borderRadius: '6px',
                                        padding: '0.4rem 0.6rem',
                                        marginBottom: '0.4rem',
                                        lineHeight: 1.4,
                                    }}>
                                        💡 Livraison gratuite pour Casablanca & Tanger, ou pour toute commande supérieure à 299 dh.
                                    </div>
                                )}

                                <div className="au-cart-summary-total">
                                    <span>{t.orderTotal}</span>
                                    <span>{grandTotal.toFixed(2)} dh</span>
                                </div>

                                {!showCheckout ? (
                                    <button
                                        onClick={() => setShowCheckout(true)}
                                        className="au-btn-gold"
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        {t.checkout}
                                    </button>
                                ) : (
                                    <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div className="au-checkout-note" dangerouslySetInnerHTML={{ __html: t.waNote.replace('WhatsApp', '<strong>WhatsApp</strong>') }} />

                                        {/* Guest fields (sans email) */}
                                        {!auth.user && (
                                            <div>
                                                <label className="au-label">{t.guestName}</label>
                                                <input
                                                    type="text"
                                                    value={data.guest_name}
                                                    onChange={e => setData('guest_name', e.target.value)}
                                                    placeholder="Jean Dupont"
                                                    className="au-input"
                                                />
                                                {formErrors.guest_name && <p className="au-field-error">{formErrors.guest_name}</p>}
                                            </div>
                                        )}

                                        {/* Téléphone */}
                                        <div>
                                            <label className="au-label">
                                                {t.waPhone} <span className="au-label-hint" style={{ textTransform: 'none', letterSpacing: 'normal' }}>(ex: +212612345678)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={e => {
                                                    let val = e.target.value;
                                                    if (!val.startsWith('+212')) {
                                                        val = '+212' + val.replace(/^\+?212/, '');
                                                    }
                                                    let rest = val.slice(4).replace(/[^0-9]/g, '');
                                                    if (rest.startsWith('0')) {
                                                        rest = rest.slice(0, 10);
                                                    } else {
                                                        rest = rest.slice(0, 9);
                                                    }
                                                    setData('phone', '+212' + rest);
                                                }}
                                                placeholder="+212 6 12 34 56 78"
                                                className="au-input"
                                            />
                                            {formErrors.phone && <p className="au-field-error">{formErrors.phone}</p>}
                                        </div>

                                        {/* Ville de livraison */}
                                        <div>
                                            <label className="au-label">{t.deliveryCity}</label>
                                            <select
                                                value={data.delivery_city}
                                                onChange={e => setData('delivery_city', e.target.value)}
                                                className="au-input"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <option value="">— Choisir une ville —</option>
                                                {MOROCCO_CITIES.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            {formErrors.delivery_city && <p className="au-field-error">{formErrors.delivery_city}</p>}
                                            {/* Aperçu frais dès qu'une ville est choisie */}
                                            {data.delivery_city && (
                                                <p style={{ fontSize: '0.78rem', marginTop: '0.3rem', color: deliveryFee === 0 ? 'var(--au-gold)' : 'var(--au-text-muted)' }}>
                                                    {deliveryFee === 0
                                                        ? `✓ Livraison gratuite pour ${data.delivery_city}`
                                                        : `Frais de livraison : ${deliveryFee} dh`}
                                                </p>
                                            )}
                                        </div>

                                        {/* Adresse */}
                                        <div>
                                            <label className="au-label">{t.address}</label>
                                            <textarea
                                                value={data.shipping_address}
                                                onChange={e => setData('shipping_address', e.target.value)}
                                                placeholder="Rue, quartier, code postal…"
                                                rows={3}
                                                className="au-textarea"
                                            />
                                            {formErrors.shipping_address && <p className="au-field-error">{formErrors.shipping_address}</p>}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                                            <button
                                                type="button"
                                                onClick={() => setShowCheckout(false)}
                                                className="au-btn-ghost"
                                                style={{ flex: 1 }}
                                            >
                                                {t.back}
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="au-btn-gold"
                                                style={{ flex: 1, textAlign: 'center' }}
                                            >
                                                {processing ? t.sending : t.confirm}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
