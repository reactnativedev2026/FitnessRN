
import React, { FunctionComponent, useEffect } from 'react';
import { LogBox, Text, } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './navigators/AppNavigator';
import { TextInput } from 'react-native';
import { NotificationService } from './services/NotificationService';

LogBox.ignoreAllLogs();
(Text as any).defaultProps = (Text as any).defaultProps || {};


(Text as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};

(TextInput as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps.underlineColorAndroid = "transparent";


const App: FunctionComponent<any> = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      const hasPermission = await NotificationService.requestUserPermission();
      if (hasPermission) {
        await NotificationService.getToken();
      }
    };

    initializeNotifications();
    const unsubscribeSetupListeners = NotificationService.setupListeners();
    const unsubscribeMessageListener = NotificationService.onMessageListener();
    return () => {
      unsubscribeSetupListeners();
      unsubscribeMessageListener();
    };
  }, []);

  return <AppNavigator />;
};

export default App;
