import AsyncStorage from '@react-native-async-storage/async-storage';
import { emitter } from './events';

const STORAGE_NAME = 'app';

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
export { getItem, setItem, onChange };
