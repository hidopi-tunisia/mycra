import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { Calendar, BottomSheet, WorkdaysTypes, M } from '@components';
import { getToday, getDaysInMonth } from '@utils/dates';
import styles from './index.styles';
import Modal from '@components/modals';
import { getHolidays } from '@domain/days';
import Colors from '@constants/colors';
import moment from 'moment';
import { PermissionsAndroid } from 'react-native';
import CRAHistoryDetailsForm from '@components/cra-history-details-form';

const CRAHistoryDetailsScreen = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCount, setSelectedCount] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  useEffect(() => {
    SystemNavigationBar.setNavigationColor(Colors.ORANGE_DARK_PRIMARY, 'light');
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoadingFetch(false);
        setErrorFetch(null);
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
              disableTouchEvent: true,
            };
          } else {
            marked[days[i]] = {
              type: WorkdaysTypes.WORKED,
              customStyles: styles.calendarDayWorked,
              disableTouchEvent: true,
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
  return (
    <>
      <StatusBar backgroundColor={Colors.ORANGE_DARK_PRIMARY} barStyle="light-content" />
      <Layout style={styles.root}>
        <View style={styles.top}>
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
              <Text style={styles.containerCalendarTitle}>{currentMonth}</Text>
            </View>
            <M v1 />
            <Calendar
              markedDates={markedDates}
              onDayPress={() => {}}
              onDayLongPress={() => {}}
            />
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
              <Text>Worked</Text>
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
              <Text>Absent</Text>
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
              <Text>Worked</Text>
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
              <Text>Absent</Text>
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
        <BottomSheet height={300} onCallbackRef={handleRefBottomSheet}>
          <CRAHistoryDetailsForm
            onPressClose={handlePressClose}
            onSubmit={handleSubmit}
          />
        </BottomSheet>
      </Layout>
    </>
  );
};

export default CRAHistoryDetailsScreen;
