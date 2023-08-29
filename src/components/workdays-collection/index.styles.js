import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
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
