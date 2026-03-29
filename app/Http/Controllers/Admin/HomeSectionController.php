<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeSectionController extends Controller
{
    public function blogsIndex()
    {
        return Inertia::render('admin/home-blogs-section', [
            'settings' => [
                'title'    => SiteSetting::get('blog_section_title',    'Blogs & Articles'),
                'subtitle' => SiteSetting::get('blog_section_subtitle', 'Stay updated with the latest interior design news, tips and insights.'),
                'enabled'  => SiteSetting::get('blog_section_enabled',  '1') === '1',
            ],
        ]);
    }

    public function blogsUpdate(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'enabled'  => 'boolean',
        ]);

        SiteSetting::set('blog_section_title',    $validated['title']);
        SiteSetting::set('blog_section_subtitle', $validated['subtitle'] ?? '');
        SiteSetting::set('blog_section_enabled',  $validated['enabled'] ? '1' : '0');

        AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated home blogs section settings');

        return redirect()->back();
    }

    public function tipsIndex()
    {
        return Inertia::render('admin/home-tips-section', [
            'settings' => [
                'title'    => SiteSetting::get('tips_section_title',    'Tips & Insights'),
                'subtitle' => SiteSetting::get('tips_section_subtitle', 'Expert advice to help you create your dream space.'),
                'enabled'  => SiteSetting::get('tips_section_enabled',  '1') === '1',
            ],
        ]);
    }

    public function tipsUpdate(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'enabled'  => 'boolean',
        ]);

        SiteSetting::set('tips_section_title',    $validated['title']);
        SiteSetting::set('tips_section_subtitle', $validated['subtitle'] ?? '');
        SiteSetting::set('tips_section_enabled',  $validated['enabled'] ? '1' : '0');

        AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated home tips section settings');

        return redirect()->back();
    }
}
