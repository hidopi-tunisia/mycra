import { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Calendar, M } from '@components';
import { getToday, getDaysInMonth } from '@utils/dates';
import styles from './index.styles';
import { postCRA } from '@domain/cra';
import Modal from '@components/modals';
import { getHolidays } from '@domain/days';
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
              weekend: true,
              selected: false,
              customStyles: styles.calendarDayWeekend,
            };
          } else {
            marked[days[i]] = {
              selected: true,
            };
          }
        }
        for (let i = 0; i < holidaysDays.length; i++) {
          for (let j = 0; j < Object.keys(marked).length; j++) {
            if (Object.keys(marked)[j] === holidaysDays[i].date) {
              marked[Object.keys(marked)[j]] = {
                ...marked[Object.keys(marked)[j]],
                holiday: holidaysDays[i].nom_jour_ferie,
                selected: false,
                customStyles: styles.calendarDayHoliday,
              };
            }
          }
        }
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
      d => markedDates[d].selected === true,
    );
    setSelectedCount(selectedDates.length);
  }, [markedDates]);
  const handleSelected = day => {
    if (markedDates[day.dateString].holiday) {
      setHoliday({
        date: day.dateString,
        name: markedDates[day.dateString].holiday,
      });
      setModalHolidayVisible(true);
    } else if (markedDates[day.dateString].weekend) {
      setWeekend({
        date: day.dateString,
      });
      setModalWeekendVisible(true);
    } else {
      if (markedDates[day.dateString] && markedDates[day.dateString].selected) {
        setMarkedDates({
          ...markedDates,
          [day.dateString]: { selected: false },
        });
      } else {
        setMarkedDates({
          ...markedDates,
          [day.dateString]: { selected: true },
        });
      }
    }
  };
  const handlePressPositive = () => {
    const fn = async () => {
      try {
        setModalVisible(false);
        const arr = Object.keys(markedDates).map(k => {
          if (
            markedDates[k].selected === false &&
            !markedDates[k].weekend &&
            !markedDates[k].holiday
          ) {
            return {
              date: k,
              raison: 'CP',
            };
          }
        });
        const datesNonTravaillees = arr.filter(e => e !== undefined);
        const payload = { datesNonTravaillees };
        // const { data } = await postCRA(payload);
        console.log(JSON.stringify(data, null, 2));
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
  const handlePressSelectAllNegative = () => {
    setModalSelectAllVisible(false);
  };
  const handlePressSelectAllPositive = () => {
    let marked = {};
    Object.keys(markedDates).forEach(d => {
      if (markedDates[d].holiday || markedDates[d].weekend) {
        marked[d] = { ...markedDates[d], selected: false };
      } else {
        marked[d] = { ...markedDates[d], selected: true };
      }
    });
    setMarkedDates(marked);
    setModalSelectAllVisible(false);
  };
  const handlePressDeselectAllNegative = () => {
    setModalDeselectAllVisible(false);
  };
  const handlePressDeselectAllPositive = () => {
    let marked = {};
    Object.keys(markedDates).forEach(d => {
      marked[d] = { ...markedDates[d], selected: false };
    });
    setMarkedDates(marked);
    setModalDeselectAllVisible(false);
  };
  const handleSelectAll = () => {
    setModalSelectAllVisible(true);
  };
  const handleDeselectAll = () => {
    setModalDeselectAllVisible(true);
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
      <View style={styles.containerDescription}>
        <Text>Please fill your CRA before the end of the current month.</Text>
        <Text style={styles.textDescription}>
          The month is already prefilled.
        </Text>
      </View>
      <View>
        <Calendar onSelect={handleSelected} markedDates={markedDates} />
        <M v4 />
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleSelectAll}>
            <Text style={styles.textButtonSmall}>Select all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleDeselectAll}>
            <Text style={styles.textButtonSmall}>Deselect all</Text>
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
        title="Select all?"
        type="confirm"
        visible={modalSelectAllVisible}
        onPressNegative={handlePressSelectAllNegative}
        onPressPositive={handlePressSelectAllPositive}>
        <Text>Are you sure to select all days in this month?</Text>
      </Modal>
      <Modal
        title="Deselect all?"
        type="confirm"
        visible={modalDeselectAllVisible}
        onPressNegative={handlePressDeselectAllNegative}
        onPressPositive={handlePressDeselectAllPositive}>
        <Text>Are you sure to deselect all days in this month?</Text>
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
    </Layout>
  );
};

export default HomeScreen;
