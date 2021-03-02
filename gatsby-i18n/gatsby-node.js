/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const locales = require('./i18n/locales');

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // For each page, we’re deleting it, than creating it again for each
  // language passing the locale to the page context
  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const isDefault = locales[lang].default || false;

      const localizedPath = isDefault
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
          isDefault,
        },
      });
    });

    resolve();
  });
};
