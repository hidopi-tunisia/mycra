import axios from 'axios';
import { getAuthorization } from '@domain/auth';
import { ENDPOINT } from '@constants';

const getCRA = async (id, { populate } = {}) => {
  const authorization = await getAuthorization();
  return axios.get(`${ENDPOINT}/cras/${id}?populate=${populate}`, {
    headers: {
      authorization,
    },
  });
};

export { getCRA };
