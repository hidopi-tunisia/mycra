import Colors from '@constants/colors';
import { SvgXml } from 'react-native-svg';
import { generateFromString } from 'generate-avatar';
import { View, Image } from 'react-native';
import styles from './index.styles';
import { s } from 'react-native-size-matters';

export const getStatusBackground = status => {
  if (status === 'active') {
    return Colors.GREEN_PRIMARY;
  } else if (status === 'inactive') {
    return Colors.RED_PRIMARY;
  }
  return Colors.GRAY_SECONDARY_TEXT;
};

export const renderAvatar = profile => {
  const xml = generateFromString(profile._id);
  return (
    <View style={styles.containerImage}>
      {profile.profilePhoto ? (
        <>
          <Image style={styles.photo} source={{ uri: profile.profilePhoto }} />
          <View
            style={{
              ...styles.statusPhoto,
              backgroundColor: getStatusBackground(profile.accountStatus),
            }}
          />
        </>
      ) : (
        <View style={styles.avatar}>
          <View style={styles.avatarTop} />
          <View style={styles.avatarBorder} />
          <SvgXml xml={xml} width={s(66)} height={s(66)} />
          <View
            style={{
              ...styles.statusAvatar,
              backgroundColor: getStatusBackground(profile.accountStatus),
            }}
          />
        </View>
      )}
    </View>
  );
};
