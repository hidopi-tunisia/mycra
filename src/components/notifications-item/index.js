import { View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { M } from '../index';

import styles from './index.styles';

const renderIcon = type => {
  switch (type) {
    case 'success':
      return 'checkmark-circle-2-outline';
    case 'danger':
      return 'close-circle-outline';
    case 'default':
      return 'clock-outline';
    default:
      return 'clock-outline';
  }
};

const renderColor = type => {
  switch (type) {
    case 'success':
      return '#4CAF50cc';
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
      <Text
        category="s1"
        style={{ ...styles.textSubtitle, color: renderColor(type) }}>
        {subtitle}
      </Text>
    </View>
    <View style={styles.containerHeaderIcon}>
      <View
        style={{
          ...styles.containerHeaderIconHolder,
          backgroundColor: renderColor(type),
        }}>
        <Icon width={20} height={20} name={renderIcon(type)} fill="white" />
      </View>
    </View>
  </View>
);
const CRAHistoryItem = ({ title, subtitle, type, onPress, children }) => (
  <>
    <Card
      style={styles.card}
      header={() => <Header title={title} subtitle={subtitle} type={type} />}
      onPress={onPress}>
      <View style={styles.content}>{children}</View>
    </Card>
    <M v1 />
  </>
);
export default CRAHistoryItem;
