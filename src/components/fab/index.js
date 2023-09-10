import Colors from '@constants/colors';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import styles from './index.styles';
import { s } from 'react-native-size-matters';

const Fab = ({ backgroundColor = Colors.BLUE_PRIMARY, onPress }) => (
  <TouchableOpacity
    style={{ ...styles.container, backgroundColor }}
    onPress={onPress}>
    <Icon name="plus-outline" fill={Colors.WHITE} width={s(13)} height={s(13)} />
  </TouchableOpacity>
);
export default Fab;
