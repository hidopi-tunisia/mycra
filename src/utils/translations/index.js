import { NativeModules, Platform } from 'react-native';
import { I18n } from 'i18n-js';
import en from './en.json';
import fr from './fr.json';
import moment from 'moment';
import 'moment/locale/fr';
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

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
let defaultLocale = Locales.FR;
if (Object.values(Locales).includes(locale.substring(0, 2))) {
  defaultLocale = locale;
}
i18n.defaultLocale = defaultLocale;
const prepareInternationalization = async () => {
  try {
    const l = await getStoredLocale();
    moment.locale(l);
    if (l !== 'null' && l !== null) {
      i18n.locale = l;
    } else {
      i18n.locale = Locales.FR;
    }
    return i18n;
  } catch (error) {
    console.info(error);
  }
};

i18n.onChange(({ locale }) => {
  setStoredLocale(locale);
  moment.locale(locale);
});

prepareInternationalization().then(i => (i18n = i));

export { i18n };
