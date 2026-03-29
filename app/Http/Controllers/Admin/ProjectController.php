<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $section = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'projects'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 5]
        );

        $defaultCategories = ['Residential','Commercial','Restaurant','Hotel & Resort','Duplex','Architecture','Construction'];
        $categories = \App\Models\SiteSetting::get('project_categories', null);
        $categories = $categories ? json_decode($categories, true) : $defaultCategories;

        return Inertia::render('admin/projects', [
            'projects'   => Project::orderBy('order')->get(),
            'section'    => $section->getContentObject(),
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_featured' => 'required',
            'is_active' => 'required',
            'amenities' => 'nullable|string',
            'floor_plans' => 'nullable|string',
            'existing_gallery' => 'nullable|string',
            'pdf_titles' => 'nullable|array',
            'pdf_titles.*' => 'nullable|string|max:255',
        ]);

        // Handle main image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            if ($file->isValid()) {
                $path = $file->store('projects', 'public');
                $validated['image_url'] = Storage::url($path);
            }
        }

        // Handle boolean fields
        $validated['is_featured'] = filter_var($validated['is_featured'], FILTER_VALIDATE_BOOLEAN);
        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        // Handle gallery images
        $gallery = [];
        if ($request->hasFile('gallery_files')) {
            $galleryFiles = $request->file('gallery_files');
            foreach ($galleryFiles as $file) {
                if ($file && $file->isValid() && $file->getError() === UPLOAD_ERR_OK) {
                    try {
                        $path = $file->store('projects/gallery', 'public');
                        $gallery[] = Storage::url($path);
                    } catch (\Exception $e) {
                        \Log::error('Gallery upload error: ' . $e->getMessage());
                    }
                }
            }
        }
        $validated['gallery'] = $gallery;

        // Handle amenities (JSON string) and normalize
        $validated['amenities'] = collect(json_decode($request->input('amenities', '[]'), true) ?: [])
            ->map(function ($item) {
                return [
                    'id' => $item['id'] ?? Str::uuid()->toString(),
                    'name' => $item['name'] ?? '',
                    'icon' => $item['icon'] ?? 'Star',
                ];
            })
            ->filter(fn ($item) => !empty($item['name']))
            ->values()
            ->toArray();

        // Handle floor plans
        $floorPlans = json_decode($request->input('floor_plans', '[]'), true) ?: [];
        if ($request->hasFile('pdf_files')) {
            $pdfFiles = $request->file('pdf_files');
            $pdfTitles = $request->input('pdf_titles', []);
            foreach ($pdfFiles as $index => $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('projects/floor-plans', 'public');
                    $floorPlans[] = [
                        'id' => Str::uuid()->toString(),
                        'title' => $pdfTitles[$index] ?? $file->getClientOriginalName(),
                        'pdf_url' => Storage::url($path),
                    ];
                }
            }
        }
        $validated['floor_plans'] = $floorPlans;

        // Clean up non-model fields
        unset($validated['image'], $validated['existing_gallery'], $validated['gallery_files'], $validated['pdf_files'], $validated['pdf_titles']);

        $project = Project::create($validated);
        
        AdminActivity::log('created', 'Project', $project->id, null, "Created project: {$project->title}");

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_featured' => 'required',
            'is_active' => 'required',
            'amenities' => 'nullable|string',
            'floor_plans' => 'nullable|string',
            'existing_gallery' => 'nullable|string',
            'pdf_titles' => 'nullable|array',
            'pdf_titles.*' => 'nullable|string|max:255',
        ]);

        // Handle main image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            if ($file->isValid()) {
                // Delete old image if exists
                if ($project->image_url) {
                    $oldPath = str_replace('/storage/', '', $project->image_url);
                    Storage::disk('public')->delete($oldPath);
                }

                $path = $file->store('projects', 'public');
                $validated['image_url'] = Storage::url($path);
            }
        }

        // Handle boolean fields
        $validated['is_featured'] = filter_var($validated['is_featured'], FILTER_VALIDATE_BOOLEAN);
        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        // Handle gallery images
        $existingGallery = json_decode($request->input('existing_gallery', '[]'), true) ?: [];
        $gallery = $existingGallery;
        
        if ($request->hasFile('gallery_files')) {
            $galleryFiles = $request->file('gallery_files');
            foreach ($galleryFiles as $file) {
                if ($file && $file->isValid() && $file->getSize() > 0) {
                    $path = $file->store('projects/gallery', 'public');
                    $gallery[] = Storage::url($path);
                }
            }
        }
        $validated['gallery'] = $gallery;

        // Handle amenities (JSON string) and normalize
        $validated['amenities'] = collect(json_decode($request->input('amenities', '[]'), true) ?: [])
            ->map(function ($item) {
                return [
                    'id' => $item['id'] ?? Str::uuid()->toString(),
                    'name' => $item['name'] ?? '',
                    'icon' => $item['icon'] ?? 'Star',
                ];
            })
            ->filter(fn ($item) => !empty($item['name']))
            ->values()
            ->toArray();

        // Handle floor plans
        $floorPlans = json_decode($request->input('floor_plans', '[]'), true) ?: [];
        if ($request->hasFile('pdf_files')) {
            $pdfFiles = $request->file('pdf_files');
            $pdfTitles = $request->input('pdf_titles', []);
            foreach ($pdfFiles as $index => $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('projects/floor-plans', 'public');
                    $floorPlans[] = [
                        'id' => Str::uuid()->toString(),
                        'title' => $pdfTitles[$index] ?? $file->getClientOriginalName(),
                        'pdf_url' => Storage::url($path),
                    ];
                }
            }
        }
        $validated['floor_plans'] = $floorPlans;

        // Clean up non-model fields
        unset($validated['image'], $validated['existing_gallery'], $validated['gallery_files'], $validated['pdf_files'], $validated['pdf_titles']);

        $project->update($validated);
        
        AdminActivity::log('updated', 'Project', $project->id, null, "Updated project: {$project->title}");

        return redirect()->back();
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        
        // Delete main image if exists
        if ($project->image_url) {
            $oldPath = str_replace('/storage/', '', $project->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        // Delete gallery images
        if ($project->gallery) {
            foreach ($project->gallery as $imageUrl) {
                $path = str_replace('/storage/', '', $imageUrl);
                Storage::disk('public')->delete($path);
            }
        }

        // Delete floor plan PDFs
        if ($project->floor_plans) {
            foreach ($project->floor_plans as $plan) {
                if (isset($plan['pdf_url'])) {
                    $path = str_replace('/storage/', '', $plan['pdf_url']);
                    Storage::disk('public')->delete($path);
                }
            }
        }

        $title = $project->title;
        
        $project->delete();
        
        AdminActivity::log('deleted', 'Project', null, null, "Deleted project: {$title}");

        return redirect()->back();
    }
    public function bulkDelete(Request $request)
        {
            $validated = $request->validate([
                'ids'   => 'required|array',
                'ids.*' => 'integer|exists:projects,id',
            ]);

            $projects = Project::whereIn('id', $validated['ids'])->get();

            foreach ($projects as $project) {
                if ($project->image_url) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $project->image_url));
                }
                if ($project->gallery) {
                    foreach ($project->gallery as $url) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $url));
                    }
                }
                if ($project->floor_plans) {
                    foreach ($project->floor_plans as $plan) {
                        if (isset($plan['pdf_url'])) {
                            Storage::disk('public')->delete(str_replace('/storage/', '', $plan['pdf_url']));
                        }
                    }
                }
                $project->delete();
            }

            AdminActivity::log('deleted', 'Project', null, null, 'Bulk deleted ' . count($validated['ids']) . ' projects');

            return redirect()->back();
        }

    public function updateSection(Request $request)
    {
        $validated = $request->validate([
            'section_title' => 'nullable|string|max:255',
            'section_description' => 'nullable|string',
        ]);

        $section = \App\Models\PageSection::firstOrCreate(
            ['section_key' => 'projects'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 5]
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
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated projects section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }
    public function updateCategories(Request $request)
        {
            $validated = $request->validate([
                'categories'   => 'required|array|min:1',
                'categories.*' => 'required|string|max:100',
            ]);

            \App\Models\SiteSetting::set('project_categories', json_encode($validated['categories']), 'text');

            AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated project categories');

            return redirect()->back();
        }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:projects,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            Project::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'Project', null, null, 'Reordered projects');

        return response()->json(['success' => true]);
    }
}
