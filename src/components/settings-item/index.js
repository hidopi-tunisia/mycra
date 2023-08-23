import { Icon, ListItem } from '@ui-kitten/components';

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
    accessoryLeft={() => <Icon width={36} height={20} name={icon} />}
    accessoryRight={() => <Icon width={20} height={20} name={secondaryIcon} />}
    onPress={onPress}
  />
);

export default SettingsItem;
