import React, { createContext, useContext, useState, ReactNode, Fragment } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

/* ============================================================================
 * Types
 * ========================================================================== */
export type Lang = 'es' | 'en' | 'fr';
export type ProductCategory = 'cabello' | 'rostro' | 'solar' | 'perfume' | 'bucal';
export type ProductTag = 'best' | 'new' | 'sale';

interface FooterColumn {
  title: string;
  items: string[];
}

interface CommonDict {
  announce: string;
  navHome: string;
  navShop: string;
  navHair: string;
  navAbout: string;
  add: string;
  addCart: string;
  allLabel: string;
  discover: string;
  best: string;
  newTag: string;
  sale: string;
  cabello: string;
  rostro: string;
  solar: string;
  perfume: string;
  bucal: string;
  marquee: string[];
  promiseKicker: string;
  promiseTitle: string;
  promiseText: string;
  emailPh: string;
  subscribe: string;
  footerTagline: string;
  footerNote: string;
  footer: FooterColumn[];
  login: string;
  register: string;
  profile: string;
  logout: string;
  cartTitle: string;
  cartEmpty: string;
  backShop: string;
  unit: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  checkout: string;
  waNote: string;
  guestName: string;
  guestEmail: string;
  waPhone: string;
  address: string;
  back: string;
  confirm: string;
  sending: string;
}

interface AureliaContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: CommonDict;
  categoryTint: (cat: ProductCategory | string) => string;
  categoryLabel: (cat: ProductCategory | string) => string;
  tagLabel: (tag?: ProductTag | string) => string;
}

/* ============================================================================
 * Shared vocabulary
 * ========================================================================== */
