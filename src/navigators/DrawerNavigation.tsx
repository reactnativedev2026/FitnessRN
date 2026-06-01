import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import CustomDrawerContent from '../component/common/CustomDrawerContent';
import PrivacyPolicy from '../screen/Profile/privacy-policy/PrivacyPolicy';
import ScreenNameEnum from '../routes/screenName.enum';
import HelpScreen from '../screen/Profile/help/HelpScreen';
import Dashboard from '../screen/BottomTab/Dashboard/Dashboard';
import ProfileScreen from '../screen/Profile/profile-screen/ProfileScreen';
import AnnouncementsScreen from '../screen/Announcements/Announcements';
import OffersScreen from '../screen/Offers/Offers';
import NotificationsSetting from '../screen/Profile/notification-setting/NotificationsSetting';
import DutyLog from '../screen/BottomTab/DutyLog/DutyLog';
import AboutUs from '../screen/Profile/about/AboutScreen';
import ChangePasswordScreen from '../screen/Profile/change-password/ChangePasswordScreen';
import TearmsCodition from '../screen/Profile/tearms-conditions/TearmsCondition';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen name={ScreenNameEnum.DashBoardScreen} component={Dashboard} />
      <Drawer.Screen name={ScreenNameEnum.AnnouncementsScreen} component={AnnouncementsScreen} />
      <Drawer.Screen name={ScreenNameEnum.OffersScreen} component={OffersScreen} />
      <Drawer.Screen name={ScreenNameEnum.DutyLog} component={DutyLog} />
      <Drawer.Screen name={ScreenNameEnum.LegalPoliciesScreen} component={TearmsCodition} />
      <Drawer.Screen name={ScreenNameEnum.NotificationsSetting} component={NotificationsSetting} />
      <Drawer.Screen name={ScreenNameEnum.EditProfile} component={ProfileScreen} />
      <Drawer.Screen name={ScreenNameEnum.PrivacyPolicy} component={PrivacyPolicy} />
      <Drawer.Screen name={ScreenNameEnum.Help} component={HelpScreen} />
      <Drawer.Screen name={ScreenNameEnum.ABOUT_US} component={AboutUs} />
      <Drawer.Screen name={ScreenNameEnum.changePassword} component={ChangePasswordScreen} />
    </Drawer.Navigator>
  );
}
