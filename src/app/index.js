import { useState } from 'react';
import { TabNavigator } from '@navigators';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { SignInScreen } from '@screens';
import { StatusBar } from 'react-native';
import Colors from '@constants/colors';

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
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.BLUE_DARK_PRIMARY} />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer theme={AppTheme}>
          {user ? (
            <TabNavigator onSignOut={handleSignOut} />
          ) : (
            <SignInScreen onSignIn={handleSignIn} />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
