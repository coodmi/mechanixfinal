import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X, ArrowUpRight } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { FounderContent } from '@/types/cms';
import { toast } from 'sonner';
import { assetUrl } from '@/lib/asset-url';
import { validateImageFile } from '@/lib/file-validation';

interface FounderProps {
    content: FounderContent;
}

export default function Founder({ content }: FounderProps) {
    const mainImageRef = useRef<HTMLInputElement>(null);
    const profileImageRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        label:          content?.label          || '',
        title:          content?.title          || '',
        description:    content?.description    || '',
        founder_name:   content?.founder_name   || '',
        founder_title:  content?.founder_title  || '',
        company_name:   content?.company_name   || '',
        quote:          content?.quote          || '',
        cta_text:       content?.cta_text       || '',
        cta_link:       content?.cta_link       || '',
        main_image:     null as File | null,
        main_image_url: content?.main_image     || '',
        profile_image:     null as File | null,
        profile_image_url: content?.profile_image || '',
    });

    const handleImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'main_image' | 'profile_image',
        urlField: 'main_image_url' | 'profile_image_url',
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!validateImageFile(file)) {
            if (ref.current) ref.current.value = '';
            return;
        }
        setData(field, file);
        const reader = new FileReader();
        reader.onloadend = () => setData(urlField, reader.result as string);
        reader.readAsDataURL(file);
    };

    const removeImage = (
        field: 'main_image' | 'profile_image',
        urlField: 'main_image_url' | 'profile_image_url',
        ref: React.RefObject<HTMLInputElement>
    ) => {
        setData({ ...data, [field]: null, [urlField]: '' });
        if (ref.current) ref.current.value = '';
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/founder', {
            forceFormData: true,
            onSuccess: () => toast.success('Section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const mainBg = data.main_image_url
        ? (data.main_image_url.startsWith('data:') ? data.main_image_url : assetUrl(data.main_image_url))
        : '';
    const profileBg = data.profile_image_url
        ? (data.profile_image_url.startsWith('data:') ? data.profile_image_url : assetUrl(data.profile_image_url))
        : '';

    return (
        <AppLayout breadcrumbs={[{ title: 'Home Page', href: '/admin/hero' }, { title: 'Our Team Section', href: '/admin/founder' }]}>
            <Head title="Our Team Section" />

            <div className="p-4 max-w-5xl mx-auto w-full space-y-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Our Team Section</h1>
                    <p className="text-muted-foreground">Manage the team/founder section on the home page.</p>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Text Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="label">Section Label</Label>
                                <Input id="label" value={data.label} onChange={e => setData('label', e.target.value)} placeholder="e.g. Our Team" />
                                {errors.label && <p className="text-sm text-destructive">{errors.label}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. Meet Our Visionary" />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={4} placeholder="Tell the team's story..." />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quote">Quote / Testimonial</Label>
                            <Textarea id="quote" value={data.quote} onChange={e => setData('quote', e.target.value)} rows={3} placeholder="e.g. MechaniX is constantly pushing boundaries..." />
                            <p className="text-xs text-muted-foreground">This appears as an overlay on the person's photo.</p>
                            {errors.quote && <p className="text-sm text-destructive">{errors.quote}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="founder_name">Person Name</Label>
                                <Input id="founder_name" value={data.founder_name} onChange={e => setData('founder_name', e.target.value)} placeholder="e.g. Arch. Yamin Rupu" />
                                {errors.founder_name && <p className="text-sm text-destructive">{errors.founder_name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="founder_title">Person Title / Role</Label>
                                <Input id="founder_title" value={data.founder_title} onChange={e => setData('founder_title', e.target.value)} placeholder="e.g. Lead Architect" />
                                {errors.founder_title && <p className="text-sm text-destructive">{errors.founder_title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company_name">Company Name</Label>
                                <Input id="company_name" value={data.company_name} onChange={e => setData('company_name', e.target.value)} placeholder="e.g. Mechanix Interior" />
                                {errors.company_name && <p className="text-sm text-destructive">{errors.company_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cta_text">Button Text</Label>
                                <Input id="cta_text" value={data.cta_text} onChange={e => setData('cta_text', e.target.value)} placeholder="e.g. Join Our Family" />
                                {errors.cta_text && <p className="text-sm text-destructive">{errors.cta_text}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_link">Button Link</Label>
                                <Input id="cta_link" value={data.cta_link} onChange={e => setData('cta_link', e.target.value)} placeholder="e.g. /careers" />
                                {errors.cta_link && <p className="text-sm text-destructive">{errors.cta_link}</p>}
                            </div>
                        </div>

                        {/* Images */}
                        <div className="border-t pt-6 space-y-6">
                            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Images</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Image */}
                                <div className="space-y-2">
                                    <Label>Person / Main Image</Label>
                                    {mainBg && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <img src={mainBg} alt="Main" className="w-full h-full object-cover" />
                                            <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2"
                                                onClick={() => removeImage('main_image', 'main_image_url', mainImageRef)}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input ref={mainImageRef} type="file" accept="image/*" className="hidden"
                                        onChange={e => handleImage(e, 'main_image', 'main_image_url', mainImageRef)} />
                                    <Button type="button" variant="outline" onClick={() => mainImageRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {mainBg ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    {errors.main_image && <p className="text-sm text-destructive">{errors.main_image}</p>}
                                </div>

                                {/* Profile Image */}
                                <div className="space-y-2">
                                    <Label>Profile / Avatar Image</Label>
                                    {profileBg && (
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                                            <img src={profileBg} alt="Profile" className="w-full h-full object-cover" />
                                            <Button type="button" variant="destructive" size="sm" className="absolute top-1 right-1"
                                                onClick={() => removeImage('profile_image', 'profile_image_url', profileImageRef)}>
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input ref={profileImageRef} type="file" accept="image/*" className="hidden"
                                        onChange={e => handleImage(e, 'profile_image', 'profile_image_url', profileImageRef)} />
                                    <Button type="button" variant="outline" onClick={() => profileImageRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {profileBg ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    {errors.profile_image && <p className="text-sm text-destructive">{errors.profile_image}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Live Preview */}
                        <div className="border-t pt-6">
                            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Live Preview</h3>
                            <div className="bg-[#f5f4f0] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
                                {/* Left text */}
                                <div className="flex-1 space-y-4">
                                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">{data.label || 'Our Team'}</p>
                                    <h2 className="text-3xl font-bold text-gray-900">{data.title || 'Section Title'}</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">{data.description || 'Description will appear here...'}</p>
                                    {data.cta_text && (
                                        <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold">
                                            {data.cta_text} <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                {/* Right image with quote overlay */}
                                <div className="relative w-64 h-72 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                                    {mainBg
                                        ? <img src={mainBg} alt="" className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 text-sm">Person Image</div>
                                    }
                                    {data.quote && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 text-xs leading-relaxed">
                                            <p className="italic mb-2">{data.quote}</p>
                                            <p className="font-bold not-italic">
                                                {data.founder_name}
                                                {data.founder_title && <span className="font-normal"> — {data.founder_title}</span>}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
