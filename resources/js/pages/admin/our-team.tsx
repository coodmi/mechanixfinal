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
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Users, Upload, X, Plus, Pencil, Trash2 } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

declare var route: any;

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
    button_text?: string;
    button_link?: string;
    items?: PageItem[];
}

interface OurTeamProps {
    whole_team_photo: SectionData;
    hero: SectionData;
    ceo_quote: SectionData;
    team_quote: SectionData;
    beyond_desk: SectionData;
    team_motion: SectionData;
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

// Items Manager Component for galleries/carousels
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

    const deleteForm = useForm({});

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingItem) {
            form.post(route('our-team.items.update', editingItem.id), {
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
            form.post(route('our-team.items.store'), {
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
        deleteForm.delete(route('our-team.items.destroy', itemId), {
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
                <Button type="button" size="sm" onClick={() => setIsOpen(true)}>
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
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default function OurTeam({ whole_team_photo, hero, ceo_quote, team_quote, beyond_desk, team_motion }: OurTeamProps) {
    // Whole Team Photo Form
    const wholeTeamPhotoForm = useForm({
        image: null as File | null,
        image_url: whole_team_photo?.image || '',
    });

    // Hero Form
    const heroForm = useForm({
        title: hero?.title || '',
        description: hero?.description || '',
        button_text: hero?.button_text || '',
        button_link: hero?.button_link || '',
    });

    // CEO Quote Form
    const ceoQuoteForm = useForm({
        quote: ceo_quote?.quote || '',
        author: ceo_quote?.author || '',
        image: null as File | null,
        image_url: ceo_quote?.image || '',
    });

    // Team Quote Form
    const teamQuoteForm = useForm({
        quote: team_quote?.quote || '',
        author: team_quote?.author || '',
    });

    // Beyond Desk Form
    const beyondDeskForm = useForm({
        title: beyond_desk?.title || '',
    });

    // Team Motion Form
    const teamMotionForm = useForm({
        title: team_motion?.title || '',
    });

    const submitWholeTeamPhoto: FormEventHandler = (e) => {
        e.preventDefault();
        wholeTeamPhotoForm.post('/admin/our-team/whole-team-photo', {
            forceFormData: true,
            onSuccess: () => toast.success('Whole Team Photo updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitHero: FormEventHandler = (e) => {
        e.preventDefault();
        heroForm.post('/admin/our-team/hero', {
            onSuccess: () => toast.success('Hero section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitCeoQuote: FormEventHandler = (e) => {
        e.preventDefault();
        ceoQuoteForm.post('/admin/our-team/ceo-quote', {
            forceFormData: true,
            onSuccess: () => toast.success('CEO Quote updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitTeamQuote: FormEventHandler = (e) => {
        e.preventDefault();
        teamQuoteForm.post('/admin/our-team/team-quote', {
            onSuccess: () => toast.success('Team Quote updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitBeyondDesk: FormEventHandler = (e) => {
        e.preventDefault();
        beyondDeskForm.post('/admin/our-team/beyond-desk', {
            onSuccess: () => toast.success('Beyond Desk section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    const submitTeamMotion: FormEventHandler = (e) => {
        e.preventDefault();
        teamMotionForm.post('/admin/our-team/team-motion', {
            onSuccess: () => toast.success('Team Motion section updated!'),
            onError: () => toast.error('Failed to save. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Our Team Page', href: '/admin/our-team' }]}>
            <Head title="Our Team Management" />

            <div className="p-4 max-w-6xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Our Team Page</h1>
                        <p className="text-muted-foreground">Manage the content of the our team page.</p>
                    </div>
                    <Link href="/admin/team-members">
                        <Button variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Manage Team Members
                        </Button>
                    </Link>
                </div>

                {/* Whole Team Photo Section */}
                <SectionCard title="Whole Team Photo">
                    <form onSubmit={submitWholeTeamPhoto} className="space-y-6">
                        <ImageUpload
                            value={wholeTeamPhotoForm.data.image_url}
                            onChange={(file) => {
                                wholeTeamPhotoForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    wholeTeamPhotoForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                wholeTeamPhotoForm.setData({ ...wholeTeamPhotoForm.data, image: null, image_url: '' });
                            }}
                            label="Whole Team Image"
                            error={wholeTeamPhotoForm.errors.image}
                        />
                        <Button type="submit" disabled={wholeTeamPhotoForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Whole Team Photo
                        </Button>
                    </form>
                </SectionCard>

                {/* CEO Quote Section */}
                <SectionCard title="CEO Quote Section">
                    <form onSubmit={submitCeoQuote} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="ceo_quote">Quote</Label>
                            <Textarea
                                id="ceo_quote"
                                value={ceoQuoteForm.data.quote}
                                onChange={(e) => ceoQuoteForm.setData('quote', e.target.value)}
                                placeholder="Nexkraft is constantly pushing boundaries..."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ceo_author">Author</Label>
                            <Input
                                id="ceo_author"
                                value={ceoQuoteForm.data.author}
                                onChange={(e) => ceoQuoteForm.setData('author', e.target.value)}
                                placeholder="Md. Shahriar Khan, CEO"
                            />
                        </div>
                        <ImageUpload
                            value={ceoQuoteForm.data.image_url}
                            onChange={(file) => {
                                ceoQuoteForm.setData('image', file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    ceoQuoteForm.setData('image_url', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onRemove={() => {
                                ceoQuoteForm.setData({ ...ceoQuoteForm.data, image: null, image_url: '' });
                            }}
                            label="CEO Image"
                            error={ceoQuoteForm.errors.image}
                        />
                        <Button type="submit" disabled={ceoQuoteForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save CEO Quote
                        </Button>
                    </form>
                </SectionCard>

                {/* Team Quote Section */}
                <SectionCard title="Team Quote Section">
                    <form onSubmit={submitTeamQuote} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="team_quote">Quote</Label>
                            <Textarea
                                id="team_quote"
                                value={teamQuoteForm.data.quote}
                                onChange={(e) => teamQuoteForm.setData('quote', e.target.value)}
                                placeholder="No matter how brilliant your mind..."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="team_author">Author</Label>
                            <Input
                                id="team_author"
                                value={teamQuoteForm.data.author}
                                onChange={(e) => teamQuoteForm.setData('author', e.target.value)}
                                placeholder="Reid Hoffman, LinkedIn Co-founder"
                            />
                        </div>
                        <Button type="submit" disabled={teamQuoteForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Team Quote
                        </Button>
                    </form>
                </SectionCard>

                {/* Beyond the Desk Section */}
                <SectionCard title="Beyond the Desk Section">
                    <form onSubmit={submitBeyondDesk} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="beyond_desk_title">Section Title</Label>
                            <Input
                                id="beyond_desk_title"
                                value={beyondDeskForm.data.title}
                                onChange={(e) => beyondDeskForm.setData('title', e.target.value)}
                                placeholder="Nexkraft People: Beyond the Desk"
                            />
                        </div>
                        <Button type="submit" disabled={beyondDeskForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Section Title
                        </Button>
                    </form>
                    <div className="mt-6">
                        {beyond_desk?.section_id && beyond_desk?.items && (
                            <ItemsManager
                                sectionId={beyond_desk.section_id}
                                items={beyond_desk.items}
                                sectionTitle="Gallery Images"
                            />
                        )}
                    </div>
                </SectionCard>

                {/* Team in Motion Section */}
                <SectionCard title="Team in Motion Section">
                    <form onSubmit={submitTeamMotion} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="team_motion_title">Section Title</Label>
                            <Input
                                id="team_motion_title"
                                value={teamMotionForm.data.title}
                                onChange={(e) => teamMotionForm.setData('title', e.target.value)}
                                placeholder="Get to Know Us: Watch the Nexkraft Team in Motion"
                            />
                        </div>
                        <Button type="submit" disabled={teamMotionForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Section Title
                        </Button>
                    </form>
                    <div className="mt-6">
                        {team_motion?.section_id && team_motion?.items && (
                            <ItemsManager
                                sectionId={team_motion.section_id}
                                items={team_motion.items}
                                sectionTitle="Carousel Images"
                            />
                        )}
                    </div>
                </SectionCard>
            </div>
        </AppLayout>
    );
}
