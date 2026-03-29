import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { AboutContent } from '@/types/cms';
import { toast } from 'sonner';

interface AboutProps {
    content: AboutContent;
}

export default function About({ content }: AboutProps) {
    const mainImageRef = useRef<HTMLInputElement>(null);
    const detailImageRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        label: content?.label || 'About Us',
        title: content?.title || 'Creating Exceptional Spaces',
        description: content?.description || 'We are a leading interior design company specializing in creating beautiful and functional spaces for residential, commercial, and hospitality projects.',
        stat_clients: content?.stat_clients || '500+',
        stat_clients_label: content?.stat_clients_label || 'Happy Clients',
        stat_satisfaction: content?.stat_satisfaction || '98%',
        stat_satisfaction_label: content?.stat_satisfaction_label || 'Satisfaction Rate',
        stat_experience: content?.stat_experience || '15+',
        stat_experience_label: content?.stat_experience_label || 'Years Experience',
        main_image: null as File | null,
        main_image_url: content?.main_image || '',
        detail_image: null as File | null,
        detail_image_url: content?.detail_image || '',
        detail_caption: content?.detail_caption || 'Excellence in Design',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/about', {
            forceFormData: true,
            onSuccess: () => toast.success('About section updated successfully!'),
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

    const handleDetailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('detail_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('detail_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeMainImage = () => {
        setData({ ...data, main_image: null, main_image_url: '' });
        if (mainImageRef.current) mainImageRef.current.value = '';
    };

    const removeDetailImage = () => {
        setData({ ...data, detail_image: null, detail_image_url: '' });
        if (detailImageRef.current) detailImageRef.current.value = '';
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'About Section', href: '/admin/about' }]}>
            <Head title="About Section" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">About Section</h1>
                        <p className="text-muted-foreground">
                            Manage the about section content on your homepage.
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
                                placeholder="About Us"
                            />
                            {errors.label && <p className="text-sm text-destructive">{errors.label}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Creating Exceptional Spaces"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Tell your story..."
                                rows={6}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="stat_clients">Clients</Label>
                                    <Input
                                        id="stat_clients"
                                        value={data.stat_clients}
                                        onChange={(e) => setData('stat_clients', e.target.value)}
                                        placeholder="500+"
                                    />
                                    <Input
                                        value={data.stat_clients_label}
                                        onChange={(e) => setData('stat_clients_label', e.target.value)}
                                        placeholder="Happy Clients"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stat_satisfaction">Satisfaction</Label>
                                    <Input
                                        id="stat_satisfaction"
                                        value={data.stat_satisfaction}
                                        onChange={(e) => setData('stat_satisfaction', e.target.value)}
                                        placeholder="98%"
                                    />
                                    <Input
                                        value={data.stat_satisfaction_label}
                                        onChange={(e) => setData('stat_satisfaction_label', e.target.value)}
                                        placeholder="Satisfaction Rate"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stat_experience">Experience</Label>
                                    <Input
                                        id="stat_experience"
                                        value={data.stat_experience}
                                        onChange={(e) => setData('stat_experience', e.target.value)}
                                        placeholder="15+"
                                    />
                                    <Input
                                        value={data.stat_experience_label}
                                        onChange={(e) => setData('stat_experience_label', e.target.value)}
                                        placeholder="Years Experience"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Images</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Main Image</Label>
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
                                </div>

                                <div className="space-y-2">
                                    <Label>Detail Image</Label>
                                    {data.detail_image_url && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <img
                                                src={data.detail_image_url}
                                                alt="Detail preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeDetailImage}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input
                                        ref={detailImageRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleDetailImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => detailImageRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {data.detail_image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    <Input
                                        value={data.detail_caption}
                                        onChange={(e) => setData('detail_caption', e.target.value)}
                                        placeholder="Image caption"
                                    />
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
