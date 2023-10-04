import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  card: {
    borderRadius: '32@msr',
    padding: '3@msr',
  },
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
});
export default styles;
