<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id', 'name', 'brand', 'description', 'price', 'stock', 
        'volume', 'is_new', 'is_bestseller', 'image_url', 'allow_preorder'
    ];

    protected function casts(): array
    {
        return [
            'is_new' => 'boolean',
            'is_bestseller' => 'boolean',
            'allow_preorder' => 'boolean',
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

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
