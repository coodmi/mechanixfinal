import { useEffect, useRef } from 'react';
import { AboutContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';

export default function AboutSection({ content }: { content?: AboutContent }) {
    const fadeUpElements = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeUpElements.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="py-24 md:py-32 bg-background px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                    ref={(el) => {
                        fadeUpElements.current[0] = el;
                    }}
                    className="opacity-0 translate-y-8 transition-all duration-800"
                >
                    <h4 className="text-brand font-bold tracking-widest uppercase mb-4 text-sm">
                        {content?.label || "About Mechanix"}
                    </h4>
                    <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8 text-foreground">
                        {content?.title || "Precision in every detail, luxury in every corner."}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8 font-light">
                        {content?.description || "At Mechanix Interior, we believe a space is a machine for living. We combine technical precision with modern aesthetics to create functional, breathtaking interiors. From corporate hubs to luxury residences, we engineer the perfect atmosphere for your lifestyle."}
                    </p>
                    <div className="flex gap-12 border-t border-gray-300 pt-8">
                        <div>
                            <span className="block text-4xl font-display font-bold text-[#0F0F0F]">
                                {content?.stat_clients || "50+"}
                            </span>
                            <span className="text-sm text-gray-500 uppercase tracking-wider">
                                {content?.stat_clients_label || "Clients"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-bold text-[#0F0F0F]">
                                {content?.stat_satisfaction || "100%"}
                            </span>
                            <span className="text-sm text-gray-500 uppercase tracking-wider">
                                {content?.stat_satisfaction_label || "Satisfaction"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-4xl font-display font-bold text-[#0F0F0F]">
                                {content?.stat_experience || "5+"}
                            </span>
                            <span className="text-sm text-gray-500 uppercase tracking-wider">
                                {content?.stat_experience_label || "Years Exp."}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    ref={(el) => {
                        fadeUpElements.current[1] = el;
                    }}
                    className="relative h-[600px] w-full opacity-0 translate-y-8 transition-all duration-800 delay-100"
                >
                    <div className="overflow-hidden h-full rounded-md shadow-xl group">
                        <img
                            src={assetUrl(content?.main_image) || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2301&auto=format&fit=crop"}
                            alt="Mechanix Office Design"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src =
                                    'https://placehold.co/2301x1534/E63946/0F0F0F?text=STUDIO+OFFICE';
                            }}
                        />
                    </div>

                    {/* Architectural Detail image box */}
                    <div className="absolute -bottom-8 -left-8 bg-card p-4 shadow-2xl rounded-lg hidden lg:block max-w-xs border-t-4 border-brand">
                        <h5 className="text-sm uppercase font-bold text-gray-500 mb-2">
                            Architectural Detail
                        </h5>
                        <img
                            src={assetUrl(content?.detail_image) || "https://images.unsplash.com/photo-1594754700010-fa37f37475d4?q=80&w=500&auto=format&fit=crop"}
                            alt="Close-up of modern geometric wall paneling"
                            className="w-full h-32 object-cover rounded-md border border-gray-100"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src =
                                    'https://placehold.co/500x300/1F2937/ffffff?text=DETAIL';
                            }}
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center">{content?.detail_caption || "Precision planning."}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
