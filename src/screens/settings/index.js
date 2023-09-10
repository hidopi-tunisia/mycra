import { useNavigation } from '@react-navigation/native';
import { View, Image, Linking, ScrollView } from 'react-native';
import { SettingsItem, M } from '@components';
import { Text, Spinner } from '@ui-kitten/components';
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
import { sendPasswordResetEmail, signOut } from '@domain/auth';
import Modal from '@components/modals';
import BottomSheet from '@components/bottom-sheet';
import ResetPasswordForm from '@components/reset-password-form';
import { setItem } from '@domain/storage';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResetPasswordVisible, setModalResetPasswordVisible] =
    useState(false);
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await getProfile();
        setProfile(data.consultant);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
  const handleSignOut = () => {
    setModalVisible(true);
  };
  const handlePressPositive = () => {
    setModalVisible(false);
    setItem('null');
    try {
      signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handlePressNegative = () => {
    setModalVisible(false);
  };
  const handleResetPassword = () => {
    setErrorResetPassword(null);
    refBottomSheet.open();
  };
  const handlePressCloseResetPassword = () => {
    refBottomSheet.close();
  };
  const handleRefBottomSheet = ref => {
    setRefBottomSheet(ref);
  };
  const handleSubmitResetPassword = email => {
    const fn = async () => {
      try {
        setLoadingResetPassword(true);
        setErrorResetPassword(null);
        await sendPasswordResetEmail(email);
        handlePressCloseResetPassword();
        setModalResetPasswordVisible(true);
        setLoadingResetPassword(false);
      } catch (error) {
        console.log(error);
        setLoadingResetPassword(false);
        if (error && error.code === 'auth/invalid-email') {
          setErrorResetPassword('Invalid email');
        } else if (error && error.code === 'auth/missing-password') {
          setErrorResetPassword('Missing password');
        } else if (error && error.code === 'auth/wrong-password') {
          setErrorResetPassword('Wrong password');
        } else if (error && error.code === 'auth/user-not-found') {
          setErrorResetPassword('Incorrect email');
        } else {
          setErrorResetPassword('Error happened');
        }
      }
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
      <View style={styles.bottom}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.card}>
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
            onPress={handleResetPassword}
          />
          <SettingsItem
            title="Terms and conditions"
            description="View the terms and conditions on our website"
            icon="checkmark-circle-2-outline"
            onPress={handleTerms}
          />
          <SettingsItem
            title="Privacy policy"
            description="View our privacy and policy on our website"
            icon="eye-off-outline"
            onPress={handlePrivacy}
          />
          <SettingsItem
            title="Help"
            description="View our help on our website"
            icon="question-mark-circle-outline"
            onPress={handleHelp}
          />
          <SettingsItem
            title="Report an issue"
            description="Send us an email about an issue in the application"
            icon="alert-triangle-outline"
            onPress={handleReport}
          />
          <SettingsItem
            title="Sign out"
            description="Sign out and navigate back to the sign in screen"
            icon="log-out-outline"
            onPress={handleSignOut}
          />
          <M v4 />
          <View style={styles.containerVersion}>
            <Text style={styles.textVersion}>Version {APP_VERSION}</Text>
          </View>
        </ScrollView>
      </View>
      <M v4 />
      <Modal
        title="Sign out?"
        type="confirm"
        visible={modalVisible}
        onPressNegative={handlePressNegative}
        onPressPositive={handlePressPositive}>
        <Text>Are you sure to sign out?</Text>
      </Modal>
      <BottomSheet height={300} onCallbackRef={handleRefBottomSheet}>
        <ResetPasswordForm
          loading={loadingResetPassword}
          error={errorResetPassword}
          onPressClose={handlePressCloseResetPassword}
          onSubmit={handleSubmitResetPassword}
        />
      </BottomSheet>
      <Modal
        title="Email sent"
        type="info"
        visible={modalResetPasswordVisible}
        onPressPositive={() => setModalResetPasswordVisible(false)}>
        <Text>Please check your email to reset your password.</Text>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
