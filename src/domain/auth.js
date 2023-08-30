import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  signOut as logout,
  onAuthStateChanged as onAuthStateUpdated,
} from 'firebase/auth';

const signIn = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const signOut = () => {
  return logout(auth);
};
const onAuthStateChanged = callback => {
  onAuthStateUpdated(auth, callback);
};
const currentUser = () => {
  return auth.currentUser;
};
export { onAuthStateChanged, signIn, signOut, currentUser };