const COMMON: Record<Lang, CommonDict> = {
  fr: {
    announce: 'Livraison gratuite pour les commandes de plus de 20 dh',
    navHome: 'Accueil',
    navShop: 'Boutique',
    navHair: 'Cheveux',
    navAbout: 'Histoire',
    add: 'Ajouter',
    addCart: 'Ajouter au panier',
    allLabel: 'Tout',
    discover: 'Découvrir',
    best: 'Best-seller',
    newTag: 'Nouveau',
    sale: 'Promo',
    cabello: 'Cheveux',
    rostro: 'Visage',
    solar: 'Solaire',
    perfume: 'Parfum',
    bucal: 'Soins dentaires',
    marquee: ['Beauté honnête', 'Soins essentiels', 'Ingrédients réels', 'Pour chaque jour', 'Prix juste'],
    promiseKicker: 'Rejoignez-nous',
    promiseTitle: 'Prenez soin de vous',
    promiseText: 'Recevez des conseils pour votre routine. Pas de spam, juste l\'essentiel.',
    emailPh: 'Votre adresse e-mail',
    subscribe: 'S\'abonner',
    footerTagline: 'Des soins essentiels pour chaque jour.',
    footerNote: 'Fait avec soin · Espagne',
    footer: [
      { title: 'Boutique', items: ['Cheveux', 'Visage', 'Solaire', 'Parfum', 'Soins dentaires'] },
      { title: 'Société', items: ['Notre histoire', 'Philosophie', 'Durabilité', 'Contact'] },
      { title: 'Aide', items: ['Livraison', 'Retours', 'FAQ', 'Confidentialité'] },
    ],
    login: 'Connexion',
    register: 'Créer un compte',
    profile: 'Profil',
    logout: 'Déconnexion',
    cartTitle: 'Votre Panier',
    cartEmpty: 'Votre panier est vide.',
    backShop: 'Retourner à la boutique',
    unit: 'unité',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuite',
    total: 'Total',
    checkout: 'Passer la commande',
    waNote: '📱 Vous recevrez un message WhatsApp pour confirmer votre commande.',
    guestName: 'Votre nom *',
    guestEmail: 'Adresse e-mail *',
    waPhone: 'Numéro WhatsApp *',
    address: 'Adresse de livraison *',
    back: 'Retour',
    confirm: 'Confirmer',
    sending: 'Envoi…',
  },
  es: {
    announce: 'Envío gratis en pedidos superiores a 20 dh',
    navHome: 'Inicio',
    navShop: 'Tienda',
    navHair: 'Cabello',
    navAbout: 'Historia',
    add: 'Añadir',
    addCart: 'Añadir al carro',
    allLabel: 'Todo',
    discover: 'Descubrir',
    best: 'Más vendido',
    newTag: 'Nuevo',
    sale: 'Oferta',
    cabello: 'Cabello',
    rostro: 'Rostro',
    solar: 'Solar',
    perfume: 'Perfume',
    bucal: 'Cuidado bucal',
    marquee: ['Belleza honesta', 'Cuidado esencial', 'Ingredientes reales', 'Para cada día', 'Precio justo'],
    promiseKicker: 'Únete',
    promiseTitle: 'Cuídate con nosotras',
    promiseText: 'Recibe consejos de rutina y nuestras novedades. Sin spam, solo lo esencial.',
    emailPh: 'Tu correo electrónico',
    subscribe: 'Suscribirme',
    footerTagline: 'Cuidado esencial para cada día.',
    footerNote: 'Hecho con cariño · España',
    footer: [
      { title: 'Tienda', items: ['Cabello', 'Rostro', 'Solar', 'Perfume', 'Cuidado bucal'] },
      { title: 'Compañía', items: ['Nuestra historia', 'Filosofía', 'Sostenibilidad', 'Contacto'] },
      { title: 'Ayuda', items: ['Envíos', 'Devoluciones', 'Preguntas frecuentes', 'Privacidad'] },
    ],
    login: 'Acceder',
    register: 'Crear cuenta',
    profile: 'Perfil',
    logout: 'Salir',
    cartTitle: 'Tu Carrito',
    cartEmpty: 'Tu carrito está vacío.',
    backShop: 'Volver a la tienda',
    unit: 'unidad',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    free: 'Gratis',
    total: 'Total',
    checkout: 'Realizar pedido',
    waNote: '📱 Recibirás un mensaje de WhatsApp para confirmar tu pedido.',
    guestName: 'Tu nombre *',
    guestEmail: 'Correo electrónico *',
    waPhone: 'Número de WhatsApp *',
    address: 'Dirección de envío *',
    back: 'Atrás',
    confirm: 'Confirmar',
    sending: 'Enviando…',
  },
  en: {
    announce: 'Free shipping on orders over 20 dh',
    navHome: 'Home',
    navShop: 'Shop',
    navHair: 'Hair',
    navAbout: 'About',
    add: 'Add',
    addCart: 'Add to cart',
    allLabel: 'All',
    discover: 'Discover',
    best: 'Best seller',
    newTag: 'New',
    sale: 'Sale',
    cabello: 'Hair',
    rostro: 'Face',
    solar: 'Sun care',
    perfume: 'Fragrance',
    bucal: 'Oral care',
    marquee: ['Honest beauty', 'Essential care', 'Real ingredients', 'For every day', 'Fair pricing'],
    promiseKicker: 'Join us',
    promiseTitle: 'Take care, with us',
    promiseText: 'Get routine tips and new arrivals. No spam, only the essentials.',
    emailPh: 'Your email address',
    subscribe: 'Subscribe',
    footerTagline: 'Essential care for every day.',
    footerNote: 'Made with care · Spain',
    footer: [
      { title: 'Shop', items: ['Hair', 'Face', 'Sun care', 'Fragrance', 'Oral care'] },
      { title: 'Company', items: ['Our story', 'Philosophy', 'Sustainability', 'Contact'] },
      { title: 'Help', items: ['Shipping', 'Returns', 'FAQ', 'Privacy'] },
    ],
    login: 'Log in',
    register: 'Create account',
    profile: 'Profile',
    logout: 'Log out',
    cartTitle: 'Your Cart',
    cartEmpty: 'Your cart is empty.',
    backShop: 'Back to shop',
    unit: 'unit',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    waNote: '📱 You will receive a WhatsApp message to confirm your order.',
    guestName: 'Your name *',
    guestEmail: 'Email address *',
    waPhone: 'WhatsApp number *',
    address: 'Shipping address *',
    back: 'Back',
    confirm: 'Confirm',
    sending: 'Sending…',
  },
};

