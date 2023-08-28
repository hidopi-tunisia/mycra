import React, { useCallback } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const ButtomSheet = ({ onCallbackRef, children }) => {
  const ref = useCallback(onCallbackRef, []);
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      {children}
    </RBSheet>
  );
};
export default ButtomSheet;
