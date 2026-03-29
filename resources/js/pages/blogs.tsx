import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import { Head, Link } from '@inertiajs/react';
import { NavigationItem, SiteSettings, ContactContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { Search, Calendar, Tag } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Blog { id: number; title: string; slug: string; category: string | null; content: string; image: string | null; author: string | null; published_at: string | null; }
interface SocialLink { id: number; platform: string; url: string; }
interface HeaderSettings { ctaButtonText: string; ctaButtonLink: string; socialLinks?: SocialLink[]; }

interface BlogsProps {
    blogs: Blog[];
    categories: string[];
    pageSettings: { title: string; description: string; bg_image: string; };
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    contact?: ContactContent;
    footerSocialLinks?: SocialLink[];
}

export default function Blogs({ blogs, categories, pageSettings, navigation, siteSettings, headerSettings, contact, footerSocialLinks = [] }: BlogsProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filtered = useMemo(() => blogs.filter((b) => {
        const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || (b.content ?? '').toLowerCase().includes(search.toLowerCase());
        const matchCat = !selectedCategory || b.category === selectedCategory;
        return matchSearch && matchCat;
    }), [blogs, search, selectedCategory]);

    return (
        <>
            <Head title="Blogs | Mechanix Interior" />
            <div className="antialiased min-h-screen bg-background">
                <Navbar navigation={navigation} siteSettings={siteSettings} headerSettings={headerSettings} />

                {/* Hero */}
                <section className="bg-primary pt-32 pb-16 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">{pageSettings?.title || 'Our Blog'}</h1>
                    <p className="text-primary-foreground/70 max-w-xl mx-auto text-base">{pageSettings?.description || 'Insights, ideas and inspiration from the Mechanix team.'}</p>
                </section>

                {/* Search & Filter */}
                <section className="bg-background py-8 px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blogs..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex-1 sm:max-w-[200px] px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                            <option value="">All Categories</option>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button onClick={() => { setSearch(''); setSelectedCategory(''); }} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">Search</button>
                    </div>
                </section>

                {/* Grid */}
                <section className="py-10 px-4 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">No blogs found.</div>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((blog) => (
                                    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block rounded-xl overflow-hidden border hover:shadow-lg transition-shadow bg-card">
                                        <div className="h-52 overflow-hidden bg-gray-100">
                                            <img src={assetUrl(blog.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-GB') : 'Draft'}</span>
                                                {blog.category && <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">{blog.category}</span>}
                                            </div>
                                            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">{blog.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-3">{blog.content}</p>
                                            {blog.author && <p className="text-xs text-muted-foreground mt-3 font-medium">By {blog.author}</p>}
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
