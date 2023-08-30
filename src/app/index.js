import { useState, useEffect } from 'react';
import { onAuthStateChanged } from '@domain/auth';
import { TabNavigator } from '@navigators';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { SignInScreen } from '@screens';
import { StatusBar, Alert } from 'react-native';
import Colors from '@constants/colors';
import { getToken, onMessage, subscribeToTopic } from '@domain/messaging';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
        const w = subscribeToTopic('basketball');
        console.log('Subscribed to topic!')
      } catch (error) {}
    };
    fn();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.BLUE_DARK_PRIMARY}
      />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer theme={AppTheme}>
          {user ? <TabNavigator /> : <SignInScreen />}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
