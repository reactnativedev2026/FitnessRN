import ScreenNameEnum from './screenName.enum';
import type React from 'react';
import TabNavigator from '../navigators/TabNavigation';
import Splash from '../screen/auth/Splash/Splash';
import IntroScreen from '../screen/auth/intro/introScreen';
import ActivityFocusScreen from '../screen/auth/activityFocus/ActivityFocusScreen';
import BiometricProfile from '../screen/auth/biometricProfile/BiometricProfile';
import DefinePathScreen from '../screen/auth/definePath/DefinePathScreen';
import Login from '../screen/auth/login/LoginScreen';
import SignUpUI from '../screen/auth/signup/SignupScreen';
import OtpScreen from '../screen/auth/otp/OtpScreen';
import NotificationsScreen from '../screen/Notification/NotificationScreen';
import ProfileSettingsScreen from '../screen/Profile/ProfileIndex';
import ProfileScreen from '../screen/Profile/profile-screen/ProfileScreen';
import PrivacyPolicy from '../screen/Profile/privacy-policy/PrivacyPolicy';
import NotificationsSetting from '../screen/Profile/notification-setting/NotificationsSetting';
import BMICalculatorScreen from '../screen/BottomTab/BMICalculator/BMICalculatorScreen';
import ExerciseLibraryScreen from '../screen/BottomTab/ExerciseLibrary/ExerciseLibraryScreen';
import FitnessDashboardScreen from '../screen/BottomTab/FitnessDashboard/FitnessDashboardScreen';
import FitnessProgressScreen from '../screen/BottomTab/FitnessProgress/FitnessProgressScreen';
import HomeScreen from '../screen/BottomTab/HomeScreen/HomeScreen';
import ExploreScreen from '../screen/BottomTab/HomeScreen/Explore/ExploreScreen';
import RanksScreen from '../screen/BottomTab/HomeScreen/Ranks/RanksScreen';
import ActiveRemindersScreen from '../screen/BottomTab/HomeScreen/ActiveReminders/ActiveRemindersScreen';
import TrainingReminderScreen from '../screen/BottomTab/HomeScreen/TrainingReminder/TrainingReminderScreen';
import WorkoutTimeScreen from '../screen/BottomTab/HomeScreen/WorkoutTime/WorkoutTimeScreen';
import HydrationGoalScreen from '../screen/BottomTab/HydrationGoal/HydrationGoalScreen';
import IsolationCardioScreen from '../screen/BottomTab/IsolationCardio/IsolationCardioScreen';
import MarketplaceScreen from '../screen/BottomTab/Marketplace/MarketplaceScreen';
import MealPlanListScreen from '../screen/BottomTab/MealPlanList/MealPlanListScreen';
import MealRecommendationScreen from '../screen/BottomTab/MealRecommendation/MealRecommendationScreen';
import SkinnyAIChatScreen from '../screen/BottomTab/SkinnyAIChat/SkinnyAIChatScreen';
import SmartNotificationScreen from '../screen/BottomTab/SmartNotification/SmartNotificationScreen';
import WorkoutCompleteScreen from '../screen/BottomTab/WorkoutComplete/WorkoutCompleteScreen';
import WorkoutPlanScreen from '../screen/BottomTab/WorkoutPlan/WorkoutPlanScreen';
import WatchLock from '../screen/BottomTab/Watch/WatchLock';
import PremiumScreen from '../screen/BottomTab/Premium/PremiumScreen';
import FitnessProfileScreen from '../screen/BottomTab/FitnessProfile/FitnessProfileScreen';
import FastingScreen from '../screen/BottomTab/Fasting/FastingScreen';
import FastingProtocolScreen from '../screen/BottomTab/FastingProtocol/FastingProtocolScreen';
import PrimaryFocusScreen from '../screen/BottomTab/PrimaryFocus/PrimaryFocusScreen';
import HydrationTipScreen from '../screen/BottomTab/HydrationTip/HydrationTipScreen';
import MissionScreen from '../screen/BottomTab/Mission/MissionScreen';

