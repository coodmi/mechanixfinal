import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { FounderContent } from '@/types/cms';
import { toast } from 'sonner';

interface FounderProps {
    content: FounderContent;
}

export default function Founder({ content }: FounderProps) {
    const mainImageRef = useRef<HTMLInputElement>(null);
    const profileImageRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        label: content?.label || 'Our Founder',
        title: content?.title || 'Meet Our Visionary',
        description: content?.description || 'With decades of experience in interior design, our founder has transformed countless spaces into works of art.',
        founder_name: content?.founder_name || 'John Doe',
        company_name: content?.company_name || 'Mechanix Interior',
        main_image: null as File | null,
        main_image_url: content?.main_image || '',
        profile_image: null as File | null,
        profile_image_url: content?.profile_image || '',
        cta_text: content?.cta_text || 'Learn More',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/founder', {
            forceFormData: true,
            onSuccess: () => toast.success('Founder section updated successfully!'),
            onError: () => toast.error('Failed to update founder section. Please try again.'),
        });
    };

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('main_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('main_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('profile_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeMainImage = () => {
        setData({ ...data, main_image: null, main_image_url: '' });
        if (mainImageRef.current) mainImageRef.current.value = '';
    };

    const removeProfileImage = () => {
        setData({ ...data, profile_image: null, profile_image_url: '' });
        if (profileImageRef.current) profileImageRef.current.value = '';
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Founder Section', href: '/admin/founder' }]}>
            <Head title="Founder Section" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Founder Section</h1>
                        <p className="text-muted-foreground">
                            Manage the founder/team section content on your homepage.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="label">Section Label</Label>
                            <Input
                                id="label"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="Our Founder"
                            />
                            {errors.label && <p className="text-sm text-destructive">{errors.label}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Meet Our Visionary Leader"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Tell the founder's story..."
                                rows={6}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="founder_name">Founder Name</Label>
                                <Input
                                    id="founder_name"
                                    value={data.founder_name}
                                    onChange={(e) => setData('founder_name', e.target.value)}
                                    placeholder="John Doe"
                                />
                                {errors.founder_name && <p className="text-sm text-destructive">{errors.founder_name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company_name">Company Name</Label>
                                <Input
                                    id="company_name"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    placeholder="Mechanix Interior"
                                />
                                {errors.company_name && <p className="text-sm text-destructive">{errors.company_name}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cta_text">Call to Action Text</Label>
                            <Input
                                id="cta_text"
                                value={data.cta_text}
                                onChange={(e) => setData('cta_text', e.target.value)}
                                placeholder="Learn More About Us"
                            />
                            {errors.cta_text && <p className="text-sm text-destructive">{errors.cta_text}</p>}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Images</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Main Background Image</Label>
                                    {data.main_image_url && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <img
                                                src={data.main_image_url}
                                                alt="Main preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeMainImage}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input
                                        ref={mainImageRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => mainImageRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {data.main_image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    {errors.main_image && <p className="text-sm text-destructive">{errors.main_image}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Founder Profile Image</Label>
                                    {data.profile_image_url && (
                                        <div className="relative w-48 h-48 rounded-lg overflow-hidden border mx-auto">
                                            <img
                                                src={data.profile_image_url}
                                                alt="Profile preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeProfileImage}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input
                                        ref={profileImageRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => profileImageRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {data.profile_image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    {errors.profile_image && <p className="text-sm text-destructive">{errors.profile_image}</p>}
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
