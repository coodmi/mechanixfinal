<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'type'];

    /**
     * Get a setting value by key
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        return match ($setting->type) {
            'json' => json_decode($setting->value, true),
            default => $setting->value,
        };
    }

    /**
     * Set a setting value by key
     */
    public static function set(string $key, mixed $value, string $type = 'text'): void
    {
        $encodedValue = $type === 'json' ? json_encode($value) : $value;

        self::updateOrCreate(
            ['key' => $key],
            ['value' => $encodedValue, 'type' => $type]
        );
    }
}
