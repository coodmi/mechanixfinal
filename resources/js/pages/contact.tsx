import Navbar from '@/components/site-header';
import { Head, router } from '@inertiajs/react';
import { NavigationItem, SiteSettings, ContactContent } from '@/types/cms';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import ContactSection from '@/components/contact-section';

interface SocialLink { id: number; platform: string; url: string; }
interface HeaderSettings { ctaButtonText: string; ctaButtonLink: string; socialLinks?: SocialLink[]; }

interface ContactPageProps {
    navigation: NavigationItem[];
    siteSettings: SiteSettings;
    headerSettings: HeaderSettings;
    contact?: ContactContent;
    footerSocialLinks?: SocialLink[];
    pageSettings?: { hero_title: string; hero_subtitle: string; office_hours_mon_fri: string; office_hours_sat: string; office_hours_sun: string; };
}

export default function ContactPage({ navigation, siteSettings, headerSettings, contact, footerSocialLinks = [], pageSettings }: ContactPageProps) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/contact', form, {
            onSuccess: () => {
                toast.success('Message sent! We\'ll be in touch soon.');
                setForm({ name: '', email: '', phone: '', message: '' });
            },
            onError: () => toast.error('Failed to send. Please try again.'),
            onFinish: () => setSubmitting(false),
        });
    };

    const phone1   = contact?.phone_primary   || '+880 1234-567890';
    const phone2   = contact?.phone_secondary;
    const email1   = contact?.email_primary   || 'info@mechanixinterior.com';
    const email2   = contact?.email_secondary;
    const address  = contact?.address         || 'House #123, Road #45\nGulshan-2, Dhaka 1212\nBangladesh';
    const hotline  = (contact as any)?.hotline;

    return (
        <>
            <Head title="Contact Us | Mechanix Interior" />
            <div className="antialiased min-h-screen bg-[#f5f5f5]">
                <Navbar navigation={navigation} siteSettings={siteSettings} headerSettings={headerSettings} />

                {/* Hero */}
                <section className="bg-primary pt-32 pb-20 px-4 text-center">
                    <p className="text-primary-foreground/60 text-xs font-bold uppercase tracking-widest mb-3">CONTACT</p>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4">{pageSettings?.hero_title || 'Contact Us'}</h1>
                    <p className="text-primary-foreground/70 text-base max-w-md mx-auto">{pageSettings?.hero_subtitle || "Have questions? We'd love to hear from you."}</p>
                </section>

                {/* Main Content */}
                <section className="py-16 px-4 md:px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                                    <input
                                        type="text" required value={form.name}
                                        onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                                    <input
                                        type="email" required value={form.email}
                                        onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                                    <input
                                        type="tel" value={form.phone}
                                        onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Message</label>
                                    <textarea
                                        required rows={5} value={form.message}
                                        onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit" disabled={submitting}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
                                >
                                    <Send className="w-4 h-4" />
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Phone className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Phone</p>
                                            <a href={`tel:${phone1.replace(/\s/g,'')}`} className="text-gray-500 text-sm hover:text-primary">{phone1}</a>
                                            {phone2 && <><br /><a href={`tel:${phone2.replace(/\s/g,'')}`} className="text-gray-500 text-sm hover:text-primary">{phone2}</a></>}
                                        </div>
                                    </div>
                                    {hotline && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                                <Phone className="w-4 h-4 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">Hotline <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">24/7</span></p>
                                                <a href={`tel:${hotline.replace(/\s/g,'')}`} className="text-red-600 text-sm font-semibold hover:underline">{hotline}</a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Email</p>
                                            <a href={`mailto:${email1}`} className="text-gray-500 text-sm hover:text-primary">{email1}</a>
                                            {email2 && <><br /><a href={`mailto:${email2}`} className="text-gray-500 text-sm hover:text-primary">{email2}</a></>}
                                        </div>
                                    </div>
                                    {address.split('\n').filter(Boolean).map((line, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <MapPin className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">Address</p>
                                                <p className="text-gray-500 text-sm">{line}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Office Hours</h3>
                                </div>
                                <div className="space-y-2 text-primary-foreground/80 text-sm">
                                    <p>{pageSettings?.office_hours_mon_fri || 'Monday - Friday: 9:00 AM - 6:00 PM'}</p>
                                    <p>{pageSettings?.office_hours_sat     || 'Saturday: 10:00 AM - 4:00 PM'}</p>
                                    <p>{pageSettings?.office_hours_sun     || 'Sunday: Closed'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactSection content={contact} siteSettings={siteSettings} footerSocialLinks={footerSocialLinks} />
            </div>
        </>
    );
}
