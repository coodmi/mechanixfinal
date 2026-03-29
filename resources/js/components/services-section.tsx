import { useEffect, useRef } from 'react';
import { Home, Briefcase, LayoutTemplate } from 'lucide-react';
import { Service } from '@/types/cms';

interface ServicesSectionProps {
    services: Service[];
    section?: {
        section_title?: string;
        section_description?: string;
    };
}

export default function ServicesSection({ services, section }: ServicesSectionProps) {
    const fadeUpElements = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeUpElements.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="py-24 bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-6">
                <div
                    ref={(el) => {
                        fadeUpElements.current[0] = el;
                    }}
                    className="flex flex-col md:flex-row md:justify-between md:items-end justify-center items-center mb-20 border-b border-white/10 pb-8 opacity-0 translate-y-8 transition-all duration-800"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold ">
                        {section?.section_title || 'Our Expertise'}
                    </h2>
                    <p className="text-gray-400 max-w-md mt-4 md:mt-0 md:text-right text-left">
                        {section?.section_description || 'Tailored interior solutions for commercial, residential, and hospitality sectors.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {services.map((service, index) => {
                        const IconComponent = {
                            Home: Home,
                            Briefcase: Briefcase,
                            LayoutTemplate: LayoutTemplate,
                        }[service.icon || 'Home'] || Home;

                        return (
                            <div
                                key={service.id}
                                ref={(el) => {
                                    fadeUpElements.current[index + 1] = el;
                                }}
                                className="bg-primary p-12 group hover:bg-[#1a1a1a] transition-colors duration-500 opacity-0 translate-y-8"
                                style={{ transitionDuration: '800ms', transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center mb-8 group-hover:scale-105 transition-transform shadow-lg">
                                    <IconComponent className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