const CATEGORY_TINTS: Record<string, string> = {
  cabello: '#ECE0CF',
  rostro: '#E7E5D6',
  solar: '#F2E3C6',
  perfume: '#EBDFDB',
  bucal: '#E4E7E1',
};

const LANGS: Lang[] = ['fr', 'en', 'es'];

/* ============================================================================
 * Context
 * ========================================================================== */
const AureliaContext = createContext<AureliaContextValue | null>(null);

export function useAurelia(): AureliaContextValue {
  const ctx = useContext(AureliaContext);
  if (!ctx) {
    throw new Error('useAurelia() must be called from within <ClientLayout>.');
  }
  return ctx;
}

/* ============================================================================
 * Layout
 * ========================================================================== */
interface ClientLayoutProps {
  auth?: { user: any };
  cartCount?: number;
  title?: string;
  categories?: string[];
  children: ReactNode;
}

export default function ClientLayout({ auth, cartCount = 0, title, categories, children }: ClientLayoutProps) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('au_lang');
      if (saved === 'fr' || saved === 'en' || saved === 'es') return saved as Lang;
    }
    return 'fr';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('au_lang', newLang);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const { url } = usePage();

  const t = COMMON[lang];
  const categoryTint = (cat: string) => CATEGORY_TINTS[cat.toLowerCase()] || '#ECE0CF';
  const categoryLabel = (cat: string) => (t as any)[cat.toLowerCase()] || cat;
  const tagLabel = (tag?: string) => (tag === 'best' ? t.best : tag === 'new' ? t.newTag : tag === 'sale' ? t.sale : tag || '');

  const contextValue: AureliaContextValue = {
    lang,
    setLang,
    t,
    categoryTint,
    categoryLabel,
    tagLabel,
  };

  return (
    <AureliaContext.Provider value={contextValue}>
      <Head title={title ? (title === 'Ourélia' ? 'Ourélia' : `${title} · Ourélia`) : 'Ourélia — Essential Care'}>
        <meta head-key="description" name="description" content="Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être." />
        <meta head-key="og:title" property="og:title" content={title ? (title === 'Ourélia' ? 'Ourélia' : `${title} · Ourélia`) : 'Ourélia — Essential Care'} />
        <meta head-key="og:description" property="og:description" content="Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être." />
        <meta head-key="og:image" property="og:image" content="/assets/og-default.jpg" />
        <meta head-key="og:type" property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="au-page">
        {/* announcement */}
        <div className="au-announce">{t.announce}</div>

        {/* nav */}
        <header className="au-nav">
          <div className="au-nav-inner">
            {/* mobile hamburger — only visible under 860px via CSS */}
            <button
              type="button"
              className="au-burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>

            <Link href="/" className="au-logo">OURÉLIA</Link>

            <nav className="au-nav-links">
              <Link
                href="/"
                className={`au-nav-link${url === '/' ? ' au-nav-link--active' : ''}`}
              >
                {t.navHome}
              </Link>
              <Link
                href="/about"
                className={`au-nav-link${url.startsWith('/about') ? ' au-nav-link--active' : ''}`}
              >
                {t.navAbout}
              </Link>

              {categories && categories.length > 0 && (
                <div className="au-nav-dropdown-wrap">
                  <button className="au-nav-link au-nav-dropdown-btn">
                    {t.navShop} ▾
                  </button>
                  <div className="au-nav-dropdown-menu">
                    <Link href="/#collection" className="au-nav-dropdown-item">
                      {t.allLabel}
                    </Link>
                    {categories.map(cat => (
                      <Link
                        key={cat}
                        href={`/?category=${encodeURIComponent(cat)}#collection`}
                        className="au-nav-dropdown-item"
                      >
                        {categoryLabel(cat)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            <div className="au-nav-right">
              {/* language toggle — all three languages reachable */}
              <div className="au-lang-toggle">
                {LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`au-lang-btn${lang === code ? ' au-lang-btn--active' : ''}`}
                    onClick={() => setLang(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* auth links */}
              <div className="au-auth-links">
                {auth?.user ? (
                  <>
                    <Link href={route('profile.edit')} className="au-nav-link">{t.profile}</Link>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="au-nav-link au-nav-link--button"
                    >
                      {t.logout}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={route('login')} className="au-nav-link">{t.login}</Link>
                    <Link href={route('register')} className="au-nav-link">{t.register}</Link>
                  </>
                )}
              </div>

              <Link href={route('cart.index')} className="au-cart-btn" aria-label="Cart">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M6 8h12l-1 12H7L6 8z" />
                  <path d="M9 8a3 3 0 0 1 6 0" />
                </svg>
                {cartCount > 0 && <span className="au-cart-badge">{cartCount}</span>}
              </Link>
            </div>
          </div>

          {/* slide-down mobile menu */}
          <div className={`au-mobile-panel${menuOpen ? ' is-open' : ''}`}>
            <div className="au-mobile-inner">
              <Link href="/" className="au-mobile-link" onClick={() => setMenuOpen(false)}>
                {t.navHome}
              </Link>
              <Link href="/about" className="au-mobile-link" onClick={() => setMenuOpen(false)}>
                {t.navAbout}
              </Link>
              <div className="au-mobile-link" style={{ pointerEvents: 'none', color: 'var(--au-text-muted)', paddingTop: '20px' }}>
                {t.navShop}
              </div>
              <Link href="/#collection" className="au-mobile-link" onClick={() => setMenuOpen(false)} style={{ paddingLeft: '20px' }}>
                {t.allLabel}
              </Link>
              {categories && categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}#collection`}
                  className="au-mobile-link"
                  onClick={() => setMenuOpen(false)}
                  style={{ paddingLeft: '20px' }}
                >
                  {categoryLabel(cat)}
                </Link>
              ))}
              <div style={{ height: '16px' }} />
              {auth?.user ? (
                <>
                  <Link href={route('profile.edit')} className="au-mobile-link au-mobile-link--muted" onClick={() => setMenuOpen(false)}>
                    {t.profile}
                  </Link>
                  <Link href={route('logout')} method="post" as="button" className="au-mobile-link au-mobile-link--muted">
                    {t.logout}
                  </Link>
                </>
              ) : (
                <>
                  <Link href={route('login')} className="au-mobile-link au-mobile-link--muted" onClick={() => setMenuOpen(false)}>
                    {t.login}
                  </Link>
                  <Link href={route('register')} className="au-mobile-link au-mobile-link--muted" onClick={() => setMenuOpen(false)}>
                    {t.register}
                  </Link>
                </>
              )}

              {/* language switcher inside the menu (desktop toggle is hidden on phones) */}
              <div className="au-mobile-lang">
                <div className="au-lang-toggle">
                  {LANGS.map((code) => (
                    <button
                      key={code}
                      type="button"
                      className={`au-lang-btn${lang === code ? ' au-lang-btn--active' : ''}`}
                      onClick={() => setLang(code)}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* brand marquee */}
        <div className="au-marquee">
          <div className="au-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div className="au-marquee-group" key={groupIndex}>
                {t.marquee.map((item, i) => (
                  <Fragment key={i}>
                    <span className="au-marquee-item">{item}</span>
                    <span className="au-dot" />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* page content with soft fade effect on lang change */}
        <main key={lang} className="au-lang-fade">{children}</main>

        {/* newsletter */}
        <section className="au-newsletter">
          <div className="au-kicker">{t.promiseKicker}</div>
          <h2 className="au-newsletter-title">{t.promiseTitle}</h2>
          <p className="au-newsletter-text">{t.promiseText}</p>
          <form className="au-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t.emailPh} className="au-newsletter-input" />
            <button type="submit" className="au-newsletter-btn">{t.subscribe}</button>
          </form>
        </section>

        {/* footer */}
        <footer className="au-footer">
          <div className="au-footer-grid">
            <div>
              <div className="au-footer-logo">OURÉLIA</div>
              <p className="au-footer-tagline">{t.footerTagline}</p>
            </div>

            {t.footer.map((col, i) => (
              <div key={i}>
                <div className="au-footer-col-title">{col.title}</div>
                <div className="au-footer-col-links">
                  {col.items.map((item, j) => (
                    <span className="au-footer-link" key={j}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="au-footer-bottom">
            <span>© {new Date().getFullYear()} Ourélia</span>
            <span>{t.footerNote}</span>
          </div>
        </footer>
      </div>
    </AureliaContext.Provider>
  );
}
