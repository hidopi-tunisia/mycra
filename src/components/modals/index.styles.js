import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.WHITE,
  },
  containerIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
  containerContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonNegative: {
    borderRadius: 24,
    minWidth: 96,
  },
  buttonPositive: {
    borderRadius: 24,
    minWidth: 96,
  },
});
export default styles;
