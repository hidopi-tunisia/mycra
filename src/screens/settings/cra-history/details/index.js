import { Calendar, M, WorkdaysTypes } from '@components';
import Modal from '@components/modals';
import Colors from '@constants/colors';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { s } from 'react-native-size-matters';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import styles from './index.styles';
import { getHistoryItem } from '@screens/home/composables';
import { getCRA } from '@domain/cra';

const CRAHistoryDetailsScreen = ({ onFocus, onBlur }) => {
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
  return !loadingFetch && cra ? (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <Text style={styles.textHeading}>My CRA</Text>
            <TouchableOpacity onPress={() => setModalHelpVisible(true)}>
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
                  Project: {cra.project.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.containerCalendar}>
          <View style={styles.containerCalendarHeader}>
            <Text style={styles.containerCalendarTitle}>{currentMonth}</Text>
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
            <Text>Working</Text>
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
            <Text>Half day</Text>
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
            <Text>Remote</Text>
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
        <Text>Unavailable</Text>
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
            <Text>Off</Text>
          </View>
        </View>
        <M v2 />
        <View style={styles.containerButton}>
          <Button
            style={styles.buttonSubmit}
            status="control"
            onPress={handleSubmit}>
            CRA is pending
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
            CRA submitted
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
            CRA rejected
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
            CRA approved
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
        <Text>Days summary:</Text>
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
            <Text>Working ({cra.working?.length})</Text>
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
            <Text>Half ({cra.half?.length})</Text>
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
            <Text>Remote ({cra.remote?.length})</Text>
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
        <Text>Unavailable</Text>
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
            <Text>Off ({cra.off?.length})</Text>
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
            <Text>Weekends ({cra.weekends?.length})</Text>
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
            <Text>Holiday ({cra.holidays?.length})</Text>
          </View>
        </View>
      </Modal>
      <Modal
        title="Holiday"
        type="info"
        visible={modalHolidayVisible}
        onPressPositive={handlePressHolidayPositive}>
        {holiday && (
          <Text>
            {holiday.date} is a holiday called "{holiday.name}".
          </Text>
        )}
      </Modal>
      <Modal
        title="Weekend"
        type="info"
        visible={modalWeekendVisible}
        onPressPositive={handlePressWeekendPositive}>
        {weekend && <Text>{weekend.date} is a weekend.</Text>}
      </Modal>
      <Modal
        title="Help"
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>Fill your working days accordingly.</Text>
        <Text>Long press on a day to view more options.</Text>
        <M v2 />
        <Text>Legend:</Text>
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
            <Text>Working</Text>
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
            <Text>Half day</Text>
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
            <Text>Remote</Text>
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
        <Text>Unavailable</Text>
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
            <Text>Off</Text>
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
            <Text>Weekend</Text>
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
            <Text>Holiday</Text>
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
