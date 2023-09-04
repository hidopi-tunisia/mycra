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
    height: '10%',
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
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 24,
    padding: 20,
    paddingBottom: 72,
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
    borderRadius: 20,
    width: 40,
    height: 40,
    position: 'absolute',
    left: 0,
  },
  textHeader: {
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
  containerLegends: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shapeLegend: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  cardEmpty: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    padding: 20,
  },
  containerLoadMore: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    flexDirection: "row"
  },
  textLoadMore: {
    color: Colors.GRAY_PRIMARY,
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}11`,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: Colors.RED_DARK_PRIMARY,
  },
  textRetry: {
    padding: 8,
    color: Colors.BLUE_DARK_PRIMARY,
  },
});

export default styles;
