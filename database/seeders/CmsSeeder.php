<?php

namespace Database\Seeders;

use App\Models\NavigationItem;
use App\Models\PageContent;
use App\Models\PageItem;
use App\Models\PageSection;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\Client;
use App\Models\Tip;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedSiteSettings();
        $this->call(SiteHeaderSeeder::class);
        $this->seedNavigation();
        $this->seedHeroSection();
        $this->seedAboutSection();
        $this->seedServices();
        // Projects are seeded by ProjectSeeder
        $this->seedFounderSection();
        $this->seedVideoBreakSection();
        $this->seedContactSection();
        
        // New Sections
        $this->call(JobOpeningSeeder::class);
        $this->call(TeamMemberSeeder::class);
        $this->call(TimelineEventSeeder::class);
        
        $this->seedCareersHero();
        $this->seedAboutUsHero();
        $this->seedClientsHero();
        $this->seedLifeAtMechanixHero();
        $this->seedOurTeamHero();
        $this->seedTipsHero();
        $this->seedAboutUsSections();
        $this->seedTeamHero();
        $this->seedLifeAtMechanixSections();
        $this->seedClients();
        $this->seedTips();
    }

    private function seedSiteSettings(): void
    {
        SiteSetting::create([
            'key' => 'company_name',
            'value' => 'MECHANIX.',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'facebook_url',
            'value' => 'https://www.facebook.com/mechanixinterior',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'instagram_url',
            'value' => 'https://www.instagram.com/mechanixinterior',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'linkedin_url',
            'value' => 'https://www.linkedin.com/company/mechanixinterior',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'copyright_text',
            'value' => '© 2025 Mechanix Interior. Developed and maintained by Alphainno.',
            'type' => 'text',
        ]);

        // Welcome Modal Settings
        SiteSetting::create([
            'key' => 'welcome_modal_title',
            'value' => 'Project Kick-off Offer',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_description',
            'value' => 'Start your journey with Mechanix. Book a free, 30-minute virtual consultation with our lead designer to discuss the blueprint of your ideal space.',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_button_text',
            'value' => 'Book Now',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_button_link',
            'value' => 'https://google.com',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_image',
            'value' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1500&auto=format&fit=crop',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_note',
            'value' => 'Limited slots available this week.',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'welcome_modal_is_active',
            'value' => 'true',
            'type' => 'text',
        ]);
    }

    private function seedNavigation(): void
    {
        // Top level menu items
        NavigationItem::create(['label' => 'Home', 'href' => '/', 'order' => 1, 'is_active' => true]);
        NavigationItem::create(['label' => 'Studio', 'href' => '/#about', 'order' => 2, 'is_active' => true]);
        NavigationItem::create(['label' => 'Services', 'href' => '/#services', 'order' => 3, 'is_active' => true]);
        NavigationItem::create(['label' => 'Portfolio', 'href' => '/#projects', 'order' => 4, 'is_active' => true]);

        // Company parent menu
        $companyMenu = NavigationItem::create([
            'label' => 'Company',
            'href' => null,
            'order' => 5,
            'is_active' => true,
        ]);

        // Company submenu items
        NavigationItem::create([
            'label' => 'Our Team',
            'href' => '/our-team',
            'parent_id' => $companyMenu->id,
            'order' => 1,
            'is_active' => true,
        ]);

        NavigationItem::create([
            'label' => 'Life at Mechanix',
            'href' => '/life-at-mechanix',
            'parent_id' => $companyMenu->id,
            'order' => 2,
            'is_active' => true,
        ]);

        NavigationItem::create([
            'label' => 'About Us',
            'href' => '/about-us',
            'parent_id' => $companyMenu->id,
            'order' => 3,
            'is_active' => true,
        ]);

        // Continue with other top-level items
        NavigationItem::create(['label' => 'Careers', 'href' => '/careers', 'order' => 6, 'is_active' => true]);
        NavigationItem::create(['label' => 'Clients', 'href' => '/clients', 'order' => 7, 'is_active' => true]);
        NavigationItem::create(['label' => 'Tips', 'href' => '/tips', 'order' => 8, 'is_active' => true]);
    }

    private function seedHeroSection(): void
    {
        $section = PageSection::create([
            'page' => 'welcome',
            'section_key' => 'hero',
            'is_active' => true,
            'order' => 1,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'subtitle',
            'value' => 'Interior Architecture & Design',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title',
            'value' => 'ENGINEERING',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title_highlight',
            'value' => 'AESTHETICS',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2800&auto=format&fit=crop',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'cta_text',
            'value' => 'View Selected Works',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'cta_link',
            'value' => '#projects',
            'type' => 'text',
        ]);
    }

    private function seedVideoBreakSection(): void
    {
        $section = PageSection::create([
            'page' => 'welcome',
            'section_key' => 'video_break',
            'is_active' => true,
            'order' => 6,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2800&auto=format&fit=crop',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title',
            'value' => 'The Mechanix Process',
            'type' => 'text',
        ]);
    }

    private function seedAboutSection(): void
    {
        $section = PageSection::create([
            'page' => 'welcome',
            'section_key' => 'about',
            'is_active' => true,
            'order' => 2,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'label',
            'value' => 'About Mechanix',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title',
            'value' => 'Precision in every detail, luxury in every corner.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'description',
            'value' => 'At Mechanix Interior, we believe a space is a machine for living. We combine technical precision with modern aesthetics to create functional, breathtaking interiors. From corporate hubs to luxury residences, we engineer the perfect atmosphere for your lifestyle.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_clients',
            'value' => '50+',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_clients_label',
            'value' => 'Clients',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_satisfaction',
            'value' => '100%',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_satisfaction_label',
            'value' => 'Satisfaction',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_experience',
            'value' => '5+',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'stat_experience_label',
            'value' => 'Years Exp.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'main_image',
            'value' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2301&auto=format&fit=crop',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'detail_image',
            'value' => 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8fDA%3D',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'detail_caption',
            'value' => 'Precision planning.',
            'type' => 'text',
        ]);
    }

    private function seedServices(): void
    {
        Service::create([
            'title' => 'Residential',
            'description' => 'Transforming houses into homes. We specialize in modern luxury apartments, duplexes, and private villas.',
            'icon' => 'Home',
            'order' => 1,
            'is_active' => true,
        ]);

        Service::create([
            'title' => 'Commercial',
            'description' => 'Designing productive workspaces. Corporate offices, retail outlets, and showrooms that reflect your brand identity.',
            'icon' => 'Briefcase',
            'order' => 2,
            'is_active' => true,
        ]);

        Service::create([
            'title' => 'Consultancy',
            'description' => 'Space planning, 3D visualization, and turnkey project management from concept to completion.',
            'icon' => 'LayoutTemplate',
            'order' => 3,
            'is_active' => true,
        ]);
    }

    private function seedProjects(): void
    {
        Project::create([
            'title' => 'Gulshan Avenue Residence',
            'category' => 'Residential',
            'location' => 'Dhaka, Bangladesh',
            'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop',
            'description' => null,
            'order' => 1,
            'is_featured' => true,
            'is_active' => true,
        ]);

        Project::create([
            'title' => 'Banani Corporate Hub',
            'category' => 'Commercial',
            'location' => 'Dhaka, Bangladesh',
            'image_url' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2906&auto=format&fit=crop',
            'description' => null,
            'order' => 2,
            'is_featured' => true,
            'is_active' => true,
        ]);

        Project::create([
            'title' => 'Uttara Signature Lounge',
            'category' => 'Hospitality',
            'location' => 'Uttara, Dhaka',
            'image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
            'description' => null,
            'order' => 3,
            'is_featured' => true,
            'is_active' => true,
        ]);

        Project::create([
            'title' => 'Dhanmondi Penthouse',
            'category' => 'Duplex',
            'location' => 'Dhanmondi, Dhaka',
            'image_url' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop',
            'description' => null,
            'order' => 4,
            'is_featured' => true,
            'is_active' => true,
        ]);

        Project::create([
            'title' => 'Lakeside Resort Spa',
            'category' => 'Hotel & Resort',
            'location' => "Cox's Bazar, Bangladesh",
            'image_url' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2940&auto=format&fit=crop',
            'description' => null,
            'order' => 5,
            'is_featured' => true,
            'is_active' => true,
        ]);
    }

    private function seedFounderSection(): void
    {
        $section = PageSection::create([
            'page' => 'welcome',
            'section_key' => 'founder',
            'is_active' => true,
            'order' => 5,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'label',
            'value' => 'Our Founder',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title',
            'value' => 'Our Founder, Our Foundation',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'description',
            'value' => 'Shahrier Baiya is the visionary founder of Mechanix Interior, a passionate entrepreneur who has transformed the interior design landscape with his innovative approach and unwavering commitment to excellence. With years of experience in the field, Shahrier brings a unique blend of creativity, technical expertise, and client-focused solutions to every project.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'founder_name',
            'value' => 'Shahrier',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'company_name',
            'value' => 'Nex Group',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'main_image',
            'value' => '/images/founder.png',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'profile_image',
            'value' => '/images/signature.png',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'cta_text',
            'value' => 'About Us',
            'type' => 'text',
        ]);
    }

    private function seedContactSection(): void
    {
        $section = PageSection::create([
            'page' => 'welcome',
            'section_key' => 'contact',
            'is_active' => true,
            'order' => 6,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'title',
            'value' => "Let's renovate your world.",
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'description',
            'value' => 'Ready to start your dream project? Get in touch with us today for a free consultation. Let\'s turn your vision into reality.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'address',
            'value' => "House #123, Road #45\nGulshan-2, Dhaka 1212\nBangladesh",
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'phone_primary',
            'value' => '+880 1234-567890',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'phone_secondary',
            'value' => '+880 1987-654321',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'email_primary',
            'value' => 'info@mechanixinterior.com',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'email_secondary',
            'value' => 'projects@mechanixinterior.com',
            'type' => 'text',
        ]);
    }

    private function seedCareersHero(): void
    {
        $section = PageSection::create([
            'page' => 'careers',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 1,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'The only way to do great work is to love what you do.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'love what you do',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Steve Jobs',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Job Search Section
        $jobSearchSection = PageSection::create([
            'page' => 'careers',
            'section_key' => 'job_search',
            'is_active' => true,
            'order' => 2,
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'title',
            'value' => 'Find Your Dream Role',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'subtitle',
            'value' => 'Where ambition meets opportunity. Join our growing team.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'search_placeholder',
            'value' => 'Search by job title, keyword, or location...',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'search_button_text',
            'value' => 'Search Jobs',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'no_jobs_title',
            'value' => 'No jobs found',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $jobSearchSection->id,
            'key' => 'no_jobs_description',
            'value' => 'Try adjusting your search or filter to find what you\'re looking for.',
            'type' => 'text',
        ]);
    }

    private function seedAboutUsHero(): void
    {
        $section = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'Design is not just what it looks like and feels like. Design is how it works.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'how it works',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Steve Jobs',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2800&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }

    private function seedClientsHero(): void
    {
        $section = PageSection::create([
            'page' => 'clients',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'A satisfied customer is the best business strategy of all.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'best business strategy',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Michael LeBoeuf',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }

    private function seedLifeAtMechanixHero(): void
    {
        $section = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'Culture is simply a shared way of doing something with passion.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'with passion',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Brian Chesky',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }

    private function seedOurTeamHero(): void
    {
        $section = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'Talent wins games, but teamwork and intelligence wins championships.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'teamwork and intelligence',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Michael Jordan',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }

    private function seedTipsHero(): void
    {
        $section = PageSection::create([
            'page' => 'tips',
            'section_key' => 'page_hero',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote',
            'value' => 'The details are not the details. They make the design.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'quote_highlight',
            'value' => 'make the design',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'author',
            'value' => '- Charles Eames',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $section->id,
            'key' => 'background_image',
            'value' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }

    private function seedAboutUsSections(): void
    {
        // About Us Main
        $mainSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'main',
            'is_active' => true,
            'order' => 1,
        ]);

        PageContent::create([
            'section_id' => $mainSection->id,
            'key' => 'title',
            'value' => 'About Us',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $mainSection->id,
            'key' => 'description',
            'value' => "At Nexkraft, our success is built on the exceptional minds and collaborative spirit of our team. We're a collection of talented individuals who thrive on working together, transforming individual brilliance into groundbreaking achievements.",
            'type' => 'text',
        ]);
        
        PageContent::create([
            'section_id' => $mainSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Stats Section
        $statsSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'stats',
            'is_active' => true,
            'order' => 2,
        ]);

        $stats = [
            ['title' => '9+', 'description' => 'Years of Experience'],
            ['title' => '70+', 'description' => 'Team Members'],
            ['title' => '100+', 'description' => 'Client Worldwide'],
            ['title' => '98%', 'description' => 'Client Satisfaction'],
            ['title' => '5+', 'description' => 'Countries with Active Clients'],
        ];

        foreach ($stats as $index => $stat) {
            PageItem::create([
                'page_section_id' => $statsSection->id,
                'title' => $stat['title'],
                'description' => $stat['description'],
                'order' => $index + 1,
            ]);
        }

        // CEO Vision Section
        $visionSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'ceo_vision',
            'is_active' => true,
            'order' => 3,
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'title',
            'value' => "CEO's Vision",
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'quote',
            'value' => "Exceptional talent, unwavering dedication. That's the Nexkraft difference.",
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'description',
            'value' => "At Nexkraft, we believe our greatest strength lies in our exceptional team and their unwavering dedication to innovation. Together, we are constantly pushing boundaries and developing groundbreaking solutions that make a real difference. I invite you to explore our website and learn more about how we can help you achieve your goals.",
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
            'type' => 'image',
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'button_text',
            'value' => 'Appointment with CEO',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $visionSection->id,
            'key' => 'button_link',
            'value' => '#contact',
            'type' => 'text',
        ]);

        // Values Section
        $valuesSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'values',
            'is_active' => true,
            'order' => 4,
        ]);

        PageContent::create([
            'section_id' => $valuesSection->id,
            'key' => 'title',
            'value' => 'Core Values',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $valuesSection->id,
            'key' => 'description',
            'value' => 'Explore our core values that uphold the high standards and integrity we bring to every project and partnership.',
            'type' => 'text',
        ]);

        $values = [
            [
                'title' => 'Customer-Centric Excellence',
                'description' => 'Placing customers at the heart of everything we do, we consistently deliver top-tier solutions that align precisely with their unique needs, fostering lasting partnerships.',
                'icon' => 'Users',
            ],
            [
                'title' => 'Innovation First',
                'description' => 'We prioritize constant innovation, crafting solutions that push boundaries and adapt to evolving technological landscapes, ensuring our clients stay ahead in their industries.',
                'icon' => 'Lightbulb',
            ],
            [
                'title' => 'Collaborative Expertise',
                'description' => 'We thrive on collaboration, harnessing the collective expertise of our diverse team to create solutions that blend technical prowess with strategic insights.',
                'icon' => 'Handshake',
            ],
            [
                'title' => 'Reliability and Integrity',
                'description' => 'Guided by unwavering integrity, we build trust through reliable solutions and transparent communication, ensuring our clients\' confidence in our work.',
                'icon' => 'ShieldCheck',
            ],
        ];

        foreach ($values as $index => $value) {
            PageItem::create([
                'page_section_id' => $valuesSection->id,
                'title' => $value['title'],
                'description' => $value['description'],
                'icon' => $value['icon'],
                'order' => $index + 1,
            ]);
        }

        // Process Section
        $processSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'process',
            'is_active' => true,
            'order' => 5,
        ]);

        PageContent::create([
            'section_id' => $processSection->id,
            'key' => 'title',
            'value' => 'Our Implementation Process',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $processSection->id,
            'key' => 'description',
            'value' => 'We follow a very systematic approach to software creation',
            'type' => 'text',
        ]);

        $processes = [
            ['title' => 'Business Analysis', 'description' => 'We analyze business needs and offer the best solution for our clients.'],
            ['title' => 'UI / UX Design', 'description' => 'We create seamless and efficient user flows.'],
            ['title' => 'Development', 'description' => 'We hire only highly experienced IT professionals.'],
            ['title' => 'Testing & QA', 'description' => 'Our goal is to make our products work without fail.'],
            ['title' => 'Deployment', 'description' => 'We assist companies in deployment, scaling and maintenance of applications.'],
            ['title' => 'Data Management', 'description' => 'We help to manage all the business data in the system the right way.'],
        ];

        foreach ($processes as $index => $process) {
            PageItem::create([
                'page_section_id' => $processSection->id,
                'title' => $process['title'],
                'description' => $process['description'],
                'order' => $index + 1,
            ]);
        }

        // Certificates Section
        $certsSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'certificates',
            'is_active' => true,
            'order' => 6,
        ]);

        PageContent::create([
            'section_id' => $certsSection->id,
            'key' => 'title',
            'value' => 'Certificates',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $certsSection->id,
            'key' => 'description',
            'value' => 'We are certified to manage your project',
            'type' => 'text',
        ]);

        // Placeholder certificates
        for ($i = 1; $i <= 4; $i++) {
            PageItem::create([
                'page_section_id' => $certsSection->id,
                'image' => "https://placehold.co/200x100/png?text=Certificate+$i",
                'order' => $i,
            ]);
        }

        // Affiliations Section
        $affiliationsSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'affiliations',
            'is_active' => true,
            'order' => 7,
        ]);

        PageContent::create([
            'section_id' => $affiliationsSection->id,
            'key' => 'title',
            'value' => 'Affiliated With',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $affiliationsSection->id,
            'key' => 'description',
            'value' => 'We are certified to manage your project',
            'type' => 'text',
        ]);

        // Placeholder affiliations
        for ($i = 1; $i <= 5; $i++) {
            PageItem::create([
                'page_section_id' => $affiliationsSection->id,
                'image' => "https://placehold.co/200x100/png?text=Affiliation+$i",
                'order' => $i,
            ]);
        }

        // CTA Section
        $ctaSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'cta',
            'is_active' => true,
            'order' => 8,
        ]);

        PageContent::create([
            'section_id' => $ctaSection->id,
            'key' => 'title',
            'value' => '100+ companies uplift their business with Nexkraft. Tell us about your project',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $ctaSection->id,
            'key' => 'button_text',
            'value' => 'Book a Meeting',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $ctaSection->id,
            'key' => 'button_link',
            'value' => '#contact',
            'type' => 'text',
        ]);

        // Quote Section
        $quoteSection = PageSection::create([
            'page' => 'about-us',
            'section_key' => 'quote',
            'is_active' => true,
            'order' => 9,
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'text',
            'value' => 'Design is not just what it looks like and feels like. Design is how it works.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'author',
            'value' => 'Steve Jobs',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'author_title',
            'value' => 'Founder, Apple Inc.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
            'type' => 'image',
        ]);
    }


    private function seedTeamHero(): void
    {
        // Whole Team Photo Section
        $wholeTeamPhotoSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'whole_team_photo',
            'is_active' => true,
            'order' => 0,
        ]);

        PageContent::create([
            'section_id' => $wholeTeamPhotoSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Hero Section with CTA
        $heroSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'hero',
            'is_active' => true,
            'order' => 1,
        ]);

        PageContent::create([
            'section_id' => $heroSection->id,
            'key' => 'title',
            'value' => 'Our Team',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $heroSection->id,
            'key' => 'description',
            'value' => 'At Nexkraft, our success is built on the exceptional minds and collaborative spirit of our team. We\'re a collection of talented individuals who thrive on working together, transforming individual brilliance into groundbreaking achievements.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $heroSection->id,
            'key' => 'button_text',
            'value' => 'Join Our Family',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $heroSection->id,
            'key' => 'button_link',
            'value' => '/careers',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $heroSection->id,
            'key' => 'individuals_heading',
            'value' => 'Meet the Top minds behind the magic.',
            'type' => 'text',
        ]);

        // CEO Quote Section
        $ceoQuoteSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'ceo_quote',
            'is_active' => true,
            'order' => 2,
        ]);

        PageContent::create([
            'section_id' => $ceoQuoteSection->id,
            'key' => 'quote',
            'value' => 'Nexkraft is constantly pushing boundaries because of the exceptional minds on our team. They are the driving force behind our innovative solutions.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $ceoQuoteSection->id,
            'key' => 'author',
            'value' => 'Md. Shahriar Khan, CEO',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $ceoQuoteSection->id,
            'key' => 'image',
            'value' => '/images/founder.png',
            'type' => 'image',
        ]);

        // Team Quote Section (Reid Hoffman)
        $teamQuoteSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'team_quote',
            'is_active' => true,
            'order' => 3,
        ]);

        PageContent::create([
            'section_id' => $teamQuoteSection->id,
            'key' => 'quote',
            'value' => 'No matter how brilliant your mind or strategy, if you\'re playing a solo game, you\'ll always be beat by a great team.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $teamQuoteSection->id,
            'key' => 'author',
            'value' => 'Reid Hoffman, LinkedIn Co-founder',
            'type' => 'text',
        ]);

        // Beyond the Desk Section
        $beyondDeskSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'beyond_desk',
            'is_active' => true,
            'order' => 4,
        ]);

        PageContent::create([
            'section_id' => $beyondDeskSection->id,
            'key' => 'title',
            'value' => 'Nexkraft People: Beyond the Desk',
            'type' => 'text',
        ]);

        // Beyond the Desk Gallery Items
        $beyondDeskImages = [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop',
        ];

        foreach ($beyondDeskImages as $index => $image) {
            PageItem::create([
                'page_section_id' => $beyondDeskSection->id,
                'image' => $image,
                'order' => $index + 1,
            ]);
        }

        // Team in Motion Section (Carousel)
        $teamMotionSection = PageSection::create([
            'page' => 'our-team',
            'section_key' => 'team_motion',
            'is_active' => true,
            'order' => 5,
        ]);

        PageContent::create([
            'section_id' => $teamMotionSection->id,
            'key' => 'title',
            'value' => 'Get to Know Us: Watch the Nexkraft Team in Motion',
            'type' => 'text',
        ]);

        // Team in Motion Carousel Items
        $teamMotionImages = [
            'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
        ];

        foreach ($teamMotionImages as $index => $image) {
            PageItem::create([
                'page_section_id' => $teamMotionSection->id,
                'image' => $image,
                'order' => $index + 1,
            ]);
        }
    }



    private function seedLifeAtMechanixSections(): void
    {
        // Tech Zone Section
        $techSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'tech_zone',
            'is_active' => true,
            'order' => 1,
        ]);

        PageContent::create([
            'section_id' => $techSection->id,
            'key' => 'title',
            'value' => 'Tech Zone',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $techSection->id,
            'key' => 'description',
            'value' => 'Where innovation meets inspiration. Our state-of-the-art Tech Zone is equipped to empower developers to code, collaborate, and conquer any challenge.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $techSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Design Zone Section
        $designSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'design_zone',
            'is_active' => true,
            'order' => 2,
        ]);

        PageContent::create([
            'section_id' => $designSection->id,
            'key' => 'title',
            'value' => 'Design Zone',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $designSection->id,
            'key' => 'description',
            'value' => 'Think outside the box, inside our inspiring Design Zone. This creative hub is where ideas flourish, fueled by brainstorming sessions, sketching sessions, and crafting the future together.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $designSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Meeting Zone Section
        $meetingSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'meeting_zone',
            'is_active' => true,
            'order' => 3,
        ]);

        PageContent::create([
            'section_id' => $meetingSection->id,
            'key' => 'title',
            'value' => 'Meeting Zone',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $meetingSection->id,
            'key' => 'description',
            'value' => 'From brainstorming sessions to strategic planning, our versatile meeting rooms are designed to spark collaboration and fuel powerful discussions that drive results.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $meetingSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Quote Section
        $quoteSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'quote',
            'is_active' => true,
            'order' => 4,
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'quote',
            'value' => 'Work shouldn\'t be a place you escape from; it should be a place you escape to.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $quoteSection->id,
            'key' => 'author',
            'value' => 'Brian Chesky, Airbnb Co-founder',
            'type' => 'text',
        ]);

        // Coffee Zone Section
        $coffeeSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'coffee_zone',
            'is_active' => true,
            'order' => 5,
        ]);

        PageContent::create([
            'section_id' => $coffeeSection->id,
            'key' => 'title',
            'value' => 'Coffee Zone',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $coffeeSection->id,
            'key' => 'description',
            'value' => 'Grab a cup of coffee, spark conversations, and fuel your creativity in our vibrant Coffee Zone. It\'s the perfect spot to collaborate, unwind, or simply get that extra boost.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $coffeeSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Team Dinner Section
        $dinnerSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'team_dinner',
            'is_active' => true,
            'order' => 6,
        ]);

        PageContent::create([
            'section_id' => $dinnerSection->id,
            'key' => 'title',
            'value' => 'Team Dinner',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $dinnerSection->id,
            'key' => 'description',
            'value' => 'We go beyond the daily grind to recognize the hard work and dedication of our amazing team with delicious meals that foster connections and build team spirit.',
            'type' => 'text',
        ]);

        PageContent::create([
            'section_id' => $dinnerSection->id,
            'key' => 'image',
            'value' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
            'type' => 'image',
        ]);

        // Glimpse Section (Carousel/Gallery items)
        $glimpseSection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'glimpse',
            'is_active' => true,
            'order' => 7,
        ]);

        PageContent::create([
            'section_id' => $glimpseSection->id,
            'key' => 'title',
            'value' => 'A Glimpse into the life of Nexkraftians',
            'type' => 'text',
        ]);

        // Add glimpse carousel items
        $glimpseImages = [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop',
        ];

        foreach ($glimpseImages as $index => $image) {
            PageItem::create([
                'page_section_id' => $glimpseSection->id,
                'image' => $image,
                'order' => $index + 1,
            ]);
        }

        // Team Gallery Section
        $gallerySection = PageSection::create([
            'page' => 'life-at-mechanix',
            'section_key' => 'team_gallery',
            'is_active' => true,
            'order' => 8,
        ]);

        // Add team gallery items
        $galleryImages = [
            'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop',
        ];

        foreach ($galleryImages as $index => $image) {
            PageItem::create([
                'page_section_id' => $gallerySection->id,
                'image' => $image,
                'order' => $index + 1,
            ]);
        }
    }

    private function seedClients(): void
    {
        $clients = [
            ['name' => 'Client 1', 'logo' => 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=200&h=200&fit=crop', 'url' => 'https://example.com/client1'],
            ['name' => 'Client 2', 'logo' => 'https://images.unsplash.com/photo-1762770647310-66f492eb832f?w=200&h=200&fit=crop', 'url' => 'https://example.com/client2'],
            ['name' => 'Client 3', 'logo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', 'url' => 'https://example.com/client3'],
            ['name' => 'Client 4', 'logo' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', 'url' => 'https://example.com/client4'],
            ['name' => 'Client 5', 'logo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', 'url' => 'https://example.com/client5'],
            ['name' => 'Client 6', 'logo' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop', 'url' => 'https://example.com/client6'],
            ['name' => 'Client 7', 'logo' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', 'url' => 'https://example.com/client7'],
            ['name' => 'Client 8', 'logo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', 'url' => 'https://example.com/client8'],
            ['name' => 'Client 9', 'logo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 'url' => 'https://example.com/client9'],
            ['name' => 'Client 10', 'logo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', 'url' => 'https://example.com/client10'],
        ];
        foreach ($clients as $index => $client) {
            Client::create([
                'name' => $client['name'],
                'logo' => $client['logo'],
                'url' => $client['url'],
                'order' => $index + 1,
                'is_active' => true,
            ]);
        }
    }

    private function seedTips(): void
    {
        $tips = [
            [
                'title' => 'Choosing the Right Color Palette',
                'content' => 'Colors can dramatically affect the mood of a room. Learn how to choose the perfect palette for your space.',
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
                'published_at' => now(),
            ],
            [
                'title' => 'Maximizing Small Spaces',
                'content' => 'Small spaces can be stylish and functional. Discover tips and tricks to make the most of your limited square footage.',
                'image' => 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Lighting Design 101',
                'content' => 'Good lighting is essential for any interior. Understand the basics of ambient, task, and accent lighting.',
                'image' => 'https://images.unsplash.com/photo-1544143086-828f66ac3945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'published_at' => now()->subDays(5),
            ],
        ];

        foreach ($tips as $tip) {
            Tip::create([
                'title' => $tip['title'],
                'content' => $tip['content'],
                'image' => $tip['image'],
                'published_at' => $tip['published_at'],
                'is_active' => true,
            ]);
        }
    }
}
