<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobOpening;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobOpeningController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/job-openings', [
            'jobs' => JobOpening::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'vacancies' => 'required|integer|min:1',
            'deadline' => 'nullable|date',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $job = JobOpening::create($validated);
        
        AdminActivity::log('created', 'JobOpening', $job->id, null, "Created job opening: {$job->title}");

        return redirect()->back();
    }

    public function update(Request $request, JobOpening $jobOpening)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'vacancies' => 'required|integer|min:1',
            'deadline' => 'nullable|date',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $jobOpening->update($validated);
        
        AdminActivity::log('updated', 'JobOpening', $jobOpening->id, null, "Updated job opening: {$jobOpening->title}");

        return redirect()->back();
    }

    public function destroy(JobOpening $jobOpening)
    {
        $title = $jobOpening->title;
        $jobOpening->delete();
        
        AdminActivity::log('deleted', 'JobOpening', null, null, "Deleted job opening: {$title}");

        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:job_openings,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            JobOpening::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'JobOpening', null, null, 'Reordered job openings');

        return response()->json(['success' => true]);
    }
}
