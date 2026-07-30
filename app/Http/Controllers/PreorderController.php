<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewOrderNotification;

class PreorderController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'product_id'       => 'required|exists:products,id',
            'quantity'         => 'required|integer|min:1',
            'shipping_address' => 'required|string|max:500',
            'phone'            => ['required', 'string', 'regex:/^\+212(0[67][0-9]{8}|[67][0-9]{8})$/'],
            'delivery_city'    => 'required|string|max:100',
        ];

        if (! Auth::check() || Auth::user()->is_admin) {
            $rules['guest_name'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules, [
            'shipping_address.required' => "L'adresse de livraison est obligatoire.",
            'phone.required'            => 'Le numéro de téléphone WhatsApp est obligatoire.',
            'phone.regex'               => 'Le format du numéro doit être +21206xxxxxxxx ou +2126xxxxxxxx.',
            'delivery_city.required'    => 'Veuillez choisir une ville.',
            'guest_name.required'       => 'Votre nom est obligatoire.',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $product = Product::findOrFail($validated['product_id']);

                if (!$product->allow_preorder || $product->stock > 0) {
                    throw new \RuntimeException("Ce produit n'est pas éligible à la précommande pour le moment.");
                }

                if (Auth::check() && !Auth::user()->is_admin) {
                    $user = Auth::user();
                    if ($user->phone !== $validated['phone']) {
                        $user->update(['phone' => $validated['phone']]);
                    }
                } else {
                    $user = User::create([
                        'name'     => $validated['guest_name'],
                        'phone'    => $validated['phone'],
                        'email'    => null,
                        'password' => null,
                        'is_guest' => true,
                    ]);
                }

                $totalAmount = $product->price * $validated['quantity'];
                
                $freeCities = ['casablanca', 'tanger'];
                $deliveryFee = 20;
                $cityLower = strtolower($validated['delivery_city']);
                $fee = (in_array($cityLower, $freeCities) || $totalAmount >= 300) ? 0 : $deliveryFee;
                
                $grandTotal = $totalAmount + $fee;

                $order = Order::create([
                    'user_id'          => $user->id,
                    'order_number'     => Order::generateOrderNumber(),
                    'total_amount'     => round($grandTotal, 2),
                    'status'           => Order::STATUS_PENDING,
                    'shipping_address' => $validated['delivery_city'] . ' — ' . $validated['shipping_address'],
                ]);

                OrderItem::create([
                    'order_id'    => $order->id,
                    'product_id'  => $product->id,
                    'quantity'    => $validated['quantity'],
                    'unit_price'  => $product->price,
                    'is_preorder' => true,
                ]);

                $admins = User::where('is_admin', true)->get();
                if ($admins->isNotEmpty()) {
                    Notification::send($admins, new NewOrderNotification($order));
                }
            });

            return back()->with('success', 'Votre précommande a été enregistrée avec succès. Nous vous contacterons prochainement.');

        } catch (\RuntimeException $e) {
            return back()->withErrors(['preorder' => $e->getMessage()]);
        } catch (\Throwable $e) {
            report($e);
            return back()->withErrors(['preorder' => 'Une erreur est survenue lors de la précommande.']);
        }
    }
}
