const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve('./src')],
        extensions: ['.js', '.jsx', '.json', '.svg', '.png'],
        alias: {
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@components': './src/components',
          '@state': './src/state',
          '@domain': './src/domain',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@styles': './src/styles',
          '@theme': './src/theme',
          '@assets': './assets',
        },
      },
    ],
  ],
};
