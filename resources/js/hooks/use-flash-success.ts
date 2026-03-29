import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

/**
 * Custom hook to show toast messages based on flash data
 * @param recentlySuccessful - The recentlySuccessful prop from useForm
 * @param successMessage - The message to show when data is updated
 */
export function useFlashSuccess(recentlySuccessful: boolean, successMessage: string) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (recentlySuccessful && flash?.success) {
            if (flash.success === 'updated') {
                toast.success(successMessage);
            } else if (flash.success === 'no-changes') {
                toast.info('No changes detected');
            }
        }
    }, [recentlySuccessful, flash, successMessage]);
}
