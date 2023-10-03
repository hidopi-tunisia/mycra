import Colors from '@constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { s } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import styles from './index.styles';

const { width, height } = Dimensions.get('window');

const HomeLoading = ({ onFocus, onBlur }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.GRAY_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(Colors.GRAY_PRIMARY, 'light');
      onFocus(Colors.GRAY_PRIMARY);
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_PRIMARY);
      };
    }, []),
  );
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerTexts}>
          <SkeletonPlaceholder highlightColor="#bdbdbd">
            <SkeletonPlaceholder.Item
              borderRadius={24}
              flexDirection="row"
              alignItems="center"
              height={24}
              width={s(100)}
              left={20}
              marginBottom={s(16)} />
            <SkeletonPlaceholder.Item
              borderRadius={24}
              flexDirection="row"
              alignItems="center"
              left={20}
              height={18}
              width={s(200)} />
          </SkeletonPlaceholder>
        </View>
      </View>
      <View style={styles.middle}>
        <SkeletonPlaceholder highlightColor="#bdbdbd">
          <SkeletonPlaceholder.Item
            borderRadius={48}
            flexDirection="row"
            alignItems="center"
            alignSelf="center"
            height={height * 0.6 - 24}
            width={width * 0.9} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};
export default HomeLoading;
