import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import PageHeroSection from '@/components/page-hero-section';
import { Head, Link } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { ArrowRight, CheckCircle2, Users, Lightbulb, Handshake, ShieldCheck, Activity, Code, Database, Rocket, Layout, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
    image?: string;
    order: number;
}

interface AboutUsProps extends CMSPageProps {
    page_hero: any;
    main: any;
    stats: { items: PageItem[] };
    ceo_vision: any;
    quote: { text: string; author: string; author_title: string; image: string } | null;
    values: { title: string; description: string; items: PageItem[] };
    process: { title: string; description: string; items: PageItem[] };
    certificates: { title: string; description: string; items: PageItem[] };
    affiliations: { title: string; description: string; items: PageItem[] };
    cta: any;
}

const IconMap: Record<string, any> = {
    Users,
    Lightbulb,
    Handshake,
    ShieldCheck,
    Activity,
    Code,
    Database,
    Rocket,
    Layout,
    Search
};

export default function AboutUs(props: AboutUsProps) {
    const { page_hero, main, stats, ceo_vision, quote, values, process, certificates, affiliations, cta } = props;

    const renderIcon = (iconName: string | undefined) => {
        if (!iconName || !IconMap[iconName]) return <CheckCircle2 className="w-6 h-6 text-primary" />;
        const Icon = IconMap[iconName];
        return <Icon className="w-6 h-6 text-primary" />;
    };

    return (
        <>
            <Head title="About Us - Mechanix Interior">
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

                {/* Stats Section */}
                {stats?.items && stats.items.length > 0 && (
                    <section className="bg-primary/5 py-16">
                        <motion.div 
                            className="container mx-auto px-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                                {stats.items.map((stat) => (
                                    <motion.div 
                                        key={stat.id} 
                                        className="space-y-2"
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.5 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                    >
                                        <motion.h3 
                                            className="text-4xl font-bold text-primary"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        >
                                            {stat.title}
                                        </motion.h3>
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* CEO Vision Section */}
                {ceo_vision && (
                    <section className="container mx-auto px-4 py-24">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <motion.div 
                                className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-muted order-2 lg:order-1"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src={assetUrl(ceo_vision.image) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop'}
                                    alt="CEO Vision"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                            <motion.div 
                                className="space-y-8 order-1 lg:order-2"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold">{ceo_vision.title || "CEO's Vision"}</h2>
                                <blockquote className="text-2xl font-medium italic text-foreground/80 border-l-4 border-primary pl-6 font-quote">
                                    "{ceo_vision.quote}"
                                </blockquote>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {ceo_vision.description}
                                </p>
                                {ceo_vision.button_text && (
                                    <Link href={ceo_vision.button_link || '#'} className="inline-flex items-center text-primary font-semibold hover:underline">
                                        {ceo_vision.button_text} <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Quote Section */}
                {quote?.text && (
                    <section className="relative py-24 overflow-hidden">
                        {quote.image && (
                            <img
                                src={assetUrl(quote.image)}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        <div className={`absolute inset-0 ${quote.image ? 'bg-black/60' : 'bg-gray-900'}`} />
                        <motion.div
                            className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7 }}
                        >
                            <blockquote className="text-2xl md:text-3xl font-medium italic font-quote leading-relaxed">
                                "{quote.text}"
                            </blockquote>
                            {(quote.author || quote.author_title) && (
                                <p className="text-sm text-gray-300 tracking-wide">
                                    {quote.author && <span className="font-semibold">{quote.author}</span>}
                                    {quote.author && quote.author_title && ' — '}
                                    {quote.author_title && <span>{quote.author_title}</span>}
                                </p>
                            )}
                        </motion.div>
                    </section>
                )}

                {/* Values Section */}
                {values && (
                    <section className="bg-background py-24">
                        <div className="container mx-auto px-4">
                            <motion.div 
                                className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold">{values.title || 'Core Values'}</h2>
                                <p className="text-muted-foreground text-lg">{values.description}</p>
                            </motion.div>
                            <motion.div 
                                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                                {values.items?.map((value) => (
                                    <motion.div 
                                        key={value.id} 
                                        className="bg-background p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div 
                                            className="mb-6 p-3 bg-primary/10 w-fit rounded-lg"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {renderIcon(value.icon)}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Process Section */}
                {process && (
                    <section className="container mx-auto px-4 py-24">
                        <motion.div 
                            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold">{process.title || 'Our Process'}</h2>
                            <p className="text-muted-foreground text-lg">{process.description}</p>
                        </motion.div>
                        <motion.div 
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            {process.items?.map((item, index) => (
                                <motion.div 
                                    key={item.id} 
                                    className="relative p-6 border rounded-xl hover:border-primary/50 transition-colors group"
                                    variants={{
                                        hidden: { opacity: 0, y: 30, scale: 0.9 },
                                        visible: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div 
                                        className="absolute -top-4 -left-4 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary text-lg shadow-sm"
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                                    >
                                        {index + 1}
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-3 mt-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                )}

                {/* Certificates & Affiliations */}
                <section className="bg-muted/30 py-24">
                    <div className="container mx-auto px-4 space-y-20">
                        {/* Certificates */}
                        {certificates && certificates.items && certificates.items.length > 0 && (
                            <div className="space-y-12">
                                <motion.div 
                                    className="text-center space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold">{certificates.title || 'Certificates'}</h2>
                                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{certificates.description}</p>
                                </motion.div>
                                <motion.div 
                                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
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
                                    {certificates.items?.map((cert, index) => (
                                        <motion.div 
                                            key={cert.id} 
                                            className="aspect-[4/3] bg-white rounded-xl border-2 shadow-sm hover:shadow-xl flex items-center justify-center p-6 overflow-hidden group cursor-pointer"
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.5 },
                                                visible: { opacity: 1, scale: 1 }
                                            }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img 
                                                src={assetUrl(cert.image) || `https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=200&fit=crop&auto=format&q=80&cert=${index}`}
                                                alt={`Certificate ${index + 1}`}
                                                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop&auto=format&q=80';
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                        {/* Affiliations */}
                        {affiliations && affiliations.items && affiliations.items.length > 0 && (
                            <div className="space-y-12">
                                <motion.div 
                                    className="text-center space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold">{affiliations.title || 'Affiliations'}</h2>
                                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{affiliations.description}</p>
                                </motion.div>
                                <motion.div 
                                    className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.08
                                            }
                                        }
                                    }}
                                >
                                    {affiliations.items?.map((aff, index) => (
                                        <motion.div 
                                            key={aff.id} 
                                            className="aspect-[4/3] bg-white rounded-xl border-2 shadow-sm hover:shadow-xl flex items-center justify-center p-6 overflow-hidden group cursor-pointer"
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.5 },
                                                visible: { opacity: 1, scale: 1 }
                                            }}
                                            whileHover={{ scale: 1.05, y: -5, rotate: -2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img 
                                                src={assetUrl(aff.image) || `https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=200&fit=crop&auto=format&q=80&aff=${index}`}
                                                alt={`Affiliation ${index + 1}`}
                                                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format&q=80';
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                {cta && (
                    <section className="container mx-auto px-4 py-24">
                        <motion.div 
                            className="bg-primary rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                                <motion.h2 
                                    className="text-3xl md:text-4xl font-bold leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {cta.title || 'Ready to start your project?'}
                                </motion.h2>
                                {cta.button_text && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <Link href={cta.button_link || '#contact'}>
                                            <motion.button 
                                                className="bg-background text-foreground px-8 py-4 rounded-full font-bold hover:bg-muted transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {cta.button_text}
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                            {/* Decorative circles */}
                            <motion.div 
                                className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div 
                                className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2
                                }}
                            />
                        </motion.div>
                    </section>
                )}

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
