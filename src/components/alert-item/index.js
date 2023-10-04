import { Image, View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { s } from 'react-native-size-matters';

const renderIcon = type => {
  switch (type) {
    case 'success':
      return 'checkmark-circle-2-outline';
    case 'danger':
      return 'close-circle-outline';
    case 'wraning':
      return 'alert-triangle-outline';
    case 'info':
      return 'info-outline';
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
    case 'warning':
      return '#FBC02Dcc';
    case 'info':
      return '#03A9F4cc';
    case 'default':
      return '#9E9E9Ecc';
    default:
      return '#9E9E9Ecc';
  }
};

const Header = ({ title, subtitle, satisfaction }) => (
  <View style={styles.containerHeader}>
    <View style={styles.containerHeaderTitles}>
      <View style={styles.containerHeaderTitlesTitle}>
        <Text category="h6">{title}</Text>
      </View>
      <Text category="s1" style={styles.textSubtitle}>
        {subtitle}
      </Text>
    </View>
    <View style={styles.containerHeaderIcon}>
      <View style={styles.containerHeaderIconHolder}>
        {satisfaction === 1 && (
          <Image
            style={styles.image}
            source={require('@assets/images/alert-form/1-selected.jpg')}
          />
        )}
        {satisfaction === 2 && (
          <Image
            style={styles.image}
            source={require('@assets/images/alert-form/2-selected.jpg')}
          />
        )}
        {satisfaction === 3 && (
          <Image
            style={styles.image}
            source={require('@assets/images/alert-form/3-selected.jpg')}
          />
        )}
      </View>
    </View>
  </View>
);
const AlertItem = ({ title, subtitle, satisfaction, content, onPress }) => (
  <Card
    style={styles.card}
    header={() => (
      <Header title={title} subtitle={subtitle} satisfaction={satisfaction} />
    )}
    onPress={onPress}>
    <Text numberOfLines={2} ellipsizeMode="tail">
      {content}
    </Text>
  </Card>
);
export default AlertItem;
