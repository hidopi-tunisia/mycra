import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_PRIMARY,
    alignSelf: 'flex-start',
    borderRadius: 24,
    padding: 4,
    paddingHorizontal: 16,
    margin: 2
  },
  text: {
    color: Colors.WHITE,
  },
});
export default styles;
