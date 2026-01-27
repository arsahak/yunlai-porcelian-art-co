'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import Image from 'next/image';
import Link from 'next/link';

const FindTheRightPot = () => {
  const { locale } = useLocale();
  const t = translations[locale].FindPot;

  const categories = [
    { id: 'indoor', label: t.categories.indoor, image: "/assets/home/Rectangle 1030.png" },
    { id: 'outdoor', label: t.categories.outdoor, image: "/assets/home/Rectangle 1030-1.png" },
    { id: 'succulents', label: t.categories.succulents, image: "/assets/home/Rectangle 1030-2.png" },
    { id: 'flowering', label: t.categories.flowering, image: "/assets/home/Rectangle 1030-3.png" },
    { id: 'herbs', label: t.categories.herbs, image: "/assets/home/Rectangle 1030-1.png" },
    { id: 'large', label: t.categories.large, image: "/assets/home/Rectangle 1030.png" },
    { id: 'hanging', label: t.categories.hanging, image: "/assets/home/Rectangle 1030-2.png" },
    { id: 'tabletop', label: t.categories.tabletop, image: "/assets/home/Rectangle 1030-3.png" },
  ];

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-[#FAFAFA] py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">
            {t.titlePrefix} <span className="text-primary">{t.titleHighlight}</span> {t.titleSuffix}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link 
              href={`/products?category=${cat.id}`} 
              key={cat.id}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-transparent hover:border-primary/20"
            >
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default FindTheRightPot;
