'use client';

import { useLocale, type Locale } from '@/lib/i18n';

const MainNavbar = () => {
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <nav>
      <div>MainNavbar</div>
      <select value={locale} onChange={handleLanguageChange}>
        <option value="en">EN</option>
        <option value="cn">中文</option>
      </select>
    </nav>
  );
};

export default MainNavbar;
