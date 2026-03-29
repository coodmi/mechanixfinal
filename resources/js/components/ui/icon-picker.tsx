import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

// Get all available Lucide icons
const iconNames = Object.keys(LucideIcons).filter(
    (key) =>
        key !== 'createLucideIcon' &&
        !key.startsWith('Lucide') &&
        key !== 'default'
);

// Common icons for amenities
const commonAmenityIcons = [
    'Home',
    'Building',
    'Building2',
    'Car',
    'Bike',
    'Wifi',
    'Tv',
    'Wind',
    'Droplet',
    'Zap',
    'Shield',
    'ShieldCheck',
    'Camera',
    'Lock',
    'Thermometer',
    'Trees',
    'Flower',
    'Dumbbell',
    'Waves',
    'Utensils',
    'ShoppingCart',
    'Hospital',
    'GraduationCap',
    'Plane',
    'Train',
    'Bus',
    'Music',
    'GameController',
    'Baby',
    'Dog',
    'Sun',
    'Moon',
    'CloudRain',
    'CheckCircle',
    'Star',
    'Heart',
    'Sparkles',
];

interface IconPickerProps {
    value: string;
    onChange: (icon: string) => void;
    className?: string;
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const IconComponent = value && LucideIcons[value as keyof typeof LucideIcons]
        ? (LucideIcons[value as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
        : null;

    const renderIconItem = (iconName: string) => {
        const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
        if (!Icon) return null;

        return (
            <CommandItem
                key={iconName}
                value={iconName}
                className="cursor-pointer data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                onSelect={() => {
                    onChange(iconName);
                    setOpen(false);
                    setSearch('');
                }}
            >
                <Check
                    className={cn(
                        'mr-2 h-4 w-4',
                        value === iconName ? 'opacity-100' : 'opacity-0'
                    )}
                />
                <Icon className="mr-2 h-4 w-4" />
                <span>{iconName}</span>
            </CommandItem>
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between', className)}
                >
                    <div className="flex items-center gap-2">
                        {IconComponent ? (
                            <>
                                <IconComponent className="h-4 w-4" />
                                <span>{value}</span>
                            </>
                        ) : (
                            <span className="text-muted-foreground">Select icon...</span>
                        )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search icons..."
                        onValueChange={setSearch}
                    />
                    <CommandList className="max-h-[300px]">
                        <CommandEmpty>No icon found.</CommandEmpty>
                        {!search && (
                            <CommandGroup heading="Common Icons">
                                {commonAmenityIcons.map(renderIconItem)}
                            </CommandGroup>
                        )}
                        {search && (
                            <CommandGroup heading="Search Results">
                                {iconNames
                                    .filter((name) =>
                                        name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .slice(0, 50)
                                    .map(renderIconItem)}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

// Helper component to render an icon by name
export function LucideIcon({ name, className }: { name: string; className?: string }) {
    const Icon = (LucideIcons as any)[name];
    if (!Icon) return null;
    return <Icon className={className} />;
}
