/**
 * @format
 */

import { AppRegistry } from 'react-native';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './src/App';
import { name as appName } from './app.json';

setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'kimbo Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title:
      remoteMessage.notification?.title ||
      String(remoteMessage.data?.title || 'New Notification'),
    body:
      remoteMessage.notification?.body ||
      String(remoteMessage.data?.body || remoteMessage.data?.message || ''),
    data: remoteMessage.data,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        banner: true,
        list: true,
        sound: true,
      },
    },
  });
});

notifee.onBackgroundEvent(async ({ type }) => {
  console.log('Notifee Background Event:', type);
});

AppRegistry.registerComponent(appName, () => App);
