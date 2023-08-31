/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { setBackgroundMessageHandler } from '@domain/messaging';
import { getItem, setItem } from '@domain/storage';

setBackgroundMessageHandler(async message => {
  const item = await getItem();
  const notifications = JSON.parse(item);
  notifications[message.messageId] = { ...message, isUnseen: true };
  setItem(JSON.stringify(notifications));
});

AppRegistry.registerComponent(appName, () => App);
const p = obj => {
  console.info(JSON.stringify(obj, null, 2));
};
global.p = p;
