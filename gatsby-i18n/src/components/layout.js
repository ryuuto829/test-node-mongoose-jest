/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './layout.css';
import Header from './header';
import { useLocale } from '../hooks/useLocale';

const Layout = ({ children, pageContext: { locale, isDefault } }) => {
  const { changeLocale } = useLocale();

  // Every time url changes we update our context store
  useEffect(() => {
    changeLocale(locale);
  }, [locale]);

  return (
    <>
      <Header
        locale={locale}
        isDefault={isDefault}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
};

export default Layout;
