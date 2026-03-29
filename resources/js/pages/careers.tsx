import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import PageHeroSection from '@/components/page-hero-section';
import { Head, useForm } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/ui/phone-input';
import 'react-phone-number-input/style.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Share2, MapPin, Clock, Briefcase, Search, Building2, ChevronRight, Users, DollarSign, Upload, FileText, CheckCircle } from 'lucide-react';
import { useState, useMemo, useRef, FormEventHandler } from 'react';
import { toast } from 'sonner';

interface JobOpening {
    id: number;
    title: string;
    category: string;
    location: string;
    employment_type: string;
    description: string;
    requirements?: string;
    salary_range?: string;
    experience_level?: string;
    created_at?: string;
}

interface CareersProps extends CMSPageProps {
    hero: any;
    page_hero: any;
    job_search: {
        title?: string;
        subtitle?: string;
        search_placeholder?: string;
        search_button_text?: string;
        no_jobs_title?: string;
        no_jobs_description?: string;
    };
    jobOpenings: JobOpening[];
}

export default function Careers(props: CareersProps) {
    const { hero, page_hero, job_search, jobOpenings = [] } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [applyDialogOpen, setApplyDialogOpen] = useState(false);
    const resumeInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        job_opening_id: 0,
        name: '',
        email: '',
        phone: '',
        resume: null as File | null,
        cover_letter: '',
        portfolio_url: '',
    });

    // Extract unique categories from jobs
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(jobOpenings.map(job => job.category).filter(Boolean))];
        return cats;
    }, [jobOpenings]);

    // Filter jobs based on search and category
    const filteredJobs = useMemo(() => {
        return jobOpenings.filter((job) => {
            const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
            const matchesSearch = searchQuery === '' || 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [jobOpenings, activeCategory, searchQuery]);

    const handleJobClick = (job: JobOpening) => {
        setSelectedJob(job);
        setDialogOpen(true);
    };

    const handleShare = (e: React.MouseEvent, job: JobOpening) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Check out this job opportunity: ${job.title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    const handleApplyClick = (job: JobOpening) => {
        setSelectedJob(job);
        setData('job_opening_id', job.id);
        setDialogOpen(false);
        setApplyDialogOpen(true);
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('resume', file);
        }
    };

    const submitApplication: FormEventHandler = (e) => {
        e.preventDefault();
        post('/apply', {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Application submitted successfully! We will get back to you soon.');
                setApplyDialogOpen(false);
                reset();
            },
            onError: (errors) => {
                toast.error('Failed to submit application. Please check the form and try again.');
            },
        });
    };

    return (
        <>
            <Head title="Careers - Mechanix Interior">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground">
                <Navbar navigation={props.navigation} siteSettings={props.siteSettings} headerSettings={props.headerSettings} />

                {/* Hero Section */}
                <PageHeroSection pageHero={page_hero} />

                {/* Job Search Section */}
                <section className="bg-background py-16">
                    <div className="container lg:max-w-7xl mx-auto px-4">
                        {/* Search Header */}
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-foreground mb-2">{job_search?.title || 'Find Your Dream Role'}</h2>
                            <p className="text-lg text-muted-foreground">{job_search?.subtitle || 'Where ambition meets opportunity. Join our growing team.'}</p>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-card rounded-2xl shadow-lg border p-4 mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder={job_search?.search_placeholder || 'Search by job title, keyword, or location...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 h-12 text-base border-0 bg-muted/50 focus-visible:ring-2"
                                    />
                                </div>
                                <Button size="lg" className="h-12 px-8 font-semibold">
                                    <Search className="mr-2 h-4 w-4" />
                                    {job_search?.search_button_text || 'Search Jobs'}
                                </Button>
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 text-white ${
                                        activeCategory === category
                                            ? 'bg-primary shadow-md'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs found
                            </p>
                        </div>

                        {/* Job Cards Grid */}
                        {filteredJobs.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredJobs.map((job) => (
                                    <Card 
                                        key={job.id} 
                                        className="group cursor-pointer border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 bg-card"
                                        onClick={() => handleJobClick(job)}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    <Badge variant="secondary" className="mb-3 text-xs">
                                                        {job.category}
                                                    </Badge>
                                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                        {job.title}
                                                    </h3>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => handleShare(e, job)}
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                                                {job.location && (
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                )}
                                                {job.employment_type && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{job.employment_type}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                {job.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-3 border-t">
                                                <span className="text-xs text-muted-foreground">
                                                    {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently posted'}
                                                </span>
                                                <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    View Details
                                                    <ChevronRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-muted/30 rounded-2xl">
                                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">{job_search?.no_jobs_title || 'No jobs found'}</h3>
                                <p className="text-muted-foreground">
                                    {job_search?.no_jobs_description || 'Try adjusting your search or filter to find what you\'re looking for.'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Job Details Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        {selectedJob && (
                            <>
                                <DialogHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <Badge variant="secondary" className="mb-3">
                                                {selectedJob.category}
                                            </Badge>
                                            <DialogTitle className="text-2xl font-bold">
                                                {selectedJob.title}
                                            </DialogTitle>
                                        </div>
                                    </div>
                                    <DialogDescription asChild>
                                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                            {selectedJob.location && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{selectedJob.location}</span>
                                                </div>
                                            )}
                                            {selectedJob.employment_type && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>{selectedJob.employment_type}</span>
                                                </div>
                                            )}
                                            {selectedJob.experience_level && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Users className="h-4 w-4" />
                                                    <span>{selectedJob.experience_level}</span>
                                                </div>
                                            )}
                                            {selectedJob.salary_range && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>{selectedJob.salary_range}</span>
                                                </div>
                                            )}
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="mt-6 space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                            <Building2 className="h-5 w-5" />
                                            About this role
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {selectedJob.requirements && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                {selectedJob.requirements}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                        <Button 
                                            size="lg" 
                                            className="flex-1 font-semibold"
                                            onClick={() => handleApplyClick(selectedJob)}
                                        >
                                            Apply Now
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            variant="outline"
                                            onClick={(e) => handleShare(e, selectedJob)}
                                        >
                                            <Share2 className="h-4 w-4 mr-2" />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Apply Dialog */}
                <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Apply for {selectedJob?.title}
                            </DialogTitle>
                            <DialogDescription>
                                Fill out the form below to apply for this position. We'll review your application and get back to you soon.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={submitApplication} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <PhoneInput
                                    id="phone"
                                    value={data.phone}
                                    onChange={(value) => setData('phone', value || '')}
                                    defaultCountry="BD"
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resume">Resume/CV *</Label>
                                <div 
                                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                                    onClick={() => resumeInputRef.current?.click()}
                                >
                                    <input
                                        ref={resumeInputRef}
                                        id="resume"
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleResumeChange}
                                        className="hidden"
                                        required={!data.resume}
                                    />
                                    {data.resume ? (
                                        <div className="flex items-center justify-center gap-2 text-primary">
                                            <CheckCircle className="h-5 w-5" />
                                            <span className="font-medium">{data.resume.name}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Upload className="h-8 w-8" />
                                            <span>Click to upload your resume</span>
                                            <span className="text-xs">PDF only (max 10MB)</span>
                                        </div>
                                    )}
                                </div>
                                {errors.resume && <p className="text-sm text-destructive">{errors.resume}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="portfolio_url">Portfolio URL (Optional)</Label>
                                <Input
                                    id="portfolio_url"
                                    type="url"
                                    value={data.portfolio_url}
                                    onChange={(e) => setData('portfolio_url', e.target.value)}
                                    placeholder="https://yourportfolio.com"
                                />
                                {errors.portfolio_url && <p className="text-sm text-destructive">{errors.portfolio_url}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cover_letter">Cover Letter (Optional)</Label>
                                <Textarea
                                    id="cover_letter"
                                    value={data.cover_letter}
                                    onChange={(e) => setData('cover_letter', e.target.value)}
                                    placeholder="Tell us why you're a great fit for this role..."
                                    rows={4}
                                />
                                {errors.cover_letter && <p className="text-sm text-destructive">{errors.cover_letter}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setApplyDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={processing}
                                >
                                    {processing ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
