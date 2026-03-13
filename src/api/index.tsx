import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';

export interface ApiRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT';
  data?: any;
  headers?: Record<string, string>;
  token?: string;
  redirect?: any
}

export const BASE_URL = 'https://refound.com.au/amz_pro/api/';
export const GoogleClientId = '43208932533-6ktmlm2uusaqdgv42pj9u94eq9q6q8h7.apps.googleusercontent.com';

export const callMultipleApis = async (requests: ApiRequest[]) => {
  try {
    const responses: AxiosResponse[] = await Promise.all(
      requests.map((req) => {

        const config: AxiosRequestConfig = {
          method: req.method || 'GET',
          url: `${BASE_URL}${req.endpoint}`,
          data: (req.method === 'POST' || req.method === 'PUT') ? req.data : undefined,
          headers: {
            'Content-Type': req.data instanceof FormData ? 'multipart/form-data' : 'application/json',
            ...(req.token ? { Authorization: `Bearer ${req.token}` } : {}),
            ...req.headers,
          },
        };

        return axios(config);
      })
    );

    // Return only data from all responses
    return responses.map((res) => res.data);

  } catch (error) {
    console.error('API Error:', error);

    throw error;
  }
};


export const callApi = async (
  method: string,
  url: string,
  headers: any = {},
  data: any = null
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data,
    };

    const response: AxiosResponse = await axios(config);

    return response.data;

  } catch (error) {
    console.error('Error occurred while making API call:', error);
    const axiosError = error as any;
    if (axiosError.response) {
      throw new Error(`API call failed: ${axiosError.response.status} - ${axiosError.response.data.message || axiosError.response.statusText}`);
    } else if (axiosError.request) {
      throw new Error('No response received from API');
    } else {
      throw new Error(`API call failed: ${axiosError.message}`);
    }
  }
};



export const requestCameraPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);

      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.warn('Permission request error:', error);
      return false;
    }
  }
  return true;
};


