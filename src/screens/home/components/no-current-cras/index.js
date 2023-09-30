import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import Modal from '@components/modals';
import styles from './index.styles';
import Colors from '@constants/colors';
import { M } from '@components/index';
import { i18n } from '@utils/translations';

const NoCurrentCRAs = ({ onPress }) => {
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <Text style={styles.textHeading}>My CRA</Text>
            <TouchableOpacity onPress={() => setModalHelpVisible(true)}>
              <Icon
                fill={Colors.WHITE}
                name="question-mark-circle-outline"
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </View>
          <M v1 />
          <Text style={styles.textDescription}>
            {i18n.t('Home.no-current-cras.description')}
          </Text>
          {/* <Text style={styles.textWarning}>
            The month is already prefilled.
          </Text> */}
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={require('@assets/images/home/no-projects.jpg')}
          />
        </View>
        <M v4 />
        <View style={styles.containerTexts}>
          <Text style={styles.textTitle}>
            {i18n.t('Home.no-current-cras.text:title')}
          </Text>
          <M v2 />
          <Text style={styles.textInfo}>
            {i18n.t('Home.no-current-cras.text:info')}
          </Text>
        </View>
        <M v4 />
        <View>
          <Button style={styles.button} status="basic" onPress={onPress}>
            {i18n.t('Home.no-current-cras.btn_retry')}
          </Button>
        </View>
      </View>
      <Modal
        title={i18n.t('Home.no-current-cras.modalHelp.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('Home.no-current-cras.modalHelp.description-1')}</Text>
        <Text>{i18n.t('Home.no-current-cras.modalHelp.description-2')}</Text>
        <M v2 />
        <Text>{i18n.t('Home.no-current-cras.modalHelp.legend')}</Text>
        <View style={styles.containerLegends}>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.BLUE_PRIMARY,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Working')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.BLUE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Half day')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.PURPLE_PRIMARY,
                borderColor: Colors.PURPLE_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Remote')}</Text>
          </View>
          {/* <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GRAY_DARK_PRIMARY,
                borderColor: Colors.GRAY_DARK_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Unavailable')}</Text>
          </View> --  TODO: Unavailable */}
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Off')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Weekend')}</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.GREEN_PRIMARY,
                borderColor: Colors.GREEN_PRIMARY,
              }}
            />
            <M h1 />
            <Text>{i18n.t('Home.no-current-cras.modalHelp.Holiday')}</Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default NoCurrentCRAs;
