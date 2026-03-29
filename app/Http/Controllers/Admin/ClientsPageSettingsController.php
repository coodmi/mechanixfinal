<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientsPageSettingsController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_settings', 'page' => 'clients'],
            ['is_active' => true, 'order' => 1]
        );

        $content = $section->getContentObject();

        return Inertia::render('admin/clients-page-settings', [
            'settings' => [
                'page_title' => $content->page_title ?? 'Our Clients',
                'page_subtitle' => $content->page_subtitle ?? 'We are proud to have worked with these amazing organizations.',
                'meta_title' => $content->meta_title ?? 'Clients - Mechanix Interior',
                'meta_description' => $content->meta_description ?? 'View our trusted clients and partners.',
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
            ['section_key' => 'page_settings', 'page' => 'clients'],
            ['is_active' => true, 'order' => 1]
        );

        foreach ($validated as $key => $value) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => $key],
                ['value' => $value ?? '', 'type' => 'text']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated clients page settings');

        return redirect()->back();
    }
}
