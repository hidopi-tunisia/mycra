import { useState, useEffect } from 'react';
import { currentUser, onAuthStateChanged } from '@domain/auth';
import { TabNavigator } from '@navigators';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { SignInScreen } from '@screens';
import { StatusBar } from 'react-native';
import Colors from '@constants/colors';
import {
  getInitialNotification,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  subscribeToTopic,
} from '@domain/messaging';
import { getItem, onChange as onStorageChange, setItem } from '@domain/storage';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
const navigationRef = createNavigationContainerRef();

const App = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const unsubscribe = onMessage(async message => {
      const item = await getItem();
      const notifications = JSON.parse(item);
      notifications[message.messageId] = { ...message, isUnseen: true };
      setItem(JSON.stringify(notifications));
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(u => {
      setUser(u);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        const { uid } = await currentUser();
        await subscribeToTopic(`consultant~${uid}`);
      } catch (error) {}
    };
    fn();
  }, []);
  useEffect(() => {
    const fn = async () => {
      const item = await getItem();
      const notifications = JSON.parse(item);
      const arr = Object.keys(notifications)
        .map(n => notifications[n])
        .sort((a, b) => b.sentTime - a.sentTime);
      setNotifications(arr);
    };
    fn();
  }, []);
  useEffect(() => {
    onStorageChange(async () => {
      const item = await getItem();
      const notifications = JSON.parse(item);
      const arr = Object.keys(notifications)
        .map(n => notifications[n])
        .sort((a, b) => b.sentTime - a.sentTime);
      setNotifications(arr);
    });
  }, []);
  useEffect(() => {
    getInitialNotification().then(message => {
      navigationRef.navigate('TabNotifications');
    });
  }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.BLUE_DARK_PRIMARY}
      />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer theme={AppTheme} ref={navigationRef}>
          {user ? (
            <TabNavigator notifications={notifications} />
          ) : (
            <SignInScreen />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
