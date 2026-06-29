<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'volume' => 'nullable|integer|min:0',
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'image' => 'nullable|image|max:10240',
        ]);

        $data = collect($validated)->except('image')->toArray();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products');
            $data['image_url'] = Storage::url($path);
        }

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Produit ajouté avec succès.');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'volume' => 'nullable|integer|min:0',
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'image' => 'nullable|image|max:10240',
        ]);

        $data = collect($validated)->except('image')->toArray();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products');
            $data['image_url'] = Storage::url($path);
        }

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Produit modifié avec succès.');
    }
}
