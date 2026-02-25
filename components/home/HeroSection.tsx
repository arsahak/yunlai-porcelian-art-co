"use client";

import Button from "@/components/shared/Button";
import { useLocale } from "@/lib/i18n";
import translations from "@/messages/translations";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

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
      image: "/assets/home/2.jpg",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    },
    {
      id: 3,
      image: "/assets/home/3.jpg",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    },
    {
      id: 4,
      image: "/assets/home/4.jpg",
      titlePrefix: t.Hero.titlePrefix,
      titleSuffix: t.Hero.titleSuffix,
      subtitle: t.Hero.subtitle,
    },
  ];

  return (
    <section className="relative w-full min-h-[560px] h-[60dvh] md:h-[100dvh] md:min-h-[700px] bg-[#F8F9FA] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="w-full h-full relative">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={slide.image}
                alt="Background"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Gradient overlay — stronger at bottom on mobile, subtle on desktop */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/20 to-black/10 md:bg-gradient-to-r md:from-black/40 md:via-black/10 md:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="w-full container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-0 pb-8 md:pb-0">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <div className="max-w-[1200px] space-y-4 md:space-y-6">

                      {/* Eyebrow tag */}
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-primary/90 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
                      >
                        Yunlai Porcelain Art
                      </motion.span>

                      {/* Heading */}
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-title leading-[1.1] text-white drop-shadow-md"
                      >
                        {slide.titlePrefix} <br className="hidden sm:block" />
                        <span className="text-primary italic">
                          {slide.titleSuffix}
                        </span>
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-medium max-w-sm md:max-w-lg drop-shadow-sm"
                      >
                        {slide.subtitle}
                      </motion.p>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="flex flex-row flex-wrap gap-3 sm:gap-4 pt-2 md:pt-4"
                      >
                        <Button
                          href="/contact-us"
                          className="!px-5 sm:!px-8 !py-2.5 sm:!py-3 text-sm sm:text-base shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
                        >
                          {t.Common.contactUs}
                        </Button>
                        <Button
                          href="/about-us"
                          className="!px-5 sm:!px-8 !py-2.5 sm:!py-3 border-2 border-white text-white hover:bg-white/10 shadow-none !bg-transparent text-sm sm:text-base"
                          textColor="text-white"
                        >
                          {t.Common.learnMore}
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Slide counter — bottom right, all screens */}
            <div className="absolute bottom-6 right-5 sm:right-8 z-30 flex items-center gap-1.5">
              <span className="text-white font-medium text-sm tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-white/50 text-sm">/</span>
              <span className="text-white/50 text-sm">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Mobile dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:hidden">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperInstance?.slideTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "bg-primary w-6" : "bg-white/60 w-1.5"
                  }`}
                />
              ))}
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/20 hover:bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm transition-all text-white hover:text-primary z-20 hidden md:flex items-center justify-center group cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/20 hover:bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm transition-all text-white hover:text-primary z-20 hidden md:flex items-center justify-center group cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </section>
  );
};

export default HeroSection;
