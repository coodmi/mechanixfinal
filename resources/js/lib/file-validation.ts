import { toast } from 'sonner';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

export interface FileValidationOptions {
    maxSize?: number;
    allowedTypes?: string[];
}

export function validateImageFile(file: File, options: FileValidationOptions = {}): boolean {
    const maxSize = options.maxSize ?? MAX_FILE_SIZE;
    const allowedTypes = options.allowedTypes ?? ALLOWED_IMAGE_TYPES;

    // Check file type
    if (!allowedTypes.includes(file.type)) {
        const extensions = allowedTypes.map((type) => type.split('/')[1].toUpperCase()).join(', ');
        toast.error(`Invalid file type. Allowed: ${extensions}`);
        return false;
    }

    // Check file size
    if (file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        toast.error(`File is too large. Maximum size is ${maxSizeMB}MB`);
        return false;
    }

    return true;
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
