import { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { NotificationsItem, BottomSheet, M } from '@components';
import styles from './index.styles';
import Fab from '@components/fab';
import AlertForm from '@components/alert-form';
import { getItem, setItem } from '@domain/storage';

const NotificationsScreen = ({ notifications }) => {
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const handleSubmit = text => {
    alert(text);
  };
  const handleRefBottomSheet = ref => {
    setRefBottomSheet(ref);
  };
  const handlePressFab = () => {
    refBottomSheet.open();
  };
  const handlePressClose = () => {
    refBottomSheet.close();
  };
  handlePressItem = async i => {
    const item = await getItem();
    const ns = JSON.parse(item);
    delete ns[i];
    setItem(JSON.stringify(ns));
  };

  // Unused function
  const onViewableItemsChanged = ({ viewableItems }) => {
    const ids = viewableItems.map(({ item }) => item.messageId);
    ids.forEach(async id => {
      const item = await getItem();
      const ns = JSON.parse(item);
      ns[id] = { ...ns[id], isUnseen: false };
      setItem(JSON.stringify(ns));
    });
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
  return (
    <>
      <Layout style={styles.root}>
        <View style={styles.top}>
          <Text style={styles.textTitle} category="h1">
            Notifications
          </Text>
          <View style={styles.containerButtonsTop}>
            <TouchableOpacity style={styles.buttonTop}>
              <Text style={styles.textButtonTop}>Alerts</Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.buttonTop}>
              <Text style={styles.textButtonTop}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          {notifications.length > 0 ? (
            <FlatList
              style={styles.card}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={<M v1 />}
              data={notifications}
              ListHeaderComponent={<M v4 />}
              ListFooterComponent={<M v10 />}
              renderItem={({ item }) => (
                <NotificationsItem
                  title={item.notification.title}
                  subtitle={new Date(item.sentTime)
                    .toISOString()
                    .substring(0, 16)
                    .replaceAll('T', ' at ')}
                  type="danger"
                  content={item.notification.body}
                  isUnseen={item.isUnseen}
                  onPress={() => handlePressItem(item.messageId)}
                />
              )}
              // viewabilityConfigCallbackPairs={
              //   viewabilityConfigCallbackPairs.current
              // }
            />
          ) : (
            <View style={styles.cardEmpty}>
              <Text>No notifications</Text>
            </View>
          )}
        </View>
        <Fab onPress={handlePressFab} />
        <BottomSheet height={300} onCallbackRef={handleRefBottomSheet}>
          <AlertForm onPressClose={handlePressClose} onSubmit={handleSubmit} />
        </BottomSheet>
      </Layout>
    </>
  );
};

export default NotificationsScreen;
