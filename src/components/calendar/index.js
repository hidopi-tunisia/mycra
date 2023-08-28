import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';

const Calendar = ({ markedDates, onDayPress, onDayLongPress }) => (
  <RNCalendar
    hideArrows
    disableMonthChange
    hideExtraDays
    markedDates={markedDates}
    markingType={'custom'}
    onDayPress={onDayPress}
    onDayLongPress={onDayLongPress}
  />
);
export default Calendar;
