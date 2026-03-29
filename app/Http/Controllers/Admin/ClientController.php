<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/clients', [
            'clients' => Client::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|max:2048',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = Storage::url($path);
        }

        $client = Client::create($validated);
        
        AdminActivity::log('created', 'Client', $client->id, null, "Created client {$client->name}");

        return redirect()->back();
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = Storage::url($path);
        } else {
            unset($validated['logo']);
        }

        $client->update($validated);
        
        AdminActivity::log('updated', 'Client', $client->id, null, "Updated client {$client->name}");

        return redirect()->back();
    }

    public function destroy(Client $client)
    {
        $client->delete();
        
        AdminActivity::log('deleted', 'Client', $client->id, null, "Deleted client {$client->name}");

        return redirect()->back();
    }
}
