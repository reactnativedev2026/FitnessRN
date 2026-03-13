  import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
 import { DrawerContentComponentProps } from '@react-navigation/drawer';
import CustomDrawerContent from '../compoent/CustomDrawerContent';
import PrivacyPolicy from '../screen/Profile/PrivacyPolicy';
import ScreenNameEnum from '../routes/screenName.enum';
import HelpScreen from '../screen/Profile/Help/Helps';
 import Dashboard from '../screen/BottomTab/DashBoard/Dashboard';
import ProfileScreen from '../screen/Profile/ProfileScreen/ProfileScreen';
import NotificationsScreen from '../screen/Notification/Notification';
import NotificationsSetting from '../screen/Profile/NotificationsSetting'; 
import DutyLog from '../screen/BottomTab/DutyLog/DutyLog';
import ClickUploadScreen from '../screen/BottomTab/CameraUpload/ClickUploadScreen';
import { Termsconditions } from '../api/authApi/AuthApi';
import AboutUs from '../screen/Profile/About';
import ChangePasswordScreen from '../screen/Profile/ChangePassword';
import TearmsCodition from '../screen/Profile/TearmsCodition';
// import CustomDrawerContent from '../compoent/CustomDrawerContent';
// import EditProfile from '../screen/Profile/EditProfile';
//  import MedicationLog from '../screen/UserRoleDrawer/Medication/MedicationLog';
// import DoseCalculator from '../screen/UserRoleDrawer/Dose/DoseCalculator';
// import EmergencyGuide from '../screen/UserRoleDrawer/Emergency/EmergencyGuide';
// import SeizureLog from '../screen/UserRoleDrawer/Seizure/SeizureLog';
// import GrowthTracker from '../screen/UserRoleDrawer/Growth/GrowthTracker';
// import FeedingLog from '../screen/UserRoleDrawer/Feeding/FeedingLog';
// import MilestoneTracker from '../screen/UserRoleDrawer/Milestone/MilestoneTracker';
// import SymptomDiary from '../screen/UserRoleDrawer/Symptom/SymptomDiary';
// import SpeakwithNurse from '../screen/UserRoleDrawer/Speak/SpeakwithNurse';
// import HelpSupport from '../screen/UserRoleDrawer/HelpSupport/HelpSupport';
// import ChangePasswordScreen from '../screen/Profile/ChangePassword';
// import MyNurseConsultations from '../screen/UserRoleDrawer/MyConsultations/MyNurseConsultations';
// import DashboardScreen from '../screen/UserRoleDrawer/DashboardScreen';
// import Reminder from '../screen/UserRoleDrawer/Reminder/Reminder';
   

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
      {/* <Drawer.Screen name="MedicationLog" component={MedicationLog} />
      <Drawer.Screen name="DoseCalculator" component={DoseCalculator} />
      <Drawer.Screen name="EmergencyGuide" component={EmergencyGuide} />
      <Drawer.Screen name="SeizureLog" component={SeizureLog} />
      <Drawer.Screen name="GrowthTracker" component={GrowthTracker} />
      <Drawer.Screen name="FeedingLog" component={FeedingLog} />*/}
      <Drawer.Screen name={ScreenNameEnum.ClickUploadScreen} component={ClickUploadScreen} />
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
