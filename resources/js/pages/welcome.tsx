import Navbar from '@/components/site-header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ServicesSection from '@/components/services-section';
import ProjectsSection from '@/components/projects-section';
import VideoBreakSection from '@/components/video-breakSection';
import ContactSection from '@/components/contact-section';
import OurFounder from '@/components/our-founder';
import RecentBlogs from '@/components/recent-blogs';
import RecentTips from '@/components/recent-tips';
import { Head } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import WelcomeModal from '@/components/welcome-modal';

interface WelcomeModalSettings {
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
    image?: string;
    note?: string;
    is_active?: boolean;
}

export default function Welcome(props: CMSPageProps & {
    canRegister: boolean;
    videoBreak: any;
    welcomeModal?: WelcomeModalSettings;
    recentBlogs?: any[];
    recentTips?: any[];
    blogSectionSettings?: { title: string; subtitle: string; enabled: boolean };
    tipsSectionSettings?: { title: string; subtitle: string; enabled: boolean };
}) {
    return (
        <>
            <Head title="Mechanix Interior">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600&family=Syne:wght@400;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground">
                <WelcomeModal settings={props.welcomeModal} />
                <Navbar navigation={props.navigation} siteSettings={props.siteSettings} headerSettings={props.headerSettings} />
                <HeroSection content={props.hero} />
                <AboutSection content={props.about} />
                <ServicesSection services={props.services} section={props.servicesSection} />
                <ProjectsSection projects={props.projects} section={props.projectsSection} />
                <OurFounder content={props.founder} />
                <RecentBlogs blogs={props.recentBlogs ?? []} settings={props.blogSectionSettings} />
                <RecentTips tips={props.recentTips ?? []} settings={props.tipsSectionSettings} />
                <VideoBreakSection content={props.videoBreak} />
                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
