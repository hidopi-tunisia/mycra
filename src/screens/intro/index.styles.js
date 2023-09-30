import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: '50%',
  },
  containerImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  containerTexts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 19,
    color: '#41414d',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#29292e',
    textAlign: 'center',
  },
  activeDotStyle: {
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
  },
  containerNextButton: {
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.BLUE_PRIMARY,
    backgroundColor: Colors.BLUE_PRIMARY,
    height: 42,
    borderRadius: 24,
  },
  textNextButton: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  containerSkipButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  textSkipButton: {
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK + '87',
    fontSize: '12@msr',
  },
  containerDoneButton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderColor: Colors.BLUE_DARK_PRIMARY,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: 42,
    borderRadius: 24,
  },
  textDoneButton: {
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
    fontSize: '12@msr',
  },
  containerVersion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVersion: {
    alignSelf: 'center',
    color: Colors.GRAY_PRIMARY,
    fontSize: "10@msr"
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
    color: Colors.GRAY_PRIMARY,
    textTransform: 'uppercase',
    fontSize: "10@msr"
  },
});

export default styles;
