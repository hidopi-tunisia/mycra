import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    height: 56,
    borderRadius: 36,
    bottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '96%',
    alignSelf: 'center',
  },
  containerItemButton: {
    flex: 1,
    alignItems: 'center',
  },
  containerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    top: -16,
    zIndex: 10,
    right: 4,
  },
  textBadge: {
    fontWeight: '900',
  },
});

export default styles;
