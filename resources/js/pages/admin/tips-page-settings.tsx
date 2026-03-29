import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface TipsPageSettingsProps {
    settings: {
        page_title: string;
        page_subtitle: string;
        meta_title: string;
        meta_description: string;
    };
}

export default function TipsPageSettings({ settings }: TipsPageSettingsProps) {
    const form = useForm({
        page_title: settings.page_title || 'Design Tips & Insights',
        page_subtitle: settings.page_subtitle || 'Expert advice for creating beautiful spaces',
        meta_title: settings.meta_title || 'Design Tips - Mechanix Interior',
        meta_description: settings.meta_description || 'Discover expert interior design tips and insights from Mechanix Interior.',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post('/admin/tips-page-settings', {
            onSuccess: () => toast.success('Page settings updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Tips Page', href: '/admin/tips' },
            { title: 'Page Settings', href: '/admin/tips-page-settings' }
        ]}>
            <Head title="Tips Page Settings" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tips Page Settings</h1>
                        <p className="text-muted-foreground">
                            Manage the content displayed on the Tips page.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Page Content</h2>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="page_title">Page Title</Label>
                            <Input
                                id="page_title"
                                value={form.data.page_title}
                                onChange={(e) => form.setData('page_title', e.target.value)}
                                placeholder="Design Tips & Insights"
                            />
                            {form.errors.page_title && <p className="text-sm text-destructive">{form.errors.page_title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="page_subtitle">Page Subtitle</Label>
                            <Textarea
                                id="page_subtitle"
                                value={form.data.page_subtitle}
                                onChange={(e) => form.setData('page_subtitle', e.target.value)}
                                placeholder="Expert advice to help you create your dream space."
                                rows={3}
                            />
                            {form.errors.page_subtitle && <p className="text-sm text-destructive">{form.errors.page_subtitle}</p>}
                        </div>

                        {/* <div className="border-t pt-6">
                            <h3 className="text-md font-medium mb-4">SEO Settings</h3>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={form.data.meta_title}
                                        onChange={(e) => form.setData('meta_title', e.target.value)}
                                        placeholder="Design Tips - Mechanix Interior"
                                    />
                                    {form.errors.meta_title && <p className="text-sm text-destructive">{form.errors.meta_title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        value={form.data.meta_description}
                                        onChange={(e) => form.setData('meta_description', e.target.value)}
                                        placeholder="Get expert interior design tips and insights."
                                        rows={3}
                                    />
                                    {form.errors.meta_description && <p className="text-sm text-destructive">{form.errors.meta_description}</p>}
                                </div>
                            </div>
                        </div> */}

                        <Button type="submit" disabled={form.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Settings
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
