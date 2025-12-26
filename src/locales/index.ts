import { en, TranslationKeys } from './en';
import { fr } from './fr';

export type Language = 'en' | 'fr';

export const translations: Record<Language, TranslationKeys> = {
  en,
  fr,
};

// Helper function to get nested translation
export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
};

// Helper function for pluralization and interpolation
export const interpolate = (text: string, params: Record<string, string | number>): string => {
  let result = text;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

export { en, fr };
