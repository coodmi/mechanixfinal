import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import { Head, Link } from '@inertiajs/react';
import { Project, NavigationItem, SiteSettings, HeaderSettings, ContactContent, Amenity, FloorPlan } from '@/types/cms';
import { ArrowLeft, MapPin, Tag, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFViewer } from '@/components/ui/pdf-viewer';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/asset-url';

interface ProjectDetailProps {
    project: Project;
    relatedProjects: Project[];
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    contact?: ContactContent;
    footerSocialLinks?: { id: number; platform: string; url: string }[];
}

// Helper to render Lucide icon by name
function LucideIcon({ name, className }: { name: string; className?: string }) {
    const Icon = (LucideIcons as any)[name];
    if (!Icon) return null;
    return <Icon className={className} />;
}

export default function ProjectDetail({
    project,
    relatedProjects,
    navigation,
    siteSettings,
    headerSettings,
    contact,
    footerSocialLinks = [],
}: ProjectDetailProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const galleryImages = project.gallery || [];
    const amenities = project.amenities || [];
    const floorPlans = project.floor_plans || [];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <>
            <Head title={`${project.title} | Mechanix Interior`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600&family=Syne:wght@400;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground min-h-screen bg-background">
                <Navbar navigation={navigation} siteSettings={siteSettings} headerSettings={headerSettings} />

                {/* Hero Section with Project Image */}
                <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={assetUrl(project.image_url)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://placehold.co/1920x1080/1F2937/ffffff?text=${encodeURIComponent(project.title)}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <a href={"/"}>
                                    <Button>
                                        <ArrowLeft className="w-4 h-4 mr-1" />
                                        Back
                                    </Button>
                                </a>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                                    <Tag className="w-3 h-3" />
                                    {project.category}
                                </span>
                                {project.location && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full">
                                        <MapPin className="w-3 h-3" />
                                        {project.location}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Project Details Section */}
                <section className="py-16 md:py-24 px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
                                About This Project
                            </h2>
                            {project.description ? (
                                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                                    {project.description}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Details about this beautiful {project.category.toLowerCase()} project coming soon.
                                </p>
                            )}
                        </div>

                        {/* Project Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                            <div className="text-center p-6 bg-gray-50 rounded-2xl">
                                <Tag className="w-8 h-8 mx-auto mb-3 text-primary" />
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Category</p>
                                <p className="text-xl font-display font-bold text-foreground">{project.category}</p>
                            </div>
                            {project.location && (
                                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                                    <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-xl font-display font-bold text-foreground">{project.location}</p>
                                </div>
                            )}
                            <div className="text-center p-6 bg-gray-50 rounded-2xl">
                                <div className="w-8 h-8 mx-auto mb-3 text-primary flex items-center justify-center">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                <p className="text-xl font-display font-bold text-foreground">Completed</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amenities Section */}
                {amenities.length > 0 && (
                    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
                                Project Amenities
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {amenities.map((amenity) => (
                                    <div
                                        key={amenity.id}
                                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                            <LucideIcon name={amenity.icon} className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-medium text-center text-foreground">{amenity.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Section */}
                {galleryImages.length > 0 && (
                    <section className="py-16 md:py-24 px-4 md:px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
                                Project Gallery
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryImages.map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img
                                            src={assetUrl(imageUrl)}
                                            alt={`${project.title} - Image ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Floor Plans Section */}
                {floorPlans.length > 0 && (
                    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
                                Floor Plans
                            </h2>
                            {floorPlans.length === 1 ? (
                                <PDFViewer
                                    url={floorPlans[0].pdf_url}
                                    title={floorPlans[0].title}
                                    className="h-[600px]"
                                />
                            ) : (
                                <Tabs defaultValue={floorPlans[0]?.id} className="w-full">
                                    <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0 mb-6">
                                        {floorPlans.map((plan) => (
                                            <TabsTrigger
                                                key={plan.id}
                                                value={plan.id}
                                                className="px-5 py-2 text-sm rounded-full font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-gray-300 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-background hover:bg-gray-100"
                                            >
                                                {plan.title}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {floorPlans.map((plan) => (
                                        <TabsContent key={plan.id} value={plan.id}>
                                            <PDFViewer
                                                url={plan.pdf_url}
                                                title={plan.title}
                                                className="h-[600px]"
                                            />
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            )}
                        </div>
                    </section>
                )}

                {/* Related Projects Section */}
                {relatedProjects.length > 0 && (
                    <section className="py-16 md:py-24 px-4 md:px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
                                Related Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedProjects.map((relatedProject) => (
                                    <Link
                                        key={relatedProject.id}
                                        href={`/projects/${relatedProject.slug}`}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden h-[300px] mb-4 rounded-lg shadow-md">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                            <img
                                                src={assetUrl(relatedProject.image_url)}
                                                alt={relatedProject.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = `https://placehold.co/600x400/1F2937/ffffff?text=${encodeURIComponent(relatedProject.title)}`;
                                                }}
                                            />
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <span className="inline-block px-4 py-1 bg-card/90 text-xs font-bold uppercase tracking-wider text-card-foreground rounded-full">
                                                    {relatedProject.category}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-display font-bold group-hover:text-black text-muted-foreground transition-colors">
                                            {relatedProject.title}
                                        </h3>
                                        {relatedProject.location && (
                                            <p className="text-gray-500 text-sm">{relatedProject.location}</p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <ContactSection content={contact} siteSettings={siteSettings} footerSocialLinks={footerSocialLinks} />
            </div>

            {/* Lightbox */}
            {lightboxOpen && galleryImages.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={closeLightbox}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <LucideIcons.ChevronLeft className="w-8 h-8" />
                    </button>

                    <img
                        src={galleryImages[lightboxIndex]}
                        alt={`${project.title} - Image ${lightboxIndex + 1}`}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <LucideIcons.ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                        {lightboxIndex + 1} / {galleryImages.length}
                    </div>
                </div>
            )}
        </>
    );
}
