import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import PageHeroSection from '@/components/page-hero-section';
import { Head } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import * as React from 'react';
import { motion } from 'framer-motion';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';

interface PageItem {
    id: number;
    image?: string;
    order: number;
}

interface LifeAtMechanixProps extends CMSPageProps {
    page_hero: any;
    tech_zone: any;
    design_zone: any;
    meeting_zone: any;
    quote: any;
    coffee_zone: any;
    team_dinner: any;
    glimpse: { title: string; items: PageItem[] };
    team_gallery: { items: PageItem[] };
}

export default function LifeAtMechanix(props: LifeAtMechanixProps) {
    const { page_hero, tech_zone, design_zone, meeting_zone, quote, coffee_zone, team_dinner, glimpse, team_gallery } = props;
    
    const [glimpseApi, setGlimpseApi] = React.useState<CarouselApi>();
    const [glimpseCurrent, setGlimpseCurrent] = React.useState(0);
    const [glimpseCount, setGlimpseCount] = React.useState(0);

    React.useEffect(() => {
        if (!glimpseApi) return;

        setGlimpseCount(glimpseApi.scrollSnapList().length);
        setGlimpseCurrent(glimpseApi.selectedScrollSnap());

        glimpseApi.on("select", () => {
            setGlimpseCurrent(glimpseApi.selectedScrollSnap());
        });
    }, [glimpseApi]);

    return (
        <>
            <Head title="Life at Mechanix - Mechanix Interior">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground">
                <Navbar navigation={props.navigation} siteSettings={props.siteSettings} headerSettings={props.headerSettings} />

                {/* Hero Section */}
                <PageHeroSection pageHero={page_hero} />
                
                {/* Zones Grid Section */}
                <section className="container lg:max-w-7xl mx-auto px-4 py-20 pt-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {/* Tech Zone */}
                        {tech_zone && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        className="space-y-4 border bg-white hover:shadow-2xl transition-all duration-300 p-4 rounded-lg cursor-pointer"
                                    >
                                        <motion.div 
                                            className="relative h-64 w-full overflow-hidden rounded-lg"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img src={tech_zone.image} alt="Tech Zone" className="h-full w-full object-cover" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold">{tech_zone.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-2">{tech_zone.description}</p>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg">{tech_zone.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{tech_zone.description}</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Design Zone */}
                        {design_zone && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        className="space-y-4 border bg-white hover:shadow-2xl transition-all duration-300 p-4 rounded-lg cursor-pointer"
                                    >
                                        <motion.div 
                                            className="relative h-64 w-full overflow-hidden rounded-lg"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img src={design_zone.image} alt="Design Zone" className="h-full w-full object-cover" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold">{design_zone.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-2">{design_zone.description}</p>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg">{design_zone.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{design_zone.description}</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Meeting Zone */}
                        {meeting_zone && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        className="space-y-4 border bg-white hover:shadow-2xl transition-all duration-300 p-4 rounded-lg cursor-pointer"
                                    >
                                        <motion.div 
                                            className="relative h-64 w-full overflow-hidden rounded-lg"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img src={meeting_zone.image} alt="Meeting Zone" className="h-full w-full object-cover" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold">{meeting_zone.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-2">{meeting_zone.description}</p>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg">{meeting_zone.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{meeting_zone.description}</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </motion.div>
                </section>

                {/* Quote Section */}
                {quote && (
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-black text-white py-24"
                    >
                        <div className="container mx-auto px-4 text-center">
                            <motion.h2 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-3xl md:text-5xl font-bold mb-8 leading-tight max-w-4xl mx-auto font-quote italic"
                            >
                                "{quote.quote}"
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg text-gray-400 font-quote"
                            >
                                - {quote.author}
                            </motion.p>
                        </div>
                    </motion.section>
                )}

                {/* Coffee Zone & Team Dinner Grid */}
                <section className="container lg:max-w-7xl mx-auto px-4 py-24">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-16 items-center"
                    >
                        {/* Coffee Zone */}
                        {coffee_zone && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="relative h-96 w-full overflow-hidden rounded-lg group"
                                >
                                    <motion.img 
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                        src={coffee_zone.image} 
                                        alt="Coffee Zone" 
                                        className="h-full w-full object-cover" 
                                    />
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="space-y-4"
                                >
                                    <h2 className="text-3xl font-bold">{coffee_zone.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed text-lg">{coffee_zone.description}</p>
                                </motion.div>
                            </>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-16 items-center mt-16"
                    >
                        {/* Team Dinner */}
                        {team_dinner && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4 order-2 md:order-1"
                                >
                                    <h2 className="text-3xl font-bold">{team_dinner.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed text-lg">{team_dinner.description}</p>
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="relative h-96 w-full overflow-hidden rounded-lg order-1 md:order-2 group"
                                >
                                    <motion.img 
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                        src={team_dinner.image} 
                                        alt="Team Dinner" 
                                        className="h-full w-full object-cover" 
                                    />
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </section>

                {/* Glimpse Carousel Section */}
                {glimpse && glimpse.items && glimpse.items.length > 0 && (
                    <motion.section 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-background py-24"
                    >
                        <div className="px-4">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center text-3xl font-bold mb-12"
                            >
                                {glimpse.title}
                            </motion.h2>

                            <div className="relative lg:max-w-7xl mx-auto">
                                <Carousel
                                    setApi={setGlimpseApi}
                                    opts={{
                                        align: "center",
                                        loop: true,
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className="-ml-2 md:-ml-4">
                                        {glimpse.items.map((item, index) => (
                                            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group"
                                                >
                                                    <motion.img
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.4 }}
                                                        src={item.image}
                                                        alt={`Glimpse ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                                {/* Dot Indicators - only show if more than 1 slide */}
                                {glimpseCount > 1 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="flex justify-center gap-2 mt-8"
                                    >
                                        {Array.from({ length: glimpseCount }).map((_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => glimpseApi?.scrollTo(index)}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === glimpseCurrent
                                                        ? 'bg-primary w-8'
                                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Team Gallery Grid */}
                {team_gallery && team_gallery.items && team_gallery.items.length > 0 && (
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-black text-white py-24"
                    >
                        <div className="container lg:max-w-7xl mx-auto px-4">
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-2"
                            >
                                {team_gallery.items.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                        className="relative aspect-square overflow-hidden group"
                                    >
                                        <motion.img
                                            whileHover={{ scale: 1.2, rotate: 2 }}
                                            transition={{ duration: 0.4 }}
                                            src={item.image}
                                            alt="Team"
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.section>
                )}

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
