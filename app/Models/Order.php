<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Order extends Model
{
    // ─── Statuts (en français, cohérents avec la BDD) ──────────────────────
    const STATUS_PENDING   = 'en attente';
    const STATUS_SHIPPING  = 'expédiée';
    const STATUS_CANCELLED = 'annulée';
    const STATUS_PAID      = 'payée';
    const STATUS_DELIVERED = 'livrée';

    protected $fillable = [
        'user_id', 'order_number', 'total_amount', 'status', 'shipping_address',
    ];

    // ─── Relations ──────────────────────────────────────────────────────────

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // ─── Scopes ─────────────────────────────────────────────────────────────

    /**
     * Commandes en attente (non encore confirmées / annulées).
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Commandes en attente créées depuis plus de $hours heures.
     */
    public function scopeExpiredSince(Builder $query, int $hours = 24): Builder
    {
        return $query->pending()->where('created_at', '<', now()->subHours($hours));
    }

    // ─── Helpers ────────────────────────────────────────────────────────────

    /**
     * Retourne le numéro WhatsApp associé à la commande.
     * Fonctionne pour les clients connectés et les Shadow Accounts (invités).
     */
    public function getWhatsappPhone(): ?string
    {
        return $this->user?->phone;
    }

    /**
     * Génère un numéro de commande unique.
     */
    public static function generateOrderNumber(): string
    {
        return 'CMD-' . strtoupper(uniqid());
    }
}
