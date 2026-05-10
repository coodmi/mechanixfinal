// CMS TypeScript Interfaces

export interface NavigationItem {
    id: number;
    label: string;
    href: string | null;
    parent_id: number | null;
    order: number;
    is_active: boolean;
    children?: NavigationItem[];
}

export interface SiteSettings {
    companyName: string;
    facebookUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    copyrightText: string;
    logoUrl: string;
    faviconUrl?: string;
    logoVersion?: string;
    appUrl?: string;
}

export interface HeroContent {
    subtitle?: string;
    title?: string;
    title_highlight?: string;
    background_image?: string;
    background_video?: string;
    background_type?: 'image' | 'video';
    cta_text?: string;
    cta_link?: string;
}

export interface AboutContent {
    label?: string;
    title?: string;
    description?: string;
    stat_clients?: string;
    stat_clients_label?: string;
    stat_satisfaction?: string;
    stat_satisfaction_label?: string;
    stat_experience?: string;
    stat_experience_label?: string;
    main_image?: string;
    detail_image?: string;
    detail_caption?: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    order: number;
    is_active: boolean;
}

export interface Amenity {
    id: string;
    name: string;
    icon: string;
}

export interface FloorPlan {
    id: string;
    title: string;
    pdf_url: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    location: string | null;
    image_url: string;
    gallery: string[] | null;
    amenities: Amenity[] | null;
    floor_plans: FloorPlan[] | null;
    description: string | null;
    order: number;
    is_featured: boolean;
    is_active: boolean;
}

export interface FounderContent {
    label?: string;
    title?: string;
    description?: string;
    founder_name?: string;
    founder_title?: string;
    company_name?: string;
    main_image?: string;
    profile_image?: string;
    quote?: string;
    cta_text?: string;
    cta_link?: string;
}

export interface ContactContent {
    title?: string;
    description?: string;
    address?: string;
    phone_primary?: string;
    phone_secondary?: string;
    email_primary?: string;
    email_secondary?: string;
    copyright_text?: string;
    form_name_label?: string;
    form_email_label?: string;
    form_phone_label?: string;
    form_message_label?: string;
    form_submit_text?: string;
    social_facebook?: string;
    social_instagram?: string;
    social_linkedin?: string;
    hotline?: string;
}

export interface HeaderSettings {
    facebookUrl: string;
    facebookIconVisible: boolean;
    ctaButtonText: string;
    ctaButtonLink: string;
}

export interface CMSPageProps {
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    hero?: HeroContent;
    about?: AboutContent;
    services: Service[];
    projects: Project[];
    founder?: FounderContent;
    contact?: ContactContent;
}
