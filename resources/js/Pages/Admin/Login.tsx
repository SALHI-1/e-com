import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Administration — Aurélia" />
            <h2 className="au-auth-title">Administration</h2>

            {status && <div className="au-flash au-flash-success" style={{ margin: '0 0 1rem' }}>{status}</div>}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="email">Email Admin</label>
                    <input
                        id="email" type="email" value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="au-input" autoComplete="username" autoFocus
                    />
                    {errors.email && <p className="au-field-error">{errors.email}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password">Mot de passe</label>
                    <input
                        id="password" type="password" value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="au-input" autoComplete="current-password"
                    />
                    {errors.password && <p className="au-field-error">{errors.password}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="checkbox" className="au-checkbox" id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked as false)}
                    />
                    <label htmlFor="remember" style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', cursor: 'pointer' }}>
                        Se souvenir de moi
                    </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 2rem' }}>
                        {processing ? 'Connexion…' : 'Accéder au panel'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
