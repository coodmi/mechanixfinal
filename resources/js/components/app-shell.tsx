import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Read the cookie value immediately, not in useEffect
function getInitialSidebarState(): boolean {
    const cookieValue = getCookie('sidebar_state');
    if (cookieValue !== undefined) {
        return cookieValue === 'true';
    }
    return true; // default to open
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return <SidebarProvider defaultOpen={getInitialSidebarState()}>{children}</SidebarProvider>;
}
