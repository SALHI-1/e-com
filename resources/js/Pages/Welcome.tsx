import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import ClientLayout, { useAurelia, Lang, ProductCategory, ProductTag } from '@/Layouts/ClientLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ImageWithLoader from '@/Components/ImageWithLoader';
import PreorderModal from '@/Components/PreorderModal';
import ProductImagePlaceholder from '@/Components/ProductImagePlaceholder';



/* ============================================================================
 * Toast Ourélia — notification dans le thème de l'application
 * ========================================================================== */
function OureliaToast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <div
      className="au-toast"
      style={{
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
        animation: 'toastSlideIn .4s cubic-bezier(.16,1,.3,1)',
        borderLeft: `4px solid ${isError ? '#e07070' : 'var(--au-gold, #C2A063)'}`,
        fontFamily: 'var(--au-font-sans, sans-serif)',
      }}
    >
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
        {/* Titre */}
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

/* ============================================================================
 * Helpers
 * ========================================================================== */
/** Scroll fluide vers un élément par son id */
function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


/* ============================================================================
 * CSS Icons (Fallback when no image is present)
 * Restores ALL six packaging silhouettes from the original static design:
 * bottle · pump · tube · jar · flacon · pouch. A product renders the shape in
 * `product.shape` when present, otherwise we infer a sensible shape from its
 * category / name so each item no longer collapses to a generic bottle.
 * ========================================================================== */
type ProductShape = 'bottle' | 'pump' | 'tube' | 'jar' | 'flacon' | 'pouch';

const ICON_INK = '#241C13';
const ICON_GOLD = '#C2A063';
const ICON_PORCELAIN = '#F6F0E4';
const ICON_PORCELAIN_EDGE = '#E6DCC8';
const ICON_LIQUID: Record<string, string> = {
  cabello: '#D9B888', rostro: '#C9CBB0', solar: '#EBCB78', perfume: '#D7B4AC', bucal: '#BCD0C0', default: '#D9B888',
};
const ICON_BAND: Record<string, string> = {
  cabello: '#F0E4D0', rostro: '#ECEDDE', solar: '#F6EAC9', perfume: '#F0E1DC', bucal: '#E5EEE7', default: '#F0E4D0',
};

/** Infer a packaging shape from a product when the DB doesn't carry one. */
function resolveShape(product: any): ProductShape {
  const explicit = (product?.shape || '').toString().toLowerCase();
  if (['bottle', 'pump', 'tube', 'jar', 'flacon', 'pouch'].includes(explicit)) {
    return explicit as ProductShape;
  }
  const name = (product?.name || '').toString().toLowerCase();
  const cat = (product?.category?.name || '').toString().toLowerCase();

  // name-based hints (FR/ES/EN keywords)
  if (/(masque|mascarilla|mask|baume|crème pot|jar)/.test(name)) return 'jar';
  if (/(sérum|serum|gel|leave|sans rinçage|sin aclarado|pump)/.test(name)) return 'pump';
  if (/(dentifrice|dentífrico|toothpaste|exfoliant|exfoliante|crème solaire|solar|sunscreen|tube)/.test(name)) return 'tube';
  if (/(parfum|perfume|eau de|fragrance|flacon)/.test(name)) return 'flacon';
  if (/(lingette|toallita|wipe|sachet|pouch)/.test(name)) return 'pouch';

  // category fallback
  if (cat === 'perfumes') return 'flacon';
  if (cat === 'body & bath' || cat === 'makeup') return 'tube';
  if (cat === 'face care') return 'pump';
  return 'bottle';
}

