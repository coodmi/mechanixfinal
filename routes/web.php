<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
        'hero' => \App\Models\PageSection::where('section_key', 'hero')->with('contents')->first()?->getContentObject(),
        'about' => \App\Models\PageSection::where('section_key', 'about')->with('contents')->first()?->getContentObject(),
        'services' => \App\Models\Service::active()->ordered()->get(),
        'servicesSection' => \App\Models\PageSection::where('section_key', 'services')->with('contents')->first()?->getContentObject(),
        'projects' => \App\Models\Project::active()->ordered()->get(),
        'projectsSection' => \App\Models\PageSection::where('section_key', 'projects')->with('contents')->first()?->getContentObject(),
        'founder' => \App\Models\PageSection::where('section_key', 'founder')->with('contents')->first()?->getContentObject(),
        'videoBreak' => \App\Models\PageSection::where('section_key', 'video_break')->with('contents')->first()?->getContentObject(),
        'contact' => \App\Models\PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
        'footerSocialLinks' => \App\Models\SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
        'welcomeModal' => [
            'title' => \App\Models\SiteSetting::get('welcome_modal_title', 'Project Kick-off Offer'),
            'description' => \App\Models\SiteSetting::get('welcome_modal_description', 'Start your journey with Mechanix. Book a free, 30-minute virtual consultation with our lead designer to discuss the blueprint of your ideal space.'),
            'button_text' => \App\Models\SiteSetting::get('welcome_modal_button_text', 'Book Now'),
            'button_link' => \App\Models\SiteSetting::get('welcome_modal_button_link', 'https://google.com'),
            'image' => \App\Models\SiteSetting::get('welcome_modal_image', '/images/welcome-modal.jpg'),
            'note' => \App\Models\SiteSetting::get('welcome_modal_note', 'Limited slots available this week.'),
            'is_active' => \App\Models\SiteSetting::get('welcome_modal_is_active', 'true') === 'true',
        ],
        'recentBlogs' => \App\Models\Blog::active()
            ->where(fn($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->latest('published_at')->take(3)->get(),
        'recentTips' => \App\Models\Tip::active()
            ->where(fn($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->latest('published_at')->take(3)->get(),
        'blogSectionSettings' => [
            'title'    => \App\Models\SiteSetting::get('blog_section_title',    'Blogs & Articles'),
            'subtitle' => \App\Models\SiteSetting::get('blog_section_subtitle', 'Stay updated with the latest interior design news, tips and insights.'),
            'enabled'  => \App\Models\SiteSetting::get('blog_section_enabled',  '1') === '1',
        ],
        'tipsSectionSettings' => [
            'title'    => \App\Models\SiteSetting::get('tips_section_title',    'Tips & Insights'),
            'subtitle' => \App\Models\SiteSetting::get('tips_section_subtitle', 'Expert advice to help you create your dream space.'),
            'enabled'  => \App\Models\SiteSetting::get('tips_section_enabled',  '1') === '1',
        ],
        'blogSectionSettings' => [
            'title'    => \App\Models\SiteSetting::get('blog_section_title',    'Blogs & Articles'),
            'subtitle' => \App\Models\SiteSetting::get('blog_section_subtitle', 'Stay updated with the latest interior design news, tips and insights.'),
            'enabled'  => \App\Models\SiteSetting::get('blog_section_enabled',  '1') === '1',
        ],
        'tipsSectionSettings' => [
            'title'    => \App\Models\SiteSetting::get('tips_section_title',    'Tips & Insights'),
            'subtitle' => \App\Models\SiteSetting::get('tips_section_subtitle', 'Expert advice to help you create your dream space.'),
            'enabled'  => \App\Models\SiteSetting::get('tips_section_enabled',  '1') === '1',
        ],
    ]);
})->name('home');

// All Projects Page
Route::get('/projects', function () {
    $categories = \App\Models\Project::active()->distinct()->orderBy('category')->pluck('category');

    return Inertia::render('projects', [
        'projects' => \App\Models\Project::active()->ordered()->get(),
        'categories' => $categories,
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', ''),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
        'contact' => \App\Models\PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
        'footerSocialLinks' => \App\Models\SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
    ]);
})->name('projects.index');

