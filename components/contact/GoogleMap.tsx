"use client";

import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import ScrollMotion from '../motion/ScrollMotion';


const GoogleMap = () => {
  const { locale } = useLocale();
  const t = translations[locale].ContactForm;

  // Address: 8/42 Dinh Bo Linh, Ward 14, Binh Thanh District, Ho Chi Minh city
  // using query q=8%2F42+Dinh+Bo+Linh%2C+Ward+14%2C+Binh+Thanh+District%2C+Ho+Chi+Minh+city
  const mapSrc = "https://maps.google.com/maps?q=8%2F42+Dinh+Bo+Linh%2C+Ward+14%2C+Binh+Thanh+District%2C+Ho+Chi+Minh+city&t=&z=15&ie=UTF8&iwloc=&output=embed";

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
