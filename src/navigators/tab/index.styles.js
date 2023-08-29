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
});

export default styles;
