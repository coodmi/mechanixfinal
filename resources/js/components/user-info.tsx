import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type User } from '@/types';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { assetUrl } from '@/lib/asset-url';

function getInitials(name: string) {
    const names = name.trim().split(' ');
    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function UserInfo({ user, showEmail }: { user: User; showEmail?: boolean }) {
    const { siteSettings } = usePage<SharedData>().props;
    const logoUrl = assetUrl(siteSettings?.logoUrl) || '/logo.png';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full border bg-primary-foreground">
                <AvatarImage 
                    src={logoUrl} 
                    alt="Logo" 
                    className="h-6 w-6 m-auto object-contain"
                    loading="eager"
                />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
