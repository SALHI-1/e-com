import GuestLayout, { useGuestLang } from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function ResetPasswordForm({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { t } = useGuestLang();
    const a = t.auth;

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={`${a.resetPasswordTitle} — Aurélia`} />
            <h2 className="au-auth-title">{a.resetPasswordTitle}</h2>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="email">{a.emailLabel}</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="au-input"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <p className="au-field-error">{errors.email}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password">{a.passwordLabel}</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="au-input"
                        autoComplete="new-password"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="au-field-error">{errors.password}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password_confirmation">{a.confirmPasswordLabel}</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="au-input"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <p className="au-field-error">{errors.password_confirmation}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 2rem' }}>
                        {processing ? a.loggingIn : a.resetPasswordBtn}
                    </button>
                </div>
            </form>
        </>
    );
}

export default function ResetPassword(props: {
    token: string;
    email: string;
}) {
    return (
        <GuestLayout>
            <ResetPasswordForm {...props} />
        </GuestLayout>
    );
}
