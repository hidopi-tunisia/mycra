import moment from 'moment';

const getToday = () => moment().format('YYYY-MM-DD');
const getDaysInMonth = (month) => {
  const days = Array.from(Array(moment(month).daysInMonth() + 1).keys());
  return days.map((day) => {
    if (day < 10) {
      return `${month}-0${day}`;
    }
    return `${month}-${day}`;
  });
};

export { getToday, getDaysInMonth };
