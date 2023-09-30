import {
  BottomSheet,
  Calendar,
  M,
  WorkdaysCollection,
  WorkdaysTypes,
} from '@components';
import Modal from '@components/modals';
import { WORKDAYS_ITEMS } from '@constants';
import Colors from '@constants/colors';
import { createCRA } from '@domain/me';
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
import { i18n } from '@utils/translations';

const NoCRAs = ({ projects, onFocus, onBlur }) => {
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
      StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
      onFocus(Colors.BLUE_PRIMARY);
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_PRIMARY);
      };
    }, []),
  );
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
      } catch (error) {
        console.info(error);
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
        await createCRA(selectedProject._id, payload);
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
                {i18n.t('Home.no-cra.Project')} - {selectedProject.name}
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
            <Text>{i18n.t('Home.no-cra.Working')}</Text>
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
            <Text>{i18n.t('Home.no-cra.Half day')}</Text>
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
            <Text>{i18n.t('Home.no-cra.Remote')}</Text>
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
            <Text>{i18n.t("Home.no-cra.Unavailable")}</Text>
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
            <Text>{i18n.t('Home.no-cra.Unavailable')}</Text>
          </View>
        </View>
        <M v2 />
        <View style={styles.containerButton}>
          <Button
            style={styles.buttonSubmit}
            status="primary"
            onPress={handleSubmit}>
            {i18n.t('Home.no-cra.btn_submit')}
          </Button>
        </View>
      </View>
      <Modal
        title={i18n.t('Home.no-cra.modal.title')}
        type="confirm"
        visible={modalVisible}
        onPressNegative={handlePressNegative}
        onPressPositive={handlePressPositive}>
        <Text>
          {i18n.t('Home.no-cra.modal.confirmation', { count: selectedCount })}
        </Text>
      </Modal>
      <Modal
        title={i18n.t('Home.no-cra.modalHoliday.title')}
        type="info"
        visible={modalHolidayVisible}
        onPressPositive={handlePressHolidayPositive}>
        {holiday && (
          <Text>
            {i18n.t('Home.no-cra.modalHoliday.confirmation', { date: holiday.date, name: holiday.name })}
          </Text>
        )}
      </Modal>
      <Modal
        title={i18n.t('Home.no-cra.modalWeekend.title')}
        type="info"
        visible={modalWeekendVisible}
        onPressPositive={handlePressWeekendPositive}>
        {weekend && <Text>{i18n.t('Home.no-cra.modalWeekend.confirmation', { date: weekend.date })}</Text>}
      </Modal>
      <Modal
        title={i18n.t('Home.no-cra.modalHelp.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('Home.no-cra.modalHelp.description-1')}</Text>
        <Text>{i18n.t('Home.no-cra.modalHelp.description-2')}</Text>
        <M v2 />
        <Text>{i18n.t('Home.no-cra.modalHelp.legend')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Working')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Half day')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Remote')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Unavailable')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Off')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Weekend')}</Text>
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
            <Text>{i18n.t('Home.no-cra.modalHelp.Holiday')}</Text>
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

export default NoCRAs;
