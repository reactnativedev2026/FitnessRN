/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import App from './src/App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Notifee Background Event:', type);
});

AppRegistry.registerComponent(appName, () => App);
