import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

interface PageHero {
    quote?: string;
    quote_highlight?: string;
    author?: string;
    background_image?: string;
}

interface PageHeroesProps {
    heroes: {
        'about-us': PageHero;
        'clients': PageHero;
        'life-at-mechanix': PageHero;
        'our-team': PageHero;
        'tips': PageHero;
        'careers': PageHero;
    };
}

const pageLabels: Record<string, string> = {
    'about-us': 'About Us',
    'clients': 'Clients',
    'life-at-mechanix': 'Life at Mechanix',
    'our-team': 'Our Team',
    'tips': 'Tips',
    'careers': 'Careers',
};

function PageHeroForm({ page, hero }: { page: string; hero: PageHero }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        quote: hero?.quote || '',
        quote_highlight: hero?.quote_highlight || '',
        author: hero?.author || '',
        background_image: null as File | null,
        background_image_url: hero?.background_image || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/page-heroes/${page}`, {
            forceFormData: true,
            onSuccess: () => toast.success(`${pageLabels[page]} hero section updated successfully!`),
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
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor={`quote-${page}`}>Quote</Label>
                <Textarea
                    id={`quote-${page}`}
                    value={data.quote}
                    onChange={(e) => setData('quote', e.target.value)}
                    placeholder="Enter an inspirational quote..."
                    rows={3}
                />
                {errors.quote && <p className="text-sm text-destructive">{errors.quote}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor={`quote_highlight-${page}`}>Quote Highlight</Label>
                <Input
                    id={`quote_highlight-${page}`}
                    value={data.quote_highlight}
                    onChange={(e) => setData('quote_highlight', e.target.value)}
                    placeholder="Part of the quote to highlight in blue"
                />
                <p className="text-xs text-muted-foreground">
                    This text will be highlighted in blue color within the quote
                </p>
                {errors.quote_highlight && (
                    <p className="text-sm text-destructive">{errors.quote_highlight}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor={`author-${page}`}>Author</Label>
                <Input
                    id={`author-${page}`}
                    value={data.author}
                    onChange={(e) => setData('author', e.target.value)}
                    placeholder="- Author Name"
                />
                {errors.author && <p className="text-sm text-destructive">{errors.author}</p>}
            </div>

            <div className="space-y-2">
                <Label>Background Image</Label>
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
    );
}

export default function PageHeroes({ heroes }: PageHeroesProps) {
    const pages = Object.keys(heroes) as Array<keyof typeof heroes>;

    return (
        <AppLayout breadcrumbs={[{ title: 'Page Hero Quotes', href: '/admin/page-heroes' }]}>
            <Head title="Page Hero Quotes" />

            <div className="p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Page Hero Quotes</h1>
                        <p className="text-muted-foreground">
                            Manage the hero quote sections displayed at the top of each page.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <Tabs defaultValue="about-us" className="w-full">
                        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
                            {pages.map((page) => (
                                <TabsTrigger
                                    key={page}
                                    value={page}
                                    className="px-4 py-2 text-sm rounded-lg font-medium transition-colors duration-300 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-gray-300 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-background hover:bg-gray-100"
                                >
                                    {pageLabels[page]}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {pages.map((page) => (
                            <TabsContent key={page} value={page}>
                                <PageHeroForm page={page} hero={heroes[page]} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
