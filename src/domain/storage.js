import AsyncStorage from '@react-native-async-storage/async-storage';
import { emitter } from './events';

const STORAGE_NAME = 'app';
const IS_INTRO = 'is_into';

const onChange = callback => {
  emitter.on(`${STORAGE_NAME}:storage-changed`, callback);
};

const emitChange = payload => {
  emitter.emit(`${STORAGE_NAME}:storage-changed`, payload);
};

const setItem = (payload = '{}') => {
  AsyncStorage.setItem(STORAGE_NAME, payload, () => {
    emitChange(payload);
  });
};

const getItem = () => {
  return AsyncStorage.getItem(STORAGE_NAME);
};

const isIntroDone = () => AsyncStorage.getItem(IS_INTRO);
const setIsIntroDone = (value = 'true') =>
  AsyncStorage.setItem(IS_INTRO, value);

export { getItem, setItem, onChange, isIntroDone, setIsIntroDone };
