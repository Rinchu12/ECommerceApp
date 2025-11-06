import i18n from './i18n';

export const LocalizedStrings: { [key: string]: string } = {
  get HOME() {
    return i18n.t('HOME');
  },
  get ADD_TO_CART() {
    return i18n.t('ADD_TO_CART');
  },
  get ADDED() {
    return i18n.t('ADDED');
  },
  get SELECT_LANGUAGE() {
    return i18n.t('SELECT_LANGUAGE');
  },
  get ENGLISH() {
    return i18n.t('ENGLISH');
  },
  get ARABIC() {
    return i18n.t('ARABIC');
  },
  get YOUR_CART() {
    return i18n.t('YOUR_CART');
  },
  get CLOSE() {
    return i18n.t('CLOSE');
  },
  get PRODUCT() {
    return i18n.t('PRODUCT');
  },
  get CART() {
    return i18n.t('CART');
  },
   get CART_EMPTY_MSG() {
    return i18n.t('CART_EMPTY_MSG');
  },
};
