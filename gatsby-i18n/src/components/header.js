import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, navigate } from '@reach/router';
import useTranslation from '../hooks/useTranslation';
import { localizedLink } from '../utils/localizedLink';

const Header = ({ locale, isDefault }) => {
  const { pathname } = useLocation();
  const { title } = useTranslation();

  const changeLangHandler = (e, lang) => {
    e.preventDefault();
    if (locale === lang) {return;}

    // Pathname is a string like in ex.: "/uk/" or "/uk/projects".
    // In case we want to switch to default language, then we'll omit first three
    // characters from the url ("/uk"), if not - add language to the path
    !isDefault ? navigate(pathname.slice(3)) : navigate(`/${lang}${pathname}`);
  };

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to={localizedLink('/', locale, isDefault)}
            style={{
              display: 'flex',
              fontSize: '1.2rem',
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {title}
          </Link>
        </h1>

        <div style={{ margin: 0 }}>

          <button
            style={{
              marginLeft: '1rem',
              fontSize: '1.2rem',
              color: `white`,
              textDecoration: `none`,
            }}
            onClick={e => changeLangHandler(e, 'en')}
          >
            English
          </button>

          <button
            style={{
              marginLeft: '1rem',
              fontSize: '1.2rem',
              color: `white`,
              textDecoration: `none`,
            }}
            onClick={e => changeLangHandler(e, 'ja')}
          >
            日本語
          </button>

        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  locale: PropTypes.string.isRequired,
  isDefault: PropTypes.bool.isRequired,
};

export default Header;
