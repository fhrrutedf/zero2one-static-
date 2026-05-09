'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  toggleLang: () => {},
  t: (key) => translations.ar[key],
  isRTL: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  // Read stored language on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Language | null;
      if (stored === 'en' || stored === 'ar') {
        setLang(stored);
      }
    } catch {}
    setMounted(true);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('lang', next); } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key],
    [lang]
  );

  useEffect(() => {
    if (!mounted) return;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Add brief transition class for smoother visual switch
    document.documentElement.classList.add('dir-changing');
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    // Update body classes for direction-aware styling
    document.body.classList.remove('dir-rtl', 'dir-ltr');
    document.body.classList.add(dir === 'rtl' ? 'dir-rtl' : 'dir-ltr');
    // Remove transition class after a short delay
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('dir-changing');
    }, 200);
    return () => clearTimeout(timer);
  }, [lang, mounted]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
