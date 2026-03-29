<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/team-members', [
            'members' => TeamMember::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'image_url' => 'nullable|image|max:5120',
            'linkedin_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'category' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('team', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $member = TeamMember::create($validated);
        
        AdminActivity::log('created', 'TeamMember', $member->id, null, "Created team member: {$member->name}");

        return redirect()->back();
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'image_url' => 'nullable|image|max:5120',
            'linkedin_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'category' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('team', 'public');
            $validated['image_url'] = Storage::url($path);
        } else {
            unset($validated['image_url']);
        }

        $teamMember->update($validated);
        
        AdminActivity::log('updated', 'TeamMember', $teamMember->id, null, "Updated team member: {$teamMember->name}");

        return redirect()->back();
    }

    public function destroy(TeamMember $teamMember)
    {
        $name = $teamMember->name;
        $teamMember->delete();
        
        AdminActivity::log('deleted', 'TeamMember', null, null, "Deleted team member: {$name}");

        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:team_members,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            TeamMember::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'TeamMember', null, null, 'Reordered team members');

        return response()->json(['success' => true]);
    }
}
