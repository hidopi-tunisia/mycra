import axios from 'axios';
import { ENDPOINT } from '@constants';
import { getAuthorization } from './auth';

export const HolidayCountries = {
  FRANCE: 'fr',
};
const getHolidays = async (
  country = HolidayCountries.FRANCE,
  year = new Date().getFullYear(),
) => {
  const authorization = await getAuthorization();
  return axios.get(
    `${ENDPOINT}/miscs/dates/holidays?country=${country}&year=${year}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

const getWeekends = async (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
) => {
  const authorization = await getAuthorization();
  return axios.get(
    `${ENDPOINT}/miscs/dates/weekends?year=${year}&month=${month}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

export { getHolidays, getWeekends };
