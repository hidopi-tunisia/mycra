import axios from 'axios';

const ENDPOINT = 'https://jours-feries-france.antoine-augusti.fr/api';
const getHolidays = year => {
  return axios.get(`${ENDPOINT}/${year}`);
};
export { getHolidays };
