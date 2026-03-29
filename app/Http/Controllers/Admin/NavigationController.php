<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;
use App\Models\SiteHeaderSetting;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NavigationController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/navigation', [
            'items' => NavigationItem::with('children')
                ->orderBy('order')
                ->get(),
            'headerSettings' => [
                'facebook_url' => SiteHeaderSetting::get('facebook_url', ''),
                'instagram_url' => SiteHeaderSetting::get('instagram_url', ''),
                'linkedin_url' => SiteHeaderSetting::get('linkedin_url', ''),
                'cta_button_text' => SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
                'cta_button_link' => SiteHeaderSetting::get('cta_button_link', '#contact'),
                'logo_url' => SiteHeaderSetting::get('logo_url', '/logo.png'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'href' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $item = NavigationItem::create($validated);
        
        AdminActivity::log('created', 'NavigationItem', $item->id, null, "Created navigation item: {$item->label}");

        return redirect()->back();
    }

    public function update(Request $request, NavigationItem $navigationItem)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'href' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $changes = $navigationItem->getChanges();
        $navigationItem->update($validated);
        
        AdminActivity::log('updated', 'NavigationItem', $navigationItem->id, $changes, "Updated navigation item: {$navigationItem->label}");

        return redirect()->back();
    }

    public function destroy(NavigationItem $navigationItem)
    {
        $label = $navigationItem->label;
        $navigationItem->delete();
        
        AdminActivity::log('deleted', 'NavigationItem', null, null, "Deleted navigation item: {$label}");

        return redirect()->back();
    }

    public function updateHeaderSettings(Request $request)
    {
        $validated = $request->validate([
            'facebook_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'cta_button_text' => 'required|string|max:255',
            'cta_button_link' => 'required|string|max:255',
            'logo' => 'nullable|image|max:5120',
        ]);

        SiteHeaderSetting::set('facebook_url', $validated['facebook_url'] ?? '', 'text');
        SiteHeaderSetting::set('instagram_url', $validated['instagram_url'] ?? '', 'text');
        SiteHeaderSetting::set('linkedin_url', $validated['linkedin_url'] ?? '', 'text');
        SiteHeaderSetting::set('cta_button_text', $validated['cta_button_text'], 'text');
        SiteHeaderSetting::set('cta_button_link', $validated['cta_button_link'], 'text');

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            SiteHeaderSetting::set('logo_url', \Illuminate\Support\Facades\Storage::url($path), 'text');
        }

        AdminActivity::log('updated', 'SiteHeaderSetting', null, null, 'Updated site header settings');

        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:navigation_items,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            NavigationItem::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'NavigationItem', null, null, 'Reordered navigation items');

        return redirect()->back();
    }
}
