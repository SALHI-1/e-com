import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    price_old?: number;
    stock: number;
    is_new: boolean;
    is_sale: boolean;
    is_bestseller: boolean;
    image_url?: string;
    category: {
        id: number;
        name: string;
    };
}

interface Props extends PageProps {
    product: Product;
    cartCount: number;
    flash?: { success?: string };
    errors?: any;
}

export default function Show(props: Props) {
    return (
        <ClientLayout auth={props.auth} cartCount={props.cartCount} title={props.product.name}>
            <ProductDetail {...props} />
        </ClientLayout>
    );
}

/* ── Toast Ourélia ────────────────────────────────────────────────────── */
function OureliaToast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isError = type === 'error';
    const isSuccess = type === 'success';
    return (
        <div style={{
            position: 'fixed', top: '88px', right: '24px', zIndex: 9999,
            display: 'flex', alignItems: 'flex-start', gap: '14px',
            padding: '18px 22px', borderRadius: '6px',
            background: isError ? '#5c1f1f' : 'var(--au-dark, #211A14)',
            boxShadow: '0 12px 40px rgba(33,26,20,.28), 0 2px 8px rgba(0,0,0,.12)',
            color: 'var(--au-bg, #F6F0E4)', minWidth: '290px', maxWidth: '400px',
            animation: 'toastSlideIn .4s cubic-bezier(.16,1,.3,1)',
            borderLeft: `4px solid ${isError ? '#e07070' : 'var(--au-gold, #C2A063)'}`,
            fontFamily: 'var(--au-font-sans, sans-serif)',
        }}>
            <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0, marginTop: '2px', color: isError ? '#e07070' : 'var(--au-gold, #C2A063)', fontFamily: 'var(--au-font-serif)' }}>
                {isSuccess ? '✓' : isError ? '✕' : 'ℹ'}
            </span>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--au-gold, #C2A063)', lineHeight: 1, marginBottom: '6px' }}>
                    {isError ? 'Erreur' : 'Ourélia'}
                </p>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 300, color: 'var(--au-cream, #F0E6D4)', lineHeight: 1.5, letterSpacing: '.01em' }}>
                    {message}
                </p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(240,230,212,.45)', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '0 0 0 6px', flexShrink: 0, marginTop: '1px' }} aria-label="Fermer">
                ×
            </button>
        </div>
    );
}

function ProductDetail({ product, flash, errors }: Props) {
    const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    // Afficher le toast dès qu'un flash/error arrive
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (errors?.quantity) {
            setToast({ message: errors.quantity, type: 'error' });
        }
    }, [flash?.success, errors?.quantity]);

    const addToCart = () => {
        setLoading(true);
        router.post(route('cart.add'), { product_id: product.id, quantity }, {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const isOut = product.stock === 0;
    const isNew = product.is_new && !product.is_bestseller;
    const isBest = product.is_bestseller;
    const isSale = !!product.price_old || !!product.is_sale;
    const tag = isOut ? 'out' : isBest ? 'best' : isNew ? 'new' : isSale ? 'sale' : undefined;

    return (
        <div className="au-container" style={{ paddingTop: '40px', paddingBottom: '40px', minHeight: '60vh' }}>
            <Head>
                <title>{`${product.name} · Ourélia`}</title>
                <meta head-key="description" name="description" content={product.description || `Découvrez ${product.name} chez Ourélia.`} />
            </Head>

            {/* ── Toast Ourélia ── */}
            {toast && (
                <OureliaToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
                
                {/* Product Image */}
                <div style={{ background: categoryTint(product.category.name), borderRadius: '8px', overflow: 'hidden', position: 'relative', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    {tag && (
                        <div className="au-prod-tag" style={tag === 'out' ? { background: 'var(--au-dark)', color: 'var(--au-bg)', position: 'absolute', top: '16px', left: '16px' } : { position: 'absolute', top: '16px', left: '16px' }}>
                            {tag === 'out' ? 'Épuisé' : tagLabel(tag)}
                        </div>
                    )}
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--au-text)' }}>
                            <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Ourélia</div>
                            <div style={{ fontFamily: 'var(--au-font-serif)', fontSize: '24px' }}>{categoryLabel(product.category.name)}</div>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div style={{ padding: '20px 0' }}>
                    <div className="au-eyebrow-sm" style={{ marginBottom: '16px' }}>
                        <Link href={`/?category=${encodeURIComponent(product.category.name)}#collection`} className="au-link-underline">
                            {categoryLabel(product.category.name)}
                        </Link>
                    </div>
                    
                    <h1 className="au-h3" style={{ marginBottom: '16px' }}>{product.name}</h1>
                    
                    <div className="au-price-lg" style={{ marginBottom: '24px' }}>
                        {product.price_old && (
                            <span style={{ textDecoration: 'line-through', color: 'var(--au-text-muted)', fontSize: '0.8em', marginRight: '10px' }}>
                                {Number(product.price_old).toFixed(2)} dh
                            </span>
                        )}
                        <span style={isSale && !isOut ? { color: 'var(--au-sale)' } : {}}>{Number(product.price).toFixed(2)} dh</span>
                    </div>

                    <p className="au-body-text" style={{ marginBottom: '40px', whiteSpace: 'pre-line', color: 'var(--au-text-muted)' }}>
                        {product.description || "Un soin essentiel, conçu avec des ingrédients naturels pour répondre aux besoins de votre peau avec efficacité."}
                    </p>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--au-border)', borderRadius: '4px', overflow: 'hidden', width: '120px', height: '48px' }}>
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={isOut || quantity <= 1}
                                style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: isOut || quantity <= 1 ? 'not-allowed' : 'pointer', color: 'var(--au-text)', fontSize: '1.2rem' }}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 1;
                                    if (val > product.stock) {
                                        setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
                                        setQuantity(product.stock);
                                    } else {
                                        setQuantity(Math.max(1, val));
                                    }
                                }}
                                disabled={isOut}
                                style={{ width: '40px', height: '100%', border: 'none', borderRadius: 0, textAlign: 'center', MozAppearance: 'textfield', padding: 0 }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (quantity >= product.stock) {
                                        setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
                                    } else {
                                        setQuantity(quantity + 1);
                                    }
                                }}
                                disabled={isOut}
                                style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: isOut ? 'not-allowed' : 'pointer', color: 'var(--au-text)', fontSize: '1.2rem' }}
                            >
                                +
                            </button>
                        </div>

                        <button 
                            type="button" 
                            className="au-btn" 
                            onClick={addToCart} 
                            disabled={loading || isOut}
                            style={{ flex: 1 }}
                        >
                            {loading ? '…' : isOut ? 'Épuisé' : t.addCart}
                        </button>
                    </div>

                    {isOut && (
                        <p style={{ color: 'var(--au-sale)', fontSize: '0.9rem', marginTop: '10px' }}>
                            Ce produit est actuellement en rupture de stock.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
