import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Créer un compte — Aurélia" />
            <h2 className="au-auth-title">Créer un compte</h2>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                    <label className="au-label" htmlFor="name">Nom complet</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="au-input"
                        autoComplete="name"
                        autoFocus
                        required
                    />
                    {errors.name && <p className="au-field-error">{errors.name}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="au-input"
                        autoComplete="username"
                        required
                    />
                    {errors.email && <p className="au-field-error">{errors.email}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="au-input"
                        autoComplete="new-password"
                        required
                    />
                    {errors.password && <p className="au-field-error">{errors.password}</p>}
                </div>

                <div>
                    <label className="au-label" htmlFor="password_confirmation">Confirmer le mot de passe</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="au-input"
                        autoComplete="new-password"
                        required
                    />
                    {errors.password_confirmation && <p className="au-field-error">{errors.password_confirmation}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <Link href={route('login')} className="au-auth-link">
                        Déjà un compte ?
                    </Link>
                    <button type="submit" disabled={processing} className="au-btn-gold" style={{ padding: '0.7rem 2rem' }}>
                        {processing ? 'Création…' : 'S\'inscrire'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
