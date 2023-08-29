import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;
