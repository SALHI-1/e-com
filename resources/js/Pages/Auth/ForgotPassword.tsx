import GuestLayout, { useGuestLang } from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function ForgotPasswordContent({ status }: { status?: string }) {
    const { t } = useGuestLang();
    const a = t.auth;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title={`${a.forgotPasswordTitle} — Aurélia`} />
            <h2 className="au-auth-title">{a.forgotPasswordTitle}</h2>

            <p style={{ fontSize: '0.875rem', color: 'var(--au-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {a.forgotPasswordText}
            </p>

            {status && <div className="au-flash au-flash-success" style={{ margin: '0 0 1rem' }}>{status}</div>}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="email">{a.emailLabel}</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="au-input"
                        autoComplete="username"
                        autoFocus
                        required
                    />
                    {errors.email && <p className="au-field-error">{errors.email}</p>}
                </div>

                <div className="au-auth-action-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <Link href={route('login')} className="au-auth-link">
                        {a.loginBtn}
                    </Link>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 1.5rem' }}>
                        {processing ? a.loggingIn : a.sendResetLink}
                    </button>
                </div>
            </form>
        </>
    );
}

export default function ForgotPassword(props: { status?: string }) {
    return (
        <GuestLayout>
            <ForgotPasswordContent {...props} />
        </GuestLayout>
    );
}
