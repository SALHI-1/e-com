<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->latest()->get();
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.product']);
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:en attente,payée,expédiée,livrée,annulée',
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.show', $order)->with('success', 'Statut de la commande mis à jour.');
    }
}
