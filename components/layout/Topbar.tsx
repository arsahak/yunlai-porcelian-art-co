'use client';

import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';

const Topbar = () => {
  const { locale } = useLocale();
  const t = translations[locale].Common;

  return (
    <div className="bg-secondary text-white py-2 text-xs md:text-sm font-medium tracking-wide">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <p>{t.freeShipping}</p>
        <p className="hidden md:block flex-1 text-center opacity-90">{t.flashSale}</p>
        <p className="md:hidden opacity-90">{t.flashSale}</p>
      </div>
    </div>
  );
};

export default Topbar;
