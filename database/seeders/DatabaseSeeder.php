<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        $client = User::factory()->create([
            'name' => 'Client Régulier',
            'email' => 'client@example.com',
            'phone' => '0612345678',
        ]);

        $guest = User::factory()->create([
            'name' => 'Invité',
            'email' => 'invite@example.com',
            'is_guest' => true,
        ]);

        // 2. Beauty Categories
        $catFace   = \App\Models\Category::create(['name' => 'Face Care',    'description' => 'Premium skincare for a radiant complexion']);
        $catPerfum = \App\Models\Category::create(['name' => 'Perfumes',     'description' => 'Exclusive fragrances crafted with rare ingredients']);
        $catMakeup = \App\Models\Category::create(['name' => 'Makeup',       'description' => 'Luminous makeup for every skin tone']);
        $catBody   = \App\Models\Category::create(['name' => 'Body & Bath',  'description' => 'Indulgent body care rituals']);
        $catHair   = \App\Models\Category::create(['name' => 'Hair Care',    'description' => 'Restorative treatments for silky, healthy hair']);

        // 3. Beauty Products
        $products = collect();

        // Face Care
        $products->push(\App\Models\Product::create([
            'category_id' => $catFace->id,
            'name'        => 'Vitamin C Radiance Serum',
            'description' => 'A concentrated brightening serum with 15% pure Vitamin C, niacinamide and ferulic acid. Visibly reduces dark spots and uneven skin tone in 4 weeks.',
            'price'       => 89.00,
            'stock'       => 60,
            'is_new'      => true,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catFace->id,
            'name'        => 'Precious Rose Face Oil',
            'description' => 'A velvety face oil blending Bulgarian rose, marula and squalane. Deeply nourishes and restores radiance overnight.',
            'price'       => 120.00,
            'stock'       => 45,
            'is_bestseller' => true,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catFace->id,
            'name'        => 'Hydra-Plump Moisturiser',
            'description' => 'A rich yet lightweight cream with hyaluronic acid, peptides and ceramides. Delivers 72h hydration and plumps fine lines.',
            'price'       => 74.50,
            'stock'       => 80,
        ]));

        // Perfumes
        $products->push(\App\Models\Product::create([
            'category_id'   => $catPerfum->id,
            'name'          => 'Aurélia Eau de Parfum',
            'description'   => 'The signature fragrance of the house. An intoxicating blend of jasmine absolue, amber, warm sandalwood and a whisper of vanilla.',
            'price'         => 165.00,
            'stock'         => 30,
            'is_new'        => true,
            'is_bestseller' => true,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catPerfum->id,
            'name'        => 'Oud & Vetiver Intense',
            'description' => 'A bold, smoky oriental with precious oud wood, earthy vetiver and black pepper. A statement fragrance for evenings.',
            'price'         => 195.00,
            'stock'         => 20,
        ]));

        // Makeup
        $products->push(\App\Models\Product::create([
            'category_id'   => $catMakeup->id,
            'name'          => 'Luminous Skin Foundation',
            'description'   => 'A buildable, breathable foundation with SPF 20. Blends seamlessly for a natural "your skin but better" finish. Available in 24 shades.',
            'price'         => 58.00,
            'stock'         => 100,
            'is_bestseller' => true,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catMakeup->id,
            'name'        => 'Velvet Lip Colour',
            'description' => 'An intensely pigmented matte lipstick enriched with vitamin E and shea butter. Long-wearing comfort without dryness. 18 shades.',
            'price'       => 36.00,
            'stock'       => 150,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catMakeup->id,
            'name'        => 'Glow Highlighter Palette',
            'description' => 'Four shimmering shades from champagne to burnished bronze. Finely milled for a lit-from-within glow.',
            'price'       => 49.00,
            'stock'       => 70,
            'is_new'      => true,
        ]));

        // Body & Bath
        $products->push(\App\Models\Product::create([
            'category_id' => $catBody->id,
            'name'        => 'Nourishing Body Balm',
            'description' => 'A luxurious whipped body butter with shea, cocoa butter and jasmine extract. Melts into skin for 24h silky softness.',
            'price'       => 52.00,
            'stock'       => 90,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id'   => $catBody->id,
            'name'          => 'Rose & Mineral Bath Soak',
            'description' => 'A restorative bath ritual combining Himalayan pink salt, rose petals and magnesium flakes. Soothes muscles and the mind.',
            'price'         => 38.00,
            'stock'         => 55,
            'is_bestseller' => true,
        ]));

        // Hair Care
        $products->push(\App\Models\Product::create([
            'category_id' => $catHair->id,
            'name'        => 'Gold Repair Hair Mask',
            'description' => 'An intensive treatment mask with argan oil, keratin and 24k gold particles. Restores shine and strength in one application.',
            'price'       => 68.00,
            'stock'       => 40,
            'is_new'      => true,
        ]));
        $products->push(\App\Models\Product::create([
            'category_id' => $catHair->id,
            'name'        => 'Scalp Renewal Serum',
            'description' => 'A lightweight serum with salicylic acid, peppermint and biotin to rebalance the scalp and stimulate healthy hair growth.',
            'price'       => 75.00,
            'stock'       => 35,
        ]));

        // 4. Orders
        $order1 = \App\Models\Order::create([
            'user_id'          => $client->id,
            'order_number'     => 'CMD-202606-001',
            'total_amount'     => 209.00,
            'status'           => 'en attente',
            'shipping_address' => '123 Rue de Paris, 75001 Paris',
        ]);

        $order2 = \App\Models\Order::create([
            'user_id'          => $guest->id,
            'order_number'     => 'CMD-202606-002',
            'total_amount'     => 165.00,
            'status'           => 'expédiée',
            'shipping_address' => '45 Avenue de Lyon, 69002 Lyon',
        ]);

        $order3 = \App\Models\Order::create([
            'user_id'          => $client->id,
            'order_number'     => 'CMD-202606-003',
            'total_amount'     => 120.00,
            'status'           => 'livrée',
            'shipping_address' => '123 Rue de Paris, 75001 Paris',
        ]);

        // 5. Order Items
        \App\Models\OrderItem::create(['order_id' => $order1->id, 'product_id' => $products[0]->id, 'quantity' => 1, 'unit_price' => 89.00]);
        \App\Models\OrderItem::create(['order_id' => $order1->id, 'product_id' => $products[5]->id, 'quantity' => 2, 'unit_price' => 58.00]);

        \App\Models\OrderItem::create(['order_id' => $order2->id, 'product_id' => $products[3]->id, 'quantity' => 1, 'unit_price' => 165.00]);

        \App\Models\OrderItem::create(['order_id' => $order3->id, 'product_id' => $products[1]->id, 'quantity' => 1, 'unit_price' => 120.00]);
    }
}
