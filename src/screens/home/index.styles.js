import Colors from '@utils/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    justifyContent: 'space-around',
  },
  containerDescription: {
    padding: 16,
    borderRadius: 16,
  },
  textHeading: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.WHITE,
  },
  textDescription: {
    fontWeight: '700',
    color: Colors.BLUE_PRIMARY,
  },
  containerCalendar: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 16,
  },
  containerButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonSmall: {
    padding: 8,
  },
  textButtonSmall: {
    color: Colors.GRAY_SECONDARY_TEXT,
    fontSize: 14,
  },
  buttonSubmit: {
    borderRadius: 24,
  },
  textSelectedDays: {
    padding: 8,
    color: Colors.BLUE_DARK_PRIMARY,
    fontSize: 12,
    fontWeight: '800',
  },
  calendarDayWorked: {
    container: {
      backgroundColor: Colors.BLUE_PRIMARY,
      borderWidth: 2,
      borderColor: Colors.BLUE_PRIMARY,
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
