<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivity;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSubmissionController extends Controller
{
    /**
     * Display all contact submissions.
     */
    public function index()
    {
        $submissions = ContactSubmission::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/contact-submissions', [
            'submissions' => $submissions,
        ]);
    }

    /**
     * Update the status of a contact submission.
     */
    public function updateStatus(Request $request, ContactSubmission $submission)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,responded,closed',
        ]);

        $submission->update($validated);

        AdminActivity::log('updated', 'ContactSubmission', $submission->id, null, "Updated contact submission status to {$validated['status']}");

        return back();
    }

    /**
     * Update the admin notes for a contact submission.
     */
    public function updateNotes(Request $request, ContactSubmission $submission)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:5000',
        ]);

        $submission->update($validated);

        AdminActivity::log('updated', 'ContactSubmission', $submission->id, null, 'Updated contact submission notes');

        return back();
    }

    /**
     * Delete a contact submission.
     */
    public function destroy(ContactSubmission $submission)
    {
        $submissionId = $submission->id;
        $submission->delete();

        AdminActivity::log('deleted', 'ContactSubmission', $submissionId, null, 'Deleted contact submission');

        return back();
    }
}
