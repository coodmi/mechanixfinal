import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface ContactPageProps {
    content: {
        hero_title: string; hero_subtitle: string;
        phone_primary: string; phone_secondary: string; hotline: string;
        email_primary: string; email_secondary: string;
        address: string;
        office_hours_mon_fri: string; office_hours_sat: string; office_hours_sun: string;
    };
}

export default function AdminContactPage({ content }: ContactPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        hero_title:           content?.hero_title           || 'Contact Us',
        hero_subtitle:        content?.hero_subtitle        || "Have questions? We'd love to hear from you.",
        phone_primary:        content?.phone_primary        || '',
        phone_secondary:      content?.phone_secondary      || '',
        hotline:              content?.hotline              || '',
        email_primary:        content?.email_primary        || '',
        email_secondary:      content?.email_secondary      || '',
        address:              content?.address              || '',
        office_hours_mon_fri: content?.office_hours_mon_fri || 'Monday - Friday: 9:00 AM - 6:00 PM',
        office_hours_sat:     content?.office_hours_sat     || 'Saturday: 10:00 AM - 4:00 PM',
        office_hours_sun:     content?.office_hours_sun     || 'Sunday: Closed',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/contact-page', {
            onSuccess: () => toast.success('Contact page updated successfully!'),
            onError:   () => toast.error('Failed to update. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Contact Page', href: '/admin/contact-page' }]}>
            <Head title="Contact Page" />
            <div className="p-4 max-w-3xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Contact Page</h1>
                    <p className="text-muted-foreground">Manage all content on the public contact page.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">

                    {/* Hero */}
                    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-lg">Hero Section</h2>
                        <div className="space-y-2">
                            <Label>Page Title</Label>
                            <Input value={data.hero_title} onChange={(e) => setData('hero_title', e.target.value)} placeholder="Contact Us" />
                        </div>
                        <div className="space-y-2">
                            <Label>Subtitle</Label>
                            <Input value={data.hero_subtitle} onChange={(e) => setData('hero_subtitle', e.target.value)} placeholder="Have questions? We'd love to hear from you." />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-lg flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Numbers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Primary Phone</Label>
                                <Input value={data.phone_primary} onChange={(e) => setData('phone_primary', e.target.value)} placeholder="+880 1234-567890" />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Phone (Optional)</Label>
                                <Input value={data.phone_secondary} onChange={(e) => setData('phone_secondary', e.target.value)} placeholder="+880 1987-654321" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Hotline (24/7)</Label>
                            <Input value={data.hotline} onChange={(e) => setData('hotline', e.target.value)} placeholder="+880 1800-000000" />
                            <p className="text-xs text-muted-foreground">Leave empty to hide the hotline.</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-lg flex items-center gap-2"><Mail className="w-4 h-4" /> Email Addresses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Primary Email</Label>
                                <Input type="email" value={data.email_primary} onChange={(e) => setData('email_primary', e.target.value)} placeholder="info@mechanixinterior.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Email (Optional)</Label>
                                <Input type="email" value={data.email_secondary} onChange={(e) => setData('email_secondary', e.target.value)} placeholder="hello@mechanixinterior.com" />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-lg flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</h2>
                        <div className="space-y-2">
                            <Label>Physical Address</Label>
                            <Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={3} placeholder="House #123, Road #45&#10;Gulshan-2, Dhaka 1212&#10;Bangladesh" />
                            <p className="text-xs text-muted-foreground">Each line will show as a separate address entry.</p>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-lg flex items-center gap-2"><Clock className="w-4 h-4" /> Office Hours</h2>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Label>Monday - Friday</Label>
                                <Input value={data.office_hours_mon_fri} onChange={(e) => setData('office_hours_mon_fri', e.target.value)} placeholder="Monday - Friday: 9:00 AM - 6:00 PM" />
                            </div>
                            <div className="space-y-2">
                                <Label>Saturday</Label>
                                <Input value={data.office_hours_sat} onChange={(e) => setData('office_hours_sat', e.target.value)} placeholder="Saturday: 10:00 AM - 4:00 PM" />
                            </div>
                            <div className="space-y-2">
                                <Label>Sunday</Label>
                                <Input value={data.office_hours_sun} onChange={(e) => setData('office_hours_sun', e.target.value)} placeholder="Sunday: Closed" />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full md:w-auto">
                        <Save className="w-4 h-4 mr-2" /> Save All Changes
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
