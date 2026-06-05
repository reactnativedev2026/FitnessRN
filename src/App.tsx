
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
    NotificationService.requestUserPermission();
    NotificationService.getToken();
    NotificationService.setupListeners();
    const unsubscribe = NotificationService.onMessageListener();
    return unsubscribe;
  }, []);

  return <AppNavigator />;
};

export default App;
