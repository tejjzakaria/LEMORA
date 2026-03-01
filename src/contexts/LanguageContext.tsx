import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, interpolate } from '@/locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('floriya-language');
    if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
    // Detect browser language
    const browserLang = (navigator.language || navigator.languages?.[0] || '').split('-')[0].toLowerCase();
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'en') return 'en';
    if (browserLang === 'ar') return 'ar';
    return 'ar'; // fallback
  });

  // Helper to check if language is RTL
  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('floriya-language', lang);
  };

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  // Translation function with interpolation support
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = getTranslation(language, key);
    return params ? interpolate(translation, params) : translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
