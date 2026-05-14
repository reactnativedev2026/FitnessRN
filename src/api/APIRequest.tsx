import { BASE_URL } from ".";

/**
 * Common API Request handler
 */
export const API_CALL = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: any = null,
  token: string | null = null,
  setLoading: ((v: boolean) => void) | null = null,
  isFormData: boolean = false
) => {
  try {
    setLoading?.(true);

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${BASE_URL}${endpoint}`;

    const headers: any = {
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let requestBody = null;

    if (method !== 'GET' && body) {
      if (isFormData) {
        requestBody = objectToFormData(body);
        // ❌ DO NOT set Content-Type for FormData, fetch will handle it
      } else {
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
    });

    const text = await response.text();
    
    try {
      const json = JSON.parse(text);
      return { ...json, success: response.ok };
    } catch {
      console.log('Non JSON response:', text);
      return { success: response.ok, message: text || 'Something went wrong' };
    }
  } catch (error: any) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    return { success: false, message: error?.message || 'Network error' };
  } finally {
    setLoading?.(false);
  }
};

/**
 * Wrapper for GET requests
 */
export const GET_API = async (
  endpoint: string,
  token?: string,
  method: string = "GET", // kept for compatibility
  setLoading?: (val: boolean) => void
) => {
  return API_CALL(endpoint, 'GET', null, token, setLoading);
};

/**
 * Wrapper for POST requests
 */
export const POST_API = async (
  token: string,
  body: any,
  endpoint: string,
  setLoading: (v: boolean) => void,
  isFormData: boolean = true
) => {
  return API_CALL(endpoint, 'POST', body, token, setLoading, isFormData);
};

/**
 * Helper to convert object to FormData
 */
export const objectToFormData = (obj: any) => {
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
