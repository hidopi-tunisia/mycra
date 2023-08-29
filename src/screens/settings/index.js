import { useNavigation } from '@react-navigation/native';
import { View, Image, Linking, ScrollView } from 'react-native';
import { SettingsItem, M } from '@components';
import { Divider, Text, Spinner } from '@ui-kitten/components';
import {
  TERMS_AND_CONDITIONS_URL,
  PRIVACY_POLICY_URL,
  HELP_URL,
  SUPPORT_EMAIL,
  APP_VERSION,
} from '@constants';
import styles from './index.styles';
import { useEffect, useState } from 'react';
import { getProfile } from '@domain/profile';
import { getStatusBackground } from './index.helpers';

const SettingsScreen = ({ onSignOut }) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const { data } = await getProfile();
        setProfile(data.consultant);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error happened');
      }
    };
    fn();
  }, []);
  const handleCRAHistory = () => {
    navigation.navigate('CRA History');
  };
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
        `mailto:${SUPPORT_EMAIL}?subject=Reporting issue in version (${APP_VERSION}) &body=Hello, I would like to report an issue in the application.`,
      );
    };
    fn();
  };
  return (
    <View style={styles.root}>
      <View style={styles.containerTop}>
        {!loading && profile && (
          <>
            <View style={styles.containerImage}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/40.jpg',
                }}
              />
              <View
                style={{
                  ...styles.status,
                  backgroundColor: getStatusBackground(profile.statutCompte),
                }}
              />
            </View>
            <M v1 />
            <Text style={styles.textName}>
              {profile.prenom} {profile.nom}
            </Text>
            <Text style={styles.textCompany}>{profile.poste}</Text>
          </>
        )}
        {loading && !error && <Spinner status="basic" size="small" />}
        {!loading && (!profile || error) && (
          <View style={styles.containerError}>
            {error && <Text style={styles.textError}>{error}</Text>}
          </View>
        )}
      </View>
      <View style={{ borderRadius: 24, padding: 8, justifyContent: 'center' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'white', borderRadius: 24, padding: 8 }}>
          <SettingsItem
            title="CRA History"
            description="View your past CRAs"
            icon="clock-outline"
            onPress={handleCRAHistory}
          />
          <SettingsItem
            title="Reset password"
            description="Start a reset password challange"
            icon="lock-outline"
            onPress={handleTerms}
          />
          <SettingsItem
            title="Terms and conditions"
            description="View the terms and conditions on our website"
            icon="checkmark-circle-2-outline"
            onPress={handleTerms}
          />
          <Divider />
          <SettingsItem
            title="Privacy policy"
            description="View our privacy and policy on our website"
            icon="eye-off-outline"
            onPress={handlePrivacy}
          />
          <Divider />
          <SettingsItem
            title="Help"
            description="View our help on our website"
            icon="question-mark-circle-outline"
            onPress={handleHelp}
          />
          <Divider />
          <SettingsItem
            title="Report issue"
            description="Send us an email about an issue in the application"
            icon="alert-triangle-outline"
            onPress={handleReport}
          />
          <Divider />
          <SettingsItem
            title="Sign out"
            description="Sign out and navigate back to the sign in screen"
            icon="log-out-outline"
            onPress={onSignOut}
          />
          <M v4 />
          <View style={styles.containerVersion}>
            <Text style={styles.textVersion}>Version {APP_VERSION}</Text>
          </View>
        </ScrollView>
      </View>
      <M v4 />
    </View>
  );
};

export default SettingsScreen;
