import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './index.styles';
import { M } from '@components';

// Illustrations from https://www.freepik.com/author/stories
const data = [
  {
    title: 'Work you way',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit!',
    image: require('@assets/images/intro/1.jpg'),
  },
  {
    title: 'Fill calendar',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
    image: require('@assets/images/intro/2.jpg'),
  },
  {
    title: 'Get notified',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('@assets/images/intro/3.jpg'),
  },
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.slide}>
        <View style={styles.wrapper}>
          <View style={styles.containerImage}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={styles.containerTexts}>
            <Text style={styles.title}>{item.title}</Text>
            <M v2 />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const renderNextButton = () => (
  <View style={styles.containerNextButton}>
    <Text style={styles.textNextButton}>Next</Text>
  </View>
);
const renderSkipButton = () => (
  <View style={styles.containerSkipButton}>
    <Text style={styles.textSkipButton}>Skip</Text>
  </View>
);
const renderDoneButton = () => (
  <View style={styles.containerDoneButton}>
    <Text style={styles.textDoneButton}>Begin</Text>
  </View>
);
const ApplicationIntroScreen = ({ onDone }) => (
  <AppIntroSlider
    data={data}
    activeDotStyle={styles.activeDotStyle}
    bottomButton
    showSkipButton
    renderItem={renderItem}
    renderSkipButton={renderSkipButton}
    renderNextButton={renderNextButton}
    renderDoneButton={renderDoneButton}
    onDone={onDone}
  />
);
export default ApplicationIntroScreen;
