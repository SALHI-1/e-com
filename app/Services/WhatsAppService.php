<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    private string $apiUrl;
    private string $phoneNumberId;
    private string $accessToken;

    public function __construct()
    {
        $this->apiUrl        = config('whatsapp.api_url');
        $this->phoneNumberId = config('whatsapp.phone_number_id');
        $this->accessToken   = config('whatsapp.access_token');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Message de confirmation avec boutons interactifs
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Envoie un message WhatsApp interactif (boutons Quick Reply) au client
     * pour lui demander de confirmer ou d'annuler sa commande.
     */
    public function sendOrderConfirmationButtons(Order $order): bool
    {
        $phone = $order->getWhatsappPhone();

        if (! $phone) {
            Log::warning("[WhatsApp] Commande #{$order->order_number} : numéro de téléphone manquant, envoi ignoré.");
            return false;
        }

        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $this->normalizePhone($phone),
            'type'              => 'interactive',
            'interactive'       => [
                'type' => 'button',
                'header' => [
                    'type' => 'text',
                    'text' => '🛍️ Nouvelle commande',
                ],
                'body' => [
                    'text' => implode("\n", [
                        "Bonjour {$order->user->name} 👋",
                        "",
                        "Votre commande *#{$order->order_number}* d'un montant de *{$order->total_amount} €* est en attente de votre confirmation.",
                        "",
                        "Veuillez confirmer ou annuler votre commande en cliquant sur l'un des boutons ci-dessous.",
                    ]),
                ],
                'footer' => [
                    'text' => 'Vous avez 24h pour répondre.',
                ],
                'action' => [
                    'buttons' => [
                        [
                            'type'  => 'reply',
                            'reply' => [
                                'id'    => 'CONFIRM_' . $order->id,
                                'title' => '✅ Confirmer',
                            ],
                        ],
                        [
                            'type'  => 'reply',
                            'reply' => [
                                'id'    => 'CANCEL_' . $order->id,
                                'title' => '❌ Annuler',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        return $this->send($payload, $order->order_number);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Notification d'annulation automatique (expiration 24h)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Envoie un message WhatsApp pour informer le client de l'annulation
     * automatique de sa commande suite à l'absence de réponse dans les 24h.
     */
    public function sendCancellationNotification(Order $order): bool
    {
        $phone = $order->getWhatsappPhone();

        if (! $phone) {
            Log::warning("[WhatsApp] Commande #{$order->order_number} : numéro de téléphone manquant, notification ignorée.");
            return false;
        }

        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $this->normalizePhone($phone),
            'type'              => 'text',
            'text'              => [
                'preview_url' => false,
                'body'        => implode("\n", [
                    "Bonjour {$order->user->name} 👋",
                    "",
                    "Suite à l'absence de réponse de votre part, votre commande *#{$order->order_number}* a été *automatiquement annulée* après 24 heures.",
                    "",
                    "Les articles ont été remis en stock. N'hésitez pas à passer une nouvelle commande sur notre boutique. 🛍️",
                ]),
            ],
        ];

        return $this->send($payload, $order->order_number);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Méthodes privées
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Exécute la requête HTTP vers l'API Meta WhatsApp Cloud.
     */
    private function send(array $payload, string $orderNumber): bool
    {
        try {
            $response = Http::withToken($this->accessToken)
                ->post("{$this->apiUrl}/{$this->phoneNumberId}/messages", $payload);

            if ($response->successful()) {
                Log::info("[WhatsApp] Message envoyé pour la commande #{$orderNumber}.");
                return true;
            }

            Log::error("[WhatsApp] Échec de l'envoi pour #{$orderNumber} : " . $response->body());
            return false;

        } catch (\Throwable $e) {
            Log::error("[WhatsApp] Exception pour #{$orderNumber} : " . $e->getMessage());
            return false;
        }
    }

    /**
     * Normalise le numéro de téléphone au format international (sans '+' ni espaces).
     * Exemple : "+33 6 12 34 56 78" → "33612345678"
     */
    private function normalizePhone(string $phone): string
    {
        return preg_replace('/[^\d]/', '', ltrim($phone, '+'));
    }
}
