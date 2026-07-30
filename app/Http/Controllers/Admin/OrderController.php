<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user')->latest();
        
        if ($request->filled('date')) {
            $query->whereDate('created_at', '>=', $request->date);
        }

        $orders = $query->get();
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only('date'),
        ]);
    }
    
    public function list(Request $request)
    {
        $query = Order::with(['user', 'items'])->latest();

        if ($request->filled('type')) {
            if ($request->type === 'preorder') {
                $query->whereHas('items', function($q) {
                    $q->where('is_preorder', true);
                });
            } elseif ($request->type === 'normal') {
                $query->whereDoesntHave('items', function($q) {
                    $q->where('is_preorder', true);
                });
            }
        }

        if ($request->filled('order_number')) {
            $query->where('order_number', 'like', '%' . $request->order_number . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('client_name')) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->client_name . '%');
            });
        }

        if ($request->filled('client_email')) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('email', 'like', '%' . $request->client_email . '%');
            });
        }

        $orders = $query->get();
        return Inertia::render('Admin/Orders/List', [
            'orders' => $orders,
            'filters' => $request->only('order_number', 'status', 'client_name', 'client_email', 'type'),
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

    public function ticket(Order $order)
    {
        $order->load(['user', 'items.product']);
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.orders.ticket', compact('order'));
        return $pdf->download('ticket-' . $order->order_number . '.pdf');
    }
}
