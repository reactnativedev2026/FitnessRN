import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export class NotificationService {
  static async requestUserPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await notifee.requestPermission();
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled;
  }

  static async getToken() {
    try {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } catch (error) {
      console.log('Error fetching FCM token', error);
      return null;
    }
  }

  static onMessageListener() {
    return messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'kimbo Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || '',
        data: remoteMessage.data,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // Make sure this icon exists in mipmap/drawable
          pressAction: {
            id: 'default',
          },
        },
      });
    });
  }

  static setupListeners() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }
}
