import { M, SettingsItem } from '@components';
import BottomSheet from '@components/bottom-sheet';
import Modal from '@components/modals';
import ResetPasswordForm from '@components/reset-password-form';
import UpdateProfileForm from '@components/update-profile-form';
import {
  APP_VERSION,
  HELP_URL,
  PRIVACY_POLICY_URL,
  SUPPORT_EMAIL,
  TERMS_AND_CONDITIONS_URL,
} from '@constants';
import Colors from '@constants/colors';
import {
  currentUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from '@domain/auth';
import { setItem } from '@domain/storage';
import { useNavigation } from '@react-navigation/native';
import { Icon, Spinner, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { renderAvatar } from './index.helpers';
import styles from './index.styles';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResetPasswordVisible, setModalResetPasswordVisible] =
    useState(false);
  const [refResetPasswordBottomSheet, setRefResetPasswordBottomSheet] =
    useState(null);
  const [refUpdateProfileBottomSheet, setRefUpdateProfileBottomSheet] =
    useState(null);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [errorUpdateProfile, setErrorUpdateProfile] = useState(null);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        setError(null);
        const u = await currentUser();
        setUser(u);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error happened');
        console.info(error);
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
    try {
      setItem('null');
      setModalVisible(false);
      signOut();
    } catch (error) {
      console.info(error);
    }
  };
  const handlePressNegative = () => {
    setModalVisible(false);
  };
  const handleResetPassword = () => {
    setErrorResetPassword(null);
    refResetPasswordBottomSheet.open();
  };
  const handlePressUpdateProfile = () => {
    refUpdateProfileBottomSheet.open();
  };
  const handlePressCloseResetPassword = () => {
    refResetPasswordBottomSheet.close();
  };
  const handlePressCloseUpdateProfile = () => {
    refUpdateProfileBottomSheet.close();
  };
  const handleRefResetPasswordBottomSheet = ref => {
    setRefResetPasswordBottomSheet(ref);
  };
  const handleRefUpdateProfileBottomSheet = ref => {
    setRefUpdateProfileBottomSheet(ref);
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
        console.info(error);
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
  const handleSubmitUpdateProfile = ({ fullName, position }) => {
    const fn = async () => {
      try {
        setLoadingUpdateProfile(true);
        const displayName = `${fullName}!${position}`;
        await updateProfile({ displayName });
        setLoadingUpdateProfile(false);
        refUpdateProfileBottomSheet.close();
        onAuthStateChanged(u => {
          setUser(u);
        });
      } catch (error) {
        setLoadingUpdateProfile(false);
        setErrorUpdateProfile(error);
        console.info(error);
      }
    };
    fn();
  };
  return (
    <View style={styles.root}>
      <View style={styles.containerTop}>
        {!loading && user && (
          <>
            {renderAvatar(user)}
            <M v1 />
            <View style={styles.containerInformation}>
              {user.displayName && (
                <View style={styles.containerTexts}>
                  <Text style={styles.textName}>
                    {user.displayName.split('!')[0]}
                  </Text>
                  <Text style={styles.textPosition}>
                    {user.displayName.split('!')[1]}
                  </Text>
                </View>
              )}
              <M h1 />
              <TouchableOpacity
                style={styles.containerEdit}
                onPress={handlePressUpdateProfile}>
                <Icon
                  fill={Colors.WHITE}
                  name="edit-outline"
                  width={s(21)}
                  height={s(21)}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        {loading && !error && <Spinner status="basic" size="small" />}
        {!loading && (!user || error) && (
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
      <BottomSheet
        height={vs(300)}
        onCallbackRef={handleRefUpdateProfileBottomSheet}>
        <UpdateProfileForm
          loading={loadingUpdateProfile}
          error={errorUpdateProfile}
          user={user}
          onPressClose={handlePressCloseUpdateProfile}
          onSubmit={handleSubmitUpdateProfile}
        />
      </BottomSheet>
      <BottomSheet
        height={vs(240)}
        onCallbackRef={handleRefResetPasswordBottomSheet}>
        <ResetPasswordForm
          loading={loadingResetPassword}
          error={errorResetPassword}
          onPressClose={handlePressCloseUpdateProfile}
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
