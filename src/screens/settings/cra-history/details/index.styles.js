import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.GRAY_LIGHT_PRIMARY,
    paddingBottom: 36,
  },
  top: {
    backgroundColor: Colors.ORANGE_DARK_PRIMARY,
    height: '40%',
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBack: {
    alignSelf: 'flex-start',
    marginLeft: 28
  },
  containerDescription: {
    width: '80%',
    alignSelf: 'center',
  },
  containerHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLegends: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  containerLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shapeLegend: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  containerButton: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonSubmit: {
    borderRadius: 24,
  },
  textHeading: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.WHITE,
  },
  textDescription: {
    color: Colors.WHITE,
  },
  textWarning: {
    color: Colors.YELLOW_DARK_PRIMARY,
    textAlign: 'center',
    borderColor: Colors.YELLOW_DARK_PRIMARY,
    borderWidth: 2,
    padding: 6,
    borderRadius: 16,
  },
  middle: {
    backgroundColor: Colors.WHITE,
    height: '60%',
    borderRadius: 48,
    alignSelf: 'center',
    width: '90%',
    bottom: 48,
    borderWidth: 3,
    borderColor: Colors.ORANGE_DARK_PRIMARY,
  },
  containerCalendar: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  containerCalendarHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCalendarTitle: {
    color: Colors.ORANGE_DARK_PRIMARY,
    fontSize: 22,
    fontWeight: '900',
  },
  containerCalendarStatus: {
    fontSize: 14,
    fontWeight: '700',
  },
  calendarDayWorking: {
    container: {
      backgroundColor: Colors.ORANGE_PRIMARY,
      borderWidth: 2,
      borderColor: Colors.ORANGE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
  calendarHalfDay: {
    container: {
      backgroundColor: Colors.WHITE,
      borderWidth: 2,
      borderColor: Colors.BLUE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.BLUE_PRIMARY,
    },
  },
  calendarDayRemote: {
    container: {
      backgroundColor: Colors.PURPLE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
  calendarDayOff: {
    container: {
      backgroundColor: Colors.WHITE,
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: Colors.RED_PRIMARY,
    },
    text: {
      color: Colors.RED_PRIMARY,
    },
  },
  calendarDayWeekend: {
    container: {
      backgroundColor: Colors.WHITE,
      borderWidth: 2,
      borderColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.GREEN_PRIMARY,
    },
  },
  calendarDayHoliday: {
    container: {
      backgroundColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
});

export default styles;
