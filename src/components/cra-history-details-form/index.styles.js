import Colors from '@constants/colors';
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
    fontSize: "15@msr",
    fontWeight: '900',
  },
  input: {
    textAlignVertical: 'top',
    padding: "12@msr",
    borderRadius: "24@msr",
    borderWidth: 1,
    borderColor: Colors.GRAY_PRIMARY,
    height: "104@vs",
    backgroundColor: Colors.WHITE,
    color: Colors.GRAY_PRIMARY_TEXT,
  },
  buttonSubmit: {
    height: "38@vs",
    borderRadius: "20@msr",
  },
});
export default styles;
