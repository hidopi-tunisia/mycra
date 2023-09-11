import auth from '@react-native-firebase/auth';

const updateProfile = async ({ displayName }) => {
  return auth().currentUser.updateProfile({ displayName });
};
const signIn = ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password);
};
const signOut = () => {
  return auth().signOut();
};
const onAuthStateChanged = callback => {
  auth().onAuthStateChanged(callback);
};
const currentUser = () => {
  return auth().currentUser;
};
const getAuthorization = () => {
  return auth().currentUser.getIdToken(true);
};
const sendPasswordResetEmail = email => {
  return auth().sendPasswordResetEmail(email);
};
export {
  updateProfile,
  onAuthStateChanged,
  signIn,
  signOut,
  currentUser,
  getAuthorization,
  sendPasswordResetEmail,
};
