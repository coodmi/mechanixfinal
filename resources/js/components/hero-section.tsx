import { ArrowDown, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { HeroContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';

export default function HeroSection({ content }: { content?: HeroContent }) {
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
        <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Media (Image or Video) */}
            <div className="absolute inset-0 z-0">
                {content?.background_type === 'video' && content?.background_video ? (
                    <div className="w-full h-full overflow-hidden relative">
                        {/* YouTube Video */}
                        {content.background_video.includes('youtube.com') || content.background_video.includes('youtu.be') ? (
                            <iframe
                                className="w-full h-full object-cover pointer-events-none scale-150"
                                src={`https://www.youtube.com/embed/${getYouTubeId(content.background_video)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(content.background_video)}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
                                allow="autoplay; encrypted-media"
                                title="Hero Background Video"
                            />
                        ) : content.background_video.includes('facebook.com') ? (
                            /* Facebook Video - Note: Facebook embeds are trickier for background loops without controls */
                            <iframe
                                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(content.background_video)}&show_text=0&autoplay=1&mute=1&loop=1`}
                                className="w-full h-full object-cover scale-150 pointer-events-none"
                                style={{ border: 'none', overflow: 'hidden' }}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                allowFullScreen={true}
                            />
                        ) : (
                            /* Direct Video Upload */
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover filter brightness-[0.6]"
                            >
                                <source src={content.background_video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                    </div>
                ) : (
                    /* Fallback to Image */
                    <img
                        src={assetUrl(content?.background_image) || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2800&auto=format&fit=crop"}
                        alt="Mechanix Interior Design"
                        className="w-full h-full object-cover filter brightness-[0.6]"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/2800x1600/0F0F0F/F5F5F0?text=MECHANIX+HERO';
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <p
                    ref={(el) => {
                        fadeUpElements.current[0] = el;
                    }}
                    className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4 opacity-0 translate-y-8 transition-all duration-800"
                >
                    {content?.subtitle || "Interior Architecture & Design"}
                </p>
                <h1
                    ref={(el) => {
                        fadeUpElements.current[1] = el;
                    }}
                    className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white leading-[0.9] tracking-tight mb-8 opacity-0 translate-y-8 transition-all duration-800 delay-100"
                >
                    {content?.title || "ENGINEERING"} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        {content?.title_highlight || "AESTHETICS"}
                    </span>
                </h1>
                <div
                    ref={(el) => {
                        fadeUpElements.current[2] = el;
                    }}
                    className="opacity-0 translate-y-8 transition-all duration-800 delay-200"
                >
                    <a
                        href={content?.cta_link || "#projects"}
                        className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-brand hover:border-brand transition-all duration-300 uppercase tracking-widest text-xs md:text-sm"
                    >
                        {content?.cta_text || "View Selected Works"} <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ArrowDown className="text-white w-6 h-6" />
            </div>
        </header>
    );
}

function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
