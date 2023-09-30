import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, Spinner, Text, Icon } from '@ui-kitten/components';
import styles from './index.styles';
import { M } from '@components';
import Colors from '@constants/colors';
import { s } from 'react-native-size-matters';
import { i18n } from '@utils/translations';

const AlertForm = ({ onSubmit, onPressClose }) => {
  const [text, setText] = useState('');
  const [satisfaction, setSatisfaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlePressSubmit = () => {
    const payload = {
      text,
    };
    if (satisfaction) {
      payload['satisfaction'] = satisfaction;
    }
    onSubmit(payload);
  };
  const handlePressSatisfaction = s => {
    setSatisfaction(s);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{i18n.t('Notifications.form.title')}</Text>
        <TouchableOpacity onPress={onPressClose}>
          <Icon
            fill={Colors.GRAY_PRIMARY}
            name="close-outline"
            width={s(21)}
            height={s(21)}
          />
        </TouchableOpacity>
      </View>
      <M v1 />
      <TextInput
        style={styles.input}
        placeholder={i18n.t('Notifications.form.placeholder')}
        placeholderTextColor={Colors.GRAY_PRIMARY}
        value={text}
        multiline
        onChangeText={nextValue => setText(nextValue)}
      />
      <M v2 />
      <View style={styles.containerImages}>
        {satisfaction === 1 ? (
          <TouchableOpacity onPress={() => handlePressSatisfaction(null)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/1-selected.jpg')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handlePressSatisfaction(1)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/1.jpg')}
            />
          </TouchableOpacity>
        )}
        {satisfaction === 2 ? (
          <TouchableOpacity onPress={() => handlePressSatisfaction(null)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/2-selected.jpg')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handlePressSatisfaction(2)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/2.jpg')}
            />
          </TouchableOpacity>
        )}
        {satisfaction === 3 ? (
          <TouchableOpacity onPress={() => handlePressSatisfaction(null)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/3-selected.jpg')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handlePressSatisfaction(3)}>
            <Image
              style={styles.image}
              source={require('@assets/images/alert-form/3.jpg')}
            />
          </TouchableOpacity>
        )}
      </View>
      <M v2 />
      <Button
        style={styles.buttonSubmit}
        status="primary"
        disabled={loading || !text}
        onPress={handlePressSubmit}>
        {loading ? (
          <Spinner status="basic" size="small" />
        ) : (
          i18n.t('Notifications.form.btn_submit')
        )}
      </Button>
    </View>
  );
};
export default AlertForm;