export type AppRoute = {
  name: ScreenNameEnum;
  Component: React.ComponentType<any>;
};

export const AUTH_ROUTES: AppRoute[] = [
  { name: ScreenNameEnum.SPLASH_SCREEN, Component: Splash },
  { name: ScreenNameEnum.IntroScreen, Component: IntroScreen },
  { name: ScreenNameEnum.ActivityFocusScreen, Component: ActivityFocusScreen },
  { name: ScreenNameEnum.BiometricProfile, Component: BiometricProfile },
  { name: ScreenNameEnum.DefinePathScreen, Component: DefinePathScreen },
  { name: ScreenNameEnum.Login, Component: Login },
  { name: ScreenNameEnum.Sinup, Component: SignUpUI },
  { name: ScreenNameEnum.OtpScreen, Component: OtpScreen },
];

export const MAIN_ROUTES: AppRoute[] = [
  { name: ScreenNameEnum.TabNavigator, Component: TabNavigator },
  { name: ScreenNameEnum.NotificationsScreen, Component: NotificationsScreen },
  { name: ScreenNameEnum.ProfileSetup, Component: ProfileSettingsScreen },
  { name: ScreenNameEnum.EditProfile, Component: ProfileScreen },
  { name: ScreenNameEnum.PrivacyPolicy, Component: PrivacyPolicy },
  { name: ScreenNameEnum.NotificationsSetting, Component: NotificationsSetting },
  { name: ScreenNameEnum.HomeScreen, Component: HomeScreen },
  { name: ScreenNameEnum.ExploreScreen, Component: ExploreScreen },
  { name: ScreenNameEnum.RanksScreen, Component: RanksScreen },
  { name: ScreenNameEnum.FitnessDashboard, Component: FitnessDashboardScreen },
  { name: ScreenNameEnum.MissionScreen, Component: MissionScreen },
  { name: ScreenNameEnum.FitnessProgress, Component: FitnessProgressScreen },
  { name: ScreenNameEnum.ExerciseLibrary, Component: ExerciseLibraryScreen },
  { name: ScreenNameEnum.BMICalculator, Component: BMICalculatorScreen },
  { name: ScreenNameEnum.HydrationGoal, Component: HydrationGoalScreen },
  { name: ScreenNameEnum.IsolationCardio, Component: IsolationCardioScreen },
  { name: ScreenNameEnum.Marketplace, Component: MarketplaceScreen },
  { name: ScreenNameEnum.MealPlanList, Component: MealPlanListScreen },
  { name: ScreenNameEnum.MealRecommendation, Component: MealRecommendationScreen },
  { name: ScreenNameEnum.SkinnyAIChat, Component: SkinnyAIChatScreen },
  { name: ScreenNameEnum.SmartNotification, Component: SmartNotificationScreen },
  { name: ScreenNameEnum.WorkoutComplete, Component: WorkoutCompleteScreen },
  { name: ScreenNameEnum.WorkoutPlan, Component: WorkoutPlanScreen },
  { name: ScreenNameEnum.ActiveReminders, Component: ActiveRemindersScreen },
  { name: ScreenNameEnum.TrainingReminder, Component: TrainingReminderScreen },
  { name: ScreenNameEnum.WorkoutTime, Component: WorkoutTimeScreen },
  { name: ScreenNameEnum.WatchLock, Component: WatchLock },
  { name: ScreenNameEnum.PremiumScreen, Component: PremiumScreen },
  { name: ScreenNameEnum.FastingScreen, Component: FastingScreen },
  { name: ScreenNameEnum.FitnessProfileScreen, Component: FitnessProfileScreen },
  { name: ScreenNameEnum.PrimaryFocusScreen, Component: PrimaryFocusScreen },
  { name: ScreenNameEnum.FastingProtocolScreen, Component: FastingProtocolScreen },
  { name: ScreenNameEnum.HydrationTipScreen, Component: HydrationTipScreen },
];

const _routes = {
  REGISTRATION_ROUTE: [...AUTH_ROUTES, ...MAIN_ROUTES],
};

export default _routes;
