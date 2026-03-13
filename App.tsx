
// import React, { FunctionComponent, useEffect } from 'react';
// import { LogBox, NativeModules, Text, TextInput, } from 'react-native';
// import { override as overrideReactNativeFeatureFlags } from 'react-native/src/private/featureflags/ReactNativeFeatureFlags';
// import 'react-native-gesture-handler';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import AppNavigator from '@navigators/AppNavigator';
// import { initializeLoggerConsoleBridge } from '@utils/LoggerConsoleBridge';
 
// overrideReactNativeFeatureFlags({
//   useInsertionEffectsForAnimations: () => false,
// });
 
// initializeLoggerConsoleBridge();
 
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
 
// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;
// TextInput.defaultProps.underlineColorAndroid = "transparent";
// // HorizontalScrollView logs frequently trigger despite controlled children.
// LogBox.ignoreLogs(["HorizontalScrollView can host only one direct child"]);
 
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       cacheTime: 10 * 60 * 1000, // 10 minutes
//     },
//   },
// });
 
// const App: FunctionComponent  = () => {
 
//   const { AndroidExoPlayerCache } = NativeModules;
//   useEffect(() => {
//     const trimAndroidCache = async () => {
//       try {
//         await AndroidExoPlayerCache.trimCache(100 * 1024 * 1024);
//       } catch (error) {
//        }
//     };
 
//     trimAndroidCache();
//   }, []);
 
 
//   return (
//       <QueryClientProvider client={queryClient}>
//       <AppNavigator />
//      </QueryClientProvider>
//   );
// }
 
// export default App;
  
 import React, {FunctionComponent} from 'react';
import {LogBox, Text,} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';
import { TextInput } from 'react-native';
import 'react-native-reanimated';
// "react-native-maps": "^1.26.14",
// 

LogBox.ignoreAllLogs(); 
(Text as any).defaultProps = (Text as any).defaultProps || {};


(Text as any).defaultProps.allowFontScaling = false;
 
(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};

(TextInput as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps.underlineColorAndroid = "transparent";

 
const App: FunctionComponent<any> = () => <AppNavigator />;

export default App;
 