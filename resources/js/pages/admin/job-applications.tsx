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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, Mail, Phone, ExternalLink, Briefcase, Calendar, User, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface JobOpening {
    id: number;
    title: string;
    category: string;
}

interface JobApplication {
    id: number;
    job_opening_id: number;
    name: string;
    email: string;
    phone: string;
    resume_path: string;
    cover_letter: string | null;
    portfolio_url: string | null;
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
    notes: string | null;
    created_at: string;
    job_opening: JobOpening;
}

interface Props {
    applications: JobApplication[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Careers Page', href: '/admin/careers' },
    { title: 'Applications', href: '/admin/job-applications' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    reviewing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    accepted: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export default function JobApplications({ applications }: Props) {
    const handleStatusChange = (applicationId: number, newStatus: string) => {
        router.put(`/admin/job-applications/${applicationId}/status`, {
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Application status updated to ${newStatus}`);
            },
            onError: () => {
                toast.error('Failed to update status');
            },
        });
    };

    const handleDelete = (applicationId: number) => {
        router.delete(`/admin/job-applications/${applicationId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Application deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete application');
            },
        });
    };

    const handleDownloadResume = (application: JobApplication) => {
        window.open(`/admin/job-applications/${application.id}/resume`, '_blank');
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

    const pendingCount = applications.filter(a => a.status === 'pending').length;
    const reviewingCount = applications.filter(a => a.status === 'reviewing').length;
    const acceptedCount = applications.filter(a => a.status === 'accepted').length;
    const rejectedCount = applications.filter(a => a.status === 'rejected').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jobs - Applications" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
                    <p className="text-muted-foreground">
                        Manage and review job applications submitted through the careers page.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingCount}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Reviewing</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{reviewingCount}</div>
                            <p className="text-xs text-muted-foreground">Under consideration</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{acceptedCount}</div>
                            <p className="text-xs text-muted-foreground">Hired candidates</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{rejectedCount}</div>
                            <p className="text-xs text-muted-foreground">Not selected</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Applications Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Applications</CardTitle>
                        <CardDescription>
                            {applications.length} total application{applications.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {applications.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No applications yet</h3>
                                <p className="text-muted-foreground">
                                    Applications will appear here when candidates apply through the careers page.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Applicant</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Applied</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((application) => (
                                            <TableRow key={application.id}>
                                                <TableCell>
                                                    <div className="font-medium">{application.name}</div>
                                                    {application.portfolio_url && (
                                                        <a
                                                            href={application.portfolio_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                                                        >
                                                            Portfolio <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                        <span>{application.job_opening?.title || 'Unknown Position'}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <a
                                                            href={`mailto:${application.email}`}
                                                            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                                                        >
                                                            <Mail className="h-3 w-3" />
                                                            {application.email}
                                                        </a>
                                                        <a
                                                            href={`tel:${application.phone}`}
                                                            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                                                        >
                                                            <Phone className="h-3 w-3" />
                                                            {application.phone}
                                                        </a>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(application.created_at)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        defaultValue={application.status}
                                                        onValueChange={(value) => handleStatusChange(application.id, value)}
                                                    >
                                                        <SelectTrigger className="w-[130px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">
                                                                <Badge>Pending</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="reviewing">
                                                                <Badge>Reviewing</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="accepted">
                                                                <Badge>Accepted</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="rejected">
                                                                <Badge>Rejected</Badge>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDownloadResume(application)}
                                                        >
                                                            <Download className="h-4 w-4 mr-1" />
                                                            Resume
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive" size="sm">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete this application from {application.name}?
                                                                        This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(application.id)}
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
            </div>
        </AppLayout>
    );
}
