/* eslint-disable unicorn/prefer-export-from */
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend' // импорт бэкенда
import { initReactI18next } from 'react-i18next'

const supportedLanguage = ['en', 'vi'] // список поддерживаемых языков

i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      // Указываете путь к файлам JSON для каждой локали
      loadPath: '/locales/{{lng}}.json',
    },
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
      ],
      caches: ['localStorage', 'cookie'],
    },
    supportedLngs: supportedLanguage,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n
