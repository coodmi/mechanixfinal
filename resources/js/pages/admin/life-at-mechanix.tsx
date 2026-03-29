import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, X, Plus, Pencil, Trash2 } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

interface PageItem {
    id: number;
    image?: string;
    order: number;
}

interface SectionData {
    section_id?: number;
    title?: string;
    description?: string;
    quote?: string;
    author?: string;
    image?: string;
    items?: PageItem[];
}

interface LifeAtMechanixProps {
    tech_zone: SectionData;
    design_zone: SectionData;
    meeting_zone: SectionData;
    quote: SectionData;
    coffee_zone: SectionData;
    team_dinner: SectionData;
    glimpse: SectionData;
    team_gallery: SectionData;
}

// Reusable Section Card Component
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

// Reusable Image Upload Component
function ImageUpload({
    value,
    onChange,
    onRemove,
    label,
    error,
}: {
    value: string;
    onChange: (file: File) => void;
    onRemove: () => void;
    label: string;
    error?: string;
}) {
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
                onChange(file);
            } else if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex flex-col gap-4">
                {value && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <img src={value} alt={label} className="w-full h-full object-cover" />
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
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        {value ? 'Change Image' : 'Upload Image'}
                    </Button>
                    <p className="text-xs text-muted-foreground">Max 5MB • JPG, PNG, GIF, WebP, SVG</p>
                </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

// Items Manager Component for galleries
function ItemsManager({ sectionId, items, sectionTitle }: { sectionId: number; items: PageItem[]; sectionTitle: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PageItem | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        page_section_id: sectionId,
        image: null as File | null,
        image_url: '',
        order: items.length + 1,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingItem) {
            form.post(`/admin/life-at-mechanix/items/${editingItem.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingItem(null);
                    form.reset();
                    toast.success('Item updated');
                },
                onError: () => toast.error('Failed to save. Please try again.'),
            });
        } else {
            form.post('/admin/life-at-mechanix/items', {
                forceFormData: true,
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                    toast.success('Item added');
                },
                onError: () => toast.error('Failed to save. Please try again.'),
            });
        }
    };

    const handleEdit = (item: PageItem) => {
        setEditingItem(item);
        form.setData({
            page_section_id: sectionId,
            image: null,
            image_url: item.image || '',
            order: item.order,
        });
        setIsOpen(true);
    };

    const handleDelete = (itemId: number) => {
        form.delete(`/admin/life-at-mechanix/items/${itemId}`, {
            onSuccess: () => {
                toast.success('Item deleted');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete. Please try again.'),
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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>{sectionTitle}</Label>
                <Button type="button" size="sm" onClick={() => { setEditingItem(null); form.reset(); form.setData('page_section_id', sectionId); form.setData('order', items.length + 1); setIsOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                </Button>
            </div>

            {items && items.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="relative group">
                            <img
                                src={item.image}
                                alt="Item"
                                className="w-full h-32 object-cover rounded-lg border"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleEdit(item)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setDeleteConfirmId(item.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <div className="flex flex-col gap-4">
                                {form.data.image_url && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <img
                                            src={form.data.image_url}
                                            alt="Preview"
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order</Label>
                            <Input
                                id="order"
                                type="number"
                                value={form.data.order}
                                onChange={(e) => form.setData('order', parseInt(e.target.value))}
                            />
                        </div>

                        <Button type="submit" disabled={form.processing} className="w-full">
                            {editingItem ? 'Update' : 'Add'} Item
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
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
                            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default function LifeAtMechanix({ tech_zone, design_zone, meeting_zone, quote, coffee_zone, team_dinner, glimpse, team_gallery }: LifeAtMechanixProps) {
    // Tech Zone Form
    const techZoneForm = useForm({
        title: tech_zone?.title || '',
        description: tech_zone?.description || '',
        image: null as File | null,
        image_url: tech_zone?.image || '',
    });

    // Design Zone Form
    const designZoneForm = useForm({
        title: design_zone?.title || '',
        description: design_zone?.description || '',
        image: null as File | null,
        image_url: design_zone?.image || '',
    });

    // Meeting Zone Form
    const meetingZoneForm = useForm({
        title: meeting_zone?.title || '',
        description: meeting_zone?.description || '',
        image: null as File | null,
        image_url: meeting_zone?.image || '',
    });

    // Quote Form
    const quoteForm = useForm({
        quote: quote?.quote || '',
        author: quote?.author || '',
    });

    // Coffee Zone Form
    const coffeeZoneForm = useForm({
        title: coffee_zone?.title || '',
        description: coffee_zone?.description || '',
        image: null as File | null,
        image_url: coffee_zone?.image || '',
    });

    // Team Dinner Form
    const teamDinnerForm = useForm({
        title: team_dinner?.title || '',
        description: team_dinner?.description || '',
        image: null as File | null,
        image_url: team_dinner?.image || '',
    });

    // Glimpse Form
    const glimpseForm = useForm({
        title: glimpse?.title || '',
    });

    // Submit handlers
    const submitTechZone: FormEventHandler = (e) => {
        e.preventDefault();
        techZoneForm.post('/admin/life-at-mechanix/tech-zone', {
            forceFormData: true,
            onSuccess: () => toast.success('Tech Zone updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitDesignZone: FormEventHandler = (e) => {
        e.preventDefault();
        designZoneForm.post('/admin/life-at-mechanix/design-zone', {
            forceFormData: true,
            onSuccess: () => toast.success('Design Zone updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitMeetingZone: FormEventHandler = (e) => {
        e.preventDefault();
        meetingZoneForm.post('/admin/life-at-mechanix/meeting-zone', {
            forceFormData: true,
            onSuccess: () => toast.success('Meeting Zone updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitQuote: FormEventHandler = (e) => {
        e.preventDefault();
        quoteForm.post('/admin/life-at-mechanix/quote', {
            onSuccess: () => toast.success('Quote updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitCoffeeZone: FormEventHandler = (e) => {
        e.preventDefault();
        coffeeZoneForm.post('/admin/life-at-mechanix/coffee-zone', {
            forceFormData: true,
            onSuccess: () => toast.success('Coffee Zone updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitTeamDinner: FormEventHandler = (e) => {
        e.preventDefault();
        teamDinnerForm.post('/admin/life-at-mechanix/team-dinner', {
            forceFormData: true,
            onSuccess: () => toast.success('Team Dinner updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitGlimpse: FormEventHandler = (e) => {
        e.preventDefault();
        glimpseForm.post('/admin/life-at-mechanix/glimpse', {
            onSuccess: () => toast.success('Glimpse section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Life at Mechanix Page', href: '/admin/life-at-mechanix' }]}>
            <Head title="Life at Mechanix Management" />

            <div className="p-4 max-w-6xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Life at Mechanix Page</h1>
                        <p className="text-muted-foreground">Manage the content of the life at mechanix page.</p>
                    </div>
                </div>

                {/* Tech Zone Section */}
                <SectionCard title="Tech Zone Section">
                    <form onSubmit={submitTechZone} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="tech_title">Title</Label>
                            <Input
                                id="tech_title"
                                value={techZoneForm.data.title}
                                onChange={(e) => techZoneForm.setData('title', e.target.value)}
                                placeholder="Tech Zone"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tech_description">Description</Label>
                            <Textarea
                                id="tech_description"
                                value={techZoneForm.data.description}
                                onChange={(e) => techZoneForm.setData('description', e.target.value)}
                                placeholder="Description of the tech zone..."
                                rows={3}
                            />
                        </div>
                        <ImageUpload
                            value={techZoneForm.data.image_url}
                            onChange={(file) => {
                                techZoneForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    techZoneForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                techZoneForm.setData({ ...techZoneForm.data, image: null, image_url: '' });
                            }}
                            label="Tech Zone Image"
                            error={techZoneForm.errors.image}
                        />
                        <Button type="submit" disabled={techZoneForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Tech Zone
                        </Button>
                    </form>
                </SectionCard>

                {/* Design Zone Section */}
                <SectionCard title="Design Zone Section">
                    <form onSubmit={submitDesignZone} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="design_title">Title</Label>
                            <Input
                                id="design_title"
                                value={designZoneForm.data.title}
                                onChange={(e) => designZoneForm.setData('title', e.target.value)}
                                placeholder="Design Zone"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="design_description">Description</Label>
                            <Textarea
                                id="design_description"
                                value={designZoneForm.data.description}
                                onChange={(e) => designZoneForm.setData('description', e.target.value)}
                                placeholder="Description of the design zone..."
                                rows={3}
                            />
                        </div>
                        <ImageUpload
                            value={designZoneForm.data.image_url}
                            onChange={(file) => {
                                designZoneForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    designZoneForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                designZoneForm.setData({ ...designZoneForm.data, image: null, image_url: '' });
                            }}
                            label="Design Zone Image"
                            error={designZoneForm.errors.image}
                        />
                        <Button type="submit" disabled={designZoneForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Design Zone
                        </Button>
                    </form>
                </SectionCard>

                {/* Meeting Zone Section */}
                <SectionCard title="Meeting Zone Section">
                    <form onSubmit={submitMeetingZone} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="meeting_title">Title</Label>
                            <Input
                                id="meeting_title"
                                value={meetingZoneForm.data.title}
                                onChange={(e) => meetingZoneForm.setData('title', e.target.value)}
                                placeholder="Meeting Zone"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meeting_description">Description</Label>
                            <Textarea
                                id="meeting_description"
                                value={meetingZoneForm.data.description}
                                onChange={(e) => meetingZoneForm.setData('description', e.target.value)}
                                placeholder="Description of the meeting zone..."
                                rows={3}
                            />
                        </div>
                        <ImageUpload
                            value={meetingZoneForm.data.image_url}
                            onChange={(file) => {
                                meetingZoneForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    meetingZoneForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                meetingZoneForm.setData({ ...meetingZoneForm.data, image: null, image_url: '' });
                            }}
                            label="Meeting Zone Image"
                            error={meetingZoneForm.errors.image}
                        />
                        <Button type="submit" disabled={meetingZoneForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Meeting Zone
                        </Button>
                    </form>
                </SectionCard>

                {/* Quote Section */}
                <SectionCard title="Quote Section">
                    <form onSubmit={submitQuote} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="quote_text">Quote</Label>
                            <Textarea
                                id="quote_text"
                                value={quoteForm.data.quote}
                                onChange={(e) => quoteForm.setData('quote', e.target.value)}
                                placeholder="Enter an inspiring quote..."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote_author">Author</Label>
                            <Input
                                id="quote_author"
                                value={quoteForm.data.author}
                                onChange={(e) => quoteForm.setData('author', e.target.value)}
                                placeholder="Quote author"
                            />
                        </div>
                        <Button type="submit" disabled={quoteForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Quote
                        </Button>
                    </form>
                </SectionCard>

                {/* Coffee Zone Section */}
                <SectionCard title="Coffee Zone Section">
                    <form onSubmit={submitCoffeeZone} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="coffee_title">Title</Label>
                            <Input
                                id="coffee_title"
                                value={coffeeZoneForm.data.title}
                                onChange={(e) => coffeeZoneForm.setData('title', e.target.value)}
                                placeholder="Coffee Zone"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="coffee_description">Description</Label>
                            <Textarea
                                id="coffee_description"
                                value={coffeeZoneForm.data.description}
                                onChange={(e) => coffeeZoneForm.setData('description', e.target.value)}
                                placeholder="Description of the coffee zone..."
                                rows={3}
                            />
                        </div>
                        <ImageUpload
                            value={coffeeZoneForm.data.image_url}
                            onChange={(file) => {
                                coffeeZoneForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    coffeeZoneForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                coffeeZoneForm.setData({ ...coffeeZoneForm.data, image: null, image_url: '' });
                            }}
                            label="Coffee Zone Image"
                            error={coffeeZoneForm.errors.image}
                        />
                        <Button type="submit" disabled={coffeeZoneForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Coffee Zone
                        </Button>
                    </form>
                </SectionCard>

                {/* Team Dinner Section */}
                <SectionCard title="Team Dinner Section">
                    <form onSubmit={submitTeamDinner} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="dinner_title">Title</Label>
                            <Input
                                id="dinner_title"
                                value={teamDinnerForm.data.title}
                                onChange={(e) => teamDinnerForm.setData('title', e.target.value)}
                                placeholder="Team Dinner"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dinner_description">Description</Label>
                            <Textarea
                                id="dinner_description"
                                value={teamDinnerForm.data.description}
                                onChange={(e) => teamDinnerForm.setData('description', e.target.value)}
                                placeholder="Description of team dinner events..."
                                rows={3}
                            />
                        </div>
                        <ImageUpload
                            value={teamDinnerForm.data.image_url}
                            onChange={(file) => {
                                teamDinnerForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    teamDinnerForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                teamDinnerForm.setData({ ...teamDinnerForm.data, image: null, image_url: '' });
                            }}
                            label="Team Dinner Image"
                            error={teamDinnerForm.errors.image}
                        />
                        <Button type="submit" disabled={teamDinnerForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Team Dinner
                        </Button>
                    </form>
                </SectionCard>

                {/* Glimpse Section */}
                <SectionCard title="Glimpse of Life Section">
                    <form onSubmit={submitGlimpse} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="glimpse_title">Section Title</Label>
                            <Input
                                id="glimpse_title"
                                value={glimpseForm.data.title}
                                onChange={(e) => glimpseForm.setData('title', e.target.value)}
                                placeholder="Glimpse of Life at Mechanix"
                            />
                        </div>
                        <Button type="submit" disabled={glimpseForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Section Title
                        </Button>
                    </form>
                    <div className="mt-6">
                        {glimpse?.section_id && (
                            <ItemsManager
                                sectionId={glimpse.section_id}
                                items={glimpse.items || []}
                                sectionTitle="Gallery Images"
                            />
                        )}
                    </div>
                </SectionCard>

                {/* Team Gallery Section */}
                <SectionCard title="Team Gallery Section">
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Manage the team gallery images displayed on the page.</p>
                        {team_gallery?.section_id && (
                            <ItemsManager
                                sectionId={team_gallery.section_id}
                                items={team_gallery.items || []}
                                sectionTitle="Team Gallery Images"
                            />
                        )}
                    </div>
                </SectionCard>
            </div>
        </AppLayout>
    );
}
