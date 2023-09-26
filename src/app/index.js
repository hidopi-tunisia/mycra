import { Topics } from '@constants';
import Colors from '@constants/colors';
import { currentUser, onAuthStateChanged } from '@domain/auth';
import {
  getInitialNotification,
  onMessage,
  subscribeToTopic
} from '@domain/messaging';
import { getItem, isIntroDone, onChange as onStorageChange, setIsIntroDone, setItem } from '@domain/storage';
import { mapping, light as theme } from '@eva-design/eva';
import { TabNavigator } from '@navigators';
import {
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef
} from '@react-navigation/native';
import { SignInScreen } from '@screens';
import ApplicationIntroScreen from '@screens/intro';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { i18n } from '@utils/translations';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

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
  const [isIntro, setIsIntro] = useState(false);
  useEffect(() => {
    const fn = async () => {
      try {
        const u = await currentUser();
        if (u !== null && u.uid) {
          await subscribeToTopic(`${Topics.CONSULTANTS}~${u.uid}`);
          subscribeToTopic(`${Topics.CONSULTANTS_ALL}`)
        }
        const isDone = await isIntroDone();
        if (isDone !== 'true') {
          setIsIntro(true);
        }
        SplashScreen.hide();
      } catch (error) {
        console.info(error);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    const unsubscribe = onMessage(async message => {
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
      const item = await getItem();
      let notifications;
      if (item === null || item === 'null') {
        notifications = {};
      } else {
        notifications = JSON.parse(item);
      }
      if (notifications && typeof notifications === 'object') {
        const arr = Object.keys(notifications)
          .map(n => notifications[n])
          .sort((a, b) => b.sentTime - a.sentTime);
        setNotifications(arr);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    onStorageChange(async () => {
      const item = await getItem();
      let notifications;
      if (item === null || item === 'null') {
        notifications = {};
      } else {
        notifications = JSON.parse(item);
      }
      if (notifications && typeof notifications === 'object') {
        const arr = Object.keys(notifications)
          .map(n => notifications[n])
          .sort((a, b) => b.sentTime - a.sentTime);
        setNotifications(arr);
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      getInitialNotification().then(message => {
        navigationRef.navigate('TabNotifications');
      });
    }
  }, []);
  const [_, setLocale] = useState('');
  useEffect(() => {
    const unsubscribe = i18n.onChange(({ locale }) => {
      setLocale(locale);
    });
    return unsubscribe;
  }, []);

  const handleDone = () => {
    setIsIntro(false);
    setIsIntroDone('true');
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.BLUE_DARK_PRIMARY}
      />
      {isIntro ? (
        <ApplicationIntroScreen onDone={handleDone} />
      ) : (
        <>
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
      )}
    </>
  );
};

export default App;
