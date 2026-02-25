"use client";

import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import ScrollMotion from '../motion/ScrollMotion';

const GoogleMap = () => {
  const { locale } = useLocale();
  const t = translations[locale].ContactForm;

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13604.419023913217!2d119.83648185570034!3d31.283484700258498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b4925ca1e18e5d%3A0x31de6bf7ce8d9cd2!2sTong%20Li%20Zhong%20Lu%2C%20Yi%20Xing%20Shi%2C%20Wu%20Xi%20Shi%2C%20Jiang%20Su%20Sheng%2C%20China%2C%20214221!5e1!3m2!1sen!2sbd!4v1772040336896!5m2!1sen!2sbd";

  return (
    <ScrollMotion animation="fade-up">
      <section className="w-full h-[400px] md:h-[500px] bg-gray-100 relative">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.addressLabel}
          className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
        />
      </section>
    </ScrollMotion>
  );
};

export default GoogleMap;
