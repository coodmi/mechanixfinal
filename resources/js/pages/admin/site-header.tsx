import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface SiteHeaderSettingsProps {
    settings: {
        facebook_url: string;
        facebook_icon_visible: boolean;
        cta_button_text: string;
        cta_button_link: string;
    };
}

export default function SiteHeaderSettings({ settings }: SiteHeaderSettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        facebook_url: settings?.facebook_url || 'https://www.facebook.com/mechanixinterior',
        facebook_icon_visible: settings?.facebook_icon_visible ?? true,
        cta_button_text: settings?.cta_button_text || 'Get in Touch',
        cta_button_link: settings?.cta_button_link || '#contact',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/site-header', {
            onSuccess: () => toast.success('Header settings saved successfully!'),
            onError: () => toast.error('Failed to save header settings. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Site Header', href: '/admin/site-header' }]}>
            <Head title="Site Header Settings" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Site Header Settings</h1>
                        <p className="text-muted-foreground">
                            Manage navigation header elements and call-to-action button.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Social Media</h3>

                            <div className="space-y-2">
                                <Label htmlFor="facebook_url">Facebook URL</Label>
                                <Input
                                    id="facebook_url"
                                    value={data.facebook_url}
                                    onChange={(e) => setData('facebook_url', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                />
                                {errors.facebook_url && <p className="text-sm text-destructive">{errors.facebook_url}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="facebook_icon_visible"
                                    checked={data.facebook_icon_visible}
                                    onCheckedChange={(checked) => setData('facebook_icon_visible', checked)}
                                />
                                <Label htmlFor="facebook_icon_visible" className="cursor-pointer">
                                    Show Facebook icon in header
                                </Label>
                            </div>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                            <h3 className="text-lg font-semibold">Call-to-Action Button</h3>

                            <div className="space-y-2">
                                <Label htmlFor="cta_button_text">Button Text</Label>
                                <Input
                                    id="cta_button_text"
                                    value={data.cta_button_text}
                                    onChange={(e) => setData('cta_button_text', e.target.value)}
                                    placeholder="Get in Touch"
                                />
                                {errors.cta_button_text && <p className="text-sm text-destructive">{errors.cta_button_text}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cta_button_link">Button Link</Label>
                                <Input
                                    id="cta_button_link"
                                    value={data.cta_button_link}
                                    onChange={(e) => setData('cta_button_link', e.target.value)}
                                    placeholder="#contact"
                                />
                                {errors.cta_button_link && <p className="text-sm text-destructive">{errors.cta_button_link}</p>}
                                <p className="text-xs text-muted-foreground">
                                    Use a hash anchor (#contact) or a full URL (/contact)
                                </p>
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
