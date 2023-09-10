import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  card: {
    borderRadius: "28@msr",
    padding: "4@msr",
  },
  containerHeader: {
    padding: "8@msr",
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
    fontSize: "11@msr",
    fontWeight: '800',
  },
  containerHeaderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "40@vs",
  },
  containerHeaderIconHolder: {
    padding: "5@msr",
    borderRadius: "20@msr",
  },
  containerHeaderTitlesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
