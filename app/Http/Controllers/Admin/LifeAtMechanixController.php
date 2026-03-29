<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\PageItem;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LifeAtMechanixController extends Controller
{
    public function index()
    {
        $sections = [
            'tech_zone' => 1,
            'design_zone' => 2,
            'meeting_zone' => 3,
            'quote' => 4,
            'coffee_zone' => 5,
            'team_dinner' => 6,
            'glimpse' => 7,
            'team_gallery' => 8,
        ];

        $data = [];

        foreach ($sections as $key => $order) {
            $section = PageSection::firstOrCreate(
                ['section_key' => $key, 'page' => 'life-at-mechanix'],
                ['is_active' => true, 'order' => $order]
            );

            $content = $section->getContentObject(); 
            
            // Add section ID for frontend to use
            $content->section_id = $section->id;

            // Add items if applicable
            if (in_array($key, ['glimpse', 'team_gallery'])) {
                $content->items = $section->items;
            }

            $data[$key] = $content;
        }

        return Inertia::render('admin/life-at-mechanix', $data);
    }

    private function updateSectionContent(Request $request, string $sectionKey, array $validationRules)
    {
        $validated = $request->validate($validationRules);

        $section = PageSection::firstOrCreate(
            ['section_key' => $sectionKey, 'page' => 'life-at-mechanix'],
            ['is_active' => true]
        );

        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($key === 'image' && $request->hasFile('image')) {
                $path = $request->file('image')->store('life-at-mechanix', 'public');
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
            AdminActivity::log('updated', 'PageSection', $section->id, null, "Updated life at mechanix $sectionKey section");
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }

    public function updateTechZone(Request $request)
    {
        return $this->updateSectionContent($request, 'tech_zone', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateDesignZone(Request $request)
    {
        return $this->updateSectionContent($request, 'design_zone', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateMeetingZone(Request $request)
    {
        return $this->updateSectionContent($request, 'meeting_zone', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateQuote(Request $request)
    {
        return $this->updateSectionContent($request, 'quote', [
            'quote' => 'nullable|string',
            'author' => 'nullable|string|max:255',
        ]);
    }

    public function updateCoffeeZone(Request $request)
    {
        return $this->updateSectionContent($request, 'coffee_zone', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateTeamDinner(Request $request)
    {
        return $this->updateSectionContent($request, 'team_dinner', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateGlimpse(Request $request)
    {
        return $this->updateSectionContent($request, 'glimpse', [
            'title' => 'nullable|string|max:255',
        ]);
    }

    public function storeItem(Request $request)
    {
        $validated = $request->validate([
            'page_section_id' => 'required|exists:page_sections,id',
            'image' => 'nullable|image|max:5120',
            'order' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('life-at-mechanix', 'public');
            $validated['image'] = Storage::url($path);
        }

        PageItem::create($validated);

        return redirect()->back();
    }

    public function updateItem(Request $request, PageItem $item)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|max:5120',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('life-at-mechanix', 'public');
            $validated['image'] = Storage::url($path);
        }

        $item->update($validated);

        return redirect()->back();
    }

    public function destroyItem(PageItem $item)
    {
        $item->delete();

        return redirect()->back();
    }
}

