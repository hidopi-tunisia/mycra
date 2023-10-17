import { useState } from 'react';
import { sendPasswordResetEmail, signIn } from '@domain/auth';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Layout,
  Input,
  Spinner,
  Text,
  Icon,
  Button,
} from '@ui-kitten/components';
import { M } from '@components';
import styles from './index.styles';
import { APP_VERSION } from '@constants';
import Colors from '@constants/colors';
import Modal from '@components/modals';
import BottomSheet from '@components/bottom-sheet';
import ResetPasswordForm from '@components/reset-password-form';
import { SvgXml } from 'react-native-svg';
import { Locales, i18n } from '@utils/translations';
import { s } from 'react-native-size-matters';
import { renderFlag } from '@utils/flags';
import { useEffect } from 'react';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [modalResetPasswordVisible, setModalResetPasswordVisible] =
    useState(false);
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState(null);
  const handleSubmit = () => {
    const fn = async () => {
      try {
        setError(null);
        setLoading(true);
        await signIn({ email, password });
      } catch (error) {
        setLoading(false);
        if (error && error.code === 'auth/invalid-email') {
          setError('Invalid email');
        } else if (error && error.code === 'auth/missing-password') {
          setError('Missing password');
        } else if (error && error.code === 'auth/wrong-password') {
          setError('Wrong password');
        } else {
          setError('Error happened');
        }
      }
    };
    fn();
  };
  const handlePressForgotPassword = () => {
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
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={require('@assets/logo.jpg')} />
        </View>
        <M v3 />
        <Text style={styles.textTitle} category="h1">
          {i18n.t('Sign In.title')}
        </Text>
        <Text style={styles.textSubtitle} category="h2">
          {i18n.t('Sign In.subtitle')}
        </Text>
        <M v7 />
      </View>
      <View style={styles.card}>
        <Text style={styles.labelInput} category="label">
          {i18n.t('Sign In.email')}
        </Text>
        <M v1 />
        <Input
          style={styles.input}
          placeholder="john.doe@company.com"
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <M v3 />
        <View style={styles.containerLabel}>
          <Text style={styles.labelInput} category="label">
            {i18n.t('Sign In.password')}
          </Text>
          <TouchableOpacity onPress={() => setModalHelpVisible(true)}>
            <Icon
              fill={Colors.GRAY_PRIMARY}
              name="question-mark-circle-outline"
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
        <M v1 />
        <Input
          style={styles.input}
          placeholder="•••••••••••"
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
          secureTextEntry={!isPasswordVisible}
          accessoryRight={
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <Icon name="eye-outline" fill={Colors.GRAY_PRIMARY} />
              ) : (
                <Icon name="eye-off-2-outline" fill={Colors.GRAY_PRIMARY} />
              )}
            </TouchableOpacity>
          }
        />
        <M v1 />
        <View style={styles.containerForgotPasswordText}>
          <TouchableOpacity onPress={handlePressForgotPassword}>
            <Text style={styles.textForgotPassword}>
              {i18n.t('Sign In.forgot password?')}
            </Text>
          </TouchableOpacity>
        </View>
        <M v3 />
        <Button
          style={styles.buttonSignIn}
          status="primary"
          disabled={!email || !password || loading}
          onPress={handleSubmit}>
          {loading ? (
            <Spinner status="basic" size="small" />
          ) : (
            i18n.t('Sign In.btn_sign in')
          )}
        </Button>
        <M v1 />
        {error && (
          <View style={styles.containerError}>
            <Text style={styles.textError}>{error}</Text>
          </View>
        )}
        <M v1 />
      </View>
      <M v4 />
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
              <Text style={styles.textInternationalization}>{Locales.EN}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => (i18n.locale = Locales.FR)}>
            <View style={styles.containerInternationalization}>
              <View style={styles.containerFlag}>{renderFlag('fr')}</View>
              <M h2 />
              <Text style={styles.textInternationalization}>{Locales.FR}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        title={i18n.t('Sign In.help.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('Sign In.help.description-1')}</Text>
        <M v1 />
        <Text>{i18n.t('Sign In.help.description-2')}</Text>
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
    </Layout>
  );
};

export default SignInScreen;
