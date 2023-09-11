import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  containerTop: {
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '228@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: '28@msr',
    borderBottomRightRadius: '28@msr',
  },
  containerInformation: {
    padding: 12,
    alignItems: 'center',
  },
  containerImage: {
    width: '72@s',
    height: '72@s',
    borderRadius: '36@s',
    borderWidth: '3.2@s',
    borderColor: Colors.WHITE,
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatar: {
    width: 72,
    height: 72,
  },
  avatarBorder: {
    zIndex: 10,
    position: 'absolute',
    width: '72@s',
    height: '72@s',
    borderRadius: '36@s',
    borderWidth: '3.2@s',
    borderColor: Colors.WHITE,
    top: -4,
    left: -4,
  },
  avatarTop: {
    backgroundColor: Colors.TRANSPARENT,
    zIndex: 10,
    position: 'absolute',
    width: 124,
    height: 124,
    borderWidth: 20,
    borderColor: Colors.BLUE_DARK_PRIMARY,
    borderRadius: 60,
    top: -24,
    left: -24,
  },
  statusPhoto: {
    width: '18@s',
    height: '18@s',
    borderRadius: '10@s',
    borderColor: Colors.WHITE,
    borderWidth: '1.6@s',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.GRAY_SECONDARY_TEXT,
    right: 0,
    zIndex: 20,
  },
  statusAvatar: {
    width: '18@s',
    height: '18@s',
    borderRadius: '10@s',
    borderColor: Colors.WHITE,
    borderWidth: '1.6@s',
    position: 'absolute',
    bottom: -8,
    backgroundColor: Colors.GRAY_SECONDARY_TEXT,
    right: 0,
    zIndex: 20,
  },
  containerInformation: {
    flexDirection: "row",
    alignItems: 'center'
  },
  containerEdit: {
    width: '24@s',
    height: '24@s',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: '12@s'
  },
  containerTexts: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textName: {
    fontWeight: '700',
    color: Colors.WHITE,
  },
  textCompany: {
    fontWeight: '400',
    color: Colors.WHITE,
    fontSize: '10@msr',
    marginTop: '4@msr',
  },
  bottom: {
    borderRadius: '24@msr',
    padding: '8@msr',
    justifyContent: 'center',
    marginTop: '-28@msr',
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: '24@msr',
    padding: '6@msr',
  },
  containerVersion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textVersion: {
    color: Colors.GRAY_PRIMARY,
    fontSize: '10@msr',
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}66`,
    padding: '8@msr',
    paddingHorizontal: '20@msr',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@msr',
  },
  textError: {
    color: Colors.WHITE,
  },
});
export default styles;
