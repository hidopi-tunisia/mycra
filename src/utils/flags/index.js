import { Locales } from '@utils/translations';

const Flags = {
  fr: require('./fr').default,
  en: require('./en').default,
};

const renderFlag = (locale = Locales.FR) => {
  const flag = Flags[locale];
  return flag();
};

export { renderFlag };
