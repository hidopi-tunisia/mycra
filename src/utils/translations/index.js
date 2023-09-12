import { I18n } from 'i18n-js';
import en from './en.json';
import fr from './fr.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_NAME = 'locale';
export const Locales = {
  EN: 'en',
  FR: 'fr',
};
export const getStoredLocale = () => {
  return AsyncStorage.getItem(STORAGE_NAME);
};

export const setStoredLocale = l => {
  return AsyncStorage.setItem(STORAGE_NAME, l);
};

let i18n = new I18n({
  en,
  fr,
});

i18n.defaultLocale = Locales.FR;
const prepareInternationalization = async () => {
  const l = await getStoredLocale();
  if (l) {
    i18n.locale = l;
  } else {
    i18n.locale = Locales.FR;
  }
  return i18n;
};

prepareInternationalization().then(i => (i18n = i));

export { i18n };
