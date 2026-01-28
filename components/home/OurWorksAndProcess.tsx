'use client';

import ScrollMotion from '@/components/motion/ScrollMotion';
import Button from '@/components/shared/Button';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const OurWorksAndProcess = () => {
  const { locale } = useLocale();
  const t = translations[locale].WorksProcess;
  const commonT = translations[locale].Common;

  const projects = [
    { id: 1, image: "/assets/home/Rectangle 3134.png" },
    { id: 2, image: "/assets/home/Rectangle 3135.png" },
    { id: 3, image: "/assets/home/Rectangle 3136.png" },
  ];

  return (
    <ScrollMotion animation="fade-up">
    <section className="w-full bg-white py-8 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 space-y-24">
        
        {/* --- Part 1: Our Works --- */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-12">
            <div className="max-w-2xl md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-3">
                {t.titlePrefix} <span className="text-primary">{t.titleSuffix}</span>
              </h2>
              <p className="text-gray-500 text-lg">
                {translations[locale].Insights.subtitle}
              </p>
            </div>
            <Button href="/portfolio" className="!px-8 !py-3 bg-primary hover:bg-primary/90 shadow-lg !text-white ">
              {translations[locale].Insights.explore}
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all">
                  <Image
                    src={project.image}
                    alt={t.projectTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
                   <div className="flex items-center gap-1">
                     <MapPin className="w-3.5 h-3.5" />
                     {t.location}
                   </div>
                   <div className="flex items-center gap-1">
                     <Calendar className="w-3.5 h-3.5" />
                     {t.date}
                   </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-tight">
                  {t.projectTitle}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* --- Part 2: Process Flow --- */}
        <div className="relative py-12">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-y-24 items-center">
              
              {/* Step 1: Top Left */}
              <div className="lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-end">
                <ProcessCard number="1" title={t.steps.step1.title} desc={t.steps.step1.desc} align="right" />
              </div>

              {/* Step 2: Bottom Left */}
              <div className="lg:col-start-1 lg:row-start-2 flex justify-center lg:justify-end">
                 <ProcessCard number="2" title={t.steps.step2.title} desc={t.steps.step2.desc} align="right" />
              </div>

              {/* Central Hub (Center) - Appears between 2 and 3 on Mobile */}
              <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center items-center z-10 py-8 lg:py-0">
                 <div className="relative w-64 h-48 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center justify-center border border-gray-100">
                    <div className="w-20 h-20 relative mb-2">
                       <Image src="/assets/site-logo/site-logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <p className="font-serif font-bold text-lg text-center">
                      {t.processTitlePrefix} <span className="text-primary block md:inline">{t.processTitleSuffix}</span>
                    </p>
                    
                    {/* Connecting Dotted Lines (Desktop Only) */}
                    <div className="hidden lg:block absolute right-full top-1/2 w-32 border-t-2 border-dotted border-gray-200 -z-10" />
                    <div className="hidden lg:block absolute left-full top-1/2 w-32 border-t-2 border-dotted border-gray-200 -z-10" />
                 </div>
              </div>

              {/* Step 3: Top Right */}
              <div className="lg:col-start-3 lg:row-start-1 flex justify-center lg:justify-start">
                 <ProcessCard number="3" title={t.steps.step3.title} desc={t.steps.step3.desc} align="left" />
              </div>

              {/* Step 4: Bottom Right */}
              <div className="lg:col-start-3 lg:row-start-2 flex justify-center lg:justify-start">
                 <ProcessCard number="4" title={t.steps.step4.title} desc={t.steps.step4.desc} align="left" />
              </div>

           </div>
        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

// Subcomponent for Process Card
const ProcessCard = ({ number, title, desc, align = 'left' }: { number: string, title: string, desc: string, align?: 'left'|'right' }) => (
  <div className={`
    relative bg-white rounded-2xl p-8 pt-10 border border-gray-100 shadow-sm hover:shadow-md transition-all max-w-sm mx-auto
    ${align === 'right' ? 'lg:text-right' : 'lg:text-left'}
    text-center
  `}>
    {/* Number Badge */}
    <div className={`
      absolute w-10 h-10 rounded-full bg-green-100 text-primary font-bold flex items-center justify-center text-lg
      
      /* Mobile Positioning: Centered on top edge */
      left-1/2 -translate-x-1/2 -top-5
      
      /* Desktop Positioning: Vertically centered, offset to side */
      lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:left-auto lg:right-auto
      ${align === 'right' ? 'lg:-right-5' : 'lg:-left-5'}
    `}>
      {number}
    </div>

    <h4 className="text-xl font-bold text-primary mb-3 mt-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default OurWorksAndProcess;
