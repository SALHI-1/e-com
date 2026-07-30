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
    public function index(Request $request)
    {
        $query = Product::with('category')->latest();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->boolean('low_stock')) {
            $query->where('stock', '<', 5);
        }

        $products = $query->get();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'low_stock'])
        ]);
    }

    public function trashed(Request $request)
    {
        $query = Product::onlyTrashed()->with('category')->latest();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->get();
        return Inertia::render('Admin/Products/Trashed', [
            'products' => $products,
            'filters' => $request->only(['search'])
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
            'allow_preorder' => 'boolean',
            'image' => 'nullable|image|max:10240',
        ]);

        $data = collect($validated)->except('image')->toArray();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products');
            if (!$path) {
                return back()->withErrors(['image' => 'Erreur lors de l\'upload de l\'image. Vérifiez la configuration du stockage.']);
            }
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
            'allow_preorder' => 'boolean',
            'image' => 'nullable|image|max:10240',
        ]);

        $data = collect($validated)->except('image')->toArray();

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($product->image_url) {
                $oldImagePath = 'products/' . basename($product->image_url);
                Storage::delete($oldImagePath);
            }

            $path = $request->file('image')->store('products');
            if (!$path) {
                return back()->withErrors(['image' => 'Erreur lors de l\'upload de l\'image. Vérifiez la configuration du stockage.']);
            }
            $data['image_url'] = Storage::url($path);
        }

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Produit modifié avec succès.');
    }
    public function destroy(Product $product)
    {

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé avec succès.');
    }

    public function restore($id)
    {
        $product = Product::onlyTrashed()->findOrFail($id);
        $product->restore();

        return redirect()->route('admin.products.trashed')->with('success', 'Produit restauré avec succès.');
    }
}
