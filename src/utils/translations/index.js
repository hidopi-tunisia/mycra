import { I18n } from 'i18n-js';
import en from './en.json';
import fr from './fr.json';
import it from './it.json';

const i18n = new I18n({
  en,
  fr,
  it,
});
const t = i18n.t;
export { i18n, t };
