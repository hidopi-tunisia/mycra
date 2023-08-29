import { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { NotificationsItem, M } from '@components';
import styles from './index.styles';
import Fab from '@components/fab';

const NotificationsScreen = () => {
  const [email, setEmail] = useState('');
  const handlePressFab = () => {
    alert('dfff');
  };
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.textTitle} category="h1">
          Notifications
        </Text>
        <View style={styles.containerButtonsTop}>
          <TouchableOpacity style={styles.buttonTop}>
            <Text style={styles.textButtonTop}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity style={styles.buttonTop}>
            <Text style={styles.textButtonTop}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 20,
            paddingBottom: 72,
          }}>
          <M v4 />
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
          <NotificationsItem
            title="CRA changed"
            subtitle={new Date()
              .toISOString()
              .substring(0, 16)
              .replaceAll('T', ' at ')}
            type="default"
          />
          <NotificationsItem
            title="CRA changed"
            subtitle={new Date()
              .toISOString()
              .substring(0, 16)
              .replaceAll('T', ' at ')}
            type="default"
          />
          <NotificationsItem
            title="CRA changed"
            subtitle={new Date()
              .toISOString()
              .substring(0, 16)
              .replaceAll('T', ' at ')}
            type="default"
          />
          <M v10 />
        </ScrollView>
      </View>
      <Fab onPress={handlePressFab} />
    </Layout>
  );
};

export default NotificationsScreen;
