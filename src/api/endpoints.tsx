export const ENDPOINT = {

  SIGN_UP: "auth/signup",
  LOGIN: "auth/login",
  UPDATE_PROFILE: "profile/update",
  FORGOT_PASSWORD: 'auth/forgot-password',
  VERIFY_OTP: "auth/verify-otp",
  RESET_PASSWORD: "auth/reset-password",
  CHANGE_PASSWORD:'auth/change-password',
  GET_PROFILE: "auth/get-profile",
  ABOUT_US: "common/get_about_us",
  SUPPORT:"common/ask_support", 
  GET_RATING:'user/get_rating',
  CREATE_TRIP:'user/add_duty_request',
  CHANGE_STATUS:"user/change_duty",
  USER_LOG:"user/duty_log_summary",
  GET_CURRENT_TRIP:"user/get_current_duty_request",
  GET_ANNOUNCEMENTS: "user/get_announcements",
  GET_OFFERS: "user/get_offers",
  CHANGE_RATING_STATUS: "user/change_rating_status",
  READ_ANNOUNCEMENT: "user/read_announcement",
  GET_SETTINGS: "settings",
  UPDATE_SETTINGS: "settings/update",
  DASHBOARD: "driver/dashboard",
  DELIVERIES: "driver/deliveries",
  DELIVERY_DETAIL: "driver/deliveries/",
  ACCEPT_DELIVERY: "driver/deliveries/", // /id/accept
  START_DELIVERY: "driver/deliveries/",  // /id/start
  REPORT_ISSUE: "driver/deliveries/", // /id/issue
  NOTIFICATIONS: "driver/notifications"
};
