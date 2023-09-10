import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    padding: "7@msr",
    flex: 1,
    justifyContent: 'space-around',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: "20@msr",
    fontWeight: '900',
  },
  input: {
    borderRadius: "24@msr",
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelInput: {
    fontSize: "14@msr",
    fontWeight: '600',
  },
  buttonSubmit: {
    height: "40@vs",
    borderRadius: "22@msr",
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: "8@msr",
    borderRadius: "16@msr",
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.RED_DARK_PRIMARY,
  },
});
export default styles;
