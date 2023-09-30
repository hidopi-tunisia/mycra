import { View } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Icon, Button, Text } from '@ui-kitten/components';
import { M } from '../index';
import { renderColor, renderIcon } from './index.helpers';
import { i18n } from '@utils/translations';

import styles from './index.styles';
import { s } from 'react-native-size-matters';

const Modal = ({
  visible = false,
  type = 'default',
  title = i18n.t('shared:modals.message'),
  positiveText = i18n.t('shared:modals.btn_ok'),
  negativeText = i18n.t('shared:modals.btn_cancel'),
  onPressPositive,
  onPressNegative,
  children,
}) => (
  <FancyAlert
    visible={visible}
    icon={
      <View
        style={{ ...styles.containerIcon, backgroundColor: renderColor(type) }}>
        <Icon
          width={s(18)}
          height={s(18)}
          name={renderIcon(type)}
          fill="white"
        />
      </View>
    }
    style={styles.root}>
    <Text style={styles.title}>{title}</Text>
    <M v2 />
    {children && <View style={styles.containerContent}>{children}</View>}
    <M v2 />
    <View style={styles.containerButtons}>
      {onPressNegative && (
        <Button
          style={styles.buttonNegative}
          status="control"
          onPress={onPressNegative}>
          {negativeText}
        </Button>
      )}
      {onPressPositive && (
        <Button
          style={styles.buttonPositive}
          status="primary"
          onPress={onPressPositive}>
          {positiveText}
        </Button>
      )}
    </View>
    <M v1 />
  </FancyAlert>
);

export default Modal;
