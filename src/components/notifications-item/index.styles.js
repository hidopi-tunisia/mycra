import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 4,
  },
  containerHeader: {
    padding: 8,
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
    fontSize: 14,
    fontWeight: '800',
  },
  containerHeaderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
  },
  containerHeaderIconHolder: {
    padding: 6,
    borderRadius: 24,
  },
  containerHeaderTitlesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isUnseen: {
    backgroundColor: Colors.RED_PRIMARY,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
export default styles;
