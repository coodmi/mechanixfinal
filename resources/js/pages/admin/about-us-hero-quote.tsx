import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';
import { validateImageFile } from '@/lib/file-validation';
import { assetUrl } from '@/lib/asset-url';

interface AboutUsHeroQuoteProps {
    quote: {
        text: string;
        quote_highlight: string;
        author: string;
        background_image: string;
    };
}

export default function AboutUsHeroQuote({ quote }: AboutUsHeroQuoteProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        text: quote.text || '',
        quote_highlight: quote.quote_highlight || '',
        author: quote.author || '',
        background_image: null as File | null,
        background_image_url: quote.background_image || '',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!validateImageFile(file)) {
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }
            form.setData('background_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setData('background_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        form.setData({ ...form.data, background_image: null, background_image_url: '' });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post('/admin/about-us-hero-quote', {
            forceFormData: true,
            onSuccess: () => toast.success('Hero section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    // Build preview with highlight
    const renderPreviewQuote = () => {
        const text = form.data.text || 'Your quote will appear here...';
        const highlight = form.data.quote_highlight;
        if (!highlight) return <span>{text}</span>;
        const parts = text.split(highlight);
        if (parts.length < 2) return <span>{text}</span>;
        return (
            <>
                {parts[0]}
                <span className="text-blue-400">{highlight}</span>
                {parts.slice(1).join(highlight)}
            </>
        );
    };

    const bgUrl = form.data.background_image_url
        ? (form.data.background_image_url.startsWith('data:')
            ? form.data.background_image_url
            : assetUrl(form.data.background_image_url))
        : '';

    return (
        <AppLayout breadcrumbs={[
            { title: 'About Us Page', href: '/admin/about-us' },
            { title: 'Hero Section', href: '/admin/about-us-hero-quote' },
        ]}>
            <Head title="About Us - Hero Section" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
                    <p className="text-muted-foreground">
                        Manage the full-width hero displayed at the top of the About Us page.
                    </p>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Quote Text */}
                        <div className="space-y-2">
                            <Label htmlFor="text">Quote Text *</Label>
                            <Textarea
                                id="text"
                                value={form.data.text}
                                onChange={(e) => form.setData('text', e.target.value)}
                                placeholder="e.g. Design is not just what it looks like. Design is how it works."
                                rows={3}
                            />
                            {form.errors.text && <p className="text-sm text-destructive">{form.errors.text}</p>}
                        </div>

                        {/* Highlight */}
                        <div className="space-y-2">
                            <Label htmlFor="quote_highlight">Highlighted Phrase</Label>
                            <Input
                                id="quote_highlight"
                                value={form.data.quote_highlight}
                                onChange={(e) => form.setData('quote_highlight', e.target.value)}
                                placeholder="e.g. how it works"
                            />
                            <p className="text-xs text-muted-foreground">
                                This exact phrase inside the quote will be highlighted in blue. Leave empty for no highlight.
                            </p>
                            {form.errors.quote_highlight && <p className="text-sm text-destructive">{form.errors.quote_highlight}</p>}
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                value={form.data.author}
                                onChange={(e) => form.setData('author', e.target.value)}
                                placeholder="e.g. Steve Jobs"
                            />
                            {form.errors.author && <p className="text-sm text-destructive">{form.errors.author}</p>}
                        </div>

                        {/* Background Image */}
                        <div className="space-y-2">
                            <Label>Background Image</Label>
                            <div className="flex flex-col gap-3">
                                {bgUrl && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <img src={bgUrl} alt="Background preview" className="w-full h-full object-cover" />
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
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {bgUrl ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            {form.errors.background_image && <p className="text-sm text-destructive">{form.errors.background_image}</p>}
                        </div>

                        {/* Live Preview */}
                        <div className="border-t pt-6">
                            <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">Live Preview</h3>
                            <div
                                className="relative rounded-lg overflow-hidden min-h-[220px] flex items-center justify-center text-white text-center"
                                style={bgUrl ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: '#111' }}
                            >
                                <div className="absolute inset-0 bg-black/65" />
                                <div className="relative z-10 px-8 py-10 max-w-2xl space-y-4">
                                    <blockquote className="text-xl md:text-2xl font-bold italic font-quote leading-snug">
                                        "{renderPreviewQuote()}"
                                    </blockquote>
                                    {form.data.author && (
                                        <p className="text-gray-300 text-sm">— {form.data.author.replace(/^[-–—]\s*/, '')}</p>
                                    )}
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
