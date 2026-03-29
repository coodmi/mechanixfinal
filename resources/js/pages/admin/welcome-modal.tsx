import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

interface WelcomeModalSettings {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
    image: string;
    note: string;
    is_active: boolean;
}

interface WelcomeModalProps {
    settings: WelcomeModalSettings;
}

export default function WelcomeModal({ settings }: WelcomeModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        title: settings.title || 'Project Kick-off Offer',
        description: settings.description || 'Start your journey with Mechanix. Book a free, 30-minute virtual consultation with our lead designer to discuss the blueprint of your ideal space.',
        button_text: settings.button_text || 'Book Consultation',
        button_link: settings.button_link || '#contact',
        note: settings.note || '*Limited slots available',
        image: null as File | null,
        image_url: settings.image || '',
        is_active: settings.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post('/admin/welcome-modal', { 
            forceFormData: true,
            onSuccess: () => toast.success('Welcome modal settings updated successfully!'),
            onError: () => toast.error('Failed to update welcome modal settings. Please try again.'),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        form.setData({
            ...form.data,
            image: null,
            image_url: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Welcome Modal', href: '/admin/welcome-modal' }]}>
            <Head title="Welcome Modal Settings" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Welcome Modal</h1>
                        <p className="text-muted-foreground">
                            Manage the welcome popup that appears on the homepage.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Active Toggle */}
                        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                            <div>
                                <Label htmlFor="is_active" className="text-base font-medium">Enable Welcome Modal</Label>
                                <p className="text-sm text-muted-foreground">Show the welcome popup to new visitors</p>
                            </div>
                            <Switch
                                id="is_active"
                                checked={form.data.is_active}
                                onCheckedChange={(checked) => form.setData('is_active', checked)}
                            />
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                                placeholder="Project Kick-off Offer"
                            />
                            {form.errors.title && <p className="text-sm text-destructive">{form.errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                placeholder="Start your journey with Mechanix..."
                                rows={4}
                            />
                            {form.errors.description && <p className="text-sm text-destructive">{form.errors.description}</p>}
                        </div>

                        {/* Button Text & Link */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="button_text">Button Text</Label>
                                <Input
                                    id="button_text"
                                    value={form.data.button_text}
                                    onChange={(e) => form.setData('button_text', e.target.value)}
                                    placeholder="Book Now"
                                />
                                {form.errors.button_text && <p className="text-sm text-destructive">{form.errors.button_text}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="button_link">Button Link</Label>
                                <Input
                                    id="button_link"
                                    value={form.data.button_link}
                                    onChange={(e) => form.setData('button_link', e.target.value)}
                                    placeholder="https://google.com"
                                />
                                {form.errors.button_link && <p className="text-sm text-destructive">{form.errors.button_link}</p>}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="space-y-2">
                            <Label htmlFor="note">Footer Note</Label>
                            <Input
                                id="note"
                                value={form.data.note}
                                onChange={(e) => form.setData('note', e.target.value)}
                                placeholder="Limited slots available this week."
                            />
                            {form.errors.note && <p className="text-sm text-destructive">{form.errors.note}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Modal Image</Label>
                            <div className="flex flex-col gap-4">
                                {form.data.image_url && (
                                    <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border">
                                        <img
                                            src={form.data.image_url}
                                            alt="Welcome modal preview"
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
                                <div>
                                    <Input
                                        ref={fileInputRef}
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
                                        {form.data.image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            {form.errors.image && <p className="text-sm text-destructive">{form.errors.image}</p>}
                        </div>

                        {/* Preview */}
                        <div className="border rounded-lg p-4 bg-background">
                            <h3 className="text-sm font-medium mb-3">Preview</h3>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl">
                                <div className="grid grid-cols-2">
                                    <div className="h-48">
                                        {form.data.image_url ? (
                                            <img
                                                src={form.data.image_url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg">{form.data.title || 'Title'}</h4>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                            {form.data.description || 'Description...'}
                                        </p>
                                        <button className="mt-3 bg-red-500 text-white text-xs px-4 py-2 rounded-full">
                                            {form.data.button_text || 'Button'}
                                        </button>
                                        <p className="text-xs text-gray-400 mt-2">{form.data.note}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" disabled={form.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
