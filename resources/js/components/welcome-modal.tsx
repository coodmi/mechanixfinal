import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { assetUrl } from '@/lib/asset-url';

interface WelcomeModalProps {
    settings?: {
        title?: string;
        description?: string;
        button_text?: string;
        button_link?: string;
        image?: string;
        note?: string;
        is_active?: boolean;
    };
}

export default function WelcomeModal({ settings }: WelcomeModalProps) {
    const [open, setOpen] = useState(false);

    const isActive = settings?.is_active !== false;
    const title = settings?.title || 'Transform Your Space';
    const description = settings?.description || 'Book a free 30-minute consultation with our lead designer and start your dream interior project today.';
    const buttonText = settings?.button_text || 'Book Free Consultation';
    const buttonLink = settings?.button_link || '#contact';
    const image = settings?.image || '/images/welcome-modal.jpg';
    const note = settings?.note || 'Limited slots available this week.';

    useEffect(() => {
        if (!isActive) return;
        const timer = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const close = () => setOpen(false);

    const handleCta = () => {
        close();
        if (buttonLink.startsWith('http')) {
            window.open(buttonLink, '_blank');
        } else if (buttonLink.startsWith('#')) {
            const el = document.getElementById(buttonLink.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = buttonLink;
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={close}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image banner */}
                <div className="relative h-56 w-full">
                    <img
                        src={assetUrl(image) || '/images/welcome-modal.jpg'}
                        alt="Welcome"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop';
                        }}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-1.5 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {/* Tag on image */}
                    <span className="absolute bottom-4 left-4 bg-[#E63946] text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                        Special Offer
                    </span>
                </div>

                {/* Content */}
                <div className="p-7">
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {description}
                    </p>

                    <button
                        onClick={handleCta}
                        className="w-full bg-[#E63946] hover:bg-[#c2303a] text-white font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide"
                    >
                        {buttonText}
                    </button>

                    {note && (
                        <p className="text-center text-xs text-gray-400 mt-3">{note}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
