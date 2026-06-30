<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products'    => \App\Models\Product::with('category')->get(),
        'cartCount'   => array_sum(session()->get('cart', [])),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About', [
        'cartCount' => array_sum(session()->get('cart', [])),
    ]);
})->name('about');

Route::get('/produit/{product}', [\App\Http\Controllers\ProductController::class, 'show'])->name('product.show');

// ─── Panier ───────────────────────────────────────────────────────────────────
Route::get('/panier', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
Route::get('/panier/succes', [\App\Http\Controllers\CartController::class, 'success'])->name('cart.success');
Route::post('/panier/ajouter', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
Route::patch('/panier/modifier', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
Route::delete('/panier/supprimer', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');

// Checkout — accessible aux clients connectés ET aux invités (sans auth middleware)
Route::post('/panier/commander', [\App\Http\Controllers\CartController::class, 'checkout'])->name('cart.checkout');

// ─── WhatsApp Webhook ─────────────────────────────────────────────────────────
// Ces routes sont exclues du CSRF dans bootstrap/app.php
Route::get('/webhook/whatsapp', [\App\Http\Controllers\WhatsApp\WebhookController::class, 'verify'])
    ->name('webhook.whatsapp.verify');

Route::post('/webhook/whatsapp', [\App\Http\Controllers\WhatsApp\WebhookController::class, 'handle'])
    ->name('webhook.whatsapp.handle');

// ─── Profil utilisateur ───────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// ─── Admin ────────────────────────────────────────────────────────────────────
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'create'])->name('login');
        Route::post('login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'store']);
    });

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [\App\Http\Controllers\Admin\AdminAuthController::class, 'destroy'])->name('logout');

        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)->except(['show', 'destroy']);
        Route::get('orders/list', [\App\Http\Controllers\Admin\OrderController::class, 'list'])->name('orders.list');
        Route::resource('orders', \App\Http\Controllers\Admin\OrderController::class)->only(['index', 'show', 'update']);
    });
});
