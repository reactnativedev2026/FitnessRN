// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };
// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   //  presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
//   plugins: [
//     [
//       'module:react-native-dotenv',
//       {
//         moduleName: '@env',
//         path: '.env',
//         safe: false,
//         allowUndefined: true,
//       },
//     ],
//   ],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

