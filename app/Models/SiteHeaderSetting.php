<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteHeaderSetting extends Model
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
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            default => $setting->value,
        };
    }

    /**
     * Set a setting value by key
     */
    public static function set(string $key, mixed $value, string $type = 'text'): void
    {
        $encodedValue = match ($type) {
            'json' => json_encode($value),
            'boolean' => $value ? '1' : '0',
            default => $value,
        };

        self::updateOrCreate(
            ['key' => $key],
            ['value' => $encodedValue, 'type' => $type]
        );
    }
}
