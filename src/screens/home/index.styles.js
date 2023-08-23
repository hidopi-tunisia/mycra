import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
  },
  containerButtons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonSmall: {
    padding: 8,
  },
  textButtonSmall: {
    color: '#333333',
  },
  buttonSubmit: {
    borderRadius: 24,
  },
  textSelectedDays: {
    padding: 8,
    color: '#666666',
    fontSize: 12
  },
});

export default styles;
