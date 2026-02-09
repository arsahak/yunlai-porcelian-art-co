"use client";

import ScrollMotion from "@/components/motion/ScrollMotion";
import { useLocale } from "@/lib/i18n";
import Translations from "@/messages/translations";
import Image from "next/image";

const WelcomeSection = () => {
  const { locale } = useLocale();
  const t = Translations[locale].AboutUs.Welcome;

  return (
    <ScrollMotion animation="fade-up">
      <section className="py-8 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Top Section: Image & Text */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12 md:mb-20 items-center">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/assets/home/1.jpeg"
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
                  {t.titlePart1}{" "}
                  <span className="text-primary">
                    {t.titlePart2} <br className="hidden lg:block" />{" "}
                    {t.titlePart3}
                  </span>
                </h2>

                <div className="space-y-6 text-gray-600 leading-relaxed md:text-lg font-light">
                  <p>{t.p1}</p>
                  <p>{t.p2}</p>
                  <p className="text-base text-gray-500 pt-2">{t.p3}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specialization Section */}
          <div className="mb-12 md:mb-20">
            <div className="bg-gradient-to-br from-primary/5 via-white to-primary/5 rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-primary/10">
              {/* Intro Text */}
              <div className="max-w-4xl mx-auto mb-10">
                <p className="text-gray-700 leading-relaxed md:text-lg font-light mb-6">
                  {t.specialization.intro}
                </p>
                <p className="text-gray-700 leading-relaxed md:text-lg font-light">
                  {t.specialization.quality}
                </p>
              </div>

              {/* Services Grid */}
              <div className="max-w-5xl mx-auto mb-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Object.values(t.specialization.services).map(
                    (service, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <p className="text-gray-700 leading-relaxed font-light">
                          {service}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Philosophy */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-gray-800 leading-relaxed md:text-lg font-light italic">
                  {t.specialization.philosophy}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Youtube Video */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="/assets/video.mp4"
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
    </ScrollMotion>
  );
};

export default WelcomeSection;
