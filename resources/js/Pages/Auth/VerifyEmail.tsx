import GuestLayout, { useGuestLang } from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function VerifyEmailContent({ status }: { status?: string }) {
    const { t } = useGuestLang();
    const a = t.auth;

    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title={`${a.verifyEmailTitle} — Aurélia`} />
            <h2 className="au-auth-title">{a.verifyEmailTitle}</h2>

            <p style={{ fontSize: '0.875rem', color: 'var(--au-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {a.verifyEmailText}
            </p>

            {status === 'verification-link-sent' && (
                <div className="au-flash au-flash-success" style={{ margin: '0 0 1rem' }}>
                    {a.verifyEmailSent}
                </div>
            )}

            <form onSubmit={submit}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 1.5rem' }}>
                        {processing ? a.loggingIn : a.resendVerificationEmail}
                    </button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="au-auth-link"
                    >
                        {a.logout}
                    </Link>
                </div>
            </form>
        </>
    );
}

export default function VerifyEmail(props: { status?: string }) {
    return (
        <GuestLayout>
            <VerifyEmailContent {...props} />
        </GuestLayout>
    );
}
