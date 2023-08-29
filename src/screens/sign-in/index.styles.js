import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import Colors from '@constants/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.primary,
    justifyContent: 'center',
    padding: 8,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.WHITE,
  },
  textSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  labelEmail: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputEmail: {},
  containerForgotPasswordText: {
    alignItems: 'flex-end',
  },
  textForgotPassword: {
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: 14,
  },
  buttonSignIn: {
    height: 48,
    borderRadius: 24,
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.RED_DARK_PRIMARY,
  },
});

export default styles;
