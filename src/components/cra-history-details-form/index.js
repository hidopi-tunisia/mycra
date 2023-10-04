import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Spinner, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';
import { s } from 'react-native-size-matters';
import { i18n } from '@utils/translations';

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
          {i18n.t('CRA Details.form.Report an issue')}
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
      <M v1 />
      <TextInput
        style={styles.input}
        placeholder={i18n.t('CRA Details.form.Type your alert!')}
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
