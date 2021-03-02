// Provide url as a "to" parameter and pass "locale" and "isDefault" from the
// page context. It'll transform url for the corresponding language
// like: "/" => "/uk/" or "/about/" => "/uk/about/"
export const localizedLink = (to, locale, isDefault) =>
  isDefault ? to : `/${locale}${to}`;
