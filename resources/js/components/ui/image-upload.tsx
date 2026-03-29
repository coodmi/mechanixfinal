import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

interface ImageUploadProps {
    value: string;
    onChange: (file: File) => void;
    onRemove: () => void;
    label: string;
    error?: string;
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    label,
    error,
    maxSize = MAX_FILE_SIZE,
    allowedTypes = ALLOWED_FILE_TYPES,
    aspectRatio = 'auto',
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): boolean => {
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            const allowedExtensions = allowedTypes
                .map((type) => type.split('/')[1].toUpperCase())
                .join(', ');
            toast.error(`Invalid file type. Allowed types: ${allowedExtensions}`);
            return false;
        }

        // Check file size
        if (file.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
            toast.error(`File is too large. Maximum size is ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (validateFile(file)) {
                onChange(file);
            } else {
                // Reset the input so user can try again
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'square':
                return 'aspect-square';
            case 'landscape':
                return 'aspect-video';
            case 'portrait':
                return 'aspect-[3/4]';
            default:
                return 'h-48';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex flex-col gap-4">
                {value && (
                    <div className={`relative w-full rounded-lg overflow-hidden border bg-muted ${getAspectRatioClass()}`}>
                        <img src={value} alt={label} className="w-full h-full object-contain" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={onRemove}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}
                <div className="space-y-1">
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept={allowedTypes.join(',')}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        {value ? 'Change Image' : 'Upload Image'}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Max size: {formatFileSize(maxSize)} • Formats: JPG, PNG, GIF, WebP, SVG
                    </p>
                </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

export default ImageUpload;
