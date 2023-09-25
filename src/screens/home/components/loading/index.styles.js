import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    paddingBottom: '36@vs',
    backgroundColor: Colors.GRAY_PRIMARY,
  },
  top: {
    backgroundColor: Colors.GRAY_DARK_PRIMARY,
    height: '40%',
    borderBottomLeftRadius: '48@s',
    borderBottomRightRadius: '48@s',
    justifyContent: 'center',
  },
  containerTexts: {
    width: '90%',
    alignSelf: 'center',
  },
  middle: {
    height: '60%',
    borderRadius: '48@msr',
    alignSelf: 'center',
    width: '90%',
    bottom: '48@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
