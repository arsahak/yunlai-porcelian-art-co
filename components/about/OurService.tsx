"use client";

import Image from 'next/image';
import Link from 'next/link';

const OurService = () => {
  const services = [
    {
      title: "Pre-Production Sampling",
      description: "Our sampling service allows clients to refine every detail before production begins—from shape and proportion to texture and finish. Each prototype is crafted with precision by our skilled artisans and technical team, ensuring the final design perfectly matches your vision in both quality and aesthetics.",
      image: "/assets/about/service1.png",
      link: "/contact-us"
    },
    {
      title: "Private Label & Brand Customization",
      description: "Our custom logo service allows clients to personalize their products with printed or engraved logos, branded stickers, hang tags, or metal labels—all tailored to your specifications. Whether you want subtle branding for a minimalist collection or bold marks for retail presentation, our team ensures precise application and consistent quality across every piece.",
      image: "/assets/about/service1.png",
      link: "/contact-us"
    }
  ];

  // Duplicating array to match the 4-card layout
  const displayServices = [...services, ...services]; 

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/about/servicebg.png"
          alt="Service Background"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title text-gray-900">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {displayServices.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-[2rem] p-6 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/3 aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
              
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-title text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2">
                  <Link 
                    href={service.link}
                    className="inline-block text-primary font-medium hover:underline underline-offset-4 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurService;
