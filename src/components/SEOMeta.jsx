import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from "prop-types";

const SEOMeta = ({ title, description, path = '' }) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://nunoslavi.com';

  return (
    <Helmet>
      <html lang="en-US" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${baseUrl}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={`${baseUrl}${path}`} />
    </Helmet>
  );
};

SEOMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export const SEOProvider = ({ children }) => (
  <HelmetProvider>
    {children}
  </HelmetProvider>
);

SEOProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SEOMeta;