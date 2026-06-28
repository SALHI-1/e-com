import React, { useState } from 'react';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import ClientLayout, { useAurelia, Lang, ProductCategory, ProductTag } from '@/Layouts/ClientLayout';

/* ============================================================================
 * Home page copy (Shared from the static design)
 * ========================================================================== */
interface HomeCopy {
  heroKicker: string; heroTitle: string; heroItalic: string; heroSub: string;
  heroCta: string; heroLink: string; heroPanelCap: string; heroPanelTag: string;
  manifestoKicker: string; manifestoText: string;
  spreadKicker: string; spreadTitle: string;
  catTitle: string; catSub: string;
  bestTitle: string; bestSub: string; viewAll: string; productsWord: string;
  darkKicker: string; darkTitle: string; darkTitleIt: string; darkText: string; darkCta: string;
  v1t: string; v1d: string; v2t: string; v2d: string; v3t: string; v3d: string;
  soldOut: string; essentialCare: string;
}

const HOME_COPY: Record<Lang, HomeCopy> = {
  fr: {
    heroKicker: 'Soins essentiels · chaque jour',
    heroTitle: 'Beauté honnête', heroItalic: 'pour votre routine',
    heroSub: 'Des formules simples et efficaces pour les cheveux, le visage et la peau. L\'essentiel, sans excès.',
    heroCta: 'Voir la collection', heroLink: 'Notre histoire', heroPanelCap: 'oro líquido', heroPanelTag: 'Huile d\'argan',
    manifestoKicker: 'La maison',
    manifestoText: 'Les bons soins n\'ont pas besoin d\'être compliqués ou chers. Nous sélectionnons des formules efficaces, avec des ingrédients que vous reconnaissez, et les présentons sans bruit — car la beauté honnête commence par l\'essentiel.',
    spreadKicker: 'Icônes Aurélia', spreadTitle: 'Les signatures',
    catTitle: 'Acheter par catégorie', catSub: 'Tout ce dont votre routine a besoin',
    bestTitle: 'Les favoris', bestSub: 'Ce que nos clientes choisissent le plus', viewAll: 'Tout voir', productsWord: 'Produits',
    darkKicker: 'Notre philosophie', darkTitle: 'Moins de produits.', darkTitleIt: 'De meilleures formules.',
    darkText: 'Nous croyons aux soins essentiels : des ingrédients qui fonctionnent, des emballages honnêtes et des prix justes. Sans promesses impossibles.',
    darkCta: 'Découvrez-nous',
    v1t: 'Ingrédients reconnaissables', v1d: 'Huile d\'argan, argile blanche, camomille. Des actifs que vous savez lire.',
    v2t: 'Prix honnête', v2d: 'Une cosmétique de qualité qui prend soin de votre peau et de votre porte-monnaie.',
    v3t: 'Pour chaque jour', v3d: 'Des routines simples qui s\'adaptent à votre rythme, pas l\'inverse.',
    soldOut: 'Épuisé', essentialCare: 'Soin essentiel',
  },
  es: {
    heroKicker: 'Cuidado esencial · cada día',
    heroTitle: 'Belleza honesta', heroItalic: 'para tu rutina diaria',
    heroSub: 'Fórmulas sencillas y eficaces para el cabello, el rostro y la piel. Lo esencial, sin excesos.',
    heroCta: 'Ver la colección', heroLink: 'Nuestra historia', heroPanelCap: 'oro líquido', heroPanelTag: 'Aceite de argán',
    manifestoKicker: 'La maison',
    manifestoText: 'El buen cuidado no necesita ser complicado ni caro. Seleccionamos fórmulas eficaces, con ingredientes que reconoces, y las presentamos sin ruido — porque la belleza honesta empieza por lo esencial.',
    spreadKicker: 'Iconos Aurélia', spreadTitle: 'Las firmas',
    catTitle: 'Compra por categoría', catSub: 'Todo lo que tu rutina necesita',
    bestTitle: 'Los favoritos', bestSub: 'Lo que más repiten nuestras clientas', viewAll: 'Ver todo', productsWord: 'Productos',
    darkKicker: 'Nuestra filosofía', darkTitle: 'Menos productos.', darkTitleIt: 'Mejores fórmulas.',
    darkText: 'Creemos en el cuidado esencial: ingredientes que funcionan, envases honestos y precios justos. Sin promesas imposibles.',
    darkCta: 'Conócenos',
    v1t: 'Ingredientes reconocibles', v1d: 'Aceite de argán, arcilla blanca, camomila. Activos que sabes leer.',
    v2t: 'Precio honesto', v2d: 'Cosmética de calidad que cuida tu piel y tu bolsillo.',
    v3t: 'Para cada día', v3d: 'Rutinas sencillas que se adaptan a tu ritmo, no al revés.',
    soldOut: 'Agotado', essentialCare: 'Cuidado esencial',
  },
  en: {
    heroKicker: 'Essential care · every day',
    heroTitle: 'Honest beauty', heroItalic: 'for your daily ritual',
    heroSub: 'Simple, effective formulas for hair, face and skin. The essentials, nothing more.',
    heroCta: 'Shop the collection', heroLink: 'Our story', heroPanelCap: 'oro líquido', heroPanelTag: 'Argan oil',
    manifestoKicker: 'The maison',
    manifestoText: 'Good care doesn\u2019t need to be complicated or expensive. We choose effective formulas, with ingredients you recognise, and present them without the noise — because honest beauty starts with the essentials.',
    spreadKicker: 'Aurélia icons', spreadTitle: 'The signatures',
    catTitle: 'Shop by category', catSub: 'Everything your routine needs',
    bestTitle: 'The favourites', bestSub: 'What our customers reach for again', viewAll: 'View all', productsWord: 'Products',
    darkKicker: 'Our philosophy', darkTitle: 'Fewer products.', darkTitleIt: 'Better formulas.',
    darkText: 'We believe in essential care: ingredients that work, honest packaging and fair prices. No impossible promises.',
    darkCta: 'About us',
    v1t: 'Ingredients you know', v1d: 'Argan oil, white clay, camomile. Actives you can actually read.',
    v2t: 'Honest pricing', v2d: 'Quality skincare that looks after your skin and your wallet.',
    v3t: 'For every day', v3d: 'Simple routines that fit your rhythm, not the other way round.',
    soldOut: 'Sold out', essentialCare: 'Essential care',
  },
};

