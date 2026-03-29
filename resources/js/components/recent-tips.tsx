import { Link } from '@inertiajs/react';
import { assetUrl } from '@/lib/asset-url';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface Tip {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    content: string;
    image: string | null;
    published_at: string | null;
}

interface SectionSettings { title?: string; subtitle?: string; enabled?: boolean; }

export default function RecentTips({ tips, settings }: { tips: Tip[]; settings?: SectionSettings }) {
    if (!tips || tips.length === 0) return null;
    if (settings?.enabled === false) return null;

    const title    = settings?.title    || 'Tips & Insights';
    const subtitle = settings?.subtitle || 'Expert advice to help you create your dream space.';

    return (
        <section className="bg-background py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Design Tips</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{title}</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {tips.map((tip) => (
                        <Link
                            key={tip.id}
                            href={`/tips/${tip.slug}`}
                            className="group block rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300 bg-card"
                        >
                            <div className="h-48 overflow-hidden bg-gray-100">
                                <img
                                    src={assetUrl(tip.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'}
                                    alt={tip.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    {tip.published_at && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(tip.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    )}
                                    {tip.category && (
                                        <span className="text-xs text-primary font-semibold flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> {tip.category}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                    {tip.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-3">{tip.content}</p>
                                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                                    Read More <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All */}
                <div className="text-center">
                    <Link
                        href="/tips"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        View All Tips <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
