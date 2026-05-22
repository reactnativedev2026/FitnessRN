import { errorToast, successToast } from "../../utils/customToast";
import { ENDPOINT } from "../endpoints";
import { API_CALL } from "../APIRequest";

interface ApiParam {
  url: string;
  body?: any;
  token?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  [key: string]: any; 
}

/**
 * Generic POST API function (JSON by default)
 */
export const commonPostApi = async (
  param: ApiParam,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  return API_CALL(param.url, 'POST', param.body, param.token, setLoading, false);
};

/**
 * Professional Login API function
 */
export const authLogin = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: ENDPOINT.LOGIN, body }, setLoading);
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || 'Login failed' };
  }
};

/**
 * Professional Verify OTP API function
 */
export const authVerifyOtp = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: ENDPOINT.VERIFY_OTP, body }, setLoading);
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || 'OTP Verification failed' };
  }
};

/**
 * Professional Forgot Password API function
 */
export const authForgotPassword = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: ENDPOINT.FORGOT_PASSWORD, body }, setLoading);
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || 'Forgot password failed' };
  }
};

/**
 * Professional Reset Password API function
 */
export const authResetPassword = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: ENDPOINT.RESET_PASSWORD, body }, setLoading);
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || 'Reset password failed' };
  }
};

export const signupApi = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: ENDPOINT.SIGN_UP, body }, setLoading);

    if (response.success) {
      successToast('Successfully registered.');
    } else {
      errorToast(response.message || 'Signup failed');
    }

    return response;
  } catch (error: any) {
    errorToast(error.message || 'Signup failed');
    return { success: false, message: error.message || 'Signup failed' };
  }
};

/**
 * Update Profile API function
 */
export const UpdteProfileApi = async (
  body: any,
  token: string,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await API_CALL(ENDPOINT.UPDATE_PROFILE, 'POST', body, token, setLoading, true);

    if (response.success) {
      successToast(response.message);
    } else {
      errorToast(response.message || 'Update failed');
    }
    return response;
  } catch (error: any) {
    errorToast(error.message || 'Update failed');
    return { success: false, message: error.message || 'Update failed' };
  }
};

/**
 * Generic API Call wrapper
 */
export const ApiCall = async (
  endPonit: any,
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await commonPostApi({ url: endPonit, body }, setLoading);
    return response;
  } catch (error: any) {
    errorToast(error.message || 'API Call failed');
    return { success: false, message: error.message || 'API Call failed' };
  }
};

/**
 * Privacy Policy
 */
export const Privacypolicy = async (setLoading: any) => {
  try {
    const response = await API_CALL(ENDPOINT.PRIVACY_POLICY, 'GET', null, null, setLoading);
    if (response?.success) {
      return response;
    }
  } catch (error: any) {
    errorToast(error.message);
    return null;
  }
};

export const ContactUsApi = async (setLoading: any) => {
  try {
    const response = await API_CALL(ENDPOINT.CONTACT_US, 'GET', null, null, setLoading);
    if (response?.success) {
      return response;
    }
  } catch (error: any) {
    errorToast(error.message);
    return null;
  }
};