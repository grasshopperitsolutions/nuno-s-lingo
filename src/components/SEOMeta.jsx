import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEOMeta = ({ title, description, path = '' }) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://nunoslavi.com';
  
  return (
    <Helmet>
      <html lang="en-US" />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}${path}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={`${baseUrl}${path}`} />
    </Helmet>
  );
};

export const SEOProvider = ({ children }) => (
  <HelmetProvider>
    {children}
  </HelmetProvider>
);

export default SEOMeta;