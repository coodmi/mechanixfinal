<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageContent extends Model
{
    protected $fillable = [
        'section_id',
        'key',
        'value',
        'type',
    ];

    /**
     * Get the section that owns this content
     */
    public function section(): BelongsTo
    {
        return $this->belongsTo(PageSection::class, 'section_id');
    }

    /**
     * Get the value with proper type casting
     */
    public function getTypedValue(): mixed
    {
        return match ($this->type) {
            'json' => json_decode($this->value, true),
            'number' => (int) $this->value,
            'boolean' => (bool) $this->value,
            default => $this->value,
        };
    }
}
