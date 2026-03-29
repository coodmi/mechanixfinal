import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    settings: { title: string; subtitle: string; enabled: boolean; };
}

export default function HomeBlogsSection({ settings }: Props) {
    const { data, setData, post, processing } = useForm({
        title:    settings?.title    || 'Blogs & Articles',
        subtitle: settings?.subtitle || 'Stay updated with the latest interior design news, tips and insights.',
        enabled:  settings?.enabled  ?? true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/home-sections/blogs', {
            onSuccess: () => toast.success('Blogs section settings saved!'),
            onError:   () => toast.error('Failed to save.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Home Page Sections', href: '/admin/hero' }, { title: 'Blogs Section', href: '/admin/home-sections/blogs' }]}>
            <Head title="Blogs Section Settings" />
            <div className="p-4 max-w-2xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Blogs Section</h1>
                    <p className="text-muted-foreground">Configure the Blogs & Articles section on the home page.</p>
                </div>
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Section Title</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Blogs & Articles" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Section Subtitle</Label>
                            <Input id="subtitle" value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} placeholder="Stay updated with the latest..." />
                        </div>
                        <div className="flex items-center justify-between border rounded-lg p-4">
                            <div>
                                <p className="font-medium">Show on Home Page</p>
                                <p className="text-sm text-muted-foreground">Toggle to show or hide this section.</p>
                            </div>
                            <Switch checked={data.enabled} onCheckedChange={(v) => setData('enabled', v)} />
                        </div>
                        <Button type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
