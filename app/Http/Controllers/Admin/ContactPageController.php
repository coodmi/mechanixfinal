<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\SiteSetting;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactPageController extends Controller
{
    public function index()
    {
        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );
        $content = $section->getContentObject();

        return Inertia::render('admin/contact-page', [
            'content' => [
                'hero_title'       => SiteSetting::get('contact_page_hero_title',    'Contact Us'),
                'hero_subtitle'    => SiteSetting::get('contact_page_hero_subtitle', "Have questions? We'd love to hear from you."),
                'phone_primary'    => $content->phone_primary    ?? '',
                'phone_secondary'  => $content->phone_secondary  ?? '',
                'hotline'          => $content->hotline           ?? '',
                'email_primary'    => $content->email_primary     ?? '',
                'email_secondary'  => $content->email_secondary   ?? '',
                'address'          => $content->address           ?? '',
                'office_hours_mon_fri' => SiteSetting::get('contact_office_hours_mon_fri', 'Monday - Friday: 9:00 AM - 6:00 PM'),
                'office_hours_sat'     => SiteSetting::get('contact_office_hours_sat',     'Saturday: 10:00 AM - 4:00 PM'),
                'office_hours_sun'     => SiteSetting::get('contact_office_hours_sun',     'Sunday: Closed'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero_title'           => 'nullable|string|max:255',
            'hero_subtitle'        => 'nullable|string|max:500',
            'phone_primary'        => 'nullable|string|max:50',
            'phone_secondary'      => 'nullable|string|max:50',
            'hotline'              => 'nullable|string|max:50',
            'email_primary'        => 'nullable|email|max:255',
            'email_secondary'      => 'nullable|email|max:255',
            'address'              => 'nullable|string',
            'office_hours_mon_fri' => 'nullable|string|max:100',
            'office_hours_sat'     => 'nullable|string|max:100',
            'office_hours_sun'     => 'nullable|string|max:100',
        ]);

        // Save hero & office hours to SiteSettings
        SiteSetting::set('contact_page_hero_title',    $validated['hero_title']    ?? 'Contact Us');
        SiteSetting::set('contact_page_hero_subtitle', $validated['hero_subtitle'] ?? '');
        SiteSetting::set('contact_office_hours_mon_fri', $validated['office_hours_mon_fri'] ?? '');
        SiteSetting::set('contact_office_hours_sat',     $validated['office_hours_sat']     ?? '');
        SiteSetting::set('contact_office_hours_sun',     $validated['office_hours_sun']     ?? '');

        // Save contact info to page section
        $section = PageSection::firstOrCreate(
            ['section_key' => 'contact'],
            ['page' => 'welcome', 'is_active' => true, 'order' => 6]
        );

        $contactFields = ['phone_primary', 'phone_secondary', 'hotline', 'email_primary', 'email_secondary', 'address'];
        foreach ($contactFields as $field) {
            if (isset($validated[$field])) {
                PageContent::updateOrCreate(
                    ['section_id' => $section->id, 'key' => $field],
                    ['value' => $validated[$field] ?? '', 'type' => 'text']
                );
            }
        }

        AdminActivity::log('updated', 'PageSection', $section->id, null, 'Updated contact page settings');

        return redirect()->back();
    }
}
