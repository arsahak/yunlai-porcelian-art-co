"use client";

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import Image from 'next/image';
import Link from 'next/link';

const OurService = () => {
  const { locale } = useLocale();
  const t = Translations[locale].AboutUs.Services;

  const services = [
    {
      title: t.items.sampling.title,
      description: t.items.sampling.desc,
      image: "/assets/about/service1.png",
      link: "/contact-us"
    },
    {
      title: t.items.customization.title,
      description: t.items.customization.desc,
      image: "/assets/about/service1.png",
      link: "/contact-us"
    }
  ];

  // Duplicating array to match the 4-card layout
  const displayServices = [...services, ...services]; 

  return (
    <ScrollMotion animation="fade-up">
    <section className="py-8 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/about/servicebg.png"
          alt="Service Background"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title text-gray-900">
            {t.titlePrefix} <span className="text-primary">{t.titleHighlight}</span>
          </h2>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {displayServices.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-[2rem] p-6 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/3 aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
              
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-title text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2">
                  <Link 
                    href={service.link}
                    className="inline-block text-primary font-medium hover:underline underline-offset-4 transition-all"
                  >
                    {t.learnMore}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default OurService;
