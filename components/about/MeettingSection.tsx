"use client";

import Image from 'next/image';

const MeettingSection = () => {
  // Using the generated images to populate the grid
  const images = [
    {
      src: "/assets/home/meeting_showroom_1769840336493.png",
      alt: "Showroom Meeting",
      classname: "col-span-1 row-span-1" 
    },
    {
      src: "/assets/home/meeting_greenhouse_1769840364508.png",
      alt: "Greenhouse Visit",
      classname: "col-span-1 row-span-1"
    },
    {
      src: "/assets/home/meeting_factory_visit_1769840396890.png",
      alt: "Factory Tour",
      classname: "col-span-1 row-span-1"
    },
    {
      src: "/assets/home/meeting_greenhouse_1769840364508.png", // Reusing for demo pattern
      alt: "Client Interaction",
      classname: "col-span-1 row-span-1"
    },
    {
      src: "/assets/home/meeting_factory_visit_1769840396890.png", // Reusing for demo pattern
      alt: "Product Discussion",
      classname: "col-span-2 row-span-1" // Wide image at bottom
    },
    {
      src: "/assets/home/meeting_showroom_1769840336493.png", // Reusing for demo pattern
      alt: "Design Review",
      classname: "col-span-1 row-span-1"
    },
    {
      src: "/assets/home/meeting_greenhouse_1769840364508.png", // Reusing for demo pattern
      alt: "Quality Check",
      classname: "col-span-1 row-span-1"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title text-gray-900">
            Meeting with <span className="text-primary">customers</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 ${img.classname}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MeettingSection;
