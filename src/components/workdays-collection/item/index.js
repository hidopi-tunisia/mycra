import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import styles from './index.styles';
import Colors from '@constants/colors';
import { Icon } from '@ui-kitten/components';
import { M } from '@components/miscs/margins';
import { s } from 'react-native-size-matters';

const Item = ({
  text,
  color,
  backgroundColor = Colors.GRAY_PRIMARY,
  borderColor,
  selected = false,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ ...styles.container, backgroundColor, borderColor }}>
      {selected && (
        <>
          <Icon width={s(17)} height={s(17)} fill={color} name="checkmark-outline" />
          <M h2 />
        </>
      )}
      <Text style={{ ...styles.text, color }}>{text}</Text>
    </View>
  </TouchableOpacity>
);
export default Item;
