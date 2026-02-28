"use client";

import ScrollMotion from "@/components/motion/ScrollMotion";
import { useLocale } from "@/lib/i18n";
import translations from "@/messages/translations";
import Image from "next/image";
import Link from "next/link";

const OurServices = () => {
  const { locale } = useLocale();
  const t = translations[locale].Services;
  const commonT = translations[locale].Common;

  const services = [
    {
      id: 1,
      title: t.items.sampling.title,
      desc: t.items.sampling.desc,
      image: "/assets/home/1.5.jpg",
      slug: t.items.sampling.slug,
    },
    {
      id: 2,
      image: "/assets/home/1.2.jpg",
      title: t.items.oemCustomization.title,
      desc: t.items.oemCustomization.desc,
      slug: t.items.oemCustomization.slug,
    },
    {
      id: 3,
      image: "/assets/home/1.3.jpg",
      title: t.items.bulkPackaging.title,
      desc: t.items.bulkPackaging.desc,
      slug: t.items.bulkPackaging.slug,
    },
    {
      id: 4,
      image: "/assets/home/1.jpg",
      title: t.items.exportSupport.title,
      desc: t.items.exportSupport.desc,
      slug: t.items.exportSupport.slug,
    },
  ];

  return (
    <ScrollMotion animation="fade-up">
      <section className="w-full bg-white py-8 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              {t.titlePrefix}{" "}
              <span className="text-primary">{t.titleSuffix}</span>
            </h2>
            <p className="text-gray-500 text-lg mb-3">{t.subtitle}</p>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              {t.trustLine}
            </p>
          </div>

          {/* Services Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
            {services.map((service) => (
              <div key={service.id} className="group">
                {/* Image - Square aspect ratio for consistency */}
                <div className="relative aspect-square overflow-hidden mb-6 rounded-lg shadow-md">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  {/* Optional hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors min-h-[3.5rem]">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 min-h-[4.5rem]">
                  {service.desc}
                </p>

                <Link
                  href={`/wholesale-services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium border-b-2 border-primary/30 hover:border-primary transition-colors text-sm"
                >
                  {commonT.learnMore}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
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
