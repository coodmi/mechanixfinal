import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import { Head, Link } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { assetUrl } from '@/lib/asset-url';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';

interface PageSettings {
    page_title: string;
    page_subtitle: string;
    meta_title: string;
    meta_description: string;
}

interface TipsProps extends CMSPageProps {
    tips: any[];
    categories: string[];
    page_hero: any;
    page_settings: PageSettings;
}

export default function Tips(props: TipsProps) {
    const { tips = [], categories = [], page_hero, page_settings } = props;

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filtered = useMemo(() => {
        return tips.filter((tip) => {
            const matchesSearch = !search ||
                tip.title.toLowerCase().includes(search.toLowerCase()) ||
                (tip.content ?? '').toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !selectedCategory || tip.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [tips, search, selectedCategory]);

    return (
        <>
            <Head title={page_settings?.meta_title || "Design Tips - Mechanix Interior"}>
                <meta name="description" content={page_settings?.meta_description || "Get expert interior design tips and insights."} />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground">
                <Navbar navigation={props.navigation} siteSettings={props.siteSettings} headerSettings={props.headerSettings} />

                {/* Solid dark hero */}
                <section className="bg-primary pt-32 pb-16 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                        {page_settings?.page_title || 'Design Tips & Insights'}
                    </h1>
                    <p className="text-primary-foreground/70 max-w-xl mx-auto text-base">
                        {page_settings?.page_subtitle || 'Expert advice to help you create your dream space.'}
                    </p>
                </section>

                <section className="container mx-auto px-4 py-16">
                    {/* Search & Filter Bar */}
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-3 mb-12">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or content..."
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

                    {/* Tips Grid */}
                    {filtered.length > 0 ? (
                        <motion.div
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                            initial="hidden"
                            animate="visible"
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {filtered.map((tip) => (
                                <motion.div
                                    key={tip.id}
                                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link href={`/tips/${tip.slug}`} className="block h-full">
                                        <Card className="p-0! overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm h-full cursor-pointer">
                                            <motion.div
                                                className="h-48 overflow-hidden bg-gray-100"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img
                                                    src={assetUrl(tip.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800'}
                                                    alt={tip.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </motion.div>
                                            <CardHeader>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm text-muted-foreground">
                                                        {tip.published_at ? new Date(tip.published_at).toLocaleDateString() : 'Draft'}
                                                    </span>
                                                    {tip.category && (
                                                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                                                            {tip.category}
                                                        </span>
                                                    )}
                                                </div>
                                                <CardTitle className="text-xl font-bold line-clamp-2">{tip.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-8">
                                                <p className="text-muted-foreground line-clamp-3">{tip.content}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No tips found matching your search.
                        </div>
                    )}
                </section>

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={(props as any).footerSocialLinks} />
            </div>
        </>
    );
}
