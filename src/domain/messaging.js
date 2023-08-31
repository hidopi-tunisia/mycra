import messaging from '@react-native-firebase/messaging';

const onMessage = callback => {
  return messaging().onMessage(callback);
};

const subscribeToTopic = topic => {
  return messaging().subscribeToTopic(topic);
};

const unsubscribeFromTopic = topic => {
  return messaging().unsubscribeFromTopic(topic);
};

const getToken = () => {
  return messaging().getToken();
};

const setBackgroundMessageHandler = callback => {
  messaging().setBackgroundMessageHandler(callback);
};

const onNotificationOpenedApp = () => {
  return messaging().getInitialNotification();
};

const getInitialNotification = () => {
  return messaging().getInitialNotification();
};

export {
  onMessage,
  subscribeToTopic,
  getToken,
  setBackgroundMessageHandler,
  unsubscribeFromTopic,
  onNotificationOpenedApp,
  getInitialNotification,
};
