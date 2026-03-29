import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Save, Upload, X, Clock, Plus, Trash2, Edit2, GripVertical } from 'lucide-react';
import { FormEventHandler, useRef, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PageItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
    image?: string;
    order: number;
}

interface AboutUsProps {
    main: any;
    stats: any;
    ceo_vision: any;
    values: any;
    process: any;
    certificates: any;
    affiliations: any;
    cta: any;
}

interface MainForm {
    title: string;
    description: string;
    image: File | null;
    image_url: string;
}

interface VisionForm {
    title: string;
    quote: string;
    description: string;
    button_text: string;
    button_link: string;
    image: File | null;
    image_url: string;
}

interface CtaForm {
    title: string;
    button_text: string;
    button_link: string;
}

export default function AboutUs({ main, stats, ceo_vision, values, process, certificates, affiliations, cta }: AboutUsProps) {
    const mainForm = useForm<MainForm>({
        title: main?.title || 'About Mechanix Interior',
        description: main?.description || 'We are dedicated to creating exceptional interior spaces that inspire and transform.',
        image: null,
        image_url: main?.image || '',
    });

    const visionForm = useForm<VisionForm>({
        title: ceo_vision?.title || "CEO's Vision",
        quote: ceo_vision?.quote || 'Our mission is to transform spaces and elevate experiences through innovative design.',
        description: ceo_vision?.description || 'We believe in creating timeless designs that reflect our clients\' unique personalities and needs.',
        button_text: ceo_vision?.button_text || 'Learn More',
        button_link: ceo_vision?.button_link || '#',
        image: null,
        image_url: ceo_vision?.image || '',
    });

    const ctaForm = useForm<CtaForm>({
        title: cta?.title || 'Ready to start your project?',
        button_text: cta?.button_text || 'Get in Touch',
        button_link: cta?.button_link || '#contact',
    });

    const submitMain: FormEventHandler = (e) => {
        e.preventDefault();
        mainForm.post('/admin/about-us/main', {
            forceFormData: true,
            onSuccess: () => toast.success('Main section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitVision: FormEventHandler = (e) => {
        e.preventDefault();
        visionForm.post('/admin/about-us/ceo-vision', {
            forceFormData: true,
            onSuccess: () => toast.success('CEO Vision updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitCta: FormEventHandler = (e) => {
        e.preventDefault();
        ctaForm.post('/admin/about-us/cta', {
            onSuccess: () => toast.success('CTA section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'About Us', href: '/admin/about-us' }]}>
            <Head title="About Us Management" />

            <div className="p-4 max-w-4xl mx-auto w-full space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">About Us Page</h1>
                        <p className="text-muted-foreground">Manage the content of the about us page.</p>
                    </div>
                    <Link href="/admin/timeline-events">
                        <Button variant="outline">
                            <Clock className="w-4 h-4 mr-2" />
                            Manage Timeline
                        </Button>
                    </Link>
                </div>

                {/* Main Section */}
                {/* <SectionCard title="Main Section">
                    <form onSubmit={submitMain} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                value={mainForm.data.title}
                                onChange={(e) => mainForm.setData('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={mainForm.data.description}
                                onChange={(e) => mainForm.setData('description', e.target.value)}
                                rows={4}
                            />
                        </div>
                        <ImageUpload
                            label="Main Image"
                            imageUrl={mainForm.data.image_url}
                            onFileChange={(file) => mainForm.setData('image', file)}
                            onRemove={() => {
                                mainForm.setData('image', null);
                                mainForm.setData('image_url', '');
                            }}
                        />
                        <Button type="submit" disabled={mainForm.processing}>
                            <Save className="w-4 h-4 mr-2" /> Save Main Section
                        </Button>
                    </form>
                </SectionCard> */}

                {/* Stats Section */}
                <ItemsManager
                    title="Stats Section"
                    sectionKey="stats"
                    items={stats?.items || []}
                    fields={['title', 'description']}
                    sectionTitle={stats?.title}
                    sectionDescription={stats?.description}
                    showSectionControls
                />

                {/* CEO Vision Section */}
                <SectionCard title="CEO Vision Section">
                    <form onSubmit={submitVision} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                value={visionForm.data.title}
                                onChange={(e) => visionForm.setData('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Quote</Label>
                            <Textarea
                                value={visionForm.data.quote}
                                onChange={(e) => visionForm.setData('quote', e.target.value)}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={visionForm.data.description}
                                onChange={(e) => visionForm.setData('description', e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    value={visionForm.data.button_text}
                                    onChange={(e) => visionForm.setData('button_text', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button Link</Label>
                                <Input
                                    value={visionForm.data.button_link}
                                    onChange={(e) => visionForm.setData('button_link', e.target.value)}
                                />
                            </div>
                        </div>
                        <ImageUpload
                            label="CEO Image"
                            imageUrl={visionForm.data.image_url}
                            onFileChange={(file) => visionForm.setData('image', file)}
                            onRemove={() => {
                                visionForm.setData('image', null);
                                visionForm.setData('image_url', '');
                            }}
                        />
                        <Button type="submit" disabled={visionForm.processing}>
                            <Save className="w-4 h-4 mr-2" /> {visionForm.processing ? 'Saving...' : 'Save CEO Vision'}
                        </Button>
                    </form>
                </SectionCard>

                {/* Values Section */}
                <ItemsManager
                    title="Core Values"
                    sectionKey="values"
                    items={values?.items || []}
                    fields={['title', 'description', 'icon']}
                    sectionTitle={values?.title}
                    sectionDescription={values?.description}
                    showSectionControls
                />

                {/* Process Section */}
                <ItemsManager
                    title="Implementation Process"
                    sectionKey="process"
                    items={process?.items || []}
                    fields={['title', 'description']}
                    sectionTitle={process?.title}
                    sectionDescription={process?.description}
                    showSectionControls
                />

                {/* Certificates Section */}
                <ItemsManager
                    title="Certificates"
                    sectionKey="certificates"
                    items={certificates?.items || []}
                    fields={['image']}
                    sectionTitle={certificates?.title}
                    sectionDescription={certificates?.description}
                    showSectionControls
                />

                {/* Affiliations Section */}
                <ItemsManager
                    title="Affiliations"
                    sectionKey="affiliations"
                    items={affiliations?.items || []}
                    fields={['image']}
                    sectionTitle={affiliations?.title}
                    sectionDescription={affiliations?.description}
                    showSectionControls
                />

                {/* CTA Section */}
                <SectionCard title="CTA Section">
                    <form onSubmit={submitCta} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                value={ctaForm.data.title}
                                onChange={(e) => ctaForm.setData('title', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    value={ctaForm.data.button_text}
                                    onChange={(e) => ctaForm.setData('button_text', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button Link</Label>
                                <Input
                                    value={ctaForm.data.button_link}
                                    onChange={(e) => ctaForm.setData('button_link', e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={ctaForm.processing}>
                            <Save className="w-4 h-4 mr-2" /> {ctaForm.processing ? 'Saving...' : 'Save CTA Section'}
                        </Button>
                    </form>
                </SectionCard>
            </div>
        </AppLayout>
    );
}

function SectionCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="bg-background rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function ImageUpload({ label, imageUrl, onFileChange, onRemove }: { label: string, imageUrl: string, onFileChange: (file: File) => void, onRemove: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    const validateFile = (file: File): boolean => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            toast.error('Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG');
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File is too large. Maximum size is 5MB');
            return false;
        }
        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (validateFile(file)) {
                onFileChange(file);
            } else if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex flex-col gap-4">
                {imageUrl && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-background">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={onRemove}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}
                <div className="space-y-1">
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept={ALLOWED_FILE_TYPES.join(',')}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {imageUrl ? 'Change Image' : 'Upload Image'}
                    </Button>
                    <p className="text-xs text-muted-foreground">Max 5MB • JPG, PNG, GIF, WebP, SVG</p>
                </div>
            </div>
        </div>
    );
}

interface ItemForm {
    section_key: string;
    title: string;
    description: string;
    icon: string;
    image: File | null;
    order: number;
}

interface SectionHeaderForm {
    section_key: string;
    title: string;
    description: string;
}

interface ItemsManagerProps {
    title: string;
    sectionKey: string;
    items: PageItem[];
    fields: string[];
    sectionTitle?: string;
    sectionDescription?: string;
    showSectionControls?: boolean;
}

function ItemsManager({ title, sectionKey, items, fields, sectionTitle, sectionDescription, showSectionControls = false }: ItemsManagerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PageItem | null>(null);
    const [showHeaderEdit, setShowHeaderEdit] = useState(false);
    const [deleteConfirmItem, setDeleteConfirmItem] = useState<PageItem | null>(null);

    const form = useForm<ItemForm>({
        section_key: sectionKey,
        title: '',
        description: '',
        icon: '',
        image: null,
        order: items.length + 1,
    });

    const headerForm = useForm<SectionHeaderForm>({
        section_key: sectionKey,
        title: sectionTitle || '',
        description: sectionDescription || '',
    });

    useEffect(() => {
        if (editingItem) {
            form.setData({
                section_key: sectionKey,
                title: editingItem.title || '',
                description: editingItem.description || '',
                icon: editingItem.icon || '',
                image: null,
                order: editingItem.order,
            });
        } else {
            form.reset();
            form.setData('section_key', sectionKey);
        }
    }, [editingItem, isOpen]);

    useEffect(() => {
        headerForm.setData({
            section_key: sectionKey,
            title: sectionTitle || '',
            description: sectionDescription || '',
        });
    }, [sectionKey, sectionTitle, sectionDescription]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingItem) {
            form.post(`/admin/about-us/items/${editingItem.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingItem(null);
                    toast.success('Item updated');
                },
                onError: () => toast.error('Failed to save. Please try again.'),
            });
        } else {
            form.post('/admin/about-us/items', {
                forceFormData: true,
                onSuccess: () => {
                    setIsOpen(false);
                    toast.success('Item added');
                },
                onError: () => toast.error('Failed to save. Please try again.'),
            });
        }
    };

    const handleHeaderSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        headerForm.post('/admin/about-us/section', {
            onSuccess: () => {
                setShowHeaderEdit(false);
                toast.success('Section header updated');
            },
            onError: () => toast.error('Failed to save section header'),
        });
    };

    const handleDelete = (item: PageItem) => {
        router.delete(`/admin/about-us/items/${item.id}`, {
            onSuccess: () => {
                toast.success('Item deleted');
                setDeleteConfirmItem(null);
            },
            onError: () => toast.error('Failed to delete. Please try again.'),
        });
    };

    return (
        <SectionCard title={title}>
            <div className="space-y-4">
                {showSectionControls && (
                    <div className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-background/80">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Section heading</p>
                            <p className="font-semibold">{sectionTitle || 'Untitled section'}</p>
                            {sectionDescription && (
                                <p className="text-sm text-muted-foreground">{sectionDescription}</p>
                            )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setShowHeaderEdit(true)}>
                            <Edit2 className="w-4 h-4 mr-2" /> Edit header
                        </Button>
                    </div>
                )}

                <div className="grid gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                            <div className="flex items-center gap-4">
                                {item.image && (
                                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                                )}
                                <div>
                                    {item.title && <h3 className="font-semibold">{item.title}</h3>}
                                    {item.description && <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost" onClick={() => { setEditingItem(item); setIsOpen(true); }}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteConfirmItem(item)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingItem(null); }}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {fields.includes('title') && (
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={form.data.title}
                                        onChange={(e) => form.setData('title', e.target.value)}
                                    />
                                </div>
                            )}
                            {fields.includes('description') && (
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={form.data.description}
                                        onChange={(e) => form.setData('description', e.target.value)}
                                    />
                                </div>
                            )}
                            {fields.includes('icon') && (
                                <div className="space-y-2">
                                    <Label>Icon (Lucide name)</Label>
                                    <Input
                                        value={form.data.icon}
                                        onChange={(e) => form.setData('icon', e.target.value)}
                                    />
                                </div>
                            )}
                            {fields.includes('image') && (
                                <div className="space-y-2">
                                    <Label>Image</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => form.setData('image', e.target.files?.[0] || null)}
                                    />
                                </div>
                            )}
                            <DialogFooter>
                                <Button type="submit" disabled={form.processing}>
                                    {form.processing ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={showHeaderEdit} onOpenChange={(open) => setShowHeaderEdit(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Section Header</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleHeaderSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={headerForm.data.title}
                                    onChange={(e) => headerForm.setData('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={headerForm.data.description}
                                    onChange={(e) => headerForm.setData('description', e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="ghost" onClick={() => setShowHeaderEdit(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={headerForm.processing}>
                                    {headerForm.processing ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={deleteConfirmItem !== null} onOpenChange={(open) => !open && setDeleteConfirmItem(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Item</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this item? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => deleteConfirmItem && handleDelete(deleteConfirmItem)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </SectionCard>
    );
}
