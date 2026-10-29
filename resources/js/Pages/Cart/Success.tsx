import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';

interface Props extends PageProps {
    cartCount: number;
}

export default function Success(props: Props) {
    return (
        <ClientLayout auth={props.auth} cartCount={props.cartCount} title="Commande confirmée">
            <SuccessContent />
        </ClientLayout>
    );
}

function SuccessContent() {
    const { t } = useAurelia();
    const sDict = t.success;

    return (
        <div className="au-container" style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Head title={`${sDict.title} · Ourélia`} />
            
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--au-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '24px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <h1 className="au-h3" style={{ marginBottom: '16px', maxWidth: '600px' }}>
                {sDict.title}
            </h1>
            
            <p className="au-body-text" style={{ marginBottom: '8px', maxWidth: '500px', color: 'var(--au-text)' }}>
                {sDict.message}
            </p>
            
            <p className="au-body-text" style={{ marginBottom: '40px', maxWidth: '500px', color: 'var(--au-text-muted)' }}>
                {sDict.contact}
            </p>
            
            <Link href={route('home')} className="au-btn" style={{ display: 'inline-block', alignSelf: 'center', textAlign: 'center' }}>
                {sDict.continueShopping}
            </Link>
        </div>
    );
}
