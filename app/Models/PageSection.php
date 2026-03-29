<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageSection extends Model
{
    protected $fillable = [
        'page',
        'section_key',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the content items for this section
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PageContent::class, 'section_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PageItem::class, 'page_section_id')->orderBy('order');
    }

    /**
     * Get content as a key-value array
     */
    public function getContentArray(): array
    {
        return $this->contents->pluck('value', 'key')->toArray();
    }

    /**
     * Get content as an object with type casting
     */
    public function getContentObject(): object
    {
        $data = [];
        foreach ($this->contents as $content) {
            $data[$content->key] = match ($content->type) {
                'json' => json_decode($content->value, true),
                'number' => (int) $content->value,
                default => $content->value,
            };
        }
        return (object) $data;
    }

    /**
     * Scope for active sections
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
