<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\SocialMediaLink;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FooterController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        return Inertia::render('admin/footer', [
            'copyright_text' => $section->getContentObject()?->copyright_text ?? '© 2025 Mechanix Interior. All rights reserved.',
            'links'          => SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
        ]);
    }

    public function updateCopyright(Request $request)
    {
        $validated = $request->validate([
            'copyright_text' => 'nullable|string|max:255',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        PageContent::updateOrCreate(
            ['section_id' => $section->id, 'key' => 'copyright_text'],
            ['value' => $validated['copyright_text'] ?? '', 'type' => 'text']
        );

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated footer copyright');

        return redirect()->back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url'      => 'required|url|max:500',
        ]);

        $link = SocialMediaLink::create([
            'platform' => $validated['platform'],
            'url'      => $validated['url'],
            'location' => 'footer',
            'order'    => SocialMediaLink::where('location', 'footer')->max('order') + 1,
        ]);

        AdminActivity::log('created', 'SocialMediaLink', $link->id, null, "Added footer {$link->platform} link");

        return redirect()->back();
    }

    public function update(Request $request, SocialMediaLink $socialMediaLink)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url'      => 'required|url|max:500',
        ]);

        $socialMediaLink->update($validated);

        AdminActivity::log('updated', 'SocialMediaLink', $socialMediaLink->id, null, "Updated footer {$socialMediaLink->platform} link");

        return redirect()->back();
    }

    public function destroy(SocialMediaLink $socialMediaLink)
    {
        $platform = $socialMediaLink->platform;
        $socialMediaLink->delete();

        AdminActivity::log('deleted', 'SocialMediaLink', null, null, "Deleted footer {$platform} link");

        return redirect()->back();
    }
}
