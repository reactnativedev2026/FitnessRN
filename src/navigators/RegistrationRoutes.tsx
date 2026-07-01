import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import _routes from '../routes/routes';
import ScreenNameEnum from '../routes/screenName.enum';

export type RootStackParamList = {
  [key in ScreenNameEnum]: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  animation: 'slide_from_right',
};

const fadeScreens = new Set<ScreenNameEnum>([
  ScreenNameEnum.SPLASH_SCREEN,
  ScreenNameEnum.TabNavigator,
  ScreenNameEnum.WorkoutComplete,
]);

const RegistrationRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNameEnum.SPLASH_SCREEN}
      screenOptions={screenOptions}
    >
      {_routes.REGISTRATION_ROUTE.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            animation: fadeScreens.has(screen.name) ? 'fade' : 'slide_from_right',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RegistrationRoutes;
