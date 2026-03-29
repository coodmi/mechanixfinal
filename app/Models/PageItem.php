<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageItem extends Model
{
    protected $fillable = [
        'page_section_id',
        'title',
        'description',
        'image',
        'icon',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function section()
    {
        return $this->belongsTo(PageSection::class, 'page_section_id');
    }
}
