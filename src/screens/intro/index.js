import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './index.styles';
import { M } from '@components';
import { Locales, i18n } from '@utils/translations';
import { renderFlag } from '@utils/flags';
import { APP_VERSION } from '@constants';
import { getIntroData } from './data';

// Illustrations from https://www.freepik.com/author/stories
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
    <Text style={styles.textNextButton}>{i18n.t('Intro.next')}</Text>
  </View>
);
const renderSkipButton = () => (
  <View style={styles.containerSkipButton}>
    <Text style={styles.textSkipButton}>{i18n.t('Intro.skip')}</Text>
  </View>
);
const renderDoneButton = () => (
  <View style={styles.containerDoneButton}>
    <Text style={styles.textDoneButton}>{i18n.t('Intro.begin')}</Text>
  </View>
);
const ApplicationIntroScreen = ({ onDone }) => (
  <View style={styles.root}>
    <AppIntroSlider
      data={getIntroData(i18n.locale)}
      activeDotStyle={styles.activeDotStyle}
      bottomButton
      showSkipButton
      renderItem={renderItem}
      renderSkipButton={renderSkipButton}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      onDone={onDone}
    />
    <View style={styles.containerVersion}>
      <Text style={styles.textVersion}>
        {i18n.t('Sign In.version:')} {APP_VERSION}
      </Text>
      <M h3 />
      {i18n.locale === Locales.FR ? (
        <TouchableOpacity onPress={() => (i18n.locale = Locales.EN)}>
          <View style={styles.containerInternationalization}>
            <View style={styles.containerFlag}>{renderFlag('en')}</View>
            <M h2 />
            <Text style={styles.textInternationalization}>{Locales.EN}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => (i18n.locale = Locales.FR)}>
          <View style={styles.containerInternationalization}>
            <View style={styles.containerFlag}>{renderFlag('fr')}</View>
            <M h2 />
            <Text style={styles.textInternationalization}>{Locales.FR}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
    <M v2 />
  </View>
);
export default ApplicationIntroScreen;
