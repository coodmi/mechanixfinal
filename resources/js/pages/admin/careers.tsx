import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Upload, X, Briefcase, Search } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

interface CareersProps {
    hero: {
        quote?: string;
        quote_highlight?: string;
        author?: string;
        background_image?: string;
    };
    job_search: {
        title?: string;
        subtitle?: string;
        search_placeholder?: string;
        search_button_text?: string;
        no_jobs_title?: string;
        no_jobs_description?: string;
    };
}

export default function Careers({ hero, job_search }: CareersProps) {
    const heroFileInputRef = useRef<HTMLInputElement>(null);

    const heroForm = useForm({
        quote: hero?.quote || 'Join our team and create exceptional spaces together.',
        quote_highlight: hero?.quote_highlight || 'exceptional spaces',
        author: hero?.author || '- Mechanix Team',
        background_image: null as File | null,
        background_image_url: hero?.background_image || '',
    });

    const jobSearchForm = useForm({
        title: job_search?.title || 'Explore Opportunities',
        subtitle: job_search?.subtitle || 'Find your perfect role at Mechanix Interior',
        search_placeholder: job_search?.search_placeholder || 'Search for positions...',
        search_button_text: job_search?.search_button_text || 'Search',
        no_jobs_title: job_search?.no_jobs_title || 'No Open Positions',
        no_jobs_description: job_search?.no_jobs_description || 'We currently have no open positions. Please check back later or send us your resume.',
    });

    const submitHero: FormEventHandler = (e) => {
        e.preventDefault();
        heroForm.post('/admin/careers/hero', {
            forceFormData: true,
            onSuccess: () => toast.success('Hero section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitJobSearch: FormEventHandler = (e) => {
        e.preventDefault();
        jobSearchForm.post('/admin/careers/job-search', {
            onSuccess: () => toast.success('Job search section updated successfully!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            heroForm.setData('background_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                heroForm.setData('background_image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeHeroImage = () => {
        heroForm.setData({
            ...heroForm.data,
            background_image: null,
            background_image_url: '',
        });
        if (heroFileInputRef.current) {
            heroFileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Careers Page', href: '/admin/careers' }]}>
            <Head title="Careers Management" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Careers Page Sections</h1>
                        <p className="text-muted-foreground">
                            Manage the content sections of the careers page.
                        </p>
                    </div>
                    <Link href="/admin/job-openings">
                        <Button variant="outline">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Manage Job Openings
                        </Button>
                    </Link>
                </div>

                {/* Hero Section */}
                {/* <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Hero Section (Quote)</h2>
                    <form onSubmit={submitHero} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="quote">Quote</Label>
                            <Textarea
                                id="quote"
                                value={heroForm.data.quote}
                                onChange={(e) => heroForm.setData('quote', e.target.value)}
                                placeholder="Enter an inspirational quote..."
                                rows={3}
                            />
                            {heroForm.errors.quote && <p className="text-sm text-destructive">{heroForm.errors.quote}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quote_highlight">Quote Highlight</Label>
                            <Input
                                id="quote_highlight"
                                value={heroForm.data.quote_highlight}
                                onChange={(e) => heroForm.setData('quote_highlight', e.target.value)}
                                placeholder="Part of the quote to highlight"
                            />
                            <p className="text-xs text-muted-foreground">
                                This text will be highlighted in blue color within the quote
                            </p>
                            {heroForm.errors.quote_highlight && (
                                <p className="text-sm text-destructive">{heroForm.errors.quote_highlight}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">Quote Author</Label>
                            <Input
                                id="author"
                                value={heroForm.data.author}
                                onChange={(e) => heroForm.setData('author', e.target.value)}
                                placeholder="- Author Name"
                            />
                            {heroForm.errors.author && <p className="text-sm text-destructive">{heroForm.errors.author}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Background Image</Label>
                            <div className="flex flex-col gap-4">
                                {heroForm.data.background_image_url && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <img
                                            src={heroForm.data.background_image_url}
                                            alt="Background preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={removeHeroImage}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Input
                                        ref={heroFileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleHeroFileChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => heroFileInputRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {heroForm.data.background_image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            {heroForm.errors.background_image && (
                                <p className="text-sm text-destructive">{heroForm.errors.background_image}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button type="submit" disabled={heroForm.processing}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Hero Section
                            </Button>
                        </div>
                    </form>
                </div> */}

                {/* Job Search Section */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold">Job Search Section</h2>
                    </div>
                    <form onSubmit={submitJobSearch} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Section Title</Label>
                                <Input
                                    id="title"
                                    value={jobSearchForm.data.title}
                                    onChange={(e) => jobSearchForm.setData('title', e.target.value)}
                                    placeholder="Find Your Dream Role"
                                />
                                {jobSearchForm.errors.title && <p className="text-sm text-destructive">{jobSearchForm.errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={jobSearchForm.data.subtitle}
                                    onChange={(e) => jobSearchForm.setData('subtitle', e.target.value)}
                                    placeholder="Where ambition meets opportunity..."
                                />
                                {jobSearchForm.errors.subtitle && <p className="text-sm text-destructive">{jobSearchForm.errors.subtitle}</p>}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="search_placeholder">Search Placeholder</Label>
                                <Input
                                    id="search_placeholder"
                                    value={jobSearchForm.data.search_placeholder}
                                    onChange={(e) => jobSearchForm.setData('search_placeholder', e.target.value)}
                                    placeholder="Search by job title, keyword..."
                                />
                                {jobSearchForm.errors.search_placeholder && (
                                    <p className="text-sm text-destructive">{jobSearchForm.errors.search_placeholder}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="search_button_text">Search Button Text</Label>
                                <Input
                                    id="search_button_text"
                                    value={jobSearchForm.data.search_button_text}
                                    onChange={(e) => jobSearchForm.setData('search_button_text', e.target.value)}
                                    placeholder="Search Jobs"
                                />
                                {jobSearchForm.errors.search_button_text && (
                                    <p className="text-sm text-destructive">{jobSearchForm.errors.search_button_text}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="no_jobs_title">No Jobs Found Title</Label>
                                <Input
                                    id="no_jobs_title"
                                    value={jobSearchForm.data.no_jobs_title}
                                    onChange={(e) => jobSearchForm.setData('no_jobs_title', e.target.value)}
                                    placeholder="No jobs found"
                                />
                                {jobSearchForm.errors.no_jobs_title && (
                                    <p className="text-sm text-destructive">{jobSearchForm.errors.no_jobs_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="no_jobs_description">No Jobs Found Description</Label>
                                <Input
                                    id="no_jobs_description"
                                    value={jobSearchForm.data.no_jobs_description}
                                    onChange={(e) => jobSearchForm.setData('no_jobs_description', e.target.value)}
                                    placeholder="Try adjusting your search..."
                                />
                                {jobSearchForm.errors.no_jobs_description && (
                                    <p className="text-sm text-destructive">{jobSearchForm.errors.no_jobs_description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button type="submit" disabled={jobSearchForm.processing}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Job Search Section
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
