import React, { useState } from 'react';
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

function ProductDetail({ product, flash, errors }: Props) {
    const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

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

            {/* ── Flash Messages ── */}
            {(flash?.success || errors?.quantity) && (
                <div className="au-flash" style={{ background: errors?.quantity ? 'var(--au-sale)' : 'var(--au-gold)', marginBottom: '20px' }}>
                    {flash?.success || errors?.quantity}
                </div>
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
                                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                disabled={isOut}
                                style={{ width: '40px', height: '100%', border: 'none', borderRadius: 0, textAlign: 'center', MozAppearance: 'textfield', padding: 0 }}
                            />
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                disabled={isOut || quantity >= product.stock}
                                style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: isOut || quantity >= product.stock ? 'not-allowed' : 'pointer', color: 'var(--au-text)', fontSize: '1.2rem' }}
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
