import { M } from '@components';
import { Button, Text } from '@ui-kitten/components';
import { Image, ScrollView, View } from 'react-native';
import styles from './index.styles';

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
const AlertDetails = ({ alert, onPressClose }) => (
  <View style={styles.container}>
    {alert && (
      <>
        <Header
          title={`${alert.supervisor?.firstName} ${alert.supervisor?.lastName}`}
          subtitle={new Date(alert.createdAt)
            .toISOString()
            .substring(0, 16)
            .replaceAll('T', ' at ')}
          satisfaction={1}
        />
        <ScrollView style={styles.containerContent}>
          <Text>{alert.content}</Text>
        </ScrollView>
        <M v2 />
        <Button style={styles.buttonClose} onPress={onPressClose}>
          Close
        </Button>
      </>
    )}
  </View>
);
export default AlertDetails;
