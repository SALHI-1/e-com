import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({
    auth,
    cartItems,
    totalAmount,
    cartCount,
    flash,
    errors
}: PageProps<{ cartItems: any[], totalAmount: number, cartCount: number, flash?: { success?: string }, errors?: any }>) {

    const updateQuantity = (productId: number, quantity: number) => {
        router.patch(route('cart.update'), { product_id: productId, quantity }, {
            preserveScroll: true
        });
    };

    const removeItem = (productId: number) => {
        router.delete(route('cart.remove'), { 
            data: { product_id: productId },
            preserveScroll: true 
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title="Mon Panier" />

            {/* Navigation Simple */}
            <nav className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
                <Link href={route('home')} className="text-xl font-bold text-gray-800 hover:text-indigo-600">
                    Ma Boutique
                </Link>
                <div className="flex space-x-4 items-center">
                    <div className="relative text-indigo-600 font-semibold mr-4 cursor-default">
                        Mon Panier
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {auth.user ? (
                        <>
                            <Link href={route('profile.edit')} className="text-gray-600 hover:text-gray-900">
                                Profil
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="text-red-600 hover:text-red-900">
                                Déconnexion
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-gray-600 hover:text-gray-900">Se connecter</Link>
                            <Link href={route('register')} className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">S'inscrire</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    {flash.success}
                </div>
            )}
            {errors?.quantity && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {errors.quantity}
                </div>
            )}

            {/* Contenu du panier */}
            <div className="max-w-4xl mx-auto bg-white p-6 shadow sm:rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Votre Panier</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 mb-4">Votre panier est vide.</p>
                        <Link href={route('home')} className="text-indigo-600 hover:underline">
                            Retourner à la boutique
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-gray-600">Produit</th>
                                        <th className="pb-3 text-gray-600">Prix unitaire</th>
                                        <th className="pb-3 text-gray-600">Quantité</th>
                                        <th className="pb-3 text-gray-600">Sous-total</th>
                                        <th className="pb-3 text-gray-600 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.product.id} className="border-b last:border-b-0">
                                            <td className="py-4 flex items-center">
                                                {item.product.image_url && (
                                                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded mr-4" />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-800">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500">{item.product.category?.name}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-800">{item.product.price} €</td>
                                            <td className="py-4">
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    max={item.product.stock}
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                                                    className="w-20 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                />
                                            </td>
                                            <td className="py-4 font-semibold text-gray-800">{item.subtotal.toFixed(2)} €</td>
                                            <td className="py-4 text-right">
                                                <button 
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Retirer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <div className="w-64 bg-gray-50 p-4 rounded shadow-inner">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-gray-600">Total</span>
                                    <span className="text-xl font-bold text-indigo-600">{totalAmount.toFixed(2)} €</span>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition">
                                    Passer la commande
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
