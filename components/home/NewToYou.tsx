'use client';

import { Product } from '@/app/actions/products';
import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type TabId = 'bestSeller' | 'newArrival' | 'offer' | 'trending' | 'all';

const NewToYou = () => {
  const { locale } = useLocale();
  const t = translations[locale].NewToYou;
  const [activeTab, setActiveTab] = useState<TabId>('bestSeller');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'bestSeller' as TabId, label: t.tabs.bestSeller, badge: 'best-seller' },
    { id: 'newArrival' as TabId, label: t.tabs.newArrival, badge: 'new-arrival' },
    { id: 'offer' as TabId, label: t.tabs.offer, badge: 'offer' },
    { id: 'trending' as TabId, label: t.tabs.trending, badge: 'trending' },
    { id: 'all' as TabId, label: t.tabs.all, badge: null },
  ];

  // Fetch products based on active tab
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        let url = `${API_URL}/api/products?status=active&limit=10&sortBy=createdAt&sortOrder=desc`;
        
        // Add badge filter based on active tab
        const currentTab = tabs.find(tab => tab.id === activeTab);
        if (currentTab?.badge) {
          url += `&badges=${currentTab.badge}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setProducts(result.data);
          } else {
            setProducts([]);
          }
        } else {
          console.error('Failed to fetch products');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getProductImage = (product: Product): string => {
    // Get primary image or first image
    const primaryImage = product.images?.find(img => img.isPrimary);
    const firstImage = product.images?.[0];
    return primaryImage?.url || firstImage?.url || '/assets/placeholder-product.png';
  };

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-white py-8 md:py-20 pb-0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl font-serif font-bold text-primary">
            <span className="text-secondary">{t.titlePrefix}</span> {t.titleSuffix}
          </h2>

          {/* Badge Tabs - Functional Filters */}
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

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl aspect-square mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                {/* Image Card */}
                <div className="bg-[#FAFAFA] rounded-3xl p-6 mb-4 aspect-square flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-[#F0FDF4]">
                  <div className="w-full h-full relative">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>
                  
                  {/* Badge Display */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badges.slice(0, 2).map((badge, idx) => {
                        const badgeStyles: Record<string, { bg: string; text: string; label: string }> = {
                          'featured': { bg: 'bg-yellow-400', text: 'text-gray-900', label: '⭐' },
                          'best-seller': { bg: 'bg-orange-500', text: 'text-white', label: '🔥' },
                          'new-arrival': { bg: 'bg-blue-500', text: 'text-white', label: 'NEW' },
                          'offer': { bg: 'bg-green-500', text: 'text-white', label: 'OFFER' },
                          'trending': { bg: 'bg-purple-500', text: 'text-white', label: '📈' },
                        };
                        const style = badgeStyles[badge] || { bg: 'bg-gray-500', text: 'text-white', label: badge };
                        
                        return (
                          <span
                            key={idx}
                            className={`${style.bg} ${style.text} px-2 py-0.5 rounded-full text-xs font-bold`}
                          >
                            {style.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  {product.category && (
                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-primary font-medium font-sans">
                      {formatPrice(product.price)}
                    </p>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <p className="text-gray-400 text-sm line-through">
                        {formatPrice(product.compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">      
            <p className="text-gray-500 text-lg mb-2">No products found in this category</p>
          </div>
        )}
      </div>
    </section>
    </ScrollMotion>
  );
};

export default NewToYou;
