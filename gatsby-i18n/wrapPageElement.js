import React from 'react';
import Layout from './src/components/layout';
import { LocaleProvider } from './src/hooks/useLocale';

// Pass all props to the layout component.
// Layout component includes all providers that all pages need to have access to.
const wrapPageElement = ({ element, props }) => (
  <LocaleProvider>
    <Layout {...props}>
      {element}
    </Layout>
  </LocaleProvider>
);

export default wrapPageElement;
