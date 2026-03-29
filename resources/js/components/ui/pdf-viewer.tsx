'use client';

import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string;
    title?: string;
    className?: string;
}

export function PDFViewer({ url, title, className }: PDFViewerProps) {
    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [scale, setScale] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setIsLoading(false);
        setError(null);
    };

    const onDocumentLoadError = (error: Error) => {
        setError('Failed to load PDF');
        setIsLoading(false);
        console.error('PDF load error:', error);
    };

    const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
    const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
    const resetZoom = () => setScale(1);

    return (
        <div className={cn('flex flex-col bg-gray-100 rounded-lg overflow-hidden', className)}>
            {/* Header */}
            {title && (
                <div className="px-4 py-3 bg-white border-b">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[80px] text-center">
                        {pageNumber} / {numPages || '...'}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 3}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetZoom}>
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-auto p-4 flex justify-center">
                {error ? (
                    <div className="flex items-center justify-center h-64 text-destructive">
                        {error}
                    </div>
                ) : (
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-lg"
                        />
                    </Document>
                )}
            </div>
        </div>
    );
}
