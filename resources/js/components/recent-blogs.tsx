import { Link } from '@inertiajs/react';
import { assetUrl } from '@/lib/asset-url';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    content: string;
    image: string | null;
    author: string | null;
    published_at: string | null;
}

interface SectionSettings { title?: string; subtitle?: string; enabled?: boolean; }

export default function RecentBlogs({ blogs, settings }: { blogs: Blog[]; settings?: SectionSettings }) {
    if (!blogs || blogs.length === 0) return null;
    if (settings?.enabled === false) return null;

    const title    = settings?.title    || 'Blogs & Articles';
    const subtitle = settings?.subtitle || 'Stay updated with the latest interior design news, tips and insights.';

    return (
        <section className="bg-[#0d1117] py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Latest Blogs</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{title}</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            className="group bg-[#161b22] rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col text-white"
                        >
                            <div className="h-48 overflow-hidden bg-gray-800">
                                <img
                                    src={assetUrl(blog.image) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    {blog.published_at && (
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(blog.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    )}
                                    {blog.category && (
                                        <span className="text-xs text-primary font-semibold flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> {blog.category}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-white font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors" style={{ color: 'white' }}>
                                    {blog.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-3 flex-1">{blog.content}</p>
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
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        View All Blogs <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
