import moment from 'moment';

const getToday = () => moment().format('YYYY-MM-DD');
function getDaysInMonth(month) {
  const [year, monthStr] = month.split('-');
  const yearInt = parseInt(year);
  const monthInt = parseInt(monthStr) - 1; // Adjust for 0-based indexing
  const daysInMonth = new Date(yearInt, monthInt + 1, 0).getDate();
  
  const result = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = day.toString().padStart(2, '0');
    const formattedDate = `${year}-${monthStr}-${dayStr}`;
    result.push(formattedDate);
  }
  
  return result;
}

export { getToday, getDaysInMonth };
