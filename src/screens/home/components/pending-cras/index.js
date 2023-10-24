import { Calendar, M, WorkdaysTypes } from '@components';
import Modal from '@components/modals';
import Colors from '@constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { s } from 'react-native-size-matters';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import styles from './index.styles';
import { getHistoryItem } from '@screens/home/composables';
import { i18n } from '@utils/translations';

const PendingCRAs = ({ cra, projects, onFocus, onBlur, onRefresh }) => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
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
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(Colors.PURPLE_DARK_PRIMARY);
      }
      SystemNavigationBar.setNavigationColor(Colors.PURPLE_PRIMARY, 'light');
      onFocus(Colors.PURPLE_DARK_PRIMARY);
      return () => {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        }
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_PRIMARY);
      };
    }, []),
  );
  useEffect(() => {
    const marked = {};
    const { working, half, remote, off, weekends, holidays } = cra;
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
  }, []);
  useEffect(() => {
    const selectedDates = Object.keys(markedDates).filter(
      d => markedDates[d].type === WorkdaysTypes.WORKING,
    );
    setSelectedCount(selectedDates.length);
  }, [markedDates]);
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
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
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <View style={styles.containerHeading}>
              <Text style={styles.textHeading}>My CRA</Text>
              <M h2 />
              <TouchableOpacity onPress={onRefresh}>
                <Icon
                  fill={Colors.WHITE}
                  name="refresh-outline"
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
            </View>
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
          <TouchableOpacity disabled={projects.length < 2}>
            <View style={styles.containerProjects}>
              <Text style={styles.textDescription}>
                {i18n.t('Home.pending-cras.Project')} - {selectedProject.name}
              </Text>
              <M h1 />
              {projects.length > 1 && (
                <Icon
                  fill={Colors.WHITE}
                  name="swap-outline"
                  width={s(16)}
                  height={s(16)}
                />
              )}
            </View>
          </TouchableOpacity>
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
            {i18n.t('Home.pending-cras.btn_submit')}
          </Button>
        </View>
      </View>
      <Modal
        title={i18n.t('Home.pending-cras.modal.title')}
        type="confirm"
        visible={modalVisible}
        onPressPositive={handlePressPositive}>
        <Text>
          {i18n.t('Home.pending-cras.modal.info')}
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
        <M v2 />
        <Text>{i18n.t('Home.pending-cras.modal.summary')}</Text>
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
              {i18n.t('Home.pending-cras.Working')} ({cra.working?.length})
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
              {i18n.t('Home.pending-cras.Half day')} ({cra.half?.length})
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
              {i18n.t('Home.pending-cras.Remote')} ({cra.remote?.length})
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
            <Text>{i18n.t('Home.pending-cras.Unavailable')}</Text>
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
              {i18n.t('Home.pending-cras.Off')} ({cra.off?.length})
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
              {i18n.t('Home.pending-cras.Weekends')} ({cra.weekends?.length})
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
              {i18n.t('Home.pending-cras.Holiday')} ({cra.holidays?.length})
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        title={i18n.t('Home.pending-cras.modalHoliday.title')}
        type="info"
        visible={modalHolidayVisible}
        onPressPositive={handlePressHolidayPositive}>
        {holiday && (
          <Text>
            {i18n.t('Home.pending-cras.modalHoliday.confirmation', {
              date: holiday.date,
              name: holiday.name,
            })}
          </Text>
        )}
      </Modal>
      <Modal
        title={i18n.t('Home.pending-cras.modalWeekend.title')}
        type="info"
        visible={modalWeekendVisible}
        onPressPositive={handlePressWeekendPositive}>
        {weekend && (
          <Text>
            {i18n.t('Home.pending-cras.modalWeekend.confirmation', {
              date: weekend.date,
            })}
          </Text>
        )}
      </Modal>
      <Modal
        title={i18n.t('Home.pending-cras.modalHelp.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('Home.pending-cras.modalHelp.description-1')}</Text>
        <Text>{i18n.t('Home.pending-cras.modalHelp.description-2')}</Text>
        <M v2 />
        <Text>{i18n.t('Home.pending-cras.modalHelp.legend')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Working')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Half day')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Remote')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Unavailable')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Off')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Weekend')}</Text>
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
            <Text>{i18n.t('Home.pending-cras.modalHelp.Holiday')}</Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default PendingCRAs;
