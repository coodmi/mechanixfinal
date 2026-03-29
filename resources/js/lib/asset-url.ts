/**
 * Resolves a stored image path to a full accessible URL.
 * Handles relative paths like /storage/... by prepending APP_URL.
 * Works whether the app is at root (localhost) or a subdirectory (localhost/Mechanix).
 */
export function assetUrl(path: string | null | undefined): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    const base = ((window as any).__APP_URL__ as string | undefined)?.replace(/\/$/, '') ?? '';
    return base + (path.startsWith('/') ? path : '/' + path);
}
