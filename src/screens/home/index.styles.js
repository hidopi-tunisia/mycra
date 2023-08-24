import Colors from '@utils/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
  },
  containerDescription: {
    padding: 8,
  },
  textDescription: {
    fontWeight: '700',
    color: Colors.BLUE_PRIMARY,
  },
  containerButtons: {
    justifyContent: 'space-between',
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
    fontWeight: "800"
  },
  calendarDayWeekend: {
    container: {
      backgroundColor: Colors.WHITE,
      borderWidth: 2,
      borderColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: 'black',
    },
  },
  calendarDayHoliday: {
    container: {
      backgroundColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    }
  },
});

export default styles;
