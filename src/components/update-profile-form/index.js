import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Spinner, Text, Icon, Input } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';
import { s } from 'react-native-size-matters';

const UpdateProfileForm = ({
  user,
  loading,
  error,
  onSubmit,
  onPressClose,
}) => {
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
        disabled={loading || fullName.length === 0 || position.length === 0}
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
