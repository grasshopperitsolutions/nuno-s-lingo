import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, defaultLanguage } from '../i18n';

const SEOMeta = ({ title, description, path = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || defaultLanguage;
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://nunoslavi.com';
  
  return (
    <Helmet>
      <html lang={currentLang.toLowerCase()} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}/${currentLang.toLowerCase()}${path}`} />
      
      {/* Hreflang Tags (Google Required) */}
      {Object.keys(supportedLanguages).map(lang => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang.toLowerCase()} 
          href={`${baseUrl}/${lang.toLowerCase()}${path}`} 
        />
      ))}
      
      {/* Default fallback for undefined language */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${defaultLanguage.toLowerCase()}${path}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={currentLang.replace('-', '_')} />
      <meta property="og:url" content={`${baseUrl}/${currentLang.toLowerCase()}${path}`} />
      
      {Object.keys(supportedLanguages).map(lang => (
        <meta 
          key={`og-${lang}`}
          property="og:locale:alternate" 
          content={lang.replace('-', '_')} 
        />
      ))}
    </Helmet>
  );
};

export const SEOProvider = ({ children }) => (
  <HelmetProvider>
    {children}
  </HelmetProvider>
);

export default SEOMeta;