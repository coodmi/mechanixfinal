<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimelineEvent extends Model
{
    protected $fillable = [
        'year',
        'title',
        'description',
        'is_current',
        'order',
    ];

    protected $casts = [
        'is_current' => 'boolean',
        'order' => 'integer',
    ];
}
