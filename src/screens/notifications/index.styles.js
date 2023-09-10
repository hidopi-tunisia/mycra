import { Dimensions } from 'react-native';
import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';
const { height } = Dimensions.get('window');

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  top: {
    borderRadius: "32@msr",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '15%',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  verticalDivider: {
    width: 1,
    height: "16@vs",
    backgroundColor: Colors.GRAY_LIGHT_PRIMARY,
  },
  bottom: {
    borderRadius: "24@msr",
    padding: "8@msr",
    justifyContent: 'center',
    height: height * (1 - 0.15) - 32,
    bottom: "32@vs",
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: "24@msr",
    padding: "18@msr",
    paddingBottom: "72@@msr",
  },
  textTitle: {
    fontSize: "28@msr",
    fontWeight: '900',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  containerButtonsTop: {
    height: "36@vs",
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
  cardEmpty: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "24@msr",
    padding: "20@msr",
    paddingBottom: "72@msr",
  },
});

export default styles;
