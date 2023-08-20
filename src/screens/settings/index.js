import { View, Image, Linking, ScrollView } from 'react-native';
import { SettingsItem, M } from '../../components';
import { Divider, Text } from '@ui-kitten/components';
import {
  TERMS_AND_CONDITIONS_URL,
  PRIVACY_POLICY_URL,
  HELP_URL,
  SUPPORT_EMAIL,
  APP_VERSION,
} from '../../utils/constants';
import styles from './index.styles';

const SettingsScreen = ({ onSignOut }) => {
  const handleTerms = () => {
    const fn = async () => {
      await Linking.openURL(TERMS_AND_CONDITIONS_URL);
    };
    fn();
  };
  const handlePrivacy = () => {
    const fn = async () => {
      await Linking.openURL(PRIVACY_POLICY_URL);
    };
    fn();
  };
  const handleHelp = () => {
    const fn = async () => {
      await Linking.openURL(HELP_URL);
    };
    fn();
  };
  const handleReport = () => {
    const fn = async () => {
      await Linking.openURL(
        `mailto:${SUPPORT_EMAIL}?subject=Reporting issue in version (${APP_VERSION}) &body=Hello, I would like to report an issue in the application.`
      );
    };
    fn();
  };
  return (
    <View style={styles.root}>
      <View style={styles.containerTop}>
        <View style={styles.containerImage}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/40.jpg',
            }}
          />
        </View>
        <M v1 />
        <Text style={styles.textName}>John Doe</Text>
        <Text style={styles.textCompany}>ACME Group</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsItem
          title="Reset password"
          description="Start a reset password challange"
          icon="bell"
          onPress={handleTerms}
        />
        <SettingsItem
          title="Terms and conditions"
          description="View the terms and conditions on our website"
          icon="bell"
          onPress={handleTerms}
        />
        <Divider />
        <SettingsItem
          title="Privacy policy"
          description="View our privacy and policy on our website"
          icon="bell"
          onPress={handlePrivacy}
        />
        <Divider />
        <SettingsItem
          title="Help"
          description="View our help on our website"
          icon="bell"
          onPress={handleHelp}
        />
        <Divider />
        <SettingsItem
          title="Report issue"
          description="Send us an email about an issue in the application"
          icon="bell"
          onPress={handleReport}
        />
        <Divider />
        <SettingsItem
          title="Sign out"
          description="Sign out from this session and navigate back to the sign in screen"
          icon="bell"
          onPress={onSignOut}
        />
        <M v4 />
        <View style={styles.containerVersion}>
          <Text style={styles.textVersion}>Version {APP_VERSION}</Text>
        </View>
        <M v4 />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
