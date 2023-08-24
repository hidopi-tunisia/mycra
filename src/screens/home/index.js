import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Calendar, M } from '@components';
import { getToday, getDaysInMonth } from '@utils/dates';
import styles from './index.styles';
import { postCRA } from '@domain/cra';

const HomeScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCount, setSelectedCount] = useState(null);
  useEffect(() => {
    const month = getToday().substring(0, 7);
    const days = getDaysInMonth(month);
    const marked = {};
    setSelectedCount(days.length);
    for (let i = 1; i <= days.length; i++) {
      marked[days[i]] = { selected: true };
      setMarkedDates(marked);
    }
  }, []);
  const handleSelected = day => {
    if (markedDates[day.dateString] && markedDates[day.dateString].selected) {
      setMarkedDates({ ...markedDates, [day.dateString]: { selected: false } });
    } else {
      setMarkedDates({ ...markedDates, [day.dateString]: { selected: true } });
    }
  };
  const handleSubmit = () => {};
  const handleSubmit2 = () => {
    const fn = async () => {
      try {
        const payload = {
          datesNonTravaillees: [
            {
              date: '2023-08-03',
              raison: 'CP',
            },
            {
              date: '2023-08-05',
              raison: 'CP',
            },
            {
              date: '2023-08-10',
              raison: 'CP',
            },
          ],
        };

        const { data } = await postCRA(payload);
        console.log('DATAAAA');
        console.log(data);
        console.log('DATAAAA');
      } catch (error) {
        console.log('ERROR');
        console.log(error);
        console.log('ERROR');
      }
    };
    fn();
  };
  const handleSelectAll = () => {
    Alert.alert(
      'Select all?',
      'Are you sure to deselect all days in this month?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const month = getToday().substring(0, 7);
            const days = getDaysInMonth(month);
            const marked = {};
            for (let i = 1; i <= days.length; i++) {
              marked[days[i]] = { selected: true };
            }
            setMarkedDates(marked);
          },
        },
      ],
    );
  };
  const handleDeselectAll = () => {
    Alert.alert(
      'Deselect all?',
      'Are you sure to deselect all days in this month?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const month = getToday().substring(0, 7);
            const days = getDaysInMonth(month);
            const marked = {};
            for (let i = 1; i <= days.length; i++) {
              marked[days[i]] = { selected: false };
            }
            setMarkedDates(marked);
          },
        },
      ],
    );
  };
  return (
    <Layout style={styles.root}>
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
    </Layout>
  );
};

export default HomeScreen;
