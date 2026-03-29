<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $section = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'services'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 4]
        );

        return Inertia::render('admin/services', [
            'services' => Service::orderBy('order')->get(),
            'section' => $section->getContentObject(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $service = Service::create($validated);
        
        AdminActivity::log('created', 'Service', $service->id, null, "Created service: {$service->title}");

        return redirect()->back();
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $service->update($validated);
        
        AdminActivity::log('updated', 'Service', $service->id, null, "Updated service: {$service->title}");

        return redirect()->back();
    }

    public function destroy(Service $service)
    {
        $title = $service->title;
        $service->delete();
        
        AdminActivity::log('deleted', 'Service', null, null, "Deleted service: {$title}");

        return redirect()->back();
    }

    public function updateSection(Request $request)
    {
        $validated = $request->validate([
            'section_title' => 'nullable|string|max:255',
            'section_description' => 'nullable|string',
        ]);

        $section = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'services'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 4]
        );

        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                $existing = \App\Models\PageContent::where('section_id', $section->id)->where('key', $key)->first();
                if (!$existing || $existing->value !== $value) {
                    \App\Models\PageContent::updateOrCreate(
                        ['section_id' => $section->id, 'key' => $key],
                        ['value' => $value, 'type' => 'text']
                    );
                    $hasChanges = true;
                }
            }
        }
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated services section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:services,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            Service::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'Service', null, null, 'Reordered services');

        return response()->json(['success' => true]);
    }
}
