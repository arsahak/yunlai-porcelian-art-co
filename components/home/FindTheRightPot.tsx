'use client';

import { Category, getCategories } from '@/app/actions/category';
import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FindTheRightPot = () => {
  const { locale } = useLocale();
  const t = translations[locale].FindPot;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories({ limit: 8 }); // Get first 8 categories
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ScrollMotion animation="fade-up">
      <section className="w-full bg-[#FAFAFA] py-8 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">
              {t.titlePrefix} <span className="text-primary">{t.titleHighlight}</span> {t.titleSuffix}
            </h2>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm animate-pulse"
                >
                  <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {categories.map((cat) => (
                <Link
                  href={`/products?category=${cat.slug}`}
                  key={cat._id}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-transparent hover:border-primary/20"
                >
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/30">
                          {cat.title[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Product Count Badge */}
                    {cat.productCount !== undefined && cat.productCount > 0 && (
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                        {cat.productCount}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories available</p>
            </div>
          )}
        </div>
      </section>
    </ScrollMotion>
  );
};

export default FindTheRightPot;
