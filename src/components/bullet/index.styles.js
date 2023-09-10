import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.GRAY_PRIMARY,
    alignSelf: 'flex-start',
    borderRadius: "22@msr",
    padding: "3@msr",
    paddingHorizontal: "15@msr",
    margin: "2@msr",
  },
  text: {
    color: Colors.WHITE,
  },
});
export default styles;
