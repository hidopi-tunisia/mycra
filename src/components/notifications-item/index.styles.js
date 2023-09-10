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
  isUnseen: {
    backgroundColor: Colors.RED_PRIMARY,
    width: '10@s',
    height: '10@s',
    borderRadius: '5@msr',
  },
});
export default styles;
