import axios from 'axios';
import { getAuthorization } from '@domain/auth';
import { ENDPOINT } from '@constants';

const getProfile = async ({ populate } = {}) => {
  const authorization = await getAuthorization();
  return axios.get(`${ENDPOINT}/me?populate=${populate}`, {
    headers: {
      authorization,
    },
  });
};

const getCurrentCRAs = async () => {
  const authorization = await getAuthorization();
  return axios.get(`${ENDPOINT}/me/cras/current`, {
    headers: {
      authorization,
    },
  });
};

const createCRA = async (projectId, payload) => {
  const authorization = await getAuthorization();
  return axios.post(`${ENDPOINT}/me/projects/${projectId}/cras`, payload, {
    headers: {
      authorization,
    },
  });
};

export { getProfile, getCurrentCRAs, createCRA };
