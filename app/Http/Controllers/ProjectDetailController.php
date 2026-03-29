<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectDetailController extends Controller
{
    public function show(string $slug)
    {
        // Find project by creating a slug from the title
        $project = Project::active()
            ->get()
            ->first(function ($p) use ($slug) {
                return $this->createSlug($p->title) === $slug;
            });

        if (!$project) {
            abort(404);
        }

        // Get recommended projects from the same category
        $recommendedProjects = Project::active()
            ->where('id', '!=', $project->id)
            ->where('category', $project->category)
            ->ordered()
            ->limit(3)
            ->get();

        // If not enough projects in the same category, fill with other projects
        if ($recommendedProjects->count() < 3) {
            $additionalProjects = Project::active()
                ->where('id', '!=', $project->id)
                ->whereNotIn('id', $recommendedProjects->pluck('id'))
                ->ordered()
                ->limit(3 - $recommendedProjects->count())
                ->get();

            $recommendedProjects = $recommendedProjects->merge($additionalProjects);
        }

        return Inertia::render('project-detail', [
            'project' => $project,
            'recommendedProjects' => $recommendedProjects,
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
                'facebookUrl' => \App\Models\SiteHeaderSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
                'facebookIconVisible' => \App\Models\SiteHeaderSetting::get('facebook_icon_visible', true),
                'ctaButtonText' => \App\Models\SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
                'ctaButtonLink' => \App\Models\SiteHeaderSetting::get('cta_button_link', '#contact'),
            ],
        ]);
    }

    private function createSlug(string $title): string
    {
        return strtolower(preg_replace('/[^a-z0-9]+/i', '-', trim($title, '-')));
    }
}
