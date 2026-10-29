import GuestLayout, { useGuestLang } from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function ConfirmPasswordForm() {
    const { t } = useGuestLang();
    const a = t.auth;

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title={`${a.confirmPasswordTitle} — Aurélia`} />
            <h2 className="au-auth-title">{a.confirmPasswordTitle}</h2>

            <p style={{ fontSize: '0.875rem', color: 'var(--au-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {a.confirmPasswordText}
            </p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="password">{a.passwordLabel}</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="au-input"
                        autoComplete="current-password"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="au-field-error">{errors.password}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 2rem' }}>
                        {processing ? a.loggingIn : a.confirmBtn}
                    </button>
                </div>
            </form>
        </>
    );
}

export default function ConfirmPassword() {
    return (
        <GuestLayout>
            <ConfirmPasswordForm />
        </GuestLayout>
    );
}
