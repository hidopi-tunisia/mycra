import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import {
  Calendar,
  BottomSheet,
  WorkdaysCollection,
  WorkdaysTypes,
  M,
} from '@components';
import { WORKDAYS_ITEMS } from '@constants';
import styles from './index.styles';
import { postCRA } from '@domain/cra';
import Modal from '@components/modals';
import { getHolidays, getWeekends } from '@domain/miscs';
import Colors from '@constants/colors';
import moment from 'moment';
import { PermissionsAndroid } from 'react-native';
import { getCurrentCRAs, getProfile } from '@domain/me';
import { getProjects, subscribeToConsultantTopic } from './composables';

const HomeScreen = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [projects, setProjects] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCount, setSelectedCount] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [holiday, setHoliday] = useState(null);
  const [weekend, setWeekend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHolidayVisible, setModalHolidayVisible] = useState(false);
  const [modalWeekendVisible, setModalWeekendVisible] = useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  useEffect(() => {
    subscribeToConsultantTopic();
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        const ps = await getProjects();
        setProjects(ps);
      } catch (error) {
        console.info(error);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await getCurrentCRAs();
        if (data && Array.isArray(data.rejected) && data.rejected.length > 0) {
          console.log('rejected', rejected);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  });
  useEffect(() => {
    const fn = async () => {
      try {
        const { data: holidays } = await getHolidays();
        const {
          data: { saturdays, sundays },
        } = await getWeekends();
        const marked = {};
        const weekends = [...saturdays, ...sundays];
        Array.from(
          {
            length: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0,
            ).getDate(),
          },
          (_, i) => i + 1,
        ).forEach(d => {
          const str = new Date(new Date().setDate(d))
            .toISOString()
            .substring(0, 10);
          marked[str] = {
            type: WorkdaysTypes.WORKED,
            customStyles: styles.calendarDayWorked,
          };
          weekends.forEach(element => {
            if (element === d) {
              marked[str] = {
                type: WorkdaysTypes.WEEKEND,
                customStyles: styles.calendarDayWeekend,
              };
            }
          });
          holidays.forEach(element => {
            if (element.date === str) {
              marked[str] = {
                type: WorkdaysTypes.HOLIDAY,
                payload: {
                  value: element.nom_jour_ferie,
                },
                customStyles: styles.calendarDayHoliday,
              };
            }
          });
        });
        setMarkedDates(marked);
        setLoadingFetch(false);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    const selectedDates = Object.keys(markedDates).filter(
      d => markedDates[d].type === WorkdaysTypes.WORKED,
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
        name: markedDates[day.dateString].payload.value,
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
            type: WorkdaysTypes.WORKED,
            customStyles: styles.calendarDayWorked,
          },
        });
      } else {
        setMarkedDates({
          ...markedDates,
          [day.dateString]: {
            type: WorkdaysTypes.OFF,
            payload: {
              value: 'CP',
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
          if (markedDates[k].type === WorkdaysTypes.WORKED) {
            return {
              date: k,
              type: WorkdaysTypes.WORKED,
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
              raison: markedDates[k].payload.value,
            };
          }
        });
        const datesTravaillees = arr.filter(
          e => e && e.type === WorkdaysTypes.WORKED,
        );
        const datesDemiTravaillees = arr.filter(
          e => e && e.type === WorkdaysTypes.HALF,
        );
        const datesTeleTravaillees = arr.filter(
          e => e && e.type === WorkdaysTypes.REMOTE,
        );
        const datesNonTravaillees = arr.filter(
          e => e && e.type === WorkdaysTypes.OFF,
        );
        const payload = {
          datesTravaillees,
          datesDemiTravaillees,
          datesTeleTravaillees,
          datesNonTravaillees,
        };
        const { data } = await postCRA(payload);
        p(payload);
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
  const handleSelectAll = () => {
    setWorkday(null);
    refBottomSheet.open();
  };
  const handlePressBottomSheetClose = () => {
    refBottomSheet.close();
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
      if (item.type === WorkdaysTypes.WORKED) {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.WORKED,
            customStyles: styles.calendarDayWorked,
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
      } else if (item.type === 'off') {
        setMarkedDates({
          ...markedDates,
          [workday.dateString]: {
            type: WorkdaysTypes.OFF,
            payload: { value: item.value },
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
          if (item.type === WorkdaysTypes.WORKED) {
            marked[d] = {
              type: WorkdaysTypes.WORKED,
              customStyles: styles.calendarDayWorked,
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
          } else if (item.type === WorkdaysTypes.OFF) {
            marked[d] = {
              type: WorkdaysTypes.OFF,
              payload: { value: item.value },
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
          <Text style={styles.textDescription}>
            Please fill your CRA before the end of the current month.
          </Text>
          {/* <Text style={styles.textWarning}>
            The month is already prefilled.
          </Text> */}
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.containerCalendar}>
          <View style={styles.containerCalendarHeader}>
            <Text style={styles.containerCalendarTitle}>{currentMonth}</Text>
            <TouchableOpacity onPress={handleSelectAll}>
              <Icon
                fill={Colors.GRAY_PRIMARY}
                name="done-all-outline"
                width={24}
                height={24}
              />
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
            <Text>Worked</Text>
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
            <Text>Worked</Text>
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

export default HomeScreen;
