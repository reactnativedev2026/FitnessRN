import ScreenNameEnum from "./screenName.enum";
import NotificationsScreen from "../screen/Notification/Notification";
import HelpScreen from "../screen/Profile/Help/Helps";
import Splash from "../screen/auth/Splash/Splash";
import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import Login from "../screen/auth/login/Login";
import ProfileScreen from "../screen/Profile/ProfileScreen/ProfileScreen";
import SignUpUI from "../screen/auth/signUp/SignUp";
import PasswordReset from "../screen/auth/passwordReset/PasswordReset";
import CreateNewPassword from "../screen/auth/createNewPassword/CreateNewPassword";
import DrawerNavigation from "../navigators/DrawerNavigation";
import AboutUs from "../screen/Profile/About";
import TearmsCodition from "../screen/Profile/TearmsCodition";
const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
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
      name: ScreenNameEnum.Help,
      Component: HelpScreen,
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
      name: ScreenNameEnum.DrawerNavgation,
      Component: DrawerNavigation,
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
  ],
};

export default _routes;
