"use client";

import Image from 'next/image';

const WelcomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Image & Text */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12 md:mb-20 items-center">
          
          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-lg">
              <Image
                src="/assets/about/aboutme.png"
                alt="Pottery Craftsmanship"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-[150%] h-[120%] bg-[#F3F9F4] -z-10 -translate-y-[40%] rounded-l-3xl hidden lg:block"></div>
            
            <div className="lg:pl-6">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                Welcome To <span className="text-primary">Yunlai <br className="hidden lg:block"/> Porcelain Art Co. Ltd.</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed md:text-lg font-light">
                <p>
                  Yunlai Porcelain Art Co. Ltd. is a professional porcelain and planter manufacturer with over 15 years of experience in producing and exporting high-quality ceramic planters to global markets.
                </p>
                <p>
                  From our beginnings as a traditional handcrafted porcelain workshop, we have steadily evolved to meet the refined demands of international customers, officially expanding into export operations in 2007.
                </p>
                <p className="text-base text-gray-500 pt-2">
                  Today, Yunlai operates three modern production facilities with a monthly capacity of up to 60 export containers. We proudly maintain long-term partnerships with clients across North America, Europe, Australia, and the Middle East, including markets such as the United States, Germany, Spain, Australia, and Qatar. Our continued growth is driven by a deep respect for craftsmanship, consistent quality control, and a commitment to building meaningful, long-lasting global relationships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Youtube Video */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/U64bLz4EWRI?si=L0JBnzsuyd4OHA_9&autoplay=1&mute=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;
