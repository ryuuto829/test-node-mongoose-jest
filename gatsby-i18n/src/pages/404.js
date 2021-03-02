import React from 'react';

import SEO from '../components/seo';
import useTranslation from '../hooks/useTranslation';

const NotFoundPage = () => {
  const { NotFoundPageTitle, NotFoundPageContent } = useTranslation();

  return (
    <>
      <SEO title={NotFoundPageTitle} />

      <h1>{NotFoundPageContent}</h1>
    </>
  );
};

export default NotFoundPage;
