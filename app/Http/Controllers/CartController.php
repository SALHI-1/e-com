<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use App\Notifications\NewOrderNotification;

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
                'product'  => $product,
                'quantity' => $quantity,
                'subtotal' => round($subtotal, 2),
            ];
        }

        return Inertia::render('Cart/Index', [
            'cartItems'   => $cartItems,
            'totalAmount' => round($totalAmount, 2),
            'cartCount'   => array_sum($cart),
        ]);
    }

    public function success()
    {
        return Inertia::render('Cart/Success', [
            'cartCount' => array_sum(session()->get('cart', [])),
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Checkout — Validation du panier et création de commande
    // ─────────────────────────────────────────────────────────────────────────

    public function checkout(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->withErrors(['cart' => 'Votre panier est vide.']);
        }

        // ── Validation des champs selon le type de client ─────────────────
        $rules = [
            'shipping_address' => 'required|string|max:500',
            'phone'            => ['required', 'string', 'regex:/^\+212(0[67][0-9]{8}|[67][0-9]{8})$/'],
        ];

        // Champs supplémentaires pour les invités (Shadow Account)
        if (! Auth::check() || Auth::user()->is_admin) {
            $rules['guest_name']  = 'required|string|max:255';
            $rules['guest_email'] = 'required|email|max:255';
        }

        $validated = $request->validate($rules, [
            'shipping_address.required' => "L'adresse de livraison est obligatoire.",
            'phone.required'            => 'Le numéro de téléphone WhatsApp est obligatoire.',
            'phone.regex'               => 'Le numéro de téléphone doit être au format +21206xxxxxxxx ou +2126xxxxxxxx.',
            'guest_name.required'       => 'Votre nom est obligatoire.',
            'guest_email.required'      => 'Votre adresse e-mail est obligatoire.',
            'guest_email.email'         => "L'adresse e-mail n'est pas valide.",
        ]);

        try {
            $order = DB::transaction(function () use ($cart, $validated) {

                // ── 1. Résoudre l'utilisateur (connecté ou Shadow Account) ──
                if (Auth::check() && !Auth::user()->is_admin) {
                    $user = Auth::user();

                    // Mettre à jour le téléphone si l'utilisateur le modifie
                    if ($user->phone !== $validated['phone']) {
                        $user->update(['phone' => $validated['phone']]);
                    }
                } else {
                    // Shadow Account : créer ou récupérer un invité par e-mail
                    $user = User::firstOrCreate(
                        ['email' => $validated['guest_email']],
                        [
                            'name'     => $validated['guest_name'],
                            'phone'    => $validated['phone'],
                            'password' => null,
                            'is_guest' => true,
                        ]
                    );

                    // Mettre à jour le téléphone si l'invité l'a changé
                    if ($user->phone !== $validated['phone']) {
                        $user->update(['phone' => $validated['phone']]);
                    }
                }

                // ── 2. Vérifier le stock sans décrémenter ────
                $totalAmount = 0;
                $productIds  = array_keys($cart);

                $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

                foreach ($cart as $productId => $quantity) {
                    $product = $products->get($productId);

                    if (! $product) {
                        throw new \RuntimeException("Produit introuvable (ID: {$productId}).");
                    }

                    if ($product->stock < $quantity) {
                        throw new \RuntimeException(
                            "Stock insuffisant pour « {$product->name} » "
                            . "(disponible : {$product->stock}, demandé : {$quantity})."
                        );
                    }

                    // Stock décrémenté uniquement lors de la confirmation manuelle
                    $totalAmount += $product->price * $quantity;
                }

                // ── 3. Créer la commande ───────────────────────────────────
                $order = Order::create([
                    'user_id'          => $user->id,
                    'order_number'     => Order::generateOrderNumber(),
                    'total_amount'     => round($totalAmount, 2),
                    'status'           => Order::STATUS_PENDING,
                    'shipping_address' => $validated['shipping_address'],
                ]);

                // ── 4. Créer les lignes de commande ────────────────────────
                foreach ($cart as $productId => $quantity) {
                    $product = $products->get($productId);
                    OrderItem::create([
                        'order_id'   => $order->id,
                        'product_id' => $product->id,
                        'quantity'   => $quantity,
                        'unit_price' => $product->price,
                    ]);
                }

                return $order;
            });

            // ── 5. Vider le panier de la session ──────────────────────────
            session()->forget('cart');

            // ── 6. Envoyer le message WhatsApp avec boutons ───────────────
            // $order->load('user');
            // app(WhatsAppService::class)->sendOrderConfirmationButtons($order);

            // ── 7. Notifier les admins par e-mail ─────────────────────────
            $admins = User::where('is_admin', true)->get();
            if ($admins->isNotEmpty()) {
                Notification::send($admins, new NewOrderNotification($order));
            }

            return redirect()->route('cart.success');

        } catch (\RuntimeException $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        } catch (\Throwable $e) {
            report($e);
            return back()->withErrors(['cart' => 'Une erreur est survenue. Veuillez réessayer.']);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Gestion du panier (add / update / remove)
    // ─────────────────────────────────────────────────────────────────────────

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        $currentQty = $cart[$product->id] ?? 0;
        $newQty = $currentQty + $request->quantity;

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
            'quantity'   => 'required|integer|min:1',
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
            'product_id' => 'required|integer',
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$request->product_id])) {
            unset($cart[$request->product_id]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Produit retiré du panier.');
    }
}
