import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Spinner, Text, Icon, Input } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';

const ResetPasswordForm = ({ loading, error, onSubmit, onPressClose }) => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.label} category="label">
          Reset password
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
      <Text>
        Please provide your email so will send you an email to reset your
        password.
      </Text>
      <View>
        <Text style={styles.labelInput} category="label">
          Email
        </Text>
        <M v1 />
        <Input
          style={styles.input}
          placeholder="john.doe@company.com"
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
      </View>
      <Button
        style={styles.buttonSubmit}
        status="primary"
        disabled={loading || email.length === 0}
        onPress={() => onSubmit(email)}>
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
export default ResetPasswordForm;
