import { Icon, ListItem } from '@ui-kitten/components';
import styles from './index.styles';
import Colors from '@constants/colors';
import { s } from 'react-native-size-matters';

const SettingsItem = ({
  title,
  description,
  icon,
  secondaryIcon = 'chevron-right-outline',
  onPress,
}) => (
  <ListItem
    title={title}
    description={description}
    accessoryLeft={() => (
      <Icon
        width={s(26)}
        height={s(22)}
        name={icon}
        fill={Colors.GRAY_DARK_PRIMARY}
      />
    )}
    accessoryRight={() => (
      <Icon
        width={s(18)}
        height={s(18)}
        name={secondaryIcon}
        fill={Colors.GRAY_DARK_PRIMARY}
      />
    )}
    onPress={onPress}
    style={styles.root}
  />
);

export default SettingsItem;
