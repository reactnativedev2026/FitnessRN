import axios from "axios";
import { BASE_URL } from ".";

 export const GET_API = async (
   endpoint: string,
   token?: string,
   method: string = "GET",
   setLoading?: (val: boolean) => void
 ) => {
   try {
     setLoading?.(true);
 
     const url = endpoint.startsWith("http")
       ? endpoint
       : `${BASE_URL}${endpoint}`;
 
     const response = await axios({
       method,
       url,
       headers: {
         "Content-Type": "application/json",
         ...(token && { Authorization: `Bearer ${token}` }),
       },
     });
      setLoading?.(false);

     return response.data;
   } catch (error: any) {
     console.error(
       "API Error:",
       error?.response?.data || error?.message
     );
     return error?.response?.data || {
       success: false,
       message: "Something went wrong",
     };
   } finally {
     setLoading?.(false);
   }
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
