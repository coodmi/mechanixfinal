<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WelcomeModalController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/welcome-modal', [
            'settings' => [
                'title' => SiteSetting::get('welcome_modal_title', 'Project Kick-off Offer'),
                'description' => SiteSetting::get('welcome_modal_description', 'Start your journey with Mechanix. Book a free, 30-minute virtual consultation with our lead designer to discuss the blueprint of your ideal space.'),
                'button_text' => SiteSetting::get('welcome_modal_button_text', 'Book Now'),
                'button_link' => SiteSetting::get('welcome_modal_button_link', 'https://google.com'),
                'image' => SiteSetting::get('welcome_modal_image', '/images/welcome-modal.jpg'),
                'note' => SiteSetting::get('welcome_modal_note', 'Limited slots available this week.'),
                'is_active' => SiteSetting::get('welcome_modal_is_active', 'true') === 'true',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'button_text' => 'required|string|max:100',
            'button_link' => 'required|string|max:500',
            'note' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
            'is_active' => 'boolean',
        ]);

        SiteSetting::set('welcome_modal_title', $validated['title']);
        SiteSetting::set('welcome_modal_description', $validated['description']);
        SiteSetting::set('welcome_modal_button_text', $validated['button_text']);
        SiteSetting::set('welcome_modal_button_link', $validated['button_link']);
        SiteSetting::set('welcome_modal_note', $validated['note'] ?? '');
        SiteSetting::set('welcome_modal_is_active', $validated['is_active'] ? 'true' : 'false');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('welcome-modal', 'public');
            SiteSetting::set('welcome_modal_image', Storage::url($path));
        }

        AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated welcome modal settings');

        return redirect()->back();
    }
}
