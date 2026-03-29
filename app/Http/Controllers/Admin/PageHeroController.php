<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageHeroController extends Controller
{
    public function index()
    {
        $pages = ['about-us', 'clients', 'life-at-mechanix', 'our-team', 'tips', 'careers'];
        $data = [];

        foreach ($pages as $page) {
            $section = PageSection::firstOrCreate(
                ['section_key' => 'page_hero', 'page' => $page],
                ['is_active' => true, 'order' => 0]
            );

            $data[$page] = $section->getContentObject();
        }

        return Inertia::render('admin/page-heroes', [
            'heroes' => $data,
        ]);
    }

    public function update(Request $request, string $page)
    {
        $validPages = ['about-us', 'clients', 'life-at-mechanix', 'our-team', 'tips', 'careers'];
        
        if (!in_array($page, $validPages)) {
            abort(404);
        }

        $validated = $request->validate([
            'quote' => 'nullable|string',
            'quote_highlight' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => $page],
            ['is_active' => true, 'order' => 0]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'background_image' && $request->hasFile('background_image')) {
                $path = $request->file('background_image')->store('page-heroes', 'public');
                $value = Storage::url($path);
            }

            if ($value !== null && $key !== 'background_image' || ($key === 'background_image' && $request->hasFile('background_image'))) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => $key === 'background_image' ? 'image' : 'text']
                );
            }
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, "Updated $page page hero section");

        return redirect()->back();
    }
}
