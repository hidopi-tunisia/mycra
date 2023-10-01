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
import { sendPasswordResetEmail, signOut } from '@domain/auth';
import { upload } from '@domain/buckets';
import { getProfile, updateProfile } from '@domain/me';
import { setItem } from '@domain/storage';
import { useNavigation } from '@react-navigation/native';
import { Icon, Spinner, Text } from '@ui-kitten/components';
import { renderFlag } from '@utils/flags';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { renderAvatar } from './index.helpers';
import styles from './index.styles';
import { Locales, i18n } from '@utils/translations';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResetPasswordVisible, setModalResetPasswordVisible] =
    useState(false);
  const [
    modalSuccessPictureUploadedVisible,
    setModalSuccessPictureUploadedVisible,
  ] = useState(false);
  const [refResetPasswordBottomSheet, setRefResetPasswordBottomSheet] =
    useState(null);
  const [refUpdateProfileBottomSheet, setRefUpdateProfileBottomSheet] =
    useState(null);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [errorUpdateProfile, setErrorUpdateProfile] = useState(null);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState(null);
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await getProfile({ populate: '' });
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(i18n.t('Settings.errors.Error happened'));
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
      const link = i18n.t('Settings.mailto', {
        email: SUPPORT_EMAIL,
        version: APP_VERSION,
      });
      await Linking.openURL(link);
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
  const handlePressSuccessPictureUploadedPositive = () => {
    setModalSuccessPictureUploadedVisible(false);
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
          setErrorResetPassword(i18n.t('Settings.errors.Invalid Email'));
        } else if (error && error.code === 'auth/missing-password') {
          setErrorResetPassword(i18n.t('Settings.errors.Missing password'));
        } else if (error && error.code === 'auth/wrong-password') {
          setErrorResetPassword(i18n.t('Settings.errors.Wrong password'));
        } else if (error && error.code === 'auth/user-not-found') {
          setErrorResetPassword(i18n.t('Settings.errors.Incorrect email'));
        } else {
          setErrorResetPassword(i18n.t('Settings.errors.Error happened'));
        }
      }
    };
    fn();
  };
  const handleSubmitUpdateProfile = ({ firstName, lastName, position }) => {
    const fn = async () => {
      try {
        setLoadingUpdateProfile(true);
        const { data } = await updateProfile({ firstName, lastName, position });
        setLoadingUpdateProfile(false);
        refUpdateProfileBottomSheet.close();
        setProfile(data);
      } catch (error) {
        setLoadingUpdateProfile(false);
        setErrorUpdateProfile(error);
        console.info(error);
      }
    };
    fn();
  };
  const handleUpload = uri => {
    const onComplete = async profilePhoto => {
      setProgress(null);
      refUpdateProfileBottomSheet.close();
      setModalSuccessPictureUploadedVisible(true);
      const { data } = await updateProfile({ profilePhoto });
      setProfile(data);
    };
    const onProgress = ({ transferred, total }) => {
      setProgress(Math.round((transferred / total) * 100));
    };
    const onError = error => {
      setProgress(null);
      console.info(error);
    };
    upload({
      path: `avatars/${profile._id}`,
      uri,
      onError,
      onProgress,
      onComplete,
    });
  };
  return (
    <View style={styles.root}>
      <View style={styles.containerTop}>
        {!loading && profile && (
          <>
            {renderAvatar(profile)}
            <M v1 />
            <View style={styles.containerInformation}>
              <View style={styles.containerTexts}>
                <Text style={styles.textName}>
                  {profile.firstName} {profile.lastName}
                </Text>
                <Text style={styles.textPosition}>{profile.position}</Text>
              </View>
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
        {!loading && (!profile || error) && (
          <View style={styles.containerError}>
            {error && <Text style={styles.textError}>{error}</Text>}
          </View>
        )}
      </View>
      <View style={styles.middle}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.card}>
          <SettingsItem
            title={i18n.t('Settings.items.CRA History:title')}
            description={i18n.t('Settings.items.CRA History:description')}
            icon="clock-outline"
            onPress={handleCRAHistory}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Reset password:title')}
            description={i18n.t('Settings.items.Reset password:description')}
            icon="lock-outline"
            onPress={handleResetPassword}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Terms and conditions:title')}
            description={i18n.t(
              'Settings.items.Terms and conditions:description',
            )}
            icon="checkmark-circle-2-outline"
            onPress={handleTerms}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Privacy policy:title')}
            description={i18n.t('Settings.items.Privacy policy:description')}
            icon="eye-off-outline"
            onPress={handlePrivacy}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Help:title')}
            description={i18n.t('Settings.items.Help:description')}
            icon="question-mark-circle-outline"
            onPress={handleHelp}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Report an issue:title')}
            description={i18n.t('Settings.items.Report an issue:description')}
            icon="alert-triangle-outline"
            onPress={handleReport}
          />
          <SettingsItem
            title={i18n.t('Settings.items.Sign out:title')}
            description={i18n.t('Settings.items.Sign out:description')}
            icon="log-out-outline"
            onPress={handleSignOut}
          />
          <M v1 />
          <View style={styles.containerVersion}>
            <Text style={styles.textVersion}>
              {i18n.t('Sign In.version:')} {APP_VERSION}
            </Text>
            <M h3 />
            {i18n.locale === Locales.FR ? (
              <TouchableOpacity onPress={() => (i18n.locale = Locales.EN)}>
                <View style={styles.containerInternationalization}>
                  <View style={styles.containerFlag}>{renderFlag('en')}</View>
                  <M h2 />
                  <Text style={styles.textInternationalization}>
                    {Locales.EN}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => (i18n.locale = Locales.FR)}>
                <View style={styles.containerInternationalization}>
                  <View style={styles.containerFlag}>{renderFlag('fr')}</View>
                  <M h2 />
                  <Text style={styles.textInternationalization}>
                    {Locales.FR}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        <M v4 />
        </ScrollView>
      </View>
      <View style={styles.bottom} />
      <Modal
        title={i18n.t('Settings.modal.title')}
        type="confirm"
        visible={modalVisible}
        onPressNegative={handlePressNegative}
        onPressPositive={handlePressPositive}>
        <Text>{i18n.t('Settings.modal.description')}</Text>
      </Modal>
      <BottomSheet
        height={vs(420)}
        onCallbackRef={handleRefUpdateProfileBottomSheet}>
        <UpdateProfileForm
          loading={loadingUpdateProfile}
          error={errorUpdateProfile}
          profile={profile}
          progress={progress}
          onPressClose={handlePressCloseUpdateProfile}
          onUpload={handleUpload}
          onSubmit={handleSubmitUpdateProfile}
        />
      </BottomSheet>
      <BottomSheet
        height={vs(280)}
        onCallbackRef={handleRefResetPasswordBottomSheet}>
        <ResetPasswordForm
          loading={loadingResetPassword}
          error={errorResetPassword}
          onPressClose={handlePressCloseResetPassword}
          onSubmit={handleSubmitResetPassword}
        />
      </BottomSheet>
      <Modal
        title={i18n.t('Settings.modalResetPassword.title')}
        type="info"
        visible={modalResetPasswordVisible}
        onPressPositive={() => setModalResetPasswordVisible(false)}>
        <Text>{i18n.t('Settings.modalResetPassword.description')}</Text>
      </Modal>
      <Modal
        title={i18n.t('Settings.modalSuccessPictureUploaded.title')}
        type="success"
        visible={modalSuccessPictureUploadedVisible}
        onPressPositive={handlePressSuccessPictureUploadedPositive}>
        <Text>
          {i18n.t('Settings.modalSuccessPictureUploaded.description')}
        </Text>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
