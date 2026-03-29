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
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2, GripVertical, ArrowLeft } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface JobOpening {
    id: number;
    title: string;
    vacancies: number;
    deadline: string | null;
    category: string;
    description: string | null;
    order: number;
    is_active: boolean;
}

interface JobOpeningsProps {
    jobs: JobOpening[];
}

export default function JobOpenings({ jobs }: JobOpeningsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        vacancies: 1,
        deadline: '',
        category: 'Developer',
        description: '',
        order: 0,
        is_active: true,
    });

    const openDialog = (job?: JobOpening) => {
        if (job) {
            setEditingJob(job);
            setData({
                title: job.title,
                vacancies: job.vacancies,
                deadline: job.deadline || '',
                category: job.category,
                description: job.description || '',
                order: job.order,
                is_active: job.is_active,
            });
        } else {
            setEditingJob(null);
            reset();
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingJob(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingJob) {
            put(`/admin/job-openings/${editingJob.id}`, {
                onSuccess: () => {
                    toast.success('Job opening updated successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to update job opening. Please try again.'),
            });
        } else {
            post('/admin/job-openings', {
                onSuccess: () => {
                    toast.success('Job opening created successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to create job opening. Please try again.'),
            });
        }
    };

    const deleteJob = (id: number) => {
        router.delete(`/admin/job-openings/${id}`, {
            onSuccess: () => {
                toast.success('Job opening deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete job opening. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Careers Page', href: '/admin/careers' },
            { title: 'Job Openings', href: '/admin/job-openings' }
        ]}>
            <Head title="Job Openings Management" />

            <div className="p-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/careers">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Job Openings</h1>
                            <p className="text-muted-foreground">
                                Manage current job vacancies.
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Job Opening
                    </Button>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Vacancies</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No job openings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>
                                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        </TableCell>
                                        <TableCell className="font-medium">{job.title}</TableCell>
                                        <TableCell>{job.category}</TableCell>
                                        <TableCell>{job.vacancies}</TableCell>
                                        <TableCell>{job.deadline || '-'}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${job.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {job.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openDialog(job)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteConfirmId(job.id)}
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
                            {editingJob ? 'Edit Job Opening' : 'Add Job Opening'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingJob
                                ? 'Update the details of this job opening.'
                                : 'Add a new job opening to the list.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Java Developer"
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Developer"
                                    />
                                    {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vacancies">Vacancies</Label>
                                    <Input
                                        id="vacancies"
                                        type="number"
                                        min="1"
                                        value={data.vacancies}
                                        onChange={(e) => setData('vacancies', parseInt(e.target.value))}
                                    />
                                    {errors.vacancies && <p className="text-sm text-destructive">{errors.vacancies}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deadline">Deadline</Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={data.deadline}
                                        onChange={(e) => setData('deadline', e.target.value)}
                                    />
                                    {errors.deadline && <p className="text-sm text-destructive">{errors.deadline}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Job description..."
                                    rows={4}
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
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
                                {editingJob ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Job Opening</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this job opening? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteJob(deleteConfirmId)}
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
