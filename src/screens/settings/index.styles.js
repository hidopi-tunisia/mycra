import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

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
    borderColor: 'white',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 48,
  },
  textName: {
    fontWeight: 700,
    color: 'white',
  },
  textCompany: {
    fontWeight: 400,
    color: 'white',
    fontSize: 12,
    margin: 4
  },
  containerVersion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textVersion: {
    color: '#666666',
    fontSize: 12
  },
});

export default styles;
