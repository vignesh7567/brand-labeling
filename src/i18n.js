import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import productEN from './locales/en/product.json';

import translationDE from './locales/de/translation.json';
import productDE from './locales/de/product.json';

const resources = {
  en: { translation: translationEN, product: productEN, },
  de: { translation: translationDE, product: productDE, },
};

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    defaultNS: 'translation',
    ns: ['translation', 'products'],
    interpolation: {
      escapeValue: false, // React already escapes
    }
  });

export default i18n;
