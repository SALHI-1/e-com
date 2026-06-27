import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ClientLayout from '@/Layouts/ClientLayout';

/* ─── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const addToCart = () => {
        setLoading(true);
        router.post(route('cart.add'), { product_id: product.id, quantity }, {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="au-card">
            <div className="au-card-img">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                ) : (
                    <div className="au-card-img-placeholder">
                        <svg className="au-card-img-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="16" r="8" stroke="#C2A063" strokeWidth="1.5" />
                            <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#C2A063" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="au-card-img-text">No image</span>
                    </div>
                )}
                {product.is_new && !product.is_bestseller && (
                    <span className="au-badge au-badge-new">New</span>
                )}
                {product.is_bestseller && (
                    <span className="au-badge au-badge-best">Best Seller</span>
                )}
            </div>

            <div className="au-card-body">
                <p className="au-card-cat">{product.category.name}</p>
                <h3 className="au-card-name">{product.name}</h3>
                <p className="au-card-price">€ {Number(product.price).toFixed(2)}</p>

                <div className="au-card-actions" onClick={e => e.preventDefault()}>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                        className="au-qty"
                    />
                    <button
                        onClick={addToCart}
                        disabled={loading || product.stock === 0}
                        className="au-add-btn"
                    >
                        {loading ? '…' : product.stock === 0 ? 'Épuisé' : 'Ajouter'}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Welcome Page ─────────────────────────────────────────────────────────── */
export default function Welcome({
    auth,
    products,
    cartCount,
    flash,
    errors,
}: PageProps<{ products: any[]; cartCount: number; flash?: { success?: string }; errors?: any }>) {
    const categories = ['All', ...Array.from(new Set(products.map((p: any) => p.category.name))) as string[]];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? products
        : products.filter((p: any) => p.category.name === activeCategory);

    return (
        <ClientLayout auth={auth} cartCount={cartCount} title="Aurélia — Essential Care">

            {/* ── Flash Messages ── */}
            {flash?.success && <div className="au-flash">{flash.success}</div>}
            {errors?.quantity && <div className="au-flash au-flash-error">{errors.quantity}</div>}

            {/* ── Hero ── */}
            <section className="au-hero">
                <p className="au-hero-eyebrow">Luxury Beauty Since 1998</p>
                <h1 className="au-hero-title">AURÉLIA</h1>
                <div className="au-hero-divider" />
                <p className="au-hero-sub">Essential Care</p>
                <p className="au-hero-desc">
                    Crafted with the world's finest botanicals and rare extracts,
                    each formula is a ritual of self-care designed for the modern woman.
                </p>
                <a href="#collection" className="au-btn-gold">Discover the Collection</a>
            </section>

            {/* ── Category Filters ── */}
            <div className="au-filters" id="collection">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`au-filter-btn${activeCategory === cat ? ' active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Product Grid ── */}
            <section className="au-grid-section">
                <div className="au-grid-header">
                    <h2 className="au-grid-title">
                        {activeCategory === 'All' ? 'Our Collection' : activeCategory}
                    </h2>
                    <span className="au-grid-count">{filtered.length} products</span>
                </div>

                {filtered.length > 0 ? (
                    <div className="au-grid">
                        {filtered.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="au-empty">No products available at the moment.</div>
                )}
            </section>
        </ClientLayout>
    );
}
