import { Calendar, M, WorkdaysTypes } from '@components';
import Modal from '@components/modals';
import Colors from '@constants/colors';
import { getCRA } from '@domain/cra';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getHistoryItem } from '@screens/home/composables';
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import styles from './index.styles';

const CRAHistoryDetailsScreen = ({ navigation, onFocus, onBlur }) => {
  const {
    params: { id },
  } = useRoute();
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [cra, setCRA] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCount, setSelectedCount] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [currentYear, setCurrentYear] = useState(moment().format('YYYY'));
  const [holiday, setHoliday] = useState(null);
  const [weekend, setWeekend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHolidayVisible, setModalHolidayVisible] = useState(false);
  const [modalWeekendVisible, setModalWeekendVisible] = useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.ORANGE_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(Colors.ORANGE_PRIMARY, 'light');
      onFocus(Colors.ORANGE_DARK_PRIMARY);
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_PRIMARY);
      };
    }, []),
  );
  useEffect(() => {
    const fn = async () => {
      try {
        setLoadingFetch(false);
        setErrorFetch(null);
        const { data } = await getCRA(id, { populate: 'project' });
        setCRA(data);
        setLoadingFetch(false);
        const marked = {};
        const { working, half, remote, off, weekends, holidays } = data;
        working.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.WORKING,
            customStyles: styles.calendarDayWorking,
            disableTouchEvent: true,
          };
        });
        working.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.WORKING,
            customStyles: styles.calendarDayWorking,
            disableTouchEvent: true,
          };
        });
        half.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.HALF,
            customStyles: styles.calendarHalfDay,
            disableTouchEvent: true,
          };
        });
        remote.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.REMOTE,
            customStyles: styles.calendarDayRemote,
            disableTouchEvent: true,
          };
        });
        off.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.OFF,
            customStyles: styles.calendarDayOff,
            meta: {
              value: element.meta.value,
            },
            disableTouchEvent: true,
          };
        });
        weekends.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.WEEKEND,
            customStyles: styles.calendarDayWeekend,
          };
        });
        holidays.forEach(element => {
          marked[element.date] = {
            type: WorkdaysTypes.HOLIDAY,
            meta: {
              value: element.name,
            },
            customStyles: styles.calendarDayHoliday,
          };
        });
        setMarkedDates(marked);
      } catch (error) {
        setLoadingFetch(false);
        setErrorFetch(error);
        console.log(error);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    const selectedDates = Object.keys(markedDates).filter(
      d => markedDates[d].type === WorkdaysTypes.WORKING,
    );
    setSelectedCount(selectedDates.length);
  }, [markedDates]);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  const handleSelected = day => {
    if (markedDates[day.dateString].type === WorkdaysTypes.HOLIDAY) {
      setHoliday({
        date: day.dateString,
        name: markedDates[day.dateString].meta.value,
      });
      setModalHolidayVisible(true);
    } else if (markedDates[day.dateString].type === WorkdaysTypes.WEEKEND) {
      setWeekend({
        date: day.dateString,
      });
      setModalWeekendVisible(true);
    }
  };
  const handlePressPositive = () => {
    setModalVisible(false);
  };
  const handleSubmit = () => {
    setModalVisible(true);
  };
  const handlePressHolidayPositive = () => {
    setHoliday(null);
    setModalHolidayVisible(false);
  };
  const handlePressWeekendPositive = () => {
    setWeekend(null);
    setModalWeekendVisible(false);
  };
  const getModalTitle = s => {
    if (s === 'submitted') {
      return 'Waiting for approval';
    } else if (s === 'rejected') {
      return 'Rejected';
    } else if (s === 'approved') {
      return 'Approved';
    }
  };
  const handlePressBack = () => {
    navigation.goBack();
  };
  return !loadingFetch && cra ? (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <TouchableOpacity onPress={handlePressBack}>
              <View style={styles.containerBack}>
                <Icon
                  fill={Colors.WHITE}
                  name="chevron-left"
                  width={36}
                  height={36}
                />
                <Text style={styles.textHeading}>
                  {i18n.t('CRA Details.title')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressBack}>
              <Icon
                fill={Colors.WHITE}
                name="question-mark-circle-outline"
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </View>
          <M v1 />
          {cra.project && (
            <TouchableOpacity>
              <View style={styles.containerProjects}>
                <Text style={styles.textDescription}>
                  {i18n.t('CRA Details.Project')} - {cra.project.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.containerCalendar}>
          <View style={styles.containerCalendarHeader}>
            <Text style={styles.containerCalendarTitle}>
              {currentMonth} {currentYear}
            </Text>
          </View>
          <M v1 />
          <Calendar markedDates={markedDates} onDayPress={handleSelected} />
        </View>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.BLUE_PRIMARY,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.pending-cras.Working')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.pending-cras.Half day')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.PURPLE_PRIMARY,
                borderColor: Colors.PURPLE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.pending-cras.Remote')}</Text>
          </View>
          {/* <View style={styles.containerLegend}>
        <View
          style={{
            ...styles.shapeLegend,
            backgroundColor: Colors.WHITE,
            borderColor: Colors.GRAY_DARK_PRIMARY,
          }}
        />
        <M h1 />
        <Text>{i18n.t('Home.pending-cras.Unavailable')}</Text>
      </View> -- TODO: Unavailable */}
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.pending-cras.Off')}</Text>
          </View>
        </View>
        <M v2 />
        <View style={styles.containerButton}>
          <Button
            style={styles.buttonSubmit}
            status="control"
            onPress={handleSubmit}>
            {cra.status}
          </Button>
        </View>
      </View>
      <Modal
        title={getModalTitle(cra.status)}
        type="confirm"
        visible={modalVisible}
        onPressPositive={handlePressPositive}>
        {cra.status === 'pending' && (
          <Text>
            {i18n.t('Home.pending-cras.modal.info:submitted')}
            {getHistoryItem(cra.history, 'submitted') &&
            getHistoryItem(cra.history, 'submitted').at
              ? ` at ${getHistoryItem(cra.history, 'submitted').at.substring(
                  0,
                  10,
                )} ${getHistoryItem(cra.history, 'submitted').at.substring(
                  11,
                  16,
                )}`
              : ''}
          </Text>
        )}
        {cra.status === 'rejected' && (
          <Text>
            {i18n.t('Home.pending-cras.modal.info:rejected')}
            {getHistoryItem(cra.history, 'rejected') &&
            getHistoryItem(cra.history, 'rejected').at
              ? ` at ${getHistoryItem(cra.history, 'rejected').at.substring(
                  0,
                  10,
                )} ${getHistoryItem(cra.history, 'rejected').at.substring(
                  11,
                  16,
                )}`
              : ''}
          </Text>
        )}
        {cra.status === 'approved' && (
          <Text>
            {i18n.t('Home.pending-cras.modal.info:approved')}
            {getHistoryItem(cra.history, 'approved') &&
            getHistoryItem(cra.history, 'approved').at
              ? ` at ${getHistoryItem(cra.history, 'approved').at.substring(
                  0,
                  10,
                )} ${getHistoryItem(cra.history, 'approved').at.substring(
                  11,
                  16,
                )}`
              : ''}
          </Text>
        )}
        <M v2 />
        <Text>{i18n.t('CRA Details.modal.summary')}</Text>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.BLUE_PRIMARY,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Working')} ({cra.working?.length})
            </Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Half day')} ({cra.half?.length})
            </Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.PURPLE_PRIMARY,
                borderColor: Colors.PURPLE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Remote')} ({cra.remote?.length})
            </Text>
          </View>
          {/* <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GRAY_DARK_PRIMARY,
                borderColor: Colors.GRAY_DARK_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.Unavailable')}</Text>
          </View> --  TODO: Unavailable */}
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Off')} ({cra.off?.length})
            </Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Weekends')} ({cra.weekends?.length})
            </Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GREEN_PRIMARY,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>
              {i18n.t('CRA Details.Holiday')} ({cra.holidays?.length})
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        title={i18n.t('CRA Details.modalHoliday.title')}
        type="info"
        visible={modalHolidayVisible}
        onPressPositive={handlePressHolidayPositive}>
        {holiday && (
          <Text>
            {i18n.t('CRA Details.modalHoliday.confirmation', {
              date: holiday.date,
              name: holiday.name,
            })}
          </Text>
        )}
      </Modal>
      <Modal
        title={i18n.t('CRA Details.modalWeekend.title')}
        type="info"
        visible={modalWeekendVisible}
        onPressPositive={handlePressWeekendPositive}>
        {weekend && (
          <Text>
            {i18n.t('CRA Details.modalWeekend.confirmation', {
              date: weekend.date,
            })}
          </Text>
        )}
      </Modal>
      <Modal
        title={i18n.t('CRA Details.modalHelp.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('CRA Details.modalHelp.description-1')}</Text>
        <Text>{i18n.t('CRA Details.modalHelp.description-2')}</Text>
        <M v2 />
        <Text>{i18n.t('CRA Details.modalHelp.legend')}</Text>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.BLUE_PRIMARY,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Working')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Half day')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.PURPLE_PRIMARY,
                borderColor: Colors.PURPLE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Remote')}</Text>
          </View>
          {/* <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GRAY_DARK_PRIMARY,
                borderColor: Colors.GRAY_DARK_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Unavailable')}</Text>
          </View> --  TODO: Unavailable */}
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Off')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Weekend')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GREEN_PRIMARY,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('CRA Details.modalHelp.Holiday')}</Text>
          </View>
        </View>
      </Modal>
    </Layout>
  ) : (
    <Layout style={styles.containerLoader}>
      <Spinner status="warning" size="medium" />
    </Layout>
  );
};

export default CRAHistoryDetailsScreen;
