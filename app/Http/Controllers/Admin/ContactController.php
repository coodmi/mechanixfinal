<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        return Inertia::render('admin/contact', [
            'content' => $section->getContentObject(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'phone_primary' => 'nullable|string|max:50',
            'phone_secondary' => 'nullable|string|max:50',
            'email_primary' => 'nullable|email|max:255',
            'email_secondary' => 'nullable|email|max:255',
            'hotline' => 'nullable|string|max:50',
            'form_name_label' => 'nullable|string|max:100',
            'form_email_label' => 'nullable|string|max:100',
            'form_phone_label' => 'nullable|string|max:100',
            'form_message_label' => 'nullable|string|max:100',
            'form_submit_text' => 'nullable|string|max:100',
        ]);

        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        $hasChanges = false;

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                $existing = PageContent::where('section_id', $section->id)->where('key', $key)->first();
                if (!$existing || $existing->value !== $value) {
                    PageContent::updateOrCreate(
                        ['section_id' => $section->id, 'key' => $key],
                        ['value' => $value, 'type' => 'text']
                    );
                    $hasChanges = true;
                }
            }
        }
        
        if ($hasChanges) {
            AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated contact section');
            return redirect()->back()->with('success', 'updated');
        }

        return redirect()->back()->with('success', 'no-changes');
    }
}
