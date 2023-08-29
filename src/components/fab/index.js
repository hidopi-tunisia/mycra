import { TouchableOpacity, View } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import styles from './index.styles';
import Colors from '@constants/colors';

const Fab = ({ backgroundColor = Colors.BLUE_PRIMARY, onPress }) => (
  <TouchableOpacity
    style={{ ...styles.container, backgroundColor }}
    onPress={onPress}>
    <Icon name="plus-outline" fill={Colors.WHITE} width={16} height={16} />
  </TouchableOpacity>
);
export default Fab;
