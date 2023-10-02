import { BottomSheet, M, NotificationsItem } from '@components';
import AlertForm from '@components/alert-form';
import Fab from '@components/fab';
import { getItem, setItem } from '@domain/storage';
import { Layout, Text } from '@ui-kitten/components';
import { useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styles from './index.styles';
import { i18n } from '@utils/translations';

const NotificationsScreen = ({ notifications }) => {
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const handleSubmit = payload => {
    // alert(JSON.stringify(payload, null, 2));
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
    let action;
    if (JSON.parse(ns[i].data.action).type) {
      action = JSON.parse(ns[i].data.action);
    }
    if (action.type === 'cra-rejected') {
    }
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
  p(notifications);
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
  return (
    <>
      <Layout style={styles.root}>
        <View style={styles.top}>
          <Text style={styles.textTitle} category="h1">
            {i18n.t('Notifications.Notifications')}
          </Text>
          <View style={styles.containerButtonsTop}>
            <TouchableOpacity style={styles.buttonTop}>
              <Text style={styles.textButtonTop}>
                {i18n.t('Notifications.Alerts')}
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.buttonTop}>
              <Text style={styles.textButtonTop}>
                {i18n.t('Notifications.Notifications')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middle}>
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
                  title={item?.data?.title}
                  subtitle={new Date(item.sentTime)
                    .toISOString()
                    .substring(0, 16)
                    .replaceAll('T', ' at ')}
                  type={item?.data?.severity}
                  content={item?.data?.body}
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
              <Text>{i18n.t('Notifications.No notifications')}</Text>
            </View>
          )}
        </View>
        <View style={styles.bottom} />
        <Fab onPress={handlePressFab} />
        <BottomSheet height={360} onCallbackRef={handleRefBottomSheet}>
          <AlertForm onPressClose={handlePressClose} onSubmit={handleSubmit} />
        </BottomSheet>
      </Layout>
    </>
  );
};

export default NotificationsScreen;
