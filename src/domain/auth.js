const user = {
  uid: '64b45d14042a0b88b9cf929a',
};
const getAuthorization = () => {
  return new Promise(resolve => resolve(user));
};

export { getAuthorization };
