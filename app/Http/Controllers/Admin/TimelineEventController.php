<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TimelineEvent;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimelineEventController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/timeline-events', [
            'events' => TimelineEvent::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_current' => 'required|boolean',
            'order' => 'required|integer',
        ]);

        $event = TimelineEvent::create($validated);
        
        AdminActivity::log('created', 'TimelineEvent', $event->id, null, "Created timeline event: {$event->title}");

        return redirect()->back();
    }

    public function update(Request $request, TimelineEvent $timelineEvent)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_current' => 'required|boolean',
            'order' => 'required|integer',
        ]);

        $timelineEvent->update($validated);
        
        AdminActivity::log('updated', 'TimelineEvent', $timelineEvent->id, null, "Updated timeline event: {$timelineEvent->title}");

        return redirect()->back();
    }

    public function destroy(TimelineEvent $timelineEvent)
    {
        $title = $timelineEvent->title;
        $timelineEvent->delete();
        
        AdminActivity::log('deleted', 'TimelineEvent', null, null, "Deleted timeline event: {$title}");

        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:timeline_events,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            TimelineEvent::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivity::log('reordered', 'TimelineEvent', null, null, 'Reordered timeline events');

        return redirect()->back();
    }
}
