<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivity;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index()
    {
        $applications = JobApplication::with('jobOpening')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'name' => $application->name,
                    'email' => $application->email,
                    'phone' => $application->phone,
                    'resume_url' => $application->resume_path ? Storage::url($application->resume_path) : null,
                    'cover_letter' => $application->cover_letter,
                    'portfolio_url' => $application->portfolio_url,
                    'status' => $application->status,
                    'notes' => $application->notes,
                    'created_at' => $application->created_at->toISOString(),
                    'job_opening' => $application->jobOpening ? [
                        'id' => $application->jobOpening->id,
                        'title' => $application->jobOpening->title,
                        'category' => $application->jobOpening->category,
                    ] : null,
                ];
            });

        return Inertia::render('admin/job-applications', [
            'applications' => $applications,
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewing,accepted,rejected',
            'notes' => 'nullable|string|max:1000',
        ]);

        $oldStatus = $application->status;
        $application->update($validated);

        AdminActivity::log(
            'updated',
            'JobApplication',
            $application->id,
            ['name' => $application->name],
            "Updated application status from {$oldStatus} to {$validated['status']}"
        );

        return back()->with('success', 'Application status updated successfully!');
    }

    public function downloadResume(JobApplication $application)
    {
        if (!$application->resume_path || !Storage::disk('public')->exists($application->resume_path)) {
            abort(404, 'Resume not found');
        }

        $fileName = $application->name . '_resume.' . pathinfo($application->resume_path, PATHINFO_EXTENSION);
        $filePath = Storage::disk('public')->path($application->resume_path);
        
        return response()->download($filePath, $fileName);
    }

    public function destroy(JobApplication $application)
    {
        // Delete resume file if exists
        if ($application->resume_path) {
            Storage::disk('public')->delete($application->resume_path);
        }

        $applicationName = $application->name;
        $application->delete();

        AdminActivity::log(
            'deleted',
            'JobApplication',
            null,
            ['name' => $applicationName],
            "Deleted job application from {$applicationName}"
        );

        return back()->with('success', 'Application deleted successfully!');
    }
}
