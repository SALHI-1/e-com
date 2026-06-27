<?php

namespace App\Http\Controllers\WhatsApp;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    // ─────────────────────────────────────────────────────────────────────────
    // GET /webhook/whatsapp — Vérification du webhook par Meta
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Meta envoie une requête GET lors de la configuration du webhook
     * pour vérifier que le endpoint est légitime.
     *
     * Paramètres attendus :
     *   - hub.mode          : doit être "subscribe"
     *   - hub.verify_token  : doit correspondre à WHATSAPP_VERIFY_TOKEN dans .env
     *   - hub.challenge     : valeur à renvoyer pour valider le webhook
     */
    public function verify(Request $request): Response|string
    {
        $mode        = $request->query('hub_mode');
        $token       = $request->query('hub_verify_token');
        $challenge   = $request->query('hub_challenge');

        if ($mode === 'subscribe' && $token === config('whatsapp.verify_token')) {
            Log::info('[WhatsApp Webhook] Vérification réussie.');
            return response($challenge, 200);
        }

        Log::warning('[WhatsApp Webhook] Tentative de vérification échouée.', [
            'mode'  => $mode,
            'token' => $token,
        ]);

        return response('Forbidden', 403);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /webhook/whatsapp — Réception des réponses boutons
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Traite les événements entrants depuis l'API WhatsApp Cloud.
     * On écoute uniquement les "button_reply" (réponses aux boutons Quick Reply).
     */
    public function handle(Request $request): Response
    {
        $body = $request->all();

        Log::debug('[WhatsApp Webhook] Payload reçu : ' . json_encode($body));

        // Extraire le message depuis la structure du payload Meta
        $message = data_get($body, 'entry.0.changes.0.value.messages.0');

        if (! $message) {
            // Ce n'est pas un message (peut être un status update, etc.) — on acquitte
            return response('OK', 200);
        }

        // On s'intéresse uniquement aux réponses de type "interactive" (boutons)
        if ($message['type'] !== 'interactive') {
            return response('OK', 200);
        }

        $buttonReplyId = data_get($message, 'interactive.button_reply.id');

        if (! $buttonReplyId) {
            return response('OK', 200);
        }

        // ── Parser le payload ID : "CONFIRM_42" ou "CANCEL_42" ─────────────
        if (str_starts_with($buttonReplyId, 'CONFIRM_')) {
            $orderId = (int) str_replace('CONFIRM_', '', $buttonReplyId);
            $this->confirmOrder($orderId);

        } elseif (str_starts_with($buttonReplyId, 'CANCEL_')) {
            $orderId = (int) str_replace('CANCEL_', '', $buttonReplyId);
            $this->cancelOrder($orderId);

        } else {
            Log::warning("[WhatsApp Webhook] Payload ID non reconnu : {$buttonReplyId}");
        }

        // Toujours renvoyer 200 à Meta pour accuser réception
        return response('OK', 200);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Actions métier
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Le client a cliqué sur "Confirmer" :
     * → Passer la commande au statut "expédiée" (en cours de livraison).
     * → Le stock reste décrémenté.
     */
    private function confirmOrder(int $orderId): void
    {
        $order = Order::with('user')->find($orderId);

        if (! $order) {
            Log::error("[WhatsApp Webhook] Commande #{$orderId} introuvable pour confirmation.");
            return;
        }

        if ($order->status !== Order::STATUS_PENDING) {
            Log::info("[WhatsApp Webhook] Commande #{$orderId} déjà traitée (statut : {$order->status}).");
            return;
        }

        $order->update(['status' => Order::STATUS_SHIPPING]);

        Log::info("[WhatsApp Webhook] Commande #{$order->order_number} confirmée → expédiée.");
    }

    /**
     * Le client a cliqué sur "Annuler" :
     * → Passer la commande au statut "annulée".
     * → Réincrémenter le stock de chaque article.
     */
    private function cancelOrder(int $orderId): void
    {
        $order = Order::with(['items.product', 'user'])->find($orderId);

        if (! $order) {
            Log::error("[WhatsApp Webhook] Commande #{$orderId} introuvable pour annulation.");
            return;
        }

        if ($order->status !== Order::STATUS_PENDING) {
            Log::info("[WhatsApp Webhook] Commande #{$orderId} déjà traitée (statut : {$order->status}).");
            return;
        }

        DB::transaction(function () use ($order) {
            // Réincrémenter le stock de chaque produit commandé
            foreach ($order->items as $item) {
                if ($item->product) {
                    $item->product->increment('stock', $item->quantity);
                }
            }

            $order->update(['status' => Order::STATUS_CANCELLED]);
        });

        Log::info("[WhatsApp Webhook] Commande #{$order->order_number} annulée par le client → stock restauré.");
    }
}
