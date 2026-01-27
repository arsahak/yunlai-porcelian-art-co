'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const brands = [
  { name: 'EMAAR', style: 'font-serif tracking-widest' },
  { name: 'GRAND HYATT', style: 'font-sans font-bold tracking-tight' },
  { name: 'dnata', style: 'font-sans font-light lowercase text-xl' },
  { name: 'THE ADDRESS', style: 'font-sans uppercase tracking-[0.2em] text-xs font-bold' },
  { name: 'One&Only', style: 'font-serif italic text-xl' },
  // Duplicates for loop illusion if needed, though Loop mode handles it
  { name: 'EMAAR', style: 'font-serif tracking-widest' },
  { name: 'GRAND HYATT', style: 'font-sans font-bold tracking-tight' },
];

const BrandingSection = () => {
  return (
    <ScrollMotion animation="fade-in" delay={0.2}>
    <section className="w-full bg-[#f4fbf6] py-12 md:py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
             640: { slidesPerView: 3 },
             768: { slidesPerView: 4 },
             1024: { slidesPerView: 5 },
          }}
          className="w-full grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-20">
              <div className="flex items-center justify-center w-full h-full select-none cursor-default">
                 {/* Text Placeholder for Logo */}
                 <span className={`text-2xl text-secondary/80 ${brand.style}`}>
                   {brand.name}
                 </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default BrandingSection;
