'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import Button from '@/components/shared/Button';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

const InsighedSection = () => {
  const { locale } = useLocale();
  const t = translations[locale].Insights;

  const articles = [
    {
      id: 1,
      image: "/assets/home/Rectangle 1030.png",
      date: t.date,
      title: t.articleTitle,
      description: t.articleDesc
    },
    {
      id: 2,
      image: "/assets/home/Rectangle 1030-1.png",
      date: t.date,
      title: t.articleTitle,
      description: t.articleDesc
    },
    {
      id: 3,
      image: "/assets/home/Rectangle 1030-2.png",
      date: t.date,
      title: t.articleTitle,
      description: t.articleDesc
    },
    {
      id: 4,
      image: "/assets/home/Rectangle 1030-3.png",
      date: t.date,
      title: t.articleTitle,
      description: t.articleDesc
    }
  ];

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-gray-50/50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-3">
              {t.titlePrefix} <span className="text-primary">{t.titleSuffix}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t.subtitle}
            </p>
          </div>
          
          <Button 
            href="/blog" 
            className="!px-8 !py-3 bg-primary hover:bg-primary/90 shadow-lg"
          >
            {t.explore}
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              {/* Image Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default InsighedSection;
