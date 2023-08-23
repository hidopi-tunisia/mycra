import { useState } from 'react';
import { Text } from 'react-native';
import { TabNavigator } from '@navigators';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { SignInScreen } from '@screens';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const [user, setUser] = useState('null');
  const handleSignIn = email => {
    setUser(email);
  };
  const handleSignOut = () => {
    setUser(null);
  };
  return (
    <><Text>ddd</Text>
    </>
  );
};

export default App;
