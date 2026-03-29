import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { assetUrl } from '@/lib/asset-url';

interface SiteSettingsProps {
    settings: {
        logo_url: string;
        favicon_url: string;
    };
}

export default function SiteSettings({ settings }: SiteSettingsProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        logo: null as File | null,
        favicon: null as File | null,
    });

    const [logoPreview, setLogoPreview] = useState<string>('');
    const [faviconPreview, setFaviconPreview] = useState<string>('');

    // Sync previews whenever settings props change (e.g. after save + redirect)
    useEffect(() => {
        setLogoPreview(assetUrl(settings?.logo_url) || '/logo.png');
    }, [settings?.logo_url]);

    useEffect(() => {
        setFaviconPreview(assetUrl(settings?.favicon_url) || '/favicon.ico');
    }, [settings?.favicon_url]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast.success('Settings saved successfully.');
            },
            onError: (errs) => {
                const msg = Object.values(errs).flat().join(', ');
                toast.error(msg || 'Failed to save settings.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Site Settings', href: '/admin/settings' }]}>
            <Head title="Site Settings" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
                        <p className="text-muted-foreground">Manage global website settings and configuration.</p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Logo */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo</Label>
                            <div className="flex items-center gap-4">
                                <div className="border rounded-md p-3 bg-background w-36 h-20 flex items-center justify-center shrink-0">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="max-h-14 max-w-[130px] w-auto object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">No logo</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('logo', file);
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        PNG or SVG, max 5MB. Used in header, footer, admin panel, and login page.
                                    </p>
                                </div>
                            </div>
                            {errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
                        </div>

                        {/* Favicon */}
                        <div className="space-y-2">
                            <Label htmlFor="favicon">Favicon</Label>
                            <div className="flex items-center gap-4">
                                <div className="border rounded-md p-3 bg-background w-16 h-16 flex items-center justify-center shrink-0">
                                    {faviconPreview ? (
                                        <img
                                            src={faviconPreview}
                                            alt="Favicon Preview"
                                            className="h-8 w-8 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">None</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        id="favicon"
                                        type="file"
                                        accept="image/x-icon,image/png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('favicon', file);
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setFaviconPreview(ev.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        .ico or .png, 32×32 or 16×16 pixels recommended.
                                    </p>
                                </div>
                            </div>
                            {errors.favicon && <p className="text-sm text-destructive">{errors.favicon}</p>}
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={processing}>
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
