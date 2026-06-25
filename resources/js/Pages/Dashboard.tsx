import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    if (user) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Client Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Bienvenue {user.name}, voici votre tableau de bord !
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title="Guest Dashboard" />
            
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Bienvenue Cher Invité</h2>
                <p className="text-gray-600 mb-6">
                    Connectez-vous pour voir vos commandes, ou suivez une commande en cours.
                </p>
                <div className="flex justify-center space-x-4">
                    <a href={route('login')} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Se connecter
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
