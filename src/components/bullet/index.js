import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import styles from './index.styles';
import Colors from '@utils/colors';

const Bullet = ({ text, color = Colors.GRAY_PRIMARY }) => (
  <View style={{ ...styles.container, backgroundColor: color }}>
    <Text style={styles.text}>{text}</Text>
  </View>
);
export default Bullet;
