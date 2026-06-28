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
        $statuses = implode(',', Order::getStatuses());
        $validated = $request->validate([
            'status' => "required|string|in:{$statuses}",
        ]);

        $oldStatus = $order->status;
        $newStatus = $validated['status'];

        if ($oldStatus !== $newStatus) {
            \Illuminate\Support\Facades\DB::transaction(function () use ($order, $newStatus, $oldStatus) {
                // Diminuer le stock si la commande est confirmée
                if ($newStatus === Order::STATUS_CONFIRMED && $oldStatus === Order::STATUS_PENDING) {
                    foreach ($order->items as $item) {
                        $item->product->decrement('stock', $item->quantity);
                    }
                }

                // Restaurer le stock si la commande est annulée après livraison
                if ($newStatus === Order::STATUS_CANCELLED_AFTER_DELIVERY) {
                    foreach ($order->items as $item) {
                        $item->product->increment('stock', $item->quantity);
                    }
                }

                $order->update(['status' => $newStatus]);
            });
        }

        return back()->with('success', 'Statut de la commande mis à jour.');
    }
}
