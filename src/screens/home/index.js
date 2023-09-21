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
import NoProjects from './components/no-projects';

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
    <NoProjects />
  );
};

export default HomeScreen;