function ProductIcon({ shape, cat, catLabel, scale = 1 }: { shape: string; cat: string; catLabel: string; scale?: number }) {
  const s = (n: number) => Math.round(n * scale);
  const liquid = ICON_LIQUID[cat.toLowerCase()] || ICON_LIQUID.default;
  const band = ICON_BAND[cat.toLowerCase()] || ICON_BAND.default;
  const wrapStyle = (w: number, h: number): React.CSSProperties => ({
    position: 'relative', width: s(w), height: s(h),
    filter: `drop-shadow(0 ${s(10)}px ${s(26)}px rgba(33,26,20,0.13))`,
  });

  const Label = ({ w, h, radius, style }: { w: number; h: number; radius?: number; style: React.CSSProperties }) => (
    <div
      style={{
        position: 'absolute', background: band, overflow: 'hidden', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(3),
        borderRadius: radius ?? s(2), width: s(w), height: s(h),
        boxShadow: 'inset 0 0 0 1px rgba(33,26,20,0.05)', ...style,
      }}
    >
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: s(8.5), letterSpacing: '0.2em', color: ICON_INK, lineHeight: 1, paddingLeft: '0.2em' }}>Ourélia</span>
      <span style={{ width: s(18), height: 1, background: ICON_GOLD }} />
      <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: s(5.5), letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9A8460', lineHeight: 1 }}>{catLabel}</span>
    </div>
  );

  if (shape === 'pump') {
    return (
      <div style={wrapStyle(58, 170)}>
        <div style={{ position: 'absolute', top: 0, left: '24%', width: s(28), height: s(10), background: ICON_INK, borderRadius: s(4) }} />
        <div style={{ position: 'absolute', top: s(9), left: '50%', transform: 'translateX(-50%)', width: s(8), height: s(18), background: ICON_INK }} />
        <div style={{ position: 'absolute', top: s(25), left: '50%', transform: 'translateX(-50%)', width: s(20), height: s(8), background: ICON_INK, borderRadius: s(2) }} />
        <div style={{ position: 'absolute', top: s(32), left: 0, width: s(58), height: s(138), background: ICON_PORCELAIN, borderRadius: `${s(12)}px ${s(12)}px ${s(13)}px ${s(13)}px`, boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: s(30), background: liquid, opacity: 0.45, borderRadius: `0 0 ${s(12)}px ${s(12)}px` }} />
        </div>
        <Label w={44} h={52} style={{ top: s(66), left: '50%', transform: 'translateX(-50%)' }} />
      </div>
    );
  }

  if (shape === 'tube') {
    return (
      <div style={wrapStyle(54, 162)}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: s(54), height: s(140), background: ICON_PORCELAIN, borderRadius: `${s(7)}px ${s(7)}px ${s(26)}px ${s(26)}px`, boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }} />
        <div style={{ position: 'absolute', top: s(34), left: '50%', transform: 'translateX(-50%)', width: s(40), height: s(3), background: ICON_GOLD }} />
        <Label w={40} h={56} style={{ top: s(46), left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: s(54), height: s(22), background: ICON_INK, borderRadius: `0 0 ${s(6)}px ${s(6)}px` }} />
      </div>
    );
  }

  if (shape === 'jar') {
    return (
      <div style={wrapStyle(128, 104)}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: s(128), height: s(34), background: ICON_INK, borderRadius: `${s(14)}px ${s(14)}px 0 0` }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: s(3), background: ICON_GOLD }} />
        </div>
        <div style={{ position: 'absolute', top: s(30), left: 0, width: s(128), height: s(74), background: ICON_PORCELAIN, borderRadius: `0 0 ${s(18)}px ${s(18)}px`, boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }} />
        <Label w={78} h={46} style={{ top: s(46), left: '50%', transform: 'translateX(-50%)' }} />
      </div>
    );
  }

  if (shape === 'flacon') {
    return (
      <div style={wrapStyle(104, 130)}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: s(28), height: s(16), background: ICON_INK, borderRadius: s(3) }} />
        <div style={{ position: 'absolute', top: s(14), left: '50%', transform: 'translateX(-50%)', width: s(20), height: s(9), background: ICON_GOLD }} />
        <div style={{ position: 'absolute', top: s(22), left: 0, width: s(104), height: s(108), background: ICON_PORCELAIN, borderRadius: s(20), boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: s(58), background: liquid, opacity: 0.42, borderRadius: `0 0 ${s(20)}px ${s(20)}px` }} />
        </div>
        <Label w={60} h={48} radius={s(3)} style={{ top: s(50), left: '50%', transform: 'translateX(-50%)' }} />
      </div>
    );
  }

  if (shape === 'pouch') {
    return (
      <div style={wrapStyle(134, 96)}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: s(134), height: s(96), background: ICON_PORCELAIN, borderRadius: s(16), boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: s(12), background: ICON_INK, borderRadius: `${s(16)}px ${s(16)}px 0 0` }} />
        <Label w={72} h={50} style={{ top: '52%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </div>
    );
  }

  // Default bottle
  return (
    <div style={wrapStyle(60, 156)}>
      <div style={{ position: 'absolute', top: s(2), left: '50%', transform: 'translateX(-50%)', width: s(30), height: s(20), background: ICON_INK, borderRadius: `${s(5)}px ${s(5)}px 0 0` }} />
      <div style={{ position: 'absolute', top: s(20), left: '50%', transform: 'translateX(-50%)', width: s(34), height: s(4), background: ICON_GOLD }} />
      <div style={{ position: 'absolute', top: s(22), left: 0, width: s(60), height: s(134), background: ICON_PORCELAIN, borderRadius: `${s(11)}px ${s(11)}px ${s(16)}px ${s(16)}px`, boxShadow: `inset 0 0 0 1px ${ICON_PORCELAIN_EDGE}` }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: s(34), background: liquid, opacity: 0.5, borderRadius: `0 0 ${s(15)}px ${s(15)}px` }} />
      </div>
      <Label w={46} h={52} style={{ top: s(56), left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  );
}

