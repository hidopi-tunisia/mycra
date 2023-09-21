import { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { Calendar, BottomSheet, WorkdaysTypes, M } from '@components';
import { getDaysInMonth } from '@utils/dates';
import styles from './index.styles';
import Modal from '@components/modals';
import Colors from '@constants/colors';
import moment from 'moment';
import CRAHistoryDetailsForm from '@components/cra-history-details-form';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { getCRA } from '@domain/cra';
import { getStatusType } from '../index.helpers';
import { renderColor } from '@components/cra-history-item';

const CRAHistoryDetailsScreen = ({ onBlur, onFocus }) => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [markedDates, setMarkedDates] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);
  const [initialDate, setInitialDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [status, setStatus] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [weekend, setWeekend] = useState(null);
  const [off, setOff] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [modalHolidayVisible, setModalHolidayVisible] = useState(false);
  const [modalWeekendVisible, setModalWeekendVisible] = useState(false);
  const [modalOffVisible, setModalOffVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.ORANGE_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(
        Colors.ORANGE_DARK_PRIMARY,
        'light',
      );
      onFocus();
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur();
      };
    }, []),
  );
  useEffect(() => {
    const fn = async () => {
      try {
        setLoadingFetch(false);
        setErrorFetch(null);
        const { data } = await getCRA(id);
        const year = data.date_debut_du_mois.substring(0, 4);
        const month = data.date_debut_du_mois.substring(5, 7);
        const day = data.date_debut_du_mois.substring(8, 10);
        setStatus(data.status);
        setCurrentYear(year);
        setCurrentMonth(moment(`${year}-${month}-${day}`).format('MMMM'));
        setInitialDate(`${year}-${month}-${day}`);
        const days = getDaysInMonth(`${year}-${month}`);
        const marked = {};
        setSelectedCount(days.length);
        for (let i = 0; i < days.length; i++) {
          const today = new Date(days[i]).getDay();
          if (today === 6 || today === 0) {
            marked[days[i]] = {
              type: WorkdaysTypes.WEEKEND,
              customStyles: styles.calendarDayWeekend,
            };
          }
        }
        const { joursTravailles, datesNonTravaillees } = data;
        if (Array.isArray(joursTravailles) && joursTravailles.length > 0) {
          joursTravailles.forEach(j => {
            if (j.travaille) {
              const date = moment(j.date).format('YYYY-MM-DD');
              marked[date] = {
                type: WorkdaysTypes.WORKING,
                customStyles: styles.calendarDayWorking,
                disableTouchEvent: true,
              };
            } else if (j.nomJourFerieDuMois) {
              const date = moment(j.date).format('YYYY-MM-DD');
              marked[date] = {
                type: WorkdaysTypes.HOLIDAY,
                customStyles: styles.calendarDayHoliday,
                payload: {
                  value: j.nomJourFerieDuMois,
                },
              };
            }
          });
        }
        if (
          Array.isArray(datesNonTravaillees) &&
          datesNonTravaillees.length > 0
        ) {
          datesNonTravaillees.forEach(d => {
            const date = moment(d.date).format('YYYY-MM-DD');
            marked[date] = {
              type: WorkdaysTypes.OFF,
              customStyles: styles.calendarDayOff,
              payload: {
                value: d.raison,
              },
            };
          });
        }
        setMarkedDates(marked);
        setLoadingFetch(false);
      } catch (error) {
        setLoadingFetch(false);
        setErrorFetch(error);
        console.info(error);
      }
    };
    fn();
  }, []);
  const handleSubmit = () => {
    setModalVisible(true);
  };
  const [refBottomSheet, setRefBottomSheet] = useState(null);
  const handleReportIssue = () => {
    refBottomSheet.open();
  };
  const handleRefBottomSheet = ref => {
    setRefBottomSheet(ref);
  };
  const handlePressClose = () => {
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
  const handlePressOffPositive = () => {
    setOff(null);
    setModalOffVisible(false);
  };
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
    } else if (
      markedDates[day.dateString] &&
      markedDates[day.dateString].type === WorkdaysTypes.OFF
    ) {
      setOff({
        date: day.dateString,
        reason: markedDates[day.dateString].payload.value,
      });
      setModalOffVisible(true);
    }
  };
  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={handlePressBack}
          style={styles.containerBack}>
          <Icon
            width={36}
            height={36}
            name="chevron-left-outline"
            fill={Colors.WHITE}
          />
        </TouchableOpacity>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <Text style={styles.textHeading}>History</Text>
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
            Thank you for filling the data.
          </Text>
          {/* <Text style={styles.textWarning}>
            The month is already prefilled.
          </Text> */}
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.containerCalendar}>
          <View style={styles.containerCalendarHeader}>
            <Text style={styles.containerCalendarTitle}>
              {currentMonth} {currentYear}
            </Text>
            <Text
              style={{
                ...styles.containerCalendarStatus,
                color: renderColor(getStatusType(status)),
              }}>
              {status}
            </Text>
          </View>
          <M v1 />
          {initialDate && markedDates && (
            <Calendar
              initialDate={initialDate}
              markedDates={markedDates}
              onDayPress={handleSelected}
            />
          )}
        </View>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.ORANGE_PRIMARY,
                borderColor: Colors.ORANGE_PRIMARY,
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
                borderColor: Colors.ORANGE_PRIMARY,
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
            status="warning"
            style={styles.buttonSubmit}
            onPress={handleReportIssue}>
            Report an issue
          </Button>
        </View>
      </View>
      <Modal
        title="Help"
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>Thank you for filling the data.</Text>
        <M v2 />
        <Text>Legend:</Text>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.ORANGE_PRIMARY,
                borderColor: Colors.ORANGE_PRIMARY,
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
                borderColor: Colors.ORANGE_PRIMARY,
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
        title="Off"
        type="info"
        visible={modalOffVisible}
        onPressPositive={handlePressOffPositive}>
        {off && (
          <Text>
            The reason you were absent in {off.date} is ({off.reason}).
          </Text>
        )}
      </Modal>
      <BottomSheet height={300} onCallbackRef={handleRefBottomSheet}>
        <CRAHistoryDetailsForm
          onPressClose={handlePressClose}
          onSubmit={handleSubmit}
        />
      </BottomSheet>
    </Layout>
  );
};

export default CRAHistoryDetailsScreen;
