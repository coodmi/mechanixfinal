<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CareersController extends Controller
{
    public function index()
    {
        $heroSection = PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => 'careers'],
            ['is_active' => true, 'order' => 1]
        );

        $jobSearchSection = PageSection::firstOrCreate(
            ['section_key' => 'job_search', 'page' => 'careers'],
            ['is_active' => true, 'order' => 2]
        );

        return Inertia::render('admin/careers', [
            'hero' => $heroSection->getContentObject(),
            'job_search' => $jobSearchSection->getContentObject(),
        ]);
    }

    public function updateHero(Request $request)
    {
        $validated = $request->validate([
            'quote' => 'nullable|string',
            'quote_highlight' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => 'careers'],
            ['is_active' => true, 'order' => 1]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'background_image' && $request->hasFile('background_image')) {
                $path = $request->file('background_image')->store('careers', 'public');
                $value = Storage::url($path);
            }

            if ($value !== null && $key !== 'background_image' || ($key === 'background_image' && $request->hasFile('background_image'))) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => $key === 'background_image' ? 'image' : 'text']
                );
            }
        }
        
        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated careers hero section');

        return redirect()->back();
    }

    public function updateJobSearch(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'search_placeholder' => 'nullable|string|max:255',
            'search_button_text' => 'nullable|string|max:100',
            'no_jobs_title' => 'nullable|string|max:255',
            'no_jobs_description' => 'nullable|string|max:500',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'job_search', 'page' => 'careers'],
            ['is_active' => true, 'order' => 2]
        );

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }
        
        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated careers job search section');

        return redirect()->back();
    }
}
