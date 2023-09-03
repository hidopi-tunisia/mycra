import Colors from '@constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, NotificationsScreen, SettingsScreen } from '@screens';
import CRAHistoryScreen from '@screens/settings/cra-history';
import { Icon } from '@ui-kitten/components';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './index.styles';

const Tab = createBottomTabNavigator();
const Settings = createStackNavigator();

const HomeIcon = props => (
  <Icon width={20} height={20} name="home" {...props} />
);
const NotificationsIcon = props => (
  <Icon width={20} height={20} name="bell" {...props} />
);
const SettingsIcon = props => (
  <Icon width={20} height={20} name="settings-2-outline" {...props} />
);
const MyTabBar = ({
  state,
  descriptors,
  navigation,
  notificationsCount = 0,
}) => {
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.containerItemButton}>
            <View style={styles.containerItem}>
              {route.name === 'TabHome' && (
                <HomeIcon
                  fill={
                    isFocused ? Colors.BLUE_PRIMARY : Colors.GRAY_DARK_PRIMARY
                  }
                />
              )}
              {route.name === 'TabNotifications' && (
                <>
                  {notificationsCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.textBadge}>{notificationsCount}</Text>
                    </View>
                  )}
                  <NotificationsIcon
                    fill={
                      isFocused ? Colors.BLUE_PRIMARY : Colors.GRAY_DARK_PRIMARY
                    }
                  />
                </>
              )}
              {route.name === 'TabSettings' && (
                <SettingsIcon
                  fill={
                    isFocused ? Colors.BLUE_PRIMARY : Colors.GRAY_DARK_PRIMARY
                  }
                />
              )}
              <Text
                style={{
                  color: isFocused
                    ? Colors.BLUE_PRIMARY
                    : Colors.GRAY_PRIMARY_TEXT,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigators = ({ initialRoute = 'TabHome', notifications }) => (
  <Tab.Navigator
    initialRouteName={initialRoute}
    tabBar={props => (
      <MyTabBar {...props} notificationsCount={notifications.length} />
    )}
    screenOptions={{ headerShown: false }}>
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
      options={{
        tabBarLabel: 'Notifications',
        tabBarIcon: NotificationsIcon,
      }}
      children={props => (
        <NotificationsScreen {...props} notifications={notifications} />
      )}
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
            {p => <SettingsScreen {...p} />}
          </Settings.Screen>
          <Settings.Screen
            name="CRA History"
            component={CRAHistoryScreen}
            options={{ headerShown: false }}
          />
        </Settings.Navigator>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default TabNavigators;
