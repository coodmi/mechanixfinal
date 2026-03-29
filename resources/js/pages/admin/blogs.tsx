import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Edit, Plus, Trash, Upload, X, Save } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Blog { id: number; title: string; slug: string; category: string | null; content: string; image: string | null; author: string | null; published_at: string | null; is_active: boolean; }
interface BlogsProps { blogs: Blog[]; categories: string[]; pageSettings: { title: string; description: string; bg_image: string; }; }

export default function AdminBlogs({ blogs, categories: initialCategories, pageSettings }: BlogsProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

    const [blogCategories, setBlogCategories] = useState<string[]>(initialCategories ?? []);
    const [newCategory, setNewCategory] = useState('');
    const [savingCats, setSavingCats] = useState(false);

    const allSelected = blogs.length > 0 && selectedIds.size === blogs.length;
    const someSelected = selectedIds.size > 0 && !allSelected;
    const toggleSelectAll = (c: boolean) => setSelectedIds(c ? new Set(blogs.map((b) => b.id)) : new Set());
    const toggleSelect = (id: number, c: boolean) => setSelectedIds((p) => { const n = new Set(p); c ? n.add(id) : n.delete(id); return n; });

    const saveCategories = (cats: string[]) => {
        setSavingCats(true);
        router.post('/admin/blogs/categories', { categories: cats }, {
            preserveScroll: true,
            onSuccess: () => { toast.success('Categories updated.'); setSavingCats(false); },
            onError: () => { toast.error('Failed.'); setSavingCats(false); },
        });
    };
    const addCategory = () => {
        const t = newCategory.trim();
        if (!t || blogCategories.includes(t)) return;
        const u = [...blogCategories, t]; setBlogCategories(u); setNewCategory(''); saveCategories(u);
    };
    const removeCategory = (cat: string) => { const u = blogCategories.filter((c) => c !== cat); setBlogCategories(u); saveCategories(u); };

    const handleBulkDelete = () => {
        router.post('/admin/blogs/bulk-delete', { ids: Array.from(selectedIds) }, {
            onSuccess: () => { toast.success(`${selectedIds.size} blog(s) deleted.`); setSelectedIds(new Set()); setBulkDeleteConfirm(false); },
            onError: () => toast.error('Failed to delete.'),
        });
    };

    const createForm = useForm({ title: '', category: '', content: '', author: '', image: null as File | null, image_url: '', published_at: new Date().toISOString().split('T')[0], is_active: true });
    const editForm = useForm({ _method: 'PUT' as const, title: '', category: '', content: '', author: '', image: null as File | null, image_url: '', published_at: '', is_active: true });

    // Page settings form
    const pageForm = useForm({ title: pageSettings?.title || '', description: pageSettings?.description || '' });

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createForm.post('/admin/blogs', { forceFormData: true, onSuccess: () => { setIsCreateOpen(false); createForm.reset(); toast.success('Blog created!'); }, onError: () => toast.error('Failed to create.') });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingBlog) return;
        editForm.post(`/admin/blogs/${editingBlog.id}`, { forceFormData: true, onSuccess: () => { setEditingBlog(null); editForm.reset(); toast.success('Blog updated!'); }, onError: () => toast.error('Failed to update.') });
    };

    const deleteBlog = (id: number) => {
        router.delete(`/admin/blogs/${id}`, { onSuccess: () => { toast.success('Blog deleted!'); setDeleteConfirmId(null); }, onError: () => toast.error('Failed to delete.') });
    };

    const openEditModal = (blog: Blog) => {
        setEditingBlog(blog);
        editForm.setData({ _method: 'PUT', title: blog.title, category: blog.category || '', content: blog.content, author: blog.author || '', image: null, image_url: blog.image || '', published_at: blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : '', is_active: blog.is_active });
    };

    const handleFileChange = (form: typeof createForm | typeof editForm, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { (form as any).setData('image', file); const r = new FileReader(); r.onloadend = () => (form as any).setData('image_url', r.result as string); r.readAsDataURL(file); }
    };

    const BlogForm = ({ form, onSubmit, submitLabel }: { form: typeof createForm | typeof editForm; onSubmit: FormEventHandler; submitLabel: string }) => (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={(form.data as any).title} onChange={(e) => (form as any).setData('title', e.target.value)} placeholder="Blog title" />{(form.errors as any).title && <p className="text-sm text-destructive">{(form.errors as any).title}</p>}</div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <select value={(form.data as any).category} onChange={(e) => (form as any).setData('category', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="">Select a category</option>
                        {blogCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="space-y-2"><Label>Author</Label><Input value={(form.data as any).author} onChange={(e) => (form as any).setData('author', e.target.value)} placeholder="Author name" /></div>
            </div>
            <div className="space-y-2"><Label>Content</Label><Textarea value={(form.data as any).content} onChange={(e) => (form as any).setData('content', e.target.value)} rows={10} placeholder="Write your blog post..." />{(form.errors as any).content && <p className="text-sm text-destructive">{(form.errors as any).content}</p>}</div>
            <div className="space-y-2">
                <Label>Cover Image</Label>
                {(form.data as any).image_url && <div className="w-full h-40 rounded-lg overflow-hidden border bg-gray-50"><img src={(form.data as any).image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
                <Input type="file" accept="image/*" onChange={(e) => handleFileChange(form, e)} className="cursor-pointer" />
            </div>
            <div className="space-y-2"><Label>Publish Date</Label><Input type="date" value={(form.data as any).published_at} onChange={(e) => (form as any).setData('published_at', e.target.value)} /></div>
            <div className="flex justify-end pt-2"><Button type="submit" disabled={form.processing}>{submitLabel}</Button></div>
        </form>
    );

    return (
        <AppLayout breadcrumbs={[{ title: 'Manage Articles', href: '/admin/blogs' }, { title: 'Manage Blogs', href: '/admin/blogs' }]}>
            <Head title="Manage Blogs" />
            <div className="p-4 max-w-6xl mx-auto w-full space-y-8">

                {/* Page Settings */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-1">Page Settings</h2>
                    <p className="text-sm text-muted-foreground mb-4">Configure the blog listing page hero.</p>
                    <form onSubmit={(e) => { e.preventDefault(); pageForm.post('/admin/blogs/page-settings', { onSuccess: () => toast.success('Page settings saved!'), onError: () => toast.error('Failed to save.') }); }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Page Title</Label>
                                <Input value={pageForm.data.title} onChange={(e) => pageForm.setData('title', e.target.value)} placeholder="Our Blog" />
                                {pageForm.errors.title && <p className="text-sm text-destructive">{pageForm.errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input value={pageForm.data.description} onChange={(e) => pageForm.setData('description', e.target.value)} placeholder="Insights, ideas and inspiration..." />
                            </div>
                        </div>
                        <Button type="submit" disabled={pageForm.processing}><Save className="w-4 h-4 mr-2" />Save Page Settings</Button>
                    </form>
                </div>

                {/* Categories */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-1">Categories</h2>
                    <p className="text-sm text-muted-foreground mb-4">Add or remove blog categories.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blogCategories.map((cat) => (
                            <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                {cat}
                                <button type="button" onClick={() => removeCategory(cat)} className="hover:text-destructive transition-colors ml-0.5"><X className="w-3.5 h-3.5" /></button>
                            </span>
                        ))}
                        {blogCategories.length === 0 && <p className="text-sm text-muted-foreground">No categories yet.</p>}
                    </div>
                    <div className="flex gap-2 max-w-sm">
                        <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category name..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())} />
                        <Button type="button" onClick={addCategory} disabled={savingCats || !newCategory.trim()}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                    </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div><h1 className="text-2xl font-bold tracking-tight">Manage Blogs</h1><p className="text-muted-foreground">Create and manage your blog posts.</p></div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Add Blog</Button></DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader><DialogTitle>Add New Blog</DialogTitle></DialogHeader>
                            <BlogForm form={createForm} onSubmit={submitCreate} submitLabel="Save Blog" />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Bulk bar */}
                {selectedIds.size > 0 && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl">
                        <span className="text-sm font-medium">{selectedIds.size} blog(s) selected</span>
                        <Button variant="destructive" size="sm" onClick={() => setBulkDeleteConfirm(true)}><Trash className="w-4 h-4 mr-1" />Delete Selected</Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>Clear</Button>
                    </div>
                )}

                {/* Table */}
                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">
                                    <input type="checkbox" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected; }} onChange={(e) => toggleSelectAll(e.target.checked)} className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer" />
                                </TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.id} className={selectedIds.has(blog.id) ? 'bg-primary/5' : ''}>
                                    <TableCell><input type="checkbox" checked={selectedIds.has(blog.id)} onChange={(e) => toggleSelect(blog.id, e.target.checked)} className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer" /></TableCell>
                                    <TableCell>
                                        <div className="h-12 w-20 rounded overflow-hidden bg-gray-50 border">
                                            {blog.image ? <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-muted" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-[200px] truncate">{blog.title}</TableCell>
                                    <TableCell>{blog.category ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">{blog.category}</span> : <span className="text-muted-foreground text-xs">—</span>}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{blog.author || '—'}</TableCell>
                                    <TableCell>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(blog)}><Edit className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteConfirmId(blog.id)}><Trash className="w-4 h-4" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {blogs.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No blogs yet. Add your first post.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Modal */}
                <Dialog open={!!editingBlog} onOpenChange={(o) => !o && setEditingBlog(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Edit Blog</DialogTitle></DialogHeader>
                        <BlogForm form={editForm} onSubmit={submitEdit} submitLabel="Save Changes" />
                    </DialogContent>
                </Dialog>

                {/* Delete confirm */}
                <AlertDialog open={deleteConfirmId !== null} onOpenChange={(o) => !o && setDeleteConfirmId(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete Blog</AlertDialogTitle><AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteConfirmId && deleteBlog(deleteConfirmId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Bulk delete confirm */}
                <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
                    <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete {selectedIds.size} Blog(s)</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete All Selected</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
