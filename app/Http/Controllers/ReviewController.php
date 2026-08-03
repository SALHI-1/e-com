<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        $product->reviews()->updateOrCreate(
            ['user_id' => auth()->id()],
            ['rating' => $validated['rating']]
        );

        return back()->with('success', 'Votre avis a été enregistré avec succès.');
    }
}
