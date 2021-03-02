import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import { localizedLink } from '../utils/localizedLink';
import useTranslation from '../hooks/useTranslation';

const SecondPage = ({ pageContext }) => {
  const { locale, isDefault }  = pageContext;
  const {
    secodPageContent,
    goHomeLink,
    secondGreeting,
    secondPageTitle,
  } = useTranslation();

  return (
    <>
      <SEO title={secondPageTitle} />
      <h1>{secondGreeting}</h1>
      <p>{secodPageContent}</p>
      <Link to={localizedLink('/', locale, isDefault)}>{goHomeLink}</Link>
    </>
  );
};

SecondPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
};

export default SecondPage;
