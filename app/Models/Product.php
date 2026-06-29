<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'brand', 'description', 'price', 'stock', 
        'volume', 'is_new', 'is_bestseller', 'image_url'
    ];

    protected function casts(): array
    {
        return [
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'price' => 'decimal:2',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
