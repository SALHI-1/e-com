import React, { createContext, useContext, useState, ReactNode, Fragment } from 'react';
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

              {/* language switcher inside the mobile drawer */}
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
