import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';
import PreorderModal from '@/Components/PreorderModal';

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
    allow_preorder: boolean;
    image_url?: string;
    category: {
        id: number;
        name: string;
    };
    reviews_avg_rating?: number;
    reviews_count?: number;
    reviews?: {
        id: number;
        user_id: number;
        rating: number;
        created_at: string;
        user: { name: string };
    }[];
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

function StarRating({ rating, size = 16, color = 'var(--au-gold, #C2A063)' }: { rating: number, size?: number, color?: string }) {
    return (
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= rating ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'inherit' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            ))}
        </div>
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

function ProductDetail({ product, flash, errors, auth }: Props) {
    const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
    const [quantity, setQuantity] = useState<number | string>(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [showPreorder, setShowPreorder] = useState(false);
    
    const userReview = product.reviews?.find(r => r.user_id === auth.user?.id);

    // Afficher le toast dès qu'un flash/error arrive
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (errors?.quantity) {
            setToast({ message: errors.quantity, type: 'error' });
        }
    }, [flash?.success, errors?.quantity]);

    const addToCart = () => {
        let finalQty = parseInt(quantity as string) || 1;
        if (finalQty > product.stock) {
            setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
            setQuantity(product.stock);
            return;
        }
        if (finalQty < 1) {
            finalQty = 1;
            setQuantity(1);
        }
        setLoading(true);
        router.post(route('cart.add'), { product_id: product.id, quantity: finalQty }, {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const isOut = product.stock === 0;
    const isPreorderable = isOut && product.allow_preorder;
    const isNew = product.is_new && !product.is_bestseller;
    const isBest = product.is_bestseller;
    const isSale = !!product.price_old || !!product.is_sale;
    const tag = isOut && !isPreorderable ? 'out' : isBest ? 'best' : isNew ? 'new' : isSale ? 'sale' : undefined;

    return (
        <div className="au-container" style={{ paddingTop: '40px', paddingBottom: '40px', minHeight: '60vh' }}>
            <Head>
                <title>{`${product.name} · Ourélia`}</title>
                <meta head-key="description" name="description" content={product.description || `Découvrez ${product.name} chez Ourélia.`} />
                <link head-key="canonical" rel="canonical" href={route('product.show', product.id)} />
                <style>{`
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                `}</style>
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
                        <img src={product.image_url} alt={`Soin Ourélia - ${product.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
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

                    <h1 className="au-h3" style={{ marginBottom: '8px' }}>{product.name}</h1>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <StarRating rating={Math.round(product.reviews_avg_rating || 0)} />
                        <span style={{ fontSize: '13px', color: 'var(--au-text-muted)' }}>
                            {product.reviews_count || 0} avis
                        </span>
                    </div>

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
                                onClick={() => {
                                    const curr = parseInt(quantity as string) || 1;
                                    setQuantity(Math.max(1, curr - 1));
                                }}
                                disabled={(isOut && !isPreorderable) || (parseInt(quantity as string) || 1) <= 1}
                                style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: (isOut && !isPreorderable) || (parseInt(quantity as string) || 1) <= 1 ? 'not-allowed' : 'pointer', color: 'var(--au-text)', fontSize: '1.2rem' }}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                disabled={isOut && !isPreorderable}
                                style={{ width: '40px', height: '100%', border: 'none', borderRadius: 0, textAlign: 'center', MozAppearance: 'textfield', padding: 0 }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const curr = parseInt(quantity as string) || 1;
                                    if (!isPreorderable && curr >= product.stock) {
                                        setToast({ message: 'Le stock est insuffisant pour le moment.', type: 'info' });
                                    } else {
                                        setQuantity(curr + 1);
                                    }
                                }}
                                disabled={isOut && !isPreorderable}
                                style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: isOut && !isPreorderable ? 'not-allowed' : 'pointer', color: 'var(--au-text)', fontSize: '1.2rem' }}
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="au-btn"
                            onClick={isPreorderable ? () => setShowPreorder(true) : addToCart}
                            disabled={loading || (isOut && !isPreorderable)}
                            style={{ flex: 1, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {loading ? '…' : isPreorderable ? 'Précommander' : isOut ? 'Épuisé' : t.addCart}
                        </button>
                    </div>

                    {isOut && (
                        <p style={{ color: 'var(--au-sale)', fontSize: '0.9rem', marginTop: '10px' }}>
                            Ce produit est actuellement en rupture de stock.
                        </p>
                    )}
                </div>
            </div>

            {/* Section Avis */}
            <div style={{ marginTop: '80px', borderTop: '1px solid var(--au-border)', paddingTop: '40px' }}>
                <h2 className="au-h4" style={{ marginBottom: '24px' }}>Avis clients</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {/* Formulaire d'avis */}
                    <div>
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', fontFamily: 'var(--au-font-serif)' }}>Laisser un avis</h3>
                        {auth.user ? (
                            userReview ? (
                                <div style={{ padding: '24px', background: 'var(--au-bg-alt, #efe9db)', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '14px', color: 'var(--au-text-muted)', marginBottom: '12px' }}>Vous avez déjà évalué ce produit :</p>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StarRating rating={userReview.rating} size={20} />
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const data = new FormData(form);
                                    router.post(route('reviews.store', product.id), Object.fromEntries(data.entries()), {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            setToast({ message: 'Votre avis a été enregistré avec succès.', type: 'success' });
                                            form.reset();
                                        },
                                        onError: (err) => {
                                            setToast({ message: Object.values(err)[0] as string, type: 'error' });
                                        }
                                    });
                                }}>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--au-text-muted)' }}>Note</label>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <label key={star} style={{ cursor: 'pointer' }}>
                                                    <input type="radio" name="rating" value={star} required style={{ display: 'none' }} 
                                                        onChange={(e) => {
                                                            const svg = e.target.parentElement?.parentElement?.querySelectorAll('svg');
                                                            svg?.forEach((s, i) => {
                                                                s.style.fill = i < star ? 'var(--au-gold, #C2A063)' : 'none';
                                                            });
                                                        }}
                                                    />
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--au-gold, #C2A063)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                    </svg>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="au-btn" style={{ padding: '12px 24px' }}>Publier mon avis</button>
                                </form>
                            )
                        ) : (
                            <div style={{ padding: '24px', background: 'var(--au-bg-alt, #efe9db)', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ fontSize: '14px', color: 'var(--au-text-muted)', marginBottom: '16px' }}>Vous devez être connecté pour laisser un avis.</p>
                                <Link href={route('login')} className="au-btn-outline" style={{ display: 'inline-block', padding: '10px 20px' }}>Se connecter</Link>
                            </div>
                        )}
                    </div>

                    {/* Liste des avis */}
                    <div>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {product.reviews.map(review => (
                                    <div key={review.id} style={{ borderBottom: '1px solid var(--au-border)', paddingBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 500, fontSize: '14px' }}>{review.user.name}</span>
                                            <span style={{ fontSize: '12px', color: 'var(--au-text-muted)' }}>
                                                {new Date(review.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>
                                        <div>
                                            <StarRating rating={review.rating} size={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ fontSize: '14px', color: 'var(--au-text-muted)', fontStyle: 'italic' }}>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
                        )}
                    </div>
                </div>
            </div>
            <PreorderModal
                show={showPreorder}
                onClose={() => setShowPreorder(false)}
                product={product}
                quantity={parseInt(quantity as string) || 1}
            />
        </div>
    );
}
