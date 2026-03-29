import { Play } from 'lucide-react';

export default function VideoBreakSection({ content }: { content?: any }) {
    return (
        <section
            className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover"
            style={{
                backgroundImage: `url('${content?.background_image || "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2800&auto=format&fit=crop"}')`,
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform border border-white/30">
                    <Play className="text-white fill-white ml-1" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                    {content?.title || "The Mechanix Process"}
                </h2>
            </div>
        </section>
    );
}
