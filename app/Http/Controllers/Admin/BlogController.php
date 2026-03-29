<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\AdminActivity;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $default = ['Interior Design', 'Architecture', 'Tips & Tricks', 'Inspiration', 'News'];
        $stored  = SiteSetting::get('blog_categories', null);
        $categories = $stored ? json_decode($stored, true) : $default;

        return Inertia::render('admin/blogs', [
            'blogs'      => Blog::latest('published_at')->get(),
            'categories' => $categories,
            'pageSettings' => [
                'title'       => SiteSetting::get('blog_page_title', 'Our Blog'),
                'description' => SiteSetting::get('blog_page_description', 'Insights, ideas and inspiration from the Mechanix team.'),
                'bg_image'    => SiteSetting::get('blog_page_bg_image', ''),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'nullable|string|max:100',
            'content'      => 'required|string',
            'author'       => 'nullable|string|max:255',
            'image'        => 'nullable|image|max:5120',
            'published_at' => 'nullable|date',
            'is_active'    => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = Storage::url($request->file('image')->store('blogs', 'public'));
        }

        $blog = Blog::create($validated);
        AdminActivity::log('created', 'Blog', $blog->id, null, "Created blog: {$blog->title}");

        return redirect('/admin/blogs');
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'nullable|string|max:100',
            'content'      => 'required|string',
            'author'       => 'nullable|string|max:255',
            'image'        => 'nullable|image|max:5120',
            'published_at' => 'nullable|date',
            'is_active'    => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = Storage::url($request->file('image')->store('blogs', 'public'));
        } else {
            unset($validated['image']);
        }

        $blog->update($validated);
        AdminActivity::log('updated', 'Blog', $blog->id, null, "Updated blog: {$blog->title}");

        return redirect('/admin/blogs');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->image) Storage::disk('public')->delete(str_replace('/storage/', '', $blog->image));
        $blog->delete();
        AdminActivity::log('deleted', 'Blog', null, null, "Deleted blog: {$blog->title}");

        return redirect('/admin/blogs');
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate(['ids' => 'required|array', 'ids.*' => 'integer|exists:blogs,id']);
        Blog::whereIn('id', $validated['ids'])->get()->each(function ($b) {
            if ($b->image) Storage::disk('public')->delete(str_replace('/storage/', '', $b->image));
            $b->delete();
        });
        AdminActivity::log('deleted', 'Blog', null, null, 'Bulk deleted ' . count($validated['ids']) . ' blogs');

        return redirect('/admin/blogs');
    }

    public function updateCategories(Request $request)
    {
        $validated = $request->validate(['categories' => 'required|array|min:1', 'categories.*' => 'required|string|max:100']);
        SiteSetting::set('blog_categories', json_encode($validated['categories']), 'text');
        AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated blog categories');

        return redirect()->back();
    }
    public function savePageSettings(Request $request)
        {
            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string',
                'bg_image'    => 'nullable|image|max:5120',
            ]);

            SiteSetting::set('blog_page_title', $validated['title']);
            SiteSetting::set('blog_page_description', $validated['description'] ?? '');

            if ($request->hasFile('bg_image')) {
                $url = Storage::url($request->file('bg_image')->store('blogs', 'public'));
                SiteSetting::set('blog_page_bg_image', $url);
            }

            AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated blog page settings');

            return redirect()->back();
        }
}
