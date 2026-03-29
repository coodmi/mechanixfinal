<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\JobOpening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_opening_id' => 'required|exists:job_openings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'resume' => 'required|file|mimes:pdf|max:10240',
            'cover_letter' => 'nullable|string|max:5000',
            'portfolio_url' => 'nullable|url|max:255',
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }

        JobApplication::create([
            'job_opening_id' => $validated['job_opening_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'resume_path' => $resumePath,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'portfolio_url' => $validated['portfolio_url'] ?? null,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Application submitted successfully!');
    }
}
