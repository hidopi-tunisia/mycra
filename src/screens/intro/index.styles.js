import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  containerTexts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    alignSelf: "center"
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
    fontSize: 14,
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
    fontSize: 14,
  },
});

export default styles;
