import { ArrowUpRight } from 'lucide-react';
import { FounderContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';
import { Link } from '@inertiajs/react';

export default function OurFounder({ content }: { content?: FounderContent }) {
    const mainImage = assetUrl(content?.main_image) || '/images/founder.png';
    const profileImage = assetUrl(content?.profile_image) || null;
    const ctaLink = content?.cta_link || '/careers';

    return (
        <section className="w-full bg-[#f5f4f0] py-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Left — Text */}
                <div className="flex-1 space-y-6 order-2 lg:order-1">
                    {content?.label && (
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            {content.label}
                        </p>
                    )}

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {content?.title || 'Our Team'}
                    </h2>

                    <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                        {content?.description || ''}
                    </p>

                    {/* Profile row */}
                    {(profileImage || content?.founder_name) && (
                        <div className="flex items-center gap-4 pt-2">
                            {profileImage && (
                                <img
                                    src={profileImage}
                                    alt={content?.founder_name || 'Team member'}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                                />
                            )}
                            <div>
                                {content?.founder_name && (
                                    <p className="font-bold text-gray-900">{content.founder_name}</p>
                                )}
                                {content?.founder_title && (
                                    <p className="text-sm text-gray-500">{content.founder_title}</p>
                                )}
                                {content?.company_name && !content?.founder_title && (
                                    <p className="text-sm text-gray-500">{content.company_name}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {content?.cta_text && (
                        <Link href={ctaLink}>
                            <button className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors duration-200 mt-2">
                                {content.cta_text}
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </Link>
                    )}
                </div>

                {/* Right — Image with quote overlay */}
                <div className="relative flex-shrink-0 order-1 lg:order-2 w-full max-w-sm lg:max-w-md">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                        <img
                            src={mainImage}
                            alt={content?.founder_name || 'Team'}
                            className="w-full h-full object-cover object-top"
                        />

                        {/* Quote overlay */}
                        {content?.quote && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white p-5">
                                <p className="text-sm leading-relaxed italic mb-3">
                                    {content.quote}
                                </p>
                                <div className="flex items-center gap-3">
                                    {profileImage && (
                                        <img
                                            src={profileImage}
                                            alt={content?.founder_name || ''}
                                            className="w-8 h-8 rounded-full object-cover border border-white/30"
                                        />
                                    )}
                                    <div>
                                        {content?.founder_name && (
                                            <p className="text-sm font-bold">{content.founder_name}</p>
                                        )}
                                        {content?.founder_title && (
                                            <p className="text-xs text-gray-300">{content.founder_title}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
