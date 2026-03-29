import { useEffect, useRef, useState } from 'react';
import { Project } from '@/types/cms';
import { Link } from '@inertiajs/react';
import { assetUrl } from '@/lib/asset-url';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsSectionProps {
    projects: Project[];
    section?: {
        section_title?: string;
        section_description?: string;
    };
}

const CARDS_PER_PAGE = 4;

export default function ProjectsSection({ projects, section }: ProjectsSectionProps) {
    const fadeRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE);
    const visible = projects.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

    useEffect(() => {
        const el = fadeRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add('opacity-100', 'translate-y-0');
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const prev = () => setPage((p) => Math.max(0, p - 1));
    const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

    return (
        <section id="projects" className="py-16 md:py-24 px-4 md:px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div
                    ref={fadeRef}
                    className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                        {section?.section_title || 'Our Projects'}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-3">
                        {section?.section_description || 'Explore our diverse range of engineering solutions'}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {visible.map((project) => (
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
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                                    {project.title}
                                </h3>
                                {project.location && (
                                    <p className="text-white/70 text-xs mt-1">{project.location}</p>
                                )}
                            </div>
                        </Link>
                    ))}

                    {/* Fill empty slots so grid stays consistent */}
                    {visible.length < CARDS_PER_PAGE &&
                        Array.from({ length: CARDS_PER_PAGE - visible.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="rounded-xl aspect-[3/4] bg-muted/30" />
                        ))
                    }
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            disabled={page === 0}
                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                        i === page ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                    aria-label={`Page ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            disabled={page === totalPages - 1}
                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* View All Button */}
                <div className="mt-10 text-center">
                    <Link
                        href="/projects"
                        className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
