<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TipsQuoteController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => 'tips'],
            ['is_active' => true, 'order' => 0]
        );

        $content = $section->getContentObject();

        return Inertia::render('admin/tips-quote', [
            'quote' => [
                'text' => $content->quote ?? '',
                'quote_highlight' => $content->quote_highlight ?? '',
                'author' => $content->author ?? '',
                'background_image' => $content->background_image ?? '',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'quote_highlight' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => 'tips'],
            ['is_active' => true, 'order' => 0]
        );

        PageContent::updateOrCreate(
            ['section_id' => $section->id, 'key' => 'quote'],
            ['value' => $validated['text'] ?? '', 'type' => 'text']
        );

        if (isset($validated['quote_highlight'])) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'quote_highlight'],
                ['value' => $validated['quote_highlight'] ?? '', 'type' => 'text']
            );
        }

        if (isset($validated['author'])) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'author'],
                ['value' => $validated['author'] ?? '', 'type' => 'text']
            );
        }

        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('page-heroes', 'public');
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'background_image'],
                ['value' => Storage::url($path), 'type' => 'image']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated tips page quote section');

        return redirect()->back();
    }
}
