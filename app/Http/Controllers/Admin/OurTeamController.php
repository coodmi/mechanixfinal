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

class OurTeamController extends Controller
{
    public function index()
    {
        $sections = [
            'whole_team_photo' => 0,
            'hero' => 1,
            'ceo_quote' => 2,
            'team_quote' => 3,
            'beyond_desk' => 4,
            'team_motion' => 5,
        ];

        $data = [];

        foreach ($sections as $key => $order) {
            $section = PageSection::firstOrCreate(
                ['section_key' => $key, 'page' => 'our-team'],
                ['is_active' => true, 'order' => $order]
            );

            $content = $section->getContentObject();
            
            // Add section ID for frontend to use
            $content->section_id = $section->id;

            // Add items if applicable
            if (in_array($key, ['beyond_desk', 'team_motion'])) {
                $content->items = $section->items;
            }

            $data[$key] = $content;
        }

        return Inertia::render('admin/our-team', $data);
    }

    public function updateWholeTeamPhoto(Request $request)
    {
        return $this->updateSectionContent($request, 'whole_team_photo', [
            'image' => 'nullable|image|max:5120',
        ]);
    }

    private function updateSectionContent(Request $request, string $sectionKey, array $validationRules)
    {
        $validated = $request->validate($validationRules);

        $section = PageSection::firstOrCreate(
            ['section_key' => $sectionKey, 'page' => 'our-team'],
            ['is_active' => true]
        );

        foreach ($validated as $key => $value) {
            if ($key === 'image' && $request->hasFile('image')) {
                $path = $request->file('image')->store('our-team', 'public');
                $value = Storage::url($path);
                $key = 'image';
            }

            if ($value !== null && $key !== 'image' || ($key === 'image' && $request->hasFile('image'))) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, "Updated our team $sectionKey section");

        return redirect()->back();
    }

    public function updateHero(Request $request)
    {
        return $this->updateSectionContent($request, 'hero', [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
        ]);
    }

    public function updateCeoQuote(Request $request)
    {
        return $this->updateSectionContent($request, 'ceo_quote', [
            'quote' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
        ]);
    }

    public function updateTeamQuote(Request $request)
    {
        return $this->updateSectionContent($request, 'team_quote', [
            'quote' => 'nullable|string',
            'author' => 'nullable|string|max:255',
        ]);
    }

    public function updateBeyondDesk(Request $request)
    {
        return $this->updateSectionContent($request, 'beyond_desk', [
            'title' => 'nullable|string|max:255',
        ]);
    }

    public function updateTeamMotion(Request $request)
    {
        return $this->updateSectionContent($request, 'team_motion', [
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
            $path = $request->file('image')->store('our-team', 'public');
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
            $path = $request->file('image')->store('our-team', 'public');
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

