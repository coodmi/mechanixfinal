import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import { Head, Link } from '@inertiajs/react';
import { Project, NavigationItem, SiteSettings, ContactContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';

interface SocialLink { id: number; platform: string; url: string; }
interface HeaderSettings { ctaButtonText: string; ctaButtonLink: string; socialLinks?: SocialLink[]; }

interface ProjectsProps {
    projects: Project[];
    categories: string[];
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    contact?: ContactContent;
    footerSocialLinks?: SocialLink[];
}

export default function Projects({
    projects,
    categories,
    navigation,
    siteSettings,
    headerSettings,
    contact,
    footerSocialLinks = [],
}: ProjectsProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchesSearch =
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                (p.location ?? '').toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !selectedCategory || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [projects, search, selectedCategory]);

    return (
        <>
            <Head title="Our Projects | Mechanix Interior" />
            <div className="antialiased min-h-screen bg-background">
                <Navbar navigation={navigation} siteSettings={siteSettings} headerSettings={headerSettings} />

                {/* Hero Banner */}
                <section className="bg-primary pt-32 pb-16 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                        Our Projects
                    </h1>
                    <p className="text-primary-foreground/70 max-w-xl mx-auto text-base">
                        Explore our diverse range of engineering solutions and successful projects
                    </p>
                </section>

                {/* Search & Filter Bar */}
                <section className="bg-background py-8 px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or location..."
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex-1 sm:max-w-[200px] px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => { setSearch(''); setSelectedCategory(''); }}
                            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-10 px-4 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                No projects found matching your search.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {filtered.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/projects/${project.slug}`}
                                        className="group relative overflow-hidden rounded-xl aspect-[3/4] block shadow-md"
                                    >
                                        <img
                                            src={assetUrl(project.image_url)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    `https://placehold.co/400x530/1F2937/ffffff?text=${encodeURIComponent(project.title)}`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
                                                {project.category}
                                            </span>
                                            <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                                                {project.title}
                                            </h3>
                                            {project.location && (
                                                <p className="text-white/70 text-xs mt-0.5">{project.location}</p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <ContactSection content={contact} siteSettings={siteSettings} footerSocialLinks={footerSocialLinks} />
            </div>
        </>
    );
}
