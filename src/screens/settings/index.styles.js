import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import Colors from '@constants/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerTop: {
    height: 240,
    backgroundColor: DefaultTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: Colors.WHITE,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 48,
  },
  status: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.GRAY_SECONDARY_TEXT,
    right: 0,
  },
  textName: {
    fontWeight: '700',
    color: Colors.WHITE,
  },
  textCompany: {
    fontWeight: '400',
    color: Colors.WHITE,
    fontSize: 12,
    margin: 4,
  },
  containerVersion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textVersion: {
    color: Colors.GRAY_PRIMARY,
    fontSize: 12,
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}66`,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.WHITE,
  },
});
export default styles;
