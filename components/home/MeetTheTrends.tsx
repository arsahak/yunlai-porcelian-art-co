'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import Button from '@/components/shared/Button';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import Image from 'next/image';

const MeetTheTrends = () => {
  const { locale } = useLocale();
  const t = translations[locale].MeetTheTrends;

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Image with Background Decor */}
          <div className="relative w-full lg:w-1/2">
             {/* Decorative Green Box Background */}
             <div className="absolute top-12 left-12 w-full h-[110%] bg-[#EEF7EF] -z-10 rounded-tr-[100px] hidden lg:block" />
             
             {/* Main Image */}
             <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
               <Image 
                 src="/assets/home/Rectangle 1028.png" // Placeholder
                 alt="Lifestyle Plants" 
                 fill
                 className="object-cover"
               />
             </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h4 className="text-primary font-bold uppercase tracking-wider text-sm">
              {t.label}
            </h4>
            
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight text-black">
              {t.titlePart1} <span className="text-primary font-bold">{t.titlePart2}</span> <br />
              <span className="text-primary font-bold">{t.titlePart3}</span>
            </h2>

            <p className="text-gray-500 leading-relaxed max-w-md">
              {t.desc}
            </p>

            <Button href="/about" className="!mt-8 !px-10 shadow-lg bg-primary hover:bg-primary/90">
              {t.button}
            </Button>
          </div>
        </div>
      </div>

       {/* Decorative Faded Plant (Right Side) */}
       <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-96 opacity-90 pointer-events-none hidden xl:block">
           <Image 
             src="/assets/home/golden-pothos-epipremnum-aureum-white-table-living-room-home-garden 1.png"
             alt="Decor"
             fill
             className="object-contain"
           />
       </div>
    </section>
    </ScrollMotion>
  );
};

export default MeetTheTrends;
