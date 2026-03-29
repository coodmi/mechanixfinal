<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VideoBreakController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'video_break'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        return Inertia::render('admin/video-break', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'video_break'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'background_image' && $request->hasFile('background_image')) {
                $path = $request->file('background_image')->store('video-break', 'public');
                $value = Storage::url($path);
                $key = 'background_image';
            }

            if ($value !== null && $key !== 'background_image' || ($key === 'background_image' && $request->hasFile('background_image'))) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }
        
        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated video break section');

        return redirect()->back();
    }
}
