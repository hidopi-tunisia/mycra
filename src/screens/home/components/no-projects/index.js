import { useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import Modal from '@components/modals';
import styles from './index.styles';
import Colors from '@constants/colors';
import { M } from '@components/index';
import { useFocusEffect } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { i18n } from '@utils/translations';

const NoProjects = ({ loading, onFocus, onBlur, onPress, onRefresh }) => {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(Colors.GRAY_DARK_PRIMARY);
      }
      SystemNavigationBar.setNavigationColor(Colors.GRAY_PRIMARY, 'light');
      onFocus(Colors.GRAY_PRIMARY);
      return () => {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
        }
        SystemNavigationBar.setNavigationColor(Colors.BLUE_PRIMARY, 'light');
        onBlur(Colors.BLUE_PRIMARY);
      };
    }, []),
  );
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerDescription}>
          <View style={styles.containerHeading}>
            <View style={styles.containerHeading}>
              <Text style={styles.textHeading}>My CRA</Text>
              <M h2 />
              <TouchableOpacity onPress={onRefresh}>
                <Icon
                  fill={Colors.WHITE}
                  name="refresh-outline"
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
            </View>
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
            {i18n.t('Home.no-projects.description')}
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
            {i18n.t('Home.no-projects.text:title')}
          </Text>
          <M v2 />
          <Text style={styles.textInfo}>
            {i18n.t('Home.no-projects.text:info')}
          </Text>
        </View>
        <M v4 />
        <View>
          {loading ? (
            <Button style={styles.button} status="basic" disabled>
              <Spinner status="basic" size="small" />
            </Button>
          ) : (
            <Button style={styles.button} status="basic" onPress={onPress}>
              {i18n.t('Home.no-projects.btn_retry')}
            </Button>
          )}
        </View>
      </View>
      <Modal
        title={i18n.t('Home.no-projects.modalHelp.title')}
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>{i18n.t('Home.no-projects.modalHelp.description-1')}</Text>
        <Text>{i18n.t('Home.no-projects.modalHelp.description-2')}</Text>
        <M v2 />
        <Text>{i18n.t('Home.no-projects.modalHelp.legend')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Working')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Half day')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Remote')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Unavailable')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Off')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Weekend')}</Text>
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
            <Text>{i18n.t('Home.no-projects.modalHelp.Holiday')}</Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default NoProjects;
