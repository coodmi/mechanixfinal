<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    protected $fillable = ['title', 'slug', 'category', 'content', 'image', 'author', 'published_at', 'is_active'];

    protected $casts = [
        'is_active'    => 'boolean',
        'published_at' => 'datetime',
    ];

    public function getRouteKeyName(): string { return 'slug'; }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($b) {
            if (empty($b->slug)) $b->slug = static::uniqueSlug($b->title);
        });
        static::updating(function ($b) {
            if ($b->isDirty('title') && !$b->isDirty('slug')) $b->slug = static::uniqueSlug($b->title, $b->id);
        });
    }

    protected static function uniqueSlug(string $title, ?int $excludeId = null): string
    {
        $base = Str::slug($title); $slug = $base; $i = 1;
        while (static::where('slug', $slug)->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))->exists()) {
            $slug = $base . '-' . $i++;
        }
        return $slug;
    }

    public function scopeActive($query) { return $query->where('is_active', true); }
}
