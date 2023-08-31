import { emitter } from "./events";

const onChange = callback => {
  emitter.on('storage-changed', callback);
};

const emitChange = payload => {
  emitter.emit('storage-changed', payload);
};

export { onChange, emitChange };
