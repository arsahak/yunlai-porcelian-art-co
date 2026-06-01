"use client";

import { useLocale } from "@/lib/i18n";
import translations from "@/messages/translations";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { locale } = useLocale();
  const t = translations[locale].Footer;

  return (
    <footer className="w-full bg-[#f8f9fa] pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Wholesale Quote CTA Banner */}
        <div className="w-full bg-primary rounded-3xl p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-xl relative overflow-hidden">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-3">
              {t.quoteTitle}
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-3">
              {t.quoteDescription}
            </p>
            <p className="text-white/80 text-sm font-medium">
              {t.quoteTrustLine}
            </p>
          </div>

          <Link
            href="/contact-us"
            className="bg-white hover:bg-gray-100 text-primary font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl uppercase tracking-wider"
          >
            {t.quoteButton}
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 min-[480px]:col-span-2 lg:col-span-4 space-y-6 text-center lg:text-left">
            <Link href="/" className="inline-block relative ">
              <Image
                src="/assets/site-logo/yixing-yunlai-black-logo.png"
                alt="Yunlai Porcelain"
                className="object-contain w-[200px] md:w-[300px] h-[70px] md:h-[100px]"
                unoptimized
                width={500}
                height={400}
              />
            </Link>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base lg:pr-4 mx-auto lg:mx-0 max-w-md lg:max-w-none">
              {t.description}
            </p>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 lg:col-start-6 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">
              {t.companyColumn}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.company.aboutFactory}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.company.productionProcess}
                </Link>
              </li>
              <li>
                <Link
                  href="/wholesale-services/sampling"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.company.ourServices}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.company.blogInsights}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">
              {t.productsColumn}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.products.small}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.products.medium}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.products.large}
                </Link>
              </li>
              <li>
                <Link
                  href="/wholesale-services/oem-customization"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.products.custom}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column (B2B Style) */}
          <div className="lg:col-span-3 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">
              {t.supportColumn}
            </h3>
            <ul className="space-y-4 mb-6">
              <li>
                <Link
                  href="/catalog"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.support.catalog}
                </Link>
              </li>
              <li>
                <Link
                  href="/wholesale-services/packaging"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.support.shipping}
                </Link>
              </li>
              <li>
                <Link
                  href="/wholesale-services/oem-customization"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.support.oem}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {t.support.contact}
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-500 flex flex-col items-center min-[480px]:items-start">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {t.contact.email}:
                  </p>
                  <a
                    href={`mailto:${t.contact.emailValue}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t.contact.emailValue}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {t.contact.mobile}:
                  </p>
                  <a
                    href={`tel:${t.contact.mobileValue}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t.contact.mobileValue}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    {t.contact.address}:
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    {t.contact.addressValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            {t.rights}
          </p>

          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              href="https://www.facebook.com/yunlaiceramicsfactory/"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:brightness-110"
            >
              <Facebook size={17} />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/yixing_yunlai_zisha/"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:brightness-110"
            >
              <Instagram size={17} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
