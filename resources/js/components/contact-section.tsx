import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter, Globe, X } from 'lucide-react';
import { ContactContent, SiteSettings } from '@/types/cms';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

interface SocialLink { id: number; platform: string; url: string; }

const platformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'facebook':    return <Facebook className="w-4 h-4" />;
        case 'instagram':   return <Instagram className="w-4 h-4" />;
        case 'linkedin':    return <Linkedin className="w-4 h-4" />;
        case 'youtube':     return <Youtube className="w-4 h-4" />;
        case 'twitter / x':
        case 'twitter':
        case 'x':           return <Twitter className="w-4 h-4" />;
        default:            return <Globe className="w-4 h-4" />;
    }
};

export default function ContactSection({ content, siteSettings, footerSocialLinks = [] }: { content?: ContactContent; siteSettings: SiteSettings; footerSocialLinks?: SocialLink[] }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            setIsSubmitting(true);
            
            router.post('/contact', formData, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowSuccess(true);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                    toast.success('Your message has been sent successfully!');
                },
                onError: (errors) => {
                    toast.error('Failed to send message. Please try again.');
                    console.error(errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    return (
        <section id="contact" className="bg-[#111] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            {content?.title ? (
                                <>
                                    {content.title.split(' ').slice(0, -1).join(' ')} <br />
                                    <span className="text-brand">{content.title.split(' ').slice(-1).join(' ')}</span>
                                </>
                            ) : (
                                <>
                                    Let's renovate <br />
                                    <span className="text-brand">world.</span>
                                </>
                            )}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md mb-8">
                            {content?.description || "Ready to start your dream project? Get in touch with us today for a free consultation. Let's turn your vision into reality."}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-brand mt-1" />
                                <div>
                                    <h4 className="font-bold mb-1">Our Location</h4>
                                    <p className="text-gray-400 text-sm whitespace-pre-line">
                                        {content?.address || "House #123, Road #45\nGulshan-2, Dhaka 1212\nBangladesh"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-brand mt-1" />
                                <div>
                                    <h4 className="font-bold mb-1">Phone</h4>
                                    <p className="text-gray-400 text-sm">{content?.phone_primary || "+880 1234-567890"}</p>
                                    {content?.phone_secondary && <p className="text-gray-400 text-sm">{content.phone_secondary}</p>}
                                </div>
                            </div>
                            {(content?.hotline) && (
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 mt-1 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-brand" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 flex items-center gap-2">
                                            Hotline
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand text-white uppercase tracking-wider animate-pulse">24/7</span>
                                        </h4>
                                        <a href={`tel:${content.hotline.replace(/\s/g, '')}`} className="text-brand text-sm font-semibold hover:underline">
                                            {content.hotline}
                                        </a>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-brand mt-1" />
                                <div>
                                    <h4 className="font-bold mb-1">Email</h4>
                                    <p className="text-gray-400 text-sm">
                                        {content?.email_primary || "info@mechanixinterior.com"}
                                    </p>
                                    {content?.email_secondary && (
                                        <p className="text-gray-400 text-sm">
                                            {content.email_secondary}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Form */}
                    <div className="bg-[#1a1a1a] p-8 md:p-12 rounded-xl relative">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {content?.form_name_label || 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {content?.form_email_label || 'Email'}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {content?.form_phone_label || 'Phone Number'}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-all duration-300"
                                    placeholder="+880 XXXX-XXXXXX"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {content?.form_message_label || 'Your Message'}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E63946] transition-all duration-300 resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand text-brand-foreground py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#c2303a] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : (content?.form_submit_text || 'Send Message')}
                            </button>
                        </form>

                        {/* Success Message Box */}
                        {showSuccess && (
                            <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl flex items-center justify-center p-8 transition-all duration-300">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="text-brand hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6 mx-auto" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <p>{content?.copyright_text || siteSettings?.copyrightText || "© 2025 Mechanix Interior. All rights reserved."}</p>
                        <p className="hidden md:block">|</p>
                        <p>Design &amp; Developed by <a href="https://alphainno.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Alphainno</a></p>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {footerSocialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label={link.platform}
                            >
                                {platformIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
