import { assetUrl } from '@/lib/asset-url';

interface PageHeroProps {
    quote?: string;
    quote_highlight?: string;
    author?: string;
    background_image?: string;
}

export default function PageHeroSection({ pageHero }: { pageHero?: PageHeroProps | null }) {
    const quote = pageHero?.quote || 'Design is not just what it looks like. Design is how it works.';
    const highlight = pageHero?.quote_highlight || '';
    const author = (pageHero?.author || 'Steve Jobs').replace(/^[-–—]\s*/, '');
    const bgImage = pageHero?.background_image
        ? assetUrl(pageHero.background_image)
        : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop';

    // Split quote around the highlighted phrase
    const renderQuote = () => {
        if (!highlight) return <span>{quote}</span>;
        const parts = quote.split(highlight);
        if (parts.length < 2) return <span>{quote}</span>;
        return (
            <>
                {parts[0]}
                <span className="text-blue-500">{highlight}</span>
                {parts.slice(1).join(highlight)}
            </>
        );
    };

    return (
        <section
            className="pt-32 relative flex min-h-[400px] items-center justify-center bg-black py-20 text-center text-white"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl font-quote">
                    "{renderQuote()}"
                </h1>
                <p className="mt-6 text-xl text-gray-400 font-quote">— {author}</p>
            </div>
        </section>
    );
}
