<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOpening extends Model
{
    protected $fillable = [
        'title',
        'vacancies',
        'deadline',
        'category',
        'description',
        'is_active',
        'order',
    ];

    protected $casts = [
        'vacancies' => 'integer',
        'deadline' => 'date',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
