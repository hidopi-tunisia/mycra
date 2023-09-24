import { useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import Modal from '@components/modals';
import styles from './index.styles';
import Colors from '@constants/colors';
import { M } from '@components/index';
import { useFocusEffect } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const NoProjects = ({ loading, onFocus, onBlur, onPress }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.GRAY_DARK_PRIMARY);
      SystemNavigationBar.setNavigationColor(Colors.GRAY_PRIMARY, 'light');
      onFocus(Colors.GRAY_PRIMARY);
      return () => {
        StatusBar.setBackgroundColor(Colors.BLUE_DARK_PRIMARY);
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
            Please fill your CRA before the end of the current month.
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
          <Text style={styles.textTitle}>No projects</Text>
          <M v2 />
          <Text style={styles.textInfo}>
            You are not assigned to any project at the moment.
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
              Try again
            </Button>
          )}
        </View>
      </View>
      <Modal
        title="Help"
        type="info"
        visible={modalHelpVisible}
        onPressPositive={() => setModalHelpVisible(false)}>
        <Text>Fill your working days accordingly.</Text>
        <Text>Long press on a day to view more options.</Text>
        <M v2 />
        <Text>Legend:</Text>
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
            <Text>Working</Text>
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
            <Text>Half day</Text>
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
            <Text>Remote</Text>
          </View>
          <View style={styles.containerLegend}>
            <View
              style={{
                ...styles.shapeLegend,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED_PRIMARY,
              }}
            />
            <M h1 />
            <Text>Off</Text>
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
            <Text>Weekend</Text>
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
            <Text>Holiday</Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default NoProjects;
