import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, BarChart3, FileEdit, Users } from 'lucide-react';
import { Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartAreaInteractive } from '@/components/chart';

interface DashboardProps {
    stats: {
        totalServices: number;
        totalProjects: number;
        totalNavigationItems: number;
        recentActivities: Array<{
            id: number;
            action: string;
            model: string;
            description: string;
            created_at: string;
            user: { name: string };
        }>;
        activityByDay: Array<{
            date: string;
            count: number;
        }>;
        activityByModel: Array<{
            model: string;
            count: number;
        }>;
        activityByAction: Array<{
            action: string;
            count: number;
        }>;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const activityChartConfig = {
    count: {
        label: 'Activities',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

const modelChartConfig = {
    NavigationItem: {
        label: 'Navigation',
        color: 'hsl(217, 91%, 60%)', // Blue
    },
    Service: {
        label: 'Services',
        color: 'hsl(142, 76%, 36%)', // Green
    },
    Project: {
        label: 'Projects',
        color: 'hsl(262, 83%, 58%)', // Purple
    },
    PageSection: {
        label: 'Page Sections',
        color: 'hsl(31, 97%, 52%)', // Orange
    },
    PageContent: {
        label: 'Page Content',
        color: 'hsl(340, 82%, 52%)', // Pink
    },
} satisfies ChartConfig;

const actionChartConfig = {
    created: {
        label: 'Created',
        color: 'hsl(142, 76%, 36%)',
    },
    updated: {
        label: 'Updated',
        color: 'hsl(217, 91%, 60%)',
    },
    deleted: {
        label: 'Deleted',
        color: 'hsl(0, 84%, 60%)',
    },
} satisfies ChartConfig;

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Dashboard({ stats }: DashboardProps) {
    const getActionColor = (action: string) => {
        switch (action) {
            case 'created':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'updated':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'deleted':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                            <FileEdit className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalServices}</div>
                            <p className="text-xs text-muted-foreground">Active service offerings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProjects}</div>
                            <p className="text-xs text-muted-foreground">Portfolio projects</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Navigation Items</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalNavigationItems}</div>
                            <p className="text-xs text-muted-foreground">Menu items</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Activity Over Time */}
                    <ChartAreaInteractive activityData={stats.activityByDay} />

                    {/* Activity by Model */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity by Content Type</CardTitle>
                            <CardDescription>What's being changed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={modelChartConfig} className="h-[200px] w-full">
                                <BarChart data={stats.activityByModel}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="model" 
                                        tickFormatter={(value) => {
                                            const config = modelChartConfig[value as keyof typeof modelChartConfig];
                                            return config ? config.label : value.replace('Item', '').replace('Page', '');
                                        }} 
                                    />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {stats.activityByModel.map((entry, index) => {
                                            const config = modelChartConfig[entry.model as keyof typeof modelChartConfig];
                                            return (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={config?.color || 'hsl(var(--chart-1))'} 
                                                />
                                            );
                                        })}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity by Action & Recent Activities */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Actions Pie Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Types</CardTitle>
                            <CardDescription>Create, Update, Delete</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={actionChartConfig} className="h-[200px] w-full">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Pie
                                        data={stats.activityByAction}
                                        dataKey="count"
                                        nameKey="action"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        label={(entry) => `${entry.action}: ${entry.count}`}
                                    >
                                        {stats.activityByAction.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={actionChartConfig[entry.action as keyof typeof actionChartConfig]?.color || COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Recent Activities
                            </CardTitle>
                            <CardDescription>Latest changes made in the admin dashboard</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stats.recentActivities.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">No recent activities</p>
                                ) : (
                                    stats.recentActivities.slice(0, 5).map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3 text-sm border-b pb-3 last:border-0">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getActionColor(activity.action)}`}>
                                                {activity.action}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{activity.description}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    by {activity.user.name} • {new Date(activity.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
