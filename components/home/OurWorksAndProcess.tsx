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
    <section className="w-full bg-white py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 space-y-24">
        
        {/* --- Part 1: Our Works --- */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-3">
                {t.titlePrefix} <span className="text-primary">{t.titleSuffix}</span>
              </h2>
              <p className="text-gray-500 text-lg">
                {translations[locale].Insights.subtitle}
              </p>
            </div>
            <Button href="/portfolio" className="!px-8 !py-3 bg-primary hover:bg-primary/90 shadow-lg">
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
          
          {/* Central Hub (Desktop) */}
           <div className="hidden lg:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
              <div className="relative w-64 h-48 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center justify-center border border-gray-100">
                 <div className="w-20 h-20 relative mb-2">
                    <Image src="/assets/site-logo/site-logo.png" alt="Logo" fill className="object-contain" />
                 </div>
                 <p className="font-serif font-bold text-lg">
                   {t.processTitlePrefix} <span className="text-primary">{t.processTitleSuffix}</span>
                 </p>
                 
                 {/* Connecting Dotted Lines (Pseudo-visuals using SVGs or borders) */}
                 {/* Left Lines */}
                 <div className="absolute right-full top-1/2 w-32 border-t-2 border-dotted border-gray-200 -z-10" />
                 <div className="absolute left-full top-1/2 w-32 border-t-2 border-dotted border-gray-200 -z-10" />
              </div>
           </div>

           {/* Responsive Grid for Steps */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-y-24 relative">
              
              {/* Step 1: Top Left */}
              <div className="lg:col-span-1 flex lg:justify-end">
                <ProcessCard number="1" title={t.steps.step1.title} desc={t.steps.step1.desc} align="right" />
              </div>
              <div className="hidden lg:block"></div> {/* Spacer for center */}
              {/* Step 3: Top Right */}
              <div className="lg:col-span-1 flex lg:justify-start">
                 <ProcessCard number="3" title={t.steps.step3.title} desc={t.steps.step3.desc} align="left" />
              </div>

               {/* Step 2: Bottom Left */}
              <div className="lg:col-span-1 flex lg:justify-end">
                 <ProcessCard number="2" title={t.steps.step2.title} desc={t.steps.step2.desc} align="right" />
              </div>
              <div className="hidden lg:block"></div> {/* Spacer for center */}
               {/* Step 4: Bottom Right */}
              <div className="lg:col-span-1 flex lg:justify-start">
                 <ProcessCard number="4" title={t.steps.step4.title} desc={t.steps.step4.desc} align="left" />
              </div>

           </div>

           {/* Mobile Central Header Repetition (since center hub is hidden) */}
           <div className="lg:hidden text-center mb-12">
              <h3 className="text-3xl font-serif font-bold">
                 {t.processTitlePrefix} <span className="text-primary">{t.processTitleSuffix}</span>
              </h3>
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
    relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all max-w-sm
    ${align === 'right' ? 'lg:text-right' : 'lg:text-left'}
    text-center lg:text-left
  `}>
    {/* Number Badge */}
    <div className={`
      absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-100 text-primary font-bold flex items-center justify-center text-lg
      ${align === 'right' ? 'lg:-right-14 lg:left-auto' : 'lg:-left-14'}
      left-1/2 -translate-x-1/2 lg:translate-x-0 -top-5 lg:top-1/2
    `}>
      {number}
    </div>

    <h4 className="text-xl font-bold text-primary mb-3 mt-4 lg:mt-0">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default OurWorksAndProcess;
