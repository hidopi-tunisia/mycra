import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';

const Calendar = ({ markedDates, onSelect }) => (
  <RNCalendar
    hideArrows
    disableMonthChange
    hideExtraDays
    onDayPress={onSelect}
    markedDates={markedDates}
  />
);
export default Calendar;
