import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Phone, Mail, MapPin } from 'lucide-react';
import { FormEventHandler } from 'react';
import { ContactContent } from '@/types/cms';
import { toast } from 'sonner';

interface ContactProps {
    content: ContactContent;
}

export default function Contact({ content }: ContactProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: content?.title || "Let's renovate world.",
        description: content?.description || "Ready to start your dream project? Get in touch with us today for a free consultation. Let's turn your vision into reality.",
        address: content?.address || "House #123, Road #45\nGulshan-2, Dhaka 1212\nBangladesh",
        phone_primary: content?.phone_primary || '+880 1234-567890',
        phone_secondary: content?.phone_secondary || '',
        email_primary: content?.email_primary || 'info@mechanixinterior.com',
        email_secondary: content?.email_secondary || '',
        hotline: content?.hotline || '',
        form_name_label: content?.form_name_label || 'Full Name',
        form_email_label: content?.form_email_label || 'Email',
        form_phone_label: content?.form_phone_label || 'Phone Number',
        form_message_label: content?.form_message_label || 'Your Message',
        form_submit_text: content?.form_submit_text || 'Send Message',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/contact', {
            onSuccess: () => toast.success('Contact information updated successfully!'),
            onError: () => toast.error('Failed to update contact information. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Contact Section', href: '/admin/contact' }]}>
            <Head title="Contact Section" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Contact Section</h1>
                        <p className="text-muted-foreground">
                            Manage the contact information displayed on your homepage.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Section Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Get In Touch"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="We'd love to hear from you..."
                                rows={4}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Address
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="address">Physical Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="123 Main Street, City, Country"
                                    rows={3}
                                />
                                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Phone Numbers
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone_primary">Primary Phone</Label>
                                    <Input
                                        id="phone_primary"
                                        type="tel"
                                        value={data.phone_primary}
                                        onChange={(e) => setData('phone_primary', e.target.value)}
                                        placeholder="+1 234 567 8900"
                                    />
                                    {errors.phone_primary && (
                                        <p className="text-sm text-destructive">{errors.phone_primary}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone_secondary">Secondary Phone (Optional)</Label>
                                    <Input
                                        id="phone_secondary"
                                        type="tel"
                                        value={data.phone_secondary}
                                        onChange={(e) => setData('phone_secondary', e.target.value)}
                                        placeholder="+1 234 567 8901"
                                    />
                                    {errors.phone_secondary && (
                                        <p className="text-sm text-destructive">{errors.phone_secondary}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Email Addresses
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email_primary">Primary Email</Label>
                                    <Input
                                        id="email_primary"
                                        type="email"
                                        value={data.email_primary}
                                        onChange={(e) => setData('email_primary', e.target.value)}
                                        placeholder="info@mechanix.com"
                                    />
                                    {errors.email_primary && (
                                        <p className="text-sm text-destructive">{errors.email_primary}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email_secondary">Secondary Email (Optional)</Label>
                                    <Input
                                        id="email_secondary"
                                        type="email"
                                        value={data.email_secondary}
                                        onChange={(e) => setData('email_secondary', e.target.value)}
                                        placeholder="support@mechanix.com"
                                    />
                                    {errors.email_secondary && (
                                        <p className="text-sm text-destructive">{errors.email_secondary}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                🔴 Hotline
                            </h3>
                            <div className="space-y-2 max-w-sm">
                                <Label htmlFor="hotline">Hotline Number</Label>
                                <Input
                                    id="hotline"
                                    type="tel"
                                    value={data.hotline}
                                    onChange={(e) => setData('hotline', e.target.value)}
                                    placeholder="+880 1800-000000"
                                />
                                <p className="text-xs text-muted-foreground">Displayed with a 24/7 badge. Leave empty to hide.</p>
                                {errors.hotline && <p className="text-sm text-destructive">{errors.hotline}</p>}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Contact Form Labels</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="form_name_label">Name Field Label</Label>
                                    <Input
                                        id="form_name_label"
                                        value={data.form_name_label}
                                        onChange={(e) => setData('form_name_label', e.target.value)}
                                        placeholder="Full Name"
                                    />
                                    {errors.form_name_label && (
                                        <p className="text-sm text-destructive">{errors.form_name_label}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="form_email_label">Email Field Label</Label>
                                    <Input
                                        id="form_email_label"
                                        value={data.form_email_label}
                                        onChange={(e) => setData('form_email_label', e.target.value)}
                                        placeholder="Email"
                                    />
                                    {errors.form_email_label && (
                                        <p className="text-sm text-destructive">{errors.form_email_label}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="form_phone_label">Phone Field Label</Label>
                                    <Input
                                        id="form_phone_label"
                                        value={data.form_phone_label}
                                        onChange={(e) => setData('form_phone_label', e.target.value)}
                                        placeholder="Phone Number"
                                    />
                                    {errors.form_phone_label && (
                                        <p className="text-sm text-destructive">{errors.form_phone_label}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="form_message_label">Message Field Label</Label>
                                    <Input
                                        id="form_message_label"
                                        value={data.form_message_label}
                                        onChange={(e) => setData('form_message_label', e.target.value)}
                                        placeholder="Your Message"
                                    />
                                    {errors.form_message_label && (
                                        <p className="text-sm text-destructive">{errors.form_message_label}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="form_submit_text">Submit Button Text</Label>
                                    <Input
                                        id="form_submit_text"
                                        value={data.form_submit_text}
                                        onChange={(e) => setData('form_submit_text', e.target.value)}
                                        placeholder="Send Message"
                                    />
                                    {errors.form_submit_text && (
                                        <p className="text-sm text-destructive">{errors.form_submit_text}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button type="submit" disabled={processing}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
