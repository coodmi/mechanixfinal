interface PageHeroProps {
    quote?: string;
    quote_highlight?: string;
    author?: string;
    background_image?: string;
}

export default function PageHeroSection({ pageHero }: { pageHero?: PageHeroProps | null }) {
    const defaultQuote = "Design is not just what it looks like. Design is how it works.";
    const defaultHighlight = "how it works";
    const defaultAuthor = "- Steve Jobs";
    const defaultBg = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

    const quote = pageHero?.quote || defaultQuote;
    const highlight = pageHero?.quote_highlight || defaultHighlight;
    const author = pageHero?.author || defaultAuthor;
    const bgImage = pageHero?.background_image || defaultBg;

    // Split quote by highlight
    const parts = quote.split(highlight);
    const beforeHighlight = parts[0] || '';
    const afterHighlight = parts.length > 1 ? parts.slice(1).join(highlight) : '';

    return (
        <section 
            className="pt-32 relative flex min-h-[400px] items-center justify-center bg-black py-20 text-center text-white"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl font-quote">
                    "{beforeHighlight}
                    <span className="text-blue-500">{highlight}</span>
                    {afterHighlight}"
                </h1>
                <p className="mt-6 text-xl text-gray-400 font-quote">{author}</p>
            </div>
        </section>
    );
}
