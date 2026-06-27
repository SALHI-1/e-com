import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface ClientLayoutProps extends PropsWithChildren {
    auth: { user: any };
    cartCount?: number;
    title?: string;
}

export default function ClientLayout({ auth, cartCount = 0, title, children }: ClientLayoutProps) {
    return (
        <div className="aurelia-page">
            {title && <Head title={title} />}

            {/* ── Navigation ── */}
            <nav className="au-nav">
                <Link href={route('home')} className="au-nav-logo">AURÉLIA</Link>

                <div className="au-nav-links">
                    <Link href={route('cart.index')} className="au-cart-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        Panier
                        {cartCount > 0 && <span className="au-cart-badge">{cartCount}</span>}
                    </Link>

                    {auth.user ? (
                        <>
                            <Link href={route('profile.edit')} className="au-nav-link">Profil</Link>
                            <Link href={route('logout')} method="post" as="button" className="au-btn-outline">
                                Déconnexion
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')} className="au-nav-link">Connexion</Link>
                            <Link href={route('register')} className="au-btn-outline">Créer un Compte</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ── Content ── */}
            {children}

            {/* ── Footer ── */}
            <footer className="au-footer">
                <span className="au-footer-brand">AURÉLIA</span>
                <nav className="au-footer-links">
                    <a href="#" className="au-footer-link">À propos</a>
                    <a href="#" className="au-footer-link">Ingrédients</a>
                    <a href="#" className="au-footer-link">Durabilité</a>
                    <a href="#" className="au-footer-link">Contact</a>
                </nav>
                <span className="au-footer-copy">© {new Date().getFullYear()} Aurélia. Tous droits réservés.</span>
            </footer>
        </div>
    );
}
