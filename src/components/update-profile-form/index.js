import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Spinner, Text, Icon, Input } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { s } from 'react-native-size-matters';

const UpdateProfileForm = ({
  user,
  loading,
  error,
  progress,
  onUpload,
  onSubmit,
  onPressClose,
}) => {
  const [uri, setUri] = useState(null);
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  useEffect(() => {
    if (user.displayName) {
      const fullName = user.displayName.split('!')[0];
      const position = user.displayName.split('!')[1];
      if (fullName) {
        setFullName(fullName);
      }
      if (position) {
        setPosition(position);
      }
    }
  }, []);
  const onPressSubmit = () => {
    onSubmit({ fullName, position });
  };
  const handlePressPickImage = () => {
    const fn = async () => {
      try {
        const { assets } = await launchImageLibrary({ mediaType: 'photo' });
        if (assets && assets[0] && assets[0].uri) {
          setUri(assets[0].uri);
        }
      } catch (error) {
        console.info(error);
      }
    };
    fn();
  };
  const handlePressUpload = () => {
    onUpload(uri);
  };
  const handlePressResetUri = () => {
    setUri(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.label} category="label">
          Update profile
        </Text>
        <TouchableOpacity onPress={onPressClose}>
          <Icon
            fill={Colors.GRAY_PRIMARY}
            name="close-outline"
            width={s(22)}
            height={s(22)}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.labelInput} category="label">
        Upload avatar picture
      </Text>
      {uri ? (
        <View style={styles.containerUpload}>
          <TouchableOpacity
            disabled={progress !== null}
            onPress={handlePressPickImage}>
            <Image
              style={styles.picture}
              source={{
                uri,
              }}
            />
            <View style={styles.containerReplace}>
              <Icon
                fill={Colors.WHITE}
                name="edit-outline"
                width={s(14)}
                height={s(14)}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={progress !== null}
            onPress={handlePressUpload}>
            <View style={styles.containerButtonUpload}>
              <Icon
                fill={Colors.BLUE_DARK_PRIMARY}
                name="cloud-upload-outline"
                width={s(22)}
                height={s(22)}
              />
              <M v1 />
              {progress !== null ? (
                <Text style={{ color: Colors.BLUE_DARK_PRIMARY }}>
                  {progress}%
                </Text>
              ) : (
                <Text style={{ color: Colors.BLUE_DARK_PRIMARY }}>Upload</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={progress !== null}
            onPress={handlePressResetUri}>
            <View style={styles.containerButtonReset}>
              <Icon
                fill={Colors.RED_DARK_PRIMARY}
                name="trash-2-outline"
                width={s(22)}
                height={s(22)}
              />
              <M v1 />
              <Text style={{ color: Colors.RED_DARK_PRIMARY }}>Reset</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerPicturePlaceholder}>
          <TouchableOpacity onPress={handlePressPickImage}>
            <View style={styles.picturePlaceholder}>
              <Icon
                fill={Colors.GRAY_PRIMARY}
                name="image-outline"
                width={s(22)}
                height={s(22)}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text style={styles.labelInput} category="label">
          Full name
        </Text>
        <M v1 />
        <Input
          style={styles.input}
          placeholder="John Doe"
          value={fullName}
          onChangeText={nextValue => setFullName(nextValue)}
        />
      </View>
      <View>
        <Text style={styles.labelInput} category="label">
          Position
        </Text>
        <M v1 />
        <Input
          style={styles.input}
          placeholder="Web developer"
          value={position}
          onChangeText={nextValue => setPosition(nextValue)}
        />
      </View>
      <Button
        style={styles.buttonSubmit}
        status="primary"
        disabled={
          loading ||
          fullName.length === 0 ||
          position.length === 0 ||
          progress !== null
        }
        onPress={onPressSubmit}>
        {loading ? <Spinner status="basic" size="small" /> : 'Submit'}
      </Button>
      {error && (
        <View style={styles.containerError}>
          <Text style={styles.textError}>{error}</Text>
        </View>
      )}
    </View>
  );
};
export default UpdateProfileForm;
