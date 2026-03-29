import Navbar from '@/components/site-header';
import ContactSection from '@/components/contact-section';
import PageHeroSection from '@/components/page-hero-section';
import { Head } from '@inertiajs/react';
import { CMSPageProps } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';

interface PageSettings {
    page_title: string;
    page_subtitle: string;
    meta_title: string;
    meta_description: string;
}

interface ClientsProps extends CMSPageProps {
    clients: any[];
    page_hero: any;
    page_settings: PageSettings;
}

export default function Clients(props: ClientsProps) {
    const { clients = [], page_hero, page_settings } = props;

    return (
        <>
            <Head title={page_settings?.meta_title || "Clients - Mechanix Interior"}>
                <meta name="description" content={page_settings?.meta_description || "View our trusted clients and partners."} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="antialiased selection:bg-brand/20 selection:text-foreground">
                <Navbar navigation={props.navigation} siteSettings={props.siteSettings} headerSettings={props.headerSettings} />

                {/* Hero Section */}
                <PageHeroSection pageHero={page_hero} />

                <section className="container mx-auto px-4 py-20 pt-32">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                            {page_settings?.page_title || 'Our Clients'}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {page_settings?.page_subtitle || 'We are proud to have worked with these amazing organizations.'}
                        </p>
                    </div>

                    {clients.length > 0 ? (
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {clients.map((client, index) => {
                                const CardWrapper = client.url ? 'a' : 'div';
                                const cardProps = client.url 
                                    ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' } 
                                    : {};
                                
                                return (
                                    <CardWrapper 
                                        key={index} 
                                        {...cardProps}
                                        className={`max-w-max border flex items-center justify-center bg-gray-50 rounded-lg hover:shadow-md transition-shadow ${client.url ? 'cursor-pointer' : ''}`}
                                    >
                                        <img
                                            src={assetUrl(client.logo)}
                                            alt={client.name}
                                            className="h-[250px] rounded-md min-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </CardWrapper>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No clients found.
                        </div>
                    )}
                </section>

                <ContactSection content={props.contact} siteSettings={props.siteSettings} footerSocialLinks={props.footerSocialLinks} />
            </div>
        </>
    );
}