// Project Detail Page
Route::get('/projects/{project:slug}', function (\App\Models\Project $project) {
    // Get related projects (same category, excluding current)
    $relatedProjects = \App\Models\Project::active()
        ->where('id', '!=', $project->id)
        ->where('category', $project->category)
        ->ordered()
        ->take(3)
        ->get();

    return Inertia::render('project-detail', [
        'project' => $project,
        'relatedProjects' => $relatedProjects,
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
        'contact' => \App\Models\PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
        'footerSocialLinks' => \App\Models\SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
    ]);
})->name('projects.show');

Route::get('/careers', function () {
    $heroSection = \App\Models\PageSection::where('page', 'careers')->where('section_key', 'hero')->first();
    $hero = $heroSection ? $heroSection->getContentObject() : null;
    
    $pageHeroSection = \App\Models\PageSection::where('page', 'careers')->where('section_key', 'page_hero')->first();
    $pageHero = $pageHeroSection ? $pageHeroSection->getContentObject() : null;

    $jobSearchSection = \App\Models\PageSection::where('page', 'careers')->where('section_key', 'job_search')->first();
    $jobSearch = $jobSearchSection ? $jobSearchSection->getContentObject() : null;

    return Inertia::render('careers', [
        'hero' => $hero,
        'page_hero' => $pageHero,
        'job_search' => $jobSearch,
        'jobOpenings' => \App\Models\JobOpening::active()->orderBy('created_at', 'desc')->get(),
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
        'contact' => \App\Models\PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
        'footerSocialLinks' => \App\Models\SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
    ]);
})->name('careers');

Route::get('/about-us', function () {
    $sections = [
        'page_hero', 'main', 'stats', 'ceo_vision', 'values', 'process', 'certificates', 'affiliations', 'cta'
    ];
    
    $data = [];
    
    foreach ($sections as $key) {
        $section = \App\Models\PageSection::where('page', 'about-us')->where('section_key', $key)->with('items')->first();
        if ($section) {
            $content = $section->getContentObject();
            if (in_array($key, ['stats', 'values', 'process', 'certificates', 'affiliations'])) {
                $content->items = $section->items;
            }
            $data[$key] = $content;
        } else {
            $data[$key] = null;
        }
    }
    
    return Inertia::render('about-us', array_merge($data, [
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
        'services' => \App\Models\Service::active()->orderBy('order')->get(),
        'projects' => \App\Models\Project::active()->orderBy('order')->get(),
        'contact' => \App\Models\PageSection::where('section_key', 'contact')->with('contents')->first()?->getContentObject(),
        'footerSocialLinks' => \App\Models\SocialMediaLink::where('location', 'footer')->orderBy('order')->get(),
    ]));
})->name('about-us');

Route::get('/our-team', function () {
    $sections = [
        'page_hero', 'whole_team_photo', 'hero', 'ceo_quote', 'team_quote', 'beyond_desk', 'team_motion'
    ];
    
    $data = [];
    
    foreach ($sections as $key) {
        $section = \App\Models\PageSection::where('page', 'our-team')->where('section_key', $key)->with('items')->first();
        if ($section) {
            $content = $section->getContentObject();
            if (in_array($key, ['beyond_desk', 'team_motion'])) {
                $content->items = $section->items;
            }
            $data[$key] = $content;
        } else {
            $data[$key] = null;
        }
    }
    
    return Inertia::render('our-team', array_merge($data, [
        'teamMembers' => \App\Models\TeamMember::active()->orderBy('order')->get(),
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
    ]));
})->name('our-team');

