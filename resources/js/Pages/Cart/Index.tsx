import { PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
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

    const { data, setData, post, processing, errors: formErrors } = useForm<{
        shipping_address: string;
        phone: string;
        guest_name: string;
        guest_email: string;
    }>({
        shipping_address: '',
        phone: auth.user?.phone ?? '',
        guest_name: '',
        guest_email: '',
    });

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

            {/* ── Flash / Errors ── */}
            {flash?.success && <div className="au-flash">{flash.success}</div>}
            {(errors?.cart || errors?.stock) && (
                <div className="au-flash au-flash-error">{errors.cart || errors.stock}</div>
            )}

            <div className="au-cart-section">

                {cartItems.length === 0 ? (
                    <div className="au-empty">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A4038" strokeWidth="1" style={{ margin: '0 auto 1.5rem' }}>
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
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
                                            <p className="au-cart-item-price">{item.product.price} € / {t.unit}</p>
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            max={item.product.stock}
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                                            className="au-qty"
                                        />
                                        <span className="au-cart-item-subtotal">{item.subtotal.toFixed(2)} €</span>
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
                                    <span>{totalAmount.toFixed(2)} €</span>
                                </div>
                                <div className="au-cart-summary-row">
                                    <span>{t.shipping}</span>
                                    <span style={{ color: 'var(--au-gold)' }}>{t.free}</span>
                                </div>
                                <div className="au-cart-summary-total">
                                    <span>{t.total}</span>
                                    <span>{totalAmount.toFixed(2)} €</span>
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

                                        {/* Guest fields */}
                                        {!auth.user && (
                                            <>
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
                                                <div>
                                                    <label className="au-label">{t.guestEmail}</label>
                                                    <input
                                                        type="email"
                                                        value={data.guest_email}
                                                        onChange={e => setData('guest_email', e.target.value)}
                                                        placeholder="jean@exemple.fr"
                                                        className="au-input"
                                                    />
                                                    {formErrors.guest_email && <p className="au-field-error">{formErrors.guest_email}</p>}
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <label className="au-label">
                                                {t.waPhone} <span className="au-label-hint" style={{ textTransform: 'none', letterSpacing: 'normal' }}>(ex: +33612345678)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder="+33 6 12 34 56 78"
                                                className="au-input"
                                            />
                                            {formErrors.phone && <p className="au-field-error">{formErrors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="au-label">{t.address}</label>
                                            <textarea
                                                value={data.shipping_address}
                                                onChange={e => setData('shipping_address', e.target.value)}
                                                placeholder="12 rue de la Paix, 75001 Paris"
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
