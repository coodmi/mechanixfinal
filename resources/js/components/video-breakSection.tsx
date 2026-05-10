import { Play, X } from 'lucide-react';
import { useState } from 'react';
import { assetUrl } from '@/lib/asset-url';

function getEmbedUrl(url: string): string | null {
    if (!url) return null;

    // YouTube
    const ytMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

    // Direct video file
    if (url.match(/\.(mp4|webm|ogg)$/i)) return url;

    return null;
}

export default function VideoBreakSection({ content }: { content?: any }) {
    const [playing, setPlaying] = useState(false);

    const bgImage = assetUrl(content?.background_image)
        || 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2800&auto=format&fit=crop';

    const videoUrl = content?.video_url || '';
    const embedUrl = getEmbedUrl(videoUrl);
    const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg)$/i);

    return (
        <>
            <section
                className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url('${bgImage}')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center space-y-6">
                    {videoUrl && (
                        <button
                            onClick={() => setPlaying(true)}
                            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto hover:scale-110 hover:bg-white/20 transition-all duration-300 border border-white/30 cursor-pointer"
                            aria-label="Play video"
                        >
                            <Play className="text-white fill-white ml-1 w-7 h-7" />
                        </button>
                    )}
                    {!videoUrl && (
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/30">
                            <Play className="text-white fill-white ml-1 w-7 h-7" />
                        </div>
                    )}
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {content?.title || 'The Mechanix Process'}
                    </h2>
                </div>
            </section>

            {/* Video Modal */}
            {playing && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setPlaying(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setPlaying(false)}
                        aria-label="Close video"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className="w-full max-w-4xl mx-4 aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isDirectVideo ? (
                            <video
                                src={videoUrl}
                                autoPlay
                                controls
                                className="w-full h-full rounded-lg"
                            />
                        ) : embedUrl ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full rounded-lg"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                                <p>Unable to play this video URL.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
