import { Calendar, M, WorkdaysTypes } from '@components';
import Modal from '@components/modals';
import Colors from '@constants/colors';
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

const PendingCRAs = ({ cra, projects, onFocus, onBlur }) => {
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
    p(cra);
  }, []);

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
            type: WorkdaysTypes.WORKING,
            customStyles: styles.calendarDayWorking,
            disableTouchEvent: true,
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
                meta: {
                  value: element.name,
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
      d => markedDates[d].type === WorkdaysTypes.WORKING,
    );
    setSelectedCount(selectedDates.length);
  }, [markedDates]);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);
  const [workday, setWorkday] = useState(null);
  const handleLongPress = day => {
    setWorkday({ ...markedDates[day.dateString], dateString: day.dateString });
    refBottomSheet.open();
  };
  const handlePressPositive = () => {
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
        title="Pending"
        type="confirm"
        visible={modalVisible}
        onPressPositive={handlePressPositive}>
        <Text>CRA submitted at XXXX-XX-XX</Text>
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
  );
};

export default PendingCRAs;
