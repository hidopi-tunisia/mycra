import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  containerHeader: {
    padding: '7@msr',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerHeaderTitles: {
    flex: 1,
  },
  textSubtitle: {
    fontSize: '12@msr',
    fontWeight: '800',
    color: '#9E9E9Ecc',
  },
  containerHeaderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40@s',
  },
  containerHeaderIconHolder: {
    padding: '5@msr',
    borderRadius: '22@msr',
  },
  containerHeaderTitlesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: "12@msr",
    height: "24@s",
    width: "24@s"
  },
  container: {
    padding: "8@msr",
    flex: 1,
    justifyContent: 'space-around',
  },
  containerContent: {
    paddingHorizontal: "6@msr"
  },
  buttonClose: {
    height: "38@vs",
    borderRadius: "20@msr",
  },
});
export default styles;
