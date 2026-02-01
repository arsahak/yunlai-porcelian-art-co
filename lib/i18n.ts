"use client";

import { createContext, useContext } from 'react';

type Locale = 'en' | 'cn';

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: 'en',
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export type { Locale };

