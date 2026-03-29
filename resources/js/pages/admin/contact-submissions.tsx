import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Mail, Phone, Calendar, User, MessageSquare, Clock, CheckCircle, XCircle, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'pending' | 'in_progress' | 'responded' | 'closed';
    admin_notes: string | null;
    created_at: string;
}

interface Props {
    submissions: ContactSubmission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Records', href: '/admin/contact-submissions' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    responded: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

const statusLabels: Record<string, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    responded: 'Responded',
    closed: 'Closed',
};

export default function ContactSubmissions({ submissions }: Props) {
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [notesDialogOpen, setNotesDialogOpen] = useState(false);

    const handleStatusChange = (submissionId: number, newStatus: string) => {
        router.put(`/admin/contact-submissions/${submissionId}/status`, {
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Status updated to ${statusLabels[newStatus]}`);
            },
            onError: () => {
                toast.error('Failed to update status');
            },
        });
    };

    const handleDelete = (submissionId: number) => {
        router.delete(`/admin/contact-submissions/${submissionId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Contact submission deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete submission');
            },
        });
    };

    const openNotesDialog = (submission: ContactSubmission) => {
        setSelectedSubmission(submission);
        setAdminNotes(submission.admin_notes || '');
        setNotesDialogOpen(true);
    };

    const handleSaveNotes = () => {
        if (!selectedSubmission) return;

        router.put(`/admin/contact-submissions/${selectedSubmission.id}/notes`, {
            admin_notes: adminNotes,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Notes saved successfully');
                setNotesDialogOpen(false);
            },
            onError: () => {
                toast.error('Failed to save notes');
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const pendingCount = submissions.filter(s => s.status === 'pending').length;
    const inProgressCount = submissions.filter(s => s.status === 'in_progress').length;
    const respondedCount = submissions.filter(s => s.status === 'responded').length;
    const closedCount = submissions.filter(s => s.status === 'closed').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Records" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Contact Records</h1>
                    <p className="text-muted-foreground">
                        Manage contact form submissions from your website visitors.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingCount}</div>
                            <p className="text-xs text-muted-foreground">Awaiting response</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{inProgressCount}</div>
                            <p className="text-xs text-muted-foreground">Being handled</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Responded</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{respondedCount}</div>
                            <p className="text-xs text-muted-foreground">Reply sent</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Closed</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <XCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{closedCount}</div>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Submissions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Submissions</CardTitle>
                        <CardDescription>
                            {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {submissions.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No submissions yet</h3>
                                <p className="text-muted-foreground">
                                    Contact form submissions will appear here when visitors send messages.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sender</TableHead>
                                            <TableHead>Message</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Received</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submissions.map((submission) => (
                                            <TableRow key={submission.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{submission.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-[300px]">
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {submission.message}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <a
                                                            href={`mailto:${submission.email}`}
                                                            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                                                        >
                                                            <Mail className="h-3 w-3" />
                                                            {submission.email}
                                                        </a>
                                                        {submission.phone && (
                                                            <a
                                                                href={`tel:${submission.phone}`}
                                                                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                                                            >
                                                                <Phone className="h-3 w-3" />
                                                                {submission.phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(submission.created_at)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        defaultValue={submission.status}
                                                        onValueChange={(value) => handleStatusChange(submission.id, value)}
                                                    >
                                                        <SelectTrigger className="w-[140px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">
                                                                <Badge className={statusColors.pending}>Pending</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="in_progress">
                                                                <Badge className={statusColors.in_progress}>In Progress</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="responded">
                                                                <Badge className={statusColors.responded}>Responded</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="closed">
                                                                <Badge className={statusColors.closed}>Closed</Badge>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => setSelectedSubmission(submission)}
                                                                >
                                                                    <Eye className="h-4 w-4 mr-1" />
                                                                    View
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-2xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Message from {submission.name}</DialogTitle>
                                                                    <DialogDescription>
                                                                        Received on {formatDate(submission.created_at)}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4 mt-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                            <Label className="text-muted-foreground">Email</Label>
                                                                            <p className="font-medium">{submission.email}</p>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-muted-foreground">Phone</Label>
                                                                            <p className="font-medium">{submission.phone || 'Not provided'}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-muted-foreground">Message</Label>
                                                                        <div className="mt-2 p-4 bg-muted rounded-lg">
                                                                            <p className="whitespace-pre-wrap">{submission.message}</p>
                                                                        </div>
                                                                    </div>
                                                                    {submission.admin_notes && (
                                                                        <div>
                                                                            <Label className="text-muted-foreground">Admin Notes</Label>
                                                                            <div className="mt-2 p-4 bg-muted rounded-lg">
                                                                                <p className="whitespace-pre-wrap">{submission.admin_notes}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <DialogFooter className="mt-4">
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => openNotesDialog(submission)}
                                                                    >
                                                                        {submission.admin_notes ? 'Edit Notes' : 'Add Notes'}
                                                                    </Button>
                                                                    <a href={`mailto:${submission.email}`}>
                                                                        <Button>
                                                                            <Mail className="h-4 w-4 mr-2" />
                                                                            Reply via Email
                                                                        </Button>
                                                                    </a>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive" size="sm">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Submission</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete this message from {submission.name}?
                                                                        This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(submission.id)}
                                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Notes Dialog */}
                <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Admin Notes</DialogTitle>
                            <DialogDescription>
                                Add internal notes about this submission. These notes are only visible to admins.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="admin_notes">Notes</Label>
                                <Textarea
                                    id="admin_notes"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add notes about this submission..."
                                    rows={5}
                                />
                            </div>
                        </div>
                        <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveNotes}>
                                Save Notes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
