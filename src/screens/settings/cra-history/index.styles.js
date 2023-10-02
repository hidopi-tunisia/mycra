import { Dimensions } from 'react-native';
import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  top: {
    borderRadius: '32@msr',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: '10%',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  verticalDivider: {
    width: "1@msr",
    height: "16@msr",
    backgroundColor: Colors.GRAY_LIGHT_PRIMARY,
  },
  middle: {
    borderRadius: '24@msr',
    padding: '8@msr',
    justifyContent: 'center',
    flex: 1,
  },
  bottom: {
    borderRadius: '24@msr',
    padding: '8@msr',
    justifyContent: 'center',
    height: '72@msr',
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: '22@msr',
    padding: '19@msr',
    paddingBottom: '68@msr',
  },
  containerHeader: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBack: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@msr',
    width: '36@msr',
    height: '40@msr',
    position: 'absolute',
    left: 0,
  },
  textHeader: {
    fontSize: '24@msr',
    fontWeight: '900',
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  containerButtonsTop: {
    height: '48@msr',
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
  containerLegends: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shapeLegend: {
    width: '16@msr',
    height: '16@msr',
    borderRadius: '8@msr',
    borderWidth: '2@msr',
  },
  cardEmpty: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '24@msr',
    padding: '20@msr',
  },
  containerLoadMore: {
    height: '48@msr',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '48@msr',
    flexDirection: 'row',
  },
  textLoadMore: {
    color: Colors.GRAY_PRIMARY,
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: '8@msr',
    paddingHorizontal: '16@msr',
    borderRadius: '16@msr',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.RED_DARK_PRIMARY,
  },
  textRetry: {
    padding: '8@msr',
    color: Colors.BLUE_DARK_PRIMARY,
  },
});

export default styles;
