<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tip;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TipController extends Controller
{
    public function index()
    {
        $settingsSection = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'page_settings', 'page' => 'tips'],
            ['is_active' => true, 'order' => 1]
        );
        $settingsContent = $settingsSection->getContentObject();

        $quoteSection = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'page_hero', 'page' => 'tips'],
            ['is_active' => true, 'order' => 0]
        );
        $quoteContent = $quoteSection->getContentObject();

        $defaultCategories = ['Interior Design', 'Color & Lighting', 'Space Planning', 'Furniture', 'DIY Tips'];
        $stored = \App\Models\SiteSetting::get('tip_categories', null);
        $categories = $stored ? json_decode($stored, true) : $defaultCategories;

        return Inertia::render('admin/tips', [
            'tips'     => Tip::latest('published_at')->get(),
            'categories' => $categories,
            'settings' => [
                'page_title'       => $settingsContent->page_title ?? 'Design Tips & Insights',
                'page_subtitle'    => $settingsContent->page_subtitle ?? 'Expert advice to help you create your dream space.',
                'meta_title'       => $settingsContent->meta_title ?? 'Design Tips - Mechanix Interior',
                'meta_description' => $settingsContent->meta_description ?? 'Get expert interior design tips and insights.',
            ],
            'quote' => [
                'text'             => $quoteContent->quote ?? '',
                'quote_highlight'  => $quoteContent->quote_highlight ?? '',
                'author'           => $quoteContent->author ?? '',
                'background_image' => $quoteContent->background_image ?? '',
            ],
        ]);
    }

    public function updateCategories(Request $request)
    {
        $validated = $request->validate([
            'categories'   => 'required|array|min:1',
            'categories.*' => 'required|string|max:100',
        ]);

        \App\Models\SiteSetting::set('tip_categories', json_encode($validated['categories']), 'text');

        AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated tip categories');

        return redirect()->back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
            'published_at' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tips', 'public');
            $validated['image'] = Storage::url($path);
        }

        $tip = Tip::create($validated);
        
        AdminActivity::log('created', 'Tip', $tip->id, null, "Created tip {$tip->title}");

        return redirect()->route('admin.tips.index');
    }

    public function update(Request $request, Tip $tip)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
            'published_at' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tips', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            unset($validated['image']);
        }

        $tip->update($validated);
        
        AdminActivity::log('updated', 'Tip', $tip->id, null, "Updated tip {$tip->title}");

        return redirect()->route('admin.tips.index');
    }

    public function destroy(Tip $tip)
    {
        $tip->delete();
        
        AdminActivity::log('deleted', 'Tip', $tip->id, null, "Deleted tip {$tip->title}");

        return redirect()->route('admin.tips.index');
    }
    public function bulkDelete(Request $request)
        {
            $validated = $request->validate([
                'ids'   => 'required|array',
                'ids.*' => 'integer|exists:tips,id',
            ]);

            Tip::whereIn('id', $validated['ids'])->delete();

            AdminActivity::log('deleted', 'Tip', null, null, 'Bulk deleted ' . count($validated['ids']) . ' tips');

            return redirect()->route('admin.tips.index');
        }
}
