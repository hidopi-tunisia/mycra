import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, Spinner, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';

const CRAHistoryDetailsForm = ({ onSubmit, onPressClose }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePressSubmit = () => {
    const payload = {
      text,
    };
    onSubmit(payload);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>
          Report an issue
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
      <M v1 />
      <TextInput
        style={styles.input}
        placeholder="Type your alert!"
        placeholderTextColor={Colors.GRAY_PRIMARY}
        value={text}
        multiline
        onChangeText={nextValue => setText(nextValue)}
      />
      <M v2 />
      <Button
        style={styles.buttonSubmit}
        status="primary"
        disabled={loading || !text}
        onPress={handlePressSubmit}>
        {loading ? <Spinner status="basic" size="small" /> : 'Submit'}
      </Button>
    </View>
  );
};
export default CRAHistoryDetailsForm;
