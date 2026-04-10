import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, defaultLanguage } from '../i18n';

const LanguageRouter = ({ children }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const normalizedLang = lang ? lang.toLowerCase().replace('-', '_') : null;
    
    const matchedLang = Object.keys(supportedLanguages).find(
      l => l.toLowerCase() === normalizedLang
    );

    if (matchedLang && matchedLang !== i18n.language) {
      i18n.changeLanguage(matchedLang);
    }
  }, [lang, i18n]);

  const isValidLang = Object.keys(supportedLanguages).some(
    l => l.toLowerCase() === lang?.toLowerCase()
  );

  if (!lang || !isValidLang) {
    const browserLang = navigator.language || defaultLanguage;
    const detectedLang = Object.keys(supportedLanguages).find(
      l => l.toLowerCase() === browserLang.toLowerCase()
    ) || defaultLanguage;
    
    return <Navigate to={`/${detectedLang.toLowerCase()}`} replace />;
  }

  return children;
};

export default LanguageRouter;