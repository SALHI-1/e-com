<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $productIds = array_keys($cart);
        $products = Product::whereIn('id', $productIds)->get();

        $cartItems = [];
        $totalAmount = 0;

        foreach ($products as $product) {
            $quantity = $cart[$product->id];
            $subtotal = $product->price * $quantity;
            $totalAmount += $subtotal;

            $cartItems[] = [
                'product' => $product,
                'quantity' => $quantity,
                'subtotal' => round($subtotal, 2)
            ];
        }

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'totalAmount' => round($totalAmount, 2),
            'cartCount' => array_sum($cart)
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);
        
        $currentQty = $cart[$product->id] ?? 0;
        $newQty = $currentQty + $request->quantity;

        // Check stock
        if ($newQty > $product->stock) {
            return back()->withErrors(['quantity' => 'Stock insuffisant pour ce produit.']);
        }

        $cart[$product->id] = $newQty;
        session()->put('cart', $cart);

        return back()->with('success', 'Produit ajouté au panier.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        if (isset($cart[$product->id])) {
            if ($request->quantity > $product->stock) {
                return back()->withErrors(['quantity' => 'Stock insuffisant pour ce produit.']);
            }
            $cart[$product->id] = $request->quantity;
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Panier mis à jour.');
    }

    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer'
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$request->product_id])) {
            unset($cart[$request->product_id]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Produit retiré du panier.');
    }
}
