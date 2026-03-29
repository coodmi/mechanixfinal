<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use App\Models\NavigationItem;
use App\Models\PageSection;
use App\Models\SiteSetting;
use App\Models\SiteHeaderSetting;
use App\Models\SocialMediaLink;
use Inertia\Inertia;

class TipsPageController extends Controller
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
            'contact'          => PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
            'footerSocialLinks'=> SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
        ];
    }

    public function index()
    {
        $tips = Tip::active()
            ->where(fn($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->latest('published_at')->get();

        $categories = Tip::active()->whereNotNull('category')->distinct()->orderBy('category')->pluck('category');

        // Also merge stored categories
        $stored = \App\Models\SiteSetting::get('tip_categories', null);
        $storedCats = $stored ? json_decode($stored, true) : [];
        $categories = $categories->merge($storedCats)->unique()->sort()->values();

        $pageHero = PageSection::where('page', 'tips')->where('section_key', 'page_hero')->first()?->getContentObject();

        $ps = PageSection::where('page', 'tips')->where('section_key', 'page_settings')->first()?->getContentObject();
        $pageSettings = [
            'page_title'       => $ps->page_title ?? 'Design Tips & Insights',
            'page_subtitle'    => $ps->page_subtitle ?? 'Expert advice to help you create your dream space.',
            'meta_title'       => $ps->meta_title ?? 'Design Tips - Mechanix Interior',
            'meta_description' => $ps->meta_description ?? 'Get expert interior design tips and insights.',
        ];

        return Inertia::render('tips', array_merge($this->sharedData(), [
            'tips'         => $tips,
            'categories'   => $categories,
            'page_hero'    => $pageHero,
            'page_settings'=> $pageSettings,
        ]));
    }

    public function show(Tip $tip)
    {
        $related = Tip::active()
            ->where('id', '!=', $tip->id)
            ->when($tip->category, fn($q) => $q->where('category', $tip->category))
            ->latest('published_at')->take(4)->get();

        $recent = Tip::active()
            ->where('id', '!=', $tip->id)
            ->latest('published_at')->take(5)->get();

        return Inertia::render('tip-detail', array_merge($this->sharedData(), [
            'tip'     => $tip,
            'related' => $related,
            'recent'  => $recent,
        ]));
    }
}
