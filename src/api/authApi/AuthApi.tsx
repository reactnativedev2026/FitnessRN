import axios from "axios";
import { BASE_URL } from "..";
import { errorToast, successToast } from "../../utils/customToast";
import { ENDPOINT } from "../endpoints";


interface ApiParam {
  url: string;
  body?: any;
  token?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  [key: string]: any; // For any extra fields returned by API
}

/**
 * Generic POST API function
 */
export const loginApi = async (
  param: ApiParam,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    setLoading(true);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (param.token || param.body.token) {
      headers.append('Authorization', `Bearer ${param.token || param.body.token}`);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(param.body),
      redirect: 'follow',
    };

    const response = await fetch(`${BASE_URL}${param.url}`, requestOptions);
    const text = await response.text();

    let resJson: ApiResponse;
    try {
      resJson = JSON.parse(text);

    } catch {
      resJson = { success: false, message: text };
    }
    console.log(resJson, 'this is res')
    return resJson;
  } catch (error) {
    console.error('POST API Error:', error);
    return { success: false, message: 'Network error' };
  } finally {
    setLoading(false);
  }
};

/**
 * Signup API function
 */
export const signupApi = async (
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await loginApi({ url: ENDPOINT.SIGN_UP, body }, setLoading);

    if (response.success) {
      successToast('Successfully registered. As soon as possible our customer service will call you back.');
    } else {
      errorToast(response.message || 'Signup failed');
    }

    return response;
  } catch (error: any) {
    errorToast(error.message || 'Signup failed');
    return { success: false, message: error.message || 'Signup failed' };
  }
};


export const UpdteProfileApi = async (
  body: any,
  token,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    const response = await loginApi({ url: ENDPOINT.UPDATE_PROFILE, body, token }, setLoading);

    if (response.success) {
      successToast(response.message);
    } else {
      errorToast(response.message || 'Signup failed');
    }

    return response;
  } catch (error: any) {
    errorToast(error.message || 'Signup failed');
    return { success: false, message: error.message || 'Signup failed' };
  }
};
export const ApiCall = async (
  endPonit: any,
  body: any,
  setLoading: (loading: boolean) => void
): Promise<ApiResponse> => {
  try {
    setLoading(true)
    const response = await loginApi({ url: endPonit, body }, setLoading);

    if (response.success) {
      successToast('Successfully registered. As soon as possible our customer service will call you back.');
    } else {
      errorToast(response.message || 'Signup failed');
    }

    return response;
  } catch (error: any) {
    errorToast(error.message || 'Signup failed');
    return { success: false, message: error.message || 'Signup failed' };
  }
};


const objectToFormData = (obj: any) => {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value === null || value === undefined) return;

    // Image / File handling
    if (typeof value === 'object' && value?.path) {
      formData.append(key, {
        uri: value.path,
        type: value.mime || 'image/jpeg',
        name: value.filename || `${key}.jpg`,
      } as any);
    }

    // Array handling
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, String(item));
      });
    }

    // Normal fields
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};


export const POST_API = async (
  token: string,
  body: any,
  endpoint,
  setLoading: (v: boolean) => void
) => {
  try {
    setLoading(true);

    const formData = objectToFormData(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        // ❌ DO NOT set Content-Type for FormData
      },
      body: formData,
    });
    // console.log(formData, 'formadata')
    const text = await response.text();

    try {
      console.log(JSON.parse(text))
      return JSON.parse(text);
    } catch {
      console.log('Non JSON response:', text);
      return null;
    }

  } catch (error) {
    console.log('Add Invoice Error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};



export const Privacypolicy = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}common/get_privacy_policy`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status == 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    }

  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};


export const Termsconditions = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}common/get_terms_and_condition`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status == 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    }


  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};