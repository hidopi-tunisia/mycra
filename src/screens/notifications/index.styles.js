import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@constants/colors';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  top: {
    borderRadius: 32,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '15%',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  verticalDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.GRAY_LIGHT_PRIMARY,
  },
  bottom: {
    borderRadius: 24,
    padding: 8,
    justifyContent: 'center',
    height: height * (1 - 0.15) - 32,
    bottom: 32,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  containerButtonsTop: {
    height: 48,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonTop: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonTop: {
    color: Colors.WHITE,
  },
});

export default styles;
