import { View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { s } from 'react-native-size-matters';

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

const Header = ({ title, subtitle, type, isUnseen }) => (
  <View style={styles.containerHeader}>
    <View style={styles.containerHeaderTitles}>
      <View style={styles.containerHeaderTitlesTitle}>
        <Text category="h6">{title}</Text>
      </View>
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
const CRAHistoryItem = ({
  title,
  subtitle,
  type,
  content = 'No content',
  isUnseen,
  onPress,
}) => (
  <Card
    style={styles.card}
    header={() => (
      <Header
        title={title}
        subtitle={subtitle}
        type={type}
        isUnseen={isUnseen}
      />
    )}
    onPress={onPress}>
    {content && <Text style={styles.content}>{content}</Text>}
  </Card>
);
export default CRAHistoryItem;
