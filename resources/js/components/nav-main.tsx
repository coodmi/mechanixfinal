import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sidebar-open-items';

function getStoredOpenItems(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function setStoredOpenItems(items: string[]) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        // Ignore storage errors
    }
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [initialized, setInitialized] = useState(false);

    // Initialize from localStorage on mount
    useEffect(() => {
        const stored = getStoredOpenItems();
        
        // Also check which items should be open based on current URL
        const activeItems = items
            .filter(item => {
                if (!item.items || item.items.length === 0) return false;
                const isActive = page.url.startsWith(resolveUrl(item.href));
                const isSubItemActive = item.items.some(
                    (subItem) => page.url === resolveUrl(subItem.href)
                );
                return isActive || isSubItemActive;
            })
            .map(item => item.title);
        
        // Merge stored items with currently active items
        const merged = [...new Set([...stored, ...activeItems])];
        setOpenItems(merged);
        setInitialized(true);
    }, []);

    // Save to localStorage whenever openItems changes (after initialization)
    useEffect(() => {
        if (initialized) {
            setStoredOpenItems(openItems);
        }
    }, [openItems, initialized]);

    const toggleItem = useCallback((title: string) => {
        setOpenItems(prev => {
            if (prev.includes(title)) {
                return prev.filter(t => t !== title);
            } else {
                return [...prev, title];
            }
        });
    }, []);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {items.map((item) => {
                    const hasSubItems = item.items && item.items.length > 0;
                    const isActive = page.url.startsWith(resolveUrl(item.href));
                    const isSubItemActive = hasSubItems && item.items?.some(
                        (subItem) => page.url === resolveUrl(subItem.href)
                    );
                    const isOpen = openItems.includes(item.title);

                    if (hasSubItems) {
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                open={isOpen}
                                onOpenChange={() => toggleItem(item.title)}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={{ children: item.title }}
                                            isActive={isActive || isSubItemActive}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={page.url === resolveUrl(subItem.href)}
                                                    >
                                                        <Link href={subItem.href} prefetch>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
