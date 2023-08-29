import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    width: 56,
    height: 56,
    position: 'absolute',
    bottom: 96,
    right: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.WHITE,
  },
});
export default styles;
