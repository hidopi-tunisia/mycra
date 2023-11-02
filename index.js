/**
 * @format
 */

import { setBackgroundMessageHandler } from '@domain/messaging';
import { getItem, setItem } from '@domain/storage';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/app';

setBackgroundMessageHandler(async message => {
  const item = await getItem();
  let notifications;
  if (item === null || item === 'null') {
    notifications = {};
  } else {
    notifications = JSON.parse(item);
  }
  notifications[message.messageId] = { ...message, isUnseen: true };
  setItem(JSON.stringify(notifications));
});

AppRegistry.registerComponent(appName, () => App);
const p = obj => {
  console.info(JSON.stringify(obj, null, 2));
};
global.p = p;
