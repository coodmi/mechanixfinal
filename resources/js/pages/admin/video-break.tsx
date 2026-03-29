import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

interface VideoBreakProps {
    content: {
        title?: string;
        background_image?: string;
    };
}

export default function VideoBreak({ content }: VideoBreakProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: content?.title || 'Watch Our Work in Action',
        background_image: null as File | null,
        background_image_url: content?.background_image || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/video-break', {
            forceFormData: true,
            onSuccess: () => toast.success('Video break section updated successfully!'),
            onError: () => toast.error('Failed to update video break section. Please try again.'),
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
        <AppLayout breadcrumbs={[{ title: 'Video Break Section', href: '/admin/video-break' }]}>
            <Head title="Video Break Section" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Video Break Section</h1>
                        <p className="text-muted-foreground">
                            Manage the video break section content on your homepage.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="The Mechanix Process"
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

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
