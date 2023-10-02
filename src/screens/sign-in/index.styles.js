import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  containerImage: {
    backgroundColor: Colors.WHITE,
    width: "84@s",
    height: "84@s",
    borderRadius: "42@s",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    height: "56@s",
    width: "56@s",
  },
  top: {
    borderRadius: "28@msr",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '40%',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: "28@msr",
    fontWeight: '900',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  textSubtitle: {
    fontSize: "12@msr",
    fontWeight: '700',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  card: {
    paddingTop: "38@vs",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: "28@msr",
    bottom: "26@vs",
    zIndex: 5,
    paddingHorizontal: "22@msr",
    backgroundColor: Colors.WHITE,
  },
  input: {
    borderRadius: "36@msr",
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelInput: {
    fontSize: "14@msr",
    fontWeight: '600',
  },
  containerForgotPasswordText: {
    alignItems: 'flex-end',
  },
  textForgotPassword: {
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: "12@msr",
  },
  buttonSignIn: {
    height: "48@vs",
    borderRadius: "28@msr",
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
  containerVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVersion: {
    alignSelf: 'center',
    color: Colors.GRAY_LIGHT_PRIMARY,
  },
  containerInternationalization: {
    flexDirection: 'row',
  },
  containerFlag: {
    width: "20@s",
    height: "20@s",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInternationalization: {
    alignSelf: 'center',
    color: Colors.GRAY_LIGHT_PRIMARY,
    textTransform: 'uppercase',
    fontSize: "10@msr"
  },
});

export default styles;
