import { BottomSheet, M, NotificationsItem } from '@components';
import AlertForm from '@components/alert-form';
import Fab from '@components/fab';
import { getItem, setItem } from '@domain/storage';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styles from './index.styles';
import { i18n } from '@utils/translations';
import { createAlert, getAlerts } from '@domain/alerts';
import Modal from '@components/modals';
import AlertItem from '@components/alert-item';
import AlertDetails from '@components/alert-details';

const Tabs = {
  ALERTS: 'alerts',
  NOTIFICATIONS: 'notifications',
};

const NotificationsScreen = ({ notifications }) => {
  const [alerts, setAlerts] = useState([]);
  const [alertId, setAlertId] = useState(null);
  const [tab, setTab] = useState(Tabs.ALERTS);
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const [refDetailsBottomSheet, setRefDetailsBottomSheet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const { data } = await getAlerts({ populate: 'supervisor' });
        setAlerts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.info(error);
      }
    };
    fn();
  }, []);
  const handleSubmit = payload => {
    const fn = async () => {
      try {
        setLoadingCreate(true);
        await createAlert(payload);
        const { data } = await getAlerts({ populate: 'supervisor' });
        setAlerts(data);
        refBottomSheet.close();
        setModalVisible(true);
        setLoadingCreate(false);
      } catch (error) {
        setLoadingCreate(false);
        console.info(error);
      }
    };
    fn();
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
  const handleRefDetailsBottomSheet = ref => {
    setRefDetailsBottomSheet(ref);
  };
  const handlePressDetailsClose = () => {
    setAlertId(null);
    refDetailsBottomSheet.close();
  };
  const handlePressAlertItem = async id => {
    setAlertId(id);
    refDetailsBottomSheet.open();
  };
  const handlePressNotificationItem = async i => {
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
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
  const handlePressSelectTab = s => {
    setTab(s);
  };
  const handlePressPositive = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Layout style={styles.root}>
        <View style={styles.top}>
          <Text style={styles.textTitle} category="h1">
            {i18n.t('Notifications.Notifications')}
          </Text>
          <View style={styles.containerButtonsTop}>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => handlePressSelectTab(Tabs.ALERTS)}>
              <Text
                style={{
                  ...styles.textButtonTop,
                  ...(tab === Tabs.ALERTS ? styles.textButtonTopSelected : {}),
                }}>
                {i18n.t('Notifications.Alerts')}
              </Text>
              {tab === Tabs.ALERTS && <View style={styles.line} />}
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => handlePressSelectTab(Tabs.NOTIFICATIONS)}>
              <View style={styles.containerNotifications}>
                <Text
                  style={{
                    ...styles.textButtonTop,
                    ...(tab === Tabs.NOTIFICATIONS
                      ? styles.textButtonTopSelected
                      : {}),
                  }}>
                  {i18n.t('Notifications.Notifications')}
                </Text>
                {notifications.length > 0 && (
                  <>
                    <M h2 />
                    <View style={styles.badge}>
                      <Text style={styles.textBadge}>
                        {notifications.length}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              {tab === Tabs.NOTIFICATIONS && <View style={styles.line} />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middle}>
          {tab === Tabs.ALERTS ? (
            <>
              {loading ? (
                <View style={styles.cardEmpty}>
                  <Spinner status="basic" size="small" />
                </View>
              ) : (
                <>
                  {alerts.length > 0 ? (
                    <FlatList
                      style={styles.card}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={<M v1 />}
                      data={alerts}
                      ListHeaderComponent={<M v4 />}
                      ListFooterComponent={<M v10 />}
                      renderItem={({ item }) => (
                        <AlertItem
                          title={`${item?.supervisor?.firstName} ${item?.supervisor?.lastName}`}
                          subtitle={new Date(item?.createdAt)
                            .toISOString()
                            .substring(0, 16)
                            .replaceAll('T', ' at ')}
                          satisfaction={item?.satisfaction}
                          content={item?.content}
                          onPress={() => handlePressAlertItem(item._id)}
                        />
                      )}
                      // viewabilityConfigCallbackPairs={
                      //   viewabilityConfigCallbackPairs.current
                      // }
                    />
                  ) : (
                    <View style={styles.cardEmpty}>
                      <Text>{i18n.t('Notifications.No alerts')}</Text>
                    </View>
                  )}
                </>
              )}
            </>
          ) : (
            <>
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
                      onPress={() =>
                        handlePressNotificationItem(item.messageId)
                      }
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
            </>
          )}
        </View>
        <View style={styles.bottom} />
        {tab === Tabs.ALERTS && <Fab onPress={handlePressFab} />}
        <BottomSheet height={360} onCallbackRef={handleRefBottomSheet}>
          <AlertForm
            loading={loadingCreate}
            onPressClose={handlePressClose}
            onSubmit={handleSubmit}
          />
        </BottomSheet>
        <BottomSheet
          height={360}
          closeOnDragDown={false}
          onCallbackRef={handleRefDetailsBottomSheet}>
          <AlertDetails
            alert={alerts.find(({ _id }) => _id === alertId)}
            onPressClose={handlePressDetailsClose}
          />
        </BottomSheet>
        <Modal
          title={i18n.t('Notifications.modal.title')}
          type="success"
          visible={modalVisible}
          onPressPositive={handlePressPositive}>
          <Text>{i18n.t('Notifications.modal.info')}</Text>
        </Modal>
      </Layout>
    </>
  );
};

export default NotificationsScreen;
