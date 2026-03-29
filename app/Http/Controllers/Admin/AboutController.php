<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'about'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 2]
        );

        return Inertia::render('admin/about', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'stat_clients' => 'nullable|string|max:50',
            'stat_clients_label' => 'nullable|string|max:100',
            'stat_satisfaction' => 'nullable|string|max:50',
            'stat_satisfaction_label' => 'nullable|string|max:100',
            'stat_experience' => 'nullable|string|max:50',
            'stat_experience_label' => 'nullable|string|max:100',
            'main_image' => 'nullable|image|max:5120',
            'detail_image' => 'nullable|image|max:5120',
            'detail_caption' => 'nullable|string|max:255',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'about'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 2]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'main_image' && $request->hasFile('main_image')) {
                $path = $request->file('main_image')->store('about', 'public');
                $value = Storage::url($path);
            } elseif ($key === 'detail_image' && $request->hasFile('detail_image')) {
                $path = $request->file('detail_image')->store('about', 'public');
                $value = Storage::url($path);
            }

            if ($value !== null || in_array($key, ['main_image', 'detail_image'])) {
                if (in_array($key, ['main_image', 'detail_image']) && !$request->hasFile($key)) {
                    continue;
                }

                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }
        
        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about section');

        return redirect()->back();
    }
}
