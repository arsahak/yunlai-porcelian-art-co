'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import Image from 'next/image';
import Link from 'next/link';

const OurServices = () => {
  const { locale } = useLocale();
  const t = translations[locale].Services;
  const commonT = translations[locale].Common;

  const services = [
    {
      id: 1,
      image: "/assets/home/Rectangle 3134.png",
      title: t.items.sampling.title,
      desc: t.items.sampling.desc
    },
    {
      id: 2,
      image: "/assets/home/Rectangle 3135.png",
      title: t.items.landscaping.title,
      desc: t.items.landscaping.desc
    },
    {
      id: 3,
      image: "/assets/home/Rectangle 3136.png",
      title: t.items.greenWall.title,
      desc: t.items.greenWall.desc
    },
      {
      id: 4,
      image: "/assets/home/Rectangle 3134.png",
      title: t.items.sampling.title,
      desc: t.items.sampling.desc
    },
    {
      id: 5,
      image: "/assets/home/Rectangle 1033-1.png",
      title: t.items.landscaping.title,
      desc: t.items.landscaping.desc
    },
    {
      id: 6,
      image: "/assets/home/Rectangle 3136.png",
      title: t.items.greenWall.title,
      desc: t.items.greenWall.desc
    },
   {
      id: 7,
      image: "/assets/home/Rectangle 1032.png",
      title: t.items.landscaping.title,
      desc: t.items.landscaping.desc
    },
    {
      id: 8,
      image: "/assets/home/Rectangle 1033.png",
      title: t.items.greenWall.title,
      desc: t.items.greenWall.desc
    },
  ];

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-white py-8 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            {t.titlePrefix} <span className="text-primary">{t.titleSuffix}</span>
          </h2>
          <p className="text-gray-500 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {services.map((service) => (
            <div key={service.id} className="group">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden mb-6 rounded-sm">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              
              <Link 
                href="/services" 
                className="inline-block text-primary font-medium border-b border-primary/30 hover:border-primary transition-colors text-sm items-center gap-1"
              >
                {commonT.learnMore}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default OurServices;
