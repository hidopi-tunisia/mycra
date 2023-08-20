import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.primary,
    justifyContent: 'center',
    padding: 8,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 900,
    color: 'white',
  },
  textSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    color: 'white',
  },
  labelEmail: {
    fontSize: 16,
    fontWeight: 600,
  },
  inputEmail: {},
  containerForgotPasswordText: {
    alignItems: 'flex-end',
  },
  textForgotPassword: {
    color: '#757575',
    fontSize: 14,
  },
  buttonSignIn:{
    height: 48,
    borderRadius: 24
  },
  containerError: {
    backgroundColor: '#D32F2F11',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#D32F2F',
  },
});

export default styles;
