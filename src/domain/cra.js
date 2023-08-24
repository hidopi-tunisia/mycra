const { getAuthorization } = require('./auth');

const getCRAHistory = async () => {
  const { uid } = await getAuthorization();
  return axios.get(`${ENDPOINT}/consultant/historique-cra/${uid}`);
};

const getCRAHistory2 = async () => {
  const { uid } = await getAuthorization();
  return axios.get(`${ENDPOINT}/getall-cra`);
};
const getCRAHistory_ = getCRAHistory2;
export { getCRAHistory, getCRAHistory_ };
