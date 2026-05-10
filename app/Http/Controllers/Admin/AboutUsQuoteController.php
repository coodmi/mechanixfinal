<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutUsQuoteController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'quote', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 9]
        );

        $section->load('contents');
        $content = $section->getContentObject();

        return Inertia::render('admin/about-us-quote', [
            'quote' => [
                'text' => $content->text ?? '',
                'author' => $content->author ?? '',
                'author_title' => $content->author_title ?? '',
                'image' => $content->image ?? '',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'author' => 'nullable|string|max:255',
            'author_title' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'quote', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 9]
        );

        PageContent::updateOrCreate(
            ['section_id' => $section->id, 'key' => 'text'],
            ['value' => $validated['text'], 'type' => 'text']
        );

        if (isset($validated['author'])) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'author'],
                ['value' => $validated['author'], 'type' => 'text']
            );
        }

        if (isset($validated['author_title'])) {
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'author_title'],
                ['value' => $validated['author_title'], 'type' => 'text']
            );
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-us', 'public');
            PageContent::updateOrCreate(
                ['section_id' => $section->id, 'key' => 'image'],
                ['value' => Storage::url($path), 'type' => 'image']
            );
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about us quote section');

        return redirect()->back();
    }
}
