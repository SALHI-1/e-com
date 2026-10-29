import GuestLayout, { useGuestLang } from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function LoginForm({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { t } = useGuestLang();
    const a = t.auth;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <>
            <Head title={`${a.loginTitle} — Aurélia`} />
            <h2 className="au-auth-title">{a.loginTitle}</h2>

            {status && <div className="au-flash au-flash-success" style={{ margin: '0 0 1rem' }}>{status}</div>}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="email">{a.emailLabel}</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="au-input"
                        autoComplete="username"
                        autoFocus
                    />
                    {errors.email && <p className="au-field-error">{errors.email}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password">{a.passwordLabel}</label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="au-input"
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="au-field-error">{errors.password}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        className="au-checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked as false)}
                    />
                    <label htmlFor="remember" style={{ fontSize: '0.8rem', color: 'var(--au-text-muted)', cursor: 'pointer' }}>
                        {a.rememberMe}
                    </label>
                </div>

                <div className="au-auth-action-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    {canResetPassword && (
                        <Link href={route('password.request')} className="au-auth-link">
                            {a.forgotPasswordLink}
                        </Link>
                    )}
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 2rem' }}>
                        {processing ? a.loggingIn : a.loginBtn}
                    </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--au-text-dim)', marginTop: '0.5rem' }}>
                    {a.dontHaveAccount}{' '}
                    <Link href={route('register')} className="au-auth-link">{a.createAccountLink}</Link>
                </p>
            </form>
        </>
    );
}

export default function Login(props: {
    status?: string;
    canResetPassword: boolean;
}) {
    return (
        <GuestLayout>
            <LoginForm {...props} />
        </GuestLayout>
    );
}
