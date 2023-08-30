/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { setBackgroundMessageHandler } from '@domain/messaging';

setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
const p = obj => {
  console.log(JSON.stringify(obj, null, 2));
};
global.p = p;
