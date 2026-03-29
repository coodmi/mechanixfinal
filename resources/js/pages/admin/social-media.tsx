import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Globe, Plus, Trash2, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
}

interface Props {
    links: SocialLink[];
}

const PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter / X', 'Other'];

const platformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'facebook':    return <Facebook className="w-5 h-5" />;
        case 'instagram':   return <Instagram className="w-5 h-5" />;
        case 'linkedin':    return <Linkedin className="w-5 h-5" />;
        case 'youtube':     return <Youtube className="w-5 h-5" />;
        case 'twitter / x':
        case 'twitter':
        case 'x':           return <Twitter className="w-5 h-5" />;
        default:            return <Globe className="w-5 h-5" />;
    }
};

const platformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'facebook':    return 'bg-blue-100 text-blue-600';
        case 'instagram':   return 'bg-pink-100 text-pink-600';
        case 'linkedin':    return 'bg-sky-100 text-sky-700';
        case 'youtube':     return 'bg-red-100 text-red-600';
        case 'twitter / x':
        case 'twitter':
        case 'x':           return 'bg-gray-100 text-gray-700';
        default:            return 'bg-purple-100 text-purple-600';
    }
};

export default function SocialMedia({ links }: Props) {
    // Add form
    const { data, setData, post, processing, errors, reset } = useForm({
        platform: '',
        url: '',
    });

    // Inline edit state: { [id]: url }
    const [editUrls, setEditUrls] = useState<Record<number, string>>(
        Object.fromEntries(links.map((l) => [l.id, l.url]))
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/social-media', {
            onSuccess: () => {
                toast.success(`${data.platform} link added.`);
                reset();
            },
            onError: () => toast.error('Please fill in all fields correctly.'),
        });
    };

    const saveLink = (link: SocialLink) => {
        router.put(`/admin/social-media/${link.id}`, {
            platform: link.platform,
            url: editUrls[link.id] ?? link.url,
        }, {
            onSuccess: () => toast.success('Link updated.'),
            onError: () => toast.error('Failed to update link.'),
        });
    };

    const deleteLink = (id: number) => {
        router.delete(`/admin/social-media/${id}`, {
            onSuccess: () => toast.success('Link removed.'),
            onError: () => toast.error('Failed to remove link.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Social Media', href: '/admin/social-media' }]}>
            <Head title="Social Media" />

            <div className="p-4 max-w-3xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Social Media Links</h1>
                    <p className="text-muted-foreground">Manage the social media icons shown in the site header.</p>
                </div>

                {/* Add New */}
                <div className="bg-card rounded-xl border shadow-sm p-5 mb-6">
                    <p className="text-sm font-medium mb-3">Add New Social Media</p>
                    <form onSubmit={submit} className="flex gap-3 items-start flex-wrap">
                        <div className="flex-1 min-w-[160px]">
                            <select
                                value={data.platform}
                                onChange={(e) => setData('platform', e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select Platform</option>
                                {PLATFORMS.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            {errors.platform && <p className="text-xs text-destructive mt-1">{errors.platform}</p>}
                        </div>
                        <div className="flex-[2] min-w-[200px]">
                            <Input
                                type="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://..."
                            />
                            {errors.url && <p className="text-xs text-destructive mt-1">{errors.url}</p>}
                        </div>
                        <Button type="submit" disabled={processing} className="shrink-0">
                            <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                    </form>
                </div>

                {/* Existing Links */}
                <div className="space-y-3">
                    {links.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground text-sm border rounded-xl bg-card">
                            No social media links yet. Add one above.
                        </div>
                    )}
                    {links.map((link) => (
                        <div key={link.id} className="bg-card rounded-xl border shadow-sm p-4 flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${platformColor(link.platform)}`}>
                                {platformIcon(link.platform)}
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-xs text-muted-foreground">Platform</Label>
                                    <Input value={link.platform} readOnly className="mt-1 cursor-default" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">URL</Label>
                                    <Input
                                        className="mt-1"
                                        value={editUrls[link.id] ?? link.url}
                                        onChange={(e) => setEditUrls((prev) => ({ ...prev, [link.id]: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button size="sm" variant="outline" onClick={() => saveLink(link)}>
                                    <Save className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => deleteLink(link.id)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
