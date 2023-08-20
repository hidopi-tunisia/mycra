import { View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { M } from '../index';

import styles from './index.styles';

const renderIcon = (type) => {
  switch (type) {
    case 'success':
      return 'bell-outline';
    case 'info':
      return 'info-outline';
    case 'warning':
      return 'alert-triangle-outline';
    case 'danger':
      return 'close-circle-outline';
    case 'default':
      return 'message-square-outline';
    default:
      return 'message-square-outline';
  }
};

const renderBackgroundColor = (type) => {
  switch (type) {
    case 'success':
      return '#4CAF50cc';
    case 'info':
      return '#2196F3cc';
    case 'warning':
      return '#FF9800cc';
    case 'danger':
      return '#F44336cc';
    case 'default':
      return '#9E9E9Ecc';
    default:
      return '#9E9E9Ecc';
  }
};

const Header = ({ title, subtitle, type }) => (
  <View style={styles.containerHeader}>
    <View style={styles.containerHeaderTitles}>
      <Text category="h6">{title}</Text>
      <Text category="s1" style={styles.textSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.containerHeaderIcon}>
      <View
        style={{
          ...styles.containerHeaderIconHolder,
          backgroundColor: renderBackgroundColor(type),
        }}>
        <Icon width={20} height={20} name={renderIcon(type)} fill="white" />
      </View>
    </View>
  </View>
);
const NotificationsItem = ({ title, subtitle, type, content }) => (
  <>
    <Card
      style={styles.card}
      header={() => <Header title={title} subtitle={subtitle} type={type} />}>
      {content ? <Text>{content}</Text> : <Text>No content</Text>}
    </Card>
    <M v1 />
  </>
);
export default NotificationsItem;
