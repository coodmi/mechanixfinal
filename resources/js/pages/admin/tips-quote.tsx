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

interface TipsQuoteProps {
    quote: {
        text: string;
        quote_highlight: string;
        author: string;
        background_image: string;
    };
}

export default function TipsQuote({ quote }: TipsQuoteProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        text: quote.text || 'Expert insights to help you create your dream space.',
        quote_highlight: quote.quote_highlight || 'dream space',
        author: quote.author || '- Design Tips',
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
        form.setData({
            ...form.data,
            background_image: null,
            background_image_url: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post('/admin/tips-quote', {
            forceFormData: true,
            onSuccess: () => toast.success('Quote section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.')
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Tips Page', href: '/admin/tips' },
            { title: 'Quote Section', href: '/admin/tips-quote' }
        ]}>
            <Head title="Tips - Quote Section" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Quote Section</h1>
                        <p className="text-muted-foreground">
                            Manage the hero quote section displayed at the top of the Tips page.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="text">Quote Text *</Label>
                            <Textarea
                                id="text"
                                value={form.data.text}
                                onChange={(e) => form.setData('text', e.target.value)}
                                placeholder="Enter an inspirational quote..."
                                rows={4}
                            />
                            {form.errors.text && <p className="text-sm text-destructive">{form.errors.text}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quote_highlight">Quote Highlight</Label>
                            <Input
                                id="quote_highlight"
                                value={form.data.quote_highlight}
                                onChange={(e) => form.setData('quote_highlight', e.target.value)}
                                placeholder="Part of the quote to highlight"
                            />
                            <p className="text-xs text-muted-foreground">
                                This text will be highlighted in blue color within the quote
                            </p>
                            {form.errors.quote_highlight && <p className="text-sm text-destructive">{form.errors.quote_highlight}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                value={form.data.author}
                                onChange={(e) => form.setData('author', e.target.value)}
                                placeholder="- Author Name"
                            />
                            {form.errors.author && <p className="text-sm text-destructive">{form.errors.author}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Background Image</Label>
                            <div className="flex flex-col gap-4">
                                {form.data.background_image_url && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <img
                                            src={form.data.background_image_url}
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
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {form.data.background_image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            {form.errors.background_image && <p className="text-sm text-destructive">{form.errors.background_image}</p>}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-md font-medium mb-4">Preview</h3>
                            <div className="relative bg-gray-900 rounded-lg overflow-hidden p-8 text-white min-h-[200px] flex items-center justify-center">
                                {form.data.background_image_url && (
                                    <img
                                        src={form.data.background_image_url}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                                    />
                                )}
                                <div className="relative z-10 text-center space-y-4 max-w-2xl">
                                    <blockquote className="text-xl md:text-2xl font-medium italic font-quote">
                                        "{form.data.text || 'Your quote will appear here...'}"
                                    </blockquote>
                                    {form.data.author && (
                                        <p className="text-sm text-gray-300">{form.data.author}</p>
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
