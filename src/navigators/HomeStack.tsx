import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/BottomTab/Dashboard/Dashboard';
import AnnouncementsScreen from '../screen/Announcements/Announcements';
import OffersScreen from '../screen/Offers/Offers';
import ScreenNameEnum from '../routes/screenName.enum';

type HomeStackParamList = {
  [ScreenNameEnum.DashBoardScreen]: undefined;
  [ScreenNameEnum.DashBoardTwo]: undefined;
  [ScreenNameEnum.AnnouncementsScreen]: undefined;
  [ScreenNameEnum.OffersScreen]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNameEnum.DashBoardScreen} component={HomeScreen} />
      <Stack.Screen name={ScreenNameEnum.AnnouncementsScreen} component={AnnouncementsScreen} />
      <Stack.Screen name={ScreenNameEnum.OffersScreen} component={OffersScreen} />
    </Stack.Navigator>
  );
}
