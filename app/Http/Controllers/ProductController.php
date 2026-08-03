<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show($id)
    {
        $product = Product::with(['category', 'reviews.user'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->findOrFail($id);
        
        return Inertia::render('Product/Show', [
            'product'   => $product,
            'cartCount' => array_sum(session()->get('cart', [])),
        ]);
    }
}
