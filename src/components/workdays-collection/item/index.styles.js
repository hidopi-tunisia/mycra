import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.GRAY_PRIMARY,
    alignSelf: 'flex-start',
    borderRadius: "22@msr",
    padding: "3@msr",
    paddingHorizontal: "14@msr",
    margin: "3@msr",
    borderWidth: "2@msr",
    flexDirection: 'row',
  },
});
export default styles;
