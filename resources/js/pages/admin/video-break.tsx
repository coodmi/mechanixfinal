import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X, Play } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';
import { assetUrl } from '@/lib/asset-url';

interface VideoBreakProps {
    content: {
        title?: string;
        video_url?: string;
        background_image?: string;
    };
}

export default function VideoBreak({ content }: VideoBreakProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        title:                  content?.title            || '',
        video_url:              content?.video_url        || '',
        background_image:       null as File | null,
        background_image_url:   content?.background_image || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/video-break', {
            forceFormData: true,
            onSuccess: () => toast.success('Video break section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('background_image', file);
            const reader = new FileReader();
            reader.onloadend = () => setData('background_image_url', reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData({ ...data, background_image: null, background_image_url: '' });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const bgUrl = data.background_image_url
        ? (data.background_image_url.startsWith('data:') ? data.background_image_url : assetUrl(data.background_image_url))
        : '';

    return (
        <AppLayout breadcrumbs={[{ title: 'Video Break Section', href: '/admin/video-break' }]}>
            <Head title="Video Break Section" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Video Break Section</h1>
                    <p className="text-muted-foreground">Manage the video section on the home page.</p>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="e.g. Our Interior Design Process"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="video_url">Video URL</Label>
                            <Input
                                id="video_url"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Paste a YouTube or Vimeo URL. Clicking the play button on the site will open this video.
                            </p>
                            {errors.video_url && <p className="text-sm text-destructive">{errors.video_url}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Background Image</Label>
                            <div className="flex flex-col gap-3">
                                {bgUrl && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <img src={bgUrl} alt="Background preview" className="w-full h-full object-cover" />
                                        <Button type="button" variant="destructive" size="sm"
                                            className="absolute top-2 right-2" onClick={removeImage}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Input ref={fileInputRef} type="file" accept="image/*"
                                        onChange={handleFileChange} className="hidden" />
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {bgUrl ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            {errors.background_image && <p className="text-sm text-destructive">{errors.background_image}</p>}
                        </div>

                        {/* Preview */}
                        <div className="border-t pt-6">
                            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">Preview</h3>
                            <div
                                className="relative h-48 rounded-xl overflow-hidden flex items-center justify-center"
                                style={bgUrl
                                    ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                    : { backgroundColor: '#1a1a1a' }
                                }
                            >
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative z-10 text-center space-y-3">
                                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto border border-white/30">
                                        <Play className="text-white fill-white w-5 h-5 ml-0.5" />
                                    </div>
                                    <p className="text-white font-bold text-lg">{data.title || 'Section Title'}</p>
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
