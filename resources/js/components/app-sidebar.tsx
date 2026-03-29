import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Settings,
    Navigation,
    Info,
    Wrench,
    FolderKanban,
    UserCircle,
    Briefcase,
    FileUser,
    Users,
    Building2,
    Handshake,
    Lightbulb,
    Sparkles,
    Send,
    MessageSquare,
    Play,
    Inbox,
    Share2,
    PanelBottom,
    Home,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'About Us Page',
        href: '/admin/about-us',
        icon: FileUser,
        items: [
            {
                title: 'Page Sections',
                href: '/admin/about-us',
            },
            {
                title: 'Quote Section',
                href: '/admin/about-us-quote',
            },
        ],
    },
    {
        title: 'Careers Page',
        href: '/admin/careers',
        icon: Briefcase,
        items: [
            {
                title: 'Page Sections',
                href: '/admin/careers',
            },
            {
                title: 'Quote Section',
                href: '/admin/careers-quote',
            },
            {
                title: 'Job Openings',
                href: '/admin/job-openings',
            },
            {
                title: 'Applications',
                href: '/admin/job-applications',
            },
        ],
    },
    {
        title: 'Clients Page',
        href: '/admin/clients',
        icon: Handshake,
        items: [
            {
                title: 'Page Sections',
                href: '/admin/clients-page-settings',
            },
            {
                title: 'Quote Section',
                href: '/admin/clients-quote',
            },
            {
                title: 'Manage Clients',
                href: '/admin/clients',
            },
        ],
    },
    {
        title: 'Life at Mechanix Page',
        href: '/admin/life-at-mechanix',
        icon: Building2,
        items: [
            {
                title: 'Page Sections',
                href: '/admin/life-at-mechanix',
            },
            {
                title: 'Quote Section',
                href: '/admin/life-at-mechanix-quote',
            },
        ],
    },
    {
        title: 'Our Team Page',
        href: '/admin/our-team',
        icon: Users,
        items: [
            {
                title: 'Page Sections',
                href: '/admin/our-team',
            },
            {
                title: 'Quote Section',
                href: '/admin/our-team-quote',
            },
            {
                title: 'Team Members',
                href: '/admin/team-members',
            },
        ],
    },
    {
        title: 'Manage Articles',
        href: '/admin/tips',
        icon: Lightbulb,
        items: [
            { title: 'Manage Tips', href: '/admin/tips' },
            { title: 'Manage Blogs', href: '/admin/blogs' },
        ],
    },
    {
        title: 'Contact Page',
        href: '/admin/contact-page',
        icon: Send,
    },
    {
        title: 'Home Page Sections',
        href: '/admin/hero',
        icon: Home,
        items: [
            { title: 'Hero Section',     href: '/admin/hero' },
            { title: 'Services Section', href: '/admin/services' },
            { title: 'Projects Section', href: '/admin/projects' },
            { title: 'Founder Section',  href: '/admin/founder' },
            { title: 'Blogs Section',    href: '/admin/home-sections/blogs' },
            { title: 'Tips Section',     href: '/admin/home-sections/tips' },
            { title: 'Video Section',    href: '/admin/video-break' },
            { title: 'Contact Section',  href: '/admin/contact' },
        ],
    },
    {
        title: 'Welcome Modal',
        href: '/admin/welcome-modal',
        icon: MessageSquare,
    },
    {
        title: 'Header',
        href: '/admin/navigation',
        icon: Navigation,
        items: [
            { title: 'Navigation Items', href: '/admin/navigation' },
            { title: 'Header Social Media', href: '/admin/social-media' },
        ],
    },
    {
        title: 'Footer',
        href: '/admin/footer',
        icon: PanelBottom,
    },
    {
        title: 'Contact Records',
        href: '/admin/contact-submissions',
        icon: Inbox,
    },
    {
        title: 'Site Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="group-data-[state=expanded]:h-[125px] group-data-[state=expanded]:flex group-data-[state=expanded]:items-center group-data-[state=expanded]:justify-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group-data-[state=expanded]:h-auto">
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
