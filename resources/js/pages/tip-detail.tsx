import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import { Head, Link } from '@inertiajs/react';
import { NavigationItem, SiteSettings, ContactContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface Tip {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    content: string;
    image: string | null;
    published_at: string | null;
}

interface SocialLink { id: number; platform: string; url: string; }
interface HeaderSettings { ctaButtonText: string; ctaButtonLink: string; socialLinks?: SocialLink[]; }

interface TipDetailProps {
    tip: Tip;
    related: Tip[];
    recent: Tip[];
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    contact?: ContactContent;
    footerSocialLinks?: SocialLink[];
}

function TipCard({ tip }: { tip: Tip }) {
    return (
        <Link href={`/tips/${tip.slug}`} className="group flex gap-4 items-start">
            <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <img
                    src={assetUrl(tip.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200'}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">
                    {tip.published_at ? new Date(tip.published_at).toLocaleDateString('en-GB') : 'Draft'}
                </p>
                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {tip.title}
                </h4>
            </div>
        </Link>
    );
}

export default function TipDetail({
    tip, related, recent, navigation, siteSettings, headerSettings, contact, footerSocialLinks = [],
}: TipDetailProps) {
    return (
        <>
            <Head title={`${tip.title} | Mechanix Interior`} />

            <div className="antialiased min-h-screen bg-background">
                <Navbar navigation={navigation} siteSettings={siteSettings} headerSettings={headerSettings} />

                {/* Hero Image */}
                <div className="relative h-[50vh] md:h-[60vh] overflow-hidden mt-0 pt-24">
                    <img
                        src={assetUrl(tip.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600'}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
                        <Link href="/tips" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {tip.category && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                                    <Tag className="w-3 h-3" /> {tip.category}
                                </span>
                            )}
                            {tip.published_at && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(tip.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                            {tip.title}
                        </h1>
                    </div>
                </div>

                {/* Content + Sidebar */}
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {tip.content}
                        </div>

                        {/* Related Posts */}
                        {related.length > 0 && (
                            <div className="mt-16 pt-10 border-t">
                                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {related.map((r) => (
                                        <Link key={r.id} href={`/tips/${r.slug}`} className="group block rounded-xl overflow-hidden border hover:shadow-md transition-shadow">
                                            <div className="h-40 overflow-hidden bg-gray-100">
                                                <img
                                                    src={assetUrl(r.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'}
                                                    alt={r.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    {r.published_at ? new Date(r.published_at).toLocaleDateString('en-GB') : 'Draft'}
                                                </p>
                                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{r.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.content}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Recent Posts */}
                        {recent.length > 0 && (
                            <div className="bg-card rounded-xl border p-5">
                                <h3 className="font-bold text-lg mb-4 pb-2 border-b">Recent Posts</h3>
                                <div className="space-y-4">
                                    {recent.map((r) => <TipCard key={r.id} tip={r} />)}
                                </div>
                            </div>
                        )}

                        {/* Back to all */}
                        <Link
                            href="/tips"
                            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> All Articles
                        </Link>
                    </aside>
                </div>

                <ContactSection content={contact} siteSettings={siteSettings} footerSocialLinks={footerSocialLinks} />
            </div>
        </>
    );
}
