import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useSidebar } from '@/components/ui/sidebar';
import { assetUrl } from '@/lib/asset-url';

export default function AppLogo() {
    const { siteSettings } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const logoUrl = assetUrl(siteSettings?.logoUrl) || '/logo.png';
    const logoVersion = siteSettings?.logoVersion || '';
    const isCollapsed = state === 'collapsed';

    if (isCollapsed) {
        return (
            <div className="border rounded-md bg-primary-foreground text-sidebar-primary-foreground aspect-square size-8 shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                    className="h-6 w-6 object-contain"
                    src={`${logoUrl}?v=${logoVersion}`} 
                    alt="Logo"
                    loading="eager"
                />
            </div>
        );
    }

    return (
        <div className="w-full h-[75px] flex items-center justify-center">
            <img 
                className="max-w-full max-h-full object-contain"
                src={`${logoUrl}?v=${logoVersion}`} 
                alt="Logo"
                loading="eager"
            />
        </div>
    );
}
