import { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import {
  Calendar,
  ButtomSheet,
  WorkdaysCollection,
  WorkdaysTypes,
  M,
} from '@components';
import { WORKDAYS_ITEMS } from '@constants';
import { getToday, getDaysInMonth } from '@utils/dates';
import styles from './index.styles';
import { postCRA } from '@domain/cra';
import Modal from '@components/modals';
import { getHolidays } from '@domain/days';
import Colors from '@utils/colors';

const HomeScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCount, setSelectedCount] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [weekend, setWeekend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeselectAllVisible, setModalDeselectAllVisible] = useState(false);
  const [modalSelectAllVisible, setModalSelectAllVisible] = useState(false);
  const [modalHolidayVisible, setModalHolidayVisible] = useState(false);
  const [modalWeekendVisible, setModalWeekendVisible] = useState(false);
  useEffect(() => {
    const fn = async () => {
      try {
        const year = getToday().substring(0, 4);
        const month = getToday().substring(5, 7);
        const days = getDaysInMonth(`${year}-${month}`);
        const { data } = await getHolidays(year);
        const holidaysDays = data.filter(
          d => d.date.substring(0, 7) === `${year}-${month}`,
        );
        const marked = {};
        setSelectedCount(days.length);
        for (let i = 0; i < days.length; i++) {
          const today = new Date(days[i]).getDay();
          if (today === 6 || today === 0) {
            marked[days[i]] = {
              type: WorkdaysTypes.WEEKEND,
              customStyles: styles.calendarDayWeekend,
            };
          } else {
            marked[days[i]] = {
              type: WorkdaysTypes.WORKED,
              customStyles: styles.calendarDayWorked,
            };
          }
        }
        for (let i = 0; i < holidaysDays.length; i++) {
          for (let j = 0; j < Object.keys(marked).length; j++) {
            if (Object.keys(marked)[j] === holidaysDays[i].date) {
              marked[Object.keys(marked)[j]] = {
                ...marked[Object.keys(marked)[j]],
                type: WorkdaysTypes.HOLIDAY,
                payload: {
                  value: holidaysDays[i].nom_jour_ferie,
                },
                customStyles: styles.calendarDayHoliday,
              };
            }
          }
        }
        print(marked);
        setMarkedDates(marked);
      } catch (error) {
        console.log('"ERRRRRR');
        console.log(error);
        console.log('"ERRRRRR');
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
        console.log(arr);
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
        // const { data } = await postCRA(payload);
        p(payload);
        setModalVisible(false);
      } catch (error) {
        console.log('ERROR');
        console.log(error);
        console.log('ERROR');
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
      <View style={styles.containerDescription}>
        <Text style={styles.textHeading}>My CRA</Text>
        <Text>Please fill your CRA before the end of the current month.</Text>
        <Text style={styles.textDescription}>
          The month is already prefilled.
        </Text>
      </View>
      <View>
        <View style={styles.containerCalendar}>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleSelected}
            onDayLongPress={handleLongPress}
          />
        </View>
        <M v4 />
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleSelectAll}>
            <Text style={styles.textButtonSmall}>Select all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button
          style={styles.buttonSubmit}
          status="primary"
          onPress={handleSubmit}>
          Submit
        </Button>
        <Text style={styles.textSelectedDays}>
          Selected days ({selectedCount})
        </Text>
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
      <ButtomSheet height={480} onCallbackRef={handleRefBottomSheet}>
        <WorkdaysCollection
          items={WORKDAYS_ITEMS}
          workday={workday}
          onPress={handlePressWorkdaysItem}
        />
      </ButtomSheet>
    </Layout>
  );
};

export default HomeScreen;
