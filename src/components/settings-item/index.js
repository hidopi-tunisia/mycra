import { Icon, ListItem } from '@ui-kitten/components';

const SettingsItem = ({ title, description, icon, onPress }) => (
  <ListItem
    title={title}
    description={description}
    accessoryLeft={() => <Icon width={20} height={20} name={icon} />}
    accessoryRight={() => <Icon width={20} height={20} name={icon} />}
    onPress={onPress}
  />
);

export default SettingsItem;
