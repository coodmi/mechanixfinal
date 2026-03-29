<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaLink;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialMediaController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/social-media', [
            'links' => SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url'      => 'required|url|max:500',
        ]);

        $validated['location'] = 'header';
        $validated['order'] = SocialMediaLink::where('location', 'header')->max('order') + 1;
        $link = SocialMediaLink::create($validated);

        AdminActivity::log('created', 'SocialMediaLink', $link->id, null, "Added {$link->platform} link");

        return redirect()->back();
    }

    public function update(Request $request, SocialMediaLink $socialMediaLink)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url'      => 'required|url|max:500',
        ]);

        $socialMediaLink->update($validated);

        AdminActivity::log('updated', 'SocialMediaLink', $socialMediaLink->id, null, "Updated {$socialMediaLink->platform} link");

        return redirect()->back();
    }

    public function destroy(SocialMediaLink $socialMediaLink)
    {
        $platform = $socialMediaLink->platform;
        $socialMediaLink->delete();

        AdminActivity::log('deleted', 'SocialMediaLink', null, null, "Deleted {$platform} link");

        return redirect()->back();
    }
}
