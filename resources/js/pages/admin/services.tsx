import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2, GripVertical } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Service } from '@/types/cms';
import { toast } from 'sonner';

interface ServicesProps {
    services: Service[];
    section: {
        section_title?: string;
        section_description?: string;
    };
}

export default function Services({ services, section }: ServicesProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const sectionForm = useForm({
        section_title: section?.section_title || 'Our Expertise',
        section_description: section?.section_description || 'Tailored interior solutions for commercial, residential, and hospitality sectors.',
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        icon: '',
        order: 0,
        is_active: true,
    });

    const openDialog = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setData({
                title: service.title,
                description: service.description,
                icon: service.icon || '',
                order: service.order,
                is_active: service.is_active,
            });
        } else {
            setEditingService(null);
            reset();
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingService(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingService) {
            router.put(`/admin/services/${editingService.id}`, data, {
                onSuccess: () => {
                    toast.success('Service updated successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to update service. Please try again.'),
            });
        } else {
            post('/admin/services', {
                onSuccess: () => {
                    toast.success('Service created successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to create service. Please try again.'),
            });
        }
    };

    const deleteService = (id: number) => {
        router.delete(`/admin/services/${id}`, {
            onSuccess: () => {
                toast.success('Service deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete service. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Services Section', href: '/admin/services' }]}>
            <Head title="Services Management" />

            <div className="p-4 max-w-6xl mx-auto w-full space-y-6">
                {/* Section Settings */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Section Settings</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sectionForm.post('/admin/services/section', {
                            onSuccess: () => toast.success('Section settings updated successfully!'),
                            onError: () => toast.error('Failed to update section. Please try again.'),
                        });
                    }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="section_title">Section Title</Label>
                                <Input
                                    id="section_title"
                                    value={sectionForm.data.section_title}
                                    onChange={(e) => sectionForm.setData('section_title', e.target.value)}
                                    placeholder="Our Expertise"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="section_description">Section Description</Label>
                                <Textarea
                                    id="section_description"
                                    value={sectionForm.data.section_description}
                                    onChange={(e) => sectionForm.setData('section_description', e.target.value)}
                                    placeholder="Tailored interior solutions..."
                                    rows={2}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={sectionForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Section Settings
                        </Button>
                    </form>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Services Management</h1>
                        <p className="text-muted-foreground">
                            Manage the services you offer to your clients.
                        </p>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No services found. Add your first service to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                services.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell>
                                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        </TableCell>
                                        <TableCell className="font-medium">{service.title}</TableCell>
                                        <TableCell className="text-muted-foreground max-w-md truncate">
                                            {service.description}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{service.icon || '-'}</TableCell>
                                        <TableCell>{service.order}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    service.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openDialog(service)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteConfirmId(service.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingService ? 'Edit Service' : 'Add Service'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingService
                                ? 'Update the details of this service.'
                                : 'Add a new service to showcase your offerings.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Interior Design"
                                />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the service..."
                                    rows={4}
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="Lucide icon name (e.g., Home, Palette, Ruler)"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter a Lucide React icon name or leave empty
                                </p>
                                {errors.icon && <p className="text-sm text-destructive">{errors.icon}</p>}
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
                                {editingService ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Service</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteService(deleteConfirmId)}
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
