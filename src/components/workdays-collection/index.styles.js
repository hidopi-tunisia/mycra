import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: "8@msr",
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: "17@msr",
    fontWeight: '900',
  },
  subtitle: {
    fontSize: "12@msr",
    fontWeight: '700',
  },
  containerCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default styles;
