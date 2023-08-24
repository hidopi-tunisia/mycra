import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, NotificationsScreen, SettingsScreen } from '@screens';
import CRAHistoryScreen from '@screens/settings/cra-history';
import { Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();
const Settings = createStackNavigator();

const HomeIcon = () => <Icon width={20} height={20} name="home" />;
const NotificationsIcon = () => <Icon width={20} height={20} name="bell" />;
const SettingsIcon = () => (
  <Icon width={20} height={20} name="settings-2-outline" />
);

const TabNavigators = ({ onSignOut }) => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="TabHome"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name="TabNotifications"
      component={NotificationsScreen}
      options={{
        tabBarLabel: 'Notificaitons',
        tabBarIcon: NotificationsIcon,
      }}
    />
    <Tab.Screen
      name="TabSettings"
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: SettingsIcon,
      }}>
      {props => (
        <Settings.Navigator>
          <Settings.Screen name="Settings" options={{ headerShown: false }}>
            {p => <SettingsScreen {...p} onSignOut={onSignOut} />}
          </Settings.Screen>
          <Settings.Screen name="CRA History" component={CRAHistoryScreen} />
        </Settings.Navigator>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default TabNavigators;
