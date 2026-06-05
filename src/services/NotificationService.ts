import {
  AuthorizationStatus,
  getAPNSToken,
  getInitialNotification,
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  registerDeviceForRemoteMessages,
  requestPermission,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export class NotificationService {
  static async requestUserPermission() {
    const notifeeSettings = await notifee.requestPermission();
    console.log('Notifee notification settings:', notifeeSettings);

    const messagingInstance = getMessaging();
    const authStatus = await requestPermission(messagingInstance);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled;
  }

  static async getToken() {
    try {
      const messagingInstance = getMessaging();
      if (!isDeviceRegisteredForRemoteMessages(messagingInstance)) {
        await registerDeviceForRemoteMessages(messagingInstance);
      }
      const apnsToken =
        Platform.OS === 'ios' ? await getAPNSToken(messagingInstance) : null;
      if (Platform.OS === 'ios') {
        console.log('APNs Token:', apnsToken);
      }
      const fcmToken = await getToken(messagingInstance);
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } catch (error) {
      console.log('Error fetching FCM token', error);
      return null;
    }
  }

  private static async displayRemoteMessage(remoteMessage: RemoteMessage) {
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
  }

  static onMessageListener() {
    return onMessage(getMessaging(), async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      await NotificationService.displayRemoteMessage(remoteMessage);
    });
  }

  static setupListeners() {
    const unsubscribeOpenedApp = onNotificationOpenedApp(getMessaging(), remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    getInitialNotification(getMessaging()).then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

    const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    const unsubscribeTokenRefresh = onTokenRefresh(getMessaging(), token => {
      console.log('FCM Token refreshed:', token);
    });

    return () => {
      unsubscribeOpenedApp();
      unsubscribeForegroundEvent();
      unsubscribeTokenRefresh();
    };
  }
}
