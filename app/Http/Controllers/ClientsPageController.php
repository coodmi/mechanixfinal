<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\NavigationItem;
use App\Models\PageSection;
use App\Models\SiteSetting;
use App\Models\SiteHeaderSetting;
use Inertia\Inertia;

class ClientsPageController extends Controller
{
    public function index()
    {
        $navigation = NavigationItem::whereNull('parent_id')
            ->with(['children' => function ($query) {
                $query->where('is_active', true)->orderBy('order');
            }])
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        $siteSettings = SiteSetting::pluck('value', 'key')->all();

        $clients = Client::where('is_active', true)
            ->orderBy('order')
            ->get();

        // Get page hero section
        $pageHeroSection = PageSection::where('page', 'clients')->where('section_key', 'page_hero')->first();
        $pageHero = $pageHeroSection ? $pageHeroSection->getContentObject() : null;

        // Get page settings
        $pageSettingsSection = PageSection::where('page', 'clients')->where('section_key', 'page_settings')->first();
        $pageSettingsContent = $pageSettingsSection ? $pageSettingsSection->getContentObject() : null;
        
        $pageSettings = [
            'page_title' => $pageSettingsContent->page_title ?? 'Our Clients',
            'page_subtitle' => $pageSettingsContent->page_subtitle ?? 'We are proud to have worked with these amazing organizations.',
            'meta_title' => $pageSettingsContent->meta_title ?? 'Clients - Mechanix Interior',
            'meta_description' => $pageSettingsContent->meta_description ?? 'View our trusted clients and partners.',
        ];

        return Inertia::render('clients', [
            'navigation' => $navigation,
            'siteSettings' => $siteSettings,
            'headerSettings' => [
                'facebookUrl' => SiteHeaderSetting::get('facebook_url', 'https://www.facebook.com/mechanixinterior'),
                'facebookIconVisible' => SiteHeaderSetting::get('facebook_icon_visible', true),
                'ctaButtonText' => SiteHeaderSetting::get('cta_button_text', 'Get in Touch'),
                'ctaButtonLink' => SiteHeaderSetting::get('cta_button_link', '#contact'),
            ],
            'clients' => $clients,
            'page_hero' => $pageHero,
            'page_settings' => $pageSettings,
            'contact' => $this->getContactSection(),
        ]);
    }

    private function getContactSection()
    {
        // Reuse contact section logic or fetch from DB if needed
        return [
            'title' => 'Get in Touch',
            'subtitle' => 'Ready to start your project?',
        ];
    }
}
