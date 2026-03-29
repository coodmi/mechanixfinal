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

        foreach ($validated as $key => $value) {
            if ($key === 'image' && $request->hasFile('image')) {
                $path = $request->file('image')->store('about-us', 'public');
                $value = Storage::url($path);
            }

            if ($value !== null && ($key !== 'image' || $request->hasFile('image'))) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value ?? '', 'type' => 'text']
                );
            }
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about us quote section');

        return redirect()->back();
    }
}
