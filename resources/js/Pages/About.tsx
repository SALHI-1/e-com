import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';

interface AboutPageProps {
  locale?: string;
}

export default function About(_props: AboutPageProps) {
  const page = usePage().props as { cartCount?: number; auth?: any };

  return (
    <ClientLayout cartCount={page.cartCount} auth={page.auth}>
      <AboutContent />
    </ClientLayout>
  );
}

function AboutContent() {
  const { t } = useAurelia();
  const about = t.about;

  return (
    <>
      <Head title={about.meta.title}>
        <meta head-key="description" name="description" content={about.meta.description} />
      </Head>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="au-about-hero">
        <div className="au-container au-about-hero-inner">
          <div className="au-kicker">{about.hero.kicker}</div>
          <h1 className="au-h1">{about.hero.title}</h1>
          <p className="au-about-lead">{about.hero.lead}</p>
        </div>
      </section>

      {/* ── Manifesto / quote ─────────────────────────────────────── */}
      <section className="au-manifesto">
        <div className="au-container au-manifesto-inner">
          <div className="au-kicker">{about.manifesto.kicker}</div>
          <p className="au-quote">{about.manifesto.quote}</p>
          <div className="au-quote-sign">{about.manifesto.sign}</div>
        </div>
      </section>

      {/* ── Journey / timeline ────────────────────────────────────── */}
      <section className="au-container au-journey">
        <div className="au-section-head">
          <div className="au-section-eyebrow">{about.journeyEyebrow}</div>
          <h2 className="au-section-title">{about.journeyTitle}</h2>
        </div>

        <div className="au-timeline">
          {about.journey.map((item) => (
            <div className="au-timeline-item" key={item.num}>
              <div className="au-spread-num au-timeline-num">{item.num}</div>
              <div className="au-timeline-body">
                <h3 className="au-timeline-title">{item.title}</h3>
                <p className="au-timeline-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values (dark band) ────────────────────────────────────── */}
      <section id="valeurs" className="au-dark-band">
        <div className="au-container au-dark-inner">
          <div className="au-dark-head">
            <div className="au-dark-kicker">{about.valuesKicker}</div>
            <h2 className="au-dark-title">{about.valuesTitle}</h2>
          </div>

          <div className="au-values-grid">
            {about.values.map((value) => (
              <div className="au-value-card" key={value.num}>
                <div className="au-value-num">{value.num}</div>
                <h3 className="au-value-title">{value.title}</h3>
                <p className="au-value-text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <section className="au-container au-stats-section">
        <div className="au-section-head">
          <div className="au-section-eyebrow">{about.statsEyebrow}</div>
          <h2 className="au-section-title">{about.statsTitle}</h2>
        </div>

        <div className="au-stats-grid">
          {about.stats.map((stat) => (
            <div className="au-stat" key={stat.label}>
              <div className="au-stat-figure">{stat.figure}</div>
              <div className="au-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────── */}
      <section className="au-manifesto au-about-closing">
        <div className="au-container au-manifesto-inner">
          <h2 className="au-section-title">{about.closingTitle}</h2>
          <p className="au-about-closing-text">{about.closingText}</p>
          <div className="au-about-closing-actions">
            <Link href="/" className="au-btn">
              {about.ctaPrimary}
            </Link>
            <a href="#valeurs" className="au-btn-outline-dark">
              {about.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