/* ============================================================================
 * Product Card Component (Wired to Database and DB Cart)
 * ========================================================================== */
function ProductCard({ product, onError }: { product: any; onError?: (msg: string) => void }) {
  const { t, categoryLabel, tagLabel, categoryTint } = useAurelia();
  const copy = t.home;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPreorder, setShowPreorder] = useState(false);

  const addToCart = () => {
    setLoading(true);
    router.post(route('cart.add'), { product_id: product.id, quantity }, {
      preserveScroll: true,
      onFinish: () => setLoading(false),
    });
  };

  const isOut = product.stock === 0;
  const isPreorderable = isOut && product.allow_preorder;
  const isNew = product.is_new && !product.is_bestseller;
  const isBest = product.is_bestseller;
  const isSale = !!product.price_old || !!product.is_sale;

  // 'out' tag takes precedence (unless preorderable)
  const tag = isOut && !isPreorderable ? 'out' : isBest ? 'best' : isNew ? 'new' : isSale ? 'sale' : undefined;
  const shape = resolveShape(product);

  return (
    <div className={`au-prod-card ${isOut ? 'is-out-of-stock' : ''}`} style={isOut ? { opacity: 0.8 } : {}}>
      <div className="au-prod-media" style={{ background: categoryTint(product.category.name), position: 'relative' }}>
        {tag && (
          <div className="au-prod-tag" style={tag === 'out' ? { background: 'var(--au-dark)', color: 'var(--au-bg)', zIndex: 20 } : { zIndex: 20 }}>
            {tag === 'out' ? copy.soldOut : tagLabel(tag)}
          </div>
        )}
        <Link href={route('product.show', product.id)} style={{ display: 'block', height: '100%', filter: isOut ? 'grayscale(100%)' : 'none', opacity: isOut ? 0.6 : 1 }}>
          {product.image_url ? (
            <ImageWithLoader
              src={product.image_url}
              alt={`Soin Ourélia - ${product.name}`}
              style={{ mixBlendMode: 'multiply' }}
              fallback={<ProductImagePlaceholder category={product.category.name} productName={product.name} size="md" />}
            />
          ) : (
            <ProductImagePlaceholder category={product.category.name} productName={product.name} size="md" />
          )}
        </Link>
      </div>
      <div className="au-prod-info">
        <div className="au-prod-cat">{categoryLabel(product.category.name)}</div>
        <Link href={route('product.show', product.id)} className="au-prod-name" style={{ textDecoration: 'none', color: 'inherit', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</Link>
        <div className="au-prod-note" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '2.8em' /* Approx 2 lines (assuming line-height 1.4) to ensure uniform height even if description is short */
        }}>
          {product.description || copy.essentialCare}
        </div>
      </div>
      <div className="au-prod-footer" style={{ pointerEvents: (isOut && !isPreorderable) ? 'none' : 'auto' }}>
        <div className="au-prod-price-group">
          {product.price_old && (
            <span className="au-prod-price-old">{Number(product.price_old).toFixed(2)} dh</span>
          )}
          <span className={`au-prod-price${isSale && !isOut ? ' au-prod-price--sale' : ''}`}>{Number(product.price).toFixed(2)} dh</span>
        </div>

        <div className="au-qty-add" onClick={(e) => { if (isOut && !isPreorderable) e.preventDefault(); }}>
          <div className="au-qty-stepper">
            <button
              type="button"
              className="au-qty-step-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={(isOut && !isPreorderable) || quantity <= 1}
              aria-label="Diminuer la quantité"
            >
              −
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantity}
              onChange={(e) => {
                const clean = e.target.value.replace(/[^0-9]/g, '');
                if (!clean) {
                  setQuantity(1);
                  return;
                }
                const val = parseInt(clean, 10);
                if (!isPreorderable && val > product.stock) {
                  if (onError) onError(t.common.stockInsufficient);
                  setQuantity(product.stock);
                } else {
                  setQuantity(Math.max(1, val));
                }
              }}
              className="au-qty-input"
              aria-label="Quantity"
              disabled={isOut && !isPreorderable}
            />
            <button
              type="button"
              className="au-qty-step-btn"
              onClick={() => {
                if (!isPreorderable && quantity >= product.stock) {
                  if (onError) onError(t.common.stockInsufficient);
                } else {
                  setQuantity(quantity + 1);
                }
              }}
              disabled={isOut && !isPreorderable}
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
          <button type="button" className="au-add-btn" onClick={isPreorderable ? () => setShowPreorder(true) : addToCart} disabled={loading || (isOut && !isPreorderable)}>
            {loading ? '…' : isPreorderable ? t.common.preorder : isOut ? copy.soldOut : t.add}
          </button>
        </div>
      </div>
      <PreorderModal
        show={showPreorder}
        onClose={() => setShowPreorder(false)}
        product={product}
        quantity={quantity}
      />
    </div>
  );
}

