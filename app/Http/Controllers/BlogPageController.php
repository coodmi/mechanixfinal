<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\NavigationItem;
use App\Models\SiteSetting;
use App\Models\SiteHeaderSetting;
use App\Models\SocialMediaLink;
use App\Models\PageSection;
use Inertia\Inertia;

class BlogPageController extends Controller
{
    private function sharedData(): array
    {
        return [
            'navigation' => NavigationItem::active()->topLevel()->with(['children' => fn($q) => $q->active()->orderBy('order')])->orderBy('order')->get(),
            'siteSettings' => [
                'logoUrl'       => SiteSetting::get('logo_url', '/logo.png'),
                'logoVersion'   => SiteSetting::get('logo_version', time()),
                'companyName'   => SiteSetting::get('company_name', 'MECHANIX.'),
                'facebookUrl'   => SiteSetting::get('facebook_url', ''),
                'instagramUrl'  => SiteSetting::get('instagram_url', ''),
                'linkedinUrl'   => SiteSetting::get('linkedin_url', ''),
                'copyrightText' => SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
            ],
            'headerSettings' => [
                'ctaButtonText' => SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
                'ctaButtonLink' => SiteHeaderSetting::get('cta_button_link', '#contact'),
                'socialLinks'   => SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
            ],
            'contact'           => PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
            'footerSocialLinks' => SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
        ];
    }

    public function index()
    {
        $blogs = Blog::active()->where(fn($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))->latest('published_at')->get();
        $stored = SiteSetting::get('blog_categories', null);
        $categories = $stored ? json_decode($stored, true) : [];
        $dbCats = Blog::active()->whereNotNull('category')->distinct()->orderBy('category')->pluck('category');
        $categories = collect($categories)->merge($dbCats)->unique()->sort()->values();

        return Inertia::render('blogs', array_merge($this->sharedData(), [
            'blogs'        => $blogs,
            'categories'   => $categories,
            'pageSettings' => [
                'title'       => SiteSetting::get('blog_page_title', 'Our Blog'),
                'description' => SiteSetting::get('blog_page_description', 'Insights, ideas and inspiration from the Mechanix team.'),
                'bg_image'    => SiteSetting::get('blog_page_bg_image', ''),
            ],
        ]));
    }

    public function show(Blog $blog)
    {
        $related = Blog::active()->where('id', '!=', $blog->id)->when($blog->category, fn($q) => $q->where('category', $blog->category))->latest('published_at')->take(4)->get();
        $recent  = Blog::active()->where('id', '!=', $blog->id)->latest('published_at')->take(5)->get();

        return Inertia::render('blog-detail', array_merge($this->sharedData(), [
            'blog'    => $blog,
            'related' => $related,
            'recent'  => $recent,
        ]));
    }
}
