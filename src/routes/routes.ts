import ScreenNameEnum from "./screenName.enum";
import NotificationsScreen from "../screen/Notification/NotificationScreen";
import Splash from "../screen/auth/Splash/Splash";
import OtpScreen from "../screen/auth/otp/OtpScreen";
import PrivacyPolicy from "../screen/Profile/privacy-policy/PrivacyPolicy";
import Login from "../screen/auth/Login/LoginScreen";
import ProfileScreen from "../screen/Profile/profile-screen/ProfileScreen";
import SignUpUI from "../screen/auth/Signup/SignupScreen";
import PasswordReset from "../screen/auth/forgot-password/forgotPasswordScreen";
import CreateNewPassword from "../screen/auth/create-password/CreatePassword";
import DrawerNavigation from "../navigators/DrawerNavigation";
import AboutUs from "../screen/Profile/about/AboutScreen";
import ProfileSettingsScreen from "../screen/Profile/ProfileIndex";
import TearmsCodition from "../screen/Profile/tearms-conditions/TearmsCondition";
import DashboardScreen from "../screen/BottomTab/Dashboard/Dashboard";
import DashboardDetail from "../screen/BottomTab/Dashboard/DashboardDetail";
import RecentDeliveries from "../screen/BottomTab/Dashboard/RecentDeliveries";
import DeliveryMap from "../screen/BottomTab/Dashboard/DeliveryMap";
import OrderDetails from "../screen/BottomTab/Dashboard/OrderDetails";
import NotificationsSetting from "../screen/Profile/notification-setting/NotificationsSetting";
import DeliveryDetail from "../screen/BottomTab/Dashboard/DeliveryDetail";

const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.MapScreen,
      Component: DeliveryMap,
    },
    {
      name: ScreenNameEnum.RaceDetail,
      Component: OrderDetails,
    },

    {
      name: ScreenNameEnum.Login,
      Component: Login,
    },
    {
      name: ScreenNameEnum.Sinup,
      Component: SignUpUI,
    },
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreateNewPassword,
      Component: CreateNewPassword,
    },

    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },


    {
      name: ScreenNameEnum.ABOUT_US,
      Component: AboutUs,
    },
    {
      name: ScreenNameEnum.EditProfile,
      Component: ProfileScreen,
    },
    {
      name: ScreenNameEnum.ProfileSetup,
      Component: ProfileSettingsScreen,
    },

    {
      name: ScreenNameEnum.DashBoardScreen,
      Component: DashboardScreen,
    },
    {
      name: ScreenNameEnum.DashBoardDetail,
      Component: DashboardDetail,
    },
    {
      name: ScreenNameEnum.DELIVERY_DETAIL,
      Component: DeliveryDetail,
    },
    {
      name: ScreenNameEnum.RECENT_DELIVERIES,
      Component: RecentDeliveries,
    },

    {
      name: ScreenNameEnum.PrivacyPolicy,
      Component: PrivacyPolicy,
    },
    {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component: TearmsCodition,
    },

    {
      name: ScreenNameEnum.NotificationsScreen,
      Component: NotificationsScreen,
    },
    {
      name: ScreenNameEnum.NotificationsSetting,
      Component: NotificationsSetting,
    },
  ],
};

export default _routes;
