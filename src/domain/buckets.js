import storage from '@react-native-firebase/storage';

const upload = ({
  path,
  uri,
  onProgress,
  onError,
  onComplete,
  metadata = {
    cacheControl: 'no-store',
  },
}) => {
  const task = storage().ref(path).putFile(uri, metadata);
  task.on(
    'state_changed',
    snapshot => {
      onProgress({
        transferred: snapshot.bytesTransferred,
        total: snapshot.totalBytes,
      });
    },
    error => {
      onError(error);
    },
    () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        onComplete(downloadURL);
      });
    },
  );
};

export { upload };
