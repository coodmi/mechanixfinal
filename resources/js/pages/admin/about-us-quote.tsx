import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';
import { validateImageFile } from '@/lib/file-validation';

interface AboutUsQuoteProps {
    quote: {
        text: string;
        author: string;
        author_title: string;
        image: string;
    };
}

export default function AboutUsQuote({ quote }: AboutUsQuoteProps) {
    const form = useForm({
        text: quote.text || 'Design is not just what it looks like and feels like. Design is how it works.',
        author: quote.author || 'Steve Jobs',
        author_title: quote.author_title || 'CEO, Apple Inc.',
        image: null as File | null,
        image_url: quote.image || '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!validateImageFile(file)) {
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }
            form.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post('/admin/about-us-quote', {
            forceFormData: true,
            onSuccess: () => toast.success('Quote section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.')
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'About Us Page', href: '/admin/about-us' },
            { title: 'Quote Section', href: '/admin/about-us-quote' }
        ]}>
            <Head title="About Us - Quote Section" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Quote Section</h1>
                        <p className="text-muted-foreground">
                            Manage the inspirational quote displayed on the About Us page.
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
                                placeholder="Enter the inspirational quote..."
                                rows={4}
                            />
                            {form.errors.text && <p className="text-sm text-destructive">{form.errors.text}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="author">Author Name</Label>
                                <Input
                                    id="author"
                                    value={form.data.author}
                                    onChange={(e) => form.setData('author', e.target.value)}
                                    placeholder="e.g., Steve Jobs"
                                />
                                {form.errors.author && <p className="text-sm text-destructive">{form.errors.author}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author_title">Author Title/Role</Label>
                                <Input
                                    id="author_title"
                                    value={form.data.author_title}
                                    onChange={(e) => form.setData('author_title', e.target.value)}
                                    placeholder="e.g., CEO, Apple Inc."
                                />
                                {form.errors.author_title && <p className="text-sm text-destructive">{form.errors.author_title}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Background Image</Label>
                            <div className="flex flex-col gap-4">
                                {form.data.image_url && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                                        <img
                                            src={form.data.image_url}
                                            alt="Quote background preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            {form.errors.image && <p className="text-sm text-destructive">{form.errors.image}</p>}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-md font-medium mb-4">Preview</h3>
                            <div className="relative bg-gray-900 rounded-lg overflow-hidden p-8 text-white">
                                {form.data.image_url && (
                                    <img
                                        src={form.data.image_url}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                                    />
                                )}
                                <div className="relative z-10 text-center space-y-4">
                                    <blockquote className="text-xl md:text-2xl font-medium italic font-quote">
                                        "{form.data.text || 'Your quote will appear here...'}"
                                    </blockquote>
                                    {(form.data.author || form.data.author_title) && (
                                        <p className="text-sm text-gray-300">
                                            {form.data.author && <span className="font-semibold">{form.data.author}</span>}
                                            {form.data.author && form.data.author_title && ' — '}
                                            {form.data.author_title && <span>{form.data.author_title}</span>}
                                        </p>
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
