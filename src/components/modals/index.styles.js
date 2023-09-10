import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    backgroundColor: Colors.WHITE,
  },
  containerIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "50@msr",
    width: '100%',
  },
  containerContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: "16@msr",
    textAlign: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonNegative: {
    borderRadius: "22@msr",
    minWidth: "86@s",
  },
  buttonPositive: {
    borderRadius: "24@msr",
    minWidth: "86@s",
  },
});
export default styles;
