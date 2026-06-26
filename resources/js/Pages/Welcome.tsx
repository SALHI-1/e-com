import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

/* ─── Google Fonts injected via style tag ─────────────────────────────────── */
const FontLoader = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #1C1712; color: #FBF7F0; }

        .aurelia-page {
            min-height: 100vh;
            background: #1C1712;
            color: #FBF7F0;
            font-family: 'Jost', sans-serif;
        }

        /* ── Nav ── */
        .au-nav {
            position: sticky; top: 0; z-index: 100;
            background: rgba(28,23,18,0.96);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(194,160,99,0.15);
            padding: 0 2.5rem;
            display: flex; align-items: center; justify-content: space-between;
            height: 72px;
        }
        .au-nav-logo {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.6rem; font-weight: 600;
            letter-spacing: 0.28em; color: #FBF7F0;
            text-decoration: none;
        }
        .au-nav-logo span { color: #C2A063; }
        .au-nav-links { display: flex; align-items: center; gap: 2rem; }
        .au-nav-link {
            font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
            color: #A89880; text-decoration: none; transition: color .2s;
        }
        .au-nav-link:hover { color: #FBF7F0; }
        .au-cart-btn {
            position: relative; display: flex; align-items: center; gap: 0.5rem;
            font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
            color: #A89880; text-decoration: none; transition: color .2s;
        }
        .au-cart-btn:hover { color: #C2A063; }
        .au-cart-badge {
            position: absolute; top: -8px; right: -10px;
            background: #C2A063; color: #1C1712;
            font-size: 0.6rem; font-weight: 700;
            width: 18px; height: 18px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
        }
        .au-btn-outline {
            border: 1px solid rgba(194,160,99,0.6); color: #C2A063;
            padding: 0.4rem 1.2rem; font-size: 0.7rem;
            letter-spacing: 0.14em; text-transform: uppercase;
            text-decoration: none; transition: all .25s;
            font-family: 'Jost', sans-serif;
        }
        .au-btn-outline:hover { background: #C2A063; color: #1C1712; }

        /* ── Hero ── */
        .au-hero {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            text-align: center;
            padding: 6rem 2rem 5rem;
            background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(194,160,99,0.08) 0%, transparent 70%);
        }
        .au-hero-eyebrow {
            font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase;
            color: #C2A063; margin-bottom: 1.5rem;
        }
        .au-hero-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(3.5rem, 10vw, 7rem);
            font-weight: 500; letter-spacing: 0.22em;
            line-height: 1; color: #FBF7F0;
            margin-bottom: 1rem;
        }
        .au-hero-divider {
            width: 80px; height: 1px;
            background: linear-gradient(90deg, transparent, #C2A063, transparent);
            margin: 1.5rem auto;
        }
        .au-hero-sub {
            font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
            color: #C2A063; margin-bottom: 2.5rem;
        }
        .au-hero-desc {
            max-width: 480px; color: #A89880;
            font-size: 0.95rem; line-height: 1.7; margin-bottom: 2.5rem;
        }
        .au-btn-gold {
            display: inline-block;
            background: #C2A063; color: #1C1712;
            padding: 0.85rem 2.5rem;
            font-size: 0.72rem; font-weight: 600;
            letter-spacing: 0.2em; text-transform: uppercase;
            text-decoration: none; transition: background .25s;
            font-family: 'Jost', sans-serif;
        }
        .au-btn-gold:hover { background: #D4B880; }

        /* ── Flash messages ── */
        .au-flash {
            margin: 1rem 2.5rem 0;
            padding: 0.9rem 1.2rem;
            border: 1px solid rgba(194,160,99,0.4);
            color: #C2A063; font-size: 0.85rem; letter-spacing: 0.05em;
        }
        .au-flash-error {
            border-color: rgba(200,80,80,0.4); color: #d9846a;
        }

        /* ── Category filters ── */
        .au-filters {
            display: flex; align-items: center; justify-content: center;
            gap: 0; padding: 0 2.5rem;
            border-bottom: 1px solid rgba(194,160,99,0.12);
            overflow-x: auto;
        }
        .au-filter-btn {
            background: none; border: none; cursor: pointer;
            padding: 1rem 1.5rem;
            font-family: 'Jost', sans-serif;
            font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
            color: #6B6058; border-bottom: 2px solid transparent;
            transition: all .2s; white-space: nowrap;
        }
        .au-filter-btn:hover { color: #A89880; }
        .au-filter-btn.active { color: #C2A063; border-bottom-color: #C2A063; }

        /* ── Product Grid ── */
        .au-grid-section { padding: 3rem 2.5rem 5rem; }
        .au-grid-header {
            display: flex; justify-content: space-between; align-items: baseline;
            margin-bottom: 2.5rem;
        }
        .au-grid-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.6rem; font-weight: 400; letter-spacing: 0.06em;
            color: #FBF7F0;
        }
        .au-grid-count { font-size: 0.72rem; color: #6B6058; letter-spacing: 0.1em; }
        .au-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.5rem;
        }

        /* ── Product Card ── */
        .au-card {
            background: #211C16;
            border: 1px solid rgba(194,160,99,0.08);
            display: flex; flex-direction: column;
            transition: border-color .25s, transform .25s;
            cursor: pointer;
        }
        .au-card:hover {
            border-color: rgba(194,160,99,0.35);
            transform: translateY(-3px);
        }
        .au-card-img {
            width: 100%; aspect-ratio: 1;
            background: #2A231B;
            display: flex; align-items: center; justify-content: center;
            position: relative; overflow: hidden;
        }
        .au-card-img-placeholder {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 0.5rem;
        }
        .au-card-img-icon {
            width: 48px; height: 48px; opacity: 0.2;
        }
        .au-card-img-text {
            font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
            color: #4A4038; font-family: 'Jost', sans-serif;
        }
        .au-badge {
            position: absolute; top: 0.75rem; left: 0.75rem;
            font-size: 0.55rem; letter-spacing: 0.15em; text-transform: uppercase;
            padding: 0.25rem 0.6rem; font-family: 'Jost', sans-serif;
        }
        .au-badge-new { background: #C2A063; color: #1C1712; }
        .au-badge-best { background: transparent; border: 1px solid #C2A063; color: #C2A063; }
        .au-card-body { padding: 1.1rem 1.2rem 1.4rem; flex: 1; display: flex; flex-direction: column; }
        .au-card-cat {
            font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
            color: #6B6058; margin-bottom: 0.4rem;
        }
        .au-card-name {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.15rem; font-weight: 500; line-height: 1.25;
            color: #FBF7F0; margin-bottom: 0.5rem;
        }
        .au-card-price {
            font-size: 1rem; color: #C2A063; letter-spacing: 0.05em;
            margin-bottom: 1.1rem; margin-top: auto;
        }
        .au-card-actions { display: flex; gap: 0.5rem; align-items: center; }
        .au-qty {
            width: 44px; background: #2A231B;
            border: 1px solid rgba(194,160,99,0.2); color: #FBF7F0;
            padding: 0.55rem 0.4rem; text-align: center;
            font-family: 'Jost', sans-serif; font-size: 0.85rem;
        }
        .au-qty:focus { outline: none; border-color: #C2A063; }
        .au-add-btn {
            flex: 1; background: transparent;
            border: 1px solid rgba(194,160,99,0.4); color: #C2A063;
            padding: 0.55rem 0.8rem;
            font-family: 'Jost', sans-serif;
            font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
            cursor: pointer; transition: all .2s;
        }
        .au-add-btn:hover:not(:disabled) { background: #C2A063; color: #1C1712; }
        .au-add-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Empty state ── */
        .au-empty {
            text-align: center; padding: 6rem 2rem;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.5rem; font-weight: 300;
            color: #4A4038; letter-spacing: 0.1em;
        }

        /* ── Footer ── */
        .au-footer {
            border-top: 1px solid rgba(194,160,99,0.12);
            padding: 3rem 2.5rem;
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 1.5rem;
        }
        .au-footer-brand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.1rem; letter-spacing: 0.25em; color: #6B6058;
        }
        .au-footer-copy {
            font-size: 0.65rem; letter-spacing: 0.1em;
            color: #4A4038; text-transform: uppercase;
        }
        .au-footer-links { display: flex; gap: 2rem; }
        .au-footer-link {
            font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;
            color: #6B6058; text-decoration: none; transition: color .2s;
        }
        .au-footer-link:hover { color: #C2A063; }

        @media (max-width: 640px) {
            .au-nav { padding: 0 1.2rem; }
            .au-nav-logo { font-size: 1.2rem; }
            .au-grid-section { padding: 2rem 1.2rem 4rem; }
            .au-filters { justify-content: flex-start; }
            .au-footer { flex-direction: column; align-items: flex-start; }
        }
    `}</style>
);

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
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div className="au-card-img-placeholder">
                        <svg className="au-card-img-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="16" r="8" stroke="#C2A063" strokeWidth="1.5"/>
                            <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#C2A063" strokeWidth="1.5" strokeLinecap="round"/>
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

                <div className="au-card-actions">
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
                        {loading ? '…' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
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
        <div className="aurelia-page">
            <Head title="Aurélia — Essential Care" />
            <FontLoader />

            {/* ── Navigation ── */}
            <nav className="au-nav">
                <a href="/" className="au-nav-logo">AURÉLIA</a>

                <div className="au-nav-links">
                    <Link href={route('cart.index')} className="au-cart-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        Cart
                        {cartCount > 0 && <span className="au-cart-badge">{cartCount}</span>}
                    </Link>

                    {auth.user ? (
                        <>
                            <Link href={route('profile.edit')} className="au-nav-link">Profile</Link>
                            <Link href={route('logout')} method="post" as="button" className="au-btn-outline">Sign Out</Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')} className="au-nav-link">Sign In</Link>
                            <Link href={route('register')} className="au-btn-outline">Create Account</Link>
                        </>
                    )}
                </div>
            </nav>

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

            {/* ── Footer ── */}
            <footer className="au-footer">
                <span className="au-footer-brand">AURÉLIA</span>
                <nav className="au-footer-links">
                    <a href="#" className="au-footer-link">About</a>
                    <a href="#" className="au-footer-link">Ingredients</a>
                    <a href="#" className="au-footer-link">Sustainability</a>
                    <a href="#" className="au-footer-link">Contact</a>
                </nav>
                <span className="au-footer-copy">© {new Date().getFullYear()} Aurélia. All rights reserved.</span>
            </footer>
        </div>
    );
}
