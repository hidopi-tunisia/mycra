import { Calendar, M, WorkdaysTypes } from '@components';
import BottomSheet from '@components/bottom-sheet';
import Modal from '@components/modals';
import WorkdaysCollection from '@components/workdays-collection';
import { WORKDAYS_ITEMS } from '@constants';
import Colors from '@constants/colors';
import { updateCRA } from '@domain/me';
import { getHolidays, getWeekends } from '@domain/miscs';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
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

const RejectedCRAs = ({ cra, projects, onFocus, onBlur }) => {
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
  const [modalRejectionMotiveVisible, setModalRejectionMotiveVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHolidayVisible, setModalHolidayVisible] = useState(false);
  const [modalWeekendVisible, setModalWeekendVisible] = useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.RED_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(Colors.RED_PRIMARY, 'light');
      onFocus(Colors.RED_DARK_PRIMARY);
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_DARK_PRIMARY);
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
      };
    });
    working.forEach(element => {
      marked[element.date] = {
        type: WorkdaysTypes.WORKING,
        customStyles: styles.calendarDayWorking,
      };
    });
    half.forEach(element => {
      marked[element.date] = {
        type: WorkdaysTypes.HALF,
        customStyles: styles.calendarHalfDay,
      };
    });
    remote.forEach(element => {
      marked[element.date] = {
        type: WorkdaysTypes.REMOTE,
        customStyles: styles.calendarDayRemote,
      };
    });
    off.forEach(element => {
      marked[element.date] = {
        type: WorkdaysTypes.OFF,
        customStyles: styles.calendarDayOff,
        meta: {
          value: element.meta.value,
        },
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
    } else {
      if (
        markedDates[day.dateString] &&
        markedDates[day.dateString].type === WorkdaysTypes.OFF
      ) {
        setMarkedDates({
          ...markedDates,
          [day.dateString]: {
            type: WorkdaysTypes.WORKING,
            customStyles: styles.calendarDayWorking,
          },
        });
      } else {
        setMarkedDates({
          ...markedDates,
          [day.dateString]: {
            type: WorkdaysTypes.OFF,
            meta: {
              value: 'Paid leave',
            },
            customStyles: styles.calendarDayOff,
          },
        });
      }
    }
  };
  const [workday, setWorkday] = useState(null);
  const handleLongPress = day => {
    setWorkday({ ...markedDates[day.dateString], dateString: day.dateString });
    refBottomSheet.open();
  };
  const handlePressPositive = () => {
    const fn = async () => {
      try {
        setLoadingSubmit(false);
        setErrorSubmit(null);
        const arr = Object.keys(markedDates).map(k => {
          if (markedDates[k].type === WorkdaysTypes.WORKING) {
            return {
              date: k,
              type: WorkdaysTypes.WORKING,
            };
          } else if (markedDates[k].type === WorkdaysTypes.HALF) {
            return {
              date: k,
              type: WorkdaysTypes.HALF,
            };
          } else if (markedDates[k].type === WorkdaysTypes.REMOTE) {
            return {
              date: k,
              type: WorkdaysTypes.REMOTE,
            };
          } else if (markedDates[k].type === WorkdaysTypes.OFF) {
            return {
              date: k,
              type: WorkdaysTypes.OFF,
              meta: {
                value: markedDates[k].meta.value,
              },
            };
          }
          // else if (markedDates[k].type === WorkdaysTypes.UNAVAILABLE) {
          //   return {
          //     date: k,
          //     type: WorkdaysTypes.UNAVAILABLE,
          //   };
          // } -- TODO: Unavailable
        });
        const working = arr.filter(e => e && e.type === WorkdaysTypes.WORKING);
        const half = arr.filter(e => e && e.type === WorkdaysTypes.HALF);
        const remote = arr.filter(e => e && e.type === WorkdaysTypes.REMOTE);
        // const unavailable = arr.filter(
        //   e => e && e.type === WorkdaysTypes.UNAVAILABLE,
        // ) -- TODO: Unavailable;
        const off = arr.filter(e => e && e.type === WorkdaysTypes.OFF);
        const payload = {
          working,
          half,
          remote,
          off,
          // unavailable, -- TODO: Unavailable
        };
        await updateCRA(cra._id, payload);
        setLoadingSubmit(false);
        setModalVisible(false);
      } catch (error) {
        setLoadingSubmit(false);
        setErrorSubmit(error);
        console.info('ERROR');
        console.info(error);
        console.info('ERROR');
      }
    };
    fn();
  };
  const handlePressNegative = () => {
    setModalVisible(false);
  };
  const handleSubmit = () => {
    setModalVisible(true);
  };
  const handleViewRejectionMotive = () => {
    setModalRejectionMotiveVisible(true);
  };
  const handleRejectionMotivePositive = () => {
    setModalRejectionMotiveVisible(false);
  };
  const handlePressHolidayPositive = () => {
    setHoliday(null);
    setModalHolidayVisible(false);
  };
  const handlePressWeekendPositive = () => {
    setWeekend(null);
    setModalWeekendVisible(false);
  };
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const handleRefBottomSheet = ref => {
    setRefBottomSheet(ref);
  };
  const handlePressWorkdaysItem = item => {
    if (workday) {
      if (item.type === WorkdaysTypes.WORKING) {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.WORKING,
            customStyles: styles.calendarDayWorking,
          },
        });
      } else if (item.type === 'half') {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.HALF,
            customStyles: styles.calendarHalfDay,
          },
        });
      } else if (item.type === 'remote') {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.REMOTE,
            customStyles: styles.calendarDayRemote,
          },
        });
      } else if (item.type === 'unavailable') {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.UNAVAILABLE,
            meta: { value: item.value },
            customStyles: styles.calendarDayUnavailable,
          },
        });
      } else if (item.type === 'off') {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.OFF,
            meta: { value: item.value },
            customStyles: styles.calendarDayOff,
          },
        });
      }
    } else {
      let marked = {};
      Object.keys(markedDates).forEach(d => {
        if (
          markedDates[d].type !== WorkdaysTypes.HOLIDAY &&
          markedDates[d].type !== WorkdaysTypes.WEEKEND
        ) {
          if (item.type === WorkdaysTypes.WORKING) {
            marked[d] = {
              type: WorkdaysTypes.WORKING,
              customStyles: styles.calendarDayWorking,
            };
          } else if (item.type === WorkdaysTypes.HALF) {
            marked[d] = {
              type: WorkdaysTypes.HALF,
              customStyles: styles.calendarHalfDay,
            };
          } else if (item.type === WorkdaysTypes.REMOTE) {
            marked[d] = {
              type: WorkdaysTypes.REMOTE,
              customStyles: styles.calendarDayRemote,
            };
          } else if (item.type === WorkdaysTypes.UNAVAILABLE) {
            marked[d] = {
              type: WorkdaysTypes.UNAVAILABLE,
              meta: { value: item.value },
              customStyles: styles.calendarDayUnavailable,
            };
          } else if (item.type === WorkdaysTypes.OFF) {
            marked[d] = {
              type: WorkdaysTypes.OFF,
              meta: { value: item.value },
              customStyles: styles.calendarDayOff,
            };
          }
        }
      });
      setMarkedDates({ ...markedDates, ...marked });
    }
    setWorkday(null);
    refBottomSheet.close();
  };
  const handlePressBottomSheetClose = () => {
    refBottomSheet.close();
  };
  return (
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
          <TouchableOpacity disabled={projects.length < 2}>
            <View style={styles.containerProjects}>
              <Text style={styles.textDescription}>
                Project - {selectedProject.name}
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
            <TouchableOpacity onPress={handleViewRejectionMotive}>
              <View style={styles.buttonRejectionMotive}>
                <Text style={styles.textButtonRejectionMotive}>Rejected</Text>
              </View>
            </TouchableOpacity>
          </View>
          <M v1 />
          <Calendar
            markedDates={markedDates}
            onDayPress={handleSelected}
            onDayLongPress={handleLongPress}
          />
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
            status="primary"
            onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </View>
      <Modal
        title="Submit days?"
        type="confirm"
        visible={modalVisible}
        onPressNegative={handlePressNegative}
        onPressPositive={handlePressPositive}>
        <Text>Are you sure to submit {selectedCount} days for this month?</Text>
      </Modal>
      <Modal
        title="Rejected"
        type="confirm"
        visible={modalRejectionMotiveVisible}
        onPressPositive={handleRejectionMotivePositive}>
        <Text>CRA rejected at XXXX-XX-XX</Text>
        <Text>This is because of -----</Text>
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
      <BottomSheet height={480} onCallbackRef={handleRefBottomSheet}>
        <WorkdaysCollection
          items={WORKDAYS_ITEMS}
          workday={workday}
          onPress={handlePressWorkdaysItem}
          onPressClose={handlePressBottomSheetClose}
        />
      </BottomSheet>
    </Layout>
  );
};

export default RejectedCRAs;
