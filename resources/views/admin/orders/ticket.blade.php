<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ticket de Livraison - {{ $order->order_number }}</title>
    <style>
        @page {
            margin: 20mm;
        }
        body {
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
            color: #111;
            font-size: 13px;
            line-height: 1.5;
            background: #fff;
        }
        .serif {
            font-family: 'Georgia', 'Times New Roman', serif;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; letter-spacing: 1px; }
        .text-xs { font-size: 11px; }
        .text-sm { font-size: 12px; }
        .text-lg { font-size: 16px; }
        .text-xl { font-size: 20px; }
        .text-2xl { font-size: 24px; }
        .text-gray { color: #555; }
        
        .header {
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo-img {
            max-width: 120px;
            height: auto;
            margin-bottom: 10px;
        }
        .store-info {
            font-size: 12px;
            color: #444;
        }
        
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #777;
            margin-bottom: 8px;
            border-bottom: 1px solid #eee;
            padding-bottom: 4px;
        }

        .details-grid {
            width: 100%;
        }
        .details-grid td {
            vertical-align: top;
            width: 50%;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .table th, .table td {
            padding: 12px 8px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        .table th {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #666;
            font-weight: normal;
        }
        .table .text-right { text-align: right; }
        .table .text-center { text-align: center; }
        
        .summary-box {
            width: 50%;
            margin-left: auto;
        }
        .summary-box table {
            width: 100%;
            border-collapse: collapse;
        }
        .summary-box td {
            padding: 8px;
        }
        .summary-box .total-row td {
            border-top: 2px solid #111;
            font-weight: bold;
            font-size: 16px;
            padding-top: 12px;
        }

        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #ddd;
            text-align: center;
        }
        .footer-thanks {
            font-size: 22px;
            margin-bottom: 10px;
            color: #111;
        }
        .footer-policy {
            font-size: 11px;
            color: #777;
            max-width: 80%;
            margin: 0 auto;
        }
    </style>
</head>
<body>

    <!-- HEADER -->
    <div class="header text-center">
        <?php
            $logoPath = public_path('B&W-logo.png');
            $logoData = '';
            if (file_exists($logoPath)) {
                $type = pathinfo($logoPath, PATHINFO_EXTENSION);
                $data = file_get_contents($logoPath);
                $logoData = 'data:image/' . $type . ';base64,' . base64_encode($data);
            }
        ?>
        @if($logoData)
            <img src="{{ $logoData }}" class="logo-img" alt="Ourélia Logo">
        @else
            <h1 class="serif text-2xl uppercase">Ourélia</h1>
        @endif
        
        <div class="store-info">
            <p><strong>Ourélia Beauty</strong><br>
            https://oureliabeauty.com/</p>
        </div>
    </div>

    <!-- DETAILS -->
    <div class="section">
        <table class="details-grid">
            <tr>
                <td>
                    <div class="section-title">Informations de la Commande</div>
                    <p>
                        <span class="text-gray text-xs uppercase">Numéro :</span> <br>
                        <strong class="text-lg">{{ $order->order_number }}</strong>
                    </p>
                    <p>
                        <span class="text-gray text-xs uppercase">Date :</span> <br>
                        <strong>{{ $order->created_at->format('d/m/Y H:i') }}</strong>
                    </p>
                </td>
                <td>
                    <div class="section-title">Client & Livraison</div>
                    <p>
                        <span class="text-gray text-xs uppercase">Nom :</span> <br>
                        <strong>{{ $order->user ? $order->user->name : 'Client' }}</strong>
                    </p>
                    <p>
                        <span class="text-gray text-xs uppercase">Adresse :</span> <br>
                        <strong>{{ $order->shipping_address ?? 'Non spécifiée' }}</strong>
                    </p>
                    <p>
                        <span class="text-gray text-xs uppercase">Téléphone :</span> <br>
                        <strong>{{ $order->getWhatsappPhone() ?? 'Non spécifié' }}</strong>
                    </p>
                </td>
            </tr>
        </table>
    </div>

    <!-- TABLE -->
    <div class="section">
        <table class="table">
            <thead>
                <tr>
                    <th>Réf.</th>
                    <th>Désignation</th>
                    <th class="text-center">Qté</th>
                    <th class="text-right">P.U</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                @php $subtotal = 0; @endphp
                @foreach($order->items as $item)
                    @php 
                        $lineTotal = $item->quantity * $item->unit_price; 
                        $subtotal += $lineTotal;
                        $ref = 'REF-' . str_pad($item->product_id, 4, '0', STR_PAD_LEFT);
                    @endphp
                    <tr>
                        <td class="text-gray text-xs">{{ $ref }}</td>
                        <td>{{ $item->product ? $item->product->name : 'Produit supprimé' }}</td>
                        <td class="text-center">{{ $item->quantity }}</td>
                        <td class="text-right">{{ number_format($item->unit_price, 2) }} dh</td>
                        <td class="text-right">{{ number_format($lineTotal, 2) }} dh</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- SUMMARY -->
    <div class="section">
        <div class="summary-box">
            <table>
                <tr>
                    <td class="text-gray">Sous-total</td>
                    <td class="text-right">{{ number_format($subtotal, 2) }} dh</td>
                </tr>
                <tr>
                    @php 
                        $shipping = $order->total_amount - $subtotal;
                        $shippingDisplay = $shipping > 0 ? number_format($shipping, 2) . ' dh' : '0.00 dh (Gratuit)';
                    @endphp
                    <td class="text-gray">Frais de livraison</td>
                    <td class="text-right">{{ $shippingDisplay }}</td>
                </tr>
                <tr class="total-row">
                    <td class="uppercase">Total Net</td>
                    <td class="text-right">{{ number_format($order->total_amount, 2) }} dh</td>
                </tr>
            </table>
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        <div class="serif footer-thanks">Merci pour votre commande !</div>
        <div class="footer-policy">
            Si vous avez des questions concernant votre commande, veuillez consulter notre site web.<br>
            Les retours sont acceptés sous 14 jours, dans leur emballage d'origine.
        </div>
    </div>

</body>
</html>