/* ============================================================================
 * Welcome Page
 * ========================================================================== */
export default function Welcome(props: PageProps<{ products: any[]; cartCount: number; flash?: { success?: string }; errors?: any }>) {
  const categoriesList = Array.from(new Set((props.products || []).map((p: any) => p.category.name))) as string[];
  return (
    <ClientLayout auth={props.auth} cartCount={props.cartCount} title="Ourélia" categories={categoriesList}>
      <WelcomeContent {...props} />
    </ClientLayout>
  );
}

function WelcomeContent({ products = [], flash, errors }: any) {
  const { url } = usePage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(v => v + 10);
      setLoadingMore(false);
    }, 600); // Effet de chargement
  };

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [activeCategory, activeBrand]);

  // Déclencher le toast dès qu'un flash/error arrive
  useEffect(() => {
    if (flash?.success) {
      setToast({ message: flash.success, type: 'success' });
    } else if (errors?.quantity) {
      setToast({ message: errors.quantity, type: 'error' });
    }
  }, [flash?.success, errors?.quantity]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parsedUrl = new URL(url, window.location.origin);
      const cat = parsedUrl.searchParams.get('category');

      if (cat) {
        setActiveCategory(cat);
        setTimeout(() => {
          const el = document.getElementById('collection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setActiveCategory(null);
      }
    }
  }, [url]);

  const bestSellers = products.filter((p: any) => p.is_bestseller).slice(0, 8);
  const featured = bestSellers.length > 0 ? bestSellers : products.slice(0, 8);

  // signature spreads: first 3 products
  const spreadProducts = products.slice(0, 3);
  const heroProduct = products.length > 0 ? products[0] : null;

  // brands list
  const brandsList = Array.from(new Set(products.map((p: any) => p.brand).filter(Boolean))) as string[];

  // categories with real per-category counts (filtered by brand if selected)
  const categoriesList = Array.from(new Set(
    products
      .filter((p: any) => activeBrand ? p.brand === activeBrand : true)
      .map((p: any) => p.category.name)
  )) as string[];

  const { t, categoryLabel, categoryTint, tagLabel } = useAurelia();
  const copy = t.home;

  const heroShape = heroProduct ? resolveShape(heroProduct) : 'bottle';
  const heroCat = heroProduct?.category?.name || 'Hair Care';

  const filteredProducts = products
    .filter((p: any) => activeCategory ? p.category.name === activeCategory : true)
    .filter((p: any) => activeBrand ? p.brand === activeBrand : true);

  // Scroll reveal animation observer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.au-reveal, .au-reveal-scale, .au-reveal-left, .au-reveal-right, .au-reveal-group')
        .forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -45px 0px',
        threshold: 0.1,
      }
    );

    const observeUnrevealed = () => {
      const targets = document.querySelectorAll(
        '.au-reveal:not(.is-revealed), .au-reveal-scale:not(.is-revealed), .au-reveal-left:not(.is-revealed), .au-reveal-right:not(.is-revealed), .au-reveal-group:not(.is-revealed)'
      );
      targets.forEach((el) => observer.observe(el));
    };

    observeUnrevealed();
    const timer = setTimeout(observeUnrevealed, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [filteredProducts, visibleCount, activeCategory, activeBrand]);

  return (
    <>
      <Head>
        <title>{activeCategory ? `${categoryLabel(activeCategory)} · Ourélia (Ourelia)` : 'Ourélia | Ourelia Beauty'}</title>
        <meta head-key="description" name="description" content={activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia (Ourelia).` : `Ourélia (Ourelia Beauty) : ${copy.heroSub}`} />
        <meta head-key="keywords" name="keywords" content={activeCategory ? `${categoryLabel(activeCategory).toLowerCase()}, soins, beauté, Ourélia, Ourelia, cosmétiques` : "Ourelia, Ourélia, Ourelia Beauty, Ourélia Beauty, Ourelia maquillage, Ourélia maquillage, soins, beauté, cosmétiques, parfums, argan"} />
        <meta head-key="og:title" property="og:title" content={activeCategory ? `${categoryLabel(activeCategory)} · Ourélia (Ourelia)` : 'Ourélia | Ourelia Beauty'} />
        <meta head-key="og:description" property="og:description" content={activeCategory ? `Découvrez notre sélection de produits de la catégorie ${categoryLabel(activeCategory).toLowerCase()} chez Ourélia (Ourelia).` : `Ourélia (Ourelia Beauty) : ${copy.heroSub}`} />
        <link head-key="canonical" rel="canonical" href={route('home')} />
      </Head>

      {/* ── Toast Ourélia ── */}
      {toast && (
        <OureliaToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ---------------- HERO ---------------- */}
      <div className="au-container au-hero">
        <div className="au-hero-grid">
          <div className="au-reveal">
            <div className="au-eyebrow">
              <span className="au-eyebrow-line" />
              <span className="au-eyebrow-label">{copy.heroKicker}</span>
            </div>
            <h1 className="au-h1">{copy.heroTitle}</h1>
            <div className="au-h1-italic">{copy.heroItalic}</div>
            <p className="au-lead">{copy.heroSub}</p>
            <div className="au-cta-row">
              <button
                type="button"
                className="au-btn"
                onClick={() => smoothScrollTo('collection')}
              >
                {copy.heroCta}
              </button>
              <Link href="/about" className="au-link-underline">{copy.heroLink}</Link>
            </div>
          </div>

          <div className="au-reveal-scale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: '400px' }}>
            <ApplicationLogo style={{ width: '80%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* ---------------- MANIFESTO ---------------- */}
      <div className="au-manifesto au-reveal">
        <div className="au-manifesto-inner">
          <div className="au-kicker">{copy.manifestoKicker}</div>
          <p className="au-quote">{copy.manifestoText}</p>
          <div className="au-quote-sign">— Ourélia</div>
        </div>
      </div>

      {/* ---------------- SIGNATURE SPREADS ---------------- */}
      {spreadProducts.length > 0 && (
        <div className="au-container au-spreads">
          <div className="au-spreads-head au-reveal">
            <div className="au-section-eyebrow">{copy.spreadKicker}</div>
            <h2 className="au-section-title">{copy.spreadTitle}</h2>
          </div>

          {spreadProducts.map((product: any, i: number) => {
            const spread = copy.spreads[i] || copy.spreads[0];
            const shape = resolveShape(product);
            return (
              <div
                className="au-spread-row au-reveal"
                key={product.id}
                style={{ flexDirection: i % 2 === 1 ? 'row-reverse' : 'row' }}
              >
                <Link href={route('product.show', product.id)} className="au-spread-media" style={{ background: categoryTint(product.category.name), display: 'flex', textDecoration: 'none', color: 'inherit' }}>
                  {product.is_bestseller && <div className="au-tag-pill">{tagLabel('best')}</div>}
                  {product.image_url ? (
                    <ImageWithLoader
                      src={product.image_url}
                      alt={`Soin Ourélia - ${product.name}`}
                      style={{ mixBlendMode: 'multiply' }}
                      fallback={<ProductImagePlaceholder category={product.category.name} productName={product.name} size="lg" />}
                    />
                  ) : (
                    <ProductImagePlaceholder category={product.category.name} productName={product.name} size="lg" />
                  )}
                </Link>
                <div className="au-spread-body">
                  <div className="au-spread-num">{spread.num}</div>
                  <div className="au-eyebrow-sm">{categoryLabel(product.category.name)}</div>
                  <Link href={route('product.show', product.id)} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                    <h3 className="au-h3">{product.name}</h3>
                  </Link>
                  <p className="au-body-text">{product.description || spread.story}</p>
                  <div className="au-tags">
                    {spread.tags.map((tag: string) => (
                      <span className="au-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="au-price-row">
                    <span className="au-price-lg">{Number(product.price).toFixed(2)} dh</span>
                    <button type="button" className="au-btn-sm" onClick={() => router.post(route('cart.add'), { product_id: product.id, quantity: 1 }, { preserveScroll: true })}>
                      {t.addCart}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- CATEGORIES ---------------- */}
      <div className="au-container au-categories">
        <div className="au-section-head au-reveal">
          <div>
            <div className="au-section-eyebrow">{copy.catTitle}</div>
            <h2 className="au-section-title">{copy.catSub}</h2>
          </div>
        </div>
        <div className="au-cat-grid au-reveal-group">
          {categoriesList.map((cat, i) => {
            const count = products.filter((p: any) => p.category.name === cat && (activeBrand ? p.brand === activeBrand : true)).length;
            return (
              <a
                key={cat}
                href="#collection"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(activeCategory === cat ? null : cat);
                  // Petit délai pour que le filtre s'applique avant le scroll
                  setTimeout(() => smoothScrollTo('collection'), 60);
                }}
                className="au-cat-card"
                style={{
                  background: categoryTint(cat),
                  border: activeCategory === cat ? '2px solid var(--au-gold)' : '2px solid transparent'
                }}
              >
                <div>
                  <div className="au-cat-label">{categoryLabel(cat)}</div>
                  <div className="au-cat-discover">{t.discover}<span style={{ fontSize: 13 }}>→</span></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ---------------- COLLECTION (GRID) ---------------- */}
      <div className="au-container au-bestsellers" id="collection">
        <div className="au-section-head au-section-head--lg au-reveal">
          <div>
            <div className="au-section-eyebrow">{copy.bestTitle}</div>
            <h2 className="au-section-title">{copy.bestSub}</h2>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {brandsList.length > 0 && (
              <select
                value={activeBrand || ''}
                onChange={(e) => setActiveBrand(e.target.value || null)}
                style={{ padding: '6px 12px', fontSize: '14px', borderRadius: '4px', border: '1px solid var(--au-border)', background: 'transparent', fontFamily: 'var(--au-font-sans)', outline: 'none' }}
              >
                <option value="">{copy.allBrands}</option>
                {brandsList.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            )}
            <span className="au-link-underline cursor-pointer" onClick={() => { setActiveCategory(null); setActiveBrand(null); }}>
              {activeCategory || activeBrand ? copy.viewAllWithCount(filteredProducts.length) : copy.productsCount(products.length)}
            </span>
          </div>
        </div>
        <div className="au-prod-grid au-reveal-group">
          {filteredProducts
            .slice(0, visibleCount)
            .map((product: any) => (
              <ProductCard key={product.id} product={product} onError={(msg) => setToast({ message: msg, type: 'info' })} />
            ))}
        </div>

        {filteredProducts.length > visibleCount && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', minHeight: '40px' }} className="au-reveal">
            {loadingMore ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <div className="animate-spin" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px dotted var(--au-gold)', borderTopColor: 'transparent' }}></div>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--au-gold)' }}>{copy.loading}</span>
              </div>
            ) : (
              <button
                type="button"
                className="au-btn-ghost"
                onClick={handleLoadMore}
              >
                {copy.loadMore}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ---------------- DARK PHILOSOPHY BAND ---------------- */}
      <div className="au-dark-band">
        <div className="au-container au-dark-inner">
          <div className="au-dark-head au-reveal">
            <div className="au-dark-kicker">{copy.darkKicker}</div>
            <h2 className="au-dark-title">
              {copy.darkTitle} <span className="au-dark-title-italic">{copy.darkTitleIt}</span>
            </h2>
            <p className="au-dark-text">{copy.darkText}</p>
          </div>
          <div className="au-values-grid au-reveal-group">
            <div className="au-value">
              <div className="au-value-num">01</div>
              <h3 className="au-value-title">{copy.v1t}</h3>
              <p className="au-value-text">{copy.v1d}</p>
            </div>
            <div className="au-value">
              <div className="au-value-num">02</div>
              <h3 className="au-value-title">{copy.v2t}</h3>
              <p className="au-value-text">{copy.v2d}</p>
            </div>
            <div className="au-value">
              <div className="au-value-num">03</div>
              <h3 className="au-value-title">{copy.v3t}</h3>
              <p className="au-value-text">{copy.v3d}</p>
            </div>
          </div>
          <div className="au-dark-cta-wrap au-reveal">
            <Link href="/about" className="au-btn-outline-dark">{copy.darkCta}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
