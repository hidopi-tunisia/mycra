import axios from 'axios';
import { ENDPOINT } from '@constants';
import { getAuthorization } from './auth';

const postCRA = async payload => {
  const authorization = await getAuthorization();
  return axios.post(`${ENDPOINT}/cra/postCra`, payload, {
    headers: {
      authorization,
    },
  });
};

const getCRAHistory = async ({ sort = 'DESC', page = 1, limit = 2 } = {}) => {
  // const { uid } = await getAuthorization();
  const authorization = await getAuthorization();
  const uid = '64820b713937a729af5cc814';
  return axios.get(
    `${ENDPOINT}/consultant/historique-cra/${uid}?sort=${sort}&limit=${limit}&page=${page}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

const getAllCRAs = async ({ sort = 'DESC', page = 0, limit = 1 } = {}) => {
  // const { uid } = await getAuthorization();
  const authorization = await getAuthorization();
  return axios.get(
    `${ENDPOINT}/cra/getall-cra?sort=${sort}&limit=${limit}&page=${page}`,
    {
      headers: {
        authorization,
      },
    },
  );
};

export { getCRAHistory, getAllCRAs, postCRA };
