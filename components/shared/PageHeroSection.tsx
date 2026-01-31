import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroSectionProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  className?: string; // For extra custom styling
  backgroundImage?: string; // Allow overriding the default image
}

const PageHeroSection = ({ 
  title, 
  breadcrumbs, 
  className,
  backgroundImage = "/assets/home/bgimage.png" 
}: PageHeroSectionProps) => {
  return (
    <section className={`relative w-full h-[300px] md:h-[350px] flex flex-col items-center justify-center bg-[#F8F9FA] overflow-hidden ${className || ''}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
           <Image
             src={backgroundImage}
             alt="Hero Background"
             fill
             className="object-cover opacity-80" 
             priority
           />
           {/* White overlay to ensure text readability matching the design which is very light/white-washed */}
           <div className="absolute inset-0" /> 
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-title text-foreground tracking-tight">
          {title}
        </h1>
        
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm md:text-base font-sans mt-1">
           {breadcrumbs.map((crumb, index) => {
             const isLast = index === breadcrumbs.length - 1;
             return (
               <React.Fragment key={crumb.href + index}>
                 {index > 0 && <span className="text-gray-400">/</span>}
                 
                 {isLast ? (
                   <span className="text-primary font-medium cursor-default">{crumb.label}</span>
                 ) : (
                   <Link href={crumb.href} className="text-gray-500 hover:text-primary transition-colors duration-200">
                     {crumb.label}
                   </Link>
                 )}
               </React.Fragment>
             );
           })}
        </nav>
      </div>
    </section>
  );
};

export default PageHeroSection;
