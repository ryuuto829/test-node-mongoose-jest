// Provide url as a "to" parameter and pass "locale" and "isDefault" from the
// page context. It'll transform url for the corresponding language
// like: "/" => "/ja/" or "/page-2/" => "/ja/page-2/"
export const localizedLink = (to, locale, isDefault) =>
  isDefault ? to : `/${locale}${to}`;
