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
import { SortableList, SortableRow } from '@/components/ui/sortable';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2, ArrowLeft } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface TimelineEvent {
    id: number;
    year: string;
    title: string;
    description: string | null;
    is_current: boolean;
    order: number;
}

interface TimelineEventsProps {
    events: TimelineEvent[];
}

export default function TimelineEvents({ events }: TimelineEventsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        year: '',
        title: '',
        description: '',
        is_current: false,
        order: 0,
    });

    const openDialog = (event?: TimelineEvent) => {
        if (event) {
            setEditingEvent(event);
            setData({
                year: event.year,
                title: event.title,
                description: event.description || '',
                is_current: event.is_current,
                order: event.order,
            });
        } else {
            setEditingEvent(null);
            reset();
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingEvent(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingEvent) {
            put(`/admin/timeline-events/${editingEvent.id}`, {
                onSuccess: () => {
                    toast.success('Timeline event updated successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to update timeline event. Please try again.'),
            });
        } else {
            post('/admin/timeline-events', {
                onSuccess: () => {
                    toast.success('Timeline event created successfully!');
                    closeDialog();
                },
                onError: () => toast.error('Failed to create timeline event. Please try again.'),
            });
        }
    };

    const deleteEvent = (id: number) => {
        router.delete(`/admin/timeline-events/${id}`, {
            onSuccess: () => {
                toast.success('Timeline event deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete timeline event. Please try again.'),
        });
    };

    const handleReorder = (reorderedItems: TimelineEvent[]) => {
        router.post('/admin/timeline-events/reorder', {
            items: reorderedItems.map((item) => ({ id: item.id, order: item.order })),
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Timeline events reordered!'),
            onError: () => toast.error('Failed to reorder events. Please try again.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'About Us', href: '/admin/about-us' },
            { title: 'Timeline Events', href: '/admin/timeline-events' }
        ]}>
            <Head title="Timeline Events Management" />

            <div className="p-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/about-us">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Timeline Events</h1>
                            <p className="text-muted-foreground">
                                Manage the timeline events shown on the About Us page.
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Current</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No timeline events found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <SortableList items={events} onReorder={handleReorder}>
                                    {(event) => (
                                        <SortableRow key={event.id} id={event.id}>
                                            <TableCell className="font-medium">{event.year}</TableCell>
                                            <TableCell>{event.title}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-md truncate">
                                                {event.description}
                                            </TableCell>
                                            <TableCell>
                                                {event.is_current && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                        Current
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openDialog(event)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setDeleteConfirmId(event.id)}
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
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingEvent ? 'Edit Timeline Event' : 'Add Timeline Event'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingEvent
                                ? 'Update the details of this timeline event.'
                                : 'Add a new event to the timeline.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="2024"
                                    />
                                    {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Event Title"
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Event description..."
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
                                <Label htmlFor="is_current">Is Current Event?</Label>
                                <Switch
                                    id="is_current"
                                    checked={data.is_current}
                                    onCheckedChange={(checked) => setData('is_current', checked)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="w-4 h-4 mr-2" />
                                {editingEvent ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Timeline Event</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this timeline event? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteEvent(deleteConfirmId)}
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
