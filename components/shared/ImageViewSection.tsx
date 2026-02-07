"use client";

import ScrollMotion from "@/components/motion/ScrollMotion";
import Image from "next/image";

const ImageViewSection = () => {
  return (
    <ScrollMotion animation="fade-up">
      <section className="w-full bg-white py-4 md:py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] bg-white rounded-xl overflow-hidden">
            <Image
              src="/assets/home/imageview.png"
              alt="Plant Parents"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
};

export default ImageViewSection;
