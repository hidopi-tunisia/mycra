import messaging from '@react-native-firebase/messaging';

const onMessage = callback => {
  return messaging().onMessage(callback);
};

const subscribeToTopic = topic => {
  return messaging().subscribeToTopic(topic);
};

const getToken = () => {
  return messaging().getToken();
};

const setBackgroundMessageHandler = (callback) => {
    messaging().setBackgroundMessageHandler(callback)
}

export { onMessage, subscribeToTopic, getToken, setBackgroundMessageHandler };
