<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminActivity extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_id',
        'changes',
        'description',
    ];

    protected $casts = [
        'changes' => 'array',
    ];

    /**
     * Get the user that performed the activity
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Log an admin activity
     */
    public static function log(string $action, string $model, $modelId = null, ?array $changes = null, ?string $description = null): void
    {
        if (auth()->check()) {
            self::create([
                'user_id' => auth()->id(),
                'action' => $action,
                'model' => $model,
                'model_id' => $modelId,
                'changes' => $changes,
                'description' => $description,
            ]);
        }
    }
}
