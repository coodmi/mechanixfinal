import { useState, FormEvent } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, Facebook, Instagram, Linkedin, Youtube, Twitter, Globe, X, Send } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { NavigationItem, SiteSettings } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
}

interface HeaderSettings {
    ctaButtonText: string;
    ctaButtonLink: string;
    socialLinks?: SocialLink[];
}

const platformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'facebook':   return Facebook;
        case 'instagram':  return Instagram;
        case 'linkedin':   return Linkedin;
        case 'youtube':    return Youtube;
        case 'twitter':
        case 'x':          return Twitter;
        default:           return Globe;
    }
};

function ContactModal({ open, onClose, ctaText }: { open: boolean; onClose: () => void; ctaText: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post('/contact', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', message: '' });
                onClose();
            },
            onError: () => toast.error('Failed to send message. Please try again.'),
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl p-0 overflow-hidden">
                {/* Header */}
                <div className="bg-primary px-6 py-5">
                    <DialogHeader>
                        <DialogTitle className="text-primary-foreground text-xl font-bold">
                            {ctaText || 'Get in Touch'}
                        </DialogTitle>
                        <p className="text-primary-foreground/70 text-sm mt-1">
                            Fill in the form and we'll get back to you shortly.
                        </p>
                    </DialogHeader>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+880..."
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Message *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Tell us about your project..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-60"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function Navbar({ navigation, siteSettings, headerSettings }: {
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const socialLinks = headerSettings?.socialLinks ?? [];

    const ctaText = headerSettings?.ctaButtonText || 'Get in Touch';
    const ctaLink = headerSettings?.ctaButtonLink || '#contact';
    // If link is a hash/anchor, open popup; otherwise navigate
    const ctaIsPopup = ctaLink.startsWith('#') || ctaLink === '';

    return (
        <>
            <nav className="fixed w-full z-50 transition-all duration-300 pt-6">
                <div className="lg:max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center bg-white rounded-full shadow-xl max-w-[95%] md:max-w-[80%]">
                    {/* Logo */}
                    <Link href="/" className="z-50 relative">
                        <img
                            src={`${assetUrl(siteSettings?.logoUrl) || '/logo.png'}?v=${siteSettings?.logoVersion || ''}`}
                            alt={siteSettings?.companyName || 'MECHANIX'}
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Centered Desktop Links */}
                    <div className="hidden lg:flex space-x-8 items-center text-sm font-medium text-gray-700">
                        {navigation.map((item) => {
                            if (item.children && item.children.length > 0) {
                                return (
                                    <NavigationMenu key={item.id} viewport={false}>
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-foreground transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                                                    {item.label}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="flex flex-col w-[200px] gap-1 p-2">
                                                        {item.children.map((child) => (
                                                            <li key={child.id}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link href={child.href || '#'} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                                        <div className="text-sm font-medium leading-none">{child.label}</div>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                );
                            }
                            return (
                                <Link key={item.id} href={item.href || '#'} className="hover:text-foreground transition-colors">
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Icons & Button — Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {socialLinks.length > 0 && (
                            <div className="flex items-center space-x-3">
                                {socialLinks.map((link) => {
                                    const Icon = platformIcon(link.platform);
                                    return (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                                            <Icon className="w-5 h-5 text-gray-600 hover:text-foreground transition-colors cursor-pointer" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                        {ctaIsPopup ? (
                            <button
                                onClick={() => setContactOpen(true)}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl"
                            >
                                {ctaText}
                            </button>
                        ) : (
                            <a
                                href={ctaLink}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl"
                            >
                                {ctaText}
                            </a>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <button className="z-50 text-foreground focus:outline-none">
                                <Menu className="w-8 h-8" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-primary border-l border-gray-800 px-10">
                            <div className="flex flex-col space-y-6 mt-8">
                                {navigation.map((item) => {
                                    if (item.children && item.children.length > 0) {
                                        return (
                                            <Accordion key={item.id} type="single" collapsible className="border-none">
                                                <AccordionItem value={`item-${item.id}`} className="border-none">
                                                    <AccordionTrigger className="text-2xl font-display font-bold text-primary-foreground hover:text-brand py-0 hover:no-underline">
                                                        {item.label}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pl-4">
                                                        <div className="flex flex-col space-y-4 mt-2">
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.id}
                                                                    href={child.href || '#'}
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                    className="text-xl font-display font-semibold text-primary-foreground/80 hover:text-brand transition-colors"
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href || '#'}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl font-display font-bold text-primary-foreground hover:text-brand transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}

                                {socialLinks.length > 0 && (
                                    <div className="flex items-center space-x-5 pt-2">
                                        {socialLinks.map((link) => {
                                            const Icon = platformIcon(link.platform);
                                            return (
                                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform} onClick={() => setIsMenuOpen(false)}>
                                                    <Icon className="w-6 h-6 text-primary-foreground hover:text-brand transition-colors" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Mobile CTA Button — after social icons */}
                                <button
                                    onClick={() => { setIsMenuOpen(false); setContactOpen(true); }}
                                    className="w-max px-5 py-2.5 bg-white text-primary rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all duration-300 shadow-md"
                                >
                                    {ctaText}
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Contact Popup */}
            <ContactModal
                open={contactOpen}
                onClose={() => setContactOpen(false)}
                ctaText={ctaText}
            />
        </>
    );
}
