<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HeroController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'hero'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 1]
        );

        return Inertia::render('admin/hero', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'subtitle' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'title_highlight' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
            'background_video' => 'nullable', // Can be string (URL) or file
            'background_type' => 'nullable|in:image,video',
            'cta_text' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'hero'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 1]
        );

        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($key === 'background_image' && $request->hasFile('background_image')) {
                $path = $request->file('background_image')->store('hero', 'public');
                $value = Storage::url($path);
                $key = 'background_image';
            } elseif ($key === 'background_video' && $request->hasFile('background_video')) {
                $path = $request->file('background_video')->store('hero/videos', 'public');
                $value = Storage::url($path);
                $key = 'background_video';
            }

            if ($value !== null && !in_array($key, ['background_image', 'background_video']) || 
               ($key === 'background_image' && $request->hasFile('background_image')) ||
               ($key === 'background_video' && ($request->hasFile('background_video') || is_string($value)))) {
                
                $existing = PageContent::where('section_id', $section->id)->where('key', $key)->first();
                if (!$existing || $existing->value !== $value) {
                    PageContent::updateOrCreate(
                        ['section_id' => $section->id, 'key' => $key],
                        ['value' => $value, 'type' => 'text']
                    );
                    $hasChanges = true;
                }
            }
        }
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated hero section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }
}
