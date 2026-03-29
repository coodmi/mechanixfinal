import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Edit, Plus, Trash, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
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

interface Client {
    id: number;
    name: string;
    logo: string;
    url: string | null;
    order: number;
    is_active: boolean;
}

interface ClientsProps {
    clients: Client[];
}

export default function AdminClients({ clients }: ClientsProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const createForm = useForm({
        name: '',
        logo: null as File | null,
        logo_url: '',
        url: '',
        order: 0,
        is_active: true,
    });

    const editForm = useForm({
        _method: 'PUT' as const,
        name: '',
        logo: null as File | null,
        logo_url: '',
        url: '',
        order: 0,
        is_active: true,
    });

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createForm.post('/admin/clients', { 
            forceFormData: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
                toast.success('Client created successfully!');
            },
            onError: () => toast.error('Failed to create client. Please try again.'),
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingClient) return;
        editForm.post(`/admin/clients/${editingClient.id}`, { 
            forceFormData: true,
            onSuccess: () => {
                setEditingClient(null);
                editForm.reset();
                toast.success('Client updated successfully!');
            },
            onError: () => toast.error('Failed to update client. Please try again.'),
        });
    };

    const deleteClient = (id: number) => {
        createForm.delete(`/admin/clients/${id}`, {
            onSuccess: () => {
                toast.success('Client deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete client. Please try again.'),
        });
    };

    const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            createForm.setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                createForm.setData('logo_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                editForm.setData('logo_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const openEditModal = (client: Client) => {
        setEditingClient(client);
        editForm.setData({
            _method: 'PUT',
            name: client.name,
            logo: null,
            logo_url: client.logo,
            url: client.url || '',
            order: client.order,
            is_active: client.is_active,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Clients Page', href: '/admin/clients' }]}>
            <Head title="Clients Management" />

            <div className="p-4 max-w-6xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
                        <p className="text-muted-foreground">Manage your client logos and information.</p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Client
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Client</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="Client Name"
                                    />
                                    {createForm.errors.name && <p className="text-sm text-destructive">{createForm.errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo</Label>
                                    <div className="flex flex-col gap-4">
                                        {createForm.data.logo_url && (
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                                                <img
                                                    src={createForm.data.logo_url}
                                                    alt="Preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCreateFileChange}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {createForm.errors.logo && <p className="text-sm text-destructive">{createForm.errors.logo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="url">Website URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={createForm.data.url}
                                        onChange={(e) => createForm.setData('url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    {createForm.errors.url && <p className="text-sm text-destructive">{createForm.errors.url}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order">Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={createForm.data.order}
                                        onChange={(e) => createForm.setData('order', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={createForm.processing}>
                                        Save Client
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Logo</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>
                                        <div className="h-12 w-24 flex items-center justify-center bg-gray-50 rounded border">
                                            <img
                                                src={client.logo}
                                                alt={client.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>
                                        {client.url ? (
                                            <a href={client.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate max-w-[200px] block">
                                                {client.url}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{client.order}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(client)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => setDeleteConfirmId(client.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {clients.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No clients found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Modal */}
                <Dialog open={!!editingClient} onOpenChange={(open) => !open && setEditingClient(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Client</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit_name">Name</Label>
                                <Input
                                    id="edit_name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    placeholder="Client Name"
                                />
                                {editForm.errors.name && <p className="text-sm text-destructive">{editForm.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_logo">Logo</Label>
                                <div className="flex flex-col gap-4">
                                    {editForm.data.logo_url && (
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                                            <img
                                                src={editForm.data.logo_url}
                                                alt="Preview"
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="edit_logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditFileChange}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                                {editForm.errors.logo && <p className="text-sm text-destructive">{editForm.errors.logo}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_url">Website URL</Label>
                                <Input
                                    id="edit_url"
                                    type="url"
                                    value={editForm.data.url}
                                    onChange={(e) => editForm.setData('url', e.target.value)}
                                    placeholder="https://example.com"
                                />
                                {editForm.errors.url && <p className="text-sm text-destructive">{editForm.errors.url}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_order">Order</Label>
                                <Input
                                    id="edit_order"
                                    type="number"
                                    value={editForm.data.order}
                                    onChange={(e) => editForm.setData('order', parseInt(e.target.value))}
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
                            <AlertDialogTitle>Delete Client</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this client? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => deleteConfirmId && deleteClient(deleteConfirmId)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
