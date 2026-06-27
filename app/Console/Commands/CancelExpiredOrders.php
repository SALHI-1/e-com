<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Services\WhatsAppService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CancelExpiredOrders extends Command
{
    /**
     * Signature Artisan de la commande.
     *
     * Usage : php artisan orders:cancel-expired
     */
    protected $signature = 'orders:cancel-expired
                            {--hours=24 : Nombre d\'heures avant expiration (défaut : 24)}
                            {--dry-run  : Simuler sans effectuer de modifications}';

    /**
     * Description affichée dans `php artisan list`.
     */
    protected $description = 'Annule les commandes en attente depuis plus de N heures et réincrémente le stock.';

    public function __construct(private WhatsAppService $whatsApp)
    {
        parent::__construct();
    }

    // ─────────────────────────────────────────────────────────────────────────

    public function handle(): int
    {
        $hours  = (int) $this->option('hours');
        $dryRun = $this->option('dry-run');

        $this->info("🔍 Recherche des commandes « en attente » depuis plus de {$hours}h...");

        // Récupère les commandes expirées avec leurs articles et utilisateurs
        $expiredOrders = Order::with(['items.product', 'user'])
            ->expiredSince($hours)
            ->get();

        if ($expiredOrders->isEmpty()) {
            $this->info('✅ Aucune commande expirée trouvée.');
            return Command::SUCCESS;
        }

        $this->info("⚠️  {$expiredOrders->count()} commande(s) expirée(s) trouvée(s).");

        $cancelled = 0;
        $failed    = 0;

        foreach ($expiredOrders as $order) {
            $this->line("  → Traitement de #{$order->order_number} (créée le {$order->created_at->format('d/m/Y H:i')})");

            if ($dryRun) {
                $this->warn("    [DRY-RUN] Commande #{$order->order_number} aurait été annulée.");
                continue;
            }

            try {
                DB::transaction(function () use ($order) {
                    // Réincrémenter le stock de chaque produit commandé
                    foreach ($order->items as $item) {
                        if ($item->product) {
                            $item->product->increment('stock', $item->quantity);
                            $this->line(
                                "    Stock restauré : +{$item->quantity} × {$item->product->name}"
                            );
                        }
                    }

                    // Passer la commande en annulée
                    $order->update(['status' => Order::STATUS_CANCELLED]);
                });

                // Notifier le client via WhatsApp
                $this->whatsApp->sendCancellationNotification($order);

                Log::info("[CancelExpiredOrders] Commande #{$order->order_number} annulée automatiquement.");
                $this->info("    ✅ #{$order->order_number} annulée + stock restauré + WhatsApp envoyé.");
                $cancelled++;

            } catch (\Throwable $e) {
                Log::error("[CancelExpiredOrders] Erreur sur #{$order->order_number} : " . $e->getMessage());
                $this->error("    ❌ Erreur sur #{$order->order_number} : " . $e->getMessage());
                $failed++;
            }
        }

        $this->newLine();
        $this->info("📊 Résultat : {$cancelled} annulée(s), {$failed} erreur(s).");

        return $failed > 0 ? Command::FAILURE : Command::SUCCESS;
    }
}