const SPREADS = [
  {
    num: '01',
    claim: { fr: 'Or liquide pour vos cheveux', es: 'Oro líquido para tu cabello', en: 'Liquid gold for your hair' },
    story: {
      fr: 'Une formule pure qui nourrit en profondeur, redonnant force et brillance naturelle dès la première utilisation.',
      es: 'Fórmula pura que nutre en profundidad, devolviéndole fuerza y un brillo natural desde el primer uso.',
      en: 'Pure formula that deeply nourishes, restoring strength and a natural shine from the very first use.',
    },
    tags: { fr: ['Soin intense', 'Sans silicones', 'Brillance'], es: ['Cuidado intenso', 'Sin siliconas', 'Brillo'], en: ['Intense care', 'Silicone-free', 'Shine'] },
  },
  {
    num: '02',
    claim: { fr: 'Dix gestes en un', es: 'Diez gestos en uno', en: 'Ten rituals in one' },
    story: {
      fr: 'Un soin léger qui illumine, contrôle les frisottis et apporte de la brillance sans alourdir. L\'étape finale qui transforme tout.',
      es: 'Un cuidado ligero que ilumina, controla el frizz y aporta brillo sin apelmazar. El paso final que lo transforma todo.',
      en: 'A weightless care that brightens, tames frizz and adds shine without weighing down. The final step that transforms everything.',
    },
    tags: { fr: ['10 en 1', 'Anti-frisottis', 'Protection'], es: ['10 en 1', 'Anti-frizz', 'Protección'], en: ['10-in-1', 'Anti-frizz', 'Protection'] },
  },
  {
    num: '03',
    claim: { fr: 'Votre signature quotidienne', es: 'Tu firma, cada día', en: 'Your signature, every day' },
    story: {
      fr: 'Une note fraîche et lumineuse, pensée pour vous accompagner du matin au soir. Votre geste de beauté le plus personnel.',
      es: 'Una nota fresca y luminosa, pensada para acompañarte de la mañana a la noche. Tu gesto de belleza más personal.',
      en: 'A fresh, luminous note made to carry you from morning to night. Your most personal beauty gesture.',
    },
    tags: { fr: ['Frais', 'Essentiel', 'Durable'], es: ['Fresco', 'Esencial', 'Duradero'], en: ['Fresh', 'Essential', 'Lasting'] },
  },
];

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
  if (cat === 'perfume') return 'flacon';
  if (cat === 'bucal' || cat === 'solar') return 'tube';
  if (cat === 'rostro') return 'pump';
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
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: s(8.5), letterSpacing: '0.2em', color: ICON_INK, lineHeight: 1, paddingLeft: '0.2em' }}>AURÉLIA</span>
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
function ProductCard({ product }: { product: any }) {
  const { t, lang, categoryLabel, tagLabel, categoryTint } = useAurelia();
  const copy = HOME_COPY[lang];
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    setLoading(true);
    router.post(route('cart.add'), { product_id: product.id, quantity }, {
      preserveScroll: true,
      onFinish: () => setLoading(false),
    });
  };

  const isNew = product.is_new && !product.is_bestseller;
  const isBest = product.is_bestseller;
  const isSale = !!product.price_old || !!product.is_sale;
  const tag = isBest ? 'best' : isNew ? 'new' : isSale ? 'sale' : undefined;
  const shape = resolveShape(product);

  return (
    <div className="au-prod-card">
      <div className="au-prod-media" style={{ background: categoryTint(product.category.name) }}>
        {tag && <div className="au-prod-tag">{tagLabel(tag)}</div>}
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <ProductIcon shape={shape} cat={product.category.name} catLabel={categoryLabel(product.category.name)} />
        )}
      </div>
      <div className="au-prod-info">
        <div className="au-prod-cat">{categoryLabel(product.category.name)}</div>
        <div className="au-prod-name">{product.name}</div>
        <div className="au-prod-note">{product.description || copy.essentialCare}</div>
      </div>
      <div className="au-prod-footer">
        <div className="au-prod-price-group">
          {product.price_old && (
            <span className="au-prod-price-old">€ {Number(product.price_old).toFixed(2)}</span>
          )}
          <span className={`au-prod-price${isSale ? ' au-prod-price--sale' : ''}`}>€ {Number(product.price).toFixed(2)}</span>
        </div>

        <div className="au-qty-add" onClick={(e) => e.preventDefault()}>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="au-qty-input"
            aria-label="Quantity"
          />
          <button type="button" className="au-add-btn" onClick={addToCart} disabled={loading || product.stock === 0}>
            {loading ? '…' : product.stock === 0 ? copy.soldOut : t.add}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Welcome Page
 * ========================================================================== */
