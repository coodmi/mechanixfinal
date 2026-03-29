<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\PageItem;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutUsController extends Controller
{
    public function index()
    {
        $sections = [
            'main' => 1,
            'stats' => 2,
            'ceo_vision' => 3,
            'values' => 4,
            'process' => 5,
            'certificates' => 6,
            'affiliations' => 7,
            'cta' => 8,
        ];

        $data = [];

        foreach ($sections as $key => $order) {
            $section = PageSection::firstOrCreate(
                ['section_key' => $key, 'page' => 'about-us'],
                ['is_active' => true, 'order' => $order]
            );
            
            $content = $section->getContentObject();
            
            // Add items if applicable
            if (in_array($key, ['stats', 'values', 'process', 'certificates', 'affiliations'])) {
                $content->items = $section->items;
            }

            $data[$key] = $content;
        }

        return Inertia::render('admin/about-us', $data);
    }

    public function updateMain(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'main', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 1]
        );

        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($key === 'image' && $request->hasFile('image')) {
                $path = $request->file('image')->store('about-us', 'public');
                $value = Storage::url($path);
                $key = 'image';
            }

            if ($value !== null && $key !== 'image' || ($key === 'image' && $request->hasFile('image'))) {
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
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about us main section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }



    public function updateCeoVision(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'quote' => 'nullable|string',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'ceo_vision', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 3]
        );

        $hasChanges = $this->updateSectionContent($section, $request, $validated);
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about us CEO vision section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }

    public function updateCta(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'cta', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 8]
        );

        $hasChanges = $this->updateSectionContent($section, $request, $validated);
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated about us CTA section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }

    public function updateSection(Request $request)
    {
        $validated = $request->validate([
            'section_key' => 'required|string',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $section = PageSection::where('section_key', $validated['section_key'])
            ->where('page', 'about-us')
            ->firstOrFail();

        $hasChanges = false;

        foreach (['title', 'description'] as $key) {
            if (isset($validated[$key])) {
                $existing = PageContent::where('section_id', $section->id)->where('key', $key)->first();
                if (!$existing || $existing->value !== $validated[$key]) {
                    PageContent::updateOrCreate(
                        ['section_id' => $section->id, 'key' => $key],
                        ['value' => $validated[$key], 'type' => 'text']
                    );
                    $hasChanges = true;
                }
            }
        }
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, "Updated {$section->section_key} section");
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }

    private function updateSectionContent($section, $request, $validated)
    {
        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($key === 'image' && $request->hasFile('image')) {
                $path = $request->file('image')->store('about-us', 'public');
                $value = Storage::url($path);
                $key = 'image';
            }

            if ($value !== null && $key !== 'image' || ($key === 'image' && $request->hasFile('image'))) {
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

        return $hasChanges;
    }
    public function storeItem(Request $request)
    {
        $validated = $request->validate([
            'section_key' => 'required|string',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'order' => 'nullable|integer',
        ]);

        $section = PageSection::where('section_key', $validated['section_key'])
            ->where('page', 'about-us')
            ->firstOrFail();

        $data = $request->only(['title', 'description', 'icon', 'order']);
        $data['page_section_id'] = $section->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-us/items', 'public');
            $data['image'] = Storage::url($path);
        }

        $item = PageItem::create($data);

        AdminActivity::log('created', 'PageItem', $item->id, null, "Created item in {$section->section_key}");

        return redirect()->back();
    }

    public function updateItem(Request $request, PageItem $item)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'order' => 'nullable|integer',
        ]);

        $data = $request->only(['title', 'description', 'icon', 'order']);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($item->image) {
                $oldPath = str_replace('/storage/', '', $item->image);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('about-us/items', 'public');
            $data['image'] = Storage::url($path);
        }

        $item->update($data);

        AdminActivity::log('updated', 'PageItem', $item->id, null, "Updated item {$item->id}");

        return redirect()->back();
    }

    public function destroyItem(PageItem $item)
    {
        if ($item->image) {
            $oldPath = str_replace('/storage/', '', $item->image);
            Storage::disk('public')->delete($oldPath);
        }

        $item->delete();

        AdminActivity::log('deleted', 'PageItem', $item->id, null, "Deleted item {$item->id}");

        return redirect()->back();
    }
}
