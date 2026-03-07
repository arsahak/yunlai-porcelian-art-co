import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroSectionProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  className?: string;
  backgroundImage?: string;
}

const PageHeroSection = ({ 
  title,
  subtitle,
  breadcrumbs, 
  className,
  backgroundImage = "/assets/home/P82A9822.JPG"
}: PageHeroSectionProps) => {
  return (
    <section className={`relative w-full h-[320px] md:h-[420px] flex flex-col items-center justify-center overflow-hidden ${className || ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay 35% */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-5xl font-title font-bold text-white tracking-tight drop-shadow-lg leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm md:text-base text-white/80 font-sans max-w-4xl leading-relaxed">
            {subtitle}
          </p>
        )}

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-sans mt-1">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.href + index}>
                {index > 0 && <span className="text-white/50">/</span>}
                {isLast ? (
                  <span className="text-primary font-semibold cursor-default">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-white/80 hover:text-white transition-colors duration-200">
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
