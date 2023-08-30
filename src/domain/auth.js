import auth from '@react-native-firebase/auth';

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
export { onAuthStateChanged, signIn, signOut, currentUser };
