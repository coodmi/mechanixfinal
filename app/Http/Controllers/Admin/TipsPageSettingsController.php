<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipsPageSettingsController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_settings', 'page' => 'tips'],
            ['is_active' => true, 'order' => 1]
        );

        $content = $section->getContentObject();

        return Inertia::render('admin/tips-page-settings', [
            'settings' => [
                'page_title' => $content->page_title ?? 'Design Tips & Insights',
                'page_subtitle' => $content->page_subtitle ?? 'Expert advice to help you create your dream space.',
                'meta_title' => $content->meta_title ?? 'Design Tips - Mechanix Interior',
                'meta_description' => $content->meta_description ?? 'Get expert interior design tips and insights.',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'required|string|max:255',
            'page_subtitle' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_settings', 'page' => 'tips'],
            ['is_active' => true, 'order' => 1]
        );

        foreach ($validated as $key => $value) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => $key],
                ['value' => $value ?? '', 'type' => 'text']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated tips page settings');

        return redirect()->back();
    }
}
