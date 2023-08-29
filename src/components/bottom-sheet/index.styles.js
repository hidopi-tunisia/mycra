import Colors from '@constants/colors';
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: `${Colors.BLACK}88`,
  },
  container: {
    alignSelf: 'center',
    width: width - 32,
    borderRadius: 16,
    marginBottom: 16,
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
});

export default styles;
