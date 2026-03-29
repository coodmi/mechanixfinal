<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteHeaderSetting;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteHeaderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/site-header', [
            'settings' => [
                'facebook_url' => SiteHeaderSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
                'facebook_icon_visible' => SiteHeaderSetting::get('facebook_icon_visible', true),
                'cta_button_text' => SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
                'cta_button_link' => SiteHeaderSetting::get('cta_button_link', '#contact'),
            ]
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'facebook_url' => 'nullable|url',
            'facebook_icon_visible' => 'required|boolean',
            'cta_button_text' => 'required|string|max:255',
            'cta_button_link' => 'required|string|max:255',
        ]);

        SiteHeaderSetting::set('facebook_url', $validated['facebook_url'], 'text');
        SiteHeaderSetting::set('facebook_icon_visible', $validated['facebook_icon_visible'], 'boolean');
        SiteHeaderSetting::set('cta_button_text', $validated['cta_button_text'], 'text');
        SiteHeaderSetting::set('cta_button_link', $validated['cta_button_link'], 'text');

        AdminActivity::log('updated', 'SiteHeaderSetting', null, null, 'Updated site header settings');

        return redirect()->back();
    }
}
