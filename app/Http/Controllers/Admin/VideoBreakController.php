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

        $section->load('contents');

        return Inertia::render('admin/video-break', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title'            => 'nullable|string|max:255',
            'video_url'        => 'nullable|string|max:500',
            'background_image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'video_break'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        if (array_key_exists('title', $validated)) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'title'],
                ['value' => $validated['title'] ?? '', 'type' => 'text']
            );
        }

        if (array_key_exists('video_url', $validated)) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'video_url'],
                ['value' => $validated['video_url'] ?? '', 'type' => 'text']
            );
        }

        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('video-break', 'public');
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'background_image'],
                ['value' => Storage::url($path), 'type' => 'image']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated video break section');

        return redirect()->back();
    }
}
