import Colors from '@utils/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
  },
  containerButtons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonSmall: {
    padding: 8,
  },
  textButtonSmall: {
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: 14,
  },
  buttonSubmit: {
    borderRadius: 24,
  },
  textSelectedDays: {
    padding: 8,
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: 12,
  },
});

export default styles;
