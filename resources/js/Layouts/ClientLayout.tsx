import React, { createContext, useContext, useState, useEffect, ReactNode, Fragment } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

/* ============================================================================
 * Types
 * ========================================================================== */
import {
  Dictionary,
  Lang,
  SupportedLang,
  dictionaries,
  normalizeLang,
  getStoredLang,
  setStoredLang,
  SUPPORTED_LANGS,
  LANG_LABELS,
} from '@/langue';

/* ============================================================================
 * Types & Compatibility
 * ========================================================================== */
export type { Lang, SupportedLang, Dictionary };
export type ProductCategory = 'cabello' | 'rostro' | 'solar' | 'perfume' | 'bucal';
export type ProductTag = 'best' | 'new' | 'sale';

export interface AureliaContextValue {
  lang: SupportedLang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  categoryTint: (cat: ProductCategory | string) => string;
  categoryLabel: (cat: ProductCategory | string) => string;
  tagLabel: (tag?: ProductTag | string) => string;
}

const CATEGORY_TINTS: Record<string, string> = {
  'hair care': '#ECE0CF',
  'face care': '#E7E5D6',
  'makeup': '#F2E3C6',
  'perfumes': '#EBDFDB',
  'body & bath': '#E4E7E1',
};

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

export default function ClientLayout({ auth, cartCount = 0, title, categories = ['Hair Care', 'Face Care', 'Makeup', 'Perfumes', 'Body & Bath'], children }: ClientLayoutProps) {
  const [lang, setLangState] = useState<SupportedLang>(() => getStoredLang());

  const setLang = (newLang: Lang) => {
    const normalized = normalizeLang(newLang);
    setLangState(normalized);
    setStoredLang(normalized);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const { url } = usePage();

  // Automatically close mobile menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [url]);

  // Lock body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const t = dictionaries[lang] || dictionaries.fr;
  const categoryTint = (cat: string) => CATEGORY_TINTS[cat.toLowerCase()] || '#ECE0CF';
  const categoryLabel = (cat: string) => (t.common?.categoryLabels && t.common.categoryLabels[cat.toLowerCase()]) || (t as any)[cat.toLowerCase()] || cat;
  const tagLabel = (tag?: string) => (tag === 'best' ? t.best : tag === 'new' ? t.newTag : tag === 'sale' ? t.sale : tag || '');

  const contextValue: AureliaContextValue = {
    lang,
    setLang,
    t,
    categoryTint,
    categoryLabel,
    tagLabel,
  };

  const metaDesc = lang === 'eng'
    ? "Discover our range of Ourélia essential care products, cosmetics and perfumes crafted for your daily ritual."
    : lang === 'esp'
    ? "Descubra nuestra gama de cuidados esenciales Ourélia, cosméticos y perfumes diseñados para su bienestar diario."
    : "Découvrez notre gamme de soins essentiels Ourélia, de cosmétiques et de parfums conçus pour votre bien-être.";

  return (
    <AureliaContext.Provider value={contextValue}>
      <Head title={title ? (title === 'Ourélia' ? 'Ourélia' : `${title} · Ourélia`) : 'Ourélia — Essential Care'}>
        <meta head-key="description" name="description" content={metaDesc} />
        <meta head-key="og:title" property="og:title" content={title ? (title === 'Ourélia' ? 'Ourélia' : `${title} · Ourélia`) : 'Ourélia — Essential Care'} />
        <meta head-key="og:description" property="og:description" content={metaDesc} />
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
              {/* language toggle — FR, ENG, ESP */}
              <div className="au-lang-toggle">
                {SUPPORTED_LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`au-lang-btn${lang === code ? ' au-lang-btn--active' : ''}`}
                    onClick={() => setLang(code)}
                  >
                    {LANG_LABELS[code]}
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
        </header>

        {/* ── Mobile 3/4 Drawer Backdrop (click to dismiss) ───────── */}
        <div
          className={`au-mobile-backdrop${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* ── Mobile 3/4 Drawer Panel (occupies 3/4 of screen width) ─ */}
        <aside
          className={`au-mobile-panel${menuOpen ? ' is-open' : ''}`}
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Drawer Top Header with Brand & Close Button */}
          <div className="au-drawer-header">
            <Link href="/" className="au-drawer-logo" onClick={() => setMenuOpen(false)}>
              OURÉLIA
            </Link>
            <button
              type="button"
              className="au-drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="au-mobile-inner">
            {/* Primary Navigation Links */}
            <div className="au-drawer-group">
              <Link
                href="/"
                className={`au-mobile-link${url === '/' ? ' au-mobile-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{t.navHome}</span>
                <span className="au-drawer-arrow">›</span>
              </Link>
              <Link
                href="/about"
                className={`au-mobile-link${url.startsWith('/about') ? ' au-mobile-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{t.navAbout}</span>
                <span className="au-drawer-arrow">›</span>
              </Link>
              <Link
                href={route('cart.index')}
                className={`au-mobile-link${url.startsWith('/cart') ? ' au-mobile-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{t.cartTitle || t.cart?.title || 'Panier'}</span>
                {cartCount > 0 ? (
                  <span className="au-drawer-badge">{cartCount}</span>
                ) : (
                  <span className="au-drawer-arrow">›</span>
                )}
              </Link>
            </div>

            {/* Shop & Categories */}
            <div className="au-drawer-section-title">
              {t.navShop}
            </div>
            <div className="au-drawer-sublinks">
              <Link
                href="/#collection"
                className="au-mobile-sublink"
                onClick={() => setMenuOpen(false)}
              >
                <span className="au-drawer-bullet">✦</span>
                <span>{t.allLabel}</span>
              </Link>
              {categories && categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}#collection`}
                  className="au-mobile-sublink"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="au-drawer-bullet">✦</span>
                  <span>{categoryLabel(cat)}</span>
                </Link>
              ))}
            </div>

            <div className="au-drawer-divider" />

            {/* Account / Authentication */}
            <div className="au-drawer-group">
              {auth?.user ? (
                <>
                  <div className="au-drawer-user-card">
                    <div className="au-drawer-avatar">
                      {(auth.user.name || 'C').charAt(0).toUpperCase()}
                    </div>
                    <div className="au-drawer-user-meta">
                      <div className="au-drawer-user-name">{auth.user.name}</div>
                      <div className="au-drawer-user-email">{auth.user.email}</div>
                    </div>
                  </div>
                  <Link
                    href={route('profile.edit')}
                    className={`au-mobile-link${url.startsWith('/profile') ? ' au-mobile-link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {t.profile}
                    </span>
                    <span className="au-drawer-arrow">›</span>
                  </Link>
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="au-mobile-link au-mobile-link--muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      {t.logout}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="au-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      {t.login}
                    </span>
                    <span className="au-drawer-arrow">›</span>
                  </Link>
                  <Link
                    href={route('register')}
                    className="au-mobile-link au-mobile-link--muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      {t.register}
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Language switcher inside the mobile drawer */}
            <div className="au-mobile-lang-section">
              <div className="au-mobile-lang-kicker">
                <span>🌐</span>
                <span>{lang === 'eng' ? 'Language' : lang === 'esp' ? 'Idioma' : 'Langue'}</span>
              </div>
              <div className="au-mobile-lang-pills">
                {SUPPORTED_LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`au-mobile-lang-pill${lang === code ? ' au-mobile-lang-pill--active' : ''}`}
                    onClick={() => {
                      setLang(code);
                      setMenuOpen(false);
                    }}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

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
                    <Link href={item.href} className="au-footer-link" key={j}>{item.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="au-footer-bottom">
            <span>© {new Date().getFullYear()} Ourélia</span>
            <div className="au-footer-lang">
              <span className="au-footer-lang-label">
                {lang === 'eng' ? 'Language' : lang === 'esp' ? 'Idioma' : 'Langue'} :
              </span>
              <div className="au-lang-toggle au-lang-toggle--footer">
                {SUPPORTED_LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`au-lang-btn${lang === code ? ' au-lang-btn--active' : ''}`}
                    onClick={() => setLang(code)}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
            </div>
            <span>{t.footerNote}</span>
          </div>
        </footer>
      </div>
    </AureliaContext.Provider>
  );
}
