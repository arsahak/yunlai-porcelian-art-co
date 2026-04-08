"use client";

import ScrollMotion from "@/components/motion/ScrollMotion";
import Button from "@/components/shared/Button";
import { useLocale } from "@/lib/i18n";
import translations from "@/messages/translations";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const serviceImages: Record<string, string> = {
  "sampling": "/assets/home/service1.png",
  "oem-customization": "/assets/home/1.2.jpg",
  "packaging": "/assets/home/1.3.jpg",
  "export": "/assets/home/1.jpg",
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLocale();
  const t = translations[locale];
  const [isLoading, setIsLoading] = useState(true);
  
  const serviceDetails = t.ServiceDetails as Record<
    string,
    {
      title: string;
      intro: string;
      features: string[];
      note: string;
      trustLine: string;
    }
  >;

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  // Check if service exists
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!serviceDetails[slug]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Service not found</p>
          <Button href="/" className="!bg-primary !text-white">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  const service = serviceDetails[slug];
  const imageSrc = serviceImages[slug] || "/assets/home/service1.png";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ScrollMotion animation="fade-up">
        <section className="relative bg-gradient-to-br from-primary/10 via-white to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide">
                {service.trustLine}
              </p>
            </div>
          </div>
        </section>
      </ScrollMotion>

      {/* Main Content */}
      <ScrollMotion animation="fade-up">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Image & Introduction */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Introduction */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                    {locale === "en" ? "Overview" : "概述"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {service.intro}
                  </p>
                  {service.note && (
                    <p className="text-gray-500 italic text-sm border-l-4 border-primary pl-4">
                      {service.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
                  {locale === "en" ? "Key Features" : "主要特点"}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 md:p-12 text-white">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                    {locale === "en"
                      ? "Ready to Start Your Order?"
                      : "准备开始您的订单？"}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {locale === "en"
                      ? "Contact us today for bulk pricing, custom quotes, and shipping details."
                      : "立即联系我们获取批发价格、定制报价和运输详情。"}
                  </p>
                  <Button
                    href="/contact-us"
                    className="!bg-white !text-primary hover:!bg-gray-100 !px-8 !py-3 !text-lg"
                  >
                    {t.Common.contactUs}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollMotion>
    </div>
  );
}
