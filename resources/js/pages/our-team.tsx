import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import PageHeroSection from '@/components/page-hero-section';
import { Head, Link } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageItem {
    id: number;
    image?: string;
    order: number;
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image_url?: string;
    linkedin_url?: string;
    facebook_url?: string;
    order: number;
}

interface OurTeamProps extends CMSPageProps {
    page_hero: any;
    whole_team_photo: { image?: string };
    hero: any;
    ceo_quote: any;
    team_quote: any;
    beyond_desk: { title: string; items: PageItem[] };
    team_motion: { title: string; items: PageItem[] };
    teamMembers?: TeamMember[];
}

export default function OurTeam(props: OurTeamProps) {
    const { page_hero, whole_team_photo, hero, ceo_quote, team_quote, beyond_desk, team_motion, teamMembers = [] } = props;

    const [teamMotionApi, setTeamMotionApi] = React.useState<CarouselApi>();
    const [teamMotionCurrent, setTeamMotionCurrent] = React.useState(0);
    const [teamMotionCount, setTeamMotionCount] = React.useState(0);

    React.useEffect(() => {
        if (!teamMotionApi) return;

        setTeamMotionCount(teamMotionApi.scrollSnapList().length);
        setTeamMotionCurrent(teamMotionApi.selectedScrollSnap());

        teamMotionApi.on("select", () => {
            setTeamMotionCurrent(teamMotionApi.selectedScrollSnap());
        });
    }, [teamMotionApi]);

    return (
        <>
            <Head title="Our Team - Mechanix Interior">
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
                
                {/* Team Members Showcase Tabs */}
                <section className="container px-4 py-20 pt-32 lg:max-w-7xl mx-auto">
                    <Tabs defaultValue="whole-team" className="w-full">
                        <div className="mb-12 flex justify-center">
                            <TabsList className="bg-transparent">
                                <TabsTrigger
                                    value="whole-team"
                                    className="rounded-none border-b-2 border-transparent px-8 py-3 text-lg data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                                >
                                    Whole Team
                                </TabsTrigger>
                                <TabsTrigger
                                    value="individuals"
                                    className="rounded-none border-b-2 border-transparent px-8 py-3 text-lg data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                                >
                                    Individuals
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="whole-team" className="mt-0">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex min-h-[500px] items-center justify-center rounded-lg overflow-hidden p-8 border"
                            >
                                <motion.img
                                    src={whole_team_photo?.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'}
                                    alt="Whole Team"
                                    className="w-full h-full object-cover rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="individuals" className="mt-0">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-center">
                                    {hero?.individuals_heading || 'Meet the Top minds behind the magic.'}
                                </h2>
                            </div>
                            {teamMembers.length > 0 ? (
                                <motion.div 
                                    className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    {teamMembers.map((member, index) => (
                                        <motion.div
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                        >
                                        <HoverCard openDelay={200}>
                                            <HoverCardTrigger asChild>
                                                <Card className="p-0! overflow-hidden border shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                                                    <CardContent className="p-0">
                                                        <div className="aspect-square w-full overflow-hidden bg-gray-100">
                                                            <img
                                                                src={member.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'}
                                                                alt={member.name}
                                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                            />
                                                        </div>
                                                        <div className="p-4 text-center">
                                                            <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                                                            <p className="text-sm text-muted-foreground">{member.role}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-64" align="center">
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="font-semibold">{member.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        {member.linkedin_url && (
                                                            <Link href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Linkedin className="w-4 h-4" />
                                                                    LinkedIn
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        {member.facebook_url && (
                                                            <Link href={member.facebook_url} target="_blank" rel="noopener noreferrer">
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Facebook className="w-4 h-4" />
                                                                    Facebook
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="py-12 text-center text-muted-foreground">
                                    No team members found. Add team members from the admin panel.
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Hero Section with Image and Quote */}
                {hero && (
                    <section className="container px-4 py-20 pt-32 lg:max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            {/* Left: Hero Content */}
                            <motion.div 
                                className="space-y-6"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-5xl font-bold">{hero.title}</h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    At <span className="font-semibold">Nexkraft</span>, {hero.description}
                                </p>
                                {hero.button_text && (
                                    <Link href={hero.button_link || '/careers'}>
                                        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                                            {hero.button_text}
                                        </Button>
                                    </Link>
                                )}
                            </motion.div>

                            {/* Right: CEO Quote with Image */}
                            {ceo_quote && (
                                <motion.div 
                                    className="relative"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <motion.div 
                                        className="aspect-video rounded-lg overflow-hidden mb-4"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={ceo_quote.image}
                                            alt="CEO"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <motion.div 
                                        className="bg-primary text-white p-6 rounded-lg -mt-20 relative z-10 ml-12"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <p className="text-lg mb-4">{ceo_quote.quote}</p>
                                        <p className="font-semibold">{ceo_quote.author}</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </section>
                )}

                {/* Team Quote Section */}
                {team_quote && (
                    <section className="bg-black text-white py-24">
                        <motion.div 
                            className="container mx-auto px-4 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7 }}
                        >
                            <motion.h2 
                                className="text-3xl md:text-5xl font-bold mb-8 leading-tight max-w-4xl mx-auto font-quote italic"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                "{team_quote.quote}"
                            </motion.h2>
                            <motion.p 
                                className="text-lg text-gray-400 font-quote"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                - {team_quote.author}
                            </motion.p>
                        </motion.div>
                    </section>
                )}

                {/* Beyond the Desk Gallery */}
                {beyond_desk && beyond_desk.items && beyond_desk.items.length > 0 && (
                    <section className="container px-4 py-24 lg:max-w-7xl mx-auto">
                        <motion.h2 
                            className="text-center text-3xl font-bold mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {beyond_desk.title}
                        </motion.h2>
                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {beyond_desk.items.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={item.image}
                                        alt="Team"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                )}

                {/* Team in Motion Carousel */}
                {team_motion && team_motion.items && team_motion.items.length > 0 && (
                    <section className="bg-background py-24">
                        <div className="px-4">
                            <motion.h2 
                                className="text-center text-3xl font-bold mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                {team_motion.title}
                            </motion.h2>

                            <div className="relative lg:max-w-7xl mx-auto">
                                <Carousel
                                    setApi={setTeamMotionApi}
                                    opts={{
                                        align: "center",
                                        loop: true,
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className="-ml-2 md:-ml-4">
                                        {team_motion.items.map((item, index) => (
                                            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                                <motion.div 
                                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                                                    whileHover={{ y: -10, scale: 1.02 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={`Team Motion ${index + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </motion.div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                                {/* Dot Indicators - only show if more than 1 slide */}
                                {teamMotionCount > 1 && (
                                    <motion.div 
                                        className="flex justify-center gap-2 mt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {Array.from({ length: teamMotionCount }).map((_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => teamMotionApi?.scrollTo(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === teamMotionCurrent
                                                        ? 'bg-primary w-8'
                                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
