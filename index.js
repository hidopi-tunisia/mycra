/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { setBackgroundMessageHandler, getToken } from '@domain/messaging';
import { getItem, setItem } from '@domain/storage';
import messaging from '@react-native-firebase/messaging';

const checkToken = async () => {
  try {
    console.log('====================================');
    console.log('nice nice');
    console.log('====================================');
    const x = await getToken();
    if (x) {
      console.log(x);
      console.log('nice 2');
    }
  } catch (error) {
    console.log('====================================');
    console.log('nice 3');
    console.log(error);
    console.log('====================================');
  }
};

checkToken();
console.log();

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
