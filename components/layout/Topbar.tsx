'use client';

import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';

const Topbar = () => {
  const { locale } = useLocale();
  const t = translations[locale].Common;

  return (
    <div className="bg-secondary text-white py-2 text-xs md:text-sm font-medium tracking-wide relative z-50">
      <div className="container mx-auto px-4 flex justify-center items-center text-center">
        <p className="opacity-90">{t.freeShipping} &nbsp;|&nbsp; {t.flashSale}</p>
      </div>
    </div>
  );
};

export default Topbar;
