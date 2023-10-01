import { Locales } from '@utils/translations';

const getIntroData = (locale = Locales.FR) => {
  const data = {
    en: [
      {
        title: "Work your way",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit!',
        image: require('@assets/images/intro/1.jpg'),
      },
      {
        title: 'Fill calendar',
        description:
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
        image: require('@assets/images/intro/2.jpg'),
      },
      {
        title: 'Get notified',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: require('@assets/images/intro/3.jpg'),
      },
    ],
    fr: [
      {
        title: "Travaillez à votre façon",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit!',
        image: require('@assets/images/intro/1.jpg'),
      },
      {
        title: 'Remplissez le calendrier',
        description:
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
        image: require('@assets/images/intro/2.jpg'),
      },
      {
        title: 'Soyez notifié',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: require('@assets/images/intro/3.jpg'),
      },
    ],
  };
  return data[locale];
};
export { getIntroData };
