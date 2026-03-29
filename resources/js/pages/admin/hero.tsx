import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { HeroContent } from '@/types/cms';
import { toast } from 'sonner';

interface HeroProps {
    content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        subtitle: content?.subtitle || 'Welcome to',
        title: content?.title || 'Mechanix Interior',
        title_highlight: content?.title_highlight || 'Interior',
        background_type: content?.background_type || 'image',
        background_image: null as File | null,
        background_image_url: content?.background_image || '',
        background_video: content?.background_video || '' as string | File,
        cta_text: content?.cta_text || 'Explore Our Work',
        cta_link: content?.cta_link || '#projects',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/hero', {
            forceFormData: true,
            onSuccess: () => toast.success('Hero section updated successfully!'),
            onError: () => toast.error('Failed to update hero section. Please try again.'),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('background_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('background_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData({
            ...data,
            background_image: null,
            background_image_url: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Hero Section', href: '/admin/hero' }]}>
            <Head title="Hero Section" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
                        <p className="text-muted-foreground">
                            Manage the hero section content on your homepage.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Welcome to"
                            />
                            {errors.subtitle && <p className="text-sm text-destructive">{errors.subtitle}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Mechanix Interior"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title_highlight">Title Highlight</Label>
                            <Input
                                id="title_highlight"
                                value={data.title_highlight}
                                onChange={(e) => setData('title_highlight', e.target.value)}
                                placeholder="Design Excellence"
                            />
                            <p className="text-xs text-muted-foreground">
                                This text will be highlighted in the title
                            </p>
                            {errors.title_highlight && (
                                <p className="text-sm text-destructive">{errors.title_highlight}</p>
                            )}
                        </div>

                        <div className="space-y-4 border p-4 rounded-lg">
                            <Label>Background Type</Label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="background_type"
                                        value="image"
                                        checked={data.background_type === 'image'}
                                        onChange={(e) => setData('background_type', e.target.value as 'image' | 'video')}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>Image</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="background_type"
                                        value="video"
                                        checked={data.background_type === 'video'}
                                        onChange={(e) => setData('background_type', e.target.value as 'image' | 'video')}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>Video</span>
                                </label>
                            </div>

                            {data.background_type === 'image' ? (
                                <div className="space-y-2">
                                    <Label htmlFor="background_image">Background Image</Label>
                                    <div className="flex flex-col gap-4">
                                        {data.background_image_url && (
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                                <img
                                                    src={data.background_image_url}
                                                    alt="Background preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={removeImage}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Input
                                                ref={fileInputRef}
                                                id="background_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                {data.background_image_url ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                        </div>
                                    </div>
                                    {errors.background_image && (
                                        <p className="text-sm text-destructive">{errors.background_image}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="background_video">Background Video</Label>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-xs text-muted-foreground mb-1 block">Video URL (YouTube, Facebook, or direct link)</Label>
                                            <Input
                                                value={typeof data.background_video === 'string' ? data.background_video : ''}
                                                onChange={(e) => setData('background_video', e.target.value)}
                                                placeholder="https://www.youtube.com/watch?v=..."
                                            />
                                        </div>
                                        <div className="text-center text-sm text-muted-foreground">- OR -</div>
                                        <div>
                                            <Label className="text-xs text-muted-foreground mb-1 block">Upload Video File (MP4, WebM)</Label>
                                            <Input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        setData('background_video', e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {errors.background_video && (
                                        <p className="text-sm text-destructive">{errors.background_video}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cta_text">Call to Action Text</Label>
                            <Input
                                id="cta_text"
                                value={data.cta_text}
                                onChange={(e) => setData('cta_text', e.target.value)}
                                placeholder="Get Started"
                            />
                            {errors.cta_text && <p className="text-sm text-destructive">{errors.cta_text}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cta_link">Call to Action Link</Label>
                            <Input
                                id="cta_link"
                                value={data.cta_link}
                                onChange={(e) => setData('cta_link', e.target.value)}
                                placeholder="#contact"
                            />
                            {errors.cta_link && <p className="text-sm text-destructive">{errors.cta_link}</p>}
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
