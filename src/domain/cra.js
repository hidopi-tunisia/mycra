import axios from 'axios';
import { ENDPOINT } from '@utils/constants';
import { getAuthorization } from './auth';

const postCRA = async (payload) => {
  const authorization = await getAuthorization();
  return axios.post(`${ENDPOINT}/cra/postCra`, payload, {
    headers: {
      authorization,
    },
  });
};

const getCRAHistory = async () => {
  const { uid } = await getAuthorization();
  return axios.get(`${ENDPOINT}/consultant/historique-cra/${uid}`);
};

const getCRAHistory2 = async () => {
  const { uid } = await getAuthorization();
  return axios.get(`${ENDPOINT}/cra/getall-cra`);
};
const getCRAHistory_ = getCRAHistory2;
export { getCRAHistory, getCRAHistory_, postCRA };
