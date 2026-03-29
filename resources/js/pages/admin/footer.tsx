import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Save, Copyright, Facebook, Instagram, Linkedin, Youtube, Twitter, Globe, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface SocialLink { id: number; platform: string; url: string; }
interface FooterProps { copyright_text: string; links: SocialLink[]; }

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

export default function Footer({ copyright_text, links }: FooterProps) {
    // Copyright form
    const { data, setData, post, processing } = useForm({ copyright_text: copyright_text || '' });

    // Add link form
    const { data: addData, setData: setAddData, post: postAdd, processing: addProcessing, errors: addErrors, reset: resetAdd } = useForm({ platform: '', url: '' });

    // Inline edit state
    const [editUrls, setEditUrls] = useState<Record<number, string>>(
        Object.fromEntries(links.map((l) => [l.id, l.url]))
    );

    const submitCopyright: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/footer', {
            onSuccess: () => toast.success('Copyright text updated.'),
            onError:   () => toast.error('Failed to update copyright text.'),
        });
    };

    const addLink: FormEventHandler = (e) => {
        e.preventDefault();
        postAdd('/admin/footer/links', {
            onSuccess: () => { toast.success(`${addData.platform} link added.`); resetAdd(); },
            onError:   () => toast.error('Please fill in all fields correctly.'),
        });
    };

    const saveLink = (link: SocialLink) => {
        router.put(`/admin/footer/links/${link.id}`, { platform: link.platform, url: editUrls[link.id] ?? link.url }, {
            onSuccess: () => toast.success('Link updated.'),
            onError:   () => toast.error('Failed to update link.'),
        });
    };

    const deleteLink = (id: number) => {
        router.delete(`/admin/footer/links/${id}`, {
            onSuccess: () => toast.success('Link removed.'),
            onError:   () => toast.error('Failed to remove link.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Footer', href: '/admin/footer' }]}>
            <Head title="Footer" />
            <div className="p-4 max-w-3xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Footer</h1>
                    <p className="text-muted-foreground">Manage the copyright text and social media links shown in the footer.</p>
                </div>

                {/* Copyright */}
                <div className="bg-card rounded-xl border shadow-sm p-5 mb-6">
                    <form onSubmit={submitCopyright} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="copyright_text" className="flex items-center gap-2">
                                <Copyright className="w-4 h-4" /> Copyright Text
                            </Label>
                            <Input
                                id="copyright_text"
                                value={data.copyright_text}
                                onChange={(e) => setData('copyright_text', e.target.value)}
                                placeholder="© 2025 Mechanix Interior. All rights reserved."
                            />
                        </div>
                        <Button type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" /> Save Copyright
                        </Button>
                    </form>
                </div>

                {/* Social Media Links */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Social Media Links</h2>
                    <p className="text-sm text-muted-foreground">These icons appear in the footer.</p>
                </div>

                {/* Add New */}
                <div className="bg-card rounded-xl border shadow-sm p-5 mb-6">
                    <p className="text-sm font-medium mb-3">Add New Social Media</p>
                    <form onSubmit={addLink} className="flex gap-3 items-start flex-wrap">
                        <div className="flex-1 min-w-[160px]">
                            <select
                                value={addData.platform}
                                onChange={(e) => setAddData('platform', e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select Platform</option>
                                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {addErrors.platform && <p className="text-xs text-destructive mt-1">{addErrors.platform}</p>}
                        </div>
                        <div className="flex-[2] min-w-[200px]">
                            <Input type="url" value={addData.url} onChange={(e) => setAddData('url', e.target.value)} placeholder="https://..." />
                            {addErrors.url && <p className="text-xs text-destructive mt-1">{addErrors.url}</p>}
                        </div>
                        <Button type="submit" disabled={addProcessing} className="shrink-0">
                            <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                    </form>
                </div>

                {/* Existing Links */}
                <div className="space-y-3">
                    {links.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground text-sm border rounded-xl bg-card">
                            No footer social media links yet. Add one above.
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
                                <Button size="sm" variant="outline" onClick={() => saveLink(link)}><Save className="w-4 h-4" /></Button>
                                <Button size="sm" variant="ghost" onClick={() => deleteLink(link.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
