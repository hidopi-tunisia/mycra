import axios from 'axios';
import { ENDPOINT } from '@constants';
import { getAuthorization } from './auth';

const getAlerts = async ({
  sort = 'desc',
  page = 0,
  limit = 12,
  populate = '',
} = {}) => {
  const authorization = await getAuthorization();
  return axios.get(
    `${ENDPOINT}/me/alerts?sort=${sort}&limit=${limit}&page=${page}&populate=${populate}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

const createAlert = async payload => {
  const authorization = await getAuthorization();
  return axios.post(`${ENDPOINT}/me/alerts`, payload, {
    headers: {
      authorization,
    },
  });
};

export { getAlerts, createAlert };
