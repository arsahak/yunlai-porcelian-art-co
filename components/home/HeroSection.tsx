'use client';

import Button from '@/components/shared/Button';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const HeroSection = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/assets/home/hero-flower1.png",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    },
    {
      id: 2,
      image: "/assets/home/hero-flower1.png",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    },
    {
      id: 3,
      image: "/assets/home/hero-flower1.png",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    }
  ];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-[#F8F9FA] overflow-hidden">
      
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="w-full h-full relative">
             {/* Slide Background Image - Full Width/Height */}
             <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={slide.image}
                  alt="Background" 
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 z-10" /> 
             </div>

             {/* Content Container */}
             <div className="container mx-auto h-full px-4 relative z-20 flex items-center pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  
                  {/* Left Content */}
                  <div className="space-y-6 max-w-2xl">
                     <AnimatePresence mode='wait'>
                       {activeIndex === index && (
                         <>
                          <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-title leading-tight text-secondary"
                          >
                            {slide.titlePrefix} <br />
                            <span className="text-primary italic">
                              {slide.titleSuffix}
                            </span>
                          </motion.h1>
                          
                          <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="text-gray-800 text-lg md:text-xl font-sans leading-relaxed max-w-lg mt-6 font-medium"
                          >
                            {slide.subtitle}
                          </motion.p>
  
                           <motion.div 
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -20 }}
                             transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                             className="flex flex-wrap gap-4 pt-8"
                           >
                            <Button 
                              href="/contact-us" 
                              className="!px-8 !py-3 shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
                            >
                              {t.Common.contactUs}
                            </Button>
                            <Button 
                              href="/about-us" 
                              className="!px-8 !py-3 border-2 border-primary text-primary hover:bg-primary/5 shadow-none hover:shadow-sm !bg-transparent"
                              textColor="text-primary"
                            >
                              {t.Common.learnMore}
                            </Button>
                          </motion.div>
                         </>
                       )}
                     </AnimatePresence>
                  </div>
  
                 
                 
                </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button 
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/50 hover:bg-white backdrop-blur-sm shadow-sm transition-all text-secondary hover:text-primary z-20 hidden md:block group cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button 
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/50 hover:bg-white backdrop-blur-sm shadow-sm transition-all text-secondary hover:text-primary z-20 hidden md:block group cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </section>
  );
};

export default HeroSection;
