import { StyleSheet } from 'react-native';
import Colors from '@constants/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  containerTop: {
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
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
  bottom: {
    borderRadius: 24,
    padding: 8,
    justifyContent: 'center',
    marginTop: -32,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 24,
    padding: 8,
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
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24
  },
  textError: {
    color: Colors.WHITE,
  },
});
export default styles;
