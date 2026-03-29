<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tip extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'category', 'content', 'image', 'published_at', 'is_active',
    ];

    protected $casts = [
        'is_active'    => 'boolean',
        'published_at' => 'datetime',
    ];

    public function getRouteKeyName(): string { return 'slug'; }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($tip) {
            if (empty($tip->slug)) {
                $tip->slug = static::generateUniqueSlug($tip->title);
            }
        });
        static::updating(function ($tip) {
            if ($tip->isDirty('title') && !$tip->isDirty('slug')) {
                $tip->slug = static::generateUniqueSlug($tip->title, $tip->id);
            }
        });
    }

    protected static function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;
        while (static::where('slug', $slug)->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))->exists()) {
            $slug = $base . '-' . $i++;
        }
        return $slug;
    }

    public function scopeActive($query) { return $query->where('is_active', true); }
}
