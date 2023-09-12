import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  containerImage: {
    backgroundColor: Colors.WHITE,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    height: 72,
    width: 72,
  },
  top: {
    borderRadius: 32,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '40%',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  textSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  card: {
    paddingTop: 48,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 32,
    bottom: 32,
    zIndex: 5,
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE,
  },
  input: {
    borderRadius: 24,
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelInput: {
    fontSize: 16,
    fontWeight: '600',
  },
  containerForgotPasswordText: {
    alignItems: 'flex-end',
  },
  textForgotPassword: {
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: 14,
  },
  buttonSignIn: {
    height: 48,
    borderRadius: 24,
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: 8,
    borderRadius: 16,
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
    width: 24,
    height: 24,
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
