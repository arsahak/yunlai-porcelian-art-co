'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const NewToYou = () => {
  const { locale } = useLocale();
  const t = translations[locale].NewToYou;
  const [activeTab, setActiveTab] = useState('bestSeller');

  const tabs = [
    { id: 'bestSeller', label: t.tabs.bestSeller },
    { id: 'newArrival', label: t.tabs.newArrival },
    { id: 'offer', label: t.tabs.offer },
    { id: 'trending', label: t.tabs.trending },
    { id: 'all', label: t.tabs.all },
  ];

  const products = [
    { id: 1, name: "Quera Bloom", price: 70, image: "/assets/home/Rectangle 1030.png" },
    { id: 2, name: "Plonta Bloom", price: 40, image: "/assets/home/Rectangle 1030-1.png" },
    { id: 3, name: "Plonta Bloom", price: 40, image: "/assets/home/Rectangle 1030-2.png" },
    { id: 4, name: "Plonta Bloom", price: 40, image: "/assets/home/Rectangle 1030-3.png" },
    { id: 5, name: "Plonta Bloom", price: 40, image: "/assets/home/Rectangle 1030-2.png" },
  ];

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-white py-8 md:py-20 pb-0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl font-serif font-bold text-primary">
            <span className="text-secondary">{t.titlePrefix}</span> {t.titleSuffix}
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm md:text-base font-medium transition-colors relative pb-1
                  ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-800'}
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Card */}
              <div className="bg-[#FAFAFA] rounded-3xl p-6 mb-4 aspect-square flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-[#F0FDF4]">
                 <div className="w-full h-full relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                 </div>
                 
                 {/* Quick action buttons could go here (e.g. Add to Cart) - Hidden for now */}
              </div>

              {/* Info */}
              <div className="text-center space-y-1">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary font-medium font-sans">
                  ${product.price.toFixed(2)}
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

export default NewToYou;