Route::get('/life-at-mechanix', function () {
    $sections = [
        'page_hero', 'tech_zone', 'design_zone', 'meeting_zone', 'quote', 'coffee_zone', 'team_dinner', 'glimpse', 'team_gallery'
    ];
    
    $data = [];
    
    foreach ($sections as $key) {
        $section = \App\Models\PageSection::where('page', 'life-at-mechanix')->where('section_key', $key)->with('items')->first();
        if ($section) {
            $content = $section->getContentObject();
            if (in_array($key, ['glimpse', 'team_gallery'])) {
                $content->items = $section->items;
            }
            $data[$key] = $content;
        } else {
            $data[$key] = null;
        }
    }
    
    return Inertia::render('life-at-mechanix', array_merge($data, [
        'navigation' => \App\Models\NavigationItem::active()->topLevel()->with(['children' => function ($query) {
            $query->active()->orderBy('order');
        }])->orderBy('order')->get(),
        'siteSettings' => [
            'logoUrl' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
            'logoVersion' => \App\Models\SiteSetting::get('logo_version', time()),
            'companyName' => \App\Models\SiteSetting::get('company_name', 'MECHANIX.'),
            'facebookUrl' => \App\Models\SiteSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
            'instagramUrl' => \App\Models\SiteSetting::get('instagram_url', 'https://www.instagram.com/mechanixinterior'),
            'linkedinUrl' => \App\Models\SiteSetting::get('linkedin_url', 'https://www.linkedin.com/company/mechanixinterior'),
            'copyrightText' => \App\Models\SiteSetting::get('copyright_text', '© 2025 Mechanix Interior. All rights reserved.'),
        ],
        'headerSettings' => [
            'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', ''),
            'instagramUrl' => \App\Models\SiteHeaderSetting::get('instagram_url', ''),
            'linkedinUrl' => \App\Models\SiteHeaderSetting::get('linkedin_url', ''),
            'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
            'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            'socialLinks' => \App\Models\SocialMediaLink::where('location', 'header')->orderBy('order')->get(),
        ],
    ]));
})->name('life-at-mechanix');


Route::get('/clients', [\App\Http\Controllers\ClientsPageController::class, 'index'])->name('clients');
Route::get('/tips', [\App\Http\Controllers\TipsPageController::class, 'index'])->name('tips');
Route::get('/tips/{tip:slug}', [\App\Http\Controllers\TipsPageController::class, 'show'])->name('tips.show');
Route::get('/blogs', [\App\Http\Controllers\BlogPageController::class, 'index'])->name('blogs');
Route::get('/blogs/{blog:slug}', [\App\Http\Controllers\BlogPageController::class, 'show'])->name('blogs.show');

// Job Application Submission (Public)
Route::post('/apply', [\App\Http\Controllers\JobApplicationController::class, 'store'])->name('apply');

