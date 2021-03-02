import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Image from '../components/image';
import SEO from '../components/seo';
import useTranslation from '../hooks/useTranslation';
import { localizedLink } from '../utils/localizedLink';

const IndexPage = ({ pageContext }) => {
  const { locale, isDefault }  = pageContext;
  const { greeting, mainPageContent, secondPageLink, indexPageTitle } = useTranslation();

  return (
    <>
      <SEO title={indexPageTitle} />

      <h1>{greeting}</h1>
      <p>{mainPageContent}</p>

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to={localizedLink('/page-2/', locale, isDefault )}>{secondPageLink}</Link> <br />
    </>
  );
};

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
};

export default IndexPage;