export default function Welcome(props: PageProps<{ products: any[]; cartCount: number; flash?: { success?: string }; errors?: any }>) {
  return (
    <ClientLayout auth={props.auth} cartCount={props.cartCount} title="Aurélia">
      <WelcomeContent {...props} />
    </ClientLayout>
  );
}

function WelcomeContent({ products = [], flash, errors }: any) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const bestSellers = products.filter((p: any) => p.is_bestseller).slice(0, 8);
  const featured = bestSellers.length > 0 ? bestSellers : products.slice(0, 8);

  // signature spreads: first 3 products
  const spreadProducts = products.slice(0, 3);
  const heroProduct = products.length > 0 ? products[0] : null;

  // categories with real per-category counts
  const categoriesList = Array.from(new Set(products.map((p: any) => p.category.name))) as string[];

  const { lang, t, categoryLabel, categoryTint, tagLabel } = useAurelia();
  const copy = HOME_COPY[lang];

  const heroShape = heroProduct ? resolveShape(heroProduct) : 'bottle';
  const heroCat = heroProduct?.category?.name || 'cabello';

  return (
    <>
      {/* ── Flash Messages ── */}
      {(flash?.success || errors?.quantity) && (
        <div className="au-flash" style={{ background: errors?.quantity ? 'var(--au-sale)' : 'var(--au-gold)' }}>
          {flash?.success || errors?.quantity}
        </div>
      )}

      {/* ---------------- HERO ---------------- */}
      <div className="au-container au-hero">
        <div className="au-hero-grid">
          <div>
            <div className="au-eyebrow">
              <span className="au-eyebrow-line" />
              <span className="au-eyebrow-label">{copy.heroKicker}</span>
            </div>
            <h1 className="au-h1">{copy.heroTitle}</h1>
            <div className="au-h1-italic">{copy.heroItalic}</div>
            <p className="au-lead">{copy.heroSub}</p>
            <div className="au-cta-row">
              <a href="#collection" className="au-btn">{copy.heroCta}</a>
              <Link href="/about" className="au-link-underline">{copy.heroLink}</Link>
            </div>
          </div>

          <div className="au-hero-panel">
            <div className="au-hero-panel-tag-left">N°01</div>
            <div className="au-hero-panel-tag-right">{copy.heroPanelTag}</div>
            {heroProduct?.image_url ? (
              <img src={heroProduct.image_url} alt="Hero" style={{ width: '60%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <ProductIcon shape={heroShape} cat={heroCat} catLabel={categoryLabel(heroCat)} scale={2.4} />
            )}
            <div className="au-hero-panel-caption">{copy.heroPanelCap}</div>
          </div>
        </div>
      </div>

      {/* ---------------- MANIFESTO ---------------- */}
      <div className="au-manifesto">
        <div className="au-manifesto-inner">
          <div className="au-kicker">{copy.manifestoKicker}</div>
          <p className="au-quote">{copy.manifestoText}</p>
          <div className="au-quote-sign">— Aurélia</div>
        </div>
      </div>

      {/* ---------------- SIGNATURE SPREADS ---------------- */}
      {spreadProducts.length > 0 && (
        <div className="au-container au-spreads">
          <div className="au-spreads-head">
            <div className="au-section-eyebrow">{copy.spreadKicker}</div>
            <h2 className="au-section-title">{copy.spreadTitle}</h2>
          </div>

          {spreadProducts.map((product: any, i: number) => {
            const spread = SPREADS[i] || SPREADS[0];
            const shape = resolveShape(product);
            return (
              <div
                className="au-spread-row"
                key={product.id}
                style={{ flexDirection: i % 2 === 1 ? 'row-reverse' : 'row' }}
              >
                <div className="au-spread-media" style={{ background: categoryTint(product.category.name) }}>
                  {product.is_bestseller && <div className="au-tag-pill">{tagLabel('best')}</div>}
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ProductIcon shape={shape} cat={product.category.name} catLabel={categoryLabel(product.category.name)} scale={1.7} />
                  )}
                </div>
                <div className="au-spread-body">
                  <div className="au-spread-num">{spread.num}</div>
                  <div className="au-eyebrow-sm">{categoryLabel(product.category.name)}</div>
                  <h3 className="au-h3">{product.name}</h3>
                  <p className="au-body-text">{product.description || spread.story[lang]}</p>
                  <div className="au-tags">
                    {spread.tags[lang].map((tag: string) => (
                      <span className="au-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="au-price-row">
                    <span className="au-price-lg">€ {Number(product.price).toFixed(2)}</span>
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
        <div className="au-section-head">
          <div>
            <div className="au-section-eyebrow">{copy.catTitle}</div>
            <h2 className="au-section-title">{copy.catSub}</h2>
          </div>
        </div>
        <div className="au-cat-grid">
          {categoriesList.map((cat, i) => {
            const count = products.filter((p: any) => p.category.name === cat).length;
            return (
              <a
                key={cat}
                href="#collection"
                onClick={(e) => {
                  // Allows scrolling to #collection but also updates the filter
                  setActiveCategory(activeCategory === cat ? null : cat);
                }}
                className="au-cat-card"
                style={{ 
                  background: categoryTint(cat),
                  border: activeCategory === cat ? '2px solid var(--au-gold)' : '2px solid transparent'
                }}
              >
                <span className="au-cat-num">N°{String(count).padStart(2, '0')}</span>
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
        <div className="au-section-head au-section-head--lg">
          <div>
            <div className="au-section-eyebrow">{copy.bestTitle}</div>
            <h2 className="au-section-title">{copy.bestSub}</h2>
          </div>
          <span className="au-link-underline cursor-pointer" onClick={() => setActiveCategory(null)}>
            {activeCategory ? `Tout voir (${products.length})` : `${products.length} ${copy.productsWord}`}
          </span>
        </div>
        <div className="au-prod-grid">
          {products
            .filter((p: any) => activeCategory ? p.category.name === activeCategory : true)
            .map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ---------------- DARK PHILOSOPHY BAND ---------------- */}
      <div className="au-dark-band">
        <div className="au-container au-dark-inner">
          <div className="au-dark-head">
            <div className="au-dark-kicker">{copy.darkKicker}</div>
            <h2 className="au-dark-title">
              {copy.darkTitle} <span className="au-dark-title-italic">{copy.darkTitleIt}</span>
            </h2>
            <p className="au-dark-text">{copy.darkText}</p>
          </div>
          <div className="au-values-grid">
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
          <div className="au-dark-cta-wrap">
            <Link href="/about" className="au-btn-outline-dark">{copy.darkCta}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
