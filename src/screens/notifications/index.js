import { ScrollView } from 'react-native';
import { NotificationsItem, M } from '../../components';
import styles from './index.styles';

const SettingsScreen = () => (
  <ScrollView style={styles.container}>
    <M v3 />
    <NotificationsItem
      title="CRA rejected"
      subtitle={new Date()
        .toISOString()
        .substring(0, 16)
        .replaceAll('T', ' at ')}
      type="danger"
      content="Rejected in 2022-12-20 at 19-09, missing day 7"
    />
    <NotificationsItem
      title="CRA required"
      subtitle={new Date()
        .toISOString()
        .substring(0, 16)
        .replaceAll('T', ' at ')}
      type="info"
    />
    <NotificationsItem
      title="Important meeting"
      subtitle={new Date('2023-03-20')
        .toISOString()
        .substring(0, 16)
        .replaceAll('T', ' at ')}
      type="warning"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    />
    <NotificationsItem
      title="CRA accepted"
      subtitle={new Date('2022-12-09')
        .toISOString()
        .substring(0, 16)
        .replaceAll('T', ' at ')}
      type="success"
      content="Accepted in 2022-12-20 at 19-09"
    />
    <NotificationsItem
      title="CRA changed"
      subtitle={new Date()
        .toISOString()
        .substring(0, 16)
        .replaceAll('T', ' at ')}
      type="default"
    />
  </ScrollView>
);

export default SettingsScreen;
