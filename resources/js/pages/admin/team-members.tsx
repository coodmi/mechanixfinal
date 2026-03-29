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
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2, GripVertical, ArrowLeft, Upload, X, Users } from 'lucide-react';
import { FormEventHandler, useState, useRef } from 'react';
import { toast } from 'sonner';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image_url: string | null;
    linkedin_url?: string | null;
    facebook_url?: string | null;
    category: string;
    order: number;
    is_active: boolean;
}

interface TeamMembersProps {
    members: TeamMember[];
}

export default function TeamMembers({ members }: TeamMembersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        role: '',
        image: null as File | null,
        image_url: '',
        linkedin_url: '',
        facebook_url: '',
        category: 'Individuals',
        order: 0,
        is_active: true,
    });

    const openDialog = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setData({
                name: member.name,
                role: member.role,
                image: null,
                image_url: member.image_url || '',
                linkedin_url: member.linkedin_url || '',
                facebook_url: member.facebook_url || '',
                category: member.category,
                order: member.order,
                is_active: member.is_active,
            });
        } else {
            setEditingMember(null);
            reset();
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingMember(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingMember) {
            post(`/admin/team-members/${editingMember.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Team member updated successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to update team member. Please try again.'),
            });
        } else {
            post('/admin/team-members', {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Team member created successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to create team member. Please try again.'),
            });
        }
    };

    const deleteMember = (id: number) => {
        router.delete(`/admin/team-members/${id}`, {
            onSuccess: () => {
                toast.success('Team member deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete team member. Please try again.'),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData({
            ...data,
            image: null,
            image_url: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Our Team Page', href: '/admin/our-team' },
            { title: 'Team Members', href: '/admin/team-members' }
        ]}>
            <Head title="Team Members Management" />

            <div className="p-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/our-team">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
                            <p className="text-muted-foreground">
                                Manage your team members.
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Team Member
                    </Button>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No team members found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        </TableCell>
                                        <TableCell>
                                            {member.image_url ? (
                                                <img
                                                    src={member.image_url}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <Users className="w-4 h-4" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.role}</TableCell>
                                        <TableCell>{member.category}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${member.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {member.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openDialog(member)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteConfirmId(member.id)}
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
                            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingMember
                                ? 'Update the details of this team member.'
                                : 'Add a new team member to your roster.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        placeholder="CEO"
                                    />
                                    {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Individuals"
                                />
                                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                    {errors.linkedin_url && <p className="text-sm text-destructive">{errors.linkedin_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="facebook_url">Facebook URL</Label>
                                    <Input
                                        id="facebook_url"
                                        value={data.facebook_url}
                                        onChange={(e) => setData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/username"
                                    />
                                    {errors.facebook_url && <p className="text-sm text-destructive">{errors.facebook_url}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Profile Image</Label>
                                <div className="flex flex-col gap-4">
                                    {data.image_url && (
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border mx-auto">
                                            <img
                                                src={data.image_url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-0 right-0 w-6 h-6 rounded-full"
                                                onClick={removeImage}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            ref={fileInputRef}
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            {data.image_url ? 'Change Image' : 'Upload Image'}
                                        </Button>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-sm text-destructive">{errors.image}</p>
                                )}
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
                                {editingMember ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this team member? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteMember(deleteConfirmId)}
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
