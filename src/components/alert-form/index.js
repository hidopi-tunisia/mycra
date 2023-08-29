import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Spinner, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';

const AlertForm = ({ onSubmit, onPressClose }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.label} category="label">
          New alert
        </Text>
        <TouchableOpacity onPress={onPressClose}>
          <Icon
            fill={Colors.GRAY_PRIMARY}
            name="close-outline"
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type your alert!"
        placeholderTextColor={Colors.GRAY_PRIMARY}
        value={text}
        multiline
        onChangeText={nextValue => setText(nextValue)}
      />
      <Button
        style={styles.buttonSignIn}
        status="primary"
        disabled={loading}
        onPress={() => onSubmit(text)}>
        {loading ? <Spinner status="basic" size="small" /> : 'Submit'}
      </Button>
    </View>
  );
};
export default AlertForm;
