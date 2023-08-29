import { Icon, ListItem } from '@ui-kitten/components';
import styles from './index.styles';
import Colors from '@constants/colors';

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
        width={36}
        height={20}
        name={icon}
        fill={Colors.GRAY_DARK_PRIMARY}
      />
    )}
    accessoryRight={() => (
      <Icon
        width={20}
        height={20}
        name={secondaryIcon}
        fill={Colors.GRAY_DARK_PRIMARY}
      />
    )}
    onPress={onPress}
    style={styles.root}
  />
);

export default SettingsItem;
