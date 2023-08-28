import axios from 'axios';
import { getAuthorization } from './auth';
import { ENDPOINT } from '@constants';

const getProfile = async () => {
  const { uid } = await getAuthorization();
  return axios.get(`${ENDPOINT}/consultant/consultant/${uid}`);
};

export { getProfile };
