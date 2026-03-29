import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { Switch } from '@/components/ui/switch';
import { SortableList, SortableRow } from '@/components/ui/sortable';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2 } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { NavigationItem } from '@/types/cms';
import { toast } from 'sonner';
import { assetUrl } from '@/lib/asset-url';

interface NavigationProps {
    items: NavigationItem[];
    headerSettings: {
        facebook_url: string;
        instagram_url: string;
        linkedin_url: string;
        cta_button_text: string;
        cta_button_link: string;
        logo_url: string;
    };
}

export default function Navigation({ items, headerSettings }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        label: '',
        href: '',
        order: 0,
        is_active: true,
    });

    const { data: headerData, setData: setHeaderData, post: postHeader, processing: processingHeader, errors: headerErrors } = useForm({
        facebook_url: headerSettings?.facebook_url || '',
        instagram_url: headerSettings?.instagram_url || '',
        linkedin_url: headerSettings?.linkedin_url || '',
        cta_button_text: headerSettings?.cta_button_text || '',
        cta_button_link: headerSettings?.cta_button_link || '',
        logo: null as File | null,
    });

    const [logoPreview, setLogoPreview] = useState<string>(assetUrl(headerSettings?.logo_url) || '/logo.png');

    useEffect(() => {
        setLogoPreview(assetUrl(headerSettings?.logo_url) || '/logo.png');
    }, [headerSettings?.logo_url]);
    const openDialog = (item?: NavigationItem) => {
        if (item) {
            setEditingItem(item);
            setData({
                label: item.label,
                href: item.href || '',
                order: item.order,
                is_active: item.is_active,
            });
        } else {
            setEditingItem(null);
            reset();
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingItem(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingItem) {
            router.put(`/admin/navigation/${editingItem.id}`, data, {
                onSuccess: () => {
                    toast.success('Navigation item updated successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to update navigation item. Please try again.'),
            });
        } else {
            post('/admin/navigation', {
                onSuccess: () => {
                    toast.success('Navigation item created successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to create navigation item. Please try again.'),
            });
        }
    };

    const deleteItem = (id: number) => {
        router.delete(`/admin/navigation/${id}`, {
            onSuccess: () => {
                toast.success('Navigation item deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete navigation item. Please try again.'),
        });
    };

    const handleReorder = (reorderedItems: NavigationItem[]) => {
        router.post('/admin/navigation/reorder', {
            items: reorderedItems.map((item) => ({ id: item.id, order: item.order })),
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Navigation items reordered!'),
            onError: () => toast.error('Failed to reorder items. Please try again.'),
        });
    };

    const submitHeaderSettings: FormEventHandler = (e) => {
        e.preventDefault();
        postHeader('/admin/navigation/header-settings', {
            forceFormData: true,
            onSuccess: () => toast.success('Header settings updated successfully!'),
            onError: () => toast.error('Failed to update header settings. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Navigation', href: '/admin/navigation' }]}>
            <Head title="Navigation Management" />

            <div className="p-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Navigation Management</h1>
                        <p className="text-muted-foreground">
                            Manage your website's navigation menu items.
                        </p>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                    </Button>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No navigation items found. Add your first item to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <SortableList items={items} onReorder={handleReorder}>
                                    {(item) => (
                                        <SortableRow key={item.id} id={item.id}>
                                            <TableCell className="font-medium">{item.label}</TableCell>
                                            <TableCell className="text-muted-foreground">{item.href || '-'}</TableCell>
                                            <TableCell>{item.order}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openDialog(item)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setDeleteConfirmId(item.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </SortableRow>
                                    )}
                                </SortableList>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Header Settings Section */}
                <div className="mt-8">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold tracking-tight">Header Settings</h2>
                        <p className="text-muted-foreground text-sm">
                            Configure the navigation header elements.
                        </p>
                    </div>

                    <div className="bg-card rounded-xl border shadow-sm p-6">
                        <form onSubmit={submitHeaderSettings} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold">Logo</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo Image</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="border rounded-md p-3 bg-background">
                                            <img 
                                                src={logoPreview} 
                                                alt="Logo preview" 
                                                className="h-12 w-auto max-w-[200px] object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/logo.png';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                id="logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setHeaderData('logo', file);
                                                        const reader = new FileReader();
                                                        reader.onload = (ev) => {
                                                            setLogoPreview(ev.target?.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Recommended: PNG or SVG, max 5MB
                                            </p>
                                        </div>
                                    </div>
                                    {headerErrors.logo && <p className="text-sm text-destructive">{headerErrors.logo}</p>}
                                </div>
                            </div>

                            <div className="border-t pt-6 space-y-4">
                                <h3 className="font-semibold">Social Media</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="facebook_url">Facebook URL</Label>
                                    <Input
                                        id="facebook_url"
                                        value={headerData.facebook_url}
                                        onChange={(e) => setHeaderData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/yourpage"
                                    />
                                    {headerErrors.facebook_url && <p className="text-sm text-destructive">{headerErrors.facebook_url}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instagram_url">Instagram URL</Label>
                                    <Input
                                        id="instagram_url"
                                        value={headerData.instagram_url}
                                        onChange={(e) => setHeaderData('instagram_url', e.target.value)}
                                        placeholder="https://instagram.com/yourpage"
                                    />
                                    {headerErrors.instagram_url && <p className="text-sm text-destructive">{headerErrors.instagram_url}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        value={headerData.linkedin_url}
                                        onChange={(e) => setHeaderData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/company/yourpage"
                                    />
                                    {headerErrors.linkedin_url && <p className="text-sm text-destructive">{headerErrors.linkedin_url}</p>}
                                </div>
                            </div>

                            <div className="border-t pt-6 space-y-4">
                                <h3 className="font-semibold">Call-to-Action Button</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="cta_button_text">Button Text</Label>
                                    <Input
                                        id="cta_button_text"
                                        value={headerData.cta_button_text}
                                        onChange={(e) => setHeaderData('cta_button_text', e.target.value)}
                                        placeholder="Get in Touch"
                                    />
                                    {headerErrors.cta_button_text && <p className="text-sm text-destructive">{headerErrors.cta_button_text}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cta_button_link">Button Link</Label>
                                    <Input
                                        id="cta_button_link"
                                        value={headerData.cta_button_link}
                                        onChange={(e) => setHeaderData('cta_button_link', e.target.value)}
                                        placeholder="#contact"
                                    />
                                    {headerErrors.cta_button_link && <p className="text-sm text-destructive">{headerErrors.cta_button_link}</p>}
                                    <p className="text-xs text-muted-foreground">
                                        Use a hashanchor (#contact) or a full URL (/contact)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processingHeader}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Header Settings
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingItem
                                ? 'Update the details of this navigation item.'
                                : 'Add a new item to your navigation menu.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={data.label}
                                    onChange={(e) => setData('label', e.target.value)}
                                    placeholder="Home"
                                />
                                {errors.label && <p className="text-sm text-destructive">{errors.label}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="href">Link (URL or hash)</Label>
                                <Input
                                    id="href"
                                    value={data.href}
                                    onChange={(e) => setData('href', e.target.value)}
                                    placeholder="#home"
                                />
                                {errors.href && <p className="text-sm text-destructive">{errors.href}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                />
                                {errors.order && <p className="text-sm text-destructive">{errors.order}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="is_active">Active</Label>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="w-4 h-4 mr-2" />
                                {editingItem ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Navigation Item</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this navigation item? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteItem(deleteConfirmId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
