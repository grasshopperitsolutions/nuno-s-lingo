import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLanguages = {
  'en-US': { name: 'English (US)', flag: '🇺🇸' },
  'en-GB': { name: 'English (UK)', flag: '🇬🇧' },
  'pt-PT': { name: 'Português (EU)', flag: '🇵🇹' },
  'pt-BR': { name: 'Português (BR)', flag: '🇧🇷' },
  'es-ES': { name: 'Español (España)', flag: '🇪🇸' },
  'es-CO': { name: 'Español (Colombia)', flag: '🇨🇴' },
  'es-MX': { name: 'Español (México)', flag: '🇲🇽' },
  'ca-ES': { name: 'Català', flag: '🇦🇩' },
  'de-DE': { name: 'Deutsch', flag: '🇩🇪' },
  'nl-NL': { name: 'Nederlands', flag: '🇳🇱' },
  'nl-BE': { name: 'Vlaams', flag: '🇧🇪' },
  'da-DK': { name: 'Dansk', flag: '🇩🇰' }
};

export const defaultLanguage = 'en-US';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: Object.keys(supportedLanguages),
    debug: false,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
      checkWhitelist: true
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;