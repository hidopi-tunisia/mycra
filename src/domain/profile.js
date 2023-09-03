import axios from 'axios';
import { currentUser, getAuthorization } from '@domain/auth';
import { ENDPOINT } from '@constants';

const getProfile = async () => {
  const authorization = await getAuthorization();
  const uid = '64820b713937a729af5cc814';
  return axios.get(`${ENDPOINT}/consultant/consultant/${uid}`, {
    headers: {
      authorization,
    },
  });
};

export { getProfile };
