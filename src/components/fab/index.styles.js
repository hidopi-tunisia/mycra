import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    borderRadius: "32@msr",
    width: "48@s",
    height: "48@s",
    position: 'absolute',
    bottom: "80@vs",
    right: "40@s",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.WHITE,
  },
});
export default styles;
