import React, { useCallback } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './index.styles';
import { vs } from 'react-native-size-matters';

const BottomSheet = ({ height = vs(280), onCallbackRef, children }) => {
  const ref = useCallback(onCallbackRef, []);
  return (
    <RBSheet
      ref={ref}
      height={height}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={styles}>
      {children}
    </RBSheet>
  );
};
export default BottomSheet;
