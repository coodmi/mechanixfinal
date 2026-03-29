import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Edit, Plus, Trash, Upload, X, Save } from 'lucide-react';import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
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

interface Tip {
    id: number;
    title: string;
    content: string;
    image: string;
    published_at: string;
    is_active: boolean;
}

interface TipsProps {
    tips: Tip[];
    settings: {
        page_title: string;
        page_subtitle: string;
        meta_title: string;
        meta_description: string;
    };
    quote: {
        text: string;
        quote_highlight: string;
        author: string;
        background_image: string;
    };
    categories: string[];
}

export default function AdminTips({ tips, settings, quote, categories: initialCategories }: TipsProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTip, setEditingTip] = useState<Tip | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

    const allSelected = tips.length > 0 && selectedIds.size === tips.length;
    const someSelected = selectedIds.size > 0 && !allSelected;

    const toggleSelectAll = (checked: boolean) =>
        setSelectedIds(checked ? new Set(tips.map((t) => t.id)) : new Set());

    const toggleSelect = (id: number, checked: boolean) =>
        setSelectedIds((prev) => { const n = new Set(prev); checked ? n.add(id) : n.delete(id); return n; });

    const handleBulkDelete = () => {
        router.post('/admin/tips/bulk-delete', { ids: Array.from(selectedIds) }, {
            onSuccess: () => { toast.success(`${selectedIds.size} tip(s) deleted.`); setSelectedIds(new Set()); setBulkDeleteConfirm(false); },
            onError: () => toast.error('Failed to delete selected tips.'),
        });
    };
    const [tipCategories, setTipCategories] = useState<string[]>(initialCategories ?? []);
    const [newCategory, setNewCategory] = useState('');
    const [savingCats, setSavingCats] = useState(false);

    const saveCategories = (cats: string[]) => {
        setSavingCats(true);
        router.post('/admin/tips/categories', { categories: cats }, {
            preserveScroll: true,
            onSuccess: () => { toast.success('Categories updated.'); setSavingCats(false); },
            onError:   () => { toast.error('Failed to update categories.'); setSavingCats(false); },
        });
    };

    const addCategory = () => {
        const t = newCategory.trim();
        if (!t || tipCategories.includes(t)) return;
        const updated = [...tipCategories, t];
        setTipCategories(updated);
        setNewCategory('');
        saveCategories(updated);
    };

    const removeCategory = (cat: string) => {
        const updated = tipCategories.filter((c) => c !== cat);
        setTipCategories(updated);
        saveCategories(updated);
    };

    // Page Settings form
    const settingsForm = useForm({
        page_title: settings?.page_title || '',
        page_subtitle: settings?.page_subtitle || '',
        meta_title: settings?.meta_title || '',
        meta_description: settings?.meta_description || '',
    });

    // Quote form
    const quoteForm = useForm({
        text: quote?.text || '',
        quote_highlight: quote?.quote_highlight || '',
        author: quote?.author || '',
        background_image: null as File | null,
    });
    const bgImageRef = useRef<HTMLInputElement>(null);
    const [bgPreview, setBgPreview] = useState(quote?.background_image || '');

    const createForm = useForm({
        title: '',
        category: '',
        content: '',
        image: null as File | null,
        image_url: '',
        published_at: new Date().toISOString().split('T')[0],
        is_active: true,
    });

    const editForm = useForm({
        _method: 'PUT' as const,
        title: '',
        category: '',
        content: '',
        image: null as File | null,
        image_url: '',
        published_at: '',
        is_active: true,
    });

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createForm.post('/admin/tips', { 
            forceFormData: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
                toast.success('Tip created successfully!');
            },
            onError: () => toast.error('Failed to create tip. Please try again.'),
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingTip) return;
        editForm.post(`/admin/tips/${editingTip.id}`, { 
            forceFormData: true,
            onSuccess: () => {
                setEditingTip(null);
                editForm.reset();
                toast.success('Tip updated successfully!');
            },
            onError: () => toast.error('Failed to update tip. Please try again.'),
        });
    };

    const deleteTip = (id: number) => {
        createForm.delete(`/admin/tips/${id}`, {
            onSuccess: () => {
                toast.success('Tip deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete tip. Please try again.'),
        });
    };

    const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            createForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                createForm.setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                editForm.setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const openEditModal = (tip: Tip) => {
        setEditingTip(tip);
        editForm.setData({
            _method: 'PUT',
            title: tip.title,
            category: tip.category || '',
            content: tip.content,
            image: null,
            image_url: tip.image,
            published_at: tip.published_at ? new Date(tip.published_at).toISOString().split('T')[0] : '',
            is_active: tip.is_active,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Manage Articles', href: '/admin/tips' }, { title: 'Manage Tips', href: '/admin/tips' }]}>
            <Head title="Manage Tips" />

            <div className="p-4 max-w-6xl mx-auto w-full space-y-8">

                {/* Page Sections */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Page Sections</h2>
                    <form onSubmit={(e) => { e.preventDefault(); settingsForm.post('/admin/tips-page-settings', { onSuccess: () => toast.success('Page settings saved!'), onError: () => toast.error('Failed to save.') }); }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Page Title</Label>
                                <Input value={settingsForm.data.page_title} onChange={(e) => settingsForm.setData('page_title', e.target.value)} placeholder="Design Tips & Insights" />
                            </div>
                            <div className="space-y-2">
                                <Label>Page Subtitle</Label>
                                <Input value={settingsForm.data.page_subtitle} onChange={(e) => settingsForm.setData('page_subtitle', e.target.value)} placeholder="Expert advice..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Meta Title</Label>
                                <Input value={settingsForm.data.meta_title} onChange={(e) => settingsForm.setData('meta_title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Meta Description</Label>
                                <Input value={settingsForm.data.meta_description} onChange={(e) => settingsForm.setData('meta_description', e.target.value)} />
                            </div>
                        </div>
                        <Button type="submit" disabled={settingsForm.processing}><Save className="w-4 h-4 mr-2" />Save Page Settings</Button>
                    </form>
                </div>

                {/* Quote Section */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Quote Section</h2>
                    <form onSubmit={(e) => { e.preventDefault(); quoteForm.post('/admin/tips-quote', { forceFormData: true, onSuccess: () => toast.success('Quote saved!'), onError: () => toast.error('Failed to save.') }); }} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Quote Text</Label>
                            <Textarea value={quoteForm.data.text} onChange={(e) => quoteForm.setData('text', e.target.value)} rows={3} placeholder="Inspiring quote..." />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Highlight Word</Label>
                                <Input value={quoteForm.data.quote_highlight} onChange={(e) => quoteForm.setData('quote_highlight', e.target.value)} placeholder="design" />
                            </div>
                            <div className="space-y-2">
                                <Label>Author</Label>
                                <Input value={quoteForm.data.author} onChange={(e) => quoteForm.setData('author', e.target.value)} placeholder="Author name" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Background Image</Label>
                            {bgPreview && <img src={bgPreview} className="h-32 rounded-lg object-cover mb-2" alt="bg preview" />}
                            <input ref={bgImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f){ quoteForm.setData('background_image', f); setBgPreview(URL.createObjectURL(f)); } }} />
                            <Button type="button" variant="outline" onClick={() => bgImageRef.current?.click()}><Upload className="w-4 h-4 mr-2" />Upload Background</Button>
                        </div>
                        <Button type="submit" disabled={quoteForm.processing}><Save className="w-4 h-4 mr-2" />Save Quote</Button>
                    </form>
                </div>

                {/* Categories */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-1">Categories</h2>
                    <p className="text-sm text-muted-foreground mb-4">Add or remove tip categories used in the filter.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tipCategories.map((cat) => (
                            <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                {cat}
                                <button type="button" onClick={() => removeCategory(cat)} className="hover:text-destructive transition-colors ml-0.5" aria-label={`Remove ${cat}`}>
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                        {tipCategories.length === 0 && <p className="text-sm text-muted-foreground">No categories yet.</p>}
                    </div>
                    <div className="flex gap-2 max-w-sm">
                        <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name..."
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                        />
                        <Button type="button" onClick={addCategory} disabled={savingCats || !newCategory.trim()}>
                            <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Design Tips</h1>
                        <p className="text-muted-foreground">Manage your design tips and blog posts.</p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Tip
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Tip</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={createForm.data.title}
                                        onChange={(e) => createForm.setData('title', e.target.value)}
                                        placeholder="Tip Title"
                                    />
                                    {createForm.errors.title && <p className="text-sm text-destructive">{createForm.errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create_category">Category</Label>
                                    <select
                                        id="create_category"
                                        value={createForm.data.category}
                                        onChange={(e) => createForm.setData('category', e.target.value)}
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">Select a category</option>
                                        {tipCategories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={createForm.data.content}
                                        onChange={(e) => createForm.setData('content', e.target.value)}
                                        placeholder="Tip content..."
                                        rows={10}
                                    />
                                    {createForm.errors.content && <p className="text-sm text-destructive">{createForm.errors.content}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Cover Image</Label>
                                    <div className="flex flex-col gap-4">
                                        {createForm.data.image_url && (
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                                                <img
                                                    src={createForm.data.image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCreateFileChange}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {createForm.errors.image && <p className="text-sm text-destructive">{createForm.errors.image}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="published_at">Publish Date</Label>
                                    <Input
                                        id="published_at"
                                        type="date"
                                        value={createForm.data.published_at}
                                        onChange={(e) => createForm.setData('published_at', e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={createForm.processing}>
                                        Save Tip
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Bulk action bar */}
                {selectedIds.size > 0 && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl">
                        <span className="text-sm font-medium">{selectedIds.size} tip(s) selected</span>
                        <Button variant="destructive" size="sm" onClick={() => setBulkDeleteConfirm(true)}>
                            <Trash className="w-4 h-4 mr-1" /> Delete Selected
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>Clear</Button>
                    </div>
                )}

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => { if (el) el.indeterminate = someSelected; }}
                                        onChange={(e) => toggleSelectAll(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                                    />
                                </TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tips.map((tip) => (
                                <TableRow key={tip.id} className={selectedIds.has(tip.id) ? 'bg-primary/5' : ''}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(tip.id)}
                                            onChange={(e) => toggleSelect(tip.id, e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-12 w-20 rounded overflow-hidden bg-gray-50 border">
                                            <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{tip.title}</TableCell>
                                    <TableCell>
                                        {tip.category ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {tip.category}
                                            </span>
                                        ) : <span className="text-muted-foreground text-xs">—</span>}
                                    </TableCell>
                                    <TableCell>{tip.published_at ? new Date(tip.published_at).toLocaleDateString() : 'Draft'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(tip)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteConfirmId(tip.id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {tips.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No tips found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Modal */}
                <Dialog open={!!editingTip} onOpenChange={(open) => !open && setEditingTip(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Tip</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit_title">Title</Label>
                                <Input
                                    id="edit_title"
                                    value={editForm.data.title}
                                    onChange={(e) => editForm.setData('title', e.target.value)}
                                    placeholder="Tip Title"
                                />
                                {editForm.errors.title && <p className="text-sm text-destructive">{editForm.errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_category">Category</Label>
                                <select
                                    id="edit_category"
                                    value={editForm.data.category}
                                    onChange={(e) => editForm.setData('category', e.target.value)}
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">Select a category</option>
                                    {tipCategories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_content">Content</Label>
                                <Textarea
                                    id="edit_content"
                                    value={editForm.data.content}
                                    onChange={(e) => editForm.setData('content', e.target.value)}
                                    placeholder="Tip content..."
                                    rows={10}
                                />
                                {editForm.errors.content && <p className="text-sm text-destructive">{editForm.errors.content}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_image">Cover Image</Label>
                                <div className="flex flex-col gap-4">
                                    {editForm.data.image_url && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                                            <img
                                                src={editForm.data.image_url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="edit_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditFileChange}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                                {editForm.errors.image && <p className="text-sm text-destructive">{editForm.errors.image}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_published_at">Publish Date</Label>
                                <Input
                                    id="edit_published_at"
                                    type="date"
                                    value={editForm.data.published_at}
                                    onChange={(e) => editForm.setData('published_at', e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={editForm.processing}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tip</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this tip? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => deleteConfirmId && deleteTip(deleteConfirmId)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete {selectedIds.size} Tip(s)</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete {selectedIds.size} selected tip(s)? This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete All Selected
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
