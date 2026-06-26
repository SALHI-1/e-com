<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => \App\Models\Product::with('category')->get(),
        'cartCount' => array_sum(session()->get('cart', []))
    ]);
})->name('home');

// Cart Routes
Route::get('/panier', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
Route::post('/panier/ajouter', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
Route::patch('/panier/modifier', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
Route::delete('/panier/supprimer', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'create'])->name('login');
        Route::post('login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'store']);
    });

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [\App\Http\Controllers\Admin\AdminAuthController::class, 'destroy'])->name('logout');
        
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)->except(['show']);
        Route::resource('orders', \App\Http\Controllers\Admin\OrderController::class)->only(['index', 'show', 'update']);
    });
});
