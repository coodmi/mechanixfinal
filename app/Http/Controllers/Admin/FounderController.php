<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FounderController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'founder'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 5]
        );

        $section->load('contents');
        $content = $section->getContentObject();

        return Inertia::render('admin/founder', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'label'          => 'nullable|string|max:255',
            'title'          => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'founder_name'   => 'nullable|string|max:255',
            'founder_title'  => 'nullable|string|max:255',
            'company_name'   => 'nullable|string|max:255',
            'quote'          => 'nullable|string',
            'cta_text'       => 'nullable|string|max:255',
            'cta_link'       => 'nullable|string|max:255',
            'main_image'     => 'nullable|image|max:5120',
            'profile_image'  => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'founder'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 5]
        );

        $textFields = ['label', 'title', 'description', 'founder_name', 'founder_title', 'company_name', 'quote', 'cta_text', 'cta_link'];

        foreach ($textFields as $field) {
            if (array_key_exists($field, $validated)) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $field],
                    ['value' => $validated[$field] ?? '', 'type' => 'text']
                );
            }
        }

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('founder', 'public');
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'main_image'],
                ['value' => Storage::url($path), 'type' => 'image']
            );
        }

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('founder', 'public');
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'profile_image'],
                ['value' => Storage::url($path), 'type' => 'image']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated founder section');

        return redirect()->back();
    }
}
