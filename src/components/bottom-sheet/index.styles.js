import Colors from '@constants/colors';
import { Dimensions } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
const { width } = Dimensions.get('window');

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: `${Colors.BLACK}88`,
  },
  container: {
    alignSelf: 'center',
    width: width - vs(16),
    borderRadius: '16@msr',
    marginBottom: '16@msr',
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
});

export default styles;
