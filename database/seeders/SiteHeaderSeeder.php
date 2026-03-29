<?php

namespace Database\Seeders;

use App\Models\SiteHeaderSetting;
use Illuminate\Database\Seeder;

class SiteHeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteHeaderSetting::create([
            'key' => 'facebook_url',
            'value' => 'https://www.facebook.com/mechanixinterior',
            'type' => 'text',
        ]);

        SiteHeaderSetting::create([
            'key' => 'facebook_icon_visible',
            'value' => '1',
            'type' => 'boolean',
        ]);

        SiteHeaderSetting::create([
            'key' => 'cta_button_text',
            'value' => 'Get in Touch',
            'type' => 'text',
        ]);

        SiteHeaderSetting::create([
            'key' => 'cta_button_link',
            'value' => '#contact',
            'type' => 'text',
        ]);
    }
}
