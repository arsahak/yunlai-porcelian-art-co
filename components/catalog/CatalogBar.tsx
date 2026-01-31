"use client";

import { Award, Globe, Package, PenTool } from 'lucide-react';
import Image from 'next/image';

const CatalogBar = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8 text-gray-800" strokeWidth={1.5} />,
      title: "Global Delivery",
    },
    {
      icon: <PenTool className="w-8 h-8 text-gray-800" strokeWidth={1.5} />,
      title: "Design & Prototyping",
    },
    {
      icon: <Award className="w-8 h-8 text-gray-800" strokeWidth={1.5} />,
      title: "Premium Quality",
    },
    {
      icon: <Package className="w-8 h-8 text-gray-800" strokeWidth={1.5} />,
      title: "Complete Packaging",
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/home/catalog_bar_bg_1769839404126.png"
          alt="Dark Pottery Background"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-4 p-3 rounded-full bg-gray-50 group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-gray-900 font-semibold text-lg max-w-[150px]">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogBar;
