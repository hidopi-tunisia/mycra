import { View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { M } from '../index';

import styles from './index.styles';
import { s } from 'react-native-size-matters';

const renderIcon = type => {
  switch (type) {
    case 'success':
      return 'checkmark-circle-2-outline';
    case 'info':
      return 'info-outline';
    case 'danger':
      return 'close-circle-outline';
    case 'default':
      return 'clock-outline';
    default:
      return 'clock-outline';
  }
};

export const renderColor = type => {
  switch (type) {
    case 'success':
      return '#4CAF50cc';
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
        <Icon width={s(18)} height={s(18)} name={renderIcon(type)} fill="white" />
      </View>
    </View>
  </View>
);
const CRAHistoryItem = ({ title, subtitle, type, children, onPress }) => (
  <Card
    style={styles.card}
    header={() => <Header title={title} subtitle={subtitle} type={type} />}
    onPress={onPress}>
    {children}
  </Card>
);
export default CRAHistoryItem;
