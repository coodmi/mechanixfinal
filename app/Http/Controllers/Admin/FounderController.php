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

        return Inertia::render('admin/founder', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'founder_name' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'main_image' => 'nullable|image|max:5120',
            'profile_image' => 'nullable|image|max:5120',
            'cta_text' => 'nullable|string|max:255',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'founder'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 5]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'main_image' && $request->hasFile('main_image')) {
                $path = $request->file('main_image')->store('founder', 'public');
                $value = Storage::url($path);
            } elseif ($key === 'profile_image' && $request->hasFile('profile_image')) {
                $path = $request->file('profile_image')->store('founder', 'public');
                $value = Storage::url($path);
            }

            if ($value !== null || in_array($key, ['main_image', 'profile_image'])) {
                if (in_array($key, ['main_image', 'profile_image']) && !$request->hasFile($key)) {
                    continue;
                }

                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }
        
        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated founder section');

        return redirect()->back();
    }
}
