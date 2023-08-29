import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  containerCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default styles;
