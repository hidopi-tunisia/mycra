import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, NotificationsScreen, SettingsScreen } from '@screens';
import { Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();

const HomeIcon = () => <Icon width={20} height={20} name="home" />;
const NotificationsIcon = () => <Icon width={20} height={20} name="bell" />;
const SettingsIcon = () => (
  <Icon width={20} height={20} name="settings-2-outline" />
);

const TabNavigators = ({ onSignOut }) => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        tabBarLabel: 'Notificaitons',
        tabBarIcon: NotificationsIcon,
      }}
    />
    <Tab.Screen
      name="Settings"
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: SettingsIcon,
      }}>
      {props => <SettingsScreen {...props} onSignOut={onSignOut} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default TabNavigators;
