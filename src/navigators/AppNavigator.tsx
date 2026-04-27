import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileWatcher from '../compoent/ProfileWatcher';
import NotificationHandler from './../../NotificationHandler'
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator: React.FC = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return;
      }
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
      getFcmToken();
    } else {
      console.log('Notification permission not granted');
    }
  };

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    if (token) {
      await AsyncStorage.setItem('fcmToken', token);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <NetworkStatusModal
            modalVisible={!isConnected}
            offlineText="No Internet! Please check your connection."
          /> */}
          <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
            <RegistrationRoutes />
          </SafeAreaView>
          <ProfileWatcher />
          <Toast config={toastConfig} />
          <NotificationHandler />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;
