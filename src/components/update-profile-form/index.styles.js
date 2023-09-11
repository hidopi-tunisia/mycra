import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    padding: '7@msr',
    flex: 1,
    justifyContent: 'space-around',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '20@msr',
    fontWeight: '900',
  },
  picture: {
    width: '64@s',
    height: '64@s',
    borderRadius: '6@msr',
  },
  containerPicturePlaceholder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picturePlaceholder: {
    width: '64@s',
    height: '64@s',
    borderRadius: '12@msr',
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK_PRIMARY,
    backgroundColor: Colors.GRAY_DARK_PRIMARY + '11',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerUpload: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerReplace: {
    backgroundColor: Colors.GRAY_PRIMARY,
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '-7@msr',
    bottom: '-7@msr',
  },
  containerButtonUpload: {
    flexDirection: 'row',
    borderRadius: '20@s',
    padding: '4@msr',
    paddingHorizontal: '12@s',
    borderColor: Colors.BLUE_DARK_PRIMARY,
    borderWidth: '2@msr',
  },
  containerButtonReset: {
    flexDirection: 'row',
    borderRadius: '20@s',
    borderColor: Colors.RED_DARK_PRIMARY,
  },
  input: {
    borderRadius: '24@msr',
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelInput: {
    fontSize: '14@msr',
    fontWeight: '600',
  },
  buttonSubmit: {
    height: '40@vs',
    borderRadius: '22@msr',
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: '8@msr',
    borderRadius: '16@msr',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.RED_DARK_PRIMARY,
  },
});
export default styles;