// Contact Form Submission (Public)
Route::post('/contact', [\App\Http\Controllers\ContactSubmissionController::class, 'store'])->name('contact.submit');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $now = now();
        $ninetyDaysAgo = $now->copy()->subDays(90);
        
        // Get activities for the last 90 days
        $activities = \App\Models\AdminActivity::with('user')
            ->where('created_at', '>=', $ninetyDaysAgo)
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Activity by day for the last 90 days
        $activityByDay = [];
        for ($i = 89; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i)->format('Y-m-d');
            $activityByDay[] = [
                'date' => $date,
                'count' => $activities->filter(function ($activity) use ($date) {
                    return $activity->created_at->format('Y-m-d') === $date;
                })->count(),
            ];
        }
        
        // Activity by model
        $activityByModel = $activities->groupBy('model')->map(function ($group, $model) {
            return [
                'model' => $model,
                'count' => $group->count(),
            ];
        })->values()->toArray();
        
        // Activity by action
        $activityByAction = $activities->groupBy('action')->map(function ($group, $action) {
            return [
                'action' => $action,
                'count' => $group->count(),
            ];
        })->values()->toArray();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'totalServices' => \App\Models\Service::count(),
                'totalProjects' => \App\Models\Project::count(),
                'totalNavigationItems' => \App\Models\NavigationItem::count(),
                'recentActivities' => $activities->take(10)->map(function ($activity) {
                    return [
                        'id' => $activity->id,
                        'action' => $activity->action,
                        'model' => $activity->model,
                        'description' => $activity->description,
                        'created_at' => $activity->created_at->toISOString(),
                        'user' => [
                            'name' => $activity->user->name,
                        ],
                    ];
                }),
                'activityByDay' => $activityByDay,
                'activityByModel' => $activityByModel,
                'activityByAction' => $activityByAction,
            ],
        ]);
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('settings', function () {
            return Inertia::render('admin/site-settings', [
                'settings' => [
                    'logo_url' => \App\Models\SiteSetting::get('logo_url', '/logo.png'),
                    'favicon_url' => \App\Models\SiteSetting::get('favicon_url', '/favicon.ico'),
                ]
            ]);
        })->name('settings');
        
        Route::post('settings', function (\Illuminate\Http\Request $request) {
            try {
                $validated = $request->validate([
                    'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                    'favicon' => 'nullable|mimes:ico,png,jpg,jpeg|max:2048',
                ]);

                $hasChanges = false;

                // Handle logo upload
                if ($request->hasFile('logo')) {
                    $file = $request->file('logo');
                    $path = $file->store('logos', 'public');
                    $url = \Illuminate\Support\Facades\Storage::url($path);
                    \App\Models\SiteSetting::set('logo_url', $url);
                    \App\Models\SiteSetting::set('logo_version', time());
                    $hasChanges = true;
                    
                    \Log::info('Logo uploaded successfully', ['path' => $path, 'url' => $url]);
                }

                // Handle favicon upload
                if ($request->hasFile('favicon')) {
                    $file = $request->file('favicon');
                    $path = $file->store('favicons', 'public');
                    $url = \Illuminate\Support\Facades\Storage::url($path);
                    \App\Models\SiteSetting::set('favicon_url', $url);
                    $hasChanges = true;
                    
                    \Log::info('Favicon uploaded successfully', ['path' => $path, 'url' => $url]);
                }

                if ($hasChanges) {
                    \App\Models\AdminActivity::log('updated', 'SiteSetting', null, null, 'Updated site settings');
                    return redirect()->back()->with('success', 'updated');
                }

                return redirect()->back()->with('success', 'no-changes');
            } catch (\Exception $e) {
                \Log::error('Settings update failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
                return redirect()->back()->withErrors(['error' => 'Failed to update settings: ' . $e->getMessage()]);
            }
        })->name('settings.update');

        // Home Section Settings
        Route::get('home-sections/blogs', [\App\Http\Controllers\Admin\HomeSectionController::class, 'blogsIndex'])->name('home-sections.blogs');
        Route::post('home-sections/blogs', [\App\Http\Controllers\Admin\HomeSectionController::class, 'blogsUpdate'])->name('home-sections.blogs.update');
        Route::get('home-sections/tips', [\App\Http\Controllers\Admin\HomeSectionController::class, 'tipsIndex'])->name('home-sections.tips');
        Route::post('home-sections/tips', [\App\Http\Controllers\Admin\HomeSectionController::class, 'tipsUpdate'])->name('home-sections.tips.update');

        // Social Media
        Route::get('social-media', [\App\Http\Controllers\Admin\SocialMediaController::class, 'index'])->name('social-media');        Route::post('social-media', [\App\Http\Controllers\Admin\SocialMediaController::class, 'store'])->name('social-media.store');
        Route::put('social-media/{socialMediaLink}', [\App\Http\Controllers\Admin\SocialMediaController::class, 'update'])->name('social-media.update');
        Route::delete('social-media/{socialMediaLink}', [\App\Http\Controllers\Admin\SocialMediaController::class, 'destroy'])->name('social-media.destroy');

        // Home Section Settings
        Route::get('home-sections/blogs', [\App\Http\Controllers\Admin\HomeSectionController::class, 'blogsIndex'])->name('home-sections.blogs');
        Route::post('home-sections/blogs', [\App\Http\Controllers\Admin\HomeSectionController::class, 'blogsUpdate'])->name('home-sections.blogs.update');
        Route::get('home-sections/tips', [\App\Http\Controllers\Admin\HomeSectionController::class, 'tipsIndex'])->name('home-sections.tips');
        Route::post('home-sections/tips', [\App\Http\Controllers\Admin\HomeSectionController::class, 'tipsUpdate'])->name('home-sections.tips.update');

        // Footer
        Route::get('footer', [\App\Http\Controllers\Admin\FooterController::class, 'index'])->name('footer');
        Route::post('footer', [\App\Http\Controllers\Admin\FooterController::class, 'updateCopyright'])->name('footer.update');
        Route::post('footer/links', [\App\Http\Controllers\Admin\FooterController::class, 'store'])->name('footer.links.store');
        Route::put('footer/links/{socialMediaLink}', [\App\Http\Controllers\Admin\FooterController::class, 'update'])->name('footer.links.update');
        Route::delete('footer/links/{socialMediaLink}', [\App\Http\Controllers\Admin\FooterController::class, 'destroy'])->name('footer.links.destroy');

        // Navigation Management
        Route::get('navigation', [\App\Http\Controllers\Admin\NavigationController::class, 'index'])->name('navigation');
        Route::post('navigation', [\App\Http\Controllers\Admin\NavigationController::class, 'store'])->name('navigation.store');
        Route::put('navigation/{navigationItem}', [\App\Http\Controllers\Admin\NavigationController::class, 'update'])->name('navigation.update');
        Route::delete('navigation/{navigationItem}', [\App\Http\Controllers\Admin\NavigationController::class, 'destroy'])->name('navigation.destroy');
        Route::post('navigation/reorder', [\App\Http\Controllers\Admin\NavigationController::class, 'reorder'])->name('navigation.reorder');
        Route::post('navigation/header-settings', [\App\Http\Controllers\Admin\NavigationController::class, 'updateHeaderSettings'])->name('navigation.header-settings.update');

        // Hero Section
        Route::get('hero', [\App\Http\Controllers\Admin\HeroController::class, 'index'])->name('hero');
        Route::post('hero', [\App\Http\Controllers\Admin\HeroController::class, 'update'])->name('hero.update');

        // About Section
        Route::get('about', [\App\Http\Controllers\Admin\AboutController::class, 'index'])->name('about');
        Route::post('about', [\App\Http\Controllers\Admin\AboutController::class, 'update'])->name('about.update');

        // Services Management
        Route::get('services', [\App\Http\Controllers\Admin\ServiceController::class, 'index'])->name('services');
        Route::post('services/section', [\App\Http\Controllers\Admin\ServiceController::class, 'updateSection'])->name('services.section.update');
        Route::post('services', [\App\Http\Controllers\Admin\ServiceController::class, 'store'])->name('services.store');
        Route::put('services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'destroy'])->name('services.destroy');
        Route::post('services/reorder', [\App\Http\Controllers\Admin\ServiceController::class, 'reorder'])->name('services.reorder');

        // Projects Management
        Route::get('projects', [\App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects');
        Route::post('projects/section', [\App\Http\Controllers\Admin\ProjectController::class, 'updateSection'])->name('projects.section.update');
        Route::post('projects/categories', [\App\Http\Controllers\Admin\ProjectController::class, 'updateCategories'])->name('projects.categories.update');
        Route::post('projects', [\App\Http\Controllers\Admin\ProjectController::class, 'store'])->name('projects.store');
        Route::put('projects/{id}', [\App\Http\Controllers\Admin\ProjectController::class, 'update'])->name('projects.update')->where('id', '[0-9]+');
        Route::delete('projects/{id}', [\App\Http\Controllers\Admin\ProjectController::class, 'destroy'])->name('projects.destroy')->where('id', '[0-9]+');
        Route::post('projects/reorder', [\App\Http\Controllers\Admin\ProjectController::class, 'reorder'])->name('projects.reorder');
        Route::post('projects/bulk-delete', [\App\Http\Controllers\Admin\ProjectController::class, 'bulkDelete'])->name('projects.bulk-delete');

        // Founder Section
        Route::get('founder', [\App\Http\Controllers\Admin\FounderController::class, 'index'])->name('founder');
        Route::post('founder', [\App\Http\Controllers\Admin\FounderController::class, 'update'])->name('founder.update');

        // Contact Section
        Route::get('contact', [\App\Http\Controllers\Admin\ContactController::class, 'index'])->name('contact');
        Route::post('contact', [\App\Http\Controllers\Admin\ContactController::class, 'update'])->name('contact.update');

        // Careers Management
        Route::get('careers', [\App\Http\Controllers\Admin\CareersController::class, 'index'])->name('careers');
        Route::post('careers/hero', [\App\Http\Controllers\Admin\CareersController::class, 'updateHero'])->name('careers.hero.update');
        Route::post('careers/job-search', [\App\Http\Controllers\Admin\CareersController::class, 'updateJobSearch'])->name('careers.job-search.update');
        
        Route::get('job-openings', [\App\Http\Controllers\Admin\JobOpeningController::class, 'index'])->name('job-openings');
        Route::post('job-openings', [\App\Http\Controllers\Admin\JobOpeningController::class, 'store'])->name('job-openings.store');
        Route::put('job-openings/{jobOpening}', [\App\Http\Controllers\Admin\JobOpeningController::class, 'update'])->name('job-openings.update');
        Route::delete('job-openings/{jobOpening}', [\App\Http\Controllers\Admin\JobOpeningController::class, 'destroy'])->name('job-openings.destroy');
        Route::post('job-openings/reorder', [\App\Http\Controllers\Admin\JobOpeningController::class, 'reorder'])->name('job-openings.reorder');

        // About Us Management
        Route::get('about-us', [\App\Http\Controllers\Admin\AboutUsController::class, 'index'])->name('about-us');
        Route::post('about-us/main', [\App\Http\Controllers\Admin\AboutUsController::class, 'updateMain'])->name('about-us.main.update');
        Route::post('about-us/ceo-vision', [\App\Http\Controllers\Admin\AboutUsController::class, 'updateCeoVision'])->name('about-us.ceo-vision.update');
        Route::post('about-us/cta', [\App\Http\Controllers\Admin\AboutUsController::class, 'updateCta'])->name('about-us.cta.update');
        Route::post('about-us/section', [\App\Http\Controllers\Admin\AboutUsController::class, 'updateSection'])->name('about-us.section.update');
        
        Route::post('about-us/items', [\App\Http\Controllers\Admin\AboutUsController::class, 'storeItem'])->name('about-us.items.store');
        Route::post('about-us/items/{item}', [\App\Http\Controllers\Admin\AboutUsController::class, 'updateItem'])->name('about-us.items.update');
        Route::delete('about-us/items/{item}', [\App\Http\Controllers\Admin\AboutUsController::class, 'destroyItem'])->name('about-us.items.destroy');

        // About Us Quote Section
        Route::get('about-us-quote', [\App\Http\Controllers\Admin\AboutUsQuoteController::class, 'index'])->name('about-us-quote');
        Route::post('about-us-quote', [\App\Http\Controllers\Admin\AboutUsQuoteController::class, 'update'])->name('about-us-quote.update');

        // About Us Hero Quote (page_hero section)
        Route::get('about-us-hero-quote', [\App\Http\Controllers\Admin\AboutUsHeroQuoteController::class, 'index'])->name('about-us-hero-quote');
        Route::post('about-us-hero-quote', [\App\Http\Controllers\Admin\AboutUsHeroQuoteController::class, 'update'])->name('about-us-hero-quote.update');

        Route::get('timeline-events', [\App\Http\Controllers\Admin\TimelineEventController::class, 'index'])->name('timeline-events');
        Route::post('timeline-events', [\App\Http\Controllers\Admin\TimelineEventController::class, 'store'])->name('timeline-events.store');
        Route::put('timeline-events/{timelineEvent}', [\App\Http\Controllers\Admin\TimelineEventController::class, 'update'])->name('timeline-events.update');
        Route::delete('timeline-events/{timelineEvent}', [\App\Http\Controllers\Admin\TimelineEventController::class, 'destroy'])->name('timeline-events.destroy');
        Route::post('timeline-events/reorder', [\App\Http\Controllers\Admin\TimelineEventController::class, 'reorder'])->name('timeline-events.reorder');

        // Our Team Management
        Route::get('our-team', [\App\Http\Controllers\Admin\OurTeamController::class, 'index'])->name('our-team');
        Route::post('our-team/whole-team-photo', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateWholeTeamPhoto'])->name('our-team.whole-team-photo.update');
        Route::post('our-team/hero', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateHero'])->name('our-team.hero.update');
        Route::post('our-team/ceo-quote', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateCeoQuote'])->name('our-team.ceo-quote.update');
        Route::post('our-team/team-quote', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateTeamQuote'])->name('our-team.team-quote.update');
        Route::post('our-team/beyond-desk', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateBeyondDesk'])->name('our-team.beyond-desk.update');
        Route::post('our-team/team-motion', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateTeamMotion'])->name('our-team.team-motion.update');
        
        Route::post('our-team/items', [\App\Http\Controllers\Admin\OurTeamController::class, 'storeItem'])->name('our-team.items.store');
        Route::post('our-team/items/{item}', [\App\Http\Controllers\Admin\OurTeamController::class, 'updateItem'])->name('our-team.items.update');
        Route::delete('our-team/items/{item}', [\App\Http\Controllers\Admin\OurTeamController::class, 'destroyItem'])->name('our-team.items.destroy');

        // Video Break Management
        Route::get('video-break', [\App\Http\Controllers\Admin\VideoBreakController::class, 'index'])->name('video-break');
        Route::post('video-break', [\App\Http\Controllers\Admin\VideoBreakController::class, 'update'])->name('video-break.update');

        Route::get('team-members', [\App\Http\Controllers\Admin\TeamMemberController::class, 'index'])->name('team-members');
        Route::post('team-members', [\App\Http\Controllers\Admin\TeamMemberController::class, 'store'])->name('team-members.store');
        Route::post('team-members/{teamMember}', [\App\Http\Controllers\Admin\TeamMemberController::class, 'update'])->name('team-members.update');
        Route::delete('team-members/{teamMember}', [\App\Http\Controllers\Admin\TeamMemberController::class, 'destroy'])->name('team-members.destroy');
        Route::post('team-members/reorder', [\App\Http\Controllers\Admin\TeamMemberController::class, 'reorder'])->name('team-members.reorder');

        // Life at Mechanix Management
        Route::get('life-at-mechanix', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'index'])->name('life-at-mechanix');
        Route::post('life-at-mechanix/tech-zone', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateTechZone'])->name('life-at-mechanix.tech-zone.update');
        Route::post('life-at-mechanix/design-zone', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateDesignZone'])->name('life-at-mechanix.design-zone.update');
        Route::post('life-at-mechanix/meeting-zone', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateMeetingZone'])->name('life-at-mechanix.meeting-zone.update');
        Route::post('life-at-mechanix/quote', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateQuote'])->name('life-at-mechanix.quote.update');
        Route::post('life-at-mechanix/coffee-zone', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateCoffeeZone'])->name('life-at-mechanix.coffee-zone.update');
        Route::post('life-at-mechanix/team-dinner', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateTeamDinner'])->name('life-at-mechanix.team-dinner.update');
        Route::post('life-at-mechanix/glimpse', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateGlimpse'])->name('life-at-mechanix.glimpse.update');
        
        Route::post('life-at-mechanix/items', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'storeItem'])->name('life-at-mechanix.items.store');
        Route::post('life-at-mechanix/items/{item}', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'updateItem'])->name('life-at-mechanix.items.update');
        Route::delete('life-at-mechanix/items/{item}', [\App\Http\Controllers\Admin\LifeAtMechanixController::class, 'destroyItem'])->name('life-at-mechanix.items.destroy');

        Route::resource('clients', App\Http\Controllers\Admin\ClientController::class);
        Route::resource('tips', App\Http\Controllers\Admin\TipController::class)->except(['show', 'edit', 'create'])->parameters(['tips' => 'tip:id']);
        Route::post('tips/categories', [App\Http\Controllers\Admin\TipController::class, 'updateCategories'])->name('tips.categories.update');
        Route::post('tips/bulk-delete', [App\Http\Controllers\Admin\TipController::class, 'bulkDelete'])->name('tips.bulk-delete');

        // Blogs Management
        Route::get('blogs', [\App\Http\Controllers\Admin\BlogController::class, 'index'])->name('blogs');
        Route::post('blogs', [\App\Http\Controllers\Admin\BlogController::class, 'store'])->name('blogs.store');
        Route::post('blogs/page-settings', [\App\Http\Controllers\Admin\BlogController::class, 'savePageSettings'])->name('blogs.page-settings');
        Route::post('blogs/categories', [\App\Http\Controllers\Admin\BlogController::class, 'updateCategories'])->name('blogs.categories.update');
        Route::post('blogs/bulk-delete', [\App\Http\Controllers\Admin\BlogController::class, 'bulkDelete'])->name('blogs.bulk-delete');
        Route::put('blogs/{blog:id}', [\App\Http\Controllers\Admin\BlogController::class, 'update'])->name('blogs.update');
        Route::delete('blogs/{blog:id}', [\App\Http\Controllers\Admin\BlogController::class, 'destroy'])->name('blogs.destroy');

        // Clients Page Settings
        Route::get('clients-page-settings', [\App\Http\Controllers\Admin\ClientsPageSettingsController::class, 'index'])->name('clients-page-settings');
        Route::post('clients-page-settings', [\App\Http\Controllers\Admin\ClientsPageSettingsController::class, 'update'])->name('clients-page-settings.update');

        // Tips Page Settings
        Route::get('tips-page-settings', [\App\Http\Controllers\Admin\TipsPageSettingsController::class, 'index'])->name('tips-page-settings');
        Route::post('tips-page-settings', [\App\Http\Controllers\Admin\TipsPageSettingsController::class, 'update'])->name('tips-page-settings.update');

        // Individual Quote Section Pages
        Route::get('clients-quote', [\App\Http\Controllers\Admin\ClientsQuoteController::class, 'index'])->name('clients-quote');
        Route::post('clients-quote', [\App\Http\Controllers\Admin\ClientsQuoteController::class, 'update'])->name('clients-quote.update');

        Route::get('life-at-mechanix-quote', [\App\Http\Controllers\Admin\LifeAtMechanixQuoteController::class, 'index'])->name('life-at-mechanix-quote');
        Route::post('life-at-mechanix-quote', [\App\Http\Controllers\Admin\LifeAtMechanixQuoteController::class, 'update'])->name('life-at-mechanix-quote.update');

        Route::get('our-team-quote', [\App\Http\Controllers\Admin\OurTeamQuoteController::class, 'index'])->name('our-team-quote');
        Route::post('our-team-quote', [\App\Http\Controllers\Admin\OurTeamQuoteController::class, 'update'])->name('our-team-quote.update');

        Route::get('tips-quote', [\App\Http\Controllers\Admin\TipsQuoteController::class, 'index'])->name('tips-quote');
        Route::post('tips-quote', [\App\Http\Controllers\Admin\TipsQuoteController::class, 'update'])->name('tips-quote.update');

        Route::get('careers-quote', [\App\Http\Controllers\Admin\CareersQuoteController::class, 'index'])->name('careers-quote');
        Route::post('careers-quote', [\App\Http\Controllers\Admin\CareersQuoteController::class, 'update'])->name('careers-quote.update');

        // Page Hero Quotes Management
        Route::get('page-heroes', [\App\Http\Controllers\Admin\PageHeroController::class, 'index'])->name('page-heroes');
        Route::post('page-heroes/{page}', [\App\Http\Controllers\Admin\PageHeroController::class, 'update'])->name('page-heroes.update');

        // Job Applications Management
        Route::get('job-applications', [\App\Http\Controllers\Admin\JobApplicationController::class, 'index'])->name('job-applications');
        Route::put('job-applications/{application}/status', [\App\Http\Controllers\Admin\JobApplicationController::class, 'updateStatus'])->name('job-applications.status.update');
        Route::get('job-applications/{application}/resume', [\App\Http\Controllers\Admin\JobApplicationController::class, 'downloadResume'])->name('job-applications.resume');
        Route::delete('job-applications/{application}', [\App\Http\Controllers\Admin\JobApplicationController::class, 'destroy'])->name('job-applications.destroy');

        // Welcome Modal Management
        Route::get('welcome-modal', [\App\Http\Controllers\Admin\WelcomeModalController::class, 'index'])->name('welcome-modal');
        Route::post('welcome-modal', [\App\Http\Controllers\Admin\WelcomeModalController::class, 'update'])->name('welcome-modal.update');

        // Contact Submissions Management
        Route::get('contact-submissions', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'index'])->name('contact-submissions');
        Route::put('contact-submissions/{submission}/status', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'updateStatus'])->name('contact-submissions.status.update');
        Route::put('contact-submissions/{submission}/notes', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'updateNotes'])->name('contact-submissions.notes.update');
        Route::delete('contact-submissions/{submission}', [\App\Http\Controllers\Admin\ContactSubmissionController::class, 'destroy'])->name('contact-submissions.destroy');
    });
});


require __DIR__.'/settings.php';
